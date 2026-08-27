"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import DraftNotice from "@/components/DraftNotice";

const wayVisuals = [
  { img: "/why-a.jpg", pillCls: "fp-purple" },
  { img: "/why-b.jpg", pillCls: "fp-gold" },
  { img: "/why-c.jpg", pillCls: "fp-mint" },
  { img: "/story-hero.jpg", pillCls: "fp-purple" },
  { img: "/products-hero.jpg", pillCls: "fp-gold" },
];

export default function TabletPage() {
  const t = useTranslations("Tablet");
  const [dashPage, setDashPage] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const ways = wayVisuals.map((way, index) => ({
    ...way,
    pill: t(`way${index + 1}Pill`),
    title: t(`way${index + 1}Title`),
    body: t(`way${index + 1}Body`),
  }));

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
    rootRef.current
      .querySelectorAll(".reveal")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main
      ref={rootRef}
      className="lumiq-root editorial-page"
      style={{ paddingTop: "6rem", color: "var(--ink)" }}
    >
      <div className="bg-layer" aria-hidden>
        <div className="stars" />
        <div className="bokeh b1" />
        <div className="bokeh b4" />
      </div>

      <section
        className="container"
        style={{ padding: "1.5rem 2rem 1rem", maxWidth: 1200 }}
      >
        <Link
          href="/products"
          style={{ color: "var(--ink-3)", fontSize: ".9rem" }}
        >
          {t("all")}
        </Link>
        <div className="sec-head" style={{ marginTop: "1.5rem" }}>
          <div className="sec-num purple">01</div>
          <div className="sec-head-body">
            <span className="kicker">Lumiq Tablet</span>
            <h1>
              {t("titleBefore")} <em>{t("titleEm")}</em>
            </h1>
            <p className="sec-lede">{t("lede")}</p>
            <DraftNotice>{t("conceptNotice")}</DraftNotice>
            <div className="price-line">
              <div className="price">
                <small>USD</small>399
              </div>
              <Link href="/prelaunch" className="btn btn-navy">
                {t("buy")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="container"
        style={{ padding: "0 2rem", maxWidth: 1200 }}
      >
        <div className="detail-split">
          <div className="ds-img">
            <Image src="/assets/web/lumiq-tablet-hero.webp" alt={t("deviceAlt")} width={1200} height={900} sizes="(max-width: 820px) 100vw, 50vw" priority style={{width: "100%", height: "auto"}} />
          </div>
          <div>
            <span className="kicker">{t("updates")}</span>
            <h2>{t("immersed")}</h2>
            <p>{t("immersedBody")}</p>
            <ul className="spec-list" style={{ listStyle: "none", padding: 0 }}>
              {[1, 2, 3, 4].map((number) => (
                <li key={number}>{t(`spec${number}`)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="container"
        style={{ padding: "2rem 2rem 4rem", maxWidth: 1280 }}
      >
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              margin: 0,
              color: "var(--ink)",
            }}
          >
            {t("waysTitle")}
          </h2>
        </div>
        <div className="ways-grid">
          {ways.map((w) => (
            <article key={w.title} className="way-card">
              <div className="way-img">
                <Image src={w.img} alt={w.title} width={1200} height={900} sizes="(max-width: 820px) 100vw, 33vw" />
              </div>
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
          <span className="kicker font-sans text-lg">{t("why")}</span>
          <h2 className="serif">{t("whyTitle")}</h2>
          <p className="lead text-xl md:text-2xl">{t("whyBody")}</p>
        </div>
        <div className="why-grid">
          <div className="why-card passive reveal d1">
            <span className="why-tag">{t("passiveTag")}</span>
            <h3 className="serif">{t("passiveTitle")}</h3>
            <p>{t("passiveBody")}</p>
            <div className="why-emoji">📱 📺 🎬 😴</div>
          </div>
          <div className="why-card active reveal d2">
            <span className="why-tag accent">{t("activeTag")}</span>
            <h3 className="serif">{t("activeTitle")}</h3>
            <p>{t("activeBody")}</p>
            <div className="why-emoji">📖 ✨ 🦄 🌌</div>
          </div>
        </div>
      </section>

      <section id="spotlights" className="container reveal d1">
        <div className="section-head">
          <span className="kicker font-sans text-lg">{t("spotlights")}</span>
          <h2 className="serif">{t("spotlightsTitle")}</h2>
          <p className="lead text-xl md:text-2xl">{t("spotlightsBody")}</p>
        </div>
        <div className="pillars-grid">
          <div className="pillar-card reveal d1">
            <div className="pillar-art">
              <Image
                src="/img/spotlight-stories.jpg"
                alt={t("spot1Alt")}
                width={1200}
                height={900}
                sizes="(max-width: 960px) 100vw, 33vw"
              />
            </div>
            <h3 className="serif">{t("spot1Title")}</h3>
            <p>{t("spot1Body")}</p>
          </div>
          <div className="pillar-card reveal d2">
            <div className="pillar-art">
              <Image
                src="/img/spotlight-touch.jpg"
                alt={t("spot2Alt")}
                width={1200}
                height={900}
                sizes="(max-width: 960px) 100vw, 33vw"
              />
            </div>
            <h3 className="serif">{t("spot2Title")}</h3>
            <p>{t("spot2Body")}</p>
          </div>
          <div className="pillar-card reveal d3">
            <div className="pillar-art">
              <Image
                src="/img/spotlight-safe.jpg"
                alt={t("spot3Alt")}
                width={1200}
                height={900}
                sizes="(max-width: 960px) 100vw, 33vw"
              />
            </div>
            <h3 className="serif">{t("spot3Title")}</h3>
            <p>{t("spot3Body")}</p>
          </div>
        </div>
      </section>

      <section id="how" className="container reveal">
        <div className="section-head">
          <span className="kicker font-sans text-lg">{t("how")}</span>
          <h2 className="serif">{t("howTitle")}</h2>
          <p className="lead text-xl md:text-2xl">{t("howBody")}</p>
        </div>
        <div className="how-grid">
          <div className="how-step reveal d1">
            <div className="how-num">01</div>
            <h4 className="serif">{t("step1Title")}</h4>
            <p>{t("step1Body")}</p>
          </div>
          <div className="how-step reveal d2">
            <div className="how-num">02</div>
            <h4 className="serif">{t("step2Title")}</h4>
            <p>{t("step2Body")}</p>
          </div>
          <div className="how-step reveal d3">
            <div className="how-num">03</div>
            <h4 className="serif">{t("step3Title")}</h4>
            <p>{t("step3Body")}</p>
          </div>
          <div className="how-step reveal d4">
            <div className="how-num">04</div>
            <h4 className="serif">{t("step4Title")}</h4>
            <p>{t("step4Body")}</p>
          </div>
        </div>
      </section>

      <section id="grows" className="container reveal">
        <div className="section-head">
          <span className="kicker font-sans text-lg">{t("grows")}</span>
          <h2 className="serif">{t("growsTitle")}</h2>
          <p className="lead text-xl md:text-2xl">{t("growsBody")}</p>
        </div>
        <div className="age-grid">
          <div className="age-card reveal d1">
            <div className="age-art">
              <Image src="/img/age-3-5.jpg" alt={t("age1Alt")} width={1200} height={900} sizes="(max-width: 960px) 100vw, 33vw" />
            </div>
            <span className="age-badge">{t("age1Badge")}</span>
            <h3 className="serif">{t("age1Title")}</h3>
            <p className="age-sub">{t("age1Body")}</p>
            <ul className="age-list">
              {[1, 2, 3, 4].map((number) => <li key={number}>{t(`age1Item${number}`)}</li>)}
            </ul>
          </div>
          <div className="age-card featured reveal d2">
            <div className="age-art">
              <Image src="/img/age-6-8.jpg" alt={t("age2Alt")} width={1200} height={900} sizes="(max-width: 960px) 100vw, 33vw" />
            </div>
            <span className="age-badge">{t("age2Badge")}</span>
            <h3 className="serif">{t("age2Title")}</h3>
            <p className="age-sub">{t("age2Body")}</p>
            <ul className="age-list">
              {[1, 2, 3, 4].map((number) => <li key={number}>{t(`age2Item${number}`)}</li>)}
            </ul>
          </div>
          <div className="age-card reveal d3">
            <div className="age-art">
              <Image src="/img/age-9-12.jpg" alt={t("age3Alt")} width={1200} height={900} sizes="(max-width: 960px) 100vw, 33vw" />
            </div>
            <span className="age-badge">{t("age3Badge")}</span>
            <h3 className="serif">{t("age3Title")}</h3>
            <p className="age-sub">{t("age3Body")}</p>
            <ul className="age-list">
              {[1, 2, 3, 4].map((number) => <li key={number}>{t(`age3Item${number}`)}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section
        id="thinking"
        className="container reveal"
        style={{ marginTop: 0, paddingTop: 0 }}
      >
        <div className="section-head">
          <span className="kicker font-sans text-lg">{t("powers")}</span>
          <h2 className="serif">{t("powersTitle")}</h2>
          <p className="lead text-xl md:text-2xl">{t("powersBody")}</p>
        </div>
        <div className="value-grid">
          <div className="value-card reveal d1">
            <span className="value-badge">✨ {t("powerLabel", { number: "01" })}</span>
            <h4 className="serif">{t("power1Title")}</h4>
            <p>{t("power1Body")}</p>
          </div>
          <div className="value-card reveal d2">
            <span className="value-badge">🧭 {t("powerLabel", { number: "02" })}</span>
            <h4 className="serif">{t("power2Title")}</h4>
            <p>{t("power2Body")}</p>
          </div>
          <div className="value-card reveal d3">
            <span className="value-badge">🎨 {t("powerLabel", { number: "03" })}</span>
            <h4 className="serif">{t("power3Title")}</h4>
            <p>{t("power3Body")}</p>
          </div>
          <div className="value-card reveal d1">
            <span className="value-badge">🤖 {t("powerLabel", { number: "04" })}</span>
            <h4 className="serif">{t("power4Title")}</h4>
            <p>{t("power4Body")}</p>
          </div>
          <div className="value-card reveal d2">
            <span className="value-badge">📚 {t("powerLabel", { number: "05" })}</span>
            <h4 className="serif">{t("power5Title")}</h4>
            <p>{t("power5Body")}</p>
          </div>
        </div>
      </section>

      <section id="parents" className="container reveal">
        <div className="section-head">
          <span className="kicker font-sans text-lg">{t("parents")}</span>
          <h2 className="serif">{t("parentsTitle")}</h2>
          <p className="lead text-xl md:text-2xl">{t("parentsBody")}</p>
        </div>

        <div className="parent-grid">
          <div className="parent-dash reveal d1">
            <div className="dash-pages">
              <div className={`dash-page${dashPage === 0 ? " active" : ""}`}>
                <div className="dash-head">
                  <span className="dash-pill">{t("profilesPlan")}</span>
                  <span className="dash-time">{t("profilesCount")}</span>
                </div>
                <div className="dash-profiles rich">
                  {[
                    {
                      ico: "👧",
                      name: t("profile1"),
                      age: t("ageValue", { age: 5 }),
                      tint: "linear-gradient(135deg,#ffd6e7,#ffb3d1)",
                    },
                    {
                      ico: "👸",
                      name: t("profile2"),
                      age: t("ageValue", { age: 7 }),
                      tint: "linear-gradient(135deg,#e6d6ff,#c9a8ff)",
                    },
                    {
                      ico: "🧒",
                      name: t("profile3"),
                      age: t("ageValue", { age: 9 }),
                      tint: "linear-gradient(135deg,#d6ecff,#a8d1ff)",
                    },
                  ].map((p) => (
                    <div className="dash-profile rich" key={p.name}>
                      <span
                        className="dp-avatar lg"
                        style={{ background: p.tint }}
                      >
                        {p.ico}
                      </span>
                      <div className="dp-meta">
                        <strong>{p.name}</strong>
                        <small>{p.age} · {t("imagiMeReady")}</small>
                      </div>
                      <span className="dp-btn">{t("settings")}</span>
                    </div>
                  ))}
                </div>
                <div className="dash-chips">
                  <span className="dash-chip">✏️ {t("nameAvatar")}</span>
                  <span className="dash-chip">👨‍👩‍👧 {t("familyCharacters")}</span>
                  <span className="dash-chip">🎙 {t("voiceOver")}</span>
                </div>
              </div>

              <div className={`dash-page${dashPage === 1 ? " active" : ""}`}>
                <div className="dash-head">
                  <span className="dash-pill">{t("controlProfile", { name: t("profile1") })}</span>
                  <span className="dash-time">🔒 {t("pinRequired")}</span>
                </div>
                <div className="ctrl-card">
                  <div className="ctrl-row">
                    <strong>⏰ {t("dailyScreenTime")}</strong>
                    <span className="ctrl-val">{t("minutes", { count: 30 })}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={120}
                    defaultValue={30}
                    className="ctrl-range"
                    readOnly
                  />
                  <div className="ctrl-scale">
                    <span>10m</span>
                    <span>30m</span>
                    <span>60m</span>
                    <span>120m</span>
                  </div>
                  <div className="ctrl-used">
                    {t("usedToday")} · <b>{t("minutes", { count: 13 })}</b> {t("ofMinutes", { count: 30 })}
                  </div>
                </div>
                <div className="ctrl-card">
                  <div className="ctrl-row">
                    <strong>🛡 {t("ageFilter")}</strong>
                    <span className="ctrl-val">{t("agesRange", { range: "1–5" })}</span>
                  </div>
                  <div className="ctrl-toggles">
                    {[
                      { l: "1–3", on: true },
                      { l: "3–5", on: true },
                      { l: "6–8", on: false },
                      { l: "9–12", on: false },
                      { l: "12+", on: false },
                    ].map((t) => (
                      <button
                        key={t.l}
                        type="button"
                        className={`ctrl-tog${t.on ? " on" : ""}`}
                      >
                        <span className="ctrl-dot" />
                        {t.l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`dash-page${dashPage === 2 ? " active" : ""}`}>
                <div className="dash-head">
                  <span className="dash-pill">{t("readingWeek")}</span>
                  <span className="dash-time">{t("sampleWeek")}</span>
                </div>
                <div className="dash-bars">
                  {[50, 67, 27, 83, 100, 40, 60].map((h, i) => (
                    <div key={i} className="dash-bar">
                      <span style={{ height: `${h}%` }} />
                      <em>{t(`weekday${i + 1}`)}</em>
                    </div>
                  ))}
                </div>
                <div className="dash-stats">
                  <div className="dash-stat">
                    <div className="dash-label">{t("booksRead")}</div>
                    <div className="dash-val">7</div>
                  </div>
                  <div className="dash-stat">
                    <div className="dash-label">{t("totalTime")}</div>
                    <div className="dash-val">128m</div>
                  </div>
                </div>
                <div className="dash-mini">
                  <strong>{t("recentlyRead")}</strong>
                  <span> </span>
                </div>
                <div className="book-row">
                  {[
                    {
                      t: t("book1"),
                      c: "linear-gradient(160deg,#ffb3d1,#c9a8ff)",
                      e: "🏰",
                    },
                    {
                      t: t("book2"),
                      c: "linear-gradient(160deg,#a8e6c5,#7fd1a0)",
                      e: "🧺",
                    },
                    {
                      t: t("book3"),
                      c: "linear-gradient(160deg,#9ec5ff,#6a8dff)",
                      e: "🚀",
                    },
                  ].map((b) => (
                    <div className="book-card" key={b.t}>
                      <div className="book-cover" style={{ background: b.c }}>
                        <span>{b.e}</span>
                      </div>
                      <small>{b.t}</small>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`dash-page${dashPage === 3 ? " active" : ""}`}>
                <div className="dash-head">
                  <span className="dash-pill">{t("pointsAwards")}</span>
                  <span className="dash-time">✨ {t("points", { count: 45 })}</span>
                </div>
                <div className="pts-hero">
                  <div className="pts-num">✨ 45</div>
                  <div className="pts-sub">
                    {t("profilePoints", { name: t("profile1") })}
                  </div>
                </div>
                <div className="medals">
                  {[
                    {
                      ico: "📚",
                      l: t("medal1"),
                      c: "linear-gradient(160deg,#ffd66b,#ff9d3d)",
                    },
                    {
                      ico: "🔥",
                      l: t("medal2"),
                      c: "linear-gradient(160deg,#ff8a8a,#ee5a70)",
                    },
                    {
                      ico: "🌟",
                      l: t("medal3"),
                      c: "linear-gradient(160deg,#a8d1ff,#6a8dff)",
                    },
                    {
                      ico: "🦸",
                      l: t("medal4"),
                      c: "linear-gradient(160deg,#c9a8ff,#7c5bd0)",
                    },
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
                  <strong>{t("howToEarn")}</strong>
                  <span>{t("earnDetail")}</span>
                </div>
              </div>

              <div className={`dash-page${dashPage === 4 ? " active" : ""}`}>
                <div className="dash-head">
                  <span className="dash-pill">{t("shopPin")}</span>
                  <span className="dash-time">✨ {t("points", { count: 45 })}</span>
                </div>
                <div className="shop-section-l">{t("lumiqAddons")}</div>
                <div className="shop-grid">
                  {[
                    {
                      e: "✨",
                      t: t("shop1"),
                      p: t("points", { count: 200 }),
                      $: "$0.99",
                      c: "linear-gradient(160deg,#fff1c2,#ffd66b)",
                    },
                    {
                      e: "🗺",
                      t: t("shop2"),
                      p: t("points", { count: 300 }),
                      $: "$1.49",
                      c: "linear-gradient(160deg,#c9f0d6,#7fd1a0)",
                    },
                    {
                      e: "📖",
                      t: t("shop3"),
                      p: t("points", { count: 1000 }),
                      $: "$5.99",
                      c: "linear-gradient(160deg,#ffd6e7,#ff9ec0)",
                    },
                  ].map((s) => (
                    <div className="shop-card" key={s.t}>
                      <div className="shop-thumb" style={{ background: s.c }}>
                        <span>{s.e}</span>
                      </div>
                      <strong>{s.t}</strong>
                      <small>
                        {s.p} · {s.$}
                      </small>
                      <button type="button" className="shop-buy">
                        {t("add")}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="shop-section-l">{t("partnerGifts")}</div>
                <div className="shop-grid two">
                  {[
                    {
                      e: "🏎",
                      t: t("shop4"),
                      p: t("points", { count: 500 }),
                      c: "linear-gradient(160deg,#9ec5ff,#6a8dff)",
                    },
                    {
                      e: "👗",
                      t: t("shop5"),
                      p: t("points", { count: 600 }),
                      c: "linear-gradient(160deg,#ffd6e7,#ff9ec0)",
                    },
                  ].map((s) => (
                    <div className="shop-card" key={s.t}>
                      <div className="shop-thumb" style={{ background: s.c }}>
                        <span>{s.e}</span>
                      </div>
                      <strong>{s.t}</strong>
                      <small>{s.p} · {t("coupon")}</small>
                      <button type="button" className="shop-buy">
                        {t("redeem")}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="pin-bar">
                  🔐 {t("purchasePin")}
                </div>
              </div>
            </div>

            <div className="dash-dots">
              {[0, 1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={t("dashboardPage", { page: i + 1 })}
                  className={dashPage === i ? "active" : ""}
                  onClick={() => setDashPage(i)}
                />
              ))}
            </div>
          </div>

          <div className="parent-list reveal d2">
            <button
              type="button"
              className={`parent-item${dashPage === 0 ? " hl" : ""}`}
              onClick={() => setDashPage(0)}
            >
              <span className="parent-ico">👧</span>
              <div>
                <strong>1 · {t("parent1Title")}</strong>
                <p>{t("parent1Body")}</p>
              </div>
            </button>
            <button
              type="button"
              className={`parent-item${dashPage === 1 ? " hl" : ""}`}
              onClick={() => setDashPage(1)}
            >
              <span className="parent-ico">🛡</span>
              <div>
                <strong>2 · {t("parent2Title")}</strong>
                <p>{t("parent2Body")}</p>
              </div>
            </button>
            <button
              type="button"
              className={`parent-item${dashPage === 2 ? " hl" : ""}`}
              onClick={() => setDashPage(2)}
            >
              <span className="parent-ico">📊</span>
              <div>
                <strong>3 · {t("parent3Title")}</strong>
                <p>{t("parent3Body")}</p>
              </div>
            </button>
            <button
              type="button"
              className={`parent-item${dashPage === 3 ? " hl" : ""}`}
              onClick={() => setDashPage(3)}
            >
              <span className="parent-ico">🏆</span>
              <div>
                <strong>4 · {t("parent4Title")}</strong>
                <p>{t("parent4Body")}</p>
              </div>
            </button>
            <button
              type="button"
              className={`parent-item${dashPage === 4 ? " hl" : ""}`}
              onClick={() => setDashPage(4)}
            >
              <span className="parent-ico">🛍</span>
              <div>
                <strong>5 · {t("parent5Title")}</strong>
                <p>{t("parent5Body")}</p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
