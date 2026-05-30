"use client";

import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

import {
  ReactNode,
  useState,
  useContext,
  createContext,
  useMemo,
  useCallback,
} from "react";

import { withSuspense } from "./suspense";
import { useUrlSync } from "./sync";

type SearchContextType = {
  query: string;
  setQuery: (query: string) => void;
};

type DebouncedSearchContextType = {
  debouncedQuery: string;
};

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);

export const DebouncedSearchContext = createContext<
  DebouncedSearchContextType | undefined
>(undefined);

// Custom hook to use the search context for raw query and setter
export const useSearch: () => SearchContextType = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

// Custom hook to use the debounced search query
// ⚡ Optimization: Use this hook in components that only need the debounced value
// to avoid re-renders on every keystroke.
export const useDebouncedSearch: () => DebouncedSearchContextType = () => {
  const context = useContext(DebouncedSearchContext);
  if (!context) {
    throw new Error("useDebouncedSearch must be used within a SearchProvider");
  }
  return context;
};

const SearchContent = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams.get("query") || "");
  const [debouncedQuery] = useDebounce(query, 300);

  const updateUrl = useCallback((params: URLSearchParams, query: string) => {
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
  }, []);

  // Use debouncedQuery for URL synchronization to reduce router.replace calls during typing
  useUrlSync(debouncedQuery, updateUrl);

  const searchContextValue = useMemo(
    () => ({ query, setQuery }),
    [query, setQuery],
  );

  const debouncedSearchContextValue = useMemo(
    () => ({ debouncedQuery }),
    [debouncedQuery],
  );

  return (
    <SearchContext.Provider value={searchContextValue}>
      <DebouncedSearchContext.Provider value={debouncedSearchContextValue}>
        {children}
      </DebouncedSearchContext.Provider>
    </SearchContext.Provider>
  );
};

export const SearchProvider = withSuspense(SearchContent);
