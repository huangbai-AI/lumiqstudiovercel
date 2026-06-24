import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Story",
  description: "From a small idea to a studio shaping the way families experience AI — the story, the values and the future of Lumiq.",
};

export default function StoryPage() {
  return (
    <div className="editorial-page" style={{ paddingTop: "6rem", color: "var(--ink)" }}>
      <section className="container" style={{ padding: "2rem 2rem 5rem" }}>
        <span className="kicker">Brand Story</span>
        <h1 className="serif" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "1rem 0 2rem", maxWidth: 900 }}>
          A studio shaped by the question: <em style={{ color: "var(--purple)" }}>how do we enhance the things we use?</em>
        </h1>
      </section>

      <section style={{ padding: "0 0 5rem" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <img src="/story-hero.jpg" alt="Hands writing in a notebook beside soft flowers and a glass prism"
            style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 8 }} />
        </div>
      </section>

      <section className="container" style={{ maxWidth: 760, padding: "0 2rem 5rem", color: "var(--ink-2)", fontSize: "1.1rem", lineHeight: 1.8 }}>
        <p style={{ marginBottom: "1.5rem" }}>
          Lumiq Studio began with a small group of designers, engineers and parents who kept asking the
          same question — what is technology actually for, when the noise dies down?
        </p>
        <p style={{ marginBottom: "1.5rem" }}>
          We were tired of products that demanded attention and gave very little back. We wanted to make
          objects that earned a place in the home: quiet, warm, considered. The kind of things that get
          shared rather than replaced.
        </p>
        <h2 className="serif" style={{ fontSize: "1.75rem", margin: "3rem 0 1rem", color: "var(--ink)" }}>What we make</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          We design experiences at the intersection of artificial intelligence, storytelling and craft.
          Our work spans hardware, software and printed objects — connected by a single intention:
          to give families and creators tools that lift their imagination instead of crowding it.
        </p>
      </section>

      <section style={{ background: "var(--cream-3)", padding: "5rem 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", maxWidth: 1200 }}>
          <img src="/why-b.jpg" alt="" loading="lazy" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 6 }} />
          <div>
            <span className="kicker">The Future of Lumiq</span>
            <h2 className="serif" style={{ fontSize: "2.25rem", lineHeight: 1.2, margin: "0.75rem 0 1.5rem", color: "var(--ink)" }}>
              An ecosystem, not a product line.
            </h2>
            <p style={{ color: "var(--ink-2)", lineHeight: 1.75, marginBottom: "1rem" }}>
              We&apos;re building toward a world where AI feels less like a tool and more like a thoughtful
              companion — one that helps people read, write, dream and design together.
            </p>
            <p style={{ color: "var(--ink-2)", lineHeight: 1.75 }}>
              Every device, every page, every interface we ship is a step toward that quieter, more
              imaginative tomorrow.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .editorial-page section .container { gap: 2rem !important; grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
