"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  ReactNode,
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  Suspense,
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

const SearchContent = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState<string>(initialQuery);
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    // Update the URL when query changes
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [query, replace, pathname, searchParams]);
  const contextValue = useMemo(() => ({ query, setQuery }), [query, setQuery]);

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const SearchProvider = ({ children }: { children: ReactNode }) => (
  <Suspense>
    <SearchContent>{children}</SearchContent>
  </Suspense>
);
