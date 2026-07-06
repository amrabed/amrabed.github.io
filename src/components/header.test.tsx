import { describe, expect, it, vi, beforeEach } from "vitest";

import { render, act } from "@testing-library/react";

import { MainHeader } from "./header";

describe("MainHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
    window.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
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
});
