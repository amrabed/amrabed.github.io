"use client";

import React, { useMemo } from "react";

import { EmptyState } from "@/components/empty-state";
import { Section } from "@/components/section";
import { useFilter } from "@/contexts/filter";
import { useDebouncedSearch } from "@/contexts/search";
import { Position, Project, Certification, Degree, Publication } from "@/types";
import { filterByQuery, filterByArea } from "@/utils/filter";

export interface FilterableItem {
  tags?: string[];
  roles?: string[];
  areas?: string[];
  skills?: string[];
  tools?: string[];
  year?: string;
  date?: string;
}

type SupportedItem = Project | Position | Certification | Degree | Publication;

interface FilterableSectionProps<T extends FilterableItem> {
  id: string;
  title: string;
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  renderContainer?: (items: T[]) => React.ReactNode;
  sortFn?: (a: T, b: T) => number;
  gridClassName?: string;
}

export const FilterableSection = <T extends FilterableItem>({
  id,
  title,
  data,
  renderItem,
  renderContainer,
  sortFn,
  gridClassName = "grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 w-full px-4 md:px-10",
}: FilterableSectionProps<T>) => {
  const { debouncedQuery } = useDebouncedSearch();
  const { selected } = useFilter();
  const selectedAreasArr = selected["areas"];
  const selectedRolesArr = selected["roles"];
  const selectedSkillsArr = selected["skills"];

  // ⚡ Optimization: Consolidate filter extraction and matching into a single O(N) pass.
  // We also use an early return if no filters are active to avoid unnecessary processing.
  const matchingItems = useMemo(() => {
    const selectedAreas = new Set(selectedAreasArr || []);
    const selectedRoles = new Set(selectedRolesArr || []);
    const selectedSkills = new Set(selectedSkillsArr || []);

    if (
      selectedAreas.size === 0 &&
      selectedRoles.size === 0 &&
      selectedSkills.size === 0
    ) {
      return data;
    }

    return data.filter((item) => {
      const matchesArea = filterByArea(
        item.tags || item.areas || [],
        selectedAreas,
      );
      const matchesRole =
        selectedRoles.size === 0 ||
        (item.roles || []).some((r) => selectedRoles.has(r.toLowerCase()));
      const matchesSkill =
        selectedSkills.size === 0 ||
        (item.skills || item.tools || []).some((s) =>
          selectedSkills.has(s.toLowerCase()),
        );
      return matchesArea && matchesRole && matchesSkill;
    });
  }, [data, selectedAreasArr, selectedRolesArr, selectedSkillsArr]);

  // ⚡ Optimization: Separate search filtering from selection filtering to minimize re-computations.
  const filteredItems = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();
    const filtered = matchingItems.filter((item) =>
      filterByQuery(item as unknown as SupportedItem, lowercaseQuery),
    );

    return sortFn ? [...filtered].sort(sortFn) : filtered;
  }, [debouncedQuery, matchingItems, sortFn]);

  return (
    <Section
      id={id}
      title={title}
      contentClassName={renderContainer ? "" : gridClassName}
    >
      {filteredItems.length > 0 ? (
        renderContainer ? (
          renderContainer(filteredItems)
        ) : (
          filteredItems.map((item) => renderItem(item))
        )
      ) : (
        <EmptyState />
      )}
    </Section>
  );
};
