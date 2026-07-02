"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Box,
  Cpu,
  GraduationCap,
  Lock,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";

const PRODUCTS = [
  {
    id: "tablet",
    href: "/products/tablet",
    img: "/lumiqtab.jpg",
    tag: "01",
    pill: "Tablet for kids",
    name: "LumiqTablet",
    sub: "A Tablet Built for Wonder",
    desc: "A distraction-free reading device engineered purely for stories, interaction, and imagination — no feeds, no noise, no ads.",
    specs: ["Original Story library", "ImagiMe face-swap", "Story Quest campaigns", "Distraction-free by design"],
  },
  {
    id: "book",
    href: "/products/book",
    img: "/lumiqbookcover.png",
    tag: "02",
    pill: "Personalized hardcover",
    name: "LumiqBook",
    sub: "Your Child, The Hero",
    desc: "Turn any ImagiMe story from the LumiqTablet into a real printed hardcover — with your child as the main character.",
    specs: ["Powered by ImagiMe face-swap", "Premium hardcover printing", "Delivered to your door", "A keepsake that lasts"],
  },
  {
    id: "pal",
    href: "/products/pal",
    img: "/lumiqpal.png",
    tag: "03",
    pill: "Holographic companion",
    name: "LumiqPal",
    sub: "Holographic Companion",
    desc: "A magical bedside companion that syncs with the tablet to bring stories into the room — and keeps the whole family close.",
    specs: ["3D holographic display", "Ambient Story Sync", "Conversation & reminders", "Family connection"],
  },
] as const;

const FEATURES = [
  { Icon: Cpu, title: "AI-Powered", sub: "Smart interaction" },
  { Icon: Box, title: "Holographic Display", sub: "3D immersive experience" },
  { Icon: GraduationCap, title: "Learning Companion", sub: "For kids & families" },
  { Icon: ShieldCheck, title: "Safe & Private", sub: "Built with trust" },
] as const;

const PROMISES = [
  { Icon: Truck, title: "Global Shipping", sub: "Fast, reliable delivery worldwide" },
  { Icon: RotateCcw, title: "30-Day Returns", sub: "Hassle-free returns and exchanges" },
  { Icon: BadgeCheck, title: "2-Year Warranty", sub: "Premium quality, guaranteed" },
  { Icon: Lock, title: "Secure Checkout", sub: "Encrypted, safe payment" },
] as const;

export default function ProductsShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!rootRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    rootRef.current.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const onHeroMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = heroMediaRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--px", `${(x * 16).toFixed(1)}px`);
    el.style.setProperty("--py", `${(y * 12).toFixed(1)}px`);
  };

  const onHeroLeave = () => {
    const el = heroMediaRef.current;
    if (!el) return;
    el.style.setProperty("--px", "0px");
    el.style.setProperty("--py", "0px");
  };

  const current = PRODUCTS[active];

  return (
    <div ref={rootRef} className="prod-page editorial-page">
      {/* Announcement bar */}
      <div className="prod-topbar" role="note">
        <div className="prod-topbar-inner">
          <span>Free Worldwide Shipping</span>
          <span className="prod-topbar-dot" aria-hidden />
          <span>30-Day Easy Returns</span>
          <span className="prod-topbar-dot" aria-hidden />
          <span>2-Year Warranty</span>
        </div>
      </div>

      {/* Hero */}
      <section className="container prod-hero">
        <div className="prod-hero-text reveal">
          <span className="prod-kicker">Lumiq Studio Collection</span>
          <h1 className="serif">
            AI. Interaction.<br />
            <em>Reimagined.</em>
          </h1>
          <p className="prod-lead">
            Future-ready AI devices that interact, learn, and grow with your family — designed to end in stories, not scrolling.
          </p>
          <div className="prod-cta-row">
            <a href="#lineup" className="btn btn-navy">Explore the lineup</a>
            <Link href="/plans" className="prod-ghost-link">Compare plans</Link>
          </div>
        </div>
        <div
          className="prod-hero-media reveal d2"
          ref={heroMediaRef}
          onMouseMove={onHeroMove}
          onMouseLeave={onHeroLeave}
        >
          <img src="/lumiqpal.png" alt="LumiqPal holographic AI companion device" width={1024} height={1024} />
        </div>
      </section>

      {/* Feature strip */}
      <section className="prod-feats reveal">
        <div className="container prod-feats-grid">
          {FEATURES.map(({ Icon, title, sub }) => (
            <div key={title} className="prod-feat">
              <span className="prod-feat-ico"><Icon size={20} strokeWidth={1.6} /></span>
              <span>
                <strong>{title}</strong>
                <small>{sub}</small>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive lineup */}
      <section id="lineup" className="container prod-lineup">
        <div className="prod-lineup-head reveal">
          <span className="prod-kicker">The Lineup</span>
          <h2 className="serif">Three objects. One quiet universe.</h2>
        </div>

        <div className="prod-tabs reveal" role="tablist" aria-label="Lumiq products">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`prod-tab${i === active ? " on" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="prod-tab-num serif">{p.tag}</span>
              <span className="prod-tab-name">{p.name}</span>
              <span className="prod-tab-sub">{p.sub}</span>
            </button>
          ))}
        </div>

        <div className="prod-stage reveal">
          <div className="prod-stage-media">
            {PRODUCTS.map((p, i) => (
              <img
                key={p.id}
                src={p.img}
                alt={p.name}
                className={i === active ? "on" : ""}
                loading={i === 0 ? undefined : "lazy"}
              />
            ))}
          </div>

          <div className="prod-stage-panel">
            <div className="prod-panel-body" key={current.id}>
              <span className="prod-index serif" aria-hidden>{current.tag}</span>
              <span className="prod-pill">{current.pill}</span>
              <h3 className="serif">{current.name}</h3>
              <div className="prod-sub">{current.sub}</div>
              <p>{current.desc}</p>
              <ul className="prod-specs">
                {current.specs.map((s) => (
                  <li key={s}><span className="prod-tick" aria-hidden />{s}</li>
                ))}
              </ul>
              <Link href={current.href} className="btn btn-navy">
                Discover {current.name} →
              </Link>
            </div>

            <div className="prod-stage-nav">
              <button
                type="button"
                aria-label="Previous product"
                onClick={() => setActive((active + PRODUCTS.length - 1) % PRODUCTS.length)}
              >
                <ArrowLeft size={18} strokeWidth={1.8} />
              </button>
              <span className="prod-counter">{current.tag} / 03</span>
              <button
                type="button"
                aria-label="Next product"
                onClick={() => setActive((active + 1) % PRODUCTS.length)}
              >
                <ArrowRight size={18} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="container prod-life reveal">
        <div className="prod-life-media">
          <img src="/pal-kid.jpg" alt="A child watching a holographic story at bedtime" loading="lazy" />
        </div>
        <div className="prod-life-text">
          <span className="prod-kicker">Why Lumiq</span>
          <h2 className="serif">Technology that connects imagination with intelligence.</h2>
          <p>
            Every Lumiq object is written before it is manufactured — a small, quiet universe where screens slow families down instead of speeding them up.
          </p>
          <Link href="/story" className="prod-ghost-link">Read our story</Link>
        </div>
      </section>

      {/* Trust strip */}
      <section className="prod-promise reveal">
        <div className="container prod-promise-grid">
          {PROMISES.map(({ Icon, title, sub }) => (
            <div key={title} className="prod-promise-item">
              <span className="prod-promise-ico"><Icon size={22} strokeWidth={1.6} /></span>
              <strong>{title}</strong>
              <small>{sub}</small>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .prod-page { background: #fff; color: var(--ink); padding-top: 4.5rem; line-height: 1.6; }
        .prod-page .container { max-width: 1200px; }

        .prod-kicker { display: block; font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .prod-ghost-link { color: var(--ink-2); border-bottom: 1px solid var(--ink-4); padding-bottom: 2px; font-size: 0.95rem; transition: color .25s, border-color .25s; }
        .prod-ghost-link:hover { color: var(--ink); border-color: var(--ink); }

        .prod-topbar { border-bottom: 1px solid var(--border); }
        .prod-topbar-inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.9rem 1.75rem; padding: 0.7rem 1.5rem; font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3); }
        .prod-topbar-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--ink-4); }

        .prod-hero { display: grid; grid-template-columns: 1.05fr 1fr; gap: 4rem; align-items: center; padding-top: 5rem; padding-bottom: 5rem; }
        .prod-hero-text h1 { font-size: clamp(2.75rem, 6vw, 4.75rem); line-height: 1.03; letter-spacing: -0.02em; margin: 0 0 1.5rem; }
        .prod-hero-text h1 em { font-style: italic; color: var(--gold); }
        .prod-lead { color: var(--ink-2); font-size: 1.125rem; line-height: 1.7; max-width: 30rem; }
        .prod-cta-row { display: flex; align-items: center; gap: 1.75rem; margin-top: 2.25rem; flex-wrap: wrap; }
        .prod-hero-media { border-radius: 12px; overflow: hidden; border: 1px solid var(--border); box-shadow: var(--shadow-lg); aspect-ratio: 1 / 1; }
        .prod-hero-media img { width: 100%; height: 100%; object-fit: cover; display: block; transform: translate(var(--px, 0px), var(--py, 0px)) scale(1.06); transition: transform 0.5s ease-out; will-change: transform; }

        .prod-feats { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .prod-feats-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
        .prod-feat { display: flex; align-items: center; gap: 1rem; padding: 1.75rem 1.75rem; border-left: 1px solid var(--border); }
        .prod-feat:first-child { border-left: none; }
        .prod-feat-ico { width: 44px; height: 44px; border: 1px solid var(--border-h); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: var(--ink); flex-shrink: 0; transition: background .3s, color .3s, border-color .3s; }
        .prod-feat:hover .prod-feat-ico { background: var(--ink); color: #fff; border-color: var(--ink); }
        .prod-feat strong { display: block; font-size: 0.9375rem; color: var(--ink); }
        .prod-feat small { display: block; font-size: 0.8125rem; color: var(--ink-3); margin-top: 0.15rem; }

        .prod-lineup { padding-top: 6rem; padding-bottom: 5rem; scroll-margin-top: 5rem; }
        .prod-lineup-head h2 { font-size: clamp(2rem, 4vw, 3rem); line-height: 1.12; margin: 0; max-width: 680px; }

        .prod-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin: 3rem 0 3.5rem; }
        .prod-tab { text-align: left; background: none; border: 0; border-top: 1px solid var(--border); padding: 1.25rem 0 0; cursor: pointer; position: relative; color: var(--ink-4); font-family: inherit; transition: color .3s; }
        .prod-tab::before { content: ""; position: absolute; top: -1px; left: 0; width: 0; height: 2px; background: var(--gold); transition: width .5s cubic-bezier(0.22, 1, 0.36, 1); }
        .prod-tab:hover { color: var(--ink-2); }
        .prod-tab.on { color: var(--ink); }
        .prod-tab.on::before { width: 100%; }
        .prod-tab-num { display: block; font-size: 0.9375rem; font-style: italic; }
        .prod-tab-name { display: block; font-family: var(--font-serif); font-size: 1.375rem; margin-top: 0.35rem; }
        .prod-tab-sub { display: block; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 0.35rem; }

        .prod-stage { display: grid; grid-template-columns: 1.1fr 1fr; gap: 4rem; align-items: stretch; }
        .prod-stage-media { position: relative; aspect-ratio: 1 / 1; background: var(--cream-3); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        .prod-stage-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: scale(1.05); transition: opacity 0.6s ease, transform 0.9s ease; }
        .prod-stage-media img.on { opacity: 1; transform: scale(1); }

        .prod-stage-panel { display: flex; flex-direction: column; justify-content: center; }
        @keyframes prodFade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .prod-panel-body { animation: prodFade 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
        .prod-index { display: block; font-size: 4rem; line-height: 1; color: var(--lilac-2); }
        .prod-pill { display: inline-block; font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold); margin: 0.85rem 0 0.9rem; }
        .prod-panel-body h3 { font-size: clamp(1.9rem, 3vw, 2.6rem); line-height: 1.1; margin: 0; }
        .prod-sub { font-size: 0.8125rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-3); margin: 0.6rem 0 1rem; }
        .prod-panel-body p { color: var(--ink-2); line-height: 1.7; margin-bottom: 1.5rem; }
        .prod-specs { list-style: none; margin: 0 0 2rem; padding: 0; }
        .prod-specs li { display: flex; align-items: center; gap: 0.7rem; padding: 0.55rem 0; border-bottom: 1px dashed var(--border); font-size: 0.9375rem; color: var(--ink-2); }
        .prod-tick { width: 5px; height: 5px; background: var(--gold); flex-shrink: 0; }

        .prod-stage-nav { display: flex; align-items: center; gap: 1.25rem; margin-top: 2.25rem; }
        .prod-stage-nav button { width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--border-h); background: #fff; color: var(--ink); display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: background .25s, color .25s, border-color .25s; }
        .prod-stage-nav button:hover { background: var(--ink); color: #fff; border-color: var(--ink); }
        .prod-counter { font-size: 0.8125rem; letter-spacing: 0.14em; color: var(--ink-3); }

        .prod-life { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; padding-top: 2rem; padding-bottom: 6rem; }
        .prod-life-media { border-radius: 12px; overflow: hidden; border: 1px solid var(--border); aspect-ratio: 4 / 3; }
        .prod-life-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.9s ease; }
        .prod-life-media:hover img { transform: scale(1.04); }
        .prod-life-text h2 { font-size: clamp(1.9rem, 3.5vw, 2.75rem); line-height: 1.14; margin: 0 0 1.25rem; }
        .prod-life-text p { color: var(--ink-2); line-height: 1.75; max-width: 30rem; margin-bottom: 1.75rem; }

        .prod-promise { border-top: 1px solid var(--border); }
        .prod-promise-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
        .prod-promise-item { display: flex; flex-direction: column; gap: 0.35rem; padding: 2.75rem 1.75rem; border-left: 1px solid var(--border); }
        .prod-promise-item:first-child { border-left: none; }
        .prod-promise-ico { color: var(--gold); margin-bottom: 0.5rem; }
        .prod-promise-item strong { font-size: 0.9375rem; color: var(--ink); }
        .prod-promise-item small { font-size: 0.8125rem; color: var(--ink-3); line-height: 1.5; }

        @media (max-width: 960px) {
          .prod-hero { grid-template-columns: 1fr; gap: 2.5rem; padding-top: 3.5rem; padding-bottom: 3.5rem; }
          .prod-feats-grid { grid-template-columns: repeat(2, 1fr); }
          .prod-feat:nth-child(odd) { border-left: none; }
          .prod-feat:nth-child(n+3) { border-top: 1px solid var(--border); }
          .prod-lineup { padding-top: 4rem; padding-bottom: 3.5rem; }
          .prod-tabs { grid-template-columns: 1fr; gap: 0.5rem; margin: 2.25rem 0 2.5rem; }
          .prod-tab { padding: 0.9rem 0 0.9rem; }
          .prod-stage { grid-template-columns: 1fr; gap: 2.5rem; }
          .prod-life { grid-template-columns: 1fr; gap: 2.5rem; padding-bottom: 4rem; }
          .prod-promise-grid { grid-template-columns: repeat(2, 1fr); }
          .prod-promise-item:nth-child(odd) { border-left: none; }
          .prod-promise-item:nth-child(n+3) { border-top: 1px solid var(--border); }
        }
        @media (max-width: 640px) {
          .prod-feats-grid, .prod-promise-grid { grid-template-columns: 1fr; }
          .prod-feat, .prod-promise-item { border-left: none !important; border-top: 1px solid var(--border); padding: 1.4rem 0.5rem; }
          .prod-feat:first-child, .prod-promise-item:first-child { border-top: none; }
          .prod-topbar-inner { gap: 0.5rem 1rem; letter-spacing: 0.12em; }
        }
      `}</style>
    </div>
  );
}
