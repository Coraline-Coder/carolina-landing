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
  title: "Carolina Betancourt | Meta Ads Strategy & Performance Marketing",
  description:
    "Especialista en Meta Ads con el Sistema Filtro: optimización de campañas en Facebook, Instagram y WhatsApp para maximizar tu retorno de inversión.",
  keywords: [
    "Meta Ads",
    "Facebook Ads",
    "Instagram Ads",
    "WhatsApp Ads",
    "performance marketing",
    "Carolina Betancourt",
    "Sistema Filtro",
    "optimización de campañas",
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
