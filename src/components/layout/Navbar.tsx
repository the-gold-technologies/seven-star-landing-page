"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Contact, Menu, X, ChevronDown, Calendar } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCMSStore } from "@/store/useCMSStore";
import gsap from "gsap";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { navLinks, fetchNavLinks, pages, fetchPage } = useCMSStore();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch dynamic CMS navigation and Christmas page status
  useEffect(() => {
    fetchNavLinks().catch(console.error);
    fetchPage("christmas").catch(console.error);
  }, [fetchNavLinks, fetchPage]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  const items = (() => {
    const rawItems = Array.isArray(navLinks)
      ? navLinks.map((link) => ({
          name: link.title,
          href: link.link,
          dropdown: link.dropdown
            ? link.dropdown.map((sub) => ({ name: sub.title, href: sub.link }))
            : undefined,
        }))
      : [];

    // 1. Find and extract standalone Christmas item if any
    let christmasItem: {
      name: string;
      href: string;
      dropdown: { name: string; href: string }[] | undefined;
    } | null = null;
    const filteredForChristmas = rawItems.filter((item) => {
      const isChristmas =
        (item.href === "/christmas" ||
          item.name.toLowerCase().includes("christmas")) &&
        !(
          item.dropdown &&
          item.dropdown.some(
            (sub) =>
              sub.href === "/events" ||
              sub.name.toLowerCase().includes("event"),
          )
        );
      if (isChristmas) {
        christmasItem = {
          name: item.name,
          href: item.href || "/christmas",
          dropdown: item.dropdown,
        };
        return false;
      }
      return true;
    });

    if (!christmasItem) {
      christmasItem = {
        name: "Christmas",
        href: "/christmas",
        dropdown: undefined,
      };
    }

    // 2. Find and extract Blog item
    let blogItem: {
      name: string;
      href: string;
      dropdown: { name: string; href: string }[] | undefined;
    } | null = null;
    const filteredForBlog = filteredForChristmas.filter((item) => {
      const isBlog =
        item.href === "/blog" || item.name.toLowerCase() === "blog";
      if (isBlog) {
        blogItem = {
          name: item.name,
          href: item.href || "/blog",
          dropdown: item.dropdown,
        };
        return false;
      }
      return true;
    });

    if (!blogItem) {
      blogItem = { name: "News & Blogs", href: "/blog", dropdown: undefined };
    }

    // 3. Handle Christmas inside Events dropdown based on published status
    const eventsItemIdx = filteredForBlog.findIndex(
      (item) =>
        item.href === "/events" ||
        item.href === "/christmas" ||
        item.name.toLowerCase() === "events" ||
        item.name.toLowerCase() === "event" ||
        item.name.toLowerCase() === "christmas",
    );

    const isChristmasPublished = pages["christmas"]
      ? pages["christmas"].visibility === "published"
      : true;

    if (eventsItemIdx !== -1) {
      const eventsItem = filteredForBlog[eventsItemIdx];
      const existingDropdown = eventsItem.dropdown || [];

      if (isChristmasPublished) {
        // When Christmas is published:
        // Top-level menu displays "Christmas" by default.
        // Dropdown has Christmas on top and Events below it.
        const otherSubs = existingDropdown.filter(
          (sub) =>
            sub.href !== "/christmas" &&
            sub.href !== "/events" &&
            !sub.name.toLowerCase().includes("christmas") &&
            !sub.name.toLowerCase().includes("event"),
        );

        const dropdownItems = [
          { name: "Christmas", href: "/christmas" },
          { name: "Events", href: "/events" },
          ...otherSubs,
        ];

        filteredForBlog[eventsItemIdx] = {
          ...eventsItem,
          name: "Christmas",
          href: "/christmas",
          dropdown: dropdownItems,
        };
      } else {
        // When Christmas is disabled:
        // Top-level menu displays "Events", Christmas is removed from dropdown.
        const cleanedDropdown = existingDropdown.filter(
          (sub) =>
            sub.href !== "/christmas" &&
            !sub.name.toLowerCase().includes("christmas"),
        );

        if (cleanedDropdown.length <= 1) {
          filteredForBlog[eventsItemIdx] = {
            ...eventsItem,
            name: "Events",
            href: "/events",
            dropdown: undefined,
          };
        } else {
          filteredForBlog[eventsItemIdx] = {
            ...eventsItem,
            name: "Events",
            href: "/events",
            dropdown: cleanedDropdown,
          };
        }
      }
    }

    // 4. Place Blog after Gallery
    const galleryItemIdx = filteredForBlog.findIndex(
      (item) =>
        item.href === "/gallery" || item.name.toLowerCase() === "gallery",
    );

    const finalItems = [...filteredForBlog];
    if (galleryItemIdx !== -1) {
      finalItems.splice(galleryItemIdx + 1, 0, blogItem);
    } else {
      // Fallback: search for events or just append
      const eventsIdx = finalItems.findIndex(
        (item) =>
          item.href === "/events" || item.name.toLowerCase() === "events",
      );
      if (eventsIdx !== -1) {
        finalItems.splice(eventsIdx + 1, 0, blogItem);
      } else {
        finalItems.push(blogItem);
      }
    }

    return finalItems;
  })();

  const isLinkActive = (href: string, dropdown?: { href: string }[]) => {
    if (href && href !== "#" && pathname === href) return true;
    if (dropdown) {
      return dropdown.some(
        (sub) => sub.href && sub.href !== "#" && pathname === sub.href,
      );
    }
    return false;
  };

  const getDisplayName = (item: {
    name: string;
    href: string;
    dropdown?: { name: string; href: string }[];
  }) => {
    if (item.dropdown) {
      const activeSub = item.dropdown.find(
        (sub) => sub.href && sub.href !== "#" && pathname === sub.href,
      );
      if (activeSub) {
        if (activeSub.name === "Our Story & Community") {
          return "Our Story";
        }
        return activeSub.name;
      }
    }
    return item.name;
  };

  // GSAP entrance — synced with Hero curtain (1s delay so curtain lifts first)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".nav-logo", { opacity: 0, y: -24 });
      gsap.set(".nav-pill", { opacity: 0, y: -18, scale: 0.94 });
      gsap.set(".nav-icons", { opacity: 0, y: -18 });

      gsap
        .timeline({ delay: 1.1, defaults: { ease: "power3.out" } })
        .to(".nav-logo", { opacity: 1, y: 0, duration: 0.7 })
        .to(
          ".nav-pill",
          { opacity: 1, y: 0, scale: 1, duration: 0.65 },
          "-=0.4",
        )
        .to(".nav-icons", { opacity: 1, y: 0, duration: 0.55 }, "-=0.35");
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-[#475DB1] focus:text-white focus:font-semibold focus:rounded-full focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white transition-all"
      >
        Skip to main content
      </a>
      <nav
        ref={navRef}
        className={`w-full transition-all duration-700 ease-in-out bg-transparent border-b border-transparent ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-700 ${isScrolled ? "h-14" : "h-16"}`}
          >
            {/* Logo */}
            <div className="nav-logo flex-shrink-0 flex items-center">
              <Link href="/" className="w-36" aria-label="Seven Stars Pub Home">
                <img
                  src="/FINAL-SEVEN-STARS-GREY-BACKGROUND-2023-trimmed.png"
                  alt="Seven Stars Pub Logo"
                  className="w-full h-full object-contain"
                />
              </Link>
            </div>

            {/* Desktop Pill Nav */}
            <div className="nav-pill hidden lg:flex flex-1 justify-center px-4 min-w-0">
              <div className="flex items-center p-1.5 rounded-full bg-[#475DB1]/80 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-500">
                {items.map((item) =>
                  item.dropdown ? (
                    <div key={item.name} className="relative group shrink-0">
                      <Link
                        href={item.href || "#"}
                        className={`px-4 xl:px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 flex items-center whitespace-nowrap ${
                          isLinkActive(item.href, item.dropdown)
                            ? "bg-white text-[#475DB1] shadow-md font-semibold"
                            : "text-white/85 hover:text-white hover:bg-white/10"
                        }`}
                        aria-haspopup="true"
                      >
                        {getDisplayName(item)}
                        <svg
                          className={`w-3.5 h-3.5 ml-1 shrink-0 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180 ${
                            isLinkActive(item.href, item.dropdown)
                              ? "text-[#475DB1]"
                              : "text-white/80"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </Link>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible focus-within:opacity-100 focus-within:visible transition-all duration-300 z-50 w-56">
                        <div className="py-2 bg-[#475DB1]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                          {item.dropdown.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href || "#"}
                                className={`px-5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                                  isSubActive
                                    ? "bg-white text-[#475DB1] font-semibold"
                                    : "text-white/85 hover:text-white hover:bg-white/10"
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href || "#"}
                      className={`px-4 xl:px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap shrink-0 ${
                        isLinkActive(item.href)
                          ? "bg-white text-[#475DB1] shadow-md font-semibold"
                          : "text-white/85 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ),
                )}
              </div>
            </div>

            {/* Right: CTA + Icons */}
            <div className="nav-icons flex items-center justify-end space-x-3 flex-shrink-0">
              {/* Book Table — slides in on scroll */}
              <div
                className={`transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center overflow-hidden 
                max-w-[200px] opacity-100 mr-3 translate-x-0`}
              >
                <Link
                  href="https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book Table on OpenTable (opens in a new tab)"
                  className="hidden sm:flex px-6 py-2.5 text-sm font-medium rounded-full bg-[#475DB1] text-white hover:bg-[#475DB1]/90 shadow-[0_0_15px_rgba(202,158,90,0.2)] hover:shadow-[0_0_20px_rgba(202,158,90,0.4)] whitespace-nowrap transition-all duration-300"
                >
                  Book Table
                </Link>
              </div>

              {/* Icon buttons */}
              <div className="flex items-center space-x-2">
                <Link
                  href="/contact"
                  aria-label="Contact Us"
                  className="relative group w-12 h-12 rounded-full bg-[#475DB1]/80 backdrop-blur-md border border-white/10 text-white hover:bg-[#475DB1] hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
                >
                  <Contact size={20} />
                  <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-white/10 backdrop-blur-sm shadow-lg">
                    Contact Us
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen((open) => !open)}
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-nav-menu"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  className="w-12 h-12 rounded-full bg-[#475DB1]/80 backdrop-blur-md border border-white/10 text-white hover:bg-[#475DB1] hover:text-white transition-all duration-300 flex items-center justify-center lg:hidden"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={closeMobileMenu}
          />
          <div
            id="mobile-nav-menu"
            className={`absolute top-0 right-0 h-full w-full max-w-sm bg-[#0a192f]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col pt-24 px-6 pb-8 overflow-y-auto transform transition-transform duration-300 ease-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <nav className="flex flex-col gap-1">
              {items.map((item) =>
                item.dropdown ? (
                  <div key={item.name} className="border-b border-white/5">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown((current) =>
                          current === item.name ? null : item.name,
                        )
                      }
                      className={`w-full flex items-center justify-between py-4 text-base font-medium transition-colors ${
                        isLinkActive(item.href, item.dropdown)
                          ? "text-[#475DB1] font-semibold"
                          : "text-gray-200 hover:text-white"
                      }`}
                      aria-expanded={openDropdown === item.name}
                    >
                      {getDisplayName(item)}
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openDropdown === item.name
                          ? "max-h-48 opacity-100 pb-2"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href || "#"}
                          onClick={closeMobileMenu}
                          className={`block py-2.5 pl-4 text-sm transition-colors ${
                            pathname === subItem.href
                              ? "text-[#475DB1] font-semibold"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    onClick={closeMobileMenu}
                    className={`py-4 text-base font-medium border-b border-white/5 transition-colors ${
                      isLinkActive(item.href)
                        ? "text-[#475DB1] font-semibold"
                        : "text-gray-200 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ),
              )}
            </nav>

            <Link
              href="https://www.opentable.co.uk/r/the-seven-stars-at-marsh-baldon-reservations-oxford?restref=459243&lang=en-GB&ot_source=Restaurant%20website"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book Table on OpenTable (opens in a new tab)"
              onClick={closeMobileMenu}
              className="mt-8 px-6 py-3 text-center text-sm font-medium rounded-full bg-[#475DB1] text-white hover:bg-[#475DB1]/90 transition-colors"
            >
              Book Table
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
