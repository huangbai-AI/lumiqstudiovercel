"use client";
import Link from "next/link";
import { useState } from "react";

export default function PrelaunchPage() {
  const [email, setEmail] = useState("");
  return (
    <div className="lumiq-root editorial-page" style={{ paddingTop: "8rem", minHeight: "100vh" }}>
      <div className="bg-layer" aria-hidden>
        <div className="stars" />
        <div className="bokeh b1" />
        <div className="bokeh b2" />
      </div>
      <section className="container" style={{ padding: "4rem 2rem", maxWidth: 760, textAlign: "center" }}>
        <span className="kicker" style={{ justifyContent: "center" }}>Prelaunch</span>
        <h1 className="lq-h1 serif" style={{ margin: "1rem 0 1.25rem", color: "var(--ink)" }}>
          Coming soon.
        </h1>
        <p className="lq-body" style={{ color: "var(--ink-3)", maxWidth: 520, margin: "0 auto 2.5rem" }}>
          The Lumiq universe is almost ready. Leave your email and we&apos;ll let you know the moment reservations open.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            display: "flex",
            gap: ".5rem",
            maxWidth: 460,
            margin: "0 auto",
            background: "white",
            padding: ".5rem",
            borderRadius: 999,
            boxShadow: "var(--shadow)",
            border: "1px solid var(--border)",
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@studio.com"
            style={{ flex: 1, padding: "0 1.25rem", background: "transparent", color: "var(--ink)" }}
          />
          <button type="submit" className="btn btn-navy" style={{ padding: ".75rem 1.5rem" }}>Notify me</button>
        </form>
        <div style={{ marginTop: "3rem" }}>
          <Link href="/products" style={{ color: "var(--ink-2)", fontWeight: 500, borderBottom: "1px solid var(--ink-4)", paddingBottom: 2 }}>← Back to products</Link>
        </div>
      </section>
    </div>
  );
}
