"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ways = [
  { img: "/why-a.jpg", pillCls: "fp-purple", pill: "Infinite Library ∞", title: "Classical Story", body: "Unlimited reading across every genre kids love — fairy tales, myths, sci-fi, fables and more, all in one shelf." },
  { img: "/why-b.jpg", pillCls: "fp-gold", pill: "Become the Hero", title: "ImagiMe", body: "Advanced face-swap places your child right into the artwork. Order any story as a hardcover keepsake." },
  { img: "/why-c.jpg", pillCls: "fp-mint", pill: "Remix the Classics", title: "ReImagined", body: "Take a beloved classic and let your child rewrite it — pick the twists, the heroes and the ending. A brand-new tale, every time." },
  { img: "/story-hero.jpg", pillCls: "fp-purple", pill: "Lumiq Exclusive", title: "LumiqOriginal", body: "Original interactive stories, games and educational shorts — crafted by Lumiq to keep your child company, all day, every day." },
  { img: "/products-hero.jpg", pillCls: "fp-gold", pill: "Choose Your Path", title: "StoryQuest", body: "In a world of infinite ripples, your choices define your end. Discover 50+ ways the story concludes." },
];

export default function TabletPage() {
  const [dashPage, setDashPage] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );
    rootRef.current.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="lumiq-root editorial-page" style={{ paddingTop: "6rem", color: "var(--ink)" }}>
      <div className="bg-layer" aria-hidden>
        <div className="stars" />
        <div className="bokeh b1" />
        <div className="bokeh b4" />
      </div>

      <section className="container" style={{ padding: "1.5rem 2rem 1rem", maxWidth: 1200 }}>
        <Link href="/products" style={{ color: "var(--ink-3)", fontSize: ".9rem" }}>← All products</Link>
        <div className="sec-head" style={{ marginTop: "1.5rem" }}>
          <div className="sec-num purple">01</div>
          <div className="sec-head-body">
            <span className="kicker">LumiqTablet</span>
            <h1>A Tablet Built for <em>Wonder</em></h1>
            <p className="sec-lede">Engineered from the ground up for a safe, magical reading experience — without app stores, ads, or distractions.</p>
            <div className="price-line">
              <div className="price"><small>USD</small>399</div>
              <Link href="/prelaunch" className="btn btn-navy">Buy LumiqTablet →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "0 2rem", maxWidth: 1200 }}>
        <div className="detail-split">
          <div className="ds-img">
            <img src="/tablet-hero.jpg" alt="LumiqTablet device" loading="lazy" />
          </div>
          <div>
            <span className="kicker">Automatic Updates</span>
            <h2>Be immersed into the story</h2>
            <p>An easy to read display, hardware blue-light filter, and zero-distraction OS — so children can simply read, listen, and explore.</p>
            <ul className="spec-list" style={{ listStyle: "none", padding: 0 }}>
              <li>10.1&quot; Anti-glare display</li>
              <li>Blue-light reduction hardware filter</li>
              <li>No browser, no ads, offline reading</li>
              <li>Supports multiple languages in voice &amp; text</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "2rem 2rem 4rem", maxWidth: 1280 }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 className="serif" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", margin: 0, color: "var(--ink)" }}>
            Five ways stories come alive
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

      <section id="why" className="container reveal">
        <div className="section-head">
          <span className="kicker font-sans text-lg">Why Lumiq</span>
          <h2 className="serif">When AI is everywhere, kids who can&apos;t think with it get left behind.</h2>
          <p className="lead text-xl md:text-2xl">
            Lumiq isn&apos;t about giving children technology earlier. It&apos;s about making sure that during their
            very first reading years, they grow up unafraid to think alongside AI — choosing, imagining,
            and creating instead of passively swiping.
          </p>
        </div>
        <div className="why-grid">
          <div className="why-card passive reveal d1">
            <span className="why-tag">Traditional screen time</span>
            <h3 className="serif">Passive watching. Endless scrolling.</h3>
            <p>The child goes quiet — but isn&apos;t thinking. Attention can shift from one app to another from reading to videos to games. Jumping from one frame after another with shorter and shorter attention span. No immersion.</p>
            <div className="why-emoji">📱  📺  🎬  😴</div>
          </div>
          <div className="why-card active reveal d2">
            <span className="why-tag accent">Lumiq story time</span>
            <h3 className="serif">Active reading. Imagining together.</h3>
            <p>The child sits up. There is only reading and focused attention. They can read each story with illustration or choose to be in the story. Something the whole family can be involved together. Choose what happens next, and become the hero. Reading, thinking and creating — all at once.</p>
            <div className="why-emoji">📖  ✨  🦄  🌌</div>
          </div>
        </div>
      </section>

      <section id="spotlights" className="container reveal d1">
        <div className="section-head">
          <span className="kicker font-sans text-lg">Stories They Read. Adventures They Remember</span>
          <h2 className="serif">Designed for Little Dreamers</h2>
          <p className="lead text-xl md:text-2xl">
            Lumiq turns reading time into a personal journey — combining classic tales, original adventures, sound, pictures, face personalization, printable books, and interactive choices made just for children.
          </p>
        </div>
        <div className="pillars-grid">
          <div className="pillar-card reveal d1">
            <div className="pillar-art">
              <img src="/img/spotlight-stories.jpg" alt="Magical storybook with castle, dragon and characters" loading="lazy" />
            </div>
            <h3 className="serif">Endless Stories</h3>
            <p>With classical stories, putting yourself into the stories, and choosing your own path, the possibilties are endless</p>
          </div>
          <div className="pillar-card reveal d2">
            <div className="pillar-art" style={{ background: "linear-gradient(135deg, var(--peach), var(--blush))" }}>
              <img src="/img/spotlight-touch.jpg" alt="Child's hand touching a magical tablet screen with sparkles" loading="lazy" />
            </div>
            <h3 className="serif">Touch &amp; Discover</h3>
            <p>Interactive stories and the ability to combine with Lumiqpal to enhance the interaction between characters and bringing your interaction to life</p>
          </div>
          <div className="pillar-card reveal d3">
            <div className="pillar-art" style={{ background: "linear-gradient(135deg, var(--mint), var(--lilac))" }}>
              <img src="/img/spotlight-safe.jpg" alt="Protective shield around a tablet with parental controls" loading="lazy" />
            </div>
            <h3 className="serif">Safe &amp; Sound</h3>
            <p>Built-in parental controls, blue-light filtering, and screen-time management. Designed for focusing on the adventures</p>
          </div>
        </div>
      </section>

      <section id="how" className="container reveal">
        <div className="section-head">
          <span className="kicker font-sans text-lg">How It Works</span>
          <h2 className="serif">Four steps to bring stories into your child&apos;s room.</h2>
          <p className="lead text-xl md:text-2xl">
            Lumiq turns reading into a journey kids can choose, shape and see — every step
            pulls them closer to thinking with AI, never further from imagining on their own.
          </p>
        </div>
        <div className="how-grid">
          <div className="how-step reveal d1">
            <div className="how-num">01</div>
            <h4 className="serif">Read</h4>
            <p>Open a story on the tablet — text, illustration, narration and music arrive together so kids are immersed from the very first page.</p>
          </div>
          <div className="how-step reveal d2">
            <div className="how-num">02</div>
            <h4 className="serif">Interact</h4>
            <p>While reading, the illustrations come to life. Taking the interaction to a whole new — hours of endless interaction.</p>
          </div>
          <div className="how-step reveal d3">
            <div className="how-num">03</div>
            <h4 className="serif">Create</h4>
            <p>Put your face into the character with up to 3 faces in total — Record your own voice and have it read to you. Experience and make the story your very own.</p>
          </div>
          <div className="how-step reveal d4">
            <div className="how-num">04</div>
            <h4 className="serif">See It Come Alive</h4>
            <p>Place the tablet beside LumiqPal and experience the ultimate interaction with the characters — understand and ask questions about what&apos;s happening.</p>
          </div>
        </div>
      </section>

      <section id="grows" className="container reveal">
        <div className="section-head">
          <span className="kicker font-sans text-lg">Grows With Your Child</span>
          <h2 className="serif">A storyworld that grows up with them.</h2>
          <p className="lead text-xl md:text-2xl">
            From the very first lullaby to their first self-written novel, Lumiq evolves through three magical chapters of childhood — and your child is always the hero.
          </p>
        </div>
        <div className="age-grid">
          <div className="age-card reveal d1">
            <div className="age-art">
              <img src="/img/age-3-5.jpg" alt="Parent and toddler reading a glowing storybook together" loading="lazy" />
            </div>
            <span className="age-badge">Ages 3–5</span>
            <h3 className="serif">Gentle Beginnings</h3>
            <p className="age-sub">The first lullabies and bedtime tales — read in your own voice. Even when you&apos;re busy, Lumiq narrates with the parent voice your child knows by heart, while ImagiMe places them right inside the picture book.</p>
            <ul className="age-list">
              <li>Classic tales &amp; nursery rhymes, beautifully illustrated</li>
              <li>Parent-voice narration — your voice, on every page</li>
              <li>ImagiMe: your child becomes the hero of the story</li>
              <li>Soft-light, low-blue, no-autoplay co-read mode</li>
            </ul>
          </div>
          <div className="age-card featured reveal d2">
            <div className="age-art">
              <img src="/img/age-6-8.jpg" alt="Child reaching toward a holographic fairy companion" loading="lazy" />
            </div>
            <span className="age-badge">Ages 6–8</span>
            <h3 className="serif">Interactive Imagination</h3>
            <p className="age-sub">Stories step out of the screen. Talk to fairy-tale friends through LumiqPal, ask &ldquo;why are you scared?&rdquo;, and watch the interaction become more immersive and understanding character even more.</p>
            <ul className="age-list">
              <li>Talk &amp; play with characters via LumiqPal</li>
              <li>Print their masterpiece as a LumiqBook hardcover</li>
              <li>Holographic story projections in the room</li>
              <li>Reward charts that celebrate active reading</li>
            </ul>
          </div>
          <div className="age-card reveal d3">
            <div className="age-art">
              <img src="/img/age-9-12.jpg" alt="Pre-teen co-creating a fantasy story with a tablet" loading="lazy" />
            </div>
            <span className="age-badge">Ages 9–12</span>
            <h3 className="serif">Creative Deep-Dive</h3>
            <p className="age-sub">Stories can be even more adventurous with 3 possible choices and over 50+ possible endings. The decisions made will create different endings that allows you to be the hero or become the villain.</p>
            <ul className="age-list">
              <li>Chaptered StoryQuest novels with 50+ endings</li>
              <li>Decision making allows logical thinking</li>
              <li>Branching &amp; decision-making fun</li>
              <li>Continuous stories</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="thinking" className="container reveal" style={{ marginTop: 0, paddingTop: 0 }}>
        <div className="section-head">
          <span className="kicker font-sans text-lg">Little Superpowers</span>
          <h2 className="serif">Five real-world superpowers, hidden inside every story.</h2>
          <p className="lead text-xl md:text-2xl">
            Every Lumiq adventure helps kids grow while they play — building creativity, confidence, curiosity, and communication skills for the future.
          </p>
        </div>
        <div className="value-grid">
          <div className="value-card reveal d1">
            <span className="value-badge">✨ Power 01</span>
            <h4 className="serif">Love for Reading</h4>
            <p>No more zoning out in front of a screen. Kids keep turning pages because they want to know what happens next.</p>
          </div>
          <div className="value-card reveal d2">
            <span className="value-badge">🧭 Power 02</span>
            <h4 className="serif">Smart Little Decisions</h4>
            <p>Every choice shapes the story. Kids learn to think, decide, explore outcomes, and trust their own judgment.</p>
          </div>
          <div className="value-card reveal d3">
            <span className="value-badge">🎨 Power 03</span>
            <h4 className="serif">Big Imagination, Out Loud</h4>
            <p>From silly creatures to magical worlds, Lumiq helps kids turn ideas in their head into stories they can actually see and share.</p>
          </div>
          <div className="value-card reveal d1">
            <span className="value-badge">🤖 Power 04</span>
            <h4 className="serif">Talking With AI, Naturally</h4>
            <p>Kids learn how to ask questions, express ideas, and communicate clearly — through fun conversations, not homework.</p>
          </div>
          <div className="value-card reveal d2">
            <span className="value-badge">📚 Power 05</span>
            <h4 className="serif">From Idea to Finished Story</h4>
            <p>A tiny spark becomes a real storybook. Kids create, finish, and proudly see their ideas come to life.</p>
          </div>
        </div>
      </section>

      <section id="parents" className="container reveal">
        <div className="section-head">
          <span className="kicker font-sans text-lg">Parent Peace of Mind</span>
          <h2 className="serif">A Parent Center built for trust — locked behind your PIN</h2>
          <p className="lead text-xl md:text-2xl">
            Every setting, purchase and screen-time change lives inside the Parent Center — protected by a 6-digit Parent PIN. Kids can read and play freely; only you can change profiles, unlock content, set limits, or spend points. No accidental taps. No surprise charges. Tap any card to preview it.
          </p>
        </div>

        <div className="parent-grid">
          <div className="parent-dash reveal d1">
            <div className="dash-pages">
              <div className={`dash-page${dashPage === 0 ? " active" : ""}`}>
                <div className="dash-head">
                  <span className="dash-pill">Profiles · Pro Plan</span>
                  <span className="dash-time">3 / 3 profiles</span>
                </div>
                <div className="dash-profiles rich">
                  {[
                    { ico: "👧", name: "Little Star", age: "Age 5", tint: "linear-gradient(135deg,#ffd6e7,#ffb3d1)" },
                    { ico: "👸", name: "Little Princess", age: "Age 7", tint: "linear-gradient(135deg,#e6d6ff,#c9a8ff)" },
                    { ico: "🧒", name: "Little Buddy", age: "Age 9", tint: "linear-gradient(135deg,#d6ecff,#a8d1ff)" },
                  ].map((p) => (
                    <div className="dash-profile rich" key={p.name}>
                      <span className="dp-avatar lg" style={{ background: p.tint }}>{p.ico}</span>
                      <div className="dp-meta">
                        <strong>{p.name}</strong>
                        <small>{p.age} · ImagiMe ready</small>
                      </div>
                      <span className="dp-btn">Settings →</span>
                    </div>
                  ))}
                </div>
                <div className="dash-chips">
                  <span className="dash-chip">✏️ Name &amp; avatar</span>
                  <span className="dash-chip">👨‍👩‍👧 Family characters</span>
                  <span className="dash-chip">🎙 Voice-over</span>
                </div>
              </div>

              <div className={`dash-page${dashPage === 1 ? " active" : ""}`}>
                <div className="dash-head">
                  <span className="dash-pill">Control · Little Star</span>
                  <span className="dash-time">🔒 PIN required</span>
                </div>
                <div className="ctrl-card">
                  <div className="ctrl-row">
                    <strong>⏰ Daily Screen Time</strong>
                    <span className="ctrl-val">30 min</span>
                  </div>
                  <input type="range" min={10} max={120} defaultValue={30} className="ctrl-range" readOnly />
                  <div className="ctrl-scale"><span>10m</span><span>30m</span><span>60m</span><span>120m</span></div>
                  <div className="ctrl-used">Used today · <b>13 min</b> of 30 min</div>
                </div>
                <div className="ctrl-card">
                  <div className="ctrl-row"><strong>🛡 Age Filter</strong><span className="ctrl-val">Ages 1–5</span></div>
                  <div className="ctrl-toggles">
                    {[
                      { l: "1–3", on: true },
                      { l: "3–5", on: true },
                      { l: "6–8", on: false },
                      { l: "9–12", on: false },
                      { l: "12+", on: false },
                    ].map((t) => (
                      <button key={t.l} type="button" className={`ctrl-tog${t.on ? " on" : ""}`}>
                        <span className="ctrl-dot" />{t.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`dash-page${dashPage === 2 ? " active" : ""}`}>
                <div className="dash-head">
                  <span className="dash-pill">Reading This Week</span>
                  <span className="dash-time">May 25 – May 31</span>
                </div>
                <div className="dash-bars">
                  {[50, 67, 27, 83, 100, 40, 60].map((h, i) => (
                    <div key={i} className="dash-bar"><span style={{ height: `${h}%` }} /><em>{["M","T","W","T","F","S","S"][i]}</em></div>
                  ))}
                </div>
                <div className="dash-stats">
                  <div className="dash-stat"><div className="dash-label">Books Read</div><div className="dash-val">7</div></div>
                  <div className="dash-stat"><div className="dash-label">Total Time</div><div className="dash-val">128m</div></div>
                </div>
                <div className="dash-mini"><strong>Recently Read</strong><span> </span></div>
                <div className="book-row">
                  {[
                    { t: "The Little Princess Castle", c: "linear-gradient(160deg,#ffb3d1,#c9a8ff)", e: "🏰" },
                    { t: "Forest Picnic Fun", c: "linear-gradient(160deg,#a8e6c5,#7fd1a0)", e: "🧺" },
                    { t: "Little Astronaut", c: "linear-gradient(160deg,#9ec5ff,#6a8dff)", e: "🚀" },
                  ].map((b) => (
                    <div className="book-card" key={b.t}>
                      <div className="book-cover" style={{ background: b.c }}><span>{b.e}</span></div>
                      <small>{b.t}</small>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`dash-page${dashPage === 3 ? " active" : ""}`}>
                <div className="dash-head">
                  <span className="dash-pill">Points &amp; Awards</span>
                  <span className="dash-time">✨ 45 pts</span>
                </div>
                <div className="pts-hero">
                  <div className="pts-num">✨ 45</div>
                  <div className="pts-sub">Little Star&apos;s points · Spend in Shop</div>
                </div>
                <div className="medals">
                  {[
                    { ico: "📚", l: "Bookworm", c: "linear-gradient(160deg,#ffd66b,#ff9d3d)" },
                    { ico: "🔥", l: "On Fire", c: "linear-gradient(160deg,#ff8a8a,#ee5a70)" },
                    { ico: "🌟", l: "Rising Star", c: "linear-gradient(160deg,#a8d1ff,#6a8dff)" },
                    { ico: "🦸", l: "Hero Reader", c: "linear-gradient(160deg,#c9a8ff,#7c5bd0)" },
                  ].map((m) => (
                    <div className="medal" key={m.l}>
                      <div className="medal-disc" style={{ background: m.c }}>
                        <span>{m.ico}</span>
                      </div>
                      <small>{m.l}</small>
                    </div>
                  ))}
                </div>
                <div className="dash-mini">
                  <strong>How to Earn</strong>
                  <span>Original Story +10pt · AI Story +30pt · Treasure Adventure +50pt</span>
                </div>
              </div>

              <div className={`dash-page${dashPage === 4 ? " active" : ""}`}>
                <div className="dash-head">
                  <span className="dash-pill">Shop · 🔒 PIN to purchase</span>
                  <span className="dash-time">✨ 45 pts</span>
                </div>
                <div className="shop-section-l">Lumiq Add-ons</div>
                <div className="shop-grid">
                  {[
                    { e: "✨", t: "Extra AI Story", p: "200 pts", $: "$0.99", c: "linear-gradient(160deg,#fff1c2,#ffd66b)" },
                    { e: "🗺", t: "Treasure Adventure", p: "300 pts", $: "$1.49", c: "linear-gradient(160deg,#c9f0d6,#7fd1a0)" },
                    { e: "📖", t: "Hardcover Book", p: "1000 pts", $: "$5.99", c: "linear-gradient(160deg,#ffd6e7,#ff9ec0)" },
                  ].map((s) => (
                    <div className="shop-card" key={s.t}>
                      <div className="shop-thumb" style={{ background: s.c }}><span>{s.e}</span></div>
                      <strong>{s.t}</strong>
                      <small>{s.p} · {s.$}</small>
                      <button type="button" className="shop-buy">Add</button>
                    </div>
                  ))}
                </div>
                <div className="shop-section-l">Partner Toys &amp; Gifts</div>
                <div className="shop-grid two">
                  {[
                    { e: "🏎", t: "Race Car Toy", p: "500 pts", c: "linear-gradient(160deg,#9ec5ff,#6a8dff)" },
                    { e: "👗", t: "Barbie Doll", p: "600 pts", c: "linear-gradient(160deg,#ffd6e7,#ff9ec0)" },
                  ].map((s) => (
                    <div className="shop-card" key={s.t}>
                      <div className="shop-thumb" style={{ background: s.c }}><span>{s.e}</span></div>
                      <strong>{s.t}</strong>
                      <small>{s.p} · coupon</small>
                      <button type="button" className="shop-buy">Redeem</button>
                    </div>
                  ))}
                </div>
                <div className="pin-bar">🔐 Every purchase &amp; redemption requires your Parent PIN</div>
              </div>
            </div>

            <div className="dash-dots">
              {[0,1,2,3,4].map((i) => (
                <button key={i} type="button" aria-label={`Page ${i+1}`} className={dashPage === i ? "active" : ""} onClick={() => setDashPage(i)} />
              ))}
            </div>
          </div>

          <div className="parent-list reveal d2">
            <button type="button" className={`parent-item${dashPage === 0 ? " hl" : ""}`} onClick={() => setDashPage(0)}>
              <span className="parent-ico">👧</span>
              <div><strong>1 · Profile Management</strong><p>Up to 3 kid profiles. Tap any profile to open Settings — change name, gender &amp; avatar, add family characters (Mom, Dad…), and swap the voice-over your child hears.</p></div>
            </button>
            <button type="button" className={`parent-item${dashPage === 1 ? " hl" : ""}`} onClick={() => setDashPage(1)}>
              <span className="parent-ico">🛡</span>
              <div><strong>2 · Control</strong><p>Set a Daily Screen Time cap to protect little eyes, plus an Age Filter so a 3-year-old never stumbles into content built for 9–13. Locked behind your Parent PIN.</p></div>
            </button>
            <button type="button" className={`parent-item${dashPage === 2 ? " hl" : ""}`} onClick={() => setDashPage(2)}>
              <span className="parent-ico">📊</span>
              <div><strong>3 · Dashboard</strong><p>A weekly view of reading time, number of books finished, and the exact titles your child explored — clear receipts on what&apos;s actually happening on screen.</p></div>
            </button>
            <button type="button" className={`parent-item${dashPage === 3 ? " hl" : ""}`} onClick={() => setDashPage(3)}>
              <span className="parent-ico">🏆</span>
              <div><strong>4 · Awards &amp; Points</strong><p>Turn reading into the best game of the day. Kids earn points and badges for every story finished — a built-in way to nudge them toward more reading, less scrolling.</p></div>
            </button>
            <button type="button" className={`parent-item${dashPage === 4 ? " hl" : ""}`} onClick={() => setDashPage(4)}>
              <span className="parent-ico">🛍</span>
              <div><strong>5 · Shop</strong><p>Spend points or cash on Lumiq add-ons (extra AI stories, hardcover keepsake books) and partner-brand toy coupons. Every checkout requires your PIN — no surprise charges, ever.</p></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
