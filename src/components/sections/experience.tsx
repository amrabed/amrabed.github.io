"use client";

import { useMemo } from "react";

import Timeline from "@/app/positions/timeline";
import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import positionsData from "@/data/positions";
import { filterByQuery, filterByArea } from "@/filter";

import { EmptyState } from "../empty-state";
import { Section } from "../section";

export const ExperienceSection = () => {
  const { debouncedQuery } = useSearch();
  const { selected } = useFilter();

  const filteredPositions = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();
    const selectedAreas = new Set(selected["areas"] || []);
    const selectedRoles = new Set(selected["roles"] || []);
    const selectedSkills = new Set(selected["skills"] || []);

    return positionsData.filter((position) => {
      const matchesQuery = filterByQuery(position, lowercaseQuery);
      const matchesArea = filterByArea(position.tags, selectedAreas);
      const matchesRole =
        selectedRoles.size === 0 ||
        position.roles.some((r) => selectedRoles.has(r.toLowerCase()));
      const matchesSkill =
        selectedSkills.size === 0 ||
        position.skills.some((s) => selectedSkills.has(s.toLowerCase()));
      return matchesQuery && matchesArea && matchesRole && matchesSkill;
    });
  }, [debouncedQuery, selected]);

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
