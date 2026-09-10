"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import PageLoader from "@/components/layout/PageLoader";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: true,
});

import { SnowEffect } from "./components/SnowEffect";
import { HeroSection } from "./components/HeroSection";
import { IntroSection } from "./components/IntroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { MenusSection } from "./components/MenusSection";
import { DishesCarousel } from "./components/DishesCarousel";
import { ReservationSection } from "./components/ReservationSection";

import { notFound } from "next/navigation";
import { useCMSStore } from "@/store/useCMSStore";

export default function ChristmasPage() {
  const { fetchPage, pages, isLoading } = useCMSStore();

  useEffect(() => {
    fetchPage("christmas").catch(console.error);
  }, [fetchPage]);

  const pageData = pages["christmas"] || {};
  const sections = pageData.sections || {};
  const storeLoading = isLoading["christmas"] ?? true;

  // Visibility guard: if loaded and not published, render 404
  if (!storeLoading && pageData.visibility !== "published") {
    notFound();
  }

  const [loading, setLoading] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const santaRef = useRef<HTMLDivElement>(null);

  // Audio setup effect
  useEffect(() => {
    if (storeLoading) return;

    const heroData = sections["ChristmasHero"] || {};
    const musicTrack = heroData.musicTrack || "";

    // If set to None, disabled, or empty, do not play music
    if (
      !musicTrack ||
      musicTrack.toLowerCase() === "none" ||
      musicTrack.toLowerCase() === "disabled"
    ) {
      setIsAudioPlaying(false);
      audioRef.current = null;
      return;
    }

    const audio = new Audio(musicTrack);
    audio.loop = true;
    audio.volume = 0.35; // Soft ambient volume
    audioRef.current = audio;

    // Handle source load errors (e.g. invalid/deleted custom URLs returning 404 HTML)
    const handleError = () => {
      console.warn(`Audio source failed to load: ${musicTrack}.`);
      setIsAudioPlaying(false);
    };
    audio.addEventListener("error", handleError);

    const playAudio = () => {
      audio
        .play()
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay blocked, waiting for user interaction:", err);
          const startPlayOnInteract = () => {
            audio
              .play()
              .then(() => {
                setIsAudioPlaying(true);
              })
              .catch((playErr) =>
                console.log("Autoplay failed after interaction:", playErr),
              );
            window.removeEventListener("click", startPlayOnInteract);
            window.removeEventListener("touchstart", startPlayOnInteract);
          };
          window.addEventListener("click", startPlayOnInteract);
          window.addEventListener("touchstart", startPlayOnInteract);
        });
    };

    const audioTimer = setTimeout(playAudio, 1000);

    return () => {
      clearTimeout(audioTimer);
      audio.removeEventListener("error", handleError);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [storeLoading, sections]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch((err) => {
          console.log("Play failed:", err);
        });
    }
  };

  // Carousel State for Dishes
  const [activeDishIdx, setActiveDishIdx] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const dishContentRef = useRef<HTMLDivElement>(null);
  const slideDirectionRef = useRef<"next" | "prev">("next");

  // Tab State for Menus
  const [activeMenuTab, setActiveMenuTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);

  // Autoplay effect for dishes carousel
  useEffect(() => {
    if (loading || isAutoplayPaused) return;

    const currentDishesList = sections["ChristmasDishes"]?.dishesList || [];
    if (!currentDishesList || currentDishesList.length === 0) return;

    const interval = setInterval(() => {
      slideDirectionRef.current = "next";
      const nextIdx = (activeDishIdx + 1) % currentDishesList.length;
      // Animate out first, then set index
      if (dishContentRef.current) {
        gsap.to(dishContentRef.current, {
          opacity: 0,
          x: -35,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            setActiveDishIdx(nextIdx);
          },
        });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [activeDishIdx, loading, isAutoplayPaused, sections]);

  const handleMenuTabChange = (idx: number) => {
    if (idx === activeMenuTab || !menuContentRef.current) return;

    // Animate out
    gsap.to(menuContentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveMenuTab(idx);
      },
    });
  };

  const handleDishChange = (newIdx: number) => {
    if (newIdx === activeDishIdx || !dishContentRef.current) return;

    // Determine direction based on index diff
    if (newIdx > activeDishIdx) {
      slideDirectionRef.current = "next";
    } else {
      slideDirectionRef.current = "prev";
    }

    const outX = slideDirectionRef.current === "next" ? -35 : 35;

    // Animate out
    gsap.to(dishContentRef.current, {
      opacity: 0,
      x: outX,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveDishIdx(newIdx);
      },
    });
  };

  useEffect(() => {
    if (!storeLoading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [storeLoading]);

  useEffect(() => {
    if (loading) return;

    const updateIndicator = () => {
      if (!tabsRef.current || !indicatorRef.current) return;
      const activeTabEl = tabsRef.current.children[
        activeMenuTab + 1
      ] as HTMLElement; // +1 to account for the absolute span at index 0
      if (activeTabEl) {
        gsap.to(indicatorRef.current, {
          left: activeTabEl.offsetLeft,
          width: activeTabEl.offsetWidth,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    // Quick delay to ensure initial element layout is calculated properly
    const layoutTimer = setTimeout(updateIndicator, 50);

    return () => {
      window.removeEventListener("resize", updateIndicator);
      clearTimeout(layoutTimer);
    };
  }, [activeMenuTab, loading]);

  // Animate Menu Tab details in
  useEffect(() => {
    if (loading || !menuContentRef.current) return;

    gsap.fromTo(
      menuContentRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [activeMenuTab, loading]);

  // Animate Dish details in (slides right-to-left or left-to-right)
  useEffect(() => {
    if (loading || !dishContentRef.current) return;

    const inX = slideDirectionRef.current === "next" ? 35 : -35;

    gsap.fromTo(
      dishContentRef.current,
      { opacity: 0, x: inX },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [activeDishIdx, loading]);

  useEffect(() => {
    if (loading) return;

    // Initialize smooth scrolling using Lenis locally on this page
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
    });

    // Update ScrollTrigger on scroll
    lenis.on("scroll", ScrollTrigger.update);

    // Synchronize GSAP ticker frame updates with Lenis
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Parallax Background for Hero
      if (heroBgRef.current && heroRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Parallax effect on Santa image
      if (santaRef.current && heroRef.current) {
        gsap.to(santaRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Hero Animations
      gsap.fromTo(
        ".christmas-hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.2 },
      );
      gsap.fromTo(
        ".christmas-hero-desc",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 },
      );
      gsap.fromTo(
        ".christmas-hero-cta",
        {
          opacity: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.7,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.7,
        },
      );

      // Section reveal animations
      const revealElements = gsap.utils.toArray(".reveal-section");
      revealElements.forEach((el: any) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, [loading]);

  const nextDish = () => {
    const currentDishesList = sections["ChristmasDishes"]?.dishesList || [];
    const len = currentDishesList.length;
    if (len === 0) return;
    const nextIdx = (activeDishIdx + 1) % len;
    handleDishChange(nextIdx);
  };

  const prevDish = () => {
    const currentDishesList = sections["ChristmasDishes"]?.dishesList || [];
    const len = currentDishesList.length;
    if (len === 0) return;
    const prevIdx = (activeDishIdx - 1 + len) % len;
    handleDishChange(prevIdx);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#faf9f6] text-neutral-800 overflow-x-hidden relative"
    >
      <PageLoader isLoading={loading} />
      <SnowEffect />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection
          heroRef={heroRef}
          heroBgRef={heroBgRef}
          data={sections["ChristmasHero"] || {}}
        />

        {/* SECTION 2A: INTRO & WHY CHOOSE US (Light background) */}
        <IntroSection data={sections["ChristmasIntro"] || {}} />

        {/* SECTION 4: FESTIVE MENUS SHOWCASE (Tabbed View with Food Imagery) */}
        <MenusSection
          activeMenuTab={activeMenuTab}
          handleMenuTabChange={handleMenuTabChange}
          tabsRef={tabsRef}
          indicatorRef={indicatorRef}
          menuContentRef={menuContentRef}
          data={sections["ChristmasMenus"] || {}}
        />

        {/* SECTION 2B: SPECIAL FEATURES & INCENTIVES (Dark background for color breakage) */}
        <FeaturesSection data={sections["ChristmasFeatures"] || {}} />

        {/* SECTION 5: SPECIAL DISHES CAROUSEL */}
        <DishesCarousel
          activeDishIdx={activeDishIdx}
          prevDish={prevDish}
          nextDish={nextDish}
          handleDishChange={handleDishChange}
          dishContentRef={dishContentRef}
          setIsAutoplayPaused={setIsAutoplayPaused}
          data={sections["ChristmasDishes"] || {}}
        />

        {/* Footer Contact & Reservations Block */}
        <ReservationSection data={sections["ChristmasReservation"] || {}} />
      </main>

      {/* Floating Music Control Button */}
      {(() => {
        const heroData = sections["ChristmasHero"] || {};
        const musicTrack =
          heroData.musicTrack !== undefined ? heroData.musicTrack : "";
        if (
          !musicTrack ||
          musicTrack.toLowerCase() === "none" ||
          musicTrack.toLowerCase() === "disabled"
        ) {
          return null;
        }
        return (
          <button
            onClick={toggleMusic}
            className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-105 active:scale-95 ${
              isAudioPlaying
                ? "bg-[#B91C1C]/25 border-[#B91C1C]/40 text-red-200 shadow-[0_0_15px_rgba(185,28,28,0.3)] hover:bg-[#B91C1C]/35"
                : "bg-white/10 border-white/20 text-slate-300 hover:bg-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            }`}
            aria-label={
              isAudioPlaying ? "Mute Christmas music" : "Play Christmas music"
            }
          >
            <div className="flex items-end gap-[3px] h-3.5 w-4 overflow-hidden">
              <span
                className={`w-[3px] rounded-full bg-current transition-all duration-300 ${
                  isAudioPlaying
                    ? "animate-[soundWave_1.2s_ease-in-out_infinite]"
                    : "h-1"
                }`}
                style={{ animationDelay: "0.1s" }}
              />
              <span
                className={`w-[3px] rounded-full bg-current transition-all duration-300 ${
                  isAudioPlaying
                    ? "animate-[soundWave_0.8s_ease-in-out_infinite]"
                    : "h-1.5"
                }`}
                style={{ animationDelay: "0.3s" }}
              />
              <span
                className={`w-[3px] rounded-full bg-current transition-all duration-300 ${
                  isAudioPlaying
                    ? "animate-[soundWave_1.0s_ease-in-out_infinite]"
                    : "h-0.5"
                }`}
                style={{ animationDelay: "0.0s" }}
              />
              <span
                className={`w-[3px] rounded-full bg-current transition-all duration-300 ${
                  isAudioPlaying
                    ? "animate-[soundWave_0.9s_ease-in-out_infinite]"
                    : "h-2"
                }`}
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            <span className="text-[10px] tracking-widest uppercase font-bold select-none">
              {isAudioPlaying ? "Music On" : "Music Off"}
            </span>
          </button>
        );
      })()}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes soundWave {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
      `,
        }}
      />

      <Footer />
    </div>
  );
}
