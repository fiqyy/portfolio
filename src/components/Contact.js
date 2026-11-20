import { useEffect, useRef, useState } from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { BiPhoneCall } from 'react-icons/bi';
import { profile, socials } from '../data';
import Reveal from './Reveal';
import TiltCard from './TiltCard';

const icons = { linkedin: FaLinkedin, github: FaGithub, instagram: FaInstagram };

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand('copy');
  field.remove();
  if (!ok) throw new Error('Copy failed');
}

export default function Contact() {
  const [copyState, setCopyState] = useState('idle');
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const subject = encodeURIComponent('Hello from your portfolio');
  const body = encodeURIComponent('Hi Youssef, I found your site and would like to talk about…');
  const mailto = `mailto:${profile.email}?subject=${subject}&body=${body}`;

  const handleCopy = async () => {
    try {
      await copyText(profile.email);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopyState('idle'), 2200);
  };

  const copyLabel = { idle: 'Copy email', copied: 'Copied ✓', error: 'Copy failed' }[copyState];

  return (
    <section id="contact" className="section section--contact">
      <div className="container">
        <Reveal className="contact-hero">
          <p className="eyebrow">04 — Contact</p>
          <h2 className="contact-hero__title">
            Have a project?
            <br />
            <span className="text-outline">Let's build it.</span>
          </h2>
          <p className="contact-hero__lead">
            I'm open to freelance work, internships and full-time roles. The fastest way to reach me is email.
          </p>
          <div className="contact-hero__actions">
            <a className="btn btn--primary btn--lg" href={mailto}>
              <SiGmail aria-hidden="true" /> {profile.email}
            </a>
            <button type="button" className="btn btn--ghost" onClick={handleCopy} aria-live="polite">
              {copyLabel}
            </button>
          </div>
        </Reveal>

        <ul className="contact-links">
          {socials.map((s, i) => {
            const Icon = icons[s.id];
            return (
              <Reveal as="li" variant="flip" delay={i * 80} key={s.id}>
                <TiltCard className="contact-card">
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    <Icon className="contact-card__icon" aria-hidden="true" />
                    <span className="contact-card__label">{s.label}</span>
                    <span className="contact-card__handle">{s.handle}</span>
                  </a>
                </TiltCard>
              </Reveal>
            );
          })}
          <Reveal as="li" variant="flip" delay={socials.length * 80}>
            <TiltCard className="contact-card">
              <a href={`tel:${profile.phone}`}>
                <BiPhoneCall className="contact-card__icon" aria-hidden="true" />
                <span className="contact-card__label">Phone</span>
                <span className="contact-card__handle">{profile.phoneDisplay}</span>
              </a>
            </TiltCard>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
