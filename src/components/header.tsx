"use client";

import React, { useEffect, useState } from "react";

import { NavBar } from "@amrabed/ui";

export const sections = [
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Certifications", link: "#certifications" },
  { name: "Projects", link: "#projects" },
  { name: "Publications", link: "#publications" },
  { name: "Experience", link: "#experience" },
  { name: "Education", link: "#degrees" },
  { name: "Teaching", link: "#teaching" },
  { name: "Articles", link: "#articles" },
  { name: "Contact", link: "#contact" },
];

export const MainHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleWindowScroll();
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = (e.target as HTMLElement).closest("a");
    if (!target) return;
    const href = target.getAttribute("href");
    if (!href) return;

    if (href === "#" || href === "#home") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav
      aria-label="Main Navigation Container"
      onClick={handleNavClick}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <NavBar
        currentSite="home"
        showLogo={false}
        authorHref="#home"
        navLinks={sections.map((s) => ({
          name: s.name,
          href: s.link,
        }))}
      />
    </nav>
  );
};

export default MainHeader;
