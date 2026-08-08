/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";

import React, { ReactNode } from "react";

import { render } from "@testing-library/react";

import { useFilter } from "@/contexts/filter";
import { useDebouncedSearch } from "@/contexts/search";

import { SkillsSection } from "./skills";

// Mock the context hooks
vi.mock("@/contexts/filter", () => ({
  useFilter: vi.fn(),
}));

vi.mock("@/contexts/search", () => ({
  useDebouncedSearch: vi.fn(),
}));

// Mock Section and EmptyState to simplify output checking
vi.mock("../section", () => ({
  Section: ({ children, title }: { children: ReactNode; title: string }) => (
    <div data-testid="section" data-title={title}>
      {children}
    </div>
  ),
}));

vi.mock("../empty-state", () => ({
  EmptyState: () => <div data-testid="empty-state">No results found</div>,
}));

describe("SkillsSection", () => {
  let mockSelected: Record<string, string[]> = {};
  let mockDebouncedQuery = "";

  beforeEach(() => {
    vi.clearAllMocks();
    mockSelected = {};
    mockDebouncedQuery = "";

    (useFilter as any).mockReturnValue({
      selected: mockSelected,
    });
    (useDebouncedSearch as any).mockReturnValue({
      debouncedQuery: mockDebouncedQuery,
    });
  });

  it("renders all skills by default when no search query or filter is applied", () => {
    const { container } = render(<SkillsSection />);
    expect(container.textContent).toContain("Python");
    expect(container.textContent).toContain("TypeScript");
    expect(container.textContent).toContain("Java");
    expect(
      container.querySelector('[data-testid="empty-state"]'),
    ).not.toBeInTheDocument();
  });

  it("filters skills by search query", () => {
    (useDebouncedSearch as any).mockReturnValue({
      debouncedQuery: "Python",
    });

    const { container } = render(<SkillsSection />);
    expect(container.textContent).toContain("Python");
    expect(container.textContent).not.toContain("TypeScript");
    expect(container.textContent).not.toContain("Java");
  });

  it("filters skills by selected areas", () => {
    mockSelected["areas"] = ["cloud"];
    (useFilter as any).mockReturnValue({
      selected: mockSelected,
    });

    const { container } = render(<SkillsSection />);
    // Cloud skills in areaSkills include AWS, Docker, Kubernetes, etc. but not Kotlin or Java
    expect(container.textContent).toContain("AWS");
    expect(container.textContent).toContain("Docker");
    expect(container.textContent).not.toContain("Kotlin");
  });

  it("filters skills by specifically selected skills", () => {
    mockSelected["skills"] = ["kotlin", "swift"];
    (useFilter as any).mockReturnValue({
      selected: mockSelected,
    });

    const { container } = render(<SkillsSection />);
    expect(container.textContent).toContain("Kotlin");
    expect(container.textContent).toContain("Swift");
    expect(container.textContent).not.toContain("Python");
  });

  it("renders EmptyState when no skills match the search/filter criteria", () => {
    (useDebouncedSearch as any).mockReturnValue({
      debouncedQuery: "non_existent_skill_name_xyz",
    });

    const { getByTestId, queryByText } = render(<SkillsSection />);
    expect(getByTestId("empty-state")).toBeInTheDocument();
    expect(queryByText("Python")).not.toBeInTheDocument();
  });
});
