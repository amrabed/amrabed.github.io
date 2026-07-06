import { describe, it, expect } from "vitest";

import { render } from "@testing-library/react";

import positions from "@/data/positions";

import Timeline from "./timeline";

describe("Timeline", () => {
  it("renders correctly", () => {
    const { container } = render(<Timeline positions={positions} />);
    expect(container).toBeInTheDocument();
  });
});
