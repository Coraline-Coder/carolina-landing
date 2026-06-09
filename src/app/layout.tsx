import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  verification: {
    facebook: "gmrq5eu6p5wfk1d8t2npyoeex3cwvb",
  },
  title: "Carolina Betancourt | Performance Marketing & Paid Media Strategy",
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
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1027187799634468');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:"none"}}
          src="https://www.facebook.com/tr?id=1027187799634468&ev=PageView&noscript=1" />
        </noscript>

        {/* ===== GOOGLE ANALYTICS 4 ===== */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-19E6F6BWZ4"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-19E6F6BWZ4', {
                send_page_view: true
              });
            `,
          }}
        />
        {/* WhatsApp Lead Tracking */}
        <Script id="wa-lead-tracking" strategy="afterInteractive">
          {`document.querySelectorAll('a[href*='"wa.me"']').forEach(function(btn){btn.addEventListener('click',function(){fbq('track','Lead')})});`}
        </Script>
</body>
    </html>
  );
}
