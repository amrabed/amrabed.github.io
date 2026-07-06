import { describe, it, expect, vi } from "vitest";

import { render } from "@testing-library/react";

import Footer from "./footer";

vi.mock("@/contexts/theme", () => ({
  useTheme: () => ({ theme: "light", toggleTheme: vi.fn() }),
}));

describe("Footer", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Footer />);
    expect(getByText(/Amr Abed/i)).toBeInTheDocument();
  });
});
