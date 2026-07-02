import type { Metadata } from "next";
import RevealObserver from "@/components/RevealObserver";

export const metadata: Metadata = {
  title: "Media & Review — Lumiq Studio",
  description: "Press features, reviews and reader letters about Lumiq Studio.",
};

const press = [
  { source: "The Atelier Review", date: "March 2026", quote: "A studio that actually cares about the small, quiet moments at home.", link: "Read feature" },
  { source: "Slow Design Quarterly", date: "Jan 2026", quote: "Tech that wants to slow you down instead of speeding you up — a rare thing.", link: "Read review" },
  { source: "Kinfolk", date: "Nov 2025", quote: "Considered objects for considered families.", link: "Read profile" },
];

const reviews = [
  { name: "Sora Tanaka", role: "Designer, Tokyo", text: "Every product feels written, not manufactured. It's an entire little universe." },
  { name: "Liam Chen", role: "Father of two, Vancouver", text: "We use it together. That's what makes it different — it doesn't take my kids away from me." },
  { name: "Amélie R.", role: "Bookseller, Lyon", text: "The first piece of consumer tech I've ever wanted to keep on the shelf next to my books." },
  { name: "Marcus J.", role: "Educator, London", text: "Calm by design. My students slow down when they use it." },
];

export default function MediaPage() {
  return (
    <div className="editorial-page media-page" style={{ paddingTop: "6rem", color: "var(--ink)" }}>
      <RevealObserver />

      <section className="container reveal" style={{ padding: "2rem 2rem 4rem" }}>
        <span className="kicker">Media & Review</span>
        <h1 className="serif" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.05, margin: "1rem 0 1rem", maxWidth: 800 }}>
          What people are saying.
        </h1>
        <p style={{ color: "var(--ink-2)", fontSize: "1.1rem", maxWidth: 560, lineHeight: 1.7 }}>
          A small selection of press features and reader letters that have meant a lot to us.
        </p>
      </section>

      <section className="container reveal" style={{ padding: "0 2rem 4rem" }}>
        <h2 className="media-label">In the press</h2>
        <div className="media-press-list">
          {press.map((p) => (
            <a key={p.source} href="#" className="media-press-row">
              <div className="media-press-meta">
                <span className="media-press-source">{p.source}</span>
                <span className="media-press-date">{p.date}</span>
              </div>
              <blockquote className="serif">&ldquo;{p.quote}&rdquo;</blockquote>
              <span className="media-press-link">{p.link} <span className="media-arrow" aria-hidden>→</span></span>
            </a>
          ))}
        </div>
      </section>

      <section className="container reveal" style={{ padding: "2rem 2rem 6rem" }}>
        <h2 className="media-label">Reader letters</h2>
        <div className="media-letter-grid">
          {reviews.map((r) => (
            <figure key={r.name} className="media-letter">
              <blockquote>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption>
                <strong>{r.name}</strong> · {r.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <style>{`
        .media-label { font-family: var(--font-sans); font-size: .75rem; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.75rem; }

        .media-press-list { display: flex; flex-direction: column; }
        .media-press-row { display: grid; grid-template-columns: 220px 1fr auto; gap: 2rem; align-items: center; padding: 2rem 0; border-top: 1px solid var(--border); color: inherit; transition: padding-left .45s cubic-bezier(.22,1,.36,1); }
        .media-press-row:last-child { border-bottom: 1px solid var(--border); }
        .media-press-row:hover { padding-left: 1.25rem; }
        .media-press-meta { display: flex; flex-direction: column; gap: .3rem; }
        .media-press-source { font-weight: 600; font-size: .95rem; color: var(--ink); }
        .media-press-date { font-size: .8rem; color: var(--ink-3); letter-spacing: .06em; }
        .media-press-row blockquote { margin: 0; font-size: 1.3rem; line-height: 1.45; color: var(--ink); font-style: italic; }
        .media-press-link { font-size: .875rem; color: var(--ink-3); white-space: nowrap; display: inline-flex; align-items: center; gap: .4rem; transition: color .25s; }
        .media-press-row:hover .media-press-link { color: var(--gold); }
        .media-arrow { display: inline-block; transition: transform .35s cubic-bezier(.22,1,.36,1); }
        .media-press-row:hover .media-arrow { transform: translateX(5px); }

        .media-letter-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
        .media-letter { margin: 0; padding: 1.75rem; background: #fff; border-radius: 10px; border: 1px solid var(--border); transition: transform .4s, box-shadow .4s, border-color .4s; }
        .media-letter:hover { transform: translateY(-5px); box-shadow: var(--shadow); border-color: var(--border-h); }
        .media-letter blockquote { margin: 0 0 1.25rem; color: var(--ink); line-height: 1.6; }
        .media-letter figcaption { color: var(--ink-3); font-size: .9rem; }
        .media-letter figcaption strong { color: var(--ink-2); }

        @media (max-width: 820px) {
          .media-press-row { grid-template-columns: 1fr; gap: .85rem; }
          .media-press-link { justify-self: start; }
        }
      `}</style>
    </div>
  );
}
