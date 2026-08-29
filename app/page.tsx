"use client";

import Image from "next/image";
import {
  ArrowRight,
  BellRing,
  BookOpen,
  CalendarDays,
  CloudSun,
  HeartHandshake,
  Home as HomeIcon,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  TabletSmartphone,
  UserRound,
  UsersRound,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import {useCallback, useEffect, useRef} from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import "./homepage.css";

const sectionIds = ["top", "ola", "tablet", "nest-15", "family", "join"] as const;

function usePearlScroller() {
  const rootRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const animationFrameRef = useRef(0);
  const updateFrameRef = useRef(0);
  const wheelAmountRef = useRef(0);
  const wheelTimerRef = useRef(0);
  const lockedRef = useRef(false);
  const releaseAtRef = useRef(0);

  const goToScene = useCallback((nextIndex: number, instant = false) => {
    const root = rootRef.current;
    if (!root || lockedRef.current) return;

    const scenes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-pearl-scene]"),
    );
    if (!scenes.length) return;

    const index = Math.max(0, Math.min(scenes.length - 1, nextIndex));
    const target = scenes[index].offsetTop;
    const start = window.scrollY;
    activeIndexRef.current = index;

    if (Math.abs(target - start) < 2) {
      window.scrollTo(0, target);
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = reducedMotion || instant ? 1 : 940;
    const startedAt = performance.now();

    lockedRef.current = true;
    document.documentElement.classList.add("pearl-is-gliding");

    const animate = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      window.scrollTo(0, start + (target - start) * eased);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        window.scrollTo(0, target);
        animationFrameRef.current = 0;
        lockedRef.current = false;
        releaseAtRef.current = performance.now() + 140;
        document.documentElement.classList.remove("pearl-is-gliding");
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const goToId = useCallback(
    (id: (typeof sectionIds)[number]) => {
      const index = sectionIds.indexOf(id);
      if (index >= 0) goToScene(index);
    },
    [goToScene],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const documentElement = document.documentElement;
    const scenes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-pearl-scene]"),
    );

    documentElement.classList.add("pearl-home-page");
    document.body.classList.add("pearl-home-page");

    const currentScene = () =>
      Math.max(
        0,
        Math.min(
          scenes.length - 1,
          Math.round(window.scrollY / Math.max(1, window.innerHeight)),
        ),
      );

    const update = () => {
      updateFrameRef.current = 0;
      const viewport = Math.max(1, window.innerHeight);
      const page = window.scrollY / viewport;
      activeIndexRef.current = currentScene();
      root.style.setProperty(
        "--pearl-progress",
        Math.min(1, page / Math.max(1, scenes.length - 1)).toFixed(4),
      );
    };

    const requestUpdate = () => {
      if (!updateFrameRef.current) {
        updateFrameRef.current = requestAnimationFrame(update);
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !window.matchMedia("(pointer: fine)").matches
      ) {
        return;
      }

      const lastIndex = scenes.length - 1;
      const lastTop = scenes[lastIndex]?.offsetTop ?? 0;
      const index = currentScene();

      if (
        (index === lastIndex && event.deltaY > 0) ||
        window.scrollY > lastTop + 2
      ) {
        return;
      }

      event.preventDefault();
      if (lockedRef.current || performance.now() < releaseAtRef.current) return;

      wheelAmountRef.current += event.deltaY;
      window.clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = window.setTimeout(() => {
        wheelAmountRef.current = 0;
      }, 190);

      if (Math.abs(wheelAmountRef.current) < 26) return;
      const direction = wheelAmountRef.current > 0 ? 1 : -1;
      wheelAmountRef.current = 0;
      goToScene(index + direction);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        (event.target instanceof Element &&
          event.target.closest("a, button, input, textarea, select"))
      ) {
        return;
      }

      const index = currentScene();
      const lastIndex = scenes.length - 1;
      const lastTop = scenes[lastIndex]?.offsetTop ?? 0;

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        if (index === lastIndex || window.scrollY > lastTop + 2) {
          event.preventDefault();
          window.scrollTo({
            top: lastTop + window.innerHeight,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "auto"
              : "smooth",
          });
          return;
        }
        event.preventDefault();
        goToScene(index + 1);
      } else if (["ArrowUp", "PageUp"].includes(event.key)) {
        if (window.scrollY > lastTop + 2) {
          event.preventDefault();
          goToScene(lastIndex);
          return;
        }
        event.preventDefault();
        goToScene(index - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goToScene(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToScene(lastIndex);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, {passive: true});
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("wheel", onWheel, {passive: false});
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      documentElement.classList.remove("pearl-home-page", "pearl-is-gliding");
      document.body.classList.remove("pearl-home-page");
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (updateFrameRef.current) cancelAnimationFrame(updateFrameRef.current);
      window.clearTimeout(wheelTimerRef.current);
    };
  }, [goToScene]);

  return {rootRef, goToId};
}

function PearlPanel({
  id,
  className,
  image,
  children,
  priority = false,
}: {
  id: (typeof sectionIds)[number];
  className: string;
  image: string;
  children: React.ReactNode;
  priority?: boolean;
}) {
  return (
    <section
      id={id}
      data-pearl-scene
      className={`pearl-panel ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <Image
        className="pearl-panel-bg"
        src={image}
        alt=""
        fill
        sizes="100vw"
        unoptimized
        priority={priority}
      />
      {children}
    </section>
  );
}

function FeatureList({
  items,
}: {
  items: {label: string; icon: LucideIcon}[];
}) {
  return (
    <ul className="pearl-feature-list">
      {items.map(({label, icon: Icon}) => (
        <li key={label}>
          <span className="pearl-feature-icon" aria-hidden="true">
            <Icon size={17} strokeWidth={1.8} />
          </span>
          <strong>{label}</strong>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const t = useTranslations("Home");
  const common = useTranslations("Common");
  const footer = useTranslations("Footer");
  const {rootRef, goToId} = usePearlScroller();

  const sceneLink =
    (id: (typeof sectionIds)[number]) =>
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      goToId(id);
    };

  return (
    <main ref={rootRef} className="pearl-home" aria-label="LumiQ Home">
      <div className="pearl-progress" aria-hidden="true" />

      <PearlPanel
        id="top"
        className="pearl-panel-hero"
        image="/assets/home-pearl/home-products-bg.webp"
        priority
      >
        <div className="pearl-copy pearl-copy-hero">
          <p className="pearl-overline">LumiQ Studio</p>
          <h1 id="top-title">
            {t("panoramaHero1")}
            <br />
            {t("panoramaHero2")}
          </h1>
          <span className="pearl-rule" aria-hidden="true" />
          <p className="pearl-lead">{t("panoramaHeroBody")}</p>
        </div>
        <Link className="pearl-hero-discover" href="/story#brand-film">
          <span aria-hidden="true">
            <Play size={17} fill="currentColor" />
          </span>
          {t("discoverLumiq")}
        </Link>
      </PearlPanel>

      <PearlPanel
        id="ola"
        className="pearl-panel-ola"
        image="/assets/home-pearl/ola-bg.webp"
      >
        <div className="pearl-copy pearl-copy-left">
          <p className="pearl-overline">{t("olaKicker")}</p>
          <h2 id="ola-title">{t("panoramaOlaTitle")}</h2>
          <p className="pearl-subtitle">{t("panoramaOlaSubtitle")}</p>
          <FeatureList
            items={[
              {label: t("panoramaOlaFeature1"), icon: UserRound},
              {label: t("panoramaOlaFeature2"), icon: Sparkles},
              {label: t("panoramaOlaFeature3"), icon: MessageCircle},
              {label: t("panoramaOlaFeature4"), icon: TabletSmartphone},
            ]}
          />
          <div className="pearl-actions">
            <Link className="pearl-primary" href="/products/ola">
              {t("panoramaOlaCta")} <ArrowRight size={16} />
            </Link>
            <a className="pearl-next" href="#tablet" onClick={sceneLink("tablet")}>
              {t("panoramaNextTablet")}
            </a>
          </div>
        </div>
      </PearlPanel>

      <PearlPanel
        id="tablet"
        className="pearl-panel-tablet"
        image="/assets/home-pearl/tablet-bg.webp"
      >
        <div className="pearl-copy pearl-copy-right">
          <p className="pearl-overline">{t("tabletKicker")}</p>
          <h2 id="tablet-title">{t("panoramaTabletTitle")}</h2>
          <p className="pearl-subtitle">{t("panoramaTabletSubtitle")}</p>
          <FeatureList
            items={[
              {label: t("panoramaTabletFeature1"), icon: BookOpen},
              {label: t("panoramaTabletFeature2"), icon: WandSparkles},
              {label: t("panoramaTabletFeature3"), icon: ShieldCheck},
              {label: t("panoramaTabletFeature4"), icon: BellRing},
            ]}
          />
          <div className="pearl-actions">
            <Link className="pearl-primary" href="/products/tablet">
              {t("panoramaTabletCta")} <ArrowRight size={16} />
            </Link>
            <a className="pearl-next" href="#nest-15" onClick={sceneLink("nest-15")}>
              {t("panoramaNextNest")}
            </a>
          </div>
        </div>
      </PearlPanel>

      <PearlPanel
        id="nest-15"
        className="pearl-panel-nest"
        image="/assets/home-pearl/nest-15-bg.webp"
      >
        <div className="pearl-copy pearl-copy-left">
          <p className="pearl-overline">{t("nestKicker")}</p>
          <h2 id="nest-15-title">{t("panoramaNestTitle")}</h2>
          <p className="pearl-subtitle">{t("panoramaNestSubtitle")}</p>
          <FeatureList
            items={[
              {label: t("panoramaNestFeature1"), icon: CalendarDays},
              {label: t("panoramaNestFeature2"), icon: CloudSun},
              {label: t("panoramaNestFeature3"), icon: HomeIcon},
            ]}
          />
          <div className="pearl-actions">
            <Link className="pearl-primary" href="/prelaunch">
              {t("panoramaNestCta")} <ArrowRight size={16} />
            </Link>
            <a className="pearl-next" href="#family" onClick={sceneLink("family")}>
              {t("panoramaNextTogether")}
            </a>
          </div>
        </div>
      </PearlPanel>

      <PearlPanel
        id="family"
        className="pearl-panel-family"
        image="/assets/home-pearl/family-bg.webp"
      >
        <div className="pearl-copy pearl-copy-left pearl-family-copy">
          <p className="pearl-overline">{t("panoramaFamilyKicker")}</p>
          <h2 id="family-title">{t("panoramaFamilyTitle")}</h2>
          <p className="pearl-lead">{t("storyBody")}</p>
          <FeatureList
            items={[
              {label: t("panoramaFamilyWord1"), icon: UsersRound},
              {label: t("panoramaFamilyWord2"), icon: HeartHandshake},
              {label: t("panoramaFamilyWord3"), icon: Sparkles},
            ]}
          />
          <div className="pearl-actions">
            <Link className="pearl-primary" href="/story">
              {t("panoramaFamilyCta")} <ArrowRight size={16} />
            </Link>
            <a className="pearl-next" href="#join" onClick={sceneLink("join")}>
              {t("panoramaContinue")}
            </a>
          </div>
        </div>
      </PearlPanel>

      <PearlPanel
        id="join"
        className="pearl-panel-join"
        image="/assets/home-pearl/join-bg.webp"
      >
        <div className="pearl-join-copy">
          <p className="pearl-overline">{t("panoramaJoinKicker")}</p>
          <h2 id="join-title">{t("panoramaJoinTitle")}</h2>
          <p>{t("panoramaJoinBody")}</p>
          <Link className="pearl-primary pearl-join-action" href="/prelaunch">
            {t("panoramaJoinCta")} <ArrowRight size={17} />
          </Link>
        </div>
        <div className="pearl-home-foot">
          <Image
            src="/assets/brand/lumiq-logo-transparent-dark.png"
            alt="LumiQ Studio"
            width={800}
            height={300}
          />
          <nav aria-label={footer("company")}>
            <Link href="/story">{common("brandStory")}</Link>
            <Link href="/products">{common("products")}</Link>
            <Link href="/faq">{common("faq")}</Link>
          </nav>
          <span>{footer("rights")}</span>
        </div>
      </PearlPanel>
    </main>
  );
}
