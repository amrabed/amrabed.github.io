"use client";

import dynamic from "next/dynamic";
import { Banner } from "@/components/banner";
import { MainHeader } from "@/components/header";
import { UnifiedFilterBar } from "@/components/unified-filter-bar";
import { SkillsSection } from "@/components/skills-section";
import { CertificationsSection } from "@/components/certifications-section";
import { EducationSection } from "@/components/education-section";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { AboutSection } from "@/components/about-section";

const Intro = dynamic(() => import("@/components/intro"), { ssr: false });

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <MainHeader />
      <Intro />
      <UnifiedFilterBar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 space-y-24 py-24">
          <SkillsSection />
          <CertificationsSection />
          <EducationSection />
          <ProjectsSection />
          <ExperienceSection />
          <AboutSection />
        </div>
      </main>
    </div>
  );
};

export default Home;
