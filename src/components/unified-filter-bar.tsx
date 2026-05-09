"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import areas from "@/data/areas";
import roles from "@/data/roles";
import skills from "@/data/skills";

import { Searchbar } from "./search";
import { Filter, Selections } from "./filter";

export const UnifiedFilterBar = () => {
  const { query, setQuery } = useSearch();
  const { selected, setSelected, clearAll } = useFilter();

  const hasFilters = query !== "" || Object.values(selected).some(v => v.length > 0);

  const handleClearAll = () => {
    setQuery("");
    clearAll();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-background/90 backdrop-blur-md border-t border-divider py-4 px-6 shadow-[0_-10px_50px_-15px_rgba(0,0,0,0.3)] transition-all duration-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-grow max-w-2xl">
          <Searchbar
            placeholder="Search everything..."
            query={query}
            setQuery={setQuery}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter>
            <Selections
              label="Areas"
              values={Object.values(areas).map((a) => a.name)}
              selected={selected["areas"] || []}
              setSelected={(vals) => setSelected("areas", vals)}
            />
            <Selections
              label="Skills"
              values={Object.values(skills).map((s) => s.name)}
              selected={selected["skills"] || []}
              setSelected={(vals) => setSelected("skills", vals)}
            />
            <Selections
                label="Roles"
                values={Object.values(roles).map((r) => r.name)}
                selected={selected["roles"] || []}
                setSelected={(vals) => setSelected("roles", vals)}
              />
          </Filter>

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
