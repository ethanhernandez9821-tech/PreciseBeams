"use client";

import { useEffect, useRef } from "react";

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.5 5.34A17.3 17.3 0 0 0 15.25 4l-.52 1.06a15.9 15.9 0 0 0-5.45 0L8.75 4A17.5 17.5 0 0 0 4.5 5.35C1.8 9.4 1.07 13.35 1.44 17.24a17.1 17.1 0 0 0 5.22 2.64l1.26-1.73a10.8 10.8 0 0 1-1.98-.95l.49-.38c3.82 1.77 7.96 1.77 11.73 0l.5.38c-.64.38-1.3.7-1.99.95l1.26 1.73a17.2 17.2 0 0 0 5.22-2.64c.43-4.5-.73-8.41-3.65-11.9ZM8.42 14.84c-1.15 0-2.1-1.06-2.1-2.36 0-1.3.93-2.36 2.1-2.36 1.18 0 2.12 1.07 2.1 2.36 0 1.3-.93 2.36-2.1 2.36Zm7.16 0c-1.15 0-2.1-1.06-2.1-2.36 0-1.3.93-2.36 2.1-2.36 1.18 0 2.12 1.07 2.1 2.36 0 1.3-.92 2.36-2.1 2.36Z" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m3 11 9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z" />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87m-2-12a4 4 0 0 1 0 7.75" />
  </svg>
);

const SparkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Zm7 14 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M10.3 3.6 2.5 18a2 2 0 0 0 1.76 3h15.48a2 2 0 0 0 1.76-3L13.7 3.6a2 2 0 0 0-3.4 0ZM12 9v4m0 4h.01" />
  </svg>
);

function CursorOrb() {
  const orb = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let tx = innerWidth / 2;
    let ty = innerHeight / 2;
    let x = tx;
    let y = ty;
    let frame = 0;
    const move = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      orb.current?.classList.add("visible");
    };
    const draw = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      if (orb.current) orb.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      frame = requestAnimationFrame(draw);
    };
    addEventListener("mousemove", move);
    frame = requestAnimationFrame(draw);
    return () => {
      removeEventListener("mousemove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="cursor-orb" ref={orb} aria-hidden="true" />;
}

const terms = [
  {
    title: "Use Everything Responsibly",
    body: "Use PreciseBeams content, resources, and community information responsibly. Follow the rules of the game and every platform you use.",
  },
  {
    title: "No Malicious Use",
    body: "Do not use anything shared here to harass others, disrupt games or communities, steal content, or take part in illegal activity.",
  },
  {
    title: "Respect Our Work",
    body: "Do not steal, leak, resell, reupload, or claim PreciseBeams content or another creator’s work as your own.",
  },
  {
    title: "Discord TOS Compliance",
    body: "PreciseBeams and all content shared in the server are intended to comply with Discord Terms of Service, Community Guidelines, and platform rules.",
  },
];

export default function Home() {
  return (
    <div className="site-shell">
      <CursorOrb />
      <aside className="sidebar">
        <div>
          <a className="brand" href="#home" aria-label="PreciseBeams home">
            <img src="/preciseware-logo.webp" alt="PreciseBeams P logo" width="48" height="48" />
            <span>Precise<span>Beams</span></span>
          </a>
          <nav aria-label="Main navigation">
            <a className="nav-link active" href="#home">
              <HomeIcon />
              <span>Home</span>
              <i />
            </a>
          </nav>
          <p className="sidebar-note">More pages will be added here soon.</p>
        </div>
        <div className="sidebar-footer">
          <a className="discord-button" href="https://discord.gg/EGCcdVVV7" target="_blank" rel="noreferrer">
            <DiscordIcon /> Join Discord
          </a>
          <small>© 2026 PreciseBeams</small>
        </div>
      </aside>

      <main id="home" className="content">
        <header className="welcome">
          <div>
            <h1>Welcome to PreciseBeams</h1>
            <p>The home of our beam abilities, updates, and community resources.</p>
          </div>
          <img className="welcome-logo" src="/preciseware-logo.webp" alt="" width="86" height="86" />
        </header>

        <section className="stats" aria-label="PreciseBeams information">
          <article>
            <span className="stat-icon"><PeopleIcon /></span>
            <div><strong>38</strong><p>Trusted users</p></div>
          </article>
          <article>
            <span className="stat-icon"><SparkIcon /></span>
            <div><strong>More coming soon</strong><p>New content and pages</p></div>
          </article>
        </section>

        <section className="terms">
          <header>
            <span className="warning"><WarningIcon /></span>
            <div>
              <h2>Terms of Service &amp; Disclaimer</h2>
              <p>Please read before using PreciseBeams.</p>
            </div>
          </header>
          <div className="terms-list">
            {terms.map((term) => (
              <article key={term.title}>
                <h3>{term.title}</h3>
                <p>{term.body}</p>
              </article>
            ))}
          </div>
          <p className="acceptance">By continuing to use PreciseBeams, you agree to these terms and accept responsibility for your actions.</p>
        </section>
      </main>
    </div>
  );
}
