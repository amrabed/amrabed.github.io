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
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-background/90 backdrop-blur-md border-t border-divider py-4 px-6 shadow-[0_-10px_50px_-15px_rgba(0,0,0,0.3)] transition-all duration-500">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-center justify-between">
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
