import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navItems, profile } from '../data';

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    if (typeof IntersectionObserver !== 'function') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e, item) => {
    e.preventDefault();
    setOpen(false);
    if (item.path === pathname) {
      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(item.path);
    }
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="site-header__inner container">
        <a href="/" className="brand" onClick={(e) => go(e, navItems[0])} aria-label={`${profile.name} — home`}>
          <span className="brand__mark">{profile.shortName}</span>
          <span className="brand__dot" />
        </a>

        <nav id="site-nav" className="site-nav" aria-label="Main">
          <ul>
            {navItems.map((item, i) => (
              <li key={item.id} style={{ '--i': i }}>
                <a
                  href={item.path}
                  onClick={(e) => go(e, item)}
                  className={active === item.id ? 'is-active' : ''}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  <span className="site-nav__index">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
