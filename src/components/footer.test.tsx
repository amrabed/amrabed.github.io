import { describe, it, expect } from "vitest";

import { render } from "@testing-library/react";

import Footer from "./footer";

describe("Footer", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Footer />);
    expect(getByText(/Amr Abed/i)).toBeInTheDocument();
  });
});
