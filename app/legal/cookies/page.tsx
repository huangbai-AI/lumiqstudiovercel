import type { Metadata } from "next";
import SubPage from "@/components/SubPage";

export const metadata: Metadata = { title: "Cookie Policy — LumiqStudio" };

export default function CookiesPage() {
  return (
    <SubPage eyebrow="Legal" title="Cookie Policy" intro="How and why we use cookies on lumiqstudio.com.">
      <p><em>Demo content — full policy to be updated.</em></p>
      <p>We use cookies to keep you signed in, remember your preferences, and understand how visitors use our site.</p>
      <h2>Essential cookies</h2>
      <p>Required for the site to function. They cannot be disabled.</p>
      <h2>Analytics cookies</h2>
      <p>Help us understand page performance and visitor behaviour. You can opt out at any time.</p>
      <h2>Managing cookies</h2>
      <p>You can control cookies through your browser settings or contact us at privacy@lumiqstudio.com.</p>
    </SubPage>
  );
}
