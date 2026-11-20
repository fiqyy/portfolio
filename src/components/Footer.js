import { profile } from '../data';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>© {new Date().getFullYear()} {profile.name}. Designed &amp; built in {profile.location.split(',')[0]}.</p>
        <a href="#home" className="site-footer__top">Back to top ↑</a>
      </div>
    </footer>
  );
}
