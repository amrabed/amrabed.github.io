"use client";

import { useMemo } from "react";
import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import positionsData from "@/data/positions";
import { filterByQuery, filterByArea } from "@/filter";
import Timeline from "@/app/positions/timeline";
import { Section } from "./section";

export const ExperienceSection = () => {
  const { debouncedQuery } = useSearch();
  const { selectedAreas } = useFilter();

  const filteredPositions = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();
    return positionsData.filter((position) => {
      const matchesQuery = filterByQuery(position, lowercaseQuery);
      const matchesArea = filterByArea(position.tags, selectedAreas);
      return matchesQuery && matchesArea;
    });
  }, [debouncedQuery, selectedAreas]);

  return (
    <Section id="experience" title="Experience" count={filteredPositions.length}>
      <div className="w-full mt-8 px-4 md:px-10">
        <Timeline positions={filteredPositions} />
      </div>
    </Section>
  );
};
