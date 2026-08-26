"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PlanCards from "@/components/HomePlanCards";
import { Link, useRouter } from "@/i18n/navigation";
import { PRODUCT_BY_ID } from "@/lib/products";
import DraftNotice from "@/components/DraftNotice";
import "./homepage.css";

const products = [
  {
    ...PRODUCT_BY_ID.ola,
    id: "product-ola",
  },
  {
    ...PRODUCT_BY_ID["ola-go"],
    id: "product-ola-go",
  },
  {
    ...PRODUCT_BY_ID.tablet,
    id: "product-tablet",
  },
  {
    ...PRODUCT_BY_ID.print,
    id: "product-print",
  },
  {
    ...PRODUCT_BY_ID.nest,
    id: "product-nest",
  },
];

function usePageScroller() {
  const rootRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.documentElement.classList.add("parallax-page");
    document.body.classList.add("parallax-page");

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-scene]"),
    );
    let frame = 0;
    let animationFrame = 0;
    let productFrame = 0;
    let locked = false;
    let releaseAt = 0;
    let returnLandingTimer = 0;
    let touchStart = 0;
    let productProgress = window.scrollY >= window.innerHeight * 0.5 ? 1 : 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const renderProduct = (progress: number) => {
      productProgress = clamp(progress);
      root.style.setProperty("--ola-travel", productProgress.toFixed(4));
      root.style.setProperty(
        "--ola-opacity",
        (1 - clamp((productProgress - 0.86) / 0.14)).toFixed(4),
      );
    };

    renderProduct(productProgress);
    router.prefetch("/products/ola");
    router.prefetch("/products/ola-go");
    router.prefetch("/products/tablet");
    router.prefetch("/products/print");
    router.prefetch("/products/nest");

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const page = window.scrollY / Math.max(1, viewport);

      sections.forEach((section, index) => {
        const progress = Math.min(
          1,
          Math.max(0, index === 0 ? page : page - index + 1),
        );
        const enter = Math.min(1, Math.max(0, page - index + 1));
        const exit = Math.min(1, Math.max(0, page - index));
        section.style.setProperty("--p", progress.toFixed(4));
        section.style.setProperty("--scene-enter", enter.toFixed(4));
        section.style.setProperty("--scene-exit", exit.toFixed(4));
      });

      root.style.setProperty("--page", page.toFixed(4));
      root.style.setProperty(
        "--hero-mix",
        Math.min(1, Math.max(0, page)).toFixed(4),
      );
      root.style.setProperty(
        "--site-progress",
        Math.min(1, page / Math.max(1, sections.length - 1)).toFixed(4),
      );
      document.documentElement.classList.toggle(
        "is-footer-scrolling",
        window.scrollY > (sections.length - 1) * viewport + 1,
      );

      // Keep direct hash navigation and browser scroll restoration in sync without
      // coupling the product to the controlled page-transition timeline.
      if (!locked && page >= 0.5 && productProgress < 0.999) renderProduct(1);
      if (!locked && page < 0.5 && productProgress > 0.001) renderProduct(0);
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    if (sessionStorage.getItem("lumiq-return-page") === "products") {
      sessionStorage.removeItem("lumiq-return-page");
      locked = true;
      renderProduct(1);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const productsSection = root.querySelector<HTMLElement>("#products");
          window.scrollTo(0, productsSection?.offsetTop ?? window.innerHeight);
          update();
          returnLandingTimer = window.setTimeout(() => {
            locked = false;
            releaseAt = performance.now() + 500;
          }, 650);
        }),
      );
    }

    const animateProduct = (target: 0 | 1) =>
      new Promise<void>((resolve) => {
        if (productFrame) cancelAnimationFrame(productFrame);
        const start = productProgress;
        if (Math.abs(target - start) < 0.001) {
          renderProduct(target);
          resolve();
          return;
        }

        const startedAt = performance.now();
        const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches
          ? 1
          : 640;
        const animate = (now: number) => {
          const raw = Math.min(1, (now - startedAt) / duration);
          const eased =
            target > start
              ? 1 - Math.pow(1 - raw, 4)
              : raw * raw * (3 - 2 * raw);
          renderProduct(start + (target - start) * eased);
          if (raw < 1) {
            productFrame = requestAnimationFrame(animate);
          } else {
            productFrame = 0;
            renderProduct(target);
            resolve();
          }
        };
        productFrame = requestAnimationFrame(animate);
      });

    const animatePage = (nextPage: number) =>
      new Promise<void>((resolve) => {
        const targetPage = Math.max(0, Math.min(sections.length - 1, nextPage));
        const start = window.scrollY;
        const target = targetPage * window.innerHeight;
        if (Math.abs(target - start) < 2) {
          window.scrollTo(0, target);
          resolve();
          return;
        }

        root.classList.add("is-page-transitioning");
        document.documentElement.classList.add("is-page-transitioning");
        const startedAt = performance.now();
        const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches
          ? 1
          : 900;
        const animate = (now: number) => {
          const raw = Math.min(1, (now - startedAt) / duration);
          const eased = raw * raw * raw * (raw * (raw * 6 - 15) + 10);
          window.scrollTo(0, start + (target - start) * eased);
          if (raw < 1) {
            animationFrame = requestAnimationFrame(animate);
          } else {
            window.scrollTo(0, target);
            root.classList.remove("is-page-transitioning");
            document.documentElement.classList.remove("is-page-transitioning");
            animationFrame = 0;
            resolve();
          }
        };
        animationFrame = requestAnimationFrame(animate);
      });

    const goToPage = async (nextPage: number) => {
      if (locked) return;
      const targetPage = Math.max(0, Math.min(sections.length - 1, nextPage));
      const fromPage = Math.round(
        window.scrollY / Math.max(1, window.innerHeight),
      );
      if (targetPage === fromPage) return;

      locked = true;
      if (fromPage === 0 && targetPage === 1) {
        root.classList.add("is-product-departing");
        const productDeparture = animateProduct(1);
        await new Promise((resolve) => window.setTimeout(resolve, 50));
        await Promise.all([productDeparture, animatePage(targetPage)]);
        root.classList.remove("is-product-departing");
      } else {
        await animatePage(targetPage);
      }

      if (targetPage === 0) {
        root.classList.add("is-product-returning");
        await animateProduct(0);
        root.classList.remove("is-product-returning");
      }

      locked = false;
      releaseAt = performance.now() + 80;
    };

    const currentPage = () =>
      Math.round(window.scrollY / Math.max(1, window.innerHeight));
    const onWheel = (event: WheelEvent) => {
      const lastPage = sections.length - 1;
      const lastPageTop = lastPage * window.innerHeight;
      if (
        currentPage() >= lastPage &&
        (event.deltaY > 0 || window.scrollY > lastPageTop + 1)
      ) {
        document.documentElement.classList.add("is-footer-scrolling");
        return;
      }
      event.preventDefault();
      if (locked || performance.now() < releaseAt || Math.abs(event.deltaY) < 1)
        return;
      void goToPage(currentPage() + (event.deltaY > 0 ? 1 : -1));
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (locked) {
        if (
          ["ArrowDown", "PageDown", " ", "ArrowUp", "PageUp"].includes(
            event.key,
          )
        )
          event.preventDefault();
        return;
      }
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        if (currentPage() >= sections.length - 1) return;
        event.preventDefault();
        void goToPage(currentPage() + 1);
      } else if (["ArrowUp", "PageUp"].includes(event.key)) {
        if (window.scrollY > (sections.length - 1) * window.innerHeight + 1)
          return;
        event.preventDefault();
        void goToPage(currentPage() - 1);
      }
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStart = event.touches[0]?.clientY ?? 0;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const end = event.changedTouches[0]?.clientY ?? touchStart;
      const delta = touchStart - end;
      const lastPageTop = (sections.length - 1) * window.innerHeight;
      if (
        currentPage() >= sections.length - 1 &&
        (delta > 0 || window.scrollY > lastPageTop + 1)
      )
        return;
      if (!locked && Math.abs(delta) > 44) {
        void goToPage(currentPage() + (delta > 0 ? 1 : -1));
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      root.classList.remove("is-page-transitioning");
      root.classList.remove("is-product-departing", "is-product-returning");
      document.documentElement.classList.remove("is-page-transitioning");
      document.documentElement.classList.remove("is-footer-scrolling");
      document.documentElement.classList.remove("parallax-page");
      document.body.classList.remove("parallax-page");
      if (frame) cancelAnimationFrame(frame);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (productFrame) cancelAnimationFrame(productFrame);
      if (returnLandingTimer) window.clearTimeout(returnLandingTimer);
    };
  }, [router]);

  return rootRef;
}

export default function Home() {
  const t = useTranslations("Home");
  const faq = useTranslations("Faq");
  const rootRef = usePageScroller();
  const [activeProduct, setActiveProduct] = useState(0);
  const [copyVisible, setCopyVisible] = useState(true);
  const copyTimer = useRef(0);
  const localizedProducts = products.map((product, index) => ({
    ...product,
    description: t(`product${index + 1}Description`),
  }));

  const changeProduct = (direction: 1 | -1) => {
    window.clearTimeout(copyTimer.current);
    setCopyVisible(false);
    copyTimer.current = window.setTimeout(() => {
      setActiveProduct(
        (current) =>
          (current + direction + localizedProducts.length) %
          localizedProducts.length,
      );
      setCopyVisible(true);
    }, 220);
  };

  useEffect(
    () => () => {
      window.clearTimeout(copyTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (rootRef.current)
      rootRef.current.dataset.activeProduct = String(activeProduct);
  }, [activeProduct, rootRef]);

  return (
    <main ref={rootRef} className="site-shell parallax-home">
      <div className="scroll-progress" aria-hidden="true" />

      <div className="shared-ola-product" aria-hidden="true">
        <div className="shared-product-aura" />
        <Image
          src="/assets/web/ola-hero-front.webp"
          alt=""
          width={1200}
          height={1200}
          sizes="(max-width: 768px) 90vw, 60vw"
          priority
        />
      </div>

      <section id="top" data-scene className="scene hero-scene">
        <div className="sticky-stage hero-stage">
          <div className="ambient ambient-one" />
          <div className="ambient ambient-two" />
          <div className="hero-word" aria-hidden="true">
            <span className="hero-o">
              <Image
                className="hero-letter"
                src="/assets/web/ola-metal-o.webp"
                alt=""
                width={900}
                height={900}
                priority
              />
            </span>
            <span className="hero-l">
              <Image
                className="hero-letter"
                src="/assets/web/ola-metal-l.webp"
                alt=""
                width={900}
                height={900}
                priority
              />
            </span>
            <span className="hero-a">
              <Image
                className="hero-letter"
                src="/assets/web/ola-metal-a.webp"
                alt=""
                width={900}
                height={900}
                priority
              />
            </span>
          </div>
          <div className="hero-copy">
            <h1>
              {t("hero1")}
              <br />
              {t("hero2")}
              <br />
              {t("hero3")}
            </h1>
            <i aria-hidden="true" />
            <p>{t("heroBody")}</p>
          </div>
          <a
            className="discover-ola"
            href="#products"
            aria-label={t("browseAria")}
          >
            <span className="discover-play">
              <i />
            </span>
            <span className="discover-label">
              {t("browse1")}
              <br />
              {t("browse2")}
              <b />
            </span>
          </a>
        </div>
      </section>

      <section id="products" data-scene className="scene meet-scene">
        <div
          className="sticky-stage product-showcase-stage"
          role="region"
          aria-label={t("productsAria")}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            if (event.repeat) return;
            event.preventDefault();
            event.stopPropagation();
            changeProduct(event.key === "ArrowRight" ? 1 : -1);
          }}
        >
          <div
            className={`product-showcase-copy${copyVisible ? " is-visible" : ""}`}
            aria-live="polite"
          >
            <p className="eyebrow">{t("collection")}</p>
            <h2>{localizedProducts[activeProduct].name}</h2>
            <p>{localizedProducts[activeProduct].description}</p>
          </div>

          <div className="product-dial" aria-hidden="true">
            <i />
          </div>
          <div
            className="product-carousel"
            aria-label={t("carouselAria", {
              name: localizedProducts[activeProduct].name,
              current: activeProduct + 1,
              total: localizedProducts.length,
            })}
          >
            {localizedProducts.map((product, index) => {
              const slot =
                ((index - activeProduct + localizedProducts.length + 2) %
                  localizedProducts.length) -
                2;
              const productContent = (
                <Image
                  src={product.image}
                  alt={index === activeProduct ? product.name : ""}
                  width={1200}
                  height={1200}
                  sizes="(max-width: 768px) 66vw, 32vw"
                />
              );
              const productLinkProps = {
                className: `carousel-product product-${index} slot-${slot}`,
                "aria-hidden": index !== activeProduct,
                "aria-label": t("exploreProduct", { name: product.name }),
                tabIndex: index === activeProduct ? 0 : -1,
              };
              return (
                <Link
                  href={product.href}
                  {...productLinkProps}
                  key={product.name}
                >
                  {productContent}
                </Link>
              );
            })}
          </div>
          <button
            type="button"
            className="product-nav-button product-previous"
            aria-label={t("previousProduct")}
            onClick={() => changeProduct(-1)}
          >
            &lt;
          </button>
          <button
            type="button"
            className="product-nav-button product-next"
            aria-label={t("nextProduct")}
            onClick={() => changeProduct(1)}
          >
            &gt;
          </button>
        </div>
      </section>

      <section
        id="brand-story"
        data-scene
        className="scene legacy-scene story-scene"
      >
        <div className="sticky-stage legacy-stage">
          <div className="legacy-heading">
            <p className="eyebrow">{t("storyEyebrow")}</p>
            <h2>{t("storyTitle")}</h2>
            <p>{t("storyBody")}</p>
            <blockquote>{t("storyQuote")}</blockquote>
          </div>
          <div className="principle-grid">
            {[1, 2, 3, 4].map((number) => (
              <article key={number}>
                <small>0{number}</small>
                <h3>{t(`principle${number}Title`)}</h3>
                <p>{t(`principle${number}Body`)}</p>
              </article>
            ))}
          </div>
          <p className="legacy-footnote">{t("storyFootnote")}</p>
        </div>
      </section>

      <section id="plans" data-scene className="scene legacy-scene plans-scene">
        <div className="sticky-stage legacy-stage">
          <div className="legacy-heading compact-heading">
            <p className="eyebrow">{t("plansEyebrow")}</p>
            <h2>{t("plansTitle")}</h2>
            <p>{t("plansBody")}</p>
            <DraftNotice compact>{t("plansNotice")}</DraftNotice>
          </div>
          <PlanCards />
        </div>
      </section>

      <section id="media" data-scene className="scene legacy-scene media-scene">
        <div className="sticky-stage legacy-stage">
          <div className="legacy-heading compact-heading">
            <p className="eyebrow">{t("mediaEyebrow")}</p>
            <h2>{t("mediaTitle")}</h2>
            <p>{t("mediaBody")}</p>
            <DraftNotice compact>{t("mediaNotice")}</DraftNotice>
          </div>
          <div className="quote-grid">
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <blockquote key={number}>
                {t(`quote${number}`)}
                <cite>{t(`quote${number}Source`)}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" data-scene className="scene legacy-scene faq-scene">
        <div className="sticky-stage legacy-stage">
          <div className="legacy-heading compact-heading">
            <p className="eyebrow">{faq("eyebrow")}</p>
            <h2>{faq("title")}</h2>
            <p>
              {faq("introBefore")}{" "}
              <a href="mailto:hello@lumiqstudio.com">hello@lumiqstudio.com</a>{" "}
              {faq("introAfter")}
            </p>
          </div>
          <div className="faq-grid">
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <details key={number} open={number === 1}>
                <summary>{faq(`q${number}`)}</summary>
                <p>{faq(`a${number}`)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
