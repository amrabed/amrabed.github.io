import { describe, expect, it } from "vitest";

import { render, screen } from "@testing-library/react";

import NotFound from "./not-found";

describe("NotFound", () => {
  it("renders 404 heading and link to home", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Go Home" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
