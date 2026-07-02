"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Metadata } from "next";

const pillars = [
  {
    img: "/lumiqtab.jpg",
    title: "LumiqKobi",
    body: "An AI reading tablet for children to explore stories, choices, voices, and learning.",
  },
  {
    img: "/lumiqbookcover.png",
    title: "LumiqPrint",
    body: "Personalized printed books that turn digital adventures into keepsakes.",
  },
  {
    img: "/lumiqpal.png",
    title: "LumiqPal",
    body: "A holographic AI companion for storytime, conversation, reminders, and family connection.",
  },
];

const voices = [
  { quote: "Lumiq feels like a studio that actually cares about the small, quiet moments at home.", name: "The Atelier Review" },
  { quote: "A rare object — tech that wants to slow you down instead of speeding you up.", name: "Sora Tanaka, Designer" },
  { quote: "Every product feels written, not manufactured. It's an entire little universe.", name: "Liam Chen, Father of two" },
];

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    rootRef.current.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="editorial-page">
      {/* Hero */}
      <section className="ed-hero">
        <div className="container ed-hero-inner">
          <div className="ed-hero-text reveal">
            <span className="kicker"></span>
            <h1 className="serif">
              AI Experiences for Families<br />
              Across <em>Generations.</em>
            </h1>
            <p className="ed-lead">
              Lumiq Studio creates AI-powered story and companion experiences — helping children read and imagine, while giving older adults a gentle presence for conversation, reminders, and connection.
            </p>
            <div className="ed-cta-row">
              <Link href="/story" className="btn btn-navy">Our Story →</Link>
              <Link href="/products" className="btn-ghost-link">Browse the catalogue</Link>
            </div>
          </div>
          <div className="ed-hero-media reveal d2">
            <img src="/intro-hero.jpg" alt="A softly glowing translucent cube hovering above an open book" width={1792} height={1024} />
          </div>
        </div>
      </section>

      {/* Where Technology Meets Wonder */}
      <section className="ed-section container reveal">
        <div className="ed-section-head" style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
          <h1 className="serif" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>Where Technology Meets Wonder</h1>
          <p style={{ color: "var(--ink-2)", marginTop: "1rem", fontSize: "1.15rem", lineHeight: 1.65, maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>Experience a whole new way to interact with stories and the limit is only your imagination</p>
        </div>
        <div className="ed-section-head">
          <span className="kicker"></span>
          <h2 className="serif">Imagine Yourself in the Story</h2>
        </div>
        <div className="reveal d1">
          <img
            src="/steps1.png"
            alt="Four steps: pick a storybook, add your child's picture, preview and order, and your story is printed with care and delivered with joy."
            loading="lazy"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      </section>

      {/* Why Lumiq */}
      <section className="ed-section container reveal">
        <div className="ed-section-head">
          <span className="kicker"></span>
          <h2 className="serif">Tools for the imagination, made with care.</h2>
        </div>
        <div className="ed-bento">
          {pillars.map((p) => (
            <article key={p.title} className="ed-bento-card reveal">
              <div className="ed-bento-media">
                <img src={p.img} alt={p.title} loading="lazy" width={1024} height={1024} />
              </div>
              <h3 className="serif">{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
        <div className="ed-section-foot">
          <Link href="/story" className="ed-arrow-link">See our full philosophy →</Link>
        </div>
      </section>

      {/* Member Center */}
      <div className="lumiq-root">
        <section id="member" className="container reveal" style={{ padding: "4rem 2rem 1rem" }}>
          <div className="section-head section-head-left">
            <span className="kicker font-sans text-lg"></span>
            <h2 className="serif">One Lumiq account to rule the magical universe.</h2>
            <p className="lead text-xl md:text-2xl">Manage profiles, set time limits, and see every book and setting with one login.</p>
          </div>
          <div className="eco-stage reveal d1">
            <div className="eco-center">
              <span className="eco-center-ico">👤</span>
              <strong>Lumiq Account</strong>
              <small>One email · whole family</small>
            </div>
            <div className="eco-orbit"></div>
            <div className="eco-orbit eco-orbit-2"></div>
            <div className="eco-node n1"><span>🧒</span><strong>Lily · 7</strong><small>Profile</small></div>
            <div className="eco-node n2"><span>🧒</span><strong>Max · 11</strong><small>Profile</small></div>
            <div className="eco-node n3"><span>👶</span><strong>Rio · 2</strong><small>Profile</small></div>
            <div className="eco-node n4"><span>📱</span><strong>LumiqKobi</strong><small>Device #A2-19</small></div>
            <div className="eco-node n5"><span>🧚</span><strong>LumiqPal</strong><small>Bedside</small></div>
            <div className="eco-node n6"><span>📚</span><strong>LumiqPrint</strong><small>Printed library</small></div>
          </div>
        </section>

        <section className="container reveal" style={{ padding: "1rem 2rem 4rem" }}>
          <div className="member-grid">
            <div className="member-card reveal d1"><span className="member-ico">👨‍👩‍👧‍👦</span><h4 className="serif">One family account</h4><p>Manage the whole household via the parent dashboard.</p></div>
            <div className="member-card reveal d2"><span className="member-ico">🧒</span><h4 className="serif">Up to 4 child profiles</h4><p>Each child can pick up where they left off and manage their own favorite books.</p></div>
            <div className="member-card reveal d3"><span className="member-ico">📱</span><h4 className="serif">Multi-device, one tap</h4><p>Add additional LumiqKobis and LumiqPals with scan of the QR code.</p></div>
            <div className="member-card reveal d1"><span className="member-ico">✨</span><h4 className="serif">Instant Story Pass unlock</h4><p>Unlock even more features and experiences with subscriptions.</p></div>
            <div className="member-card reveal d2"><span className="member-ico">☁️</span><h4 className="serif">Cloud-synced creations</h4><p>Keep all the Stories, ImagiMe characters free. Forever!</p></div>
            <div className="member-card reveal d3"><span className="member-ico">📚</span><h4 className="serif">Be the Hero then Print</h4><p>Bring your character life and received the personalized hardcover book shipped directly to your door.</p></div>
          </div>
        </section>
      </div>

      {/* Community Voices */}
      <section className="ed-section container reveal">
        <div className="ed-section-head">
          <span className="kicker"></span>
          <h2 className="serif">A small chorus expressing their thoughts.</h2>
        </div>
        <div className="ed-voices">
          {voices.map((v) => (
            <figure key={v.name} className="ed-voice reveal">
              <blockquote className="serif">&ldquo;{v.quote}&rdquo;</blockquote>
              <figcaption>— {v.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <section className="ed-subscribe reveal">
        <div className="container ed-subscribe-inner">
          <span className="kicker" style={{ color: "var(--gold)" }}>NEWSLETTER</span>
          <h2 className="serif">Stay in the Dream</h2>
          <p>Occasional dispatches on new magic that we&apos;re making. Stay updated with our newest developments</p>
          <form className="ed-subscribe-form" onSubmit={(e) => { e.preventDefault(); setEmail(""); }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit" className="btn btn-navy">Subscribe</button>
          </form>
          <p className="ed-subscribe-note">No spam. Unsubscribe any time.</p>
        </div>
      </section>

      <style>{`
        .editorial-page { color: var(--ink); padding-top: 4rem; line-height: 1.75; }
        .editorial-page > section, .editorial-page > .lumiq-root { margin-bottom: 4rem; }
        .editorial-page > .lumiq-root > section { margin-bottom: 0; }
        @media (max-width: 900px) { .editorial-page > section, .editorial-page > .lumiq-root { margin-bottom: 2.5rem; } }
        .editorial-page p { line-height: 1.8; }
        .lumiq-root .section-head.section-head-left { text-align: left; margin-left: 0; }
        .lumiq-root .section-head.section-head-left p.lead { margin-left: 0; margin-right: 0; max-width: 720px; line-height: 1.8; }
        .lumiq-root .member-card p { line-height: 1.75; }

        .ed-section { padding: 6rem 2rem; }
        .ed-section-head { max-width: 720px; margin-bottom: 3rem; }
        .ed-section-head h2 { font-size: clamp(2rem, 4vw, 3rem); line-height: 1.15; margin-top: 0.5rem; }
        .ed-section-foot { margin-top: 2.5rem; }
        .ed-arrow-link { color: var(--ink-2); font-weight: 500; letter-spacing: 0.02em; border-bottom: 1px solid var(--ink-4); padding-bottom: 2px; transition: color .25s, border-color .25s; }
        .ed-arrow-link:hover { color: var(--gold); border-color: var(--gold); }

        .ed-hero { padding: 4rem 0 2rem; }
        .ed-hero-inner { display: grid; grid-template-columns: 1fr 1.1fr; gap: 4rem; align-items: center; }
        .ed-hero-text h1 { font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1.02; letter-spacing: -0.02em; margin: 0.75rem 0 1.5rem; }
        .ed-hero-text h1 em { font-style: italic; color: var(--gold); }
        .ed-lead { font-size: 1.15rem; color: var(--ink-2); max-width: 480px; line-height: 1.65; }
        .ed-cta-row { display: flex; align-items: center; gap: 1.5rem; margin-top: 2rem; flex-wrap: wrap; }
        .btn-ghost-link { color: var(--ink-2); border-bottom: 1px solid var(--ink-3); padding-bottom: 2px; font-size: 0.95rem; }
        .btn-ghost-link:hover { color: var(--ink); border-color: var(--ink); }
        .ed-hero-media { aspect-ratio: 16 / 10; overflow: hidden; border-radius: 8px; box-shadow: var(--shadow-lg); }
        .ed-hero-media img { width: 100%; height: 100%; object-fit: cover; display: block; animation: ed-kenburns 14s ease-in-out infinite alternate; }
        @keyframes ed-kenburns { from { transform: scale(1) translate(0,0); } to { transform: scale(1.06) translate(-1%, -1%); } }

        .ed-bento { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .ed-bento-card { display: flex; flex-direction: column; gap: 1rem; }
        .ed-bento-media { aspect-ratio: 1; overflow: hidden; border-radius: 6px; background: var(--cream-2); }
        .ed-bento-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.8s; }
        .ed-bento-card:hover .ed-bento-media img { transform: scale(1.04); }
        .ed-bento-card h3 { font-size: 1.4rem; }
        .ed-bento-card p { color: var(--ink-2); line-height: 1.6; }

        .ed-voices { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
        .ed-voice { margin: 0; padding: 2rem; background: var(--card); border: 1px solid var(--border); border-radius: 8px; backdrop-filter: blur(8px); }
        .ed-voice blockquote { font-size: 1.15rem; line-height: 1.5; color: var(--ink); margin: 0 0 1.5rem; }
        .ed-voice figcaption { color: var(--ink-3); font-size: 0.9rem; }

        .ed-subscribe { position: relative; padding: 7rem 0; overflow: hidden; margin-top: 4rem; background: #fff; border-top: 1px solid var(--border); }
        .ed-subscribe-inner { position: relative; z-index: 1; text-align: center; color: var(--ink); }
        .ed-subscribe-inner h2 { font-size: clamp(2rem, 4vw, 3rem); margin: 0.5rem 0 1rem; color: var(--ink); }
        .ed-subscribe-inner p { color: var(--ink-2); max-width: 500px; margin: 0 auto; }
        .ed-subscribe-form { display: flex; gap: 0.75rem; max-width: 460px; margin: 2rem auto 0.75rem; }
        .ed-subscribe-form input { flex: 1; padding: 0.85rem 1rem; border-radius: 999px; background: #fff; color: var(--ink); font-size: 0.95rem; border: 1px solid var(--border-h); }
        .ed-subscribe-form input:focus { border-color: var(--ink); }
        .ed-subscribe-note { font-size: 0.8rem; color: var(--ink-3); }

        @media (max-width: 900px) {
          .ed-hero-inner { grid-template-columns: 1fr; gap: 2.5rem; }
          .ed-bento, .ed-voices { grid-template-columns: 1fr; gap: 1.5rem; }
          .ed-section { padding: 4rem 1.25rem; }
          .ed-subscribe { padding: 5rem 0; }
          .ed-subscribe-form { flex-direction: column; padding: 0 1rem; }
        }
      `}</style>
    </div>
  );
}
