/**
 * Two-line section title in the reference style:
 * first line in ink, second line in the accent color.
 */
export default function SectionHeading({ id, top, bottom, intro, action }) {
  return (
    <div className="section-head" data-reveal>
      <h2 className="section-title" id={id}>
        <span>{top}</span>
        <span className="accent">{bottom}</span>
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
      {action && <div className="section-action">{action}</div>}
    </div>
  );
}
