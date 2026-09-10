import React from "react";
import type { Metadata } from "next";
import { PageSEO } from "@/store/useCMSStore";

export function RenderSchema({ schema, id }: { schema: string; id: string }) {
  const trimmed = schema.trim();
  const hasScriptTag = /^<script/i.test(trimmed);
  let jsonContent = trimmed;

  if (hasScriptTag) {
    jsonContent = trimmed
      .replace(/^<script[^>]*>/i, "")
      .replace(/<\/script>$/i, "")
      .trim();
  }

  return React.createElement("script", {
    type: "application/ld+json",
    id: id,
    dangerouslySetInnerHTML: { __html: jsonContent },
  });
}

const getApiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_CMS_API_URL || "";
};

export async function getPageSEO(slug: string): Promise<PageSEO | null> {
  try {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) return null;
    // In pub-club-cms, the general `/api/pages` GET route requires admin session (unauthorized on client),
    // but the individual `/api/pages/[slug]` GET route is fully public. Thus, we fetch directly by slug.
    const response = await fetch(`${baseUrl}/api/pages/${slug}`, {
      next: { revalidate: 60 }, // Revalidate with ISR every 60 seconds
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const json = await response.json();
    
    if (json.success && json.data) {
      const page = json.data;
      const seo = page.seo || {};
      return {
        metaTitle: seo.metaTitle || page.metaTitle || null,
        metaDescription: seo.metaDescription || page.metaDescription || null,
        targetKeywords: seo.targetKeywords || page.targetKeywords || null,
        canonicalUrl: seo.canonicalUrl || page.canonicalUrl || null,
        noIndex: seo.noIndex ?? page.noIndex ?? false,
        featuredImage: seo.featuredImage || page.featuredImage || null,
        ogTitle: seo.ogTitle || page.ogTitle || null,
        ogDescription: seo.ogDescription || page.ogDescription || null,
        ogImage: seo.ogImage || page.ogImage || null,
        schema: seo.schema || page.schema || null,
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching page SEO for ${slug}:`, error);
    return null;
  }
}

export async function generatePageMetadata(
  slug: string,
  fallbackTitle: string,
  fallbackDescription: string
): Promise<Metadata> {
  const seo = await getPageSEO(slug);
  if (!seo) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
    };
  }

  const title = seo.metaTitle || fallbackTitle;
  const description = seo.metaDescription || fallbackDescription;

  return {
    title: title,
    description: description,
    keywords: seo.targetKeywords ? seo.targetKeywords.split(",").map(k => k.trim()) : undefined,
    alternates: {
      canonical: seo.canonicalUrl || undefined,
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noIndex,
    },
    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      images: seo.ogImage || seo.featuredImage ? [{ url: seo.ogImage || seo.featuredImage || "" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      images: seo.ogImage || seo.featuredImage ? [seo.ogImage || seo.featuredImage || ""] : undefined,
    },
  };
}
