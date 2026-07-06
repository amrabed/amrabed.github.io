import { describe, expect, it, vi, beforeEach } from "vitest";


import { render, act, renderHook } from "@testing-library/react";

import { useFilter, FilterProvider } from "./filter";
import { useHeader, default as HeaderProvider } from "./header";
import { useSearch, useDebouncedSearch, SearchProvider } from "./search";
import { withSuspense } from "./suspense";
import { useUrlSync } from "./sync";
import { useTheme, default as ThemeProvider } from "./theme";

// Mock next/navigation
const mockReplace = vi.fn();
const mockGet = vi.fn();
const mockEntries = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => "/current-path",
  useSearchParams: () => ({
    get: mockGet,
    entries: mockEntries,
    [Symbol.iterator]: function* () {
      yield* mockEntries();
    },
  }),
}));

describe("React Contexts & Hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    if (typeof localStorage !== "undefined" && localStorage.clear) localStorage.clear();
    mockEntries.mockReturnValue([]);
    mockGet.mockReturnValue(null);
  });

  describe("Suspense Context (withSuspense)", () => {
    it("should render wrapped component within a Suspense boundary", () => {
      const DummyComponent = () => <div data-testid="dummy">Dummy</div>;
      const Wrapped = withSuspense(DummyComponent);
      const { getByTestId } = render(<Wrapped />);
      expect(getByTestId("dummy")).toBeInTheDocument();
    });
  });

  describe("Theme Context & Hook", () => {
    it("should default to dark theme and persist toggle changes", () => {
      const TestComponent = () => {
        const { theme, toggleTheme } = useTheme();
        return (
          <div>
            <span data-testid="theme">{theme}</span>
            <button data-testid="toggle" onClick={toggleTheme}>
              Toggle
            </button>
          </div>
        );
      };

      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(getByTestId("theme").textContent).toBe("dark");

      act(() => {
        getByTestId("toggle").click();
      });

      expect(getByTestId("theme").textContent).toBe("light");
      expect(localStorage.getItem("currentTheme")).toBe("light");

      act(() => {
        getByTestId("toggle").click();
      });

      expect(getByTestId("theme").textContent).toBe("dark");
      expect(localStorage.getItem("currentTheme")).toBe("dark");
    });

    it("should load persisted theme from localStorage", () => {
      localStorage.setItem("currentTheme", "light");

      const TestComponent = () => {
        const { theme } = useTheme();
        return <span data-testid="theme">{theme}</span>;
      };

      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(getByTestId("theme").textContent).toBe("light");
    });

    it("should throw error if useTheme is called outside provider", () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => renderHook(() => useTheme())).toThrow(
        "useTheme must be used within a ThemeProvider",
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe("Header Context & Hook", () => {
    it("should handle scroll events to show/hide header", () => {
      const TestComponent = () => {
        const { top } = useHeader();
        return <span data-testid="top">{top}</span>;
      };

      const { getByTestId } = render(
        <HeaderProvider>
          <TestComponent />
        </HeaderProvider>,
      );

      expect(getByTestId("top").textContent).toBe("-80px");

      // Mock scroll y > 0
      window.scrollY = 100;
      act(() => {
        window.dispatchEvent(new Event("scroll"));
      });
      expect(getByTestId("top").textContent).toBe("0");

      // Mock scroll back to 0
      window.scrollY = 0;
      act(() => {
        window.dispatchEvent(new Event("scroll"));
      });
      expect(getByTestId("top").textContent).toBe("-80px");
    });

    it("should throw error if useHeader is called outside provider", () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => renderHook(() => useHeader())).toThrow(
        "useHeader must be used within a HeaderProvider",
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe("UrlSync Hook", () => {
    it("should sync state to URL params", () => {
      mockEntries.mockReturnValue([]);

      const updateUrl = vi.fn((params, state) => {
        params.set("test", state);
      });

      renderHook(() => useUrlSync("my-state", updateUrl));

      expect(mockReplace).toHaveBeenCalledWith("/current-path?test=my-state", {
        scroll: false,
      });
    });
  });

  describe("Search Context & Hooks", () => {
    it("should handle query updates and debounce them", async () => {
      mockGet.mockReturnValue("");
      vi.useFakeTimers();

      const TestComponent = () => {
        const { query, setQuery } = useSearch();
        const { debouncedQuery } = useDebouncedSearch();
        return (
          <div>
            <span data-testid="query">{query}</span>
            <span data-testid="debounced">{debouncedQuery}</span>
            <button data-testid="set" onClick={() => setQuery("search-term")}>
              Set
            </button>
          </div>
        );
      };

      const { getByTestId } = render(
        <SearchProvider>
          <TestComponent />
        </SearchProvider>,
      );

      expect(getByTestId("query").textContent).toBe("");
      expect(getByTestId("debounced").textContent).toBe("");

      act(() => {
        getByTestId("set").click();
      });

      expect(getByTestId("query").textContent).toBe("search-term");
      expect(getByTestId("debounced").textContent).toBe(""); // Not debounced yet

      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(getByTestId("debounced").textContent).toBe("search-term");
      vi.useRealTimers();
    });

    it("should throw error if useSearch is called outside provider", () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => renderHook(() => useSearch())).toThrow(
        "useSearch must be used within a SearchProvider",
      );
      consoleErrorSpy.mockRestore();
    });

    it("should throw error if useDebouncedSearch is called outside provider", () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => renderHook(() => useDebouncedSearch())).toThrow(
        "useDebouncedSearch must be used within a SearchProvider",
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe("Filter Context & Hook", () => {
    it("should allow getting/setting filters and clearing them", () => {
      mockEntries.mockReturnValue([
        ["areas", "frontend,backend"],
        ["query", "term"],
      ]);

      const TestComponent = () => {
        const {
          selected,
          setSelected,
          clearAll,
          isFilterBarVisible,
          setIsFilterBarVisible,
        } = useFilter();
        return (
          <div>
            <span data-testid="areas">{selected.areas?.join(",")}</span>
            <span data-testid="visible">
              {isFilterBarVisible ? "yes" : "no"}
            </span>
            <button
              data-testid="set-role"
              onClick={() => setSelected("roles", ["developer"])}
            >
              Set Role
            </button>
            <button
              data-testid="toggle-vis"
              onClick={() => setIsFilterBarVisible(true)}
            >
              Show
            </button>
            <button data-testid="clear" onClick={clearAll}>
              Clear
            </button>
          </div>
        );
      };

      const { getByTestId } = render(
        <FilterProvider>
          <TestComponent />
        </FilterProvider>,
      );

      expect(getByTestId("areas").textContent).toBe("frontend,backend");
      expect(getByTestId("visible").textContent).toBe("no");

      act(() => {
        getByTestId("toggle-vis").click();
      });
      expect(getByTestId("visible").textContent).toBe("yes");

      act(() => {
        getByTestId("set-role").click();
      });

      act(() => {
        getByTestId("clear").click();
      });

      expect(getByTestId("areas").textContent).toBe("");
    });

    it("should throw error if useFilter is called outside provider", () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      expect(() => renderHook(() => useFilter())).toThrow(
        "useFilter must be used within a FilterProvider",
      );
      consoleErrorSpy.mockRestore();
    });
  });
});
