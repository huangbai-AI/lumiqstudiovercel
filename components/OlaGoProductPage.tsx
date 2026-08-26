"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import DraftNotice from "@/components/DraftNotice";

export default function OlaGoProductPage() {
  const t = useTranslations("OlaGo");
  const features = [
    "reminders",
    "weather",
    "journal",
    "cellular",
    "location",
    "safety",
  ] as const;

  return (
    <main
      className="lumiq-root editorial-page"
      style={{ paddingTop: "6rem", color: "var(--ink)" }}
    >
      <section
        className="container"
        style={{ padding: "1.5rem 2rem 5rem", maxWidth: 1200 }}
      >
        <Link
          href="/products"
          style={{ color: "var(--ink-3)", fontSize: ".9rem" }}
        >
          {t("all")}
        </Link>
        <div
          className="detail-split"
          style={{ marginTop: "1.5rem", alignItems: "center" }}
        >
          <div>
            <span className="kicker">Lumiq Ola Go</span>
            <h1
              className="serif"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 6rem)",
                lineHeight: 0.96,
                margin: ".8rem 0 1.25rem",
              }}
            >
              {t("title")}
            </h1>
            <p className="sec-lede">{t("lede")}</p>
            <DraftNotice>{t("conceptNotice")}</DraftNotice>
            <div className="price-line">
              <div className="price" style={{ fontSize: "1.25rem" }}>
                {t("included")}
              </div>
              <Link href="/prelaunch" className="btn btn-navy">
                {t("join")}
              </Link>
            </div>
          </div>
          <div
            className="ds-img"
            style={{ background: "linear-gradient(145deg,#eef7ff,#f6f0ff)" }}
          >
            <Image
              src="/assets/web/lumiq-ola-go.webp"
              width={900}
              height={900}
              sizes="(max-width: 820px) 100vw, 50vw"
              priority
              alt={t("alt")}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
        </div>
      </section>

      <section
        className="container"
        style={{ padding: "0 2rem 5rem", maxWidth: 1200 }}
      >
        <div className="section-head">
          <span className="kicker">{t("relationshipEyebrow")}</span>
          <h2 className="serif">{t("relationshipTitle")}</h2>
          <p className="lead">{t("relationshipBody")}</p>
        </div>
        <div className="value-grid">
          {features.map((key, index) => (
            <article className="value-card" key={key}>
              <span className="value-badge">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="serif">{t(`${key}Title`)}</h3>
              <p>{t(`${key}Body`)}</p>
            </article>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginTop: "2rem",
          }}
        >
          <Link href="/products/ola" className="btn btn-soft">
            {t("meetOla")}
          </Link>
          <Link href="/prelaunch" className="btn btn-navy">
            {t("join")}
          </Link>
        </div>
      </section>
    </main>
  );
}
