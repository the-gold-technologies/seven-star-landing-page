import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const cmsApiUrl = process.env.NEXT_PUBLIC_CMS_API_URL || "";
  try {
    if (!cmsApiUrl) {
      return new Response("User-agent: *\nAllow: /", {
        headers: { "Content-Type": "text/plain" },
      });
    }
    const res = await fetch(`${cmsApiUrl}/api/seo/robots`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return new Response("Robots config not found", { status: res.status });
    }

    const text = await res.text();

    return new Response(text, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error proxying robots.txt:", error);
    return new Response("User-agent: *\nAllow: /", {
      headers: { "Content-Type": "text/plain" },
    });
  }
}
