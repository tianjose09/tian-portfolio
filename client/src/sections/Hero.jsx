import Icon from '../components/Icon';
import '../styles/hero.css';

const WORD = 'PORTFOLIO';

export default function Hero({ profile }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      {/* Vertical side labels (desktop only) */}
      <div className="hero__rail hero__rail--left" aria-hidden="true">
        <span>Web Development</span>
        <i />
        <span>Mobile Development</span>
      </div>
      <div className="hero__rail hero__rail--right" aria-hidden="true">
        <span>Back-End &amp; APIs</span>
        <i />
        <span>Databases</span>
      </div>

      <div className="container hero__inner">
        <p className="hero__word" aria-hidden="true">
          {WORD.split('').map((ch, i) => (
            <span key={i} style={{ '--i': i }}>
              {ch}
            </span>
          ))}
        </p>

        <div className="hero__grid">
          <div className="hero__intro">
            <p className="hero__hello">Hello, I’m</p>
            <h1 className="hero__name" id="hero-name">
              <span>{profile.firstName}</span>
              <span>{profile.lastName}</span>
            </h1>
            <p className="hero__role">{profile.specialization}</p>
            <p className="hero__tagline">{profile.tagline}</p>

            <div className="hero__actions">
              <a href="#projects" className="btn btn--dark">
                View my projects
                <Icon name="arrow" size={18} />
              </a>
              <a href="#contact" className="btn btn--ghost">
                Get in touch
              </a>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__circle" aria-hidden="true" />
            <figure className="hero__photo">
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.firstName} ${profile.lastName}`}
                width="900"
                height="900"
              />
            </figure>
          </div>
        </div>
      </div>
      <div className="container">
        <hr className="rule" />
      </div>
    </section>
  );
}
