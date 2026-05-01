"use client";

import { useSearchParams } from "next/navigation";

import {
  ReactNode,
  useState,
  useContext,
  createContext,
  useMemo,
  useCallback,
} from "react";
import { useDebounce } from "use-debounce";

import { withSuspense } from "./suspense";
import { useUrlSync } from "./sync";

type SearchContextType = {
  query: string;
  debouncedQuery: string;
  setQuery: (query: string) => void;
};

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);

// Custom hook to use the search context
export const useSearch: () => SearchContextType = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
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

  useUrlSync(debouncedQuery, updateUrl);

  const contextValue = useMemo(
    () => ({ query, debouncedQuery, setQuery }),
    [query, debouncedQuery],
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const SearchProvider = withSuspense(SearchContent);
