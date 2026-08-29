"use client";

import {Link} from "@/i18n/navigation";
import {useTranslations} from "next-intl";
import {useEffect, useRef, useState} from "react";
import "./homepage.css";

const chapterIds = ["chapters", "ola", "tablet", "nest-15", "together", "join-lumiq"] as const;

function useChapterNavigation() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const html = document.documentElement;
    const body = document.body;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const chapters = chapterIds
      .map((id) => document.getElementById(id))
      .filter((chapter): chapter is HTMLElement => Boolean(chapter));

    html.classList.add("chapters-scroll");
    body.classList.add("chapters-scroll");

    const nearestChapter = () => {
      const y = window.scrollY;
      let nearest = 0;
      let distance = Number.POSITIVE_INFINITY;
      chapters.forEach((chapter, index) => {
        const nextDistance = Math.abs(chapter.offsetTop - y);
        if (nextDistance < distance) {
          distance = nextDistance;
          nearest = index;
        }
      });
      return nearest;
    };

    let frame = 0;
    const updateActiveChapter = () => {
      frame = 0;
      setActiveChapter(nearestChapter());
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveChapter);
    };

    const scrollToChapter = (index: number) => {
      const chapter = chapters[Math.max(0, Math.min(chapters.length - 1, index))];
      if (!chapter) return;
      window.scrollTo({
        top: chapter.offsetTop,
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a, [contenteditable='true']")) return;

      const current = nearestChapter();
      const lastTop = chapters.at(-1)?.offsetTop ?? 0;
      const belowChapters = window.scrollY > lastTop + window.innerHeight * 0.15;

      if (["ArrowDown", "PageDown", " "].includes(event.key) && current < chapters.length - 1) {
        event.preventDefault();
        scrollToChapter(current + 1);
      } else if (["ArrowUp", "PageUp"].includes(event.key) && !belowChapters && current > 0) {
        event.preventDefault();
        scrollToChapter(current - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        scrollToChapter(0);
      } else if (event.key === "End" && !belowChapters) {
        event.preventDefault();
        scrollToChapter(chapters.length - 1);
      }
    };

    const syncHash = () => {
      const id = window.location.hash.slice(1);
      const index = chapterIds.indexOf(id as (typeof chapterIds)[number]);
      if (index >= 0) window.requestAnimationFrame(() => scrollToChapter(index));
    };

    window.addEventListener("scroll", requestUpdate, {passive: true});
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("hashchange", syncHash);
    syncHash();
    updateActiveChapter();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("hashchange", syncHash);
      html.classList.remove("chapters-scroll");
      body.classList.remove("chapters-scroll");
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return {rootRef, activeChapter};
}

export default function Home() {
  const t = useTranslations("Home");
  const {rootRef, activeChapter} = useChapterNavigation();

  const rail = [
    {id: "chapters", label: t("chapterRailIntro")},
    {id: "ola", label: "Ola + Go"},
    {id: "tablet", label: "Tablet"},
    {id: "nest-15", label: "Nest 15"},
    {id: "together", label: t("togetherTitle")},
    {id: "join-lumiq", label: t("joinTitle")},
  ];

  return (
    <main ref={rootRef} className="chapters-home">
      <nav className="chapter-rail" aria-label={t("chapterRailAria")}>
        {rail.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeChapter === index ? "is-active" : ""}
            aria-label={item.label}
            aria-current={activeChapter === index ? "true" : undefined}
          >
            <span>{String(index).padStart(2, "0")}</span>
            <b>{item.label}</b>
          </a>
        ))}
      </nav>

      <section id="chapters" data-chapter className="light-chapter light-chapter--hero">
        <div className="chapter-veil chapter-veil--left" />
        <div className="hero-content">
          <p className="chapter-eyebrow">Lumiq Studio · {t("heroEyebrow")}</p>
          <h1>{t("chapterTitle")}</h1>
          <p className="hero-lede">{t("chapterHeroBody")}</p>
          <a className="chapter-button chapter-button--navy" href="#ola">
            {t("discoverProducts")} <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="hero-chapter-links" aria-label={t("productsAria")}>
          <a href="#ola"><span>01</span><strong>Ola + Go</strong></a>
          <a href="#tablet"><span>02</span><strong>Tablet</strong></a>
          <a href="#nest-15"><span>03</span><strong>Nest 15</strong></a>
        </div>
        <a className="scroll-cue" href="#ola" aria-label={t("scrollNext")}>
          <span />
        </a>
      </section>

      <section id="ola" data-chapter className="light-chapter light-chapter--ola">
        <div className="chapter-veil chapter-veil--left" />
        <div className="chapter-copy chapter-copy--left">
          <p className="chapter-number">01</p>
          <p className="chapter-eyebrow">{t("olaEyebrow")}</p>
          <h2>Ola <em>+</em> Go</h2>
          <p>{t("olaBody")}</p>
          <div className="chapter-actions">
            <Link className="chapter-button" href="/products/ola">{t("exploreOla")} <span aria-hidden="true">→</span></Link>
            <Link className="chapter-text-link" href="/products/ola-go">{t("exploreOlaGo")}</Link>
          </div>
        </div>
      </section>

      <section id="tablet" data-chapter className="light-chapter light-chapter--tablet">
        <div className="chapter-veil chapter-veil--right" />
        <div className="chapter-copy chapter-copy--right">
          <p className="chapter-number">02</p>
          <p className="chapter-eyebrow">{t("tabletEyebrow")}</p>
          <h2>Lumiq Tablet</h2>
          <p>{t("tabletBody")}</p>
          <Link className="chapter-button" href="/products/tablet">{t("exploreTablet")} <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section id="nest-15" data-chapter className="light-chapter light-chapter--nest">
        <div className="chapter-veil chapter-veil--left" />
        <div className="chapter-copy chapter-copy--left">
          <p className="chapter-number">03</p>
          <p className="chapter-eyebrow">{t("nestEyebrow")}</p>
          <h2>Lumiq Nest 15</h2>
          <p>{t("nestBody")}</p>
          <Link className="chapter-button" href="/products/nest">{t("exploreNest")} <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section id="together" data-chapter className="light-chapter light-chapter--family">
        <div className="chapter-veil chapter-veil--left" />
        <div className="chapter-copy chapter-copy--left chapter-copy--family">
          <p className="chapter-number">04</p>
          <p className="chapter-eyebrow">{t("togetherEyebrow")}</p>
          <h2>{t("togetherTitle")}</h2>
          <p>{t("togetherBody")}</p>
          <Link className="chapter-button" href="/story">{t("readStory")} <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section id="join-lumiq" data-chapter className="light-chapter light-chapter--join">
        <div className="join-content">
          <p className="chapter-number">05</p>
          <p className="chapter-eyebrow">{t("joinEyebrow")}</p>
          <h2>{t("joinTitle")}</h2>
          <p>{t("joinBody")}</p>
          <Link className="chapter-button chapter-button--orange" href="/prelaunch">
            {t("joinButton")} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
