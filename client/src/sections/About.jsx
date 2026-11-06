import SectionHeading from '../components/SectionHeading';
import useReveal from '../hooks/useReveal';
import '../styles/about.css';

export default function About({ profile, education, softSkills }) {
  const ref = useReveal();

  return (
    <section className="section about" id="about" aria-labelledby="about-title" ref={ref}>
      <div className="container">
        <SectionHeading id="about-title" top="About" bottom="Me" />

        <div className="about__grid">
          <div className="about__text" data-reveal>
            <p className="about__lead">{profile.summary}</p>
            <ul className="about__facts">
              <li>
                <span className="eyebrow">Based in</span>
                <span>{profile.location}</span>
              </li>
              <li>
                <span className="eyebrow">Focus</span>
                <span>{profile.specialization}</span>
              </li>
              <li>
                <span className="eyebrow">Looking for</span>
                <span>On-the-job training / internship</span>
              </li>
            </ul>

            <div className="about__soft">
              <p className="eyebrow">Soft skills</p>
              <ul className="chips">
                {softSkills.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="about__education" data-reveal>
            <h3 className="eyebrow eyebrow--accent">Education</h3>
            <ol className="edu-list">
              {education.map((e) => (
                <li key={e.school} className="edu-item">
                  <div className="edu-item__top">
                    <span className="edu-item__level">{e.level}</span>
                    <span className="edu-item__period">{e.period}</span>
                  </div>
                  <h4 className="edu-item__school">{e.school}</h4>
                  {e.degree !== e.level && <p className="edu-item__degree">{e.degree}</p>}
                  <p className="edu-item__place">{e.place}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
