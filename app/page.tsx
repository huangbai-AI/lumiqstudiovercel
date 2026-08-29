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
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useCallback, useRef} from "react";
import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";
import "./homepage.css";

type SectionId = "top" | "ola" | "tablet" | "nest-15" | "family" | "join";
const videoAnchorFrames = [0, 97, 195, 293] as const;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

function mapJourneyToVideo(progress: number) {
  const position = Math.min(1, Math.max(0, progress)) * 3;
  const segment = Math.min(2, Math.floor(position));
  const localProgress = position - segment;
  const from = videoAnchorFrames[segment];
  const to = videoAnchorFrames[segment + 1];

  return (from + (to - from) * localProgress) / videoAnchorFrames[3];
}

function usePearlVideoScroller() {
  const rootRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goToId = useCallback((id: SectionId) => {
    const section = document.getElementById(id);
    if (!section) return;

    section.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  useGSAP(() => {
    const root = rootRef.current;
    const journey = journeyRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!root || !journey || !stage || !video) return;

    const documentElement = document.documentElement;
    documentElement.classList.add("pearl-home-page");
    document.body.classList.add("pearl-home-page");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      root.classList.add("pearl-reduced-motion");
      return () => {
        root.classList.remove("pearl-reduced-motion");
        documentElement.classList.remove("pearl-home-page");
        document.body.classList.remove("pearl-home-page");
      };
    }

    documentElement.classList.add("pearl-scroll-video-active");

    const playhead = {progress: 0};
    let targetProgress = 0;
    let currentProgress = 0;
    let maxVideoTime = videoAnchorFrames[3] / 24;
    let animationFrame = 0;
    let objectUrl = "";
    let userReady = false;
    const abortController = new AbortController();
    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    gsap.to(playhead, {
      progress: 1,
      ease: "none",
      onUpdate: () => {
        targetProgress = mapJourneyToVideo(playhead.progress);
      },
      scrollTrigger: {
        trigger: journey,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
        pinSpacing: false,
        scrub: 0.32,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    gsap.to(root, {
      "--pearl-progress": 1,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
        snap: {
          snapTo: [0, 0.2, 0.4, 0.6, 0.8, 1],
          inertia: false,
          duration: {min: 0.18, max: 0.52},
          delay: 0.12,
          ease: "power2.inOut",
        },
      },
    });

    const renderVideoFrame = () => {
      if (video.readyState >= 1 && !video.seeking) {
        currentProgress += (targetProgress - currentProgress) * (isMobile ? 0.3 : 0.2);
        if (Math.abs(targetProgress - currentProgress) < 0.00035) {
          currentProgress = targetProgress;
        }

        const nextTime = currentProgress * maxVideoTime;
        const threshold = isMobile ? 1 / 24 : 0.01;
        if (Math.abs(video.currentTime - nextTime) > threshold) {
          video.currentTime = nextTime;
        }
      }
      animationFrame = requestAnimationFrame(renderVideoFrame);
    };

    const playAndPause = () => {
      const promise = video.play();
      if (promise) {
        promise.then(() => video.pause()).catch(() => undefined);
      }
    };

    const primeVideo = () => {
      if (userReady) return;
      userReady = true;
      playAndPause();
    };

    const onLoadedMetadata = () => {
      maxVideoTime = Math.max(0, video.duration - 1 / 24);
      currentProgress = targetProgress;
      video.currentTime = currentProgress * maxVideoTime;
      ScrollTrigger.refresh();
    };

    const onVideoReady = () => {
      stage.classList.add("is-video-ready");
      if (userReady) playAndPause();
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("loadeddata", onVideoReady, {once: true});
    window.addEventListener("pointerdown", primeVideo, {once: true, passive: true});
    window.addEventListener("touchstart", primeVideo, {once: true, passive: true});

    const source = isMobile
      ? "/assets/home-pearl/lumiq-scroll-world-720.mp4"
      : "/assets/home-pearl/lumiq-scroll-world-1080.mp4";

    fetch(source, {signal: abortController.signal})
      .then((response) => {
        if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
        return response.blob();
      })
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
        video.load();
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        root.classList.add("pearl-video-failed");
      });

    animationFrame = requestAnimationFrame(renderVideoFrame);

    return () => {
      abortController.abort();
      cancelAnimationFrame(animationFrame);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("loadeddata", onVideoReady);
      window.removeEventListener("pointerdown", primeVideo);
      window.removeEventListener("touchstart", primeVideo);
      video.removeAttribute("src");
      video.load();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      stage.classList.remove("is-video-ready");
      root.classList.remove("pearl-video-failed");
      documentElement.classList.remove(
        "pearl-home-page",
        "pearl-scroll-video-active",
      );
      document.body.classList.remove("pearl-home-page");
    };
  }, {scope: rootRef});

  return {rootRef, journeyRef, stageRef, videoRef, goToId};
}

function PearlVideoFloor({
  id,
  className,
  fallbackImage,
  children,
  priority = false,
}: {
  id: SectionId;
  className: string;
  fallbackImage: string;
  children: React.ReactNode;
  priority?: boolean;
}) {
  return (
    <section
      id={id}
      data-pearl-scene
      className={`pearl-panel pearl-video-floor ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <Image
        className="pearl-panel-bg pearl-video-floor-fallback"
        src={fallbackImage}
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

function PearlPanel({
  id,
  className,
  image,
  children,
  priority = false,
}: {
  id: SectionId;
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
  const {rootRef, journeyRef, stageRef, videoRef, goToId} =
    usePearlVideoScroller();

  const sceneLink =
    (id: SectionId) =>
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      goToId(id);
    };

  return (
    <main ref={rootRef} className="pearl-home" aria-label="LumiQ Home">
      <div className="pearl-progress" aria-hidden="true" />

      <div ref={journeyRef} className="pearl-video-journey">
        <div ref={stageRef} className="pearl-video-stage" aria-hidden="true">
          <Image
            className="pearl-video-poster"
            src="/assets/home-pearl/lumiq-scroll-world-poster.jpg"
            alt=""
            fill
            sizes="100vw"
            unoptimized
            priority
          />
          <video
            ref={videoRef}
            className="pearl-scroll-video"
            muted
            playsInline
            preload="none"
            tabIndex={-1}
          />
        </div>

        <div className="pearl-video-scenes">
          <PearlVideoFloor
            id="top"
            className="pearl-panel-hero"
            fallbackImage="/assets/home-pearl/home-products-bg.webp"
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
          </PearlVideoFloor>

          <PearlVideoFloor
            id="ola"
            className="pearl-panel-ola"
            fallbackImage="/assets/home-pearl/ola-bg.webp"
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
          </PearlVideoFloor>

          <PearlVideoFloor
            id="tablet"
            className="pearl-panel-tablet"
            fallbackImage="/assets/home-pearl/tablet-bg.webp"
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
          </PearlVideoFloor>

          <PearlVideoFloor
            id="nest-15"
            className="pearl-panel-nest"
            fallbackImage="/assets/home-pearl/nest-15-bg.webp"
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
          </PearlVideoFloor>
        </div>
      </div>

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
