import { describe, it, expect, vi } from "vitest";

import { render, fireEvent } from "@testing-library/react";

import { ThemeSwitch } from "./theme-switch";

const mockSetTheme = vi.fn();
let mockTheme = "system";

vi.mock("@/contexts/theme", () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
  }),
}));

describe("ThemeSwitch", () => {
  it("renders 3 options: light, dark, and system", () => {
    mockTheme = "system";
    const { getByRole, getByLabelText } = render(<ThemeSwitch />);

    expect(
      getByRole("radiogroup", { name: "Theme selector" }),
    ).toBeInTheDocument();
    expect(getByLabelText("Light theme")).toBeInTheDocument();
    expect(getByLabelText("Dark theme")).toBeInTheDocument();
    expect(getByLabelText("System theme")).toBeInTheDocument();

    const systemBtn = getByLabelText("System theme");
    expect(systemBtn).toHaveAttribute("aria-checked", "true");
  });

  it("calls setTheme with corresponding mode when an option is clicked", () => {
    const { getByLabelText } = render(<ThemeSwitch />);
    const lightBtn = getByLabelText("Light theme");

    fireEvent.click(lightBtn);
    expect(mockSetTheme).toHaveBeenCalledWith("light");

    const darkBtn = getByLabelText("Dark theme");
    fireEvent.click(darkBtn);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});
