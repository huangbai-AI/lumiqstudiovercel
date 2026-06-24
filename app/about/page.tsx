import type { Metadata } from "next";
import SubPage from "@/components/SubPage";

export const metadata: Metadata = {
  title: "About LumiqStudio — Storytelling by Arpha",
  description: "LumiqStudio is the storytelling and learning division of Arpha — helping families grow closer through AI-powered stories.",
};

export default function AboutPage() {
  return (
    <SubPage
      eyebrow="About"
      title="LumiqStudio by Arpha"
      intro="Smart storytelling from a smart home brand with 15+ years of building technology that brings families closer."
    >
      <p>
        LumiqStudio is the storytelling and learning division of <strong>Arpha</strong> — a smart
        home brand with over 15 years of experience creating technology that brings safety,
        convenience, and connection into everyday life.
      </p>

      <p>After building products for homes around the world, we began asking a bigger question:</p>

      <blockquote>What if technology could help families grow closer — not further apart?</blockquote>

      <p>That idea became LumiqStudio.</p>

      <h2>Why we exist</h2>
      <p>
        We believe screens should do more than entertain. They should inspire curiosity, creativity,
        communication, and meaningful moments between parents and children. That&apos;s why we created
        <strong> Lumiq</strong> — an AI-powered storytelling experience where kids don&apos;t just watch
        stories, they shape them.
      </p>

      <p>
        From classic fairy tales to choose-your-own adventures with dozens of endings, Lumiq
        transforms passive screen time into active imagination. Children can read, speak with AI,
        create characters, make decisions, and even turn their own ideas into real storybooks.
      </p>

      <h2>Designed with parents in mind</h2>
      <p>
        At the same time, parents stay in control through a safe and thoughtfully designed
        <strong> Parent Center</strong> — built to support healthy digital habits, age-appropriate
        experiences, and family trust.
      </p>

      <h2>A natural extension of the smart home vision</h2>
      <p>
        For us, LumiqStudio is a natural extension of the smart home vision: not just smarter homes,
        but <em>smarter growing together</em>.
      </p>

      <blockquote>
        Because the future of technology shouldn&apos;t only connect devices — it should connect
        families.
      </blockquote>
    </SubPage>
  );
}
