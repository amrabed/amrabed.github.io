"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  ReactNode,
  useState,
  useEffect,
  useContext,
  createContext,
} from "react";

type FilterContextType = {
  selected: string[];
  setSelected: (selected: string[]) => void;
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
  const [selected, setSelected] = useState<string[]>([]);
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    // Update the URL when filters change
    const params = new URLSearchParams();
    if (selected && selected.length) {
      params.set("filters", selected.join(","));
    } else {
      params.delete("filters");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [selected, replace, pathname]);

  return (
    <FilterContext.Provider value={{ selected, setSelected: setSelected }}>
      {children}
    </FilterContext.Provider>
  );
};
