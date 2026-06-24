import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LumiqBook — Your Child, The Hero",
  description: "A premium hardcover keepsake — print any ImagiMe story with your child as the main character.",
};

export default function BookPage() {
  return (
    <div className="lumiq-root editorial-page" style={{ paddingTop: "6rem", color: "var(--ink)" }}>
      <div className="bg-layer" aria-hidden>
        <div className="stars" />
        <div className="bokeh b1" />
        <div className="bokeh b2" />
      </div>

      <section className="container" style={{ padding: "1.5rem 2rem 1rem", maxWidth: 1200 }}>
        <Link href="/products" style={{ color: "var(--ink-3)", fontSize: ".9rem" }}>← All products</Link>

        <div className="sec-head" style={{ marginTop: "1.5rem" }}>
          <div className="sec-num purple">03</div>
          <div className="sec-head-body">
            <span className="kicker">LumiqBook</span>
            <h1>Your Child, <em>The Hero</em></h1>
            <p className="sec-lede">A premium hardcover keepsake powered by the LumiqTablet&apos;s ImagiMe feature. Print any generated story as a real book — with your child&apos;s face as the main character.</p>
            <div className="price-line">
              <div className="price"><small>USD</small>69</div>
              <Link href="/prelaunch" className="btn btn-navy">Order LumiqBook →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "0 2rem 6rem", maxWidth: 1200 }}>
        <div className="detail-split">
          <div>
            <span className="kicker">From Screen to Shelf</span>
            <h2>Become the star of your favorite tale</h2>
            <p>Pick a story your child loves on the LumiqTablet, swap in their face with ImagiMe, and we&apos;ll print it as a beautifully bound hardcover. Be Little Red Riding Hood herself, become Snow White, or step in as the Prince — every page stars your child.</p>
            <ul className="spec-list" style={{ listStyle: "none", padding: 0 }}>
              <li>Powered by the LumiqTablet ImagiMe feature</li>
              <li>Premium matte hardcover, archival-quality printing</li>
              <li>Personalized illustrations on every page</li>
              <li>Choose from the full Lumiq story library</li>
            </ul>
          </div>
          <div className="ds-img">
            <img src="/book-hero.jpg" alt="LumiqBook hardcover" loading="lazy" />
          </div>
        </div>
      </section>
    </div>
  );
}
