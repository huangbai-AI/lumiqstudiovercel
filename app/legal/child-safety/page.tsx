import type { Metadata } from "next";
import SubPage from "@/components/SubPage";

export const metadata: Metadata = { title: "Child Safety — LumiqStudio" };

export default function ChildSafetyPage() {
  return (
    <SubPage eyebrow="Legal" title="Child Safety" intro="Our commitment to the safety and wellbeing of every child using Lumiq.">
      <p>
        Lumiq is designed from the ground up for children. Safety is not an afterthought — it is the foundation of every feature we ship.
      </p>
      <h2>No ads, no tracking</h2>
      <p>We never show advertising to children and we do not sell or share child data with third parties.</p>
      <h2>Parental controls</h2>
      <p>Every child profile is managed through a PIN-protected Parent Center. Parents control content access, screen time, and purchases.</p>
      <h2>Age-appropriate content</h2>
      <p>All stories and features are reviewed and rated for age appropriateness. Age filters ensure children only see content suitable for them.</p>
      <h2>COPPA compliance</h2>
      <p>We comply with the Children&apos;s Online Privacy Protection Act (COPPA) and similar regulations worldwide.</p>
      <h2>Report a concern</h2>
      <p>If you have a concern about child safety on our platform, please contact safety@lumiqstudio.com immediately.</p>
    </SubPage>
  );
}
