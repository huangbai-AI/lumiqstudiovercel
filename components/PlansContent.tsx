"use client";

import Link from "next/link";
import { useState } from "react";
import RevealObserver from "@/components/RevealObserver";

type Billing = "yearly" | "monthly";
type Row = { label: string; values: (string | boolean)[] };

const hardware = [
  { name: "LumiqTablet", price: "399", img: "/lumiqtab.jpg", blurb: "A calm reading & creation canvas.", href: "/products/tablet" },
  { name: "LumiqPal", price: "599", img: "/lumiqpal.png", blurb: "A companion for kids and elders.", href: "/products/pal" },
  { name: "LumiqBook", price: "69", img: "/lumiqbookcover.png", blurb: "Hardcover, personalised, archival.", href: "/products/book" },
];

const tabletCols = ["Free", "Lite", "Pro"];
const tabletRows: Row[] = [
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
const palRows: Row[] = [
  { label: "Monthly Fee", values: ["—", "$16.99 yr / $19.99 mo", "$26.99 yr / $29.99 mo", "$35.99 yr / $39.99 mo"] },
  { label: "Free Trial", values: ["—", "7 days", "7 days", "7 days"] },
  { label: "Character", values: ["1", "2", "3", "4"] },
  { label: "Customized Voice", values: [false, true, true, true] },
  { label: "Customized Personality", values: [false, true, true, true] },
  { label: "Reminder", values: [false, true, true, true] },
  { label: "Connect to LumiqTablet", values: [true, true, true, true] },
  { label: "Day Limit (HR)", values: ["2", "8", "12", "24"] },
];

const FEE_RE = /^\$([\d.]+) yr \/ \$([\d.]+) mo$/;

function cell(v: string | boolean, billing: Billing) {
  if (v === true) return <span style={{ color: "var(--gold)", fontWeight: 600 }}>✓</span>;
  if (v === false) return <span style={{ color: "var(--ink-4)" }}>—</span>;
  const m = typeof v === "string" ? v.match(FEE_RE) : null;
  if (m) {
    const price = billing === "yearly" ? m[1] : m[2];
    return (
      <span className="fee-cell">
        <strong className="serif">${price}</strong> / mo
        <em>{billing === "yearly" ? "billed yearly" : "billed monthly"}</em>
      </span>
    );
  }
  return <span>{v}</span>;
}

function BillingToggle({ billing, setBilling }: { billing: Billing; setBilling: (b: Billing) => void }) {
  return (
    <div className="billing-toggle" role="group" aria-label="Billing period">
      <button type="button" className={billing === "yearly" ? "on" : ""} onClick={() => setBilling("yearly")}>
        Yearly <span className="billing-save">Save up to 12%</span>
      </button>
      <button type="button" className={billing === "monthly" ? "on" : ""} onClick={() => setBilling("monthly")}>
        Monthly
      </button>
    </div>
  );
}

function PlanTable({ cols, rows, billing, featured = "Pro" }: { cols: string[]; rows: Row[]; billing: Billing; featured?: string }) {
  return (
    <>
      <div className="pal-table-wrap">
        <table className="pal-table">
          <thead>
            <tr>
              <th>Subscription Plan</th>
              {cols.map((c) => (
                <th key={c} className={c === featured ? "is-featured" : ""}>
                  {c === featured && <span className="pop-tag">Most popular</span>}
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((v, i) => (
                  <td key={i} className={cols[i] === featured ? "is-featured" : ""}>{cell(v, billing)}</td>
                ))}
              </tr>
            ))}
            <tr className="cta-row">
              <th scope="row"></th>
              {cols.map((c) => (
                <td key={c} className={c === featured ? "is-featured" : ""}>
                  {c === "Free" ? null : (
                    <Link href="/prelaunch" className={`btn plan-choose${c === featured ? " is-dark" : ""}`}>
                      Choose {c}
                    </Link>
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
            <span className="kicker" style={{ color: "var(--gold)" }}>{col}</span>
            <div className="serif" style={{ fontSize: "1.5rem", margin: ".25rem 0 1rem" }}>{cell(rows[0].values[ci], billing)}</div>
            <ul style={{ flex: 1, marginBottom: "1.5rem" }}>
              {rows.slice(1).map((row) => (
                <li key={row.label} style={{
                  display: "flex", justifyContent: "space-between", gap: "1rem",
                  padding: ".5rem 0",
                  borderBottom: `1px solid ${col === featured ? "rgba(255,255,255,0.12)" : "var(--border)"}`,
                  fontSize: ".9rem",
                }}>
                  <span style={{ color: col === featured ? "rgba(255,255,255,0.7)" : "var(--ink-3)" }}>{row.label}</span>
                  <span>{cell(row.values[ci], billing)}</span>
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

export default function PlansContent() {
  const [billing, setBilling] = useState<Billing>("yearly");

  return (
    <div className="editorial-page" style={{ paddingTop: "6rem", color: "var(--ink)" }}>
      <RevealObserver />

      <section className="container reveal" style={{ padding: "2rem 2rem 3rem", maxWidth: 1100 }}>
        <span className="kicker">Plans</span>
        <h1 className="lq-h1 serif" style={{ margin: "1rem 0 1.25rem", maxWidth: 760 }}>
          Pick the way you want to live with us.
        </h1>
        <p className="lq-body" style={{ color: "var(--ink-2)", maxWidth: 560 }}>
          One-time hardware. Monthly subscriptions where it makes sense. No tricks.
        </p>
      </section>

      <section className="container reveal" style={{ padding: "0 2rem 5rem" }}>
        <div className="hw-grid">
          {hardware.map((h) => (
            <article key={h.name} className="hw-card">
              <div className="hw-img"><img src={h.img} alt={h.name} loading="lazy" /></div>
              <h3 className="serif" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)", margin: ".25rem 0 .35rem" }}>{h.name}</h3>
              <p style={{ color: "var(--ink-3)", fontSize: ".95rem", marginBottom: "1.25rem" }}>{h.blurb}</p>
              <div className="serif" style={{ fontSize: "clamp(1.5rem, 2.4vw, 1.85rem)", color: "var(--ink)", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: ".6em", color: "var(--gold)", marginRight: ".4rem", letterSpacing: ".08em" }}>USD</span>{h.price}
              </div>
              <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginTop: "auto" }}>
                <Link href="/prelaunch" className="btn btn-navy" style={{ padding: ".6rem 1.1rem", fontSize: ".9rem" }}>
                  Reserve →
                </Link>
                <Link href={h.href} className="hw-more">
                  Learn more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container reveal" style={{ padding: "0 2rem 2rem", textAlign: "center" }}>
        <BillingToggle billing={billing} setBilling={setBilling} />
      </section>

      <section className="container lq-section reveal" style={{ padding: "1rem 2rem 5rem" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 2.5rem" }}>
          <span className="kicker" style={{ justifyContent: "center" }}>LumiqTablet — Story Pass</span>
          <h2 className="lq-h2 serif">Continue your story.</h2>
        </div>
        <PlanTable cols={tabletCols} rows={tabletRows} billing={billing} />
      </section>

      <section className="container lq-section reveal" style={{ padding: "0 2rem 6rem" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 2.5rem" }}>
          <span className="kicker" style={{ justifyContent: "center" }}>LumiqPal — Subscription</span>
          <h2 className="lq-h2 serif">Choose the companion plan.</h2>
        </div>
        <PlanTable cols={palCols} rows={palRows} billing={billing} />
      </section>

      <style>{`
        .hw-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .hw-card { background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 1.25rem 1.25rem 1.75rem; display: flex; flex-direction: column; transition: transform .4s, box-shadow .4s, border-color .4s; }
        .hw-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: var(--border-h); }
        .hw-img { aspect-ratio: 4/3; border-radius: 14px; overflow: hidden; margin-bottom: 1.25rem; background: var(--cream-3); }
        .hw-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .8s ease; }
        .hw-card:hover .hw-img img { transform: scale(1.05); }
        .hw-more { align-self: center; color: var(--ink-2); font-size: .9rem; font-weight: 500; border-bottom: 1px solid var(--ink-4); padding-bottom: 2px; transition: color .25s, border-color .25s; }
        .hw-more:hover { color: var(--ink); border-color: var(--ink); }

        .billing-toggle { display: inline-flex; border: 1px solid var(--border-h); border-radius: 999px; padding: 4px; background: #fff; }
        .billing-toggle button { border: 0; background: transparent; font: inherit; font-size: .9rem; font-weight: 500; color: var(--ink-3); padding: .55rem 1.4rem; border-radius: 999px; cursor: pointer; transition: background .3s, color .3s; display: inline-flex; align-items: center; gap: .5rem; }
        .billing-toggle button.on { background: var(--ink); color: #fff; }
        .billing-save { font-size: .6875rem; font-weight: 600; letter-spacing: .04em; color: var(--gold); }
        .billing-toggle button.on .billing-save { color: #E8CE8F; }

        .fee-cell { display: inline-flex; flex-direction: column; line-height: 1.25; }
        .fee-cell strong { font-size: 1.15rem; font-weight: 600; }
        .fee-cell em { font-style: normal; font-size: .7rem; color: var(--ink-3); letter-spacing: .04em; }
        .is-featured .fee-cell em { color: var(--ink-3); }

        .tier-card { background: #fff; color: var(--ink); border: 1px solid var(--border); border-radius: 16px; padding: 2rem 1.75rem; display: flex; flex-direction: column; }
        .tier-card.featured { background: var(--ink); color: white; border-color: transparent; }
        .tier-card.featured .fee-cell em { color: rgba(255,255,255,0.6); }

        .pal-table-wrap { display: block; overflow-x: auto; border: 1px solid var(--border); border-radius: 16px; }
        .pal-table { width: 100%; border-collapse: collapse; background: #fff; }
        .pal-table th, .pal-table td { padding: 1rem 1.1rem; text-align: center; border-bottom: 1px solid var(--border); font-size: .95rem; vertical-align: middle; }
        .pal-table thead th { font-family: var(--font-serif); font-size: 1.1rem; border-bottom: 1px solid var(--border-h); position: relative; padding-top: 1.4rem; padding-bottom: 1.4rem; }
        .pal-table tbody th { text-align: left; color: var(--ink-2); font-weight: 500; }
        .pal-table tbody tr:not(.cta-row):hover th, .pal-table tbody tr:not(.cta-row):hover td { background: var(--cream-2); }
        .pal-table .is-featured { background: var(--cream-2); }
        .pal-table thead .is-featured { background: var(--ink); color: white; }
        .pop-tag { display: block; font-family: var(--font-sans); font-size: .55rem; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: #E8CE8F; margin-bottom: .3rem; }
        .pal-table .cta-row th, .pal-table .cta-row td { border-bottom: none; padding-top: 1.25rem; padding-bottom: 1.5rem; }
        .plan-choose { background: transparent; color: var(--ink); border: 1px solid var(--ink); padding: .5rem 1rem; font-size: .85rem; }
        .plan-choose:hover { background: var(--ink); color: #fff; transform: translateY(-2px); }
        .plan-choose.is-dark { background: var(--ink); color: #fff; border-color: var(--ink); }
        .plan-choose.is-dark:hover { background: #000; }

        .pal-cards { display: none; }
        @media (max-width: 900px) { .hw-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 760px) { .pal-table-wrap { display: none; } .pal-cards { display: grid; gap: 1.5rem; grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
