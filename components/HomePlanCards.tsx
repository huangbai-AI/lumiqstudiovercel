"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PRODUCT_BY_ID } from "@/lib/products";

const hardwarePlansBase = [
  {
    index: "01",
    name: PRODUCT_BY_ID.tablet.name,
    price: "399",
    image: PRODUCT_BY_ID.tablet.image,
    href: PRODUCT_BY_ID.tablet.href,
    className: "plan-card-tablet",
  },
  {
    index: "02",
    name: PRODUCT_BY_ID.ola.name,
    price: "599",
    image: PRODUCT_BY_ID.ola.image,
    href: PRODUCT_BY_ID.ola.href,
    className: "plan-card-ola",
  },
  {
    index: "03",
    name: PRODUCT_BY_ID.print.name,
    price: "69",
    image: PRODUCT_BY_ID.print.image,
    href: PRODUCT_BY_ID.print.href,
    className: "plan-card-print",
  },
];

export default function PlanCards() {
  const t = useTranslations("HomePlans");
  const hardwarePlans = hardwarePlansBase.map((plan, index) => ({
    ...plan,
    type: t(`p${index + 1}Type`),
    description: t(`p${index + 1}Desc`),
  }));

  return (
    <div className="hardware-plan-grid">
      {hardwarePlans.map((plan) => (
        <article
          className={`hardware-plan-card ${plan.className}`}
          key={plan.name}
        >
          <div className="hardware-plan-visual">
            <span aria-hidden="true">{plan.index}</span>
            <Image
              src={plan.image}
              alt={t("frontAlt", { name: plan.name })}
              width={900}
              height={900}
              sizes="(max-width: 820px) 100vw, 33vw"
            />
          </div>
          <div className="hardware-plan-copy">
            <p className="eyebrow">{plan.type}</p>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="hardware-plan-purchase">
              <p>
                <span>USD</span>
                <strong>{plan.price}</strong>
              </p>
              <Link href={plan.href}>
                {t("explore", { name: plan.name.replace("Lumiq ", "") })}{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
