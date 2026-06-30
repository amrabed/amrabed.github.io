import { describe, expect, it, vi } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { FilterableSection } from "./filterable-section";

const mockUseFilter = vi.fn();
vi.mock("@/contexts/filter", () => ({
  useFilter: () => mockUseFilter(),
}));

vi.mock("@/contexts/search", () => ({
  useDebouncedSearch: () => ({
    debouncedQuery: ""
  }),
}));

vi.mock("./section", () => ({
  Section: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("./empty-state", () => ({
  EmptyState: () => <div>Empty</div>,
}));

describe("FilterableSection", () => {
  const mockData = [
    { id: "1", name: "Project 1", tags: ["web"], roles: ["engineer"], skills: ["react"] },
    { id: "2", name: "Project 2", tags: ["mobile"], roles: ["manager"], skills: ["flutter"] },
  ];

  it("should return all items when no filters are selected", () => {
    mockUseFilter.mockReturnValue({
      selected: { areas: [], roles: [], skills: [] }
    });
    const { getByText } = render(
      <FilterableSection
        id="test"
        title="Test"
        data={mockData}
        renderItem={(item) => <div key={item.id}>{item.name}</div>}
      />
    );
    expect(getByText("Project 1")).toBeInTheDocument();
    expect(getByText("Project 2")).toBeInTheDocument();
  });

  it("should filter items based on selected area", () => {
    mockUseFilter.mockReturnValue({
      selected: { areas: ["web"], roles: [], skills: [] }
    });
    const { getByText, queryByText } = render(
      <FilterableSection
        id="test"
        title="Test"
        data={mockData}
        renderItem={(item) => <div key={item.id}>{item.name}</div>}
      />
    );
    expect(getByText("Project 1")).toBeInTheDocument();
    expect(queryByText("Project 2")).not.toBeInTheDocument();
  });

  it("should filter items based on selected role", () => {
    mockUseFilter.mockReturnValue({
      selected: { areas: [], roles: ["engineer"], skills: [] }
    });
    const { getByText, queryByText } = render(
      <FilterableSection
        id="test"
        title="Test"
        data={mockData}
        renderItem={(item) => <div key={item.id}>{item.name}</div>}
      />
    );
    expect(getByText("Project 1")).toBeInTheDocument();
    expect(queryByText("Project 2")).not.toBeInTheDocument();
  });

  it("should filter items based on selected skill", () => {
    mockUseFilter.mockReturnValue({
      selected: { areas: [], roles: [], skills: ["react"] }
    });
    const { getByText, queryByText } = render(
      <FilterableSection
        id="test"
        title="Test"
        data={mockData}
        renderItem={(item) => <div key={item.id}>{item.name}</div>}
      />
    );
    expect(getByText("Project 1")).toBeInTheDocument();
    expect(queryByText("Project 2")).not.toBeInTheDocument();
  });

  it("should render EmptyState when no items match", () => {
    mockUseFilter.mockReturnValue({
      selected: { areas: ["non-existent"], roles: [], skills: [] }
    });
    const { getByText } = render(
      <FilterableSection
        id="test"
        title="Test"
        data={mockData}
        renderItem={(item) => <div key={item.id}>{item.name}</div>}
      />
    );
    expect(getByText("Empty")).toBeInTheDocument();
  });
});
