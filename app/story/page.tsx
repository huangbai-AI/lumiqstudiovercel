import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import RevealObserver from "@/components/RevealObserver";
import { PRODUCT_BY_ID } from "@/lib/products";

export default function StoryPage() {
  const t = useTranslations("Story");
  const principles = [1, 2, 3, 4].map((i) => ({
    n: `0${i}`,
    title: t(`p${i}Title`),
    body: t(`p${i}Body`),
  }));
  const years = ["2011", "2024", "2025", "2026"];
  const milestones = years.map((year, i) => ({
    year,
    title: t(`m${i + 1}Title`),
    body: t(`m${i + 1}Body`),
  }));
  const collection = [
    PRODUCT_BY_ID.tablet,
    PRODUCT_BY_ID.ola,
    PRODUCT_BY_ID.print,
    PRODUCT_BY_ID.nest,
  ];

  return (
    <main className="editorial-page story-page">
      <RevealObserver />

      <section className="container story-hero">
        <div className="story-hero-copy reveal">
          <span className="kicker">{t("eyebrow")}</span>
          <h1 className="serif">
            {t("titleBefore")} <em>{t("titleEm")}</em>
          </h1>
          <p>{t("origin1")}</p>
        </div>

        <figure className="story-hero-media reveal">
          <Image
            src="/assets/story/lumiq-story-family-v2.webp"
            alt={t("heroAlt")}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
          <figcaption>
            <span>{t("principlesEyebrow")}</span>
            <strong>{t("quote")}</strong>
          </figcaption>
        </figure>
      </section>

      <section className="container story-origin reveal">
        <div className="story-section-label">
          <span>01</span>
          <p>{t("eyebrow")}</p>
        </div>
        <div className="story-origin-copy">
          <p>{t("origin2")}</p>
          <p>{t("origin3")}</p>
        </div>
      </section>

      <section className="story-principles">
        <div className="container">
          <div className="story-section-head reveal">
            <div>
              <span className="kicker">{t("principlesEyebrow")}</span>
              <h2 className="serif">{t("principlesTitle")}</h2>
            </div>
            <p>{t("origin3")}</p>
          </div>
          <div className="story-principle-grid">
            {principles.map((principle) => (
              <article key={principle.n} className="story-principle reveal">
                <span className="story-principle-num serif">
                  {principle.n}
                </span>
                <h3 className="serif">{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-quote-band reveal">
        <div className="container">
          <span aria-hidden="true">“</span>
          <blockquote className="serif">{t("quote")}</blockquote>
          <cite>{t("quoteSource")}</cite>
        </div>
      </section>

      <section className="container story-timeline">
        <div className="story-section-head reveal">
          <div>
            <span className="kicker">{t("timelineEyebrow")}</span>
            <h2 className="serif">{t("timelineTitle")}</h2>
          </div>
        </div>
        <ol className="story-timeline-grid">
          {milestones.map((milestone) => (
            <li key={milestone.year} className="story-milestone reveal">
              <span className="story-milestone-year serif">
                {milestone.year}
              </span>
              <h3>{milestone.title}</h3>
              <p>{milestone.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="story-future reveal">
        <div className="container story-future-grid">
          <div className="story-future-copy">
            <span className="kicker">{t("futureEyebrow")}</span>
            <h2 className="serif">{t("futureTitle")}</h2>
            <p>{t("future1")}</p>
            <p>{t("future2")}</p>
            <Link href="/products" className="btn btn-navy story-cta">
              {t("cta")}
              <ArrowRight size={17} strokeWidth={1.8} aria-hidden />
            </Link>
          </div>
          <div className="story-collection" aria-label={t("cta")}>
            {collection.map((product) => (
              <Link href={product.href} key={product.id}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={540}
                  height={540}
                  sizes="(max-width: 760px) 30vw, 180px"
                />
                <span>{product.shortName}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .story-page {
          padding-top: 7rem;
          color: var(--ink);
          background: linear-gradient(180deg, #fff 0%, #fbfaf8 42%, #fff 100%);
        }
        .story-page .container { max-width: 1240px; }
        .story-page .story-hero { padding: 4.5rem 2rem 0; }
        .story-hero-copy { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(280px, .65fr); gap: 3rem 5rem; align-items: end; margin-bottom: 3.5rem; }
        .story-hero-copy .kicker { grid-column: 1 / -1; }
        .story-hero-copy h1 { font-size: clamp(3rem, 6.6vw, 6.25rem); line-height: .98; letter-spacing: -.035em; margin: 0; max-width: 920px; }
        .story-hero-copy h1 em { display: block; color: var(--gold); font-size: .68em; line-height: 1.08; margin-top: .18em; }
        .story-hero-copy > p { margin: 0 0 .35rem; color: var(--ink-2); font-size: clamp(1rem, 1.35vw, 1.2rem); line-height: 1.75; }
        .story-hero-media { position: relative; aspect-ratio: 16 / 9; margin: 0; overflow: hidden; border: 1px solid rgba(20, 20, 20, .08); border-radius: 28px; background: #111827; box-shadow: 0 30px 80px rgba(24, 18, 10, .14); }
        .story-hero-media img { object-fit: cover; transition: transform 1.2s cubic-bezier(.22, 1, .36, 1); }
        .story-hero-media:hover img { transform: scale(1.018); }
        .story-hero-media::after { content: ""; position: absolute; inset: 55% 0 0; background: linear-gradient(180deg, transparent, rgba(2, 6, 18, .72)); pointer-events: none; }
        .story-hero-media figcaption { position: absolute; z-index: 1; right: clamp(1.25rem, 3vw, 2.75rem); bottom: clamp(1.25rem, 3vw, 2.5rem); left: clamp(1.25rem, 3vw, 2.75rem); display: flex; align-items: end; justify-content: space-between; gap: 2rem; color: #fff; }
        .story-hero-media figcaption span { font-size: .7rem; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.72); }
        .story-hero-media figcaption strong { max-width: 640px; text-align: right; font-family: var(--font-serif); font-size: clamp(1.15rem, 2vw, 1.85rem); font-weight: 500; line-height: 1.25; }

        .story-page .story-origin { display: grid; grid-template-columns: minmax(180px, .4fr) minmax(0, 1fr); gap: 3rem 7rem; padding: clamp(4.5rem, 7vw, 7rem) 2rem; }
        .story-section-label { display: flex; align-items: start; gap: 1rem; padding-top: .4rem; border-top: 1px solid var(--border-h); color: var(--ink-3); }
        .story-section-label span { color: var(--gold); font-family: var(--font-serif); }
        .story-section-label p { margin: 0; font-size: .75rem; letter-spacing: .16em; text-transform: uppercase; }
        .story-origin-copy { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .story-origin-copy p { margin: 0; color: var(--ink-2); font-size: clamp(1.05rem, 1.35vw, 1.25rem); line-height: 1.75; }

        .story-principles { padding: 7rem 0; background: #f5f3ee; border-block: 1px solid rgba(20,20,20,.06); }
        .story-section-head { display: flex; align-items: end; justify-content: space-between; gap: 3rem; margin-bottom: 3.5rem; }
        .story-section-head h2 { margin: .8rem 0 0; max-width: 700px; font-size: clamp(2.25rem, 4.5vw, 4rem); line-height: 1.04; letter-spacing: -.025em; }
        .story-section-head > p { max-width: 430px; margin: 0; color: var(--ink-3); line-height: 1.7; }
        .story-principle-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border: 1px solid rgba(20,20,20,.09); border-radius: 24px; overflow: hidden; background: rgba(255,255,255,.64); }
        .story-principle { min-height: 280px; padding: clamp(2rem, 4vw, 3.25rem); border-right: 1px solid rgba(20,20,20,.08); border-bottom: 1px solid rgba(20,20,20,.08); transition: background .3s ease; }
        .story-principle:nth-child(even) { border-right: 0; }
        .story-principle:nth-last-child(-n+2) { border-bottom: 0; }
        .story-principle:hover { background: #fff; }
        .story-principle-num { display: block; margin-bottom: 2.75rem; color: var(--gold); font-size: 1.1rem; font-style: italic; }
        .story-principle h3 { margin: 0 0 .8rem; font-size: clamp(1.5rem, 2.3vw, 2rem); }
        .story-principle p { max-width: 480px; margin: 0; color: var(--ink-2); line-height: 1.7; }

        .story-quote-band { padding: 8rem 0; background: #071020; color: #fff; text-align: center; }
        .story-quote-band .container { max-width: 980px; }
        .story-quote-band .container > span { display: block; height: 3.5rem; color: #8eb2ff; font: 400 5rem/1 Georgia, serif; }
        .story-quote-band blockquote { margin: 1rem auto 2rem; font-size: clamp(2rem, 4.6vw, 4.25rem); line-height: 1.16; letter-spacing: -.02em; }
        .story-quote-band cite { color: #9baac2; font-size: .72rem; font-style: normal; letter-spacing: .18em; text-transform: uppercase; }

        .story-timeline { padding: 7rem 2rem 8rem; }
        .story-timeline-grid { position: relative; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(1.5rem, 3vw, 3rem); list-style: none; margin: 0; padding: 0; }
        .story-timeline-grid::before { content: ""; position: absolute; top: 8px; right: 0; left: 0; height: 1px; background: var(--border); }
        .story-milestone { position: relative; padding-top: 2.75rem; }
        .story-milestone::before { content: ""; position: absolute; top: 3px; left: 0; width: 11px; height: 11px; border: 2px solid #fff; border-radius: 50%; background: var(--gold); box-shadow: 0 0 0 1px var(--gold); }
        .story-milestone-year { display: block; margin-bottom: .65rem; color: var(--ink); font-size: 1.5rem; font-style: italic; }
        .story-milestone h3 { margin: 0 0 .6rem; font-size: 1rem; font-weight: 650; }
        .story-milestone p { margin: 0; color: var(--ink-3); font-size: .94rem; line-height: 1.65; }

        .story-future { padding: 0 0 7rem; }
        .story-page .story-future-grid { display: grid; grid-template-columns: minmax(280px, .78fr) minmax(520px, 1.22fr); gap: clamp(2.75rem, 5vw, 5.5rem); align-items: center; padding: clamp(3rem, 5vw, 4.5rem); border-radius: 28px; background: #f1efe9; overflow: hidden; }
        .story-future-copy h2 { margin: .8rem 0 1.5rem; font-size: clamp(2.2rem, 4.2vw, 3.8rem); line-height: 1.05; letter-spacing: -.025em; }
        .story-future-copy p { margin: 0 0 1rem; color: var(--ink-2); line-height: 1.72; }
        .story-cta { display: inline-flex; gap: .75rem; align-items: center; margin-top: 1rem; }
        .story-collection { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(.7rem, 1.5vw, 1.25rem); align-items: end; }
        .story-collection a { display: grid; grid-template-rows: 1fr auto; min-width: 0; color: var(--ink); transition: transform .3s cubic-bezier(.22, 1, .36, 1); }
        .story-collection a:hover { transform: translateY(-.35rem); }
        .story-collection img { width: 100%; height: auto; aspect-ratio: 1; padding: clamp(.45rem, 1vw, .85rem); border-radius: 16px; background: #e7e3da; object-fit: contain; }
        .story-collection span { display: block; padding-top: .8rem; text-align: center; font-size: .75rem; font-weight: 600; }

        @media (max-width: 900px) {
          .story-hero-copy, .story-page .story-origin, .story-page .story-future-grid { grid-template-columns: 1fr; }
          .story-hero-copy { gap: 1.75rem; }
          .story-hero-copy .kicker { grid-column: auto; }
          .story-origin { gap: 2rem; }
          .story-origin-copy { gap: 2rem; }
          .story-section-head { align-items: start; flex-direction: column; }
          .story-page .story-future-grid { padding: 3rem 2rem; }
        }
        @media (max-width: 700px) {
          .story-page { padding-top: 5.75rem; }
          .story-page .story-hero { padding: 3rem 1rem 0; }
          .story-hero-copy { margin-bottom: 2.25rem; }
          .story-hero-copy h1 { font-size: clamp(2.65rem, 13vw, 4.25rem); }
          .story-hero-media { aspect-ratio: 4 / 5; border-radius: 20px; }
          .story-hero-media img { object-position: 42% center; }
          .story-hero-media figcaption { align-items: start; flex-direction: column; gap: .65rem; }
          .story-hero-media figcaption strong { text-align: left; }
          .story-page .story-origin { padding: 3.5rem 1rem 5rem; }
          .story-origin-copy, .story-principle-grid, .story-timeline-grid { grid-template-columns: 1fr; }
          .story-principles { padding: 5rem 0; }
          .story-principle-grid { border-radius: 18px; }
          .story-principle { min-height: auto; border-right: 0; border-bottom: 1px solid rgba(20,20,20,.08) !important; }
          .story-principle:last-child { border-bottom: 0 !important; }
          .story-principle-num { margin-bottom: 1.75rem; }
          .story-quote-band { padding: 6rem 0; }
          .story-timeline { padding: 5rem 1rem 6rem; }
          .story-timeline-grid { gap: 2.25rem; }
          .story-timeline-grid::before { display: none; }
          .story-milestone { padding: 0 0 0 1.5rem; border-left: 1px solid var(--border); }
          .story-milestone::before { top: .35rem; left: -6px; }
          .story-future { padding: 0 1rem 5rem; }
          .story-page .story-future-grid { padding: 2.5rem 1.25rem; border-radius: 20px; }
          .story-collection { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem .75rem; }
          .story-collection img { padding: .65rem; border-radius: 14px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .story-hero-media img, .story-collection a { transition: none; }
        }
      `}</style>
    </main>
  );
}
