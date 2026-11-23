import { labProjects, projects } from '../data';
import Reveal from './Reveal';
import TiltCard from './TiltCard';

function displayHost(href) {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return href;
  }
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">03 — Selected work</p>
          <h2 className="section__title">Live sites, <span className="text-accent">real clients.</span></h2>
        </Reveal>

        <ul className="projects">
          {projects.map((p, i) => (
            <Reveal as="li" variant="flip" delay={(i % 2) * 120} key={p.title}>
              <TiltCard className="project">
                <a className="project__link" href={p.href} target="_blank" rel="noopener noreferrer">
                  <div className="project__cover" style={{ '--hue': p.hue, '--sat': `${p.saturation ?? 85}%` }} aria-hidden="true">
                    <span className="project__glow" />
                    <span className="project__floor" />
                    <div className="project__chrome">
                      <span className="project__dots"><i /><i /><i /></span>
                      <span className="project__url">{displayHost(p.href)}</span>
                      <span className="project__status">Live</span>
                    </div>
                    <div className="project__stage">
                      <span className="project__frame">
                        {p.logo ? (
                          <img className={`project__logo${p.logoTone === 'light' ? ' project__logo--light' : ''}`} src={p.logo} alt="" loading="lazy" decoding="async" />
                        ) : (
                          <span className="project__monogram">{p.mark}</span>
                        )}
                      </span>
                    </div>
                    <span className="project__scan" />
                    <div className="project__meta">
                      <span>{String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
                      <span>{p.kind}</span>
                    </div>
                  </div>
                  <div className="project__body">
                    <p className="project__kind">{p.kind}</p>
                    <h3 className="project__title">
                      {p.title}
                      <span className="project__arrow" aria-hidden="true">↗</span>
                    </h3>
                    <p className="project__desc">{p.description}</p>
                    <ul className="chips chips--small">
                      {p.tags.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </ul>

        <Reveal className="lab">
          <span className="eyebrow">Practice builds</span>
          <ul>
            {labProjects.map((p) => (
              <li key={p.title}>
                <a href={p.href} target="_blank" rel="noopener noreferrer">{p.title} <span aria-hidden="true">↗</span></a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
