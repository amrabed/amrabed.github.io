/* eslint-disable react/display-name, @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi, beforeEach } from "vitest";

import React from "react";

import { render, act } from "@testing-library/react";

import { EmptyState } from "./empty-state";
import { IconLink } from "./icon-link";
import { Section } from "./section";
import { SectionItemCard } from "./section-item-card";
import Social from "./social";
import ScrollToTopButton from "./upArrow";

// Mock HeroUI Tooltip and other components to simplify testing
vi.mock("@heroui/react", async (importOriginal) => {
  const actual: any = await importOriginal();
  const MockTooltip = ({ children }: any) => <div>{children}</div>;
  MockTooltip.Trigger = ({ children }: any) => <>{children}</>;
  MockTooltip.Content = ({ children }: any) => <div>{children}</div>;
  MockTooltip.Arrow = () => null;

  return {
    ...actual,
    Tooltip: MockTooltip,
    Button: ({ children, onPress, ...props }: any) => (
      <button onClick={onPress} {...props}>
        {children}
      </button>
    ),
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

      const link = getByLabelText("My Title");
      expect(link).toBeInTheDocument();
      expect(link.getAttribute("href")).toBe("https://example.com");
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
    });
  });

  describe("Social", () => {
    it("should render profiles and invoke window.open on press", () => {
      const customProfiles = [
        { name: "GitHub", link: "https://github.com", icon: "GH" },
      ];

      const { getByLabelText } = render(<Social profiles={customProfiles} />);
      const btn = getByLabelText("GitHub");
      expect(btn).toBeInTheDocument();

      act(() => {
        btn.click();
      });

      expect(mockOpen).toHaveBeenCalledWith(
        "https://github.com",
        "_blank",
        "noopener,noreferrer",
      );
    });
  });

  describe("ScrollToTopButton (upArrow)", () => {
    it("should show/hide on scroll and trigger window.scrollTo on click", () => {
      const { container } = render(<ScrollToTopButton />);

      // Initially not visible (window.scrollY is 0)
      window.scrollY = 0;
      act(() => {
        window.dispatchEvent(new Event("scroll"));
      });
      expect(container.querySelector(".scroll-button")).not.toBeInTheDocument();

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

      window.IntersectionObserver = vi.fn().mockImplementation((callback) => {
        observerCallback = callback;
        return {
          observe: mockObserve,
          unobserve: mockUnobserve,
          disconnect: vi.fn(),
        };
      });

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
});
