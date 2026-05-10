import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CJB by Carolina Betancourt | Performance Marketing & Paid Media Strategy",
  description:
    "Estrategias de marketing digital basadas en datos que generan crecimiento real. Meta Ads, Performance Marketing, Sistema Filtro.",
  keywords: [
    "marketing digital",
    "ROAS",
    "performance marketing",
    "paid media",
    "CJB",
    "Carolina Betancourt",
    "Meta Ads",
    "Sistema Filtro",
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
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${jost.variable} antialiased bg-[#0A0F1E] text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
