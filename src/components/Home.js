import { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Resume from '../assets/PDFs/Fiqy Resume 10.27.26.pdf';
import { profile, skillGroups } from '../data';

// three.js is ~600KB; load it after first paint so the text appears instantly.
const HeroScene = lazy(() => import('./HeroScene'));

const marqueeItems = skillGroups.flatMap((g) => g.items);

function RotatingWord({ words }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className="rotator" aria-hidden="true">
      <span key={index} className="rotator__word">{words[index]}</span>
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <section id="home" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <Suspense fallback={<div className="hero-scene hero-scene--fallback" aria-hidden="true" />}>
        <HeroScene />
      </Suspense>

      <div className="hero__content container">
        <p className="hero__status">
          <span className="pulse" aria-hidden="true" />
          Open to work · {profile.location}
        </p>
        <h1 className="hero__title">
          Youssef
          <br />
          <span className="text-outline">Al-Fiqy</span>
        </h1>
        <p className="hero__lead">
          <span className="sr-only">I build websites, automations, dashboards and digital solutions.</span>
          <span aria-hidden="true">I build </span>
          <RotatingWord words={profile.roles} />
          <span aria-hidden="true"> that make businesses run smoother.</span>
        </p>
        <p className="hero__sub">
          Business Informatics student · Full-stack web developer · Power Platform &amp; data.
        </p>
        <div className="hero__actions">
          <button type="button" className="btn btn--primary" onClick={() => navigate('/projects')}>
            View my work
            <span aria-hidden="true">→</span>
          </button>
          <a className="btn btn--ghost" href={Resume} download="Youssef Al-Fiqy CV.pdf">
            Download CV
          </a>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <div className="marquee__group" key={copy}>
              {marqueeItems.map((item) => (
                <span key={item}>{item}<i>✦</i></span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
