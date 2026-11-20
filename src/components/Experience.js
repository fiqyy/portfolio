import { experience } from '../data';
import Reveal from './Reveal';

export default function Experience() {
  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">02 — Experience</p>
          <h2 className="section__title">Where I've <span className="text-accent">shipped.</span></h2>
        </Reveal>

        <ol className="timeline">
          {experience.map((job) => (
            <Reveal as="li" variant="flip" className="timeline__item" key={job.role}>
              <div className="timeline__meta">
                <time>{job.date}</time>
                <span className="timeline__org">{job.org}</span>
              </div>
              <div className="timeline__body">
                <h3>{job.role}</h3>
                <p className="timeline__summary">{job.summary}</p>
                <ul className="timeline__points">
                  {job.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <ul className="chips">
                  {job.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
