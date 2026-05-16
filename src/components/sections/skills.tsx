"use client";

import { useMemo } from "react";

import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import areaSkills from "@/data/areaSkills";
import skillsData from "@/data/skills";

import { EmptyState } from "../empty-state";
import { Section } from "../section";

export const SkillsSection = () => {
  const { debouncedQuery } = useSearch();
  const { selected } = useFilter();

  const areas = selected["areas"];

  // ⚡ Optimization: Memoize areaMatchingSkills separately from the query filter.
  // This avoids re-calculating the matching skills set when only the search query changes.
  const areaMatchingSkills = useMemo(() => {
    const matchingSkills = new Set<string>();
    if (!areas || areas.length === 0) {
      Object.keys(skillsData).forEach((s) => matchingSkills.add(s));
    } else {
      areas.forEach((area) => {
        areaSkills[area]?.forEach((skill) => matchingSkills.add(skill));
      });
    }
    return matchingSkills;
  }, [areas]);

  // ⚡ Optimization: filteredSkills now only depends on debouncedQuery and the memoized areaMatchingSkills.
  const filteredSkills = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();

    return Object.entries(skillsData).filter(([key, skill]) => {
      const matchesQuery =
        !lowercaseQuery || skill.name.toLowerCase().includes(lowercaseQuery);
      const matchesArea = areaMatchingSkills.has(key);
      return matchesQuery && matchesArea;
    });
  }, [debouncedQuery, areaMatchingSkills]);

  return (
    <Section id="skills" title="Technical Skills">
      <div className="section-body">
        {filteredSkills.length > 0 ? (
          filteredSkills.map(([, skill]) => (
            <div
              className="transition-all duration-700 section-item md:py-5 w-[120px] md:w-[150px]"
              key={skill.name}
            >
              <p className="md:text-4xl text-2xl">{skill.icon}</p>
              <p>{skill.name}</p>
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </Section>
  );
};
