/**
 * Utility to download files (PDFs, images, etc.) reliably in both local and production environments.
 *
 * Handles:
 * 1. Cloudinary URLs with direct attachment transformation or CORS fetch.
 * 2. Cross-origin browser download using Blob URLs.
 * 3. Base64 encoding for proxy fallback (/api/download?b64=...) to avoid Apache WAF / ModSecurity 403 Forbidden blocks.
 */

export function getSafeFilename(url: string, preferredName?: string): string {
  const urlWithoutQuery = url.split("?")[0];
  const urlExtension = urlWithoutQuery.includes(".")
    ? urlWithoutQuery.split(".").pop()?.toLowerCase()
    : "";

  if (preferredName) {
    if (preferredName.includes(".")) return preferredName;
    if (urlExtension) return `${preferredName}.${urlExtension}`;
    return `${preferredName}.pdf`;
  }

  const rawFilename = urlWithoutQuery.split("/").pop() || "menu-download";
  return rawFilename.includes(".") ? rawFilename : `${rawFilename}.pdf`;
}

/**
 * Inserts Cloudinary's fl_attachment flag so Cloudinary directly serves
 * the response with Content-Disposition: attachment; filename="...".
 */
export function getCloudinaryAttachmentUrl(
  url: string,
  filename?: string,
): string | null {
  if (!url.includes("res.cloudinary.com")) return null;

  const safeName = filename
    ? encodeURIComponent(filename.replace(/[^a-zA-Z0-9._-]/g, "_"))
    : "";
  const flag = safeName ? `fl_attachment:${safeName}` : "fl_attachment";

  if (url.includes("/upload/")) {
    if (url.includes("fl_attachment")) return url;
    return url.replace("/upload/", `/upload/${flag}/`);
  }

  return null;
}

/**
 * Downloads a file via client-side fetch (blob) or Cloudinary attachment URL,
 * with Base64 proxy fallback.
 */
export async function downloadFile(
  url: string,
  preferredName?: string,
): Promise<void> {
  if (!url || url === "#") {
    throw new Error("Invalid file URL");
  }

  const filename = getSafeFilename(url, preferredName);

  // Strategy 1: Direct client-side fetch -> blob -> objectURL
  // Works with Cloudinary and any server with Access-Control-Allow-Origin: *
  try {
    const res = await fetch(url, { mode: "cors" });
    if (res.ok) {
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
      return;
    }
  } catch (err) {
    console.warn(
      "Direct blob download failed, trying alternate strategy:",
      err,
    );
  }

  // Strategy 2: Cloudinary native attachment flag (forces browser download dialog)
  const cloudinaryUrl = getCloudinaryAttachmentUrl(url, filename);
  if (cloudinaryUrl) {
    const link = document.createElement("a");
    link.href = cloudinaryUrl;
    link.download = filename;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
    return;
  }

  // Strategy 3: Internal proxy with Base64 encoding to bypass Apache WAF / ModSecurity 403
  try {
    const b64 =
      typeof window !== "undefined"
        ? btoa(url)
        : Buffer.from(url).toString("base64");
    const proxyUrl = `/api/download?b64=${encodeURIComponent(b64)}&filename=${encodeURIComponent(filename)}`;
    const link = document.createElement("a");
    link.href = proxyUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    return;
  } catch (err) {
    console.error("Proxy download failed:", err);
  }

  // Final fallback: Direct browser navigation/open
  window.open(url, "_blank");
}
