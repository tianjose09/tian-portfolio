import { useEffect, useState, useCallback } from 'react';
import { fetchPortfolio } from './api';

import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    setError(null);
    fetchPortfolio()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(load, [load]);

  if (error) {
    return (
      <div className="app-state" role="alert">
        <p className="eyebrow">Connection problem</p>
        <p>The portfolio content couldn’t be loaded. Make sure the API server is running.</p>
        <button className="btn btn--dark" onClick={load}>
          Try again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="app-state" aria-busy="true" aria-live="polite">
        <span className="loader" aria-hidden="true" />
        <span className="sr-only">Loading portfolio…</span>
      </div>
    );
  }

  const { profile } = data;

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header profile={profile} />
      <main id="main">
        <Hero profile={profile} />
        <About profile={profile} education={data.education} softSkills={data.softSkills} />
        <Projects projects={data.projects} github={profile.socials.github} />
        <Skills skills={data.skills} focusAreas={data.focusAreas} quote={profile.quote} />
        <Experience experience={data.experience} />
        <Certifications certifications={data.certifications} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}
