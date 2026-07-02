"use client";
import Link from "next/link";

const ways = [
  { img: "/pal-craft.jpg", pillCls: "fp-purple", pill: "Voice First", title: "Smart Assistant", body: "Ask questions, get gentle, kid-safe answers — like Alexa, but built for bedtime and curiosity." },
  { img: "/pal-hero.jpg", pillCls: "fp-gold", pill: "In Sync", title: "Ambient Story Sync", body: "As the story changes, new interactions and abilities appear. Talk with the characters in the room." },
  { img: "/community-hero.jpg", pillCls: "fp-mint", pill: "Coming Soon", title: "More AI Features Coming", body: "Character conversations, story coaching, and dreamtime companions — rolling out over time." },
];

export default function PalPage() {
  return (
    <div className="lumiq-root editorial-page" style={{ paddingTop: "6rem", color: "var(--ink)" }}>
      <div className="bg-layer" aria-hidden>
        <div className="stars" />
        <div className="bokeh b1" />
        <div className="bokeh b4" />
      </div>

      <section className="container" style={{ padding: "1.5rem 2rem 1rem", maxWidth: 1200 }}>
        <Link href="/products" style={{ color: "var(--ink-3)", fontSize: ".9rem" }}>← All products</Link>

        <div className="sec-head rose" style={{ marginTop: "1.5rem" }}>
          <div className="sec-num rose">02</div>
          <div className="sec-head-body">
            <span className="kicker" style={{ color: "var(--rose)" }}>LumiqPal</span>
            <h1>Holographic <em>Companion</em></h1>
            <p className="sec-lede">An interactive holographic companion that responds to your child — and a gentle presence for the adults you love.</p>
            <div className="price-line">
              <div className="price"><small>USD</small>599</div>
              <Link href="/prelaunch" className="btn btn-navy">Buy LumiqPal →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "0 2rem", maxWidth: 1200 }}>
        <div className="detail-split">
          <div>
            <span className="kicker">The Perfect Companion</span>
            <h2>Magic on the bedside table.</h2>
            <p>LumiqPal reacts to whichever story is being read — allowing the child to talk and interact with the characters and ask questions. Take character understanding to a whole new level.</p>
            <div className="callout">
              <h5>Synced with LumiqKobi</h5>
              <p>Syncs progress, character learning and adaptation across devices.</p>
            </div>
          </div>
          <div className="ds-img">
            <img src="/pal-hero-new.jpg" alt="LumiqPal device" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="container lq-section" style={{ padding: "2rem 2rem 4rem", maxWidth: 1200 }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 2.5rem" }}>
          <span className="kicker" style={{ justifyContent: "center" }}>Two lives. One object.</span>
          <h2 className="serif" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", margin: ".5rem 0 0", color: "var(--ink)" }}>
            A companion, at every age.
          </h2>
        </div>

        <div className="pal-tracks">
          <article className="pal-track">
            <div className="pal-track-img"><img src="/pal-kid.jpg" alt="LumiqPal for kids" loading="lazy" /></div>
            <span className="kicker" style={{ color: "var(--rose)" }}>For Kids</span>
            <h3 className="serif" style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)", margin: ".5rem 0 1rem" }}>Story Extension</h3>
            <p style={{ color: "var(--ink-2)", marginBottom: "1.25rem" }}>Pairs with LumiqKobi. Stories leave the screen and live in the room.</p>
            <ul className="pal-list" style={{ listStyle: "none", padding: 0 }}>
              <li>Projects characters into the air</li>
              <li>Voice &amp; light react to the story</li>
              <li>Gentle bedtime mode</li>
            </ul>
          </article>

          <article className="pal-track">
            <div className="pal-track-img"><img src="/pal-elder.jpg" alt="LumiqPal for adults and elderly" loading="lazy" /></div>
            <span className="kicker" style={{ color: "var(--purple)" }}>For Adults &amp; Elderly</span>
            <h3 className="serif" style={{ fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)", margin: ".5rem 0 1rem" }}>Care &amp; Companion</h3>
            <p style={{ color: "var(--ink-2)", marginBottom: "1.25rem" }}>A gentle presence on the side table — for company, calm and quiet check-ins.</p>
            <ul className="pal-list" style={{ listStyle: "none", padding: 0 }}>
              <li>Soft voice check-ins &amp; reminders</li>
              <li>Ambient light and soundscapes</li>
              <li>One-tap call to family</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="container" style={{ padding: "2rem 2rem 6rem", maxWidth: 1280 }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 className="serif" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", margin: 0, color: "var(--ink)" }}>
            Three ways LumiqPal joins the story
          </h2>
        </div>
        <div className="ways-grid">
          {ways.map((w) => (
            <article key={w.title} className="way-card">
              <div className="way-img"><img src={w.img} alt={w.title} loading="lazy" /></div>
              <div className="way-body">
                <span className={`f-pill ${w.pillCls}`}>{w.pill}</span>
                <h4>{w.title}</h4>
                <p>{w.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="strengths" className="container reveal" style={{ paddingTop: "1rem" }}>
        <div className="section-head">
          <span className="kicker font-sans text-lg" style={{ color: "var(--purple)" }}>Everyday Strengths</span>
          <h2 className="serif">Five quiet strengths LumiqPal brings into the home.</h2>
          <p className="lead text-xl md:text-2xl">
            For the adults and elders we love — a calm presence on the side table, helping daily life feel a little softer, a little safer, and never alone.
          </p>
        </div>
        <div className="value-grid">
          <div className="value-card reveal d1">
            <span className="value-badge">✨ Strength 01</span>
            <h4 className="serif">Gentle Company</h4>
            <p>A soft voice in the room — quietly there for quiet moments, and never alone at night.</p>
          </div>
          <div className="value-card reveal d2">
            <span className="value-badge">🧭 Strength 02</span>
            <h4 className="serif">Daily Rhythm</h4>
            <p>Medicine, meals and walk reminders that feel kind and personal — not clinical.</p>
          </div>
          <div className="value-card reveal d3">
            <span className="value-badge">💬 Strength 03</span>
            <h4 className="serif">Calm Conversation</h4>
            <p>Story prompts, memory chats and easy questions that keep the mind moving and engaged.</p>
          </div>
          <div className="value-card reveal d1">
            <span className="value-badge">🫶 Strength 04</span>
            <h4 className="serif">One Tap to Family</h4>
            <p>Call or message loved ones without menus, screens or fiddly buttons — just a touch.</p>
          </div>
          <div className="value-card reveal d2">
            <span className="value-badge">🌙 Strength 05</span>
            <h4 className="serif">Restful Nights</h4>
            <p>Ambient light and soft soundscapes that help drift off, and gentle company until morning.</p>
          </div>
        </div>
      </section>

      <style>{`
        .pal-tracks { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .pal-track { background: var(--card); border: 1px solid var(--border); border-radius: 24px; padding: 1.5rem 1.5rem 2rem; backdrop-filter: blur(10px); transition: transform .35s, box-shadow .35s; }
        .pal-track:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
        .pal-track-img { aspect-ratio: 4/3; overflow: hidden; border-radius: 16px; margin-bottom: 1.25rem; }
        .pal-track-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pal-list li { padding: .6rem 0; border-bottom: 1px solid var(--border); color: var(--ink-2); }
        .pal-list li:last-child { border-bottom: none; }
        .pal-list li::before { content: "✦"; color: var(--gold); margin-right: .6rem; }
        @media (max-width: 820px) { .pal-tracks { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
