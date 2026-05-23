"use client";

import { useMemo } from "react";

import Timeline from "@/components/timeline";
import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import positionsData from "@/data/positions";
import { filterByQuery, filterByArea } from "@/filter";

import { EmptyState } from "../empty-state";
import { Section } from "../section";

export const ExperienceSection = () => {
  const { debouncedQuery } = useSearch();
  const { selected } = useFilter();

  const areas = selected["areas"];
  const roles = selected["roles"];
  const skills = selected["skills"];

  // ⚡ Optimization: Memoize filter sets separately to avoid recreating them
  // unless the specific filter category changes.
  const selectedAreas = useMemo(() => new Set(areas || []), [areas]);
  const selectedRoles = useMemo(() => new Set(roles || []), [roles]);
  const selectedSkills = useMemo(() => new Set(skills || []), [skills]);

  // ⚡ Optimization: Pre-filter positions by selected area, role, and skill.
  // This avoids re-running these checks when only the search query changes.
  const matchingPositions = useMemo(() => {
    return positionsData.filter((position) => {
      const matchesArea = filterByArea(position.tags, selectedAreas);
      const matchesRole =
        selectedRoles.size === 0 ||
        position.roles.some((r) => selectedRoles.has(r.toLowerCase()));
      const matchesSkill =
        selectedSkills.size === 0 ||
        position.skills.some((s) => selectedSkills.has(s.toLowerCase()));
      return matchesArea && matchesRole && matchesSkill;
    });
  }, [selectedAreas, selectedRoles, selectedSkills]);

  const filteredPositions = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();
    if (!lowercaseQuery) return matchingPositions;

    return matchingPositions.filter((position) =>
      filterByQuery(position, lowercaseQuery),
    );
  }, [debouncedQuery, matchingPositions]);

  return (
    <Section id="experience" title="Experience">
      {filteredPositions.length > 0 ? (
        <div className="w-full mt-8 px-4 md:px-10">
          <Timeline positions={filteredPositions} />
        </div>
      ) : (
        <EmptyState />
      )}
    </Section>
  );
};
