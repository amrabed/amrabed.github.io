import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Timeline from "./timeline";
import positions from "@/data/positions";

describe("Timeline", () => {
  it("renders correctly", () => {
    const { container } = render(<Timeline positions={positions} />);
    expect(container).toBeInTheDocument();
  });
});
