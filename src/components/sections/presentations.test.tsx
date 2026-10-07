import { describe, it, expect, vi } from "vitest";

import React, { ReactNode } from "react";

import { render, screen } from "@testing-library/react";

import { PresentationsSection } from "./presentations";

vi.mock("@/components/section", () => ({
  Section: ({ children, title }: { children: ReactNode; title: string }) => (
    <div data-testid="section" data-title={title}>
      {children}
    </div>
  ),
}));

vi.mock("@/components/icon-link", () => ({
  IconLink: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href} data-testid="icon-link">
      {children}
    </a>
  ),
}));

describe("PresentationsSection", () => {
  it("renders presentation items with titles and events", () => {
    render(<PresentationsSection />);
    expect(
      screen.getByText(
        "Intrusion Detection System for Applications using Linux Containers",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Securing Cloud Containers through Host-based Intrusion Detection",
      ),
    ).toBeInTheDocument();
  });
});
