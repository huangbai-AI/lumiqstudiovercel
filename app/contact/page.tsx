import type { Metadata } from "next";
import SubPage from "@/components/SubPage";

export const metadata: Metadata = {
  title: "Contact — LumiqStudio",
  description: "Get in touch with the LumiqStudio team — support, press, partnerships, and general inquiries.",
};

const channels = [
  { label: "General inquiries", email: "hello@lumiqstudio.com" },
  { label: "Customer support", email: "support@lumiqstudio.com" },
  { label: "Press & media", email: "press@lumiqstudio.com" },
  { label: "Partnerships", email: "partners@lumiqstudio.com" },
];

export default function ContactPage() {
  return (
    <SubPage
      eyebrow="Contact"
      title="Say hello"
      intro="We read every message. Pick the inbox that fits and we'll get back to you within a few business days."
    >
      {channels.map((c) => (
        <div key={c.email} className="contact-card">
          <div style={{ fontSize: "0.85rem", opacity: 0.7, marginBottom: "0.35rem" }}>
            {c.label}
          </div>
          <a href={`mailto:${c.email}`} style={{ fontSize: "1.15rem", fontWeight: 600 }}>
            {c.email}
          </a>
        </div>
      ))}

      <h2>Mailing address</h2>
      <p>
        LumiqStudio (Arpha Inc.)<br />
        Address coming soon.
      </p>
    </SubPage>
  );
}
