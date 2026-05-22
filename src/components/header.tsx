"use client";

import { useEffect, useState } from "react";

export const sections = [
  { name: "Skills", link: "#skills" },
  { name: "Certifications", link: "#certifications" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Publications", link: "#publications" },
  { name: "Education", link: "#degrees" },
  { name: "About", link: "#about" },
];

const Title = ({ onClick }: { onClick: (e: React.MouseEvent) => void }) => (
  <button
    onClick={onClick}
    className="text-lg font-semibold cursor-pointer hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-md px-1"
    aria-label="Amr Abed - Scroll to top"
  >
    Amr Abed
  </button>
);

export const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "home") {
            setActiveSection("");
          } else {
            setActiveSection(entry.target.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.link.substring(1));
      if (element) observer.observe(element);
    });

    const home = document.getElementById("home");
    if (home) observer.observe(home);

    return () => observer.disconnect();
  }, []);

  const handleScroll = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    const targetId = link.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Adjusted offset for better centering
        behavior: "smooth",
      });
      setIsMenuOpen(false);
    }
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsMenuOpen(false);
    setActiveSection("");
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-lg px-6 border-b border-divider h-16">
      <header className="max-w-7xl mx-auto flex h-16 items-center justify-between">
        <Title onClick={handleScrollToTop} />

        <div className="sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md text-slate-500 hover:text-primary transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              )}
            </svg>
          </button>
        </div>

        <ul className="hidden sm:flex items-center gap-6">
          {sections.map((section) => (
            <li key={section.name}>
              <a
                className={`text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 ${activeSection === section.link.substring(1)
                    ? "text-primary"
                    : "text-foreground-500"
                  }`}
                href={section.link}
                onClick={(e) => handleScroll(e, section.link)}
                aria-current={
                  activeSection === section.link.substring(1)
                    ? "location"
                    : undefined
                }
              >
                {section.name}
              </a>
            </li>
          ))}
        </ul>
      </header>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="sm:hidden pb-6 transition-all duration-300 bg-background/95 backdrop-blur-lg border-b border-divider"
        >
          <ul className="flex flex-col gap-4">
            {sections.map((section) => (
              <li key={section.name}>
                <a
                  className={`block text-lg py-2 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 ${activeSection === section.link.substring(1)
                      ? "text-primary"
                      : "text-foreground-500"
                    }`}
                  href={section.link}
                  onClick={(e) => handleScroll(e, section.link)}
                  aria-current={
                    activeSection === section.link.substring(1)
                      ? "location"
                      : undefined
                  }
                >
                  {section.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
