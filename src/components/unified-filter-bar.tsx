"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import areas from "@/data/areas";

import { Searchbar } from "./search";

export const UnifiedFilterBar = () => {
  const { query, setQuery } = useSearch();
  const { selectedAreas, toggleArea, clearAll } = useFilter();

  const hasFilters = query !== "" || selectedAreas.size > 0;

  const handleClearAll = () => {
    setQuery("");
    clearAll();
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl bg-background/90 backdrop-blur-md border border-divider py-4 px-6 rounded-2xl shadow-2xl transition-all duration-500">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="w-full lg:w-1/3">
          <Searchbar
            placeholder="Search everything..."
            query={query}
            setQuery={setQuery}
          />
        </div>
        <div className="flex flex-wrap gap-2 flex-1 justify-center lg:justify-start lg:px-4">
          {Object.entries(areas).map(([key, area]) => {
            const isSelected = selectedAreas.has(key);
            return (
              <Button
                key={key}
                size="sm"
                variant={isSelected ? "primary" : "secondary"}
                onPress={() => toggleArea(key)}
                aria-pressed={isSelected}
                className="h-8 px-3 transition-all rounded-full flex gap-2 items-center"
              >
                <span className="flex items-center size-4">{area.icon}</span>
                <span className="hidden sm:inline">{area.name}</span>
              </Button>
            );
          })}
        </div>
        <div className="min-w-[100px] flex justify-end">
          {hasFilters && (
            <Button
              variant="danger-soft"
              size="sm"
              onPress={handleClearAll}
              className="font-medium flex gap-1 items-center"
            >
              <XMarkIcon className="size-4" />
              <span className="hidden sm:inline">Clear all</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
