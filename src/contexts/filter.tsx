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

type FilterContextType = {
  selected: Record<string, string[]>;
  setSelected: (category: string, selected: string[]) => void;
  clearAll: () => void;
  isFilterBarVisible: boolean;
  setIsFilterBarVisible: (visible: boolean) => void;
};

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

export const useFilter: () => FilterContextType = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
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

  const contextValue = useMemo(
    () => ({ selected, setSelected, clearAll, isFilterBarVisible, setIsFilterBarVisible }),
    [selected, setSelected, clearAll, isFilterBarVisible],
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const FilterProvider = withSuspense(FilterContent);
