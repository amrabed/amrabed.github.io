"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import areas from "@/data/areas";
import roles from "@/data/roles";
import skills from "@/data/skills";

import { Filter, Selections } from "./filter";
import { Searchbar } from "./search";

export const UnifiedFilterBar = () => {
  const { query, setQuery } = useSearch();
  const { selected, setSelected, clearAll } = useFilter();

  const hasFilters =
    query !== "" || Object.values(selected).some((v) => v.length > 0);

  const handleClearAll = () => {
    setQuery("");
    clearAll();
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 w-full bg-background/90 backdrop-blur-md border-t border-divider py-3 px-4 sm:px-6 shadow-[0_-10px_50px_-15px_rgba(0,0,0,0.3)]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex-grow max-w-2xl flex items-center">
          <Searchbar
            placeholder="Search everything..."
            query={query}
            setQuery={setQuery}
            className="rounded-l-2xl rounded-r-none border-r-0"
            autoFocus={false}
          />
          <Filter className="rounded-l-none rounded-r-2xl border-l-0 bg-white dark:bg-slate-800 h-[38px] min-w-[48px] hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-zinc-200 dark:border-zinc-700">
            <Selections
              label="Areas"
              values={Object.entries(areas).map(([id, a]) => ({
                id,
                name: a.name,
                icon: a.icon,
              }))}
              selected={selected["areas"] || []}
              setSelected={(vals) => setSelected("areas", vals)}
            />
            <Selections
              label="Skills"
              values={Object.entries(skills).map(([id, s]) => ({
                id,
                name: s.name,
                icon: s.icon,
              }))}
              selected={selected["skills"] || []}
              setSelected={(vals) => setSelected("skills", vals)}
            />
            <Selections
              label="Roles"
              values={Object.entries(roles).map(([id, r]) => ({
                id,
                name: r.name,
              }))}
              selected={selected["roles"] || []}
              setSelected={(vals) => setSelected("roles", vals)}
            />
          </Filter>
        </div>

        {hasFilters && (
          <div className="ml-2 flex items-center">
            <Button
              variant="danger-soft"
              size="sm"
              onPress={handleClearAll}
              className="font-medium flex gap-1 items-center rounded-full px-4"
            >
              <XMarkIcon className="size-4" />
              <span>Clear</span>
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
