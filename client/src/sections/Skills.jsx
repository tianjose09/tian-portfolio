import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import useReveal from '../hooks/useReveal';
import '../styles/skills.css';

export default function Skills({ skills, focusAreas, quote }) {
  const ref = useReveal();

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title" ref={ref}>
      <div className="container">
        <div className="skills__grid">
          <div className="skills__list">
            <SectionHeading id="skills-title" top="Skills &" bottom="Expertise" />
            <dl className="skill-rows" data-reveal>
              {skills.map((group) => (
                <div className="skill-row" key={group.category}>
                  <dt>{group.category}</dt>
                  <dd>{group.items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </div>

          <blockquote className="skills__quote" data-reveal>
            <span className="skills__quote-mark" aria-hidden="true">
              “
            </span>
            <p>{quote}</p>
          </blockquote>

          <ul className="focus-list" data-reveal>
            {focusAreas.map((f) => (
              <li key={f.title} className="focus-item">
                <span className="focus-item__icon">
                  <Icon name={f.icon} size={20} />
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
