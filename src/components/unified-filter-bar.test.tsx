import { describe, it, expect, vi } from "vitest";

import { render } from "@testing-library/react";

import { UnifiedFilterBar } from "./unified-filter-bar";

vi.mock("@/contexts/filter", () => ({
  useFilter: () => ({
    clearAll: vi.fn(),
    activeFiltersCount: 0,
    selected: {},
  }),
  useFilterUI: () => ({
    isFilterBarVisible: true,
  }),
}));
vi.mock("@/contexts/search", () => ({
  useSearch: () => ({ query: "", setQuery: vi.fn() }),
}));

describe("UnifiedFilterBar", () => {
  it("renders correctly", () => {
    const { container } = render(<UnifiedFilterBar />);
    expect(container).toBeInTheDocument();
  });
});
