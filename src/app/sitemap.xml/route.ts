import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const cmsApiUrl = process.env.NEXT_PUBLIC_CMS_API_URL || "";
  try {
    if (!cmsApiUrl) {
      return new Response("Error loading sitemap: CMS URL not configured", { status: 500 });
    }
    const res = await fetch(`${cmsApiUrl}/api/seo/sitemap`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return new Response("Sitemap not found", { status: res.status });
    }

    const xml = await res.text();

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error proxying sitemap.xml:", error);
    return new Response("Error loading sitemap", { status: 500 });
  }
}
