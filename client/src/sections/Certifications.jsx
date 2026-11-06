import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import useReveal from '../hooks/useReveal';
import '../styles/certifications.css';

function BadgeImage({ cert }) {
  const [failed, setFailed] = useState(false);

  if (!cert.image || failed) {
    // Fallback tile when there is no badge image or it can't load
    return (
      <span className="cert__fallback" aria-hidden="true">
        <Icon name="badge" size={34} strokeWidth={1.4} />
      </span>
    );
  }
  return (
    <img
      src={cert.image}
      alt=""
      loading="lazy"
      width="120"
      height="120"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

export default function Certifications({ certifications }) {
  const ref = useReveal();
  const years = [...new Set(certifications.map((c) => c.year))].sort().reverse();
  const [year, setYear] = useState('All');

  const shown = year === 'All' ? certifications : certifications.filter((c) => c.year === year);

  return (
    <section className="section certs" id="certifications" aria-labelledby="certs-title" ref={ref}>
      <div className="container">
        <SectionHeading
          id="certs-title"
          top="Certifications"
          bottom="& Badges"
          intro="Credentials in networking, programming and project management. Each one links to its verification page."
          action={
            <div className="filter" role="group" aria-label="Filter by year">
              {['All', ...years].map((y) => (
                <button key={y} type="button" aria-pressed={year === y} onClick={() => setYear(y)}>
                  {y}
                </button>
              ))}
            </div>
          }
        />

        {/* key={year} re-creates the grid when the filter changes so the cards animate in again */}
        <ul className="certs__grid" key={year}>
          {shown.map((cert, i) => (
            <li key={cert.name} className="cert" style={{ '--i': i }}>
              <div className="cert__badge">
                <BadgeImage cert={cert} />
              </div>
              <div className="cert__body">
                <h3 className="cert__name">{cert.name}</h3>
                <p className="cert__issuer">{cert.issuer}</p>
                <p className="cert__date">{cert.date}</p>
              </div>
              {cert.url ? (
                <a className="cert__verify" href={cert.url} target="_blank" rel="noopener noreferrer">
                  {cert.verifyLabel || 'Verify on Credly'} <Icon name="external" size={14} />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <span className="cert__verify cert__verify--none">Certificate on request</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
