"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";

export const EmptyState = () => {
  const { setQuery } = useSearch();
  const { clearAll } = useFilter();

  const handleClearAll = () => {
    setQuery("");
    clearAll();
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center w-full">
      <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-6">
        <MagnifyingGlassIcon className="size-12 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
        No results found
      </h3>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
        We couldn't find anything matching your search or filters. Try adjusting
        your criteria or clear all filters to start over.
      </p>
      <Button
        variant="primary"
        onPress={handleClearAll}
        className="font-medium px-8"
      >
        Clear all filters
      </Button>
    </div>
  );
};
