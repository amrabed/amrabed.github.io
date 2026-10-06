"use client";

import { AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";

import { UnifiedFilterBar } from "@/components/unified-filter-bar";
import { useFilterUI } from "@/contexts/filter";

export const ScrollFilterController = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { setIsFilterBarVisible } = useFilterUI();

  useEffect(() => {
    let skillsTop = Infinity;
    let lastSectionBottom = 0;

    // ⚡ Optimization: Move DOM measurements out of the scroll listener to avoid layout thrashing.
    // We cache the values and only update them on mount or window resize.
    const updateDimensions = () => {
      const skillsSection = document.getElementById("skills");

      if (skillsSection) {
        skillsTop = skillsSection.offsetTop;
        const lastSection =
          document.getElementById("experience") ||
          document.getElementById("publications");
        lastSectionBottom = lastSection
          ? lastSection.offsetTop + lastSection.offsetHeight
          : 0;
      }
    };

    updateDimensions();

    let currentVisible = false;
    const handleScroll = () => {
      // Use cached dimensions to avoid expensive DOM lookups and reflows during scroll.
      const isVisible =
        window.scrollY > skillsTop - 200 &&
        window.scrollY + window.innerHeight < lastSectionBottom + 100;
      if (isVisible !== currentVisible) {
        currentVisible = isVisible;
        setShowFilter(isVisible);
        setIsFilterBarVisible(isVisible);
      }
    };

    // Use { passive: true } to improve scroll performance by telling the browser
    // that this listener will not call preventDefault().
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateDimensions, { passive: true });

    // Run once on mount to establish correct initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDimensions);
    };
  }, [setIsFilterBarVisible]);

  return (
    <AnimatePresence>{showFilter && <UnifiedFilterBar />}</AnimatePresence>
  );
};
