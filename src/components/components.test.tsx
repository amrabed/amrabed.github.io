/* eslint-disable react/display-name, @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi, beforeEach } from "vitest";

import { render, act } from "@testing-library/react";

import resumeJson from "@/data/resume.json";

import { EmptyState } from "./empty-state";
import { IconLink } from "./icon-link";
import { Section } from "./section";
import { SectionItemCard } from "./section-item-card";
import { ContactSection } from "./sections/contact";
import HeroSection from "./sections/hero";
import Social from "./social";
import ScrollToTopButton from "./upArrow";

// Mock HeroUI Tooltip and other components to simplify testing
vi.mock("react-type-animation", () => ({
  TypeAnimation: () => <span>n Engineer</span>,
}));

vi.mock("@heroui/react", async (importOriginal) => {
  const actual: any = await importOriginal();
  const MockTooltip = ({ children }: any) => <div>{children}</div>;
  MockTooltip.Trigger = ({ children }: any) => <>{children}</>;
  MockTooltip.Content = ({ children }: any) => <div>{children}</div>;
  MockTooltip.Arrow = () => null;

  return {
    ...actual,
    Tooltip: MockTooltip,
  };
});

// Mock hooks
const mockSetQuery = vi.fn();
const mockClearAll = vi.fn();
const mockIsFilterBarVisible = false;

vi.mock("@/contexts/search", () => ({
  useSearch: () => ({
    setQuery: mockSetQuery,
  }),
}));

vi.mock("@/contexts/filter", () => ({
  useFilter: () => ({
    clearAll: mockClearAll,
  }),
  useFilterUI: () => ({
    isFilterBarVisible: mockIsFilterBarVisible,
  }),
}));

// Mock window.scrollTo and window.open
const mockScrollTo = vi.fn();
const mockOpen = vi.fn();

describe("UI Components", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = mockScrollTo;
    window.open = mockOpen;
  });

  describe("EmptyState", () => {
    it("should render error message and reset query/filters on button press", () => {
      const { getByText } = render(<EmptyState />);
      expect(getByText("No results found")).toBeInTheDocument();

      const button = getByText("Clear all filters");
      act(() => {
        button.click();
      });

      expect(mockSetQuery).toHaveBeenCalledWith("");
      expect(mockClearAll).toHaveBeenCalled();
    });
  });

  describe("IconLink", () => {
    it("should render correct link target and attributes", () => {
      const { getByLabelText } = render(
        <IconLink href="https://example.com" title="My Title">
          <span>Icon</span>
        </IconLink>,
      );

      const link = getByLabelText("My Title (opens in a new tab)");
      expect(link).toBeInTheDocument();
      expect(link.getAttribute("href")).toBe("https://example.com");
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    });
  });

  describe("Social", () => {
    it("should render profiles with correct anchor attributes", () => {
      const customProfiles = [
        { name: "GitHub", link: "https://github.com", icon: "GH" },
      ];

      const { getByLabelText } = render(<Social profiles={customProfiles} />);
      const btn = getByLabelText("GitHub (opens in a new tab)");
      expect(btn).toBeInTheDocument();
      expect(btn).toHaveAttribute("href", "https://github.com");
      expect(btn).toHaveAttribute("target", "_blank");
      expect(btn).toHaveAttribute("rel", "noopener noreferrer me");
    });

    it("should apply custom className when provided", () => {
      const { container } = render(<Social className="custom-test-class" />);
      expect(container.firstChild).toHaveClass("custom-test-class");
    });

    it("should set custom hover color variables when profile has a brand color", () => {
      const customProfiles = [
        {
          name: "LinkedIn",
          link: "https://linkedin.com",
          icon: "LI",
          color: "#0A66C2",
        },
        {
          name: "Goodreads",
          link: "https://goodreads.com",
          icon: "GR",
          color: "#372213",
        },
      ];
      const { getByLabelText } = render(<Social profiles={customProfiles} />);
      const linkedInBtn = getByLabelText("LinkedIn (opens in a new tab)");
      expect(linkedInBtn.style.getPropertyValue("--social-hover-color")).toBe(
        "#0A66C2",
      );

      const goodreadsBtn = getByLabelText("Goodreads (opens in a new tab)");
      expect(goodreadsBtn.style.getPropertyValue("--social-hover-color")).toBe(
        "#372213",
      );
      expect(
        goodreadsBtn.style.getPropertyValue("--social-hover-color-dark"),
      ).toBe("#f4f1ea");
    });
  });

  describe("ScrollToTopButton (upArrow)", () => {
    it("should show/hide on scroll and trigger window.scrollTo on click, shifting focus to main-content or body", () => {
      // Create a dummy main-content div in the test DOM
      const mainContent = document.createElement("div");
      mainContent.id = "main-content";
      const focusSpy = vi.spyOn(mainContent, "focus");
      document.body.appendChild(mainContent);

      const { container } = render(<ScrollToTopButton />);

      // Scroll down
      window.scrollY = 400;
      act(() => {
        window.dispatchEvent(new Event("scroll"));
      });

      // After scroll, button should render
      const btn = container.querySelector(".scroll-button");
      expect(btn).toBeInTheDocument();

      act(() => {
        (btn as HTMLButtonElement).click();
      });

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: "smooth",
      });

      // Verify that focus was shifted to main-content
      expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });

      // Clean up
      document.body.removeChild(mainContent);
    });

    it("should fallback to document.body.focus if main-content is not found", () => {
      const bodyFocusSpy = vi.spyOn(document.body, "focus");

      const { container } = render(<ScrollToTopButton />);

      // Scroll down
      window.scrollY = 400;
      act(() => {
        window.dispatchEvent(new Event("scroll"));
      });

      const btn = container.querySelector(".scroll-button");
      act(() => {
        (btn as HTMLButtonElement).click();
      });

      expect(bodyFocusSpy).toHaveBeenCalledWith({ preventScroll: true });
    });
  });

  describe("SectionItemCard", () => {
    it("should render title, subtitle, footer, and link details", () => {
      const { getByText, getByAltText } = render(
        <SectionItemCard
          href="https://myjob.com"
          image={{ src: "/job.png", alt: "Job Alt" }}
          title="Job Title"
          subtitle="Job Subtitle"
          footer="Job Footer"
        />,
      );

      expect(getByText("Job Title")).toBeInTheDocument();
      expect(getByText("Job Subtitle")).toBeInTheDocument();
      expect(getByText("Job Footer")).toBeInTheDocument();

      const img = getByAltText("Job Alt");
      expect(img.getAttribute("src")).toContain("job.png");
    });
  });

  describe("Section", () => {
    it("should render section title and children and setup IntersectionObserver", () => {
      const mockObserve = vi.fn();
      const mockUnobserve = vi.fn();
      let observerCallback: any = null;

      window.IntersectionObserver = vi.fn().mockImplementation(function (
        callback: any,
      ) {
        observerCallback = callback;
        return {
          observe: mockObserve,
          unobserve: mockUnobserve,
          disconnect: vi.fn(),
        };
      }) as unknown as typeof window.IntersectionObserver;

      const { getByText, container, unmount } = render(
        <Section id="my-section" title="Section Title">
          <div>Section Body</div>
        </Section>,
      );

      expect(getByText("Section Title")).toBeInTheDocument();
      expect(getByText("Section Body")).toBeInTheDocument();
      expect(mockObserve).toHaveBeenCalled();

      // Simulate observer toggle class
      const sectionElement = container.querySelector("section");
      expect(sectionElement?.classList.contains("in-view")).toBe(false);

      act(() => {
        observerCallback([{ isIntersecting: true }]);
      });
      expect(sectionElement?.classList.contains("in-view")).toBe(true);

      act(() => {
        observerCallback([{ isIntersecting: false }]);
      });
      expect(sectionElement?.classList.contains("in-view")).toBe(false);

      unmount();
      expect(mockUnobserve).toHaveBeenCalled();
    });
  });

  describe("ContactSection", () => {
    it("should render Get In Touch section with LinkedIn and Download Resume button", () => {
      const { getByText, getByRole } = render(<ContactSection />);

      expect(getByText("Get In Touch")).toBeInTheDocument();
      expect(getByText("Connect on LinkedIn")).toBeInTheDocument();

      const resumeLink = getByRole("link", {
        name: /view amr abed's resume/i,
      });
      expect(resumeLink).toBeInTheDocument();
      expect(resumeLink).toHaveAttribute("href", resumeJson.basics.resumeUrl);
      expect(resumeLink).toHaveAttribute("target", "_blank");
    });
  });

  describe("HeroSection", () => {
    it("should render hero heading and CTA buttons", () => {
      const { getByText, getByRole } = render(<HeroSection />);

      expect(getByText("Amr Abed")).toBeInTheDocument();
      expect(getByText("About Me")).toHaveAttribute("href", "#about");

      const resumeLink = getByRole("link", {
        name: /view amr abed's resume/i,
      });
      expect(resumeLink).toBeInTheDocument();
      expect(resumeLink).toHaveAttribute("href", resumeJson.basics.resumeUrl);
      expect(resumeLink).toHaveAttribute("target", "_blank");
    });
  });
});
