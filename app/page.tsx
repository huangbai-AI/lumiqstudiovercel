"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";
import {useEffect, useRef} from "react";
import {Link} from "@/i18n/navigation";
import "./homepage.css";

function usePearlScroller() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const documentElement = document.documentElement;
    const scenes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-pearl-scene]"),
    );
    let animationFrame = 0;
    let updateFrame = 0;
    let locked = false;
    let releaseAt = 0;
    let wheelAmount = 0;
    let wheelTimer = 0;

    documentElement.classList.add("pearl-home-page");
    document.body.classList.add("pearl-home-page");

    const reducedMotion = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const currentScene = () =>
      Math.max(
        0,
        Math.min(
          scenes.length - 1,
          Math.round(window.scrollY / Math.max(1, window.innerHeight)),
        ),
      );

    const update = () => {
      updateFrame = 0;
      const viewport = Math.max(1, window.innerHeight);
      const page = window.scrollY / viewport;
      root.style.setProperty(
        "--pearl-progress",
        Math.min(1, page / Math.max(1, scenes.length - 1)).toFixed(4),
      );
      scenes.forEach((scene, index) => {
        const distance = Math.min(1, Math.abs(page - index));
        scene.style.setProperty("--scene-distance", distance.toFixed(4));
      });
    };

    const requestUpdate = () => {
      if (!updateFrame) updateFrame = requestAnimationFrame(update);
    };

    const goToScene = (nextIndex: number) => {
      if (locked || scenes.length === 0) return;
      const index = Math.max(0, Math.min(scenes.length - 1, nextIndex));
      const target = scenes[index].offsetTop;
      const start = window.scrollY;
      if (Math.abs(target - start) < 2) return;

      locked = true;
      root.classList.add("is-gliding");
      const startedAt = performance.now();
      const duration = reducedMotion() ? 1 : 820;

      const animate = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        window.scrollTo(0, start + (target - start) * eased);
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          window.scrollTo(0, target);
          animationFrame = 0;
          locked = false;
          releaseAt = performance.now() + 120;
          root.classList.remove("is-gliding");
        }
      };

      animationFrame = requestAnimationFrame(animate);
    };

    const onWheel = (event: WheelEvent) => {
      const lastIndex = scenes.length - 1;
      const lastTop = scenes[lastIndex]?.offsetTop ?? 0;
      const index = currentScene();

      if (
        (index === lastIndex && event.deltaY > 0) ||
        (window.scrollY > lastTop + 2 && event.deltaY !== 0)
      ) {
        return;
      }

      event.preventDefault();
      if (locked || performance.now() < releaseAt) return;
      wheelAmount += event.deltaY;
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => {
        wheelAmount = 0;
      }, 180);
      if (Math.abs(wheelAmount) < 24) return;
      const direction = wheelAmount > 0 ? 1 : -1;
      wheelAmount = 0;
      goToScene(index + direction);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const index = currentScene();
      const lastIndex = scenes.length - 1;
      const lastTop = scenes[lastIndex]?.offsetTop ?? 0;

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        if (index === lastIndex || window.scrollY > lastTop + 2) return;
        event.preventDefault();
        goToScene(index + 1);
      } else if (["ArrowUp", "PageUp"].includes(event.key)) {
        if (window.scrollY > lastTop + 2) return;
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
      documentElement.classList.remove("pearl-home-page");
      document.body.classList.remove("pearl-home-page");
      root.classList.remove("is-gliding");
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (updateFrame) cancelAnimationFrame(updateFrame);
      if (wheelTimer) window.clearTimeout(wheelTimer);
    };
  }, []);

  return rootRef;
}

export default function Home() {
  const t = useTranslations("Home");
  const prelaunch = useTranslations("Prelaunch");
  const rootRef = usePearlScroller();

  return (
    <main ref={rootRef} className="pearl-home">
      <div className="pearl-progress" aria-hidden="true" />

      <section
        id="top"
        data-pearl-scene
        className="pearl-scene pearl-hero"
        aria-labelledby="pearl-hero-title"
      >
        <Image
          className="pearl-background pearl-hero-poster"
          src="/assets/home-pearl/hero.webp"
          alt=""
          fill
          sizes="100vw"
          priority
        />
        <video
          className="pearl-background pearl-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/home-pearl/hero.webp"
          aria-hidden="true"
        >
          <source
            src="/assets/home-pearl/lumiq-pearl-hero-h3-2k.mp4"
            type="video/mp4"
          />
        </video>
        <div className="pearl-hero-shade" aria-hidden="true" />
        <div className="pearl-hero-copy">
          <p className="pearl-kicker">Lumiq Studio</p>
          <h1 id="pearl-hero-title">
            {t("hero1")}
            <br />
            {t("hero2")}
            <br />
            {t("hero3")}
          </h1>
          <p>{t("heroBody")}</p>
        </div>
        <Link
          href="/story"
          className="pearl-discover"
          aria-label={t("storyEyebrow")}
        >
          <span className="pearl-discover-icon" aria-hidden="true">▶</span>
          <span>{t("discoverLumiq")}</span>
        </Link>
        <a className="pearl-next" href="#ola" aria-label={t("browseAria")}>
          <span />
        </a>
      </section>

      <section
        id="ola"
        data-pearl-scene
        className="pearl-scene pearl-product-scene pearl-ola"
        aria-labelledby="pearl-ola-title"
      >
        <Image
          className="pearl-background"
          src="/assets/home-pearl/ola.webp"
          alt=""
          fill
          sizes="100vw"
          priority
        />
        <div className="pearl-product-copy pearl-copy-left">
          <p className="pearl-kicker">{t("olaKicker")}</p>
          <h2 id="pearl-ola-title">Lumiq Ola</h2>
          <p>{t("product1Description")}</p>
          <Link className="pearl-button" href="/products/ola">
            {t("exploreProduct", {name: "Lumiq Ola"})}
            <span aria-hidden="true">↗</span>
          </Link>
          <div className="pearl-companion-note">
            <Image
              src="/assets/web/lumiq-ola-go.webp"
              alt="Lumiq Ola Go"
              width={320}
              height={320}
            />
            <div>
              <strong>Lumiq Ola Go</strong>
              <p>{t("product2Description")}</p>
              <Link href="/products/ola-go">
                {t("exploreProduct", {name: "Ola Go"})}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="tablet"
        data-pearl-scene
        className="pearl-scene pearl-product-scene pearl-tablet"
        aria-labelledby="pearl-tablet-title"
      >
        <Image
          className="pearl-background"
          src="/assets/home-pearl/tablet.webp"
          alt=""
          fill
          sizes="100vw"
        />
        <div className="pearl-product-copy pearl-copy-right">
          <p className="pearl-kicker">{t("tabletKicker")}</p>
          <h2 id="pearl-tablet-title">Lumiq Tablet</h2>
          <p>{t("product3Description")}</p>
          <Link className="pearl-button" href="/products/tablet">
            {t("exploreProduct", {name: "Lumiq Tablet"})}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section
        id="nest"
        data-pearl-scene
        className="pearl-scene pearl-product-scene pearl-nest"
        aria-labelledby="pearl-nest-title"
      >
        <Image
          className="pearl-background"
          src="/assets/home-pearl/pearl-field.webp"
          alt=""
          fill
          sizes="100vw"
        />
        <div className="pearl-product-copy pearl-copy-left">
          <p className="pearl-kicker">{t("nestKicker")}</p>
          <h2 id="pearl-nest-title">Lumiq Nest 15</h2>
          <p>{t("product5Description")}</p>
          <Link className="pearl-button" href="/products/nest">
            {t("exploreProduct", {name: "Lumiq Nest 15"})}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <Link
          className="pearl-nest-visual"
          href="/products/nest"
          aria-label={t("exploreProduct", {name: "Lumiq Nest 15"})}
        >
          <span className="pearl-orbit pearl-orbit-one" aria-hidden="true" />
          <span className="pearl-orbit pearl-orbit-two" aria-hidden="true" />
          <Image
            src="/assets/web/nest15-oak-angle.webp"
            alt="Lumiq Nest 15"
            width={1320}
            height={1320}
            sizes="(max-width: 767px) 92vw, 58vw"
          />
        </Link>
      </section>

      <section
        id="family"
        data-pearl-scene
        className="pearl-scene pearl-family"
        aria-labelledby="pearl-family-title"
      >
        <Image
          className="pearl-background"
          src="/assets/home-pearl/pearl-field.webp"
          alt=""
          fill
          sizes="100vw"
        />
        <div className="pearl-family-image">
          <Image
            src="/assets/story/lumiq-story-family-v3.webp"
            alt={t("familyAlt")}
            fill
            sizes="(max-width: 767px) 92vw, 64vw"
          />
        </div>
        <div className="pearl-family-copy">
          <p className="pearl-kicker">{t("storyEyebrow")}</p>
          <h2 id="pearl-family-title">{t("storyTitle")}</h2>
          <p>{t("storyBody")}</p>
          <blockquote>{t("storyQuote")}</blockquote>
          <Link className="pearl-button" href="/story">
            {t("storyEyebrow")}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section
        id="join"
        data-pearl-scene
        className="pearl-scene pearl-join"
        aria-labelledby="pearl-join-title"
      >
        <Image
          className="pearl-background"
          src="/assets/home-pearl/pearl-field.webp"
          alt=""
          fill
          sizes="100vw"
        />
        <div className="pearl-join-mark" aria-hidden="true">LUMIQ</div>
        <div className="pearl-join-products" aria-hidden="true">
          <Image
            className="pearl-join-ola"
            src="/assets/web/ola-hero-front.webp"
            alt=""
            width={780}
            height={780}
            sizes="38vw"
          />
          <Image
            className="pearl-join-tablet"
            src="/assets/web/lumiq-tablet.webp"
            alt=""
            width={760}
            height={760}
            sizes="36vw"
          />
        </div>
        <div className="pearl-join-copy">
          <p className="pearl-kicker">{prelaunch("eyebrow")}</p>
          <h2 id="pearl-join-title">{prelaunch("title")}</h2>
          <p>{prelaunch("intro")}</p>
          <Link className="pearl-button pearl-button-solid" href="/prelaunch">
            {prelaunch("submit")}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
