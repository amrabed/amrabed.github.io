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

import { useUrlSync, withSuspense } from "./utils";

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

  const setSelected = useCallback((category: string, values: string[]) => {
    setSelectedState((prev) => ({
      ...prev,
      [category]: values,
    }));
  }, []);

  const updateUrl = useCallback(
    (params: URLSearchParams, selected: Record<string, string[]>) => {
      Array.from(params.keys()).forEach((key) => {
        if (key !== "query") params.delete(key);
      });

      Object.entries(selected).forEach(([category, values]) => {
        if (values?.length) {
          params.set(category, values.join(","));
        }
      });
    },
    []
  );

  useUrlSync(selected, updateUrl);

  const contextValue = useMemo(
    () => ({ selected, setSelected }),
    [selected, setSelected]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const FilterProvider = withSuspense(FilterContent);
