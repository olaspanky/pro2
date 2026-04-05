import type { Metadata } from 'next';
import { Bebas_Neue, Lora, Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const bebas  = Bebas_Neue ({ weight: '400',              subsets: ['latin'], variable: '--font-bebas'  });
const lora   = Lora        ({ weight: ['400','600','700'], subsets: ['latin'], variable: '--font-lora'   });
const outfit = Outfit       ({ weight: ['300','400','500','600','700'], subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'ProSolar Energy — Commercial & Industrial Solar Solutions',
  description: 'Eliminate diesel costs with industrial-grade solar from 16kVA to 10MW. Lease-to-own or Energy as a Service. ProSolar Energy Nigeria.',
  openGraph: {
    title: 'ProSolar Energy — C&I Solar Solutions',
    description: 'Stop paying for diesel. Power your business with solar.',
    url: 'https://cni.prosolarng.com',
    siteName: 'ProSolar Energy Nigeria',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${lora.variable} ${outfit.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-N39LNM2P');
        `}</Script>

        {/* Google Tag (GA4 + Google Ads) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16892943941" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16892943941');
          gtag('config', 'G-TW7K38S0SJ');
        `}</Script>

        {/* Facebook Pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','382348839135035');fbq('track','PageView');
        `}</Script>

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","qs7yo9pex7");
        `}</Script>

        {/* Hotjar — replace 0000000 with your Site ID */}
        <Script id="hotjar" strategy="afterInteractive">{`
          (function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:0000000,hjsv:6};a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}</Script>
      </head>
      <body>
        {/* GTM noscript */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NBTNTB7C"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
        </noscript>
        {children}
      </body>
    </html>
  );
}
