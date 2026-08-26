const hardwarePlans = [
  {
    index: "01",
    name: "Lumiq Tablet",
    type: "AI LEARNING TABLET",
    price: "399",
    image: "/assets/products/lumiq-tablet.png",
    description: "A calm, distraction-free reading and creation canvas where children can explore stories, learning missions and worlds shaped around their imagination.",
    href: "/products/tablet",
    className: "plan-card-tablet",
  },
  {
    index: "02",
    name: "Lumiq Ola",
    type: "HOLOGRAPHIC COMPANION",
    price: "599",
    image: "/assets/ola/ola-hero-front.png",
    description: "A personal holographic companion for stories, conversation, reminders and gentle everyday support across every generation of the family.",
    href: "/products/pal",
    className: "plan-card-ola",
  },
  {
    index: "03",
    name: "Lumiq Print",
    type: "PERSONALISED STORYBOOK",
    price: "69",
    image: "/assets/products/lumiq-print.png",
    description: "A premium personalised hardcover that turns a child into the hero of an original story — printed, delivered and made to be kept.",
    href: "/products/book",
    className: "plan-card-print",
  },
];

export default function PlanCards() {
  return (
    <div className="hardware-plan-grid">
      {hardwarePlans.map((plan) => (
        <article className={`hardware-plan-card ${plan.className}`} key={plan.name}>
          <div className="hardware-plan-visual">
            <span aria-hidden="true">{plan.index}</span>
            <img src={plan.image} alt={`${plan.name} front view`} />
          </div>
          <div className="hardware-plan-copy">
            <p className="eyebrow">{plan.type}</p>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <div className="hardware-plan-purchase">
              <p><span>USD</span><strong>{plan.price}</strong></p>
              <a href={plan.href}>Explore {plan.name.replace("Lumiq ", "")} <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
