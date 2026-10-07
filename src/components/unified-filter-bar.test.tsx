/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";

import { render, screen, fireEvent } from "@testing-library/react";

import { UnifiedFilterBar } from "./unified-filter-bar";

const mockSetSelected = vi.fn();
const mockClearAll = vi.fn();
const mockSetQuery = vi.fn();

vi.mock("@/contexts/filter", () => ({
  useFilter: () => ({
    clearAll: mockClearAll,
    activeFiltersCount: 1,
    selected: { areas: ["cloud"] },
    setSelected: mockSetSelected,
  }),
  useFilterUI: () => ({
    isFilterBarVisible: true,
  }),
}));

vi.mock("@/contexts/search", () => ({
  useSearch: () => ({ query: "test", setQuery: mockSetQuery }),
}));

vi.mock("./filter", () => ({
  Filter: ({ children }: any) => (
    <div data-testid="filter-wrapper">{children}</div>
  ),
  Selections: ({ label, setSelected }: any) => (
    <button
      data-testid={`select-${label.toLowerCase()}`}
      onClick={() => setSelected(["sample"])}
    >
      {label}
    </button>
  ),
}));

describe("UnifiedFilterBar", () => {
  it("renders correctly and triggers clearAll", () => {
    render(<UnifiedFilterBar />);
    const clearBtn = screen.getByLabelText("Clear active search and filters");
    expect(clearBtn).toBeInTheDocument();
    fireEvent.click(clearBtn);
    expect(mockSetQuery).toHaveBeenCalledWith("");
    expect(mockClearAll).toHaveBeenCalled();
  });

  it("handles filter changes via dropdown", () => {
    render(<UnifiedFilterBar />);
    fireEvent.click(screen.getByTestId("select-areas"));
    expect(mockSetSelected).toHaveBeenCalledWith("areas", ["sample"]);

    fireEvent.click(screen.getByTestId("select-skills"));
    expect(mockSetSelected).toHaveBeenCalledWith("skills", ["sample"]);

    fireEvent.click(screen.getByTestId("select-roles"));
    expect(mockSetSelected).toHaveBeenCalledWith("roles", ["sample"]);
  });
});
