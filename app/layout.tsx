import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Lumiq Studio — Where Stories Come Alive",
    template: "%s — Lumiq Studio",
  },
  description:
    "Lumiq Studio creates AI-powered story and companion experiences — helping children read and imagine, while giving older adults a gentle presence for conversation, reminders, and connection.",
  openGraph: {
    type: "website",
    siteName: "Lumiq Studio",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="lumiq-root flex min-h-screen flex-col">
          <div className="bg-layer">
            <div className="stars"></div>
            <div className="bokeh b1"></div>
            <div className="bokeh b2"></div>
            <div className="bokeh b3"></div>
            <div className="bokeh b4"></div>
            <div className="bokeh b5"></div>
            <div className="bokeh b6"></div>
          </div>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
