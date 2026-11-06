import Icon from './Icon';

export default function Footer({ profile }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          © {year} {profile.firstName} {profile.lastName}. Built with React &amp; Express.
        </p>
        <div className="site-footer__links">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
            <Icon name="github" size={18} />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
            <Icon name="linkedin" size={18} />
          </a>
          <a href="#top" className="to-top">
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
