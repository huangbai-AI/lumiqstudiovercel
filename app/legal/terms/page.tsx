import type { Metadata } from "next";
import SubPage from "@/components/SubPage";

export const metadata: Metadata = { title: "Terms of Service — LumiqStudio" };

export default function TermsPage() {
  return (
    <SubPage eyebrow="Legal" title="Terms of Service" intro="The rules and conditions that govern your use of Lumiq products and services.">
      <p><em>Demo content — full terms to be updated.</em></p>
      <p>By using Lumiq products and services you agree to these terms. Please read them carefully.</p>
      <h2>Use of service</h2>
      <p>Lumiq services are intended for personal, non-commercial use by families and individuals.</p>
      <h2>Subscriptions & payments</h2>
      <p>Subscriptions auto-renew monthly or annually. You may cancel at any time with no penalty.</p>
      <h2>Content</h2>
      <p>All Lumiq story content is owned by Lumiq Studio (Arpha Inc.) and may not be reproduced without permission.</p>
      <h2>Contact</h2>
      <p>Questions about these terms? Email legal@lumiqstudio.com.</p>
    </SubPage>
  );
}
