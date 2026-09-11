"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
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

import { SnowEffect } from "./component/SnowEffect";
import { HeroSection } from "./component/HeroSection";
import { IntroSection } from "./component/IntroSection";
import { CelebrateSection } from "./component/CelebrateSection";
import { PartiesSection } from "./component/PartiesSection";
import { GallerySection } from "./component/GallerySection";
import { ReservationSection } from "./component/ReservationSection";
import { useCMSStore } from "@/store/useCMSStore";

export default function ChristmasPage() {
  const { fetchPage, pages, isLoading } = useCMSStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  // Fetch CMS page data
  useEffect(() => {
    fetchPage("christmas").catch(console.error);
  }, [fetchPage]);

  const pageData = pages["christmas"] || {};
  const storeLoading = isLoading["christmas"] ?? true;

  // // Visibility guard: if loaded and not published, redirect to 404
  // // Note: notFound() only works in Server Components; use router.replace() in client components
  // useEffect(() => {
  //   if (!storeLoading && pageData.visibility !== "published") {
  //     router.replace("/not-found");
  //   }
  // }, [storeLoading, pageData.visibility, router]);

  // Page loader timer — must stay above any conditional return (Rules of Hooks)
  useEffect(() => {
    if (storeLoading) return;
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [storeLoading]);

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
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.7 },
      );

      // Section reveal animations (applies to every section with class "reveal-section")
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

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#FAF6EC] text-neutral-800 overflow-x-hidden relative"
    >
      <PageLoader isLoading={loading} />
      <SnowEffect />
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        {/* Fireside hero — title, subtext, book/menu CTAs */}
        <HeroSection heroRef={heroRef} heroBgRef={heroBgRef} />

        {/* "Christmas is Better Together" — intro copy + 3 feature cards */}
        <IntroSection />

        {/* "How Will You Celebrate?" — 3 image cards (lunch / parties / day) */}
        <CelebrateSection />

        {/* "Christmas Parties at Seven Stars" — image + list + voucher box */}
        <PartiesSection />

        {/* "Christmas Looks Good at Seven Stars" — bento-style photo gallery */}
        <GallerySection />

        {/* Final CTA — "This Christmas, make it one to remember" */}
        <ReservationSection />
      </main>
      <Footer />
    </div>
  );
}
