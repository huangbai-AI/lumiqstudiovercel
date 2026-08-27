"use client";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import DraftNotice from "@/components/DraftNotice";
import Image from "next/image";

export default function OlaProductPage() {
  const t = useTranslations("Pal");
  const ways = [
    {
      img: "/pal-craft.jpg",
      pillCls: "fp-purple",
      pill: t("way1Pill"),
      title: t("way1Title"),
      body: t("way1Body"),
    },
    {
      img: "/pal-hero.jpg",
      pillCls: "fp-gold",
      pill: t("way2Pill"),
      title: t("way2Title"),
      body: t("way2Body"),
    },
    {
      img: "/community-hero.jpg",
      pillCls: "fp-mint",
      pill: t("way3Pill"),
      title: t("way3Title"),
      body: t("way3Body"),
    },
  ];
  const strengths = [
    { icon: "✨", title: t("st1"), body: t("sb1") },
    { icon: "🧭", title: t("st2"), body: t("sb2") },
    { icon: "💬", title: t("st3"), body: t("sb3") },
    { icon: "🫶", title: t("st4"), body: t("sb4") },
    { icon: "🌙", title: t("st5"), body: t("sb5") },
  ];

  return (
    <main
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

        <div className="sec-head rose" style={{ marginTop: "1.5rem" }}>
          <div className="sec-num rose">02</div>
          <div className="sec-head-body">
            <span className="kicker" style={{ color: "var(--rose)" }}>
              Lumiq Ola
            </span>
            <h1>
              {t("titleBefore")} <em>{t("titleEm")}</em>
            </h1>
            <p className="sec-lede">{t("lede")}</p>
            <DraftNotice>{t("conceptNotice")}</DraftNotice>
            <div className="price-line">
              <div className="price">
                <small>USD</small>599
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
          <div>
            <span className="kicker">{t("perfect")}</span>
            <h2>{t("magic")}</h2>
            <p>{t("magicBody")}</p>
            <div className="callout">
              <h5>{t("synced")}</h5>
              <p>{t("syncedBody")}</p>
            </div>
          </div>
          <div className="ds-img">
            <Image
              src="/assets/web/ola-hero-front.webp"
              alt={t("deviceAlt")}
              width={1200}
              height={1200}
              sizes="(max-width: 820px) 100vw, 50vw"
              priority
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
        </div>
      </section>

      <section
        className="container lq-section"
        style={{ padding: "2rem 2rem 4rem", maxWidth: 1200 }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: 640,
            margin: "0 auto 2.5rem",
          }}
        >
          <span className="kicker" style={{ justifyContent: "center" }}>
            {t("twoLives")}
          </span>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              margin: ".5rem 0 0",
              color: "var(--ink)",
            }}
          >
            {t("everyAge")}
          </h2>
        </div>

        <div className="pal-tracks">
          <article className="pal-track">
            <div className="pal-track-img">
              <Image src="/pal-kid.jpg" alt={t("kidsAlt")} width={1200} height={900} sizes="(max-width: 960px) 100vw, 50vw" />
            </div>
            <span className="kicker" style={{ color: "var(--rose)" }}>
              {t("kids")}
            </span>
            <h3
              className="serif"
              style={{
                fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)",
                margin: ".5rem 0 1rem",
              }}
            >
              {t("kidsTitle")}
            </h3>
            <p style={{ color: "var(--ink-2)", marginBottom: "1.25rem" }}>
              {t("kidsBody")}
            </p>
            <ul className="pal-list" style={{ listStyle: "none", padding: 0 }}>
              {[1, 2, 3].map((i) => (
                <li key={i}>{t(`kids${i}`)}</li>
              ))}
            </ul>
          </article>

          <article className="pal-track">
            <div className="pal-track-img">
              <Image src="/pal-elder.jpg" alt={t("adultsAlt")} width={1200} height={900} sizes="(max-width: 960px) 100vw, 50vw" />
            </div>
            <span className="kicker" style={{ color: "var(--purple)" }}>
              {t("adults")}
            </span>
            <h3
              className="serif"
              style={{
                fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)",
                margin: ".5rem 0 1rem",
              }}
            >
              {t("adultsTitle")}
            </h3>
            <p style={{ color: "var(--ink-2)", marginBottom: "1.25rem" }}>
              {t("adultsBody")}
            </p>
            <ul className="pal-list" style={{ listStyle: "none", padding: 0 }}>
              {[1, 2, 3].map((i) => (
                <li key={i}>{t(`adults${i}`)}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section
        className="container"
        style={{ padding: "2rem 2rem 6rem", maxWidth: 1280 }}
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

      <section
        id="strengths"
        className="container reveal"
        style={{ paddingTop: "1rem" }}
      >
        <div className="section-head">
          <span
            className="kicker font-sans text-lg"
            style={{ color: "var(--purple)" }}
          >
            {t("strengths")}
          </span>
          <h2 className="serif">{t("strengthsTitle")}</h2>
          <p className="lead text-xl md:text-2xl">{t("strengthsIntro")}</p>
        </div>
        <div className="value-grid">
          {strengths.map((item, i) => (
            <div
              key={item.title}
              className={`value-card reveal d${(i % 3) + 1}`}
            >
              <span className="value-badge">
                {item.icon}{" "}
                {t("strengthLabel", { number: String(i + 1).padStart(2, "0") })}
              </span>
              <h4 className="serif">{item.title}</h4>
              <p>{item.body}</p>
            </div>
          ))}
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
    </main>
  );
}
