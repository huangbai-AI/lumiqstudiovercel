"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import "./homepage.css";

const sectionIds = ["home", "ola", "tablet", "nest", "together", "join"] as const;
type SectionId = (typeof sectionIds)[number];

function useHomeSnap() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sections = sectionIds
      .map((id) => root.querySelector<HTMLElement>(`#${id}`))
      .filter((section): section is HTMLElement => Boolean(section));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let locked = false;
    let unlockTimer = 0;
    let frame = 0;

    const nearestIndex = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      sections.forEach((section, index) => {
        const distance = Math.abs(section.offsetTop - marker);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });
      return bestIndex;
    };

    const goToIndex = (index: number, updateHash = true) => {
      const nextIndex = Math.max(0, Math.min(sections.length - 1, index));
      const section = sections[nextIndex];
      if (!section) return;

      locked = true;
      section.scrollIntoView({
        block: "start",
        behavior: reducedMotion ? "auto" : "smooth",
      });
      setActiveSection(section.id as SectionId);
      if (updateHash) history.replaceState(null, "", `#${section.id}`);
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        locked = false;
      }, reducedMotion ? 80 : 720);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX) || Math.abs(event.deltaY) < 12) return;

      const lastIndex = sections.length - 1;
      const current = nearestIndex();
      const belowLastPanel = window.scrollY > sections[lastIndex].offsetTop + window.innerHeight * 0.15;

      if (belowLastPanel) {
        if (event.deltaY < 0 && !locked) {
          event.preventDefault();
          goToIndex(lastIndex);
        }
        return;
      }

      if (event.deltaY > 0 && current === lastIndex) return;
      event.preventDefault();
      if (!locked) goToIndex(current + (event.deltaY > 0 ? 1 : -1));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a, [contenteditable='true']")) return;

      const current = nearestIndex();
      const forward = event.key === "ArrowDown" || event.key === "PageDown" || (event.key === " " && !event.shiftKey);
      const backward = event.key === "ArrowUp" || event.key === "PageUp" || (event.key === " " && event.shiftKey);

      if (forward && current < sections.length - 1) {
        event.preventDefault();
        goToIndex(current + 1);
      } else if (backward) {
        event.preventDefault();
        goToIndex(current - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goToIndex(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToIndex(sections.length - 1);
      }
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const section = sections[nearestIndex()];
        if (section) setActiveSection(section.id as SectionId);
      });
    };

    const onHashChange = () => {
      const id = window.location.hash.slice(1) as SectionId;
      const index = sectionIds.indexOf(id);
      if (index >= 0) goToIndex(index, false);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);

    const initialId = window.location.hash.slice(1) as SectionId;
    const initialIndex = sectionIds.indexOf(initialId);
    if (initialIndex >= 0) window.requestAnimationFrame(() => goToIndex(initialIndex, false));

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      window.clearTimeout(unlockTimer);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return { rootRef, activeSection };
}

export default function HomePage() {
  const t = useTranslations("Home");
  const common = useTranslations("Common");
  const { rootRef, activeSection } = useHomeSnap();

  return (
    <main ref={rootRef} className="home-experience" aria-label={t("sectionNavAria")}>
      <nav className="home-snap-nav" aria-label={t("sectionNavAria")}>
        {sectionIds.map((id, index) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeSection === id ? "is-active" : undefined}
            aria-current={activeSection === id ? "true" : undefined}
            aria-label={`0${index + 1} ${id}`}
          >
            <span>0{index + 1}</span>
          </a>
        ))}
      </nav>

      <section id="home" data-snap-section className="home-panel home-hero panel-light-left">
        <picture>
          <source media="(max-width: 900px)" srcSet="/assets/home/hero-family-products-mobile.webp" />
          <img className="home-panel-image" src="/assets/home/hero-family-products.webp" alt={t("heroSceneAlt")} />
        </picture>
        <div className="home-panel-scrim" aria-hidden="true" />
        <div className="home-panel-copy home-copy-left hero-home-copy">
          <p className="home-kicker">{t("heroKicker")}</p>
          <h1>{t("heroTitle")}</h1>
          <p className="home-lead">{t("heroBodyOriginal")}</p>
          <a className="home-primary-action" href="#ola">
            {t("heroAction")} <ArrowDown size={17} aria-hidden="true" />
          </a>
          <p className="home-product-note">{t("heroNote")}</p>
        </div>
        <div className="home-product-jump" aria-label={t("productsAria")}>
          <a href="#ola"><span>01</span>LumiQ Ola</a>
          <a href="#tablet"><span>02</span>LumiQ Tablet</a>
          <a href="#nest"><span>03</span>Nest 15</a>
        </div>
      </section>

      <section id="ola" data-snap-section className="home-panel home-product-panel panel-dark-left">
        <img className="home-panel-image" src="/assets/home/ola-with-child.webp" alt={t("olaSceneAlt")} />
        <div className="home-panel-scrim" aria-hidden="true" />
        <div className="home-panel-copy home-copy-left home-copy-light">
          <span className="home-panel-index">02 / 06</span>
          <p className="home-kicker">{t("olaKicker")}</p>
          <h2>{t("olaTitle")}</h2>
          <p className="home-lead">{t("olaBody")}</p>
          <Link className="home-outline-action" href="/products/ola">
            {t("olaAction")} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section id="tablet" data-snap-section className="home-panel home-product-panel panel-dark-right">
        <img className="home-panel-image" src="/assets/home/tablet-reading.webp" alt={t("tabletSceneAlt")} />
        <div className="home-panel-scrim" aria-hidden="true" />
        <div className="home-panel-copy home-copy-right home-copy-light">
          <span className="home-panel-index">03 / 06</span>
          <p className="home-kicker">{t("tabletKicker")}</p>
          <h2>{t("tabletTitle")}</h2>
          <p className="home-lead">{t("tabletBody")}</p>
          <Link className="home-outline-action" href="/products/tablet">
            {t("tabletAction")} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section id="nest" data-snap-section className="home-panel home-product-panel panel-light-left panel-nest">
        <img className="home-panel-image" src="/assets/home/nest-home-rhythm.webp" alt={t("nestSceneAlt")} />
        <div className="home-panel-scrim" aria-hidden="true" />
        <div className="home-panel-copy home-copy-left">
          <span className="home-panel-index">04 / 06</span>
          <p className="home-kicker">{t("nestKicker")}</p>
          <h2>{t("nestTitle")}</h2>
          <p className="home-lead">{t("nestBody")}</p>
          <Link className="home-dark-action" href="/products/nest">
            {t("nestAction")} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section id="together" data-snap-section className="home-panel home-together-panel">
        <picture>
          <source media="(max-width: 900px)" srcSet="/assets/home/family-together-mobile.webp" />
          <img className="home-panel-image" src="/assets/home/family-together.webp" alt={t("togetherSceneAlt")} />
        </picture>
        <div className="home-panel-scrim" aria-hidden="true" />
        <div className="home-together-copy home-copy-light">
          <p className="home-kicker">{t("togetherKicker")}</p>
          <h2>{t("togetherTitleOriginal")}</h2>
          <p>{t("togetherBodyOriginal")}</p>
        </div>
        <ul className="home-values" aria-label={t("valuesAria")}>
          {["value1", "value2", "value3", "value4"].map((key, index) => (
            <li key={key}><span>0{index + 1}</span>{t(key)}</li>
          ))}
        </ul>
      </section>

      <section id="join" data-snap-section className="home-panel home-join-panel panel-center-light">
        <img className="home-panel-image" src="/assets/home/join-home.webp" alt={t("joinSceneAlt")} />
        <div className="home-panel-scrim" aria-hidden="true" />
        <div className="home-join-copy">
          <p className="home-kicker">{t("finalKicker")}</p>
          <h2>{t("finalTitle")}</h2>
          <p>{t("finalBody")}</p>
          <Link className="home-primary-action" href="/prelaunch">
            {t("finalAction")} <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <footer className="home-final-footer">
          <img src="/lumiq-logo.png" alt="LumiQ Studio" />
          <nav aria-label={common("primaryNavigation")}>
            <Link href="/story">{common("brandStory")}</Link>
            <Link href="/products">{common("products")}</Link>
            <Link href="/plans">{common("plans")}</Link>
            <Link href="/media">{common("mediaReviews")}</Link>
            <Link href="/faq">{common("faq")}</Link>
          </nav>
          <small>© 2026 LumiQ Studio</small>
        </footer>
      </section>
    </main>
  );
}
