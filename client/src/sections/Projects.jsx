import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import ArrowLink from '../components/ArrowLink';
import Icon from '../components/Icon';
import ProjectModal from '../components/ProjectModal';
import useReveal from '../hooks/useReveal';
import '../styles/projects.css';

function ProjectCard({ project, onOpen }) {
  return (
    <article className={`project-card project-card--${project.theme}`} data-reveal>
      <button
        type="button"
        className="project-card__media"
        onClick={() => onOpen(project)}
        aria-label={`Open details for ${project.title}`}
      >
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
        <span className="project-card__overlay-title" aria-hidden="true">
          {project.title}
        </span>
        <span className="project-card__view" aria-hidden="true">
          View details <Icon name="arrow" size={16} />
        </span>
      </button>

      <div className="project-card__body">
        <div className="project-card__heading">
          <span className="project-card__num">{project.number}</span>
          <div>
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__subtitle">{project.subtitle}</p>
          </div>
        </div>

        <p className="project-card__summary">{project.summary}</p>

        <ul className="tags" aria-label="Technologies">
          {project.tech.slice(0, 6).map((t) => (
            <li key={t}>{t}</li>
          ))}
          {project.tech.length > 6 && <li>+{project.tech.length - 6}</li>}
        </ul>

        <div className="project-card__footer">
          <button type="button" className="btn btn--dark btn--sm" onClick={() => onOpen(project)}>
            Details
          </button>
          {project.links.live && (
            <a className="btn btn--accent btn--sm" href={project.links.live} target="_blank" rel="noopener noreferrer">
              Live site <Icon name="external" size={15} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          <a className="btn btn--ghost btn--sm" href={project.links.github} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={16} /> GitHub
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          {project.role && <span className="project-card__role">{project.role}</span>}
        </div>
      </div>
    </article>
  );
}

export default function Projects({ projects, github }) {
  const ref = useReveal();
  const [selected, setSelected] = useState(null);

  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title" ref={ref}>
      <div className="container">
        <SectionHeading
          id="projects-title"
          top="Selected"
          bottom="Projects"
          intro="Web and mobile applications I’ve built with my teams, from the data model to the screens."
          action={
            <ArrowLink href={github} external>
              More on GitHub
            </ArrowLink>
          }
        />

        <div className="projects__grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={setSelected} />
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
