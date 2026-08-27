"use client";

import { useState } from "react";
import {
  BellRing,
  CalendarDays,
  CheckSquare,
  CloudSun,
  Frame,
  Images,
  UsersRound,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import DraftNotice from "@/components/DraftNotice";
import Image from "next/image";

export default function NestProductPage() {
  const t = useTranslations("Nest");
  const finishes = [
    {
      id: "oak",
      name: t("oak"),
      image: "/assets/web/nest15-oak-angle.webp",
      swatch: "#c79a62",
    },
    {
      id: "walnut",
      name: t("walnut"),
      image: "/assets/web/nest15-walnut-angle.webp",
      swatch: "#4a2b20",
    },
    {
      id: "black",
      name: t("black"),
      image: "/assets/web/nest15-black-angle.webp",
      swatch: "#17191d",
    },
  ] as const;
  const features = [CalendarDays, CheckSquare, BellRing, CloudSun].map(
    (Icon, index) => ({
      Icon,
      title: t(`f${index + 1}Title`),
      body: t(`f${index + 1}Body`),
    }),
  );
  const [finish, setFinish] = useState<(typeof finishes)[number]["id"]>("oak");
  const selected = finishes.find((item) => item.id === finish) ?? finishes[0];

  return (
    <main className="nest-page">
      <section className="nest-hero">
        <div className="nest-hero-copy">
          <Link href="/products" className="nest-back">
            {t("all")}
          </Link>
          <p className="nest-kicker">{t("kicker")}</p>
          <h1>
            Lumiq
            <br />
            <span>Nest 15</span>
          </h1>
          <p className="nest-lede">{t("lede")}</p>
          <DraftNotice>{t("conceptNotice")}</DraftNotice>

          <div className="nest-actions">
            <Link href="/prelaunch" className="nest-primary">
              {t("waitlist")} <span aria-hidden>→</span>
            </Link>
            <a href="#finishes" className="nest-secondary">
              {t("finishesLink")}
            </a>
          </div>

          <div className="nest-finish-picker" aria-label={t("choose")}>
            <p>
              <span>{t("finish")}</span>
              {selected.name}
            </p>
            <div>
              {finishes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={item.id === finish ? "is-active" : ""}
                  aria-label={t("show", { name: item.name })}
                  aria-pressed={item.id === finish}
                  onClick={() => setFinish(item.id)}
                >
                  <span style={{ background: item.swatch }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="nest-hero-visual">
          <div className="nest-visual-glow" aria-hidden />
          <Image
            key={selected.id}
            src={selected.image}
            alt={t("altFinish", { name: selected.name })}
            width={1200}
            height={900}
            sizes="(max-width: 900px) 100vw, 55vw"
            priority
          />
          <p>
            <strong>15.6</strong>
            <span>{t("display")}</span>
          </p>
        </div>
      </section>

      <section className="nest-feature-band" aria-label={t("featuresAria")}>
        {features.map(({ Icon, title, body }) => (
          <article key={title}>
            <Icon size={24} strokeWidth={1.35} aria-hidden />
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="nest-together">
        <div className="nest-section-copy">
          <p className="nest-kicker">{t("shared")}</p>
          <h2>
            {t("less")}
            <br />
            <span>{t("more")}</span>
          </h2>
          <p>{t("sharedBody")}</p>
          <ul>
            <li>
              <UsersRound size={20} strokeWidth={1.5} />
              {t("shared1")}
            </li>
            <li>
              <Frame size={20} strokeWidth={1.5} />
              {t("shared2")}
            </li>
            <li>
              <Images size={20} strokeWidth={1.5} />
              {t("shared3")}
            </li>
          </ul>
        </div>

        <div className="nest-orientation-grid">
          <figure className="nest-landscape">
            <Image
              src="/assets/web/nest15-oak-front.webp"
              alt={t("landscapeAlt")}
              width={1200}
              height={900}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <figcaption>{t("landscape")}</figcaption>
          </figure>
          <figure className="nest-portrait">
            <Image
              src="/assets/web/nest15-walnut-front.webp"
              alt={t("portraitAlt")}
              width={1200}
              height={900}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <figcaption>{t("warm")}</figcaption>
          </figure>
        </div>
      </section>

      <section id="finishes" className="nest-finishes">
        <header>
          <p className="nest-kicker">{t("three")}</p>
          <h2>{t("home")}</h2>
        </header>
        <div className="nest-finish-grid">
          {[
            {
              name: t("oak"),
              image: "/assets/web/nest15-oak-front.webp",
              note: t("oakNote"),
            },
            {
              name: t("walnut"),
              image: "/assets/web/nest15-walnut-front.webp",
              note: t("walnutNote"),
            },
            {
              name: t("black"),
              image: "/assets/web/nest15-black-front.webp",
              note: t("blackNote"),
            },
          ].map((item) => (
            <article key={item.name}>
              <div>
                <Image
                  src={item.image}
                  alt={t("altFinish", { name: item.name })}
                  width={900}
                  height={900}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </div>
              <h3>{item.name}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="nest-final">
        <p className="nest-kicker">{t("coming")}</p>
        <h2>
          {t("give")}
          <br />
          <span>{t("place")}</span>
        </h2>
        <Link href="/prelaunch" className="nest-primary">
          {t("join")} <span aria-hidden>→</span>
        </Link>
      </section>
    </main>
  );
}
