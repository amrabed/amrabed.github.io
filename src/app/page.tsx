"use client";

import { useEffect, useState } from "react";

import { Banner } from "@/components/banner";
import { MainHeader } from "@/components/header";
import Intro from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { CertificationsSection } from "@/components/sections/certifications";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { UnifiedFilterBar } from "@/components/unified-filter-bar";

const Home = () => {
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.getElementById("skills");
      const experienceSection = document.getElementById("experience");

      if (skillsSection && experienceSection) {
        const skillsTop = skillsSection.offsetTop;
        const experienceBottom =
          experienceSection.offsetTop + experienceSection.offsetHeight;

        // Show filter bar when between skills top and experience bottom
        // Adjusted to hide when reaching the About section
        setShowFilter(
          window.scrollY > skillsTop - 200 &&
          window.scrollY + window.innerHeight < experienceBottom + 100,
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
      <Intro />
      <main className="flex-grow">
        <div className="space-y-0">
          <SkillsSection />
          <CertificationsSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <AboutSection />
        </div>
      </main>
      {showFilter && <UnifiedFilterBar />}
    </div>
  );
};

export default Home;
