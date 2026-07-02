import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-grid">
          <div>
            <div className="foot-logo">
              <img src="/lumiq-logo.png" alt="Lumiq Studios" className="foot-logo-img" />
            </div>
            <p className="foot-blurb">
              Future-ready AI devices that inspire, educate, and bring families closer — taking imagination to new heights.
            </p>
          </div>
          <div className="foot-nav">
            <h4>Products</h4>
            <ul>
              <li><Link href="/products/tablet">LumiqKobi</Link></li>
              <li><Link href="/products/book">LumiqPrint</Link></li>
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
