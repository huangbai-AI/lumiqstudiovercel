"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PlanCards from "@/components/HomePlanCards";
import "./homepage.css";

const products = [
  {
    id: "product-ola",
    name: "Lumiq Ola",
    type: "Personal Holographic Companion",
    image: "/assets/ola/ola-hero-front.png",
    href: "/products/pal",
    description: "Lumiq Ola is a personal AI companion brought to life through an expressive 3D holographic presence. Personalized to one user’s age, routines, and needs, it offers natural conversation, encouragement, reminders, emotional support, and daily-care assistance for children, adults, and older family members—at home and throughout everyday life.",
    highlights: ["Natural conversation", "Personalized routines", "Emotional support"],
  },
  {
    id: "product-ola-go",
    name: "Lumiq Ola Go",
    type: "Take a Little Piece of Ola With You",
    image: "/assets/products/lumiq-ola-go.png",
    href: "/products/pal",
    description: "Lumiq Ola Go is the pocket-sized extension included with every Ola. Its circular display carries the same familiar character beyond home, offering lightweight touch interaction, synced reminders, weather information, and quick voice diaries. The optional 4G version also supports on-demand location, impact detection, and SOS alerts when needed.",
    highlights: ["Synced reminders", "Quick voice diaries", "Optional 4G safety"],
  },
  {
    id: "product-tablet",
    name: "Lumiq Tablet",
    type: "AI Learning Tablet for Children",
    image: "/assets/products/lumiq-tablet.png",
    href: "/products/tablet",
    description: "Lumiq Tablet is an AI-powered learning and reading device created especially for children. Its distraction-free experience combines an original story library, imaginative interaction, and playful discovery. ImagiMe places each child inside the story, while Story Quest turns reading into rewarding missions that nurture curiosity, creativity, focus, and independent learning.",
    highlights: ["ImagiMe stories", "Story Quest missions", "Distraction-free learning"],
  },
  {
    id: "product-print",
    name: "Lumiq Print",
    type: "Personalized Printed Storybook",
    image: "/assets/products/lumiq-print.png",
    href: "/products/book",
    description: "Lumiq Print transforms an ImagiMe story from Lumiq Tablet into a premium personalized hardcover, with the child as its hero. Created through ImagiMe face-swap and delivered to the family’s door, each printed adventure becomes a story to hold, revisit, share, and treasure as a lasting record of childhood imagination.",
    highlights: ["Personalized hardcover", "The child as hero", "A lasting keepsake"],
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

    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
    let frame = 0;
    let animationFrame = 0;
    let productFrame = 0;
    let locked = false;
    let releaseAt = 0;
    let returnLandingTimer = 0;
    let touchStart = 0;
    let productProgress = window.scrollY >= window.innerHeight * .5 ? 1 : 0;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const renderProduct = (progress: number) => {
      productProgress = clamp(progress);
      root.style.setProperty("--ola-travel", productProgress.toFixed(4));
      root.style.setProperty("--ola-opacity", (1 - clamp((productProgress - .86) / .14)).toFixed(4));
    };

    renderProduct(productProgress);
    router.prefetch("/products/pal");
    router.prefetch("/products/tablet");
    router.prefetch("/products/book");

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const page = window.scrollY / Math.max(1, viewport);

      sections.forEach((section, index) => {
        const progress = Math.min(1, Math.max(0, index === 0 ? page : page - index + 1));
        const enter = Math.min(1, Math.max(0, page - index + 1));
        const exit = Math.min(1, Math.max(0, page - index));
        section.style.setProperty("--p", progress.toFixed(4));
        section.style.setProperty("--scene-enter", enter.toFixed(4));
        section.style.setProperty("--scene-exit", exit.toFixed(4));
      });

      root.style.setProperty("--page", page.toFixed(4));
      root.style.setProperty("--hero-mix", Math.min(1, Math.max(0, page)).toFixed(4));
      root.style.setProperty("--site-progress", Math.min(1, page / Math.max(1, sections.length - 1)).toFixed(4));
      document.documentElement.classList.toggle("is-footer-scrolling", window.scrollY > (sections.length - 1) * viewport + 1);

      // Keep direct hash navigation and browser scroll restoration in sync without
      // coupling the product to the controlled page-transition timeline.
      if (!locked && page >= .5 && productProgress < .999) renderProduct(1);
      if (!locked && page < .5 && productProgress > .001) renderProduct(0);
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    if (sessionStorage.getItem("lumiq-return-page") === "products") {
      sessionStorage.removeItem("lumiq-return-page");
      locked = true;
      renderProduct(1);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const productsSection = root.querySelector<HTMLElement>("#products");
        window.scrollTo(0, productsSection?.offsetTop ?? window.innerHeight);
        update();
        returnLandingTimer = window.setTimeout(() => {
          locked = false;
          releaseAt = performance.now() + 500;
        }, 650);
      }));
    }

    const animateProduct = (target: 0 | 1) => new Promise<void>((resolve) => {
      if (productFrame) cancelAnimationFrame(productFrame);
      const start = productProgress;
      if (Math.abs(target - start) < .001) {
        renderProduct(target);
        resolve();
        return;
      }

      const startedAt = performance.now();
      const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 640;
      const animate = (now: number) => {
        const raw = Math.min(1, (now - startedAt) / duration);
        const eased = target > start
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

    const animatePage = (nextPage: number) => new Promise<void>((resolve) => {
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
      const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 900;
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
      const fromPage = Math.round(window.scrollY / Math.max(1, window.innerHeight));
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

    const currentPage = () => Math.round(window.scrollY / Math.max(1, window.innerHeight));
    const onWheel = (event: WheelEvent) => {
      const lastPage = sections.length - 1;
      const lastPageTop = lastPage * window.innerHeight;
      if (currentPage() >= lastPage && (event.deltaY > 0 || window.scrollY > lastPageTop + 1)) {
        document.documentElement.classList.add("is-footer-scrolling");
        return;
      }
      event.preventDefault();
      if (locked || performance.now() < releaseAt || Math.abs(event.deltaY) < 1) return;
      void goToPage(currentPage() + (event.deltaY > 0 ? 1 : -1));
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (locked) {
        if (["ArrowDown", "PageDown", " ", "ArrowUp", "PageUp"].includes(event.key)) event.preventDefault();
        return;
      }
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        if (currentPage() >= sections.length - 1) return;
        event.preventDefault();
        void goToPage(currentPage() + 1);
      } else if (["ArrowUp", "PageUp"].includes(event.key)) {
        if (window.scrollY > (sections.length - 1) * window.innerHeight + 1) return;
        event.preventDefault();
        void goToPage(currentPage() - 1);
      }
    };
    const onTouchStart = (event: TouchEvent) => { touchStart = event.touches[0]?.clientY ?? 0; };
    const onTouchEnd = (event: TouchEvent) => {
      const end = event.changedTouches[0]?.clientY ?? touchStart;
      const delta = touchStart - end;
      const lastPageTop = (sections.length - 1) * window.innerHeight;
      if (currentPage() >= sections.length - 1 && (delta > 0 || window.scrollY > lastPageTop + 1)) return;
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
  const rootRef = usePageScroller();
  const router = useRouter();
  const [activeProduct, setActiveProduct] = useState(0);
  const [copyVisible, setCopyVisible] = useState(true);
  const copyTimer = useRef(0);

  const changeProduct = (direction: 1 | -1) => {
    window.clearTimeout(copyTimer.current);
    setCopyVisible(false);
    copyTimer.current = window.setTimeout(() => {
      setActiveProduct((current) => (current + direction + products.length) % products.length);
      setCopyVisible(true);
    }, 220);
  };

  useEffect(() => () => {
    window.clearTimeout(copyTimer.current);
  }, []);

  useEffect(() => {
    if (rootRef.current) rootRef.current.dataset.activeProduct = String(activeProduct);
  }, [activeProduct, rootRef]);

  return (
    <main ref={rootRef} className="site-shell parallax-home">
      <div className="scroll-progress" aria-hidden="true" />

      <div className="shared-ola-product" aria-hidden="true">
        <div className="shared-product-aura" />
        <img src="/assets/ola/ola-hero-front.png" alt="" />
      </div>

      <section id="top" data-scene className="scene hero-scene">
        <div className="sticky-stage hero-stage">
          <div className="ambient ambient-one" />
          <div className="ambient ambient-two" />
          <div className="hero-word" aria-hidden="true">
            <span className="hero-o"><img className="hero-letter" src="/assets/letters/ola-metal-o.png" alt="" /></span>
            <span className="hero-l"><img className="hero-letter" src="/assets/letters/ola-metal-l.png" alt="" /></span>
            <span className="hero-a"><img className="hero-letter" src="/assets/letters/ola-metal-a.png" alt="" /></span>
          </div>
          <div className="hero-copy">
            <h1>AI EXPERIENCES<br />FOR FAMILIES<br />ACROSS GENERATIONS.</h1>
            <i aria-hidden="true" />
            <p>Lumiq Studio creates AI-powered story and companion experiences — helping children read and imagine, while giving older adults a gentle presence for conversation, reminders, and connection.</p>
          </div>
          <a className="discover-ola" href="#products" aria-label="Browse Lumiq products">
            <span className="discover-play"><i /></span>
            <span className="discover-label">BROWSE<br />PRODUCTS<b /></span>
          </a>
        </div>
      </section>

      <section id="products" data-scene className="scene meet-scene">
        <div
          className="sticky-stage product-showcase-stage"
          role="region"
          aria-label="Lumiq products"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            if (event.repeat) return;
            event.preventDefault();
            event.stopPropagation();
            changeProduct(event.key === "ArrowRight" ? 1 : -1);
          }}
        >
          <div className={`product-showcase-copy${copyVisible ? " is-visible" : ""}`} aria-live="polite">
            <p className="eyebrow">LUMIQ PRODUCT COLLECTION</p>
            <h2>{products[activeProduct].name}</h2>
            <p>{products[activeProduct].description}</p>
          </div>

          <div className="product-dial" aria-hidden="true"><i /></div>
          <div className="product-carousel" aria-label={`${products[activeProduct].name}, product ${activeProduct + 1} of ${products.length}`}>
            {products.map((product, index) => {
              const slot = ((index - activeProduct + products.length + 2) % products.length) - 2;
              const productContent = <img src={product.image} alt={index === activeProduct ? product.name : ""} />;
              const productLinkProps = {
                className: `carousel-product product-${index} slot-${slot}`,
                "aria-hidden": index !== activeProduct,
                "aria-label": `Explore ${product.name}`,
                tabIndex: index === activeProduct ? 0 : -1,
              };
              return (
                <a
                  href={product.href}
                  {...productLinkProps}
                  key={product.name}
                  onClick={(event) => {
                    event.preventDefault();
                    router.push(product.href);
                  }}
                >{productContent}</a>
              );
            })}
          </div>
          <button
            type="button"
            className="product-nav-button product-previous"
            aria-label="Show previous product"
            onClick={() => changeProduct(-1)}
          >&lt;</button>
          <button
            type="button"
            className="product-nav-button product-next"
            aria-label="Show next product"
            onClick={() => changeProduct(1)}
          >&gt;</button>
        </div>
      </section>

      <section id="brand-story" data-scene className="scene legacy-scene story-scene">
        <div className="sticky-stage legacy-stage">
          <div className="legacy-heading">
            <p className="eyebrow">Brand Story</p>
            <h2>A STUDIO SHAPED BY A QUIET QUESTION.</h2>
            <p>Lumiq Studio began with a small group of designers, engineers and parents asking what technology is actually for when the noise dies down. We make warm, considered objects that earn a place in the home — things to be shared rather than replaced.</p>
            <blockquote>“The future of technology should not only connect devices — it should connect families.”</blockquote>
          </div>
          <div className="principle-grid">
            <article><small>01</small><h3>Quiet by design</h3><p>No feeds, no streaks, no noise. Every Lumiq object is designed to end in a story, not a scroll.</p></article>
            <article><small>02</small><h3>Families first</h3><p>We build for the room, not the individual screen — moments that parents, children and grandparents share.</p></article>
            <article><small>03</small><h3>AI as collaborator</h3><p>AI helps narrate, illustrate and personalise — always with the person, never instead of them.</p></article>
            <article><small>04</small><h3>Craft over churn</h3><p>Objects made to be kept: quiet, warm, considered, and designed for everyday family life.</p></article>
          </div>
          <p className="legacy-footnote">Hardware, software and printed objects — one ecosystem built to help families read, write, dream and design together.</p>
        </div>
      </section>

      <section id="plans" data-scene className="scene legacy-scene plans-scene">
        <div className="sticky-stage legacy-stage">
          <div className="legacy-heading compact-heading">
            <p className="eyebrow">Plans &amp; Pricing</p>
            <h2>PICK THE WAY YOU WANT TO LIVE WITH LUMIQ.</h2>
            <p>One-time hardware. Clear pricing. No tricks. Choose the Lumiq object that belongs in your family&apos;s everyday life.</p>
          </div>
          <PlanCards />
        </div>
      </section>

      <section id="media" data-scene className="scene legacy-scene media-scene">
        <div className="sticky-stage legacy-stage">
          <div className="legacy-heading compact-heading">
            <p className="eyebrow">Media &amp; Review</p>
            <h2>WHAT PEOPLE ARE SAYING.</h2>
            <p>A small selection of press features and reader letters that have meant a lot to us.</p>
          </div>
          <div className="quote-grid">
            <blockquote>“A studio that actually cares about the small, quiet moments at home.”<cite>The Atelier Review</cite></blockquote>
            <blockquote>“Tech that wants to slow you down instead of speeding you up — a rare thing.”<cite>Sora Tanaka, Designer</cite></blockquote>
            <blockquote>“Considered objects for considered families.”<cite>Independent Review</cite></blockquote>
            <blockquote>“Every product feels written, not manufactured. It&apos;s an entire little universe.”<cite>Liam Chen, Father of two</cite></blockquote>
            <blockquote>“We use it together. That&apos;s what makes it different — it doesn&apos;t take my kids away from me.”<cite>Reader letter</cite></blockquote>
            <blockquote>“Calm by design. My students slow down when they use it.”<cite>Educator letter</cite></blockquote>
          </div>
        </div>
      </section>

      <section id="faq" data-scene className="scene legacy-scene faq-scene">
        <div className="sticky-stage legacy-stage">
          <div className="legacy-heading compact-heading">
            <p className="eyebrow">FAQ</p>
            <h2>QUESTIONS, GENTLY ANSWERED.</h2>
            <p>Still curious? Email <a href="mailto:hello@lumiqstudio.com">hello@lumiqstudio.com</a> and our team will reply as soon as possible.</p>
          </div>
          <div className="faq-grid">
            <details open><summary>What is Lumiq Studio?</summary><p>We&apos;re a small studio designing objects and experiences at the meeting point of artificial intelligence, storytelling and craft.</p></details>
            <details><summary>Who is Lumiq for?</summary><p>Anyone who wants tools that lift their imagination instead of crowding it — families, creators, readers and quiet thinkers.</p></details>
            <details><summary>Where do you ship?</summary><p>We currently ship to most countries in North America, Europe and East Asia. More regions are coming soon.</p></details>
            <details><summary>How does the AI work?</summary><p>AI is used as a collaborator, not a replacement. It helps narrate, illustrate and personalise — always with the person, not instead of them.</p></details>
            <details><summary>Is my data private?</summary><p>Yes. We store as little as we can, never sell data, and offer offline modes for every product where possible.</p></details>
            <details><summary>Can I cancel a plan?</summary><p>Any time. There are no contracts and no penalties.</p></details>
          </div>
        </div>
      </section>
    </main>
  );
}
