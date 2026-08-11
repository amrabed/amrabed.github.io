import { describe, it, expect } from "vitest";

import { render } from "@testing-library/react";

import { Banner } from "./banner";

describe("Banner", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Banner />);
    expect(getByText(/Free Palestine/i)).toBeInTheDocument();
  });

  it("includes screen reader text for opening in a new tab", () => {
    const { getByText } = render(<Banner />);
    expect(getByText(/\(opens in a new tab\)/i)).toBeInTheDocument();
  });
});
