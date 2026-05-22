"use client";

import { useEffect, useState } from "react";

import { Banner } from "@/components/banner";
import { MainHeader } from "@/components/header";
import { AboutSection } from "@/components/sections/about";
import { CertificationsSection } from "@/components/sections/certifications";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import HeroSection from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { PublicationsSection } from "@/components/sections/publications";
import { AnimatePresence } from "framer-motion";

import { SkillsSection } from "@/components/sections/skills";
import { UnifiedFilterBar } from "@/components/unified-filter-bar";

const Home = () => {
  const [showFilter, setShowFilter] = useState(false);

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
          document.getElementById("publications") ||
          document.getElementById("experience");
        lastSectionBottom = lastSection
          ? lastSection.offsetTop + lastSection.offsetHeight
          : 0;
      }
    };

    updateDimensions();

    const handleScroll = () => {
      // Use cached dimensions to avoid expensive DOM lookups and reflows during scroll.
      setShowFilter(
        window.scrollY > skillsTop - 200 &&
        window.scrollY + window.innerHeight < lastSectionBottom + 100,
      );
    };

    // Use { passive: true } to improve scroll performance by telling the browser
    // that this listener will not call preventDefault().
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateDimensions, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <MainHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-grow outline-none focus:ring-0"
      >
        <HeroSection />
        <div className="space-y-0">
          <SkillsSection />
          <CertificationsSection />
          <ProjectsSection />
          <ExperienceSection />
          <PublicationsSection />
          <EducationSection />
          <AboutSection />
        </div>
      </main>
      <AnimatePresence>{showFilter && <UnifiedFilterBar />}</AnimatePresence>
    </div>
  );
};

export default Home;
