"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  ReactNode,
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  useCallback,
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

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelectedState] = useState<Record<string, string[]>>({});
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
    const params = new URLSearchParams();
    Object.entries(selected).forEach(([category, values]) => {
      if (values?.length) {
        params.set(category, values.join(","));
      }
    });
    const queryString = params.toString();
    replace(`${pathname}${queryString ? `?${queryString}` : ""}`);
  }, [selected, replace, pathname]);

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
