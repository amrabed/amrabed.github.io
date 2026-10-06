import { describe, expect, it, vi, beforeEach } from "vitest";

import { render, act } from "@testing-library/react";

import { MainHeader } from "./header";

describe("MainHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
    window.IntersectionObserver = vi.fn().mockImplementation(function () {
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    }) as unknown as typeof window.IntersectionObserver;
  });

  it("should render and handle scroll to top", () => {
    const { getByText } = render(<MainHeader />);
    const title = getByText("Amr Abed");

    act(() => {
      title.click();
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("should handle navigation link clicks", () => {
    const { getByText } = render(<MainHeader />);
    const skillsLink = getByText("Skills");

    // Mock getElementById to return a mock element with offsetTop
    const mockElement = { offsetTop: 500 } as HTMLElement;
    vi.spyOn(document, "getElementById").mockReturnValue(mockElement);

    act(() => {
      skillsLink.click();
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 400, // 500 - 100 offset
      behavior: "smooth",
    });
  });

  it("should toggle mobile menu", () => {
    const { getByLabelText } = render(<MainHeader />);
    const menuButton = getByLabelText("Open menu");

    act(() => {
      menuButton.click();
    });

    expect(getByLabelText("Close menu")).toBeInTheDocument();

    act(() => {
      menuButton.click();
    });

    expect(getByLabelText("Open menu")).toBeInTheDocument();
  });
  it("should render the Articles navigation link", () => {
    const { getByText } = render(<MainHeader />);
    const articlesLink = getByText("Articles");

    expect(articlesLink).toBeInTheDocument();
    expect(articlesLink).toHaveAttribute("href", "#articles");

    const mockElement = { offsetTop: 800 } as HTMLElement;
    vi.spyOn(document, "getElementById").mockReturnValue(mockElement);

    act(() => {
      articlesLink.click();
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 700, // 800 - 100 offset
      behavior: "smooth",
    });
  });

  it("should toggle visibility class based on scroll position", () => {
    const { container } = render(<MainHeader />);
    const nav = container.querySelector("nav");

    // Initially at top (scrollY = 0)
    expect(nav).toHaveClass("-translate-y-full");
    expect(nav).toHaveClass("opacity-0");

    // Scroll down past threshold
    act(() => {
      window.scrollY = 120;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(nav).toHaveClass("translate-y-0");
    expect(nav).toHaveClass("opacity-100");

    // Scroll back to top
    act(() => {
      window.scrollY = 0;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(nav).toHaveClass("-translate-y-full");
    expect(nav).toHaveClass("opacity-0");
  });
});
