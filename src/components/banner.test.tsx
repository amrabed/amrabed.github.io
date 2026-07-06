import { describe, it, expect } from "vitest";

import { render } from "@testing-library/react";

import { Banner } from "./banner";

describe("Banner", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Banner />);
    expect(getByText(/Free Palestine/i)).toBeInTheDocument();
  });
});
