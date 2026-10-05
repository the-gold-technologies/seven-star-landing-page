"use client";

import { Download, ChevronLeft, ChevronRight, Beer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { parseMarkdownLinks } from "@/utils/text";
import { downloadFile } from "@/utils/download";

gsap.registerPlugin(ScrollTrigger);

interface MenuSection {
  id: string;
  title: string;
  subtitle?: string;
  pdf?: string;
  image?: string;
  pages?: Array<{ image?: string }>;
}

export default function Menu({ data = {} }: { data?: any }) {
  const menuSections: MenuSection[] = Array.isArray(data.menuSections)
    ? data.menuSections
    : [];

  const ref = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [pageIdx, setPageIdx] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const flipPageRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".menu-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".menu-header",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (mobileNavRef.current) {
      const activeEl = mobileNavRef.current.children[sectionIdx] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [sectionIdx]);

  if (menuSections.length === 0) return null;

  const changePage = (newSection: number, newPage: number) => {
    if (isFlipping) return;
    setIsFlipping(true);

    const isForward =
      newSection > sectionIdx ||
      (newSection === sectionIdx && newPage > pageIdx);

    const tl = gsap.timeline({
      onComplete: () => {
        setSectionIdx(newSection);
        setPageIdx(newPage);
        setIsFlipping(false);
        gsap.set(flipPageRef.current, { rotateY: 0, opacity: 0 });
        gsap.set(shadowRef.current, { opacity: 0 });
      },
    });

    // Reset page state
    gsap.set(flipPageRef.current, {
      opacity: 1,
      rotateY: isForward ? 0 : -180,
      transformOrigin: isForward ? "left center" : "right center",
      zIndex: 100,
    });

    // 1. Initial lift & shadow
    tl.to(shadowRef.current, { opacity: 0.3, duration: 0.2 });

    // 2. Flip Animation
    tl.to(flipPageRef.current, {
      rotateY: isForward ? -180 : 0,
      duration: 1.0,
      ease: "power2.inOut",
      onUpdate: function () {
        const progress = this.progress();
        const brightness =
          progress < 0.5 ? 1 - progress * 0.4 : 0.6 + (progress - 0.5) * 0.8;
        gsap.set(flipPageRef.current, { filter: `brightness(${brightness})` });
      },
    });

    // 3. Fade content mid-flip
    tl.to(
      ".active-page-content",
      {
        opacity: 0,
        duration: 0.3,
      },
      0.3,
    );

    tl.to(
      ".active-page-content",
      {
        opacity: 1,
        duration: 0.4,
      },
      0.7,
    );
  };

  const next = () => {
    const currentSection = menuSections[sectionIdx];
    const totalPages = currentSection?.pages?.length || 1;
    if (pageIdx < totalPages - 1) {
      changePage(sectionIdx, pageIdx + 1);
    } else if (sectionIdx < menuSections.length - 1) {
      changePage(sectionIdx + 1, 0);
    }
  };

  const prev = () => {
    if (pageIdx > 0) {
      changePage(sectionIdx, pageIdx - 1);
    } else if (sectionIdx > 0) {
      const prevSection = menuSections[sectionIdx - 1];
      const prevPages = prevSection?.pages?.length || 1;
      changePage(sectionIdx - 1, prevPages - 1);
    }
  };

  const activeSection = menuSections[sectionIdx] || menuSections[0];
  const activePage =
    activeSection?.pages?.[pageIdx] || activeSection?.pages?.[0] || null;

  // Resolve active section or page download URL (PDF or Image)
  const getActiveDownloadUrl = () => {
    if (activeSection?.pdf && activeSection.pdf !== "#") {
      return activeSection.pdf;
    }
    if (
      Array.isArray(data.menuPdfs) &&
      data.menuPdfs[sectionIdx] &&
      data.menuPdfs[sectionIdx] !== "#"
    ) {
      return data.menuPdfs[sectionIdx];
    }
    if (activePage?.image) {
      return activePage.image;
    }
    if (activeSection?.image) {
      return activeSection.image;
    }
    return null;
  };

  const activeDownloadUrl = getActiveDownloadUrl();
  const isImageDownload = Boolean(
    activeDownloadUrl &&
    /\.(jpe?g|png|webp|svg|gif|avif)(\?.*)?$/i.test(activeDownloadUrl),
  );
  const downloadTypeLabel = isImageDownload ? "Image" : "PDF";

  const handleDownload = async () => {
    const fileUrl = getActiveDownloadUrl();

    if (!fileUrl) {
      setDownloadToast(
        `No download available for ${activeSection?.title || "this section"}.`,
      );
      setTimeout(() => setDownloadToast(null), 3000);
      return;
    }

    setIsDownloading(true);
    try {
      setDownloadToast(
        `Downloading ${activeSection?.title || "menu"} ${downloadTypeLabel}...`,
      );
      const cleanTitle = (activeSection?.title || "menu")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const ext = isImageDownload
        ? fileUrl.split(".").pop()?.split("?")[0] || "jpg"
        : "pdf";
      const filename = `${cleanTitle}-menu.${ext}`;

      await downloadFile(fileUrl, filename);
    } catch (err) {
      console.error("Download failed:", err);
      window.open(fileUrl, "_blank");
    } finally {
      setIsDownloading(false);
      setTimeout(() => setDownloadToast(null), 3000);
    }
  };

  if (!activeSection) return null;

  return (
    <section
      ref={ref}
      id="menu"
      className="py-24 bg-[#faf9f6] relative overflow-hidden border-t border-black/5"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      {/* Download Toast */}
      {downloadToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] bg-black/90 text-white text-[13px] px-6 py-3 rounded-full shadow-2xl tracking-wide transition-all animate-fade-in">
          {downloadToast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="menu-header mb-16 flex flex-col gap-6 border-b border-black/5 pb-12 w-full">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] tracking-[0.4em] text-[#475DB1] uppercase font-bold flex items-center gap-3">
              <span className="font-serif text-2xl text-black/10 leading-none">
                {data.sectionNumber}
              </span>
              <span className="w-6 h-[1px] bg-primary-600/30"></span>
              {data.tagline}
            </span>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <h3 className="text-4xl md:text-5xl font-serif text-black leading-tight tracking-tight">
                {data.headingPart1}{" "}
                <em className="not-italic text-[#475DB1] font-light">
                  {data.headingItalicHighlight}
                </em>
              </h3>
            </div>
          </div>
          <p className="text-neutral-600 leading-relaxed font-light text-lg max-w-3xl">
            {parseMarkdownLinks(data.description)}
          </p>
        </div>

        {/* 3D Menu Book with Realistic Physics */}
        <div className="relative w-full max-w-6xl perspective-3000">
          <div className="menu-book relative flex flex-col md:flex-row h-[750px] md:h-[850px] bg-[#DED7CF] shadow-[0_60px_120px_rgba(0,0,0,0.18)] rounded-r-lg rounded-l-md overflow-hidden border-l-[15px] border-[#475DB1]">
            {/* Folder Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />

            {/* LEFT SIDE (Static Sidebar Navigation - Hidden on Mobile) */}
            <div className="hidden md:flex w-[35%] bg-[#F2EDE7] relative border-r border-black/10 shrink-0">
              <div className="absolute inset-0 opacity-[0.06] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
              <div className="p-12 flex flex-col items-center justify-between h-full text-center py-20 border-r-[25px] border-black/5 w-full">
                <div className="flex flex-col items-center">
                  <h4 className="text-3xl font-serif text-black mb-1 tracking-tight">
                    {data.locationName}
                  </h4>
                  <p className="text-[#475DB1] text-[10px] uppercase tracking-[0.3em]">
                    {data.locationCounty}
                  </p>
                </div>

                <div className="space-y-8 w-full px-2">
                  {menuSections.map((s, i) => (
                    <button
                      key={s.id || i}
                      onClick={() => changePage(i, 0)}
                      className={`block w-full text-center text-[11px] uppercase tracking-[0.4em] font-bold transition-all relative group py-1 cursor-pointer ${sectionIdx === i ? "text-black scale-110" : "text-neutral-400 hover:text-black"}`}
                    >
                      {s.title}
                      <div
                        className={`absolute -bottom-2 left-1/4 right-1/4 h-[1px] bg-[#475DB1] transition-transform duration-500 ${sectionIdx === i ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"}`}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#475DB1]/5 hover:bg-[#475DB1]/10 flex items-center justify-center text-[#475DB1] hover:scale-110 active:scale-95 transition-all duration-300">
                    <Beer size={24} />
                  </div>
                  <span className="text-[10px] tracking-[0.27em] font-bold text-[#475DB1] uppercase text-center">
                    Craft & Culinary
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE (Content Area) */}
            <div className="flex-grow bg-[#FDFBF7] relative h-full flex flex-col">
              {/* Internal Paper Texture */}
              <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

              {/* Realistic Shadow for Flip Gutter */}
              <div
                ref={shadowRef}
                className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black/20 to-transparent z-40 opacity-0 pointer-events-none"
              />

              {/* THE FLIPPING PAGE (Enhanced 3D Geometry) */}
              <div
                ref={flipPageRef}
                className="absolute inset-0 bg-[#F2EDE7] z-50 opacity-0 pointer-events-none origin-left shadow-[20px_0_50px_rgba(0,0,0,0.15)] border-l border-black/10"
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute inset-0 opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Mobile Navigation Header */}
              <div
                ref={mobileNavRef}
                className="flex md:hidden w-full overflow-x-auto no-scrollbar border-b border-black/5 px-6 py-4 gap-6 shrink-0 z-20 relative bg-[#FDFBF7]"
              >
                {menuSections.map((s, i) => (
                  <button
                    key={s.id || i}
                    onClick={() => changePage(i, 0)}
                    className={`text-[11px] uppercase tracking-[0.3em] font-bold transition-all relative shrink-0 py-1.5 ${
                      sectionIdx === i
                        ? "text-[#475DB1] scale-105"
                        : "text-neutral-400 hover:text-black"
                    }`}
                  >
                    {s.title}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-[2px] bg-[#475DB1] transition-transform duration-500 origin-left ${
                        sectionIdx === i ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* CONTENT CONTAINER */}
              <div className="active-page-content p-0 sm:p-2 md:p-3 h-full flex flex-col relative z-10">
                <div
                  data-lenis-prevent
                  data-lenis-prevent-wheel
                  data-lenis-prevent-touch
                  className="flex-grow overflow-y-auto no-scrollbar scroll-smooth w-full h-full overscroll-contain"
                  style={{
                    WebkitOverflowScrolling: "touch",
                    touchAction: "pan-y",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                  }}
                >
                  {/* DISPLAY MENU IMAGE OR EMBEDDED PDF */}
                  <div className="w-full h-full flex justify-center items-start">
                    {(() => {
                      const pdfUrl =
                        activeSection?.pdf ||
                        (Array.isArray(data.menuPdfs) &&
                          data.menuPdfs[sectionIdx]) ||
                        null;

                      const pageImage =
                        activePage?.image || activeSection?.image;

                      if (pageImage) {
                        return (
                          <img
                            src={pageImage}
                            alt={activeSection?.title || "Menu Sheet"}
                            className="w-full h-auto block object-cover rounded-sm"
                          />
                        );
                      }

                      if (pdfUrl && pdfUrl !== "#") {
                        const isImage =
                          pdfUrl.endsWith(".jpg") ||
                          pdfUrl.endsWith(".jpeg") ||
                          pdfUrl.endsWith(".png") ||
                          pdfUrl.endsWith(".webp") ||
                          pdfUrl.endsWith(".svg");

                        if (isImage) {
                          return (
                            <img
                              src={pdfUrl}
                              alt={activeSection?.title || "Menu Sheet"}
                              className="w-full h-auto block object-cover rounded-sm"
                            />
                          );
                        }

                        // Display uploaded PDF file in embedded iframe
                        return (
                          <iframe
                            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                            title={activeSection?.title || "Menu Sheet PDF"}
                            className="w-full h-full min-h-[650px] border-0 rounded-sm"
                          />
                        );
                      }

                      return (
                        <img
                          src="/summer-menu.jpg"
                          alt={activeSection?.title || "Summer Menu"}
                          className="w-full h-auto block object-cover rounded-sm"
                        />
                      );
                    })()}
                  </div>
                </div>

                {/* Elegant Navigation & Download */}
                <div className="mt-auto pt-6 border-t border-black/5 flex justify-between items-center bg-[#FDFBF7]/80 backdrop-blur-sm z-20">
                  <button
                    onClick={prev}
                    disabled={isFlipping || (sectionIdx === 0 && pageIdx === 0)}
                    className={`flex items-center gap-4 text-[12px] uppercase tracking-widest font-bold transition-all ${sectionIdx === 0 && pageIdx === 0 ? "opacity-0 cursor-default" : "text-black hover:text-[#475DB1] cursor-pointer"}`}
                  >
                    <ChevronLeft size={20} /> Previous
                  </button>

                  <button
                    id="menu-download-btn"
                    onClick={handleDownload}
                    disabled={isDownloading || !activeDownloadUrl}
                    aria-label={`Download ${activeSection?.title || "Menu"} (${downloadTypeLabel} Format)`}
                    title={
                      activeDownloadUrl
                        ? `Download ${activeSection?.title || "menu"} (${downloadTypeLabel} Format)`
                        : `No download available for ${activeSection?.title || "this menu"}`
                    }
                    className={`transition-colors flex items-center gap-2 ${
                      isDownloading
                        ? "text-[#475DB1] animate-pulse cursor-wait"
                        : activeDownloadUrl
                          ? "text-neutral-400 hover:text-[#475DB1] cursor-pointer"
                          : "text-neutral-300 opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <Download size={24} />
                  </button>

                  <button
                    onClick={next}
                    disabled={
                      isFlipping ||
                      (sectionIdx === menuSections.length - 1 &&
                        pageIdx === (activeSection?.pages?.length || 1) - 1)
                    }
                    className={`flex items-center gap-4 text-[12px] uppercase tracking-widest font-bold transition-all ${sectionIdx === menuSections.length - 1 && pageIdx === (activeSection?.pages?.length || 1) - 1 ? "opacity-0 cursor-default" : "text-black hover:text-[#475DB1] cursor-pointer"}`}
                  >
                    Turn Page <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global CTA */}
        <div className="mt-24 text-center">
          <a
            href={data.ctaLink}
            className="inline-flex items-center px-14 py-6 bg-[#475DB1] hover:bg-[#475DB1]/90 text-white uppercase tracking-[0.2em] text-[12px] font-bold transition-all rounded-full shadow-xl hover:shadow-[#475DB1]/20 hover:scale-105 duration-300"
          >
            {data.ctaText}
          </a>
        </div>
      </div>

      <style jsx global>{`
        .perspective-3000 {
          perspective: 3500px;
        }
        .menu-book {
          transform-style: preserve-3d;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
        }
        .no-scrollbar::-webkit-scrollbar-thumb,
        .no-scrollbar::-webkit-scrollbar-track {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        .no-scrollbar *::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .no-scrollbar * {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>
    </section>
  );
}
