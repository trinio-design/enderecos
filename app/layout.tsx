import type { Metadata, Viewport } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-albert-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Endereços — Trinio Checkout",
  description: "Fluxo de checkout mobile-first para e-commerce brasileiro.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={albertSans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
