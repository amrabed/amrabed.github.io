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

import { withSuspense } from "./suspense";
import { useUrlSync } from "./sync";

type FilterStateContextType = {
  selected: Record<string, string[]>;
  setSelected: (category: string, selected: string[]) => void;
  clearAll: () => void;
  activeFiltersCount: number;
};

type FilterUIContextType = {
  isFilterBarVisible: boolean;
  setIsFilterBarVisible: (visible: boolean) => void;
};

export const FilterStateContext = createContext<
  FilterStateContextType | undefined
>(undefined);

export const FilterUIContext = createContext<FilterUIContextType | undefined>(
  undefined,
);

// ⚡ Optimization: Split the Filter context into State and UI to prevent unnecessary re-renders.
// Components that only need filter selections (like portfolio sections) won't re-render
// when the filter bar visibility changes during scroll.
export const useFilter: () => FilterStateContextType = () => {
  const context = useContext(FilterStateContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

export const useFilterUI: () => FilterUIContextType = () => {
  const context = useContext(FilterUIContext);
  if (!context) {
    throw new Error("useFilterUI must be used within a FilterProvider");
  }
  return context;
};

const FilterContent = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();

  const [selected, setSelectedState] = useState<Record<string, string[]>>(
    () => {
      const initial: Record<string, string[]> = {};
      const params = Array.from(searchParams.entries());
      params.forEach(([k, val]) => {
        if (k !== "query") initial[k] = val.split(",");
      });
      return initial;
    },
  );

  const [isFilterBarVisible, setIsFilterBarVisible] = useState(false);

  const setSelected = useCallback((cat: string, vals: string[]) => {
    setSelectedState((prev) => ({ ...prev, [cat]: vals }));
  }, []);

  const clearAll = useCallback(() => {
    setSelectedState({});
  }, []);

  const updateUrl = useCallback(
    (params: URLSearchParams, s: Record<string, string[]>) => {
      Array.from(params.keys()).forEach((k) => {
        if (k !== "query") params.delete(k);
      });
      Object.entries(s).forEach(([k, v]) => {
        if (v?.length) params.set(k, v.join(","));
      });
    },
    [],
  );

  useUrlSync(selected, updateUrl);

  const activeFiltersCount = useMemo(
    () => Object.values(selected).reduce((acc, curr) => acc + curr.length, 0),
    [selected],
  );

  const stateValue = useMemo(
    () => ({
      selected,
      setSelected,
      clearAll,
      activeFiltersCount,
    }),
    [selected, setSelected, clearAll, activeFiltersCount],
  );

  const uiValue = useMemo(
    () => ({
      isFilterBarVisible,
      setIsFilterBarVisible,
    }),
    [isFilterBarVisible],
  );

  return (
    <FilterStateContext.Provider value={stateValue}>
      <FilterUIContext.Provider value={uiValue}>
        {children}
      </FilterUIContext.Provider>
    </FilterStateContext.Provider>
  );
};

export const FilterProvider = withSuspense(FilterContent);
