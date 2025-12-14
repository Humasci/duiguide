import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "DUI Guide - What to Do After a DUI Arrest",
    template: "%s | DUI Guide",
  },
  description:
    "Arrested for DUI? Learn your rights, understand critical deadlines, and connect with local DUI attorneys. Free consultations available 24/7.",
  keywords: [
    "DUI",
    "DWI",
    "DUI attorney",
    "DUI lawyer",
    "DUI arrest",
    "DUI help",
    "license suspension",
    "DMV hearing",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "DUI Guide",
    title: "DUI Guide - What to Do After a DUI Arrest",
    description:
      "Arrested for DUI? Learn your rights, understand critical deadlines, and connect with local DUI attorneys.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
