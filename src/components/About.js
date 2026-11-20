import Resume from '../assets/PDFs/Fiqy Resume 10.27.26.pdf';
import { credentials, skillGroups, stats } from '../data';
import Reveal from './Reveal';
import TiltCard from './TiltCard';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">01 — About</p>
          <h2 className="section__title">
            Business brain,
            <br />
            <span className="text-accent">developer hands.</span>
          </h2>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-copy" delay={80}>
            <p className="lead">
              I'm a senior Business Information Systems student who turns messy processes into clean digital tools —
              from client websites to automated workflows and data dashboards.
            </p>
            <p>
              At the UN World Food Programme I built low-code solutions on Microsoft Power Platform that automated
              workflows and centralized operational data. Outside of that, I design and ship responsive websites for
              clients, and I bring a data-analytics background in Python, SQL and Tableau to everything I build.
            </p>
            <div className="about-actions">
              <a className="btn btn--primary" href={Resume} download="Youssef Al-Fiqy CV.pdf">Download CV</a>
              <a className="btn btn--ghost" href={Resume} target="_blank" rel="noopener noreferrer">View CV</a>
            </div>
          </Reveal>

          <ul className="stats">
            {stats.map((s, i) => (
              <Reveal as="li" variant="flip" delay={i * 90} key={s.label}>
                <TiltCard className="stat">
                  <span className="stat__value">{s.value}</span>
                  <span className="stat__label">{s.label}</span>
                </TiltCard>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="skills">
          {skillGroups.map((g, i) => (
            <Reveal variant="flip" delay={i * 100} key={g.title}>
              <TiltCard className="skill-card">
                <span className="skill-card__num">0{i + 1}</span>
                <h3>{g.title}</h3>
                <p>{g.blurb}</p>
                <ul className="chips">
                  {g.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="credentials">
          <h3 className="eyebrow">Education &amp; certifications</h3>
          <ul>
            {credentials.map((c) => (
              <li key={c.title}>
                <div>
                  <strong>{c.title}</strong>
                  <span>{c.org}</span>
                </div>
                <time>{c.date}</time>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
