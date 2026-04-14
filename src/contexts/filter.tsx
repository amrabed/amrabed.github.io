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
    const initial: Record<string, string[]> = {};
    searchParams.forEach((val, k) => {
      if (k !== "query") initial[k] = val.split(",");
    });
    return initial;
  });

  const setSelected = useCallback((cat: string, vals: string[]) => {
    setSelectedState((prev) => ({ ...prev, [cat]: vals }));
  }, []);

  const update = useCallback((p: URLSearchParams, s: Record<string, string[]>) => {
    Array.from(p.keys()).forEach((k) => {
      if (k !== "query") p.delete(k);
    });
    Object.entries(s).forEach(([k, v]) => {
      if (v?.length) p.set(k, v.join(","));
    });
  }, []);

  useUrlSync(selected, update);

  const contextValue = useMemo(() => ({ selected, setSelected }), [selected, setSelected]);

  return <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>;
};

export const FilterProvider = withSuspense(FilterContent);
