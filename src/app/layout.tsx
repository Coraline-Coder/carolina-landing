import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CJB | Performance Marketing & Paid Media Strategy",
  description:
    "Estrategia de Performance Marketing y Meta Ads por Carolina Betancourt. ROAS real, sistema probado, resultados medibles.",
  keywords: [
    "Meta Ads",
    "Performance Marketing",
    "ROAS",
    "Paid Media",
    "Carolina Betancourt",
    "Facebook Ads",
    "Instagram Ads",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
