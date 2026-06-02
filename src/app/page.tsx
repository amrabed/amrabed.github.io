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
    const handleScroll = () => {
      const skillsSection = document.getElementById("skills");

      if (skillsSection) {
        const skillsTop = skillsSection.offsetTop;
        const lastSection =
          document.getElementById("publications") ||
          document.getElementById("experience");
        const lastSectionBottom = lastSection
          ? lastSection.offsetTop + lastSection.offsetHeight
          : 0;

        // Show filter bar when between skills top and last filterable section bottom
        // Adjusted to hide when reaching the About section
        setShowFilter(
          window.scrollY > skillsTop - 200 &&
            window.scrollY + window.innerHeight < lastSectionBottom + 100,
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
