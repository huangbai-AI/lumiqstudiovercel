import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plans — Lumiq Studio",
  description: "Hardware and subscriptions for the Lumiq universe — calm pricing for the way you live.",
};

const hardware = [
  { name: "LumiqTablet", price: "399", img: "/tablet-hero.jpg", blurb: "A calm reading & creation canvas.", href: "/products/tablet" },
  { name: "LumiqPal", price: "599", img: "/pal-hero-new.jpg", blurb: "A companion for kids and elders.", href: "/products/pal" },
  { name: "LumiqBook", price: "69", img: "/book-hero.jpg", blurb: "Hardcover, personalised, archival.", href: "/products/book" },
];

const tabletCols = ["Free", "Lite", "Pro"];
const tabletRows: { label: string; values: (string | boolean)[] }[] = [
  { label: "Monthly Fee", values: ["—", "$6.99 yr / $7.99 mo", "$12.99 yr / $14.99 mo"] },
  { label: "Free Trial", values: ["—", "7 days", "7 days"] },
  { label: "Kid Profile", values: ["1", "1", "3"] },
  { label: "Classical Story", values: ["50", "Unlimited", "Unlimited"] },
  { label: "ImagiMe – Characters", values: ["—", "1", "3"] },
  { label: "ImagiMe – Generation Times", values: ["—", "2", "5"] },
  { label: "ReImagined Times", values: ["—", "—", "5"] },
  { label: "StoryQuest Times", values: ["—", "3", "10"] },
  { label: "LumiqOriginal Story Times", values: ["—", "3", "10"] },
  { label: "LumiqBook Add-on", values: ["$69", "$59", "$49"] },
];

const palCols = ["Free", "Lite", "Pro", "Ultra"];
const palRows: { label: string; values: (string | boolean)[] }[] = [
  { label: "Monthly Fee", values: ["—", "$16.99 yr / $19.99 mo", "$26.99 yr / $29.99 mo", "$35.99 yr / $39.99 mo"] },
  { label: "Free Trial", values: ["—", "7 days", "7 days", "7 days"] },
  { label: "Character", values: ["1", "2", "3", "4"] },
  { label: "Customized Voice", values: [false, true, true, true] },
  { label: "Customized Personality", values: [false, true, true, true] },
  { label: "Reminder", values: [false, true, true, true] },
  { label: "Connect to LumiqTablet", values: [true, true, true, true] },
  { label: "Day Limit (HR)", values: ["2", "8", "12", "24"] },
];

function cell(v: string | boolean) {
  if (v === true) return <span style={{ color: "var(--mint)", fontWeight: 600 }}>✓</span>;
  if (v === false) return <span style={{ color: "var(--ink-4)" }}>—</span>;
  return <span>{v}</span>;
}

function PlanTable({ cols, rows, featured = "Pro" }: { cols: string[]; rows: { label: string; values: (string | boolean)[] }[]; featured?: string }) {
  return (
    <>
      <div className="pal-table-wrap">
        <table className="pal-table">
          <thead>
            <tr>
              <th>Subscription Plan</th>
              {cols.map((c) => (
                <th key={c} className={c === featured ? "is-featured" : ""}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((v, i) => (
                  <td key={i} className={cols[i] === featured ? "is-featured" : ""}>{cell(v)}</td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row"></th>
              {cols.map((c) => (
                <td key={c} className={c === featured ? "is-featured" : ""}>
                  {c === "Free" ? null : (
                    <Link href="/prelaunch" className="btn"
                      style={{
                        background: c === featured ? "var(--ink)" : "transparent",
                        color: c === featured ? "white" : "var(--ink)",
                        border: c === featured ? "none" : "1px solid var(--ink)",
                        padding: ".5rem 1rem",
                        fontSize: ".85rem",
                      }}>Choose {c}</Link>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="pal-cards">
        {cols.map((col, ci) => (
          <article key={col} className={`tier-card${col === featured ? " featured" : ""}`}>
            <span className="kicker" style={{ color: col === featured ? "var(--gold)" : "var(--purple)" }}>{col}</span>
            <div className="serif" style={{ fontSize: "1.5rem", margin: ".25rem 0 1rem" }}>{rows[0].values[ci]}</div>
            <ul style={{ flex: 1, marginBottom: "1.5rem" }}>
              {rows.slice(1).map((row) => (
                <li key={row.label} style={{
                  display: "flex", justifyContent: "space-between", gap: "1rem",
                  padding: ".5rem 0",
                  borderBottom: `1px solid ${col === featured ? "rgba(255,255,255,0.12)" : "var(--border)"}`,
                  fontSize: ".9rem",
                }}>
                  <span style={{ color: col === featured ? "rgba(255,255,255,0.7)" : "var(--ink-3)" }}>{row.label}</span>
                  <span>{cell(row.values[ci])}</span>
                </li>
              ))}
            </ul>
            {col !== "Free" && (
              <Link href="/prelaunch" className="btn"
                style={{
                  background: col === featured ? "white" : "var(--ink)",
                  color: col === featured ? "var(--ink)" : "white",
                  textAlign: "center",
                }}>Choose {col}</Link>
            )}
          </article>
        ))}
      </div>
    </>
  );
}

export default function PlansPage() {
  return (
    <div className="lumiq-root editorial-page" style={{ paddingTop: "6rem", color: "var(--ink)" }}>
      <div className="bg-layer" aria-hidden>
        <div className="stars" />
        <div className="bokeh b1" />
        <div className="bokeh b2" />
      </div>

      <section className="container" style={{ padding: "2rem 2rem 3rem", maxWidth: 1100 }}>
        <span className="kicker">Plans</span>
        <h1 className="lq-h1 serif" style={{ margin: "1rem 0 1.25rem", maxWidth: 760 }}>
          Pick the way you want to live with us.
        </h1>
        <p className="lq-body" style={{ color: "var(--ink-2)", maxWidth: 560 }}>
          One-time hardware. Monthly subscriptions where it makes sense. No tricks.
        </p>
      </section>

      <section className="container lq-section" style={{ padding: "0 2rem 5rem" }}>
        <div className="hw-grid">
          {hardware.map((h) => (
            <article key={h.name} className="hw-card">
              <div className="hw-img"><img src={h.img} alt={h.name} loading="lazy" /></div>
              <h3 className="serif" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)", margin: ".25rem 0 .35rem" }}>{h.name}</h3>
              <p style={{ color: "var(--ink-3)", fontSize: ".95rem", marginBottom: "1.25rem" }}>{h.blurb}</p>
              <div className="serif" style={{ fontSize: "clamp(1.5rem, 2.4vw, 1.85rem)", color: "var(--wine)", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: ".65em", color: "var(--ink-3)", marginRight: ".4rem" }}>USD</span>{h.price}
              </div>
              <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
                <Link href="/prelaunch" className="btn btn-navy" style={{ padding: ".6rem 1.1rem", fontSize: ".9rem" }}>
                  Reserve →
                </Link>
                <Link href={h.href} style={{ alignSelf: "center", color: "var(--purple)", fontSize: ".9rem", fontWeight: 500 }}>
                  Learn more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container lq-section" style={{ padding: "0 2rem 5rem" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 2.5rem" }}>
          <span className="kicker" style={{ justifyContent: "center" }}>LumiqTablet — Story Pass</span>
          <h2 className="lq-h2 serif">Continue your story.</h2>
        </div>
        <PlanTable cols={tabletCols} rows={tabletRows} />
      </section>

      <section className="container lq-section" style={{ padding: "0 2rem 6rem" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 2.5rem" }}>
          <span className="kicker" style={{ justifyContent: "center" }}>LumiqPal — Subscription</span>
          <h2 className="lq-h2 serif">Choose the companion plan.</h2>
        </div>
        <PlanTable cols={palCols} rows={palRows} />
      </section>

      <style>{`
        .hw-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .hw-card { background: var(--card); border: 1px solid var(--border); border-radius: 20px; padding: 1.25rem 1.25rem 1.75rem; display: flex; flex-direction: column; backdrop-filter: blur(8px); }
        .hw-img { aspect-ratio: 4/3; border-radius: 14px; overflow: hidden; margin-bottom: 1.25rem; }
        .hw-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .tier-card { background: var(--card); color: var(--ink); border: 1px solid var(--border); border-radius: 16px; padding: 2rem 1.75rem; display: flex; flex-direction: column; }
        .tier-card.featured { background: var(--ink); color: white; border-color: transparent; }
        .pal-table-wrap { display: block; overflow-x: auto; }
        .pal-table { width: 100%; border-collapse: collapse; background: var(--card); border-radius: 18px; overflow: hidden; }
        .pal-table th, .pal-table td { padding: 1rem 1.1rem; text-align: center; border-bottom: 1px solid var(--border); font-size: .95rem; vertical-align: middle; }
        .pal-table thead th { background: rgba(124,91,208,0.06); font-family: var(--font-serif); font-size: 1.1rem; }
        .pal-table tbody th { text-align: left; color: var(--ink-2); font-weight: 500; }
        .pal-table .is-featured { background: rgba(31,20,41,0.04); }
        .pal-table thead .is-featured { background: var(--ink); color: white; }
        .pal-cards { display: none; }
        @media (max-width: 900px) { .hw-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 760px) { .pal-table-wrap { display: none; } .pal-cards { display: grid; gap: 1.5rem; grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
