import type { Metadata } from "next";
import SubPage from "@/components/SubPage";

export const metadata: Metadata = { title: "Privacy Policy — LumiqStudio" };

export default function PrivacyPage() {
  return (
    <SubPage eyebrow="Legal" title="Privacy Policy" intro="How we collect, use, and protect your family's data.">
      <p><em>Demo content — full policy to be updated.</em></p>
      <p>LumiqStudio is committed to protecting the privacy of children and families. This page will outline the categories of data we collect, how we use them, and the rights you have over your information.</p>
      <h2>What we collect</h2>
      <p>Account details, story progress, and device usage needed to deliver the Lumiq experience.</p>
      <h2>How we use it</h2>
      <p>To personalize stories, sync across devices, and keep the platform safe.</p>
      <h2>Your choices</h2>
      <p>You can request export or deletion of your data at any time via privacy@lumiqstudio.com.</p>
    </SubPage>
  );
}
