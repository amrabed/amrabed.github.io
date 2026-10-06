import { describe, it, expect, vi } from "vitest";

import { render, fireEvent } from "@testing-library/react";

import { ThemeSwitch } from "./theme-switch";

const mockToggleTheme = vi.fn();
let mockTheme = "dark";

vi.mock("@/contexts/theme", () => ({
  useTheme: () => ({
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
  }),
}));

describe("ThemeSwitch", () => {
  it("renders dark mode switch correctly and handles click", () => {
    mockTheme = "dark";
    const { getByLabelText } = render(<ThemeSwitch />);
    const switchControl = getByLabelText("Toggle dark mode");
    expect(switchControl).toBeInTheDocument();

    fireEvent.click(switchControl);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("renders in light mode without crashing", () => {
    mockTheme = "light";
    const { getByLabelText } = render(<ThemeSwitch />);
    expect(getByLabelText("Toggle dark mode")).toBeInTheDocument();
  });
});
