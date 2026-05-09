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

const Intro = dynamic(() => import("@/components/intro"), { ssr: false });

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen pb-32">
      <Banner />
      <MainHeader />
      <Intro />
      <main className="flex-grow">
        <div className="space-y-0">
          <SkillsSection />
          <CertificationsSection />
          <EducationSection />
          <ProjectsSection />
          <ExperienceSection />
          <AboutSection />
        </div>
      </main>
      <UnifiedFilterBar />
    </div>
  );
};

export default Home;
