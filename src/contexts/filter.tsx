"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  ReactNode,
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  useCallback,
  Suspense,
} from "react";

type FilterContextType = {
  selected: Record<string, string[]>;
  setSelected: (category: string, selected: string[]) => void;
};

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

// Custom hook to use the filter context
export const useFilter: () => FilterContextType = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

const FilterContent = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();

  const [selected, setSelectedState] = useState<Record<string, string[]>>(() => {
    const initialSelected: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      if (key !== "query") {
        initialSelected[key] = value.split(",");
      }
    });
    return initialSelected;
  });

  const pathname = usePathname();
  const { replace } = useRouter();

  const setSelected = useCallback((category: string, values: string[]) => {
    setSelectedState((prev) => ({
      ...prev,
      [category]: values,
    }));
  }, []);

  useEffect(() => {
    // Update the URL when filters change
    const params = new URLSearchParams(searchParams);

    // Clear existing filter params (everything except query)
    const existingKeys = Array.from(params.keys());
    existingKeys.forEach((key) => {
      if (key !== "query") {
        params.delete(key);
      }
    });

    Object.entries(selected).forEach(([category, values]) => {
      if (values?.length) {
        params.set(category, values.join(","));
      }
    });
    const queryString = params.toString();
    replace(`${pathname}${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  }, [selected, replace, pathname, searchParams]);

  const contextValue = useMemo(
    () => ({ selected, setSelected }),
    [selected, setSelected],
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const FilterProvider = ({ children }: { children: ReactNode }) => (
  <Suspense>
    <FilterContent>{children}</FilterContent>
  </Suspense>
);
