import Icon from './Icon';

/** Small uppercase link with a long arrow, like "VIEW ALL PROJECTS →" in the reference. */
export default function ArrowLink({ href, children, external = false }) {
  return (
    <a
      className="arrow-link"
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
      <span className="arrow-link__line" aria-hidden="true">
        <Icon name="arrow" size={18} />
      </span>
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
