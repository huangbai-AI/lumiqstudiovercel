"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PRODUCT_BY_ID } from "@/lib/products";
import "./homepage.css";

const panelIds = ["home", "ola", "tablet", "nest", "together", "join"] as const;

function useSnapNavigation() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const panels = panelIds
      .map((id) => root.querySelector<HTMLElement>(`#${id}`))
      .filter((panel): panel is HTMLElement => Boolean(panel));
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let locked = false;
    let releaseTimer = 0;

    const nearestIndex = () => {
      const marker = window.scrollY + window.innerHeight * 0.42;
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      panels.forEach((panel, index) => {
        const distance = Math.abs(panel.offsetTop - marker);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });
      return bestIndex;
    };

    const goTo = (index: number) => {
      const target = panels[Math.max(0, Math.min(panels.length - 1, index))];
      if (!target || locked) return;
      locked = true;
      target.scrollIntoView({
        block: "start",
        behavior: reducedMotion ? "auto" : "smooth",
      });
      history.replaceState(null, "", `#${target.id}`);
      window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(
        () => {
          locked = false;
        },
        reducedMotion ? 80 : 760,
      );
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 14 || event.ctrlKey) return;
      const current = nearestIndex();
      const afterPanels =
        window.scrollY > panels[panels.length - 1].offsetTop + 24;
      if ((event.deltaY > 0 && current === panels.length - 1) || afterPanels) {
        return;
      }
      event.preventDefault();
      if (!locked) goTo(current + (event.deltaY > 0 ? 1 : -1));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, button, [contenteditable]")) {
        return;
      }

      const current = nearestIndex();
      const forward =
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        (event.key === " " && !event.shiftKey);
      const backward =
        event.key === "ArrowUp" ||
        event.key === "PageUp" ||
        (event.key === " " && event.shiftKey);

      if (forward && current < panels.length - 1) {
        event.preventDefault();
        goTo(current + 1);
      } else if (backward) {
        event.preventDefault();
        goTo(Math.max(0, current - 1));
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(panels.length - 1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(releaseTimer);
    };
  }, []);

  return rootRef;
}

type ProductPanelProps = {
  id: "ola" | "tablet" | "nest";
  align: "left" | "right";
  image: string;
  imagePosition: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  action: string;
  alt: string;
};

function ProductPanel({ id, align, image, imagePosition, eyebrow, title, body, href, action, alt }: ProductPanelProps) {
  return (
    <section id={id} className={`warm-panel product-panel panel-${align}`} data-panel>
      <Image className="panel-background" src={image} alt={alt} fill sizes="100vw" style={{ objectPosition: imagePosition }} />
      <div className="panel-scrim" aria-hidden="true" />
      <div className="warm-shell panel-inner">
        <div className="panel-copy">
          <p className="warm-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="panel-body">{body}</p>
          <Link className="warm-link" href={href}>
            <span>{action}</span>
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const t = useTranslations("Home");
  const rootRef = useSnapNavigation();
  const ola = PRODUCT_BY_ID.ola;
  const olaGo = PRODUCT_BY_ID["ola-go"];
  const tablet = PRODUCT_BY_ID.tablet;
  const nest = PRODUCT_BY_ID.nest;

  return (
    <main ref={rootRef} className="warm-home">
      <nav className="panel-index" aria-label={t("sectionNavAria")}>
        {panelIds.map((id, index) => (
          <a key={id} href={`#${id}`} aria-label={`${index + 1}. ${id}`} />
        ))}
      </nav>

      <section id="home" className="warm-panel warm-hero" data-panel>
        <div className="warm-shell hero-layout">
          <div className="hero-copy">
            <p className="warm-eyebrow">{t("familyEyebrow")}</p>
            <h1><span>{t("hero1")}</span><span>{t("hero2")}</span><span>{t("hero3")}</span></h1>
            <p className="hero-body">{t("heroBody")}</p>
            <a className="warm-link hero-link" href="#ola">
              <span>{t("heroCta")}</span>
              <ChevronDown aria-hidden="true" size={19} strokeWidth={1.8} />
            </a>
          </div>

          <div className="hero-products" aria-label={t("productsAria")}>
            <Link className="hero-product hero-product-tablet" href={tablet.href}>
              <Image src={tablet.image} alt={tablet.name} fill priority sizes="(max-width: 700px) 39vw, 22vw" />
              <span>{tablet.name}</span>
            </Link>
            <Link className="hero-product hero-product-ola" href={ola.href}>
              <Image src={ola.image} alt={ola.name} fill priority sizes="(max-width: 700px) 38vw, 18vw" />
              <span>{ola.name}</span>
            </Link>
            <Link className="hero-product hero-product-nest" href={nest.href}>
              <Image src={nest.image} alt={nest.name} fill priority sizes="(max-width: 700px) 43vw, 23vw" />
              <span>{nest.name}</span>
            </Link>
            <Link className="hero-product hero-product-go" href={olaGo.href}>
              <Image src={olaGo.image} alt={olaGo.name} fill priority sizes="(max-width: 700px) 15vw, 8vw" />
              <span>{olaGo.name}</span>
            </Link>
          </div>
        </div>
      </section>

      <ProductPanel id="ola" align="left" image="/assets/ola-detail/generated/ola-family-kitchen-v2.png" imagePosition="center center" eyebrow={t("olaEyebrow")} title={ola.name} body={t("product1Description")} href={ola.href} action={t("exploreProduct", { name: ola.shortName })} alt={t("olaSceneAlt")} />
      <ProductPanel id="tablet" align="right" image="/assets/tablet-detail/generated/tablet-active-story-time-v2.png" imagePosition="center center" eyebrow={t("tabletEyebrow")} title={tablet.name} body={t("product3Description")} href={tablet.href} action={t("exploreProduct", { name: tablet.shortName })} alt={t("tabletSceneAlt")} />
      <ProductPanel id="nest" align="right" image="/assets/nest-detail/generated/nest-evening-home-v2.png" imagePosition="center center" eyebrow={t("nestEyebrow")} title={nest.name} body={t("product5Description")} href={nest.href} action={t("exploreProduct", { name: nest.shortName })} alt={t("nestSceneAlt")} />

      <section id="together" className="warm-panel family-panel" data-panel>
        <Image className="panel-background" src="/assets/story/lumiq-story-family-v3.webp" alt={t("togetherSceneAlt")} fill sizes="100vw" style={{ objectPosition: "center center" }} />
        <div className="family-scrim" aria-hidden="true" />
        <div className="warm-shell family-inner">
          <div className="family-copy">
            <p className="warm-eyebrow">{t("togetherEyebrow")}</p>
            <h2>{t("togetherTitle")}</h2>
            <p>{t("togetherBody")}</p>
          </div>
        </div>
      </section>

      <section id="join" className="warm-panel join-panel" data-panel>
        <Image className="panel-background" src="/assets/story/lumiq-story-triptych-16x9.jpg" alt={t("joinSceneAlt")} fill sizes="100vw" style={{ objectPosition: "center center" }} />
        <div className="join-scrim" aria-hidden="true" />
        <div className="join-card">
          <p className="warm-eyebrow">{t("joinEyebrow")}</p>
          <h2>{t("joinTitle")}</h2>
          <p>{t("joinBody")}</p>
          <Link className="join-action" href="/prelaunch">
            <span>{t("joinCta")}</span>
            <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.8} />
          </Link>
        </div>
      </section>
    </main>
  );
}
