import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CJB | Performance Marketing & Paid Media Strategy",
  description:
    "Estrategias de marketing digital basadas en datos que generan crecimiento real. ROAS 4.2x, +12M Ad Spend gestionado, 47% reducción en CPA.",
  keywords: [
    "marketing digital",
    "ROAS",
    "performance marketing",
    "paid media",
    "Carolina Betancourt",
    "ad spend",
    "CPA",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-[#0B0E18] text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
