import SectionHeading from '../components/SectionHeading';
import useReveal from '../hooks/useReveal';
import '../styles/experience.css';

export default function Experience({ experience }) {
  const ref = useReveal();

  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title" ref={ref}>
      <div className="container">
        <SectionHeading
          id="experience-title"
          top="Experience &"
          bottom="Organizations"
          intro="Team work, leadership and community engagement outside the classroom."
        />

        <ol className="exp-grid">
          {experience.map((item, i) => (
            <li key={item.title + item.org} className="exp-card" data-reveal style={{ '--d': `${i * 90}ms` }}>
              <span className="exp-card__mark" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.period && <p className="exp-card__period">{item.period}</p>}
              <h3 className="exp-card__title">{item.title}</h3>
              <p className="exp-card__org">{item.org}</p>
              <p className="exp-card__desc">{item.description}</p>
              <ul className="exp-card__tags">
                {item.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
