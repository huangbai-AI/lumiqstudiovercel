import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="foot-logo">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="var(--ink)" />
                <circle cx="19" cy="5" r="2" fill="var(--gold)" />
              </svg>
              <span className="foot-wordmark">
                <strong>LUMIQ</strong>
                <small>STUDIO</small>
              </span>
            </div>
            <p className="foot-blurb">
              Future-ready AI devices that inspire, educate, and bring families closer — taking imagination to new heights.
            </p>
          </div>
          <div className="foot-nav">
            <h4>Products</h4>
            <ul>
              <li><Link href="/products/tablet">LumiqTablet</Link></li>
              <li><Link href="/products/book">LumiqBook</Link></li>
              <li><Link href="/products/pal">LumiqPal</Link></li>
              <li><Link href="/plans">Plans & Pricing</Link></li>
            </ul>
          </div>
          <div className="foot-nav">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/story">Brand Story</Link></li>
              <li><Link href="/media">Media & Review</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="foot-nav">
            <h4>Legal</h4>
            <ul>
              <li><Link href="/legal/privacy">Privacy Policy</Link></li>
              <li><Link href="/legal/terms">Terms of Service</Link></li>
              <li><Link href="/legal/cookies">Cookie Policy</Link></li>
              <li><Link href="/legal/child-safety">Child Safety</Link></li>
            </ul>
          </div>
          <div className="foot-nav">
            <h4>Follow Us</h4>
            <div className="social-pills" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
              <a href="#" className="spill">Instagram</a>
              <a href="#" className="spill">TikTok</a>
              <a href="#" className="spill">YouTube</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2026 Lumiq Studios Inc. All rights reserved.</div>
          <div className="foot-tag">Wonder Starts Here</div>
        </div>
      </div>
    </footer>
  );
}
