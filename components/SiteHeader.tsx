"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Brand Story" },
  { href: "/products", label: "Products" },
  { href: "/plans", label: "Plans" },
  { href: "/media", label: "Media & Review" },
  { href: "/faq", label: "FAQ" },
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("EN");
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => { setMenuOpen(false); setLangOpen(false); };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className={`navbar${scrolled || menuOpen ? " scrolled" : ""}${menuOpen ? " menu-open" : ""}`}
      style={{ zIndex: 3000, position: "fixed", top: 0, left: 0, right: 0 }}
    >
      <div className="container nav-inner">
        <Link href="/" className="nav-logo" onClick={closeMenu}>
          <svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden>
            <path
              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
              fill="var(--ink)"
            />
            <circle cx="19" cy="5" r="2" fill="var(--gold)" />
          </svg>
          <span className="nav-wordmark">
            <strong>LUMIQ</strong>
            <small>STUDIO</small>
          </span>
        </Link>

        <div className="site-desktop-nav hidden md:flex" aria-label="Primary navigation">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <div className="lang-switch site-desktop-action hidden md:block">
            <button
              type="button"
              className="lang-btn"
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              <span aria-hidden="true">🌐</span> {lang} <span className="lang-caret">▾</span>
            </button>
            {langOpen && (
              <ul className="lang-menu" role="listbox">
                {[
                  { code: "EN", label: "English" },
                  { code: "繁中", label: "繁體中文" },
                  { code: "日本語", label: "日本語" },
                ].map((o) => (
                  <li key={o.code}>
                    <button
                      type="button"
                      className={`lang-item${lang === o.code ? " active" : ""}`}
                      onClick={() => { setLang(o.code); setLangOpen(false); }}
                    >
                      {o.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <a href="#" className="btn btn-ghost-navy login-btn site-login-btn">
            Log in
          </a>

          <button
            type="button"
            className="site-mobile-trigger flex md:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`site-mobile-menu md:hidden ${menuOpen ? "flex open" : "hidden"}`}
        role="menu"
        aria-hidden={!menuOpen}
      >
        <div className="site-mobile-menu-head">
          <span>Menu</span>
          <button type="button" className="site-mobile-close" aria-label="Close navigation menu" onClick={closeMenu}>
            <X size={20} />
          </button>
        </div>
        {NAV.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            role="menuitem"
            onClick={closeMenu}
            className={isActive(l.href) ? "active" : ""}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <style>{`
        .navbar {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid transparent;
          transition: background .3s, border-color .3s, box-shadow .3s;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.95);
          border-bottom-color: var(--border, rgba(0,0,0,0.08));
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; gap: 1.5rem; }
        .nav-logo { display: inline-flex; align-items: center; gap: 0.65rem; font-size: 1.05rem; color: var(--ink); }
        .nav-wordmark { display: flex; flex-direction: column; line-height: 1; }
        .nav-wordmark strong { font-size: 0.95rem; font-weight: 600; letter-spacing: 0.32em; color: var(--ink); }
        .nav-wordmark small { font-size: 0.5rem; font-weight: 500; letter-spacing: 0.62em; color: var(--ink-3); margin-top: 3px; }
        .nav-actions { display: flex; align-items: center; gap: 1rem; }
        .site-desktop-nav { align-items: center; gap: 2rem; }
        .site-desktop-nav a { color: var(--ink-3); font-weight: 500; font-size: 0.95rem; transition: color 0.2s; position: relative; }
        .site-desktop-nav a:hover, .site-desktop-nav a.active { color: var(--ink); }
        .site-desktop-nav a.active::after { content: ""; position: absolute; left: 0; right: 0; bottom: -6px; height: 2px; background: var(--gold); border-radius: 2px; }
        .lang-btn { background: transparent; cursor: pointer; color: var(--ink-2); font-size: 0.9rem; padding: 0.4rem 0.6rem; border-radius: 8px; }
        .lang-btn:hover { background: rgba(20,20,20,0.05); }
        .lang-switch { position: relative; }
        .lang-menu { position: absolute; right: 0; top: calc(100% + 6px); background: white; border: 1px solid var(--border); border-radius: 10px; padding: 0.4rem; min-width: 160px; box-shadow: var(--shadow); }
        .lang-item { display: block; width: 100%; text-align: left; padding: 0.5rem 0.75rem; background: transparent; cursor: pointer; border-radius: 6px; font-size: 0.9rem; color: var(--ink-2); }
        .lang-item:hover, .lang-item.active { background: var(--cream-3); color: var(--ink); }
        .login-btn { background: transparent; border: 1px solid var(--ink); color: var(--ink); }
        .login-btn:hover { background: var(--ink); color: white; }
        .site-mobile-trigger { width: 42px; height: 42px; background: rgba(255,255,255,0.6); border: 1px solid var(--border, rgba(0,0,0,0.1)); border-radius: 10px; padding: 0; cursor: pointer; align-items: center; justify-content: center; color: var(--ink, #1a1a1a); z-index: 3002; flex-shrink: 0; }
        .site-mobile-trigger svg { display: block; pointer-events: none; }
        .site-mobile-menu { flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: rgba(255,255,255,0.98); backdrop-filter: blur(12px); border-top: 1px solid var(--border, rgba(0,0,0,0.1)); box-shadow: 0 8px 24px rgba(0,0,0,0.08); padding: 0.75rem 1rem 1.25rem; z-index: 3001; }
        .site-mobile-menu-head { display: flex; align-items: center; justify-content: space-between; padding: 0.25rem 0.25rem 0.75rem; color: var(--ink); font-weight: 600; }
        .site-mobile-close { width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--border); border-radius: 10px; background: rgba(255,255,255,0.6); color: var(--ink); cursor: pointer; }
        .site-mobile-menu a { display: block; padding: 0.85rem 0.5rem; color: var(--ink); font-weight: 500; font-size: 1rem; border-bottom: 1px solid var(--border); }
        .site-mobile-menu a:last-child { border-bottom: none; }
        .site-mobile-menu a.active { color: var(--ink); font-weight: 600; }
        .site-login-btn { display: inline-flex !important; padding: 0.45rem 1rem; font-size: 0.8125rem; }
        @media (max-width: 767px) {
          .site-desktop-nav, .site-desktop-action { display: none !important; }
          .nav-actions { gap: 0.5rem; }
          .nav-inner { padding: 0.85rem 1.25rem; }
          .site-login-btn { padding: 0.4rem 0.85rem; font-size: 0.8125rem; }
          .site-mobile-trigger { display: inline-flex !important; }
          .site-mobile-menu.open { display: flex !important; }
        }
        @media (min-width: 768px) {
          .site-desktop-nav { display: flex !important; }
          .site-desktop-action { display: block !important; }
          .site-mobile-trigger, .site-mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
