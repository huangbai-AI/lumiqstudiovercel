import type { Metadata } from "next";

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
    <div className="editorial-page" style={{ paddingTop: "6rem", color: "var(--ink)" }}>
      <section className="container" style={{ padding: "2rem 2rem 4rem" }}>
        <span className="kicker">Media & Review</span>
        <h1 className="serif" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.05, margin: "1rem 0 1rem", maxWidth: 800 }}>
          What people are saying.
        </h1>
        <p style={{ color: "var(--ink-2)", fontSize: "1.1rem", maxWidth: 560, lineHeight: 1.7 }}>
          A small selection of press features and reader letters that have meant a lot to us.
        </p>
      </section>

      <section className="container" style={{ padding: "0 2rem 4rem" }}>
        <h2 className="serif" style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>In the press</h2>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {press.map((p) => (
            <article key={p.source} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: "1.75rem 2rem", backdropFilter: "blur(8px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ink-3)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                <span>{p.source}</span><span>{p.date}</span>
              </div>
              <blockquote className="serif" style={{ fontSize: "1.25rem", lineHeight: 1.4, margin: "0 0 0.75rem" }}>&ldquo;{p.quote}&rdquo;</blockquote>
              <a href="#" style={{ color: "var(--purple)", fontSize: "0.9rem" }}>{p.link} →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="container" style={{ padding: "2rem 2rem 6rem" }}>
        <h2 className="serif" style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Reader letters</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {reviews.map((r) => (
            <figure key={r.name} style={{ margin: 0, padding: "1.75rem", background: "var(--cream-3)", borderRadius: 10, border: "1px solid var(--border)" }}>
              <blockquote style={{ margin: 0, marginBottom: "1.25rem", color: "var(--ink)", lineHeight: 1.6 }}>&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption style={{ color: "var(--ink-3)", fontSize: "0.9rem" }}>
                <strong style={{ color: "var(--ink-2)" }}>{r.name}</strong> · {r.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
