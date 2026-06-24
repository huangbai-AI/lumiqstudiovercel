"use client";
import { useState } from "react";
import Script from "next/script";

const faqs = [
  { q: "What is Lumiq Studio?", a: "We're a small studio designing objects and experiences at the meeting point of artificial intelligence, storytelling and craft." },
  { q: "Who is Lumiq for?", a: "Anyone who wants tools that lift their imagination instead of crowding it — families, creators, readers and quiet thinkers." },
  { q: "Where do you ship?", a: "We currently ship to most countries in North America, Europe and East Asia. More regions are coming soon." },
  { q: "How does the AI work?", a: "AI is used as a collaborator, not a replacement. It helps narrate, illustrate and personalise — always with the person, not instead of them." },
  { q: "Is my data private?", a: "Yes. We store as little as we can, never sell data, and offer offline modes for every product where it's possible." },
  { q: "Can I cancel a plan?", a: "Any time. There are no contracts and no penalties." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="editorial-page" style={{ paddingTop: "6rem", color: "var(--ink)" }}>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="container" style={{ padding: "2rem 2rem 3rem" }}>
        <span className="kicker">FAQ</span>
        <h1 className="serif" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: 1.05, margin: "1rem 0 1.5rem", maxWidth: 700 }}>
          Questions, gently answered.
        </h1>
        <p style={{ fontSize: "1.15rem", color: "var(--ink-2)", lineHeight: 1.7, maxWidth: 640 }}>
          Still curious? Email <a href="mailto:hello@lumiqstudio.com" style={{ color: "var(--purple)", borderBottom: "1px solid currentColor" }}>hello@lumiqstudio.com</a> and our team will reply as soon as possible.
        </p>
      </section>

      <section className="container" style={{ maxWidth: 760, padding: "1rem 2rem 6rem" }}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} style={{ borderBottom: "1px solid var(--border)" }}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  width: "100%", textAlign: "left", background: "transparent", cursor: "pointer",
                  padding: "1.5rem 0", display: "flex", justifyContent: "space-between", alignItems: "center",
                  fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--ink)",
                }}
                aria-expanded={isOpen}
              >
                <span>{f.q}</span>
                <span style={{ color: "var(--purple)", fontSize: "1.5rem", transition: "transform .3s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              {isOpen && (
                <p style={{ padding: "0 0 1.5rem", color: "var(--ink-2)", lineHeight: 1.7 }}>{f.a}</p>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
