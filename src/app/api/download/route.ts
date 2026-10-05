import { NextResponse } from "next/server";
import JSZip from "jszip";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlsParam = searchParams.get("urls");
  const b64UrlsParam = searchParams.get("b64Urls");
  let singleUrl = searchParams.get("url");
  const b64 = searchParams.get("b64");
  const customFilename = searchParams.get("filename");

  // Decode base64 URL if provided to prevent Apache WAF / ModSecurity 403 blocks
  if (!singleUrl && b64) {
    try {
      singleUrl = Buffer.from(b64, "base64").toString("utf-8");
    } catch (e) {
      console.error("Failed to decode base64 URL parameter:", e);
    }
  }

  // Case 1: Single file download (PDF, Image, etc.)
  if (singleUrl) {
    try {
      const response = await fetch(singleUrl);
      if (!response.ok)
        throw new Error(`Failed to fetch file: ${response.statusText}`);

      const blob = await response.blob();
      const headers = new Headers();

      // Determine file extension and name
      let filename =
        customFilename ||
        singleUrl.split("/").pop()?.split("?")[0] ||
        "download";
      const contentType =
        response.headers.get("Content-Type") || "application/octet-stream";

      if (!filename.includes(".")) {
        if (contentType.includes("pdf")) filename += ".pdf";
        else if (contentType.includes("png")) filename += ".png";
        else if (contentType.includes("jpeg") || contentType.includes("jpg"))
          filename += ".jpg";
        else if (contentType.includes("webp")) filename += ".webp";
        else if (contentType.includes("svg")) filename += ".svg";
        else filename += ".pdf";
      }

      headers.set("Content-Disposition", `attachment; filename="${filename}"`);
      headers.set("Content-Type", contentType);

      return new Response(blob, {
        status: 200,
        headers,
      });
    } catch (error) {
      console.error("Single download error:", error);
      return NextResponse.json(
        { error: "Failed to download file" },
        { status: 500 },
      );
    }
  }

  // Case 2: Multi-file zip download
  let resolvedUrls: string[] = [];
  if (urlsParam) {
    resolvedUrls = urlsParam
      .split(",")
      .map((u) => decodeURIComponent(u.trim()))
      .filter(Boolean);
  } else if (b64UrlsParam) {
    try {
      const decoded = Buffer.from(b64UrlsParam, "base64").toString("utf-8");
      resolvedUrls = decoded
        .split(",")
        .map((u) => u.trim())
        .filter(Boolean);
    } catch (e) {
      console.error("Failed to decode b64Urls parameter:", e);
    }
  }

  if (resolvedUrls.length > 0) {
    try {
      const zip = new JSZip();

      // Fetch files in parallel
      const fetchPromises = resolvedUrls.map(async (url, idx) => {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Status ${res.status}`);
          const arrayBuffer = await res.arrayBuffer();
          // Extract file name
          let fileName = url.split("/").pop() || `menu-${idx + 1}.pdf`;
          // Strip query parameters
          fileName = fileName.split("?")[0];
          // Ensure it has an extension
          if (!fileName.includes(".")) {
            fileName += ".pdf";
          }
          zip.file(fileName, arrayBuffer);
        } catch (err) {
          console.error(`Failed to fetch file at ${url}:`, err);
        }
      });

      await Promise.all(fetchPromises);

      const content = await zip.generateAsync({ type: "arraybuffer" });

      const headers = new Headers();
      headers.set(
        "Content-Disposition",
        'attachment; filename="all-menus.zip"',
      );
      headers.set("Content-Type", "application/zip");

      return new Response(content, {
        status: 200,
        headers,
      });
    } catch (error) {
      console.error("Zipping files failed:", error);
      return NextResponse.json(
        { error: "Failed to create zip file" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
}
