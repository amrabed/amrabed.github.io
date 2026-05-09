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
  selectedAreas: Set<string>;
  toggleArea: (area: string) => void;
  clearAll: () => void;
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

  const [selectedAreas, setSelectedAreas] = useState<Set<string>>(() => {
    const areas = searchParams.get("areas");
    return areas ? new Set(areas.split(",")) : new Set();
  });

  const toggleArea = useCallback((area: string) => {
    setSelectedAreas((prev) => {
      const next = new Set(prev);
      if (next.has(area)) {
        next.delete(area);
      } else {
        next.add(area);
      }
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedAreas(new Set());
  }, []);

  const updateUrl = useCallback((params: URLSearchParams, areas: Set<string>) => {
    if (areas.size > 0) {
      params.set("areas", Array.from(areas).join(","));
    } else {
      params.delete("areas");
    }
  }, []);

  useUrlSync(selectedAreas, updateUrl);

  const contextValue = useMemo(
    () => ({ selectedAreas, toggleArea, clearAll }),
    [selectedAreas, toggleArea, clearAll],
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const FilterProvider = withSuspense(FilterContent);
