"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  ReactNode,
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from "react";

type SearchContextType = {
  query: string;
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

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string>("");
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    // Update the URL when query changes
    const params = new URLSearchParams();
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [query, replace, pathname]);
  const contextValue = useMemo(() => ({ query, setQuery }), [query, setQuery]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
