import { useEffect, useRef } from 'react';
import Icon from './Icon';

/** Accessible dialog showing a project's full details. Closes with Escape, the X button, or a backdrop click. */
export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    document.body.classList.add('no-scroll');

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      // Keep keyboard focus inside the dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll('a[href], button');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={dialogRef}
      >
        <button className="modal__close" onClick={onClose} ref={closeRef} aria-label="Close project details">
          <Icon name="close" size={22} />
        </button>

        <div className={`modal__media project-card--${project.theme}`}>
          <img src={project.image} alt={project.imageAlt} />
        </div>

        <div className="modal__content">
          <p className="eyebrow eyebrow--accent">
            {project.number} · {project.subtitle}
          </p>
          <h3 className="modal__title" id="modal-title">
            {project.title}
          </h3>
          <p className="modal__context">{project.context}</p>

          {(project.role || project.year) && (
            <dl className="modal__meta">
              {project.role && (
                <div>
                  <dt>My role</dt>
                  <dd>{project.role}</dd>
                </div>
              )}
              {project.year && (
                <div>
                  <dt>Timeline</dt>
                  <dd>{project.year}</dd>
                </div>
              )}
            </dl>
          )}

          <p className="modal__summary">{project.summary}</p>

          <h4 className="eyebrow">Key features</h4>
          <ul className="modal__list">
            {project.highlights.map((h) => (
              <li key={h}>
                <Icon name="check" size={16} strokeWidth={2} />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <h4 className="eyebrow">Built with</h4>
          <ul className="tags">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className="modal__actions">
            {project.links.live && (
              <a className="btn btn--accent" href={project.links.live} target="_blank" rel="noopener noreferrer">
                Visit live site <Icon name="external" size={16} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            <a className="btn btn--dark" href={project.links.github} target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={18} /> View repository
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
