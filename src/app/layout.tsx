import React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display, EB_Garamond } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import Script from "next/script";
import FooterScripts from "@/components/layout/FooterScripts";
import { Toaster } from "react-hot-toast";
import { RenderSchema } from "@/utils/seo";
import CookieBanner from "@/components/layout/CookieBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

const getApiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_CMS_API_URL || "";
};

async function getGlobalSEO() {
  try {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) return null;
    const response = await fetch(`${baseUrl}/api/seo/global`, {
      next: { revalidate: 60 }, // Revalidate with ISR every 60 seconds
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const json = await response.json();
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Error fetching global SEO for metadata:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const globalSEO = await getGlobalSEO();

  const title =
    globalSEO?.siteTitle || "Seven Stars | Countryside Gastro Club Pub";
  const description =
    globalSEO?.siteDescription ||
    "Experience luxury dining, elegant ambience, and unforgettable events at Seven Stars Gastro Club Pub.";
  const favicon = globalSEO?.favicon || "/favicon.ico";

  return {
    title,
    description,
    icons: {
      icon: favicon,
    },
    other: globalSEO?.searchConsoleId
      ? {
          "google-site-verification": globalSEO.searchConsoleId,
        }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalSEO = await getGlobalSEO();

  return (
    <html lang="en">
      <head>
        {/* Dynamic Favicon */}
        {globalSEO?.favicon && (
          <link
            rel="icon"
            href={`${globalSEO.favicon}?v=${globalSEO.updatedAt ? new Date(globalSEO.updatedAt).getTime() : "1"}`}
            type={
              globalSEO.favicon.match(/\.(jpg|jpeg)$/i)
                ? "image/jpeg"
                : globalSEO.favicon.match(/\.png$/i)
                  ? "image/png"
                  : "image/x-icon"
            }
          />
        )}

        {/* Google Tag Manager (GTM) */}
        {globalSEO?.gtmId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${globalSEO.gtmId}');
              `,
            }}
          />
        )}

        {/* Google Analytics (GA4) */}
        {globalSEO?.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${globalSEO.googleAnalyticsId}`}
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
                  gtag('config', '${globalSEO.googleAnalyticsId}');
                `,
              }}
            />
          </>
        )}

        {/* Custom Header Scripts */}
        {globalSEO?.customHeaderScripts &&
          React.createElement("header-scripts", {
            dangerouslySetInnerHTML: { __html: globalSEO.customHeaderScripts },
          })}

        {/* Global Schema */}
        {globalSEO?.schema && (
          <RenderSchema schema={globalSEO.schema} id="global-schema" />
        )}
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${ebGaramond.variable} font-sans antialiased text-black bg-white`}
      >
        {/* GTM Noscript */}
        {globalSEO?.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${globalSEO.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}

        <LenisProvider>{children}</LenisProvider>
        <Toaster position="top-center" />
        <CookieBanner />

        {/* Custom Footer Scripts */}
        {globalSEO?.customFooterScripts && (
          <FooterScripts html={globalSEO.customFooterScripts} />
        )}
      </body>
    </html>
  );
}
