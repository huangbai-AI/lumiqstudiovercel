import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";
import RevealObserver from "@/components/RevealObserver";

export default function StoryPage() {
  const t = useTranslations("Story");
  const principles = [1, 2, 3, 4].map((i) => ({n: `0${i}`, t: t(`p${i}Title`), d: t(`p${i}Body`)}));
  const years = ["2011", "2024", "2025", "2026"];
  const milestones = years.map((year, i) => ({year, t: t(`m${i + 1}Title`), d: t(`m${i + 1}Body`)}));

  return (
    <div className="editorial-page story-page" style={{ paddingTop: "6rem", color: "var(--ink)" }}>
      <RevealObserver />

      <section className="container reveal" style={{ padding: "2rem 2rem 5rem" }}>
        <span className="kicker">{t("eyebrow")}</span>
        <h1 className="serif" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "1rem 0 2rem", maxWidth: 900 }}>
          {t("titleBefore")} <em style={{ color: "var(--gold)" }}>{t("titleEm")}</em>
        </h1>
      </section>

      <section className="reveal" style={{ padding: "0 0 5rem" }}>
        <div className="story-hero-frame">
          <img src="/story-hero.jpg" alt={t("heroAlt")} />
        </div>
      </section>

      <section className="container reveal" style={{ maxWidth: 760, padding: "0 2rem 5rem", color: "var(--ink-2)", fontSize: "1.1rem", lineHeight: 1.8 }}>
        <p style={{ marginBottom: "1.5rem" }}>
          {t("origin1")}
        </p>
        <p style={{ marginBottom: "1.5rem" }}>
          {t("origin2")}
        </p>
        <p>
          {t("origin3")}
        </p>
      </section>

      {/* Principles — interactive numbered list */}
      <section className="story-principles reveal">
        <div className="container">
          <span className="kicker">{t("principlesEyebrow")}</span>
          <h2 className="serif story-h2">{t("principlesTitle")}</h2>
          <div className="story-principle-list">
            {principles.map((p) => (
              <div key={p.n} className="story-principle">
                <span className="story-principle-num serif">{p.n}</span>
                <div className="story-principle-body">
                  <h3 className="serif">{p.t}</h3>
                  <p>{p.d}</p>
                </div>
                <span className="story-principle-dash" aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="container reveal" style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <blockquote className="serif story-quote">
          &ldquo;{t("quote")}&rdquo;
        </blockquote>
        <div className="story-quote-rule" aria-hidden />
        <span className="story-quote-src">{t("quoteSource")}</span>
      </section>

      {/* Timeline */}
      <section className="story-timeline reveal">
        <div className="container">
          <span className="kicker">{t("timelineEyebrow")}</span>
          <h2 className="serif story-h2">{t("timelineTitle")}</h2>
          <div className="story-timeline-grid">
            {milestones.map((m) => (
              <div key={m.year} className="story-milestone">
                <span className="story-milestone-year serif">{m.year}</span>
                <h3>{m.t}</h3>
                <p>{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future */}
      <section className="reveal" style={{ background: "var(--cream-2)", padding: "5rem 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container story-future" style={{ maxWidth: 1200 }}>
          <div className="story-future-media">
            <img src="/why-b.jpg" alt="" loading="lazy" />
          </div>
          <div>
            <span className="kicker">{t("futureEyebrow")}</span>
            <h2 className="serif" style={{ fontSize: "2.25rem", lineHeight: 1.2, margin: "0.75rem 0 1.5rem", color: "var(--ink)" }}>
              {t("futureTitle")}
            </h2>
            <p style={{ color: "var(--ink-2)", lineHeight: 1.75, marginBottom: "1rem" }}>
              {t("future1")}
            </p>
            <p style={{ color: "var(--ink-2)", lineHeight: 1.75, marginBottom: "1.75rem" }}>
              {t("future2")}
            </p>
            <Link href="/products" className="btn btn-navy">{t("cta")}</Link>
          </div>
        </div>
      </section>

      <style>{`
        .story-hero-frame { max-width: 1400px; margin: 0 auto; overflow: hidden; border-radius: 8px; }
        .story-hero-frame img { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; transition: transform 1.2s ease; }
        .story-hero-frame:hover img { transform: scale(1.025); }
        .story-h2 { font-size: clamp(1.9rem, 3.5vw, 2.75rem); line-height: 1.15; margin: 0 0 2.5rem; max-width: 640px; }

        .story-principles { border-top: 1px solid var(--border); padding: 5.5rem 0; }
        .story-principle-list { display: flex; flex-direction: column; }
        .story-principle { display: grid; grid-template-columns: 90px 1fr 60px; gap: 2rem; align-items: center; padding: 2rem 0; border-top: 1px solid var(--border); transition: padding-left 0.45s cubic-bezier(0.22, 1, 0.36, 1); position: relative; }
        .story-principle:last-child { border-bottom: 1px solid var(--border); }
        .story-principle:hover { padding-left: 1.25rem; }
        .story-principle-num { font-size: 1.5rem; font-style: italic; color: var(--ink-4); transition: color 0.35s; }
        .story-principle:hover .story-principle-num { color: var(--gold); }
        .story-principle-body h3 { font-size: 1.5rem; margin: 0 0 0.4rem; }
        .story-principle-body p { color: var(--ink-2); line-height: 1.65; max-width: 560px; margin: 0; }
        .story-principle-dash { justify-self: end; width: 28px; height: 1px; background: var(--ink-4); transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1), background 0.35s; }
        .story-principle:hover .story-principle-dash { width: 52px; background: var(--gold); }

        .story-quote { font-size: clamp(1.5rem, 3.4vw, 2.4rem); line-height: 1.35; font-style: italic; max-width: 860px; margin: 0 auto; color: var(--ink); }
        .story-quote-rule { width: 56px; height: 1px; background: var(--gold); margin: 2rem auto 1rem; }
        .story-quote-src { font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3); }

        .story-timeline { border-top: 1px solid var(--border); padding: 5.5rem 0 6rem; }
        .story-timeline-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.5rem; position: relative; }
        .story-timeline-grid::before { content: ""; position: absolute; top: 0.6rem; left: 0; right: 0; height: 1px; background: var(--border); }
        .story-milestone { position: relative; padding-top: 2rem; }
        .story-milestone::before { content: ""; position: absolute; top: 0.32rem; left: 0; width: 9px; height: 9px; border-radius: 50%; background: #fff; border: 1px solid var(--ink-4); transition: background 0.3s, border-color 0.3s, transform 0.3s; }
        .story-milestone:hover::before { background: var(--gold); border-color: var(--gold); transform: scale(1.3); }
        .story-milestone-year { display: block; font-size: 1.4rem; font-style: italic; color: var(--ink); margin-bottom: 0.5rem; }
        .story-milestone h3 { font-family: var(--font-sans); font-size: 0.9375rem; font-weight: 600; color: var(--ink); margin: 0 0 0.4rem; }
        .story-milestone p { color: var(--ink-3); font-size: 0.9rem; line-height: 1.6; margin: 0; }

        .story-future { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .story-future-media { overflow: hidden; border-radius: 6px; }
        .story-future-media img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; transition: transform 0.9s ease; }
        .story-future-media:hover img { transform: scale(1.04); }

        @media (max-width: 900px) {
          .story-future { grid-template-columns: 1fr; gap: 2rem; }
          .story-timeline-grid { grid-template-columns: 1fr; gap: 2rem; }
          .story-timeline-grid::before { display: none; }
          .story-milestone { padding-top: 0; padding-left: 1.5rem; border-left: 1px solid var(--border); }
          .story-milestone::before { top: 0.4rem; left: -5px; }
          .story-principle { grid-template-columns: 56px 1fr; gap: 1.25rem; }
          .story-principle-dash { display: none; }
        }
      `}</style>
    </div>
  );
}
