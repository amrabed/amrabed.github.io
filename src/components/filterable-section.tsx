"use client";

import React, { useMemo } from "react";

import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import { filterByQuery, filterByArea } from "@/filter";

import { EmptyState } from "@/components/empty-state";
import { Section } from "@/components/section";

interface FilterableItem {
  tags: string[];
  roles: string[];
  skills?: string[];
  tools?: string[];
  year?: string;
  date?: string;
}

interface FilterableSectionProps<T extends FilterableItem> {
  id: string;
  title: string;
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  sortFn?: (a: T, b: T) => number;
  gridClassName?: string;
}

export const FilterableSection = <T extends FilterableItem>({
  id,
  title,
  data,
  renderItem,
  sortFn,
  gridClassName = "grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 w-full px-4 md:px-10",
}: FilterableSectionProps<T>) => {
  const { debouncedQuery } = useSearch();
  const { selected } = useFilter();

  const areas = selected["areas"];
  const roles = selected["roles"];
  const skills = selected["skills"];

  const selectedAreas = useMemo(() => new Set(areas || []), [areas]);
  const selectedRoles = useMemo(() => new Set(roles || []), [roles]);
  const selectedSkills = useMemo(() => new Set(skills || []), [skills]);

  const matchingItems = useMemo(() => {
    return data.filter((item) => {
      const matchesArea = filterByArea(item.tags, selectedAreas);
      const matchesRole =
        selectedRoles.size === 0 ||
        item.roles.some((r) => selectedRoles.has(r.toLowerCase()));
      const matchesSkill =
        selectedSkills.size === 0 ||
        (item.skills || item.tools || []).some((s) =>
          selectedSkills.has(s.toLowerCase()),
        );
      return matchesArea && matchesRole && matchesSkill;
    });
  }, [data, selectedAreas, selectedRoles, selectedSkills]);

  const filteredItems = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();
    const filtered = matchingItems.filter((item) =>
      filterByQuery(item as any, lowercaseQuery),
    );

    return sortFn ? filtered.sort(sortFn) : filtered;
  }, [debouncedQuery, matchingItems, sortFn]);

  return (
    <Section id={id} title={title}>
      {filteredItems.length > 0 ? (
        <div className={gridClassName}>{filteredItems.map(renderItem)}</div>
      ) : (
        <EmptyState />
      )}
    </Section>
  );
};
