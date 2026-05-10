"use client";

import dynamic from "next/dynamic";
import { Banner } from "@/components/banner";
import { MainHeader } from "@/components/header";
import { UnifiedFilterBar } from "@/components/unified-filter-bar";
import { SkillsSection } from "@/components/sections/skills";
import { CertificationsSection } from "@/components/sections/certifications";
import { EducationSection } from "@/components/sections/education";
import { ProjectsSection } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { AboutSection } from "@/components/sections/about";
import { useEffect, useState } from "react";

const Intro = dynamic(() => import("@/components/intro"), { ssr: false });

const Home = () => {
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.getElementById("skills");
      const experienceSection = document.getElementById("experience");

      if (skillsSection && experienceSection) {
        const skillsTop = skillsSection.offsetTop;
        const experienceBottom = experienceSection.offsetTop + experienceSection.offsetHeight;

        // Show filter bar when between skills top and experience bottom
        // Using window.scrollY to check if we have scrolled past skills
        setShowFilter(window.scrollY > skillsTop - 200 && window.scrollY < experienceBottom - 100);
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
          <EducationSection />
          <SkillsSection />
          <CertificationsSection />
          <ProjectsSection />
          <ExperienceSection />
          <AboutSection />
        </div>
      </main>
      {showFilter && <UnifiedFilterBar />}
    </div>
  );
};

export default Home;
