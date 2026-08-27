import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import DraftNotice from "@/components/DraftNotice";
import Image from "next/image";

export default function PrintProductPage() {
  const t = useTranslations("Book");
  return (
    <main
      className="lumiq-root editorial-page"
      style={{ paddingTop: "6rem", color: "var(--ink)" }}
    >
      <div className="bg-layer" aria-hidden>
        <div className="stars" />
        <div className="bokeh b1" />
        <div className="bokeh b2" />
      </div>

      <section
        className="container"
        style={{ padding: "1.5rem 2rem 1rem", maxWidth: 1200 }}
      >
        <Link
          href="/products"
          style={{ color: "var(--ink-3)", fontSize: ".9rem" }}
        >
          {t("all")}
        </Link>

        <div className="sec-head" style={{ marginTop: "1.5rem" }}>
          <div className="sec-num purple">03</div>
          <div className="sec-head-body">
            <span className="kicker">Lumiq Print</span>
            <h1>
              {t("titleBefore")} <em>{t("titleEm")}</em>
            </h1>
            <p className="sec-lede">{t("lede")}</p>
            <DraftNotice>{t("conceptNotice")}</DraftNotice>
            <div className="price-line">
              <div className="price">
                <small>USD</small>69
              </div>
              <Link href="/prelaunch" className="btn btn-navy">
                {t("buy")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="container"
        style={{ padding: "0 2rem 6rem", maxWidth: 1200 }}
      >
        <div className="detail-split">
          <div>
            <span className="kicker">{t("eyebrow")}</span>
            <h2>{t("sectionTitle")}</h2>
            <p>{t("body")}</p>
            <ul className="spec-list" style={{ listStyle: "none", padding: 0 }}>
              {[1, 2, 3, 4].map((i) => (
                <li key={i}>{t(`s${i}`)}</li>
              ))}
            </ul>
          </div>
          <div className="ds-img">
            <Image
              src="/assets/web/lumiq-print-card.webp"
              alt={t("alt")}
              width={1000}
              height={1000}
              sizes="(max-width: 820px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}
