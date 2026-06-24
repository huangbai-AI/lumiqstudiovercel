import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products — Lumiq Studio",
  description: "Three objects, one quiet universe — LumiqTablet, LumiqPal and LumiqBook.",
};

const cards = [
  {
    href: "/products/tablet",
    cls: "book",
    pill: "Tablet for kids",
    title: "LumiqTablet",
    sub: "A Tablet Built for Wonder",
    desc: "A distraction-free device engineered purely for reading, interaction, and imagination.",
    bullets: ["Original Story library", "ImagiMe face-swap", "More adventures coming soon…", "Story Quest campaigns"],
  },
  {
    href: "/products/pal",
    cls: "pal",
    pill: "Companion to Tablet",
    title: "LumiqPal",
    sub: "Holographic Companion",
    desc: "A magical bedside companion that syncs with the tablet to bring stories into the room.",
    bullets: ["Your new best AI friend", "Ambient Story Sync", "More AI features coming soon"],
  },
  {
    href: "/products/book",
    cls: "book",
    pill: "Personalized Hardcover",
    title: "LumiqBook",
    sub: "Your Child, The Hero",
    desc: "Turn any ImagiMe story from the LumiqTablet into a real, printed hardcover book — with your child as the main character.",
    bullets: ["Powered by ImagiMe face-swap", "Premium hardcover printing", "Be the prince, princess or be the villain"],
  },
] as const;

function Check() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden>
      <path d="M7.5 13.5l-3-3 1.4-1.4 1.6 1.6 5.6-5.6L14.5 6.5l-7 7z" />
    </svg>
  );
}

export default function ProductsPage() {
  return (
    <div className="lumiq-root editorial-page" style={{ paddingTop: "6rem", color: "var(--ink)" }}>
      <div className="bg-layer" aria-hidden>
        <div className="stars" />
        <div className="bokeh b1" />
        <div className="bokeh b2" />
      </div>

      <section className="container" style={{ padding: "2rem 2rem 1rem", maxWidth: 1200 }}>
        <span className="kicker">Products</span>
        <h1 className="serif" style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)", lineHeight: 1.05, margin: "1rem 0 1.5rem", maxWidth: 820 }}>
          Three Products. <br />One Universe.
        </h1>
        <p style={{ color: "var(--ink-2)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 620 }}>
          Unbelievable experiences
        </p>
      </section>

      <section className="container" style={{ padding: "1rem 2rem 6rem", maxWidth: 1280 }}>
        <div className="duo-grid">
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className={`duo-card ${c.cls}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <span className="duo-pill">{c.pill}</span>
              <h3 className="serif">{c.title}</h3>
              <div className="duo-sub">{c.sub}</div>
              <p className="duo-desc">{c.desc}</p>
              <ul className="duo-list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {c.bullets.map((b) => (
                  <li key={b}><Check />{b}</li>
                ))}
              </ul>
              <span className="arrow-chip" aria-hidden>↗</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
