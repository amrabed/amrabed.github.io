import { NavBar } from "@amrabed/ui";

import { Banner } from "@/components/banner";
import { ScrollFilterController } from "@/components/scroll-filter-controller";
import { AboutSection } from "@/components/sections/about";
import { BlogSection } from "@/components/sections/blog";
import { CertificationsSection } from "@/components/sections/certifications";
import { ContactSection } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import HeroSection from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { PublicationsSection } from "@/components/sections/publications";
import { SkillsSection } from "@/components/sections/skills";
import { TeachingSection } from "@/components/sections/teaching";

const SECTIONS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "Projects", href: "#projects" },
  { name: "Publications", href: "#publications" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#degrees" },
  { name: "Teaching", href: "#teaching" },
  { name: "Articles", href: "#articles" },
  { name: "Contact", href: "#contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <NavBar
        authorHref="#home"
        currentSite="home"
        navLinks={SECTIONS}
        showLogo={false}
        showOnScroll
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-grow outline-none focus:ring-0"
      >
        <HeroSection />
        <div className="space-y-0">
          <AboutSection />
          <SkillsSection />
          <CertificationsSection />
          <ProjectsSection />
          <PublicationsSection />
          <ExperienceSection />
          <EducationSection />
          <TeachingSection />
          <BlogSection />
          <ContactSection />
        </div>
      </main>
      <ScrollFilterController />
    </div>
  );
}
