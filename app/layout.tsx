import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "PG Manager Pro | Smart PG Management Software",
    template: "%s | PG Manager Pro",
  },
  description:
    "PG Manager Pro helps PG owners manage tenants, rooms, rent, electricity billing, complaints, staff, and multi-branch operations from one modern dashboard.",
  keywords: [
    "PG management software",
    "hostel management",
    "rent collection automation",
    "tenant management",
    "co-living operations",
    "PG Manager Pro",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PG Manager Pro | Smart PG Management Software",
    description:
      "Manage rooms, tenants, rent, complaints, electricity, and operations from one powerful dashboard.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PG Manager Pro",
    description:
      "A premium modern SaaS platform for PG owners to automate and grow operations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-[#1F2D3D]">{children}</body>
    </html>
  );
}
