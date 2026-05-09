"use client";

import { useMemo } from "react";
import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import skillAreas from "@/data/skillAreas";
import skillsData from "@/data/skills";
import { Section } from "./section";

export const SkillsSection = () => {
  const { debouncedQuery } = useSearch();
  const { selectedAreas } = useFilter();

  const filteredSkills = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();
    return Object.entries(skillsData).filter(([key, skill]) => {
      // Search filter
      const matchesQuery = !lowercaseQuery ||
        skill.name.toLowerCase().includes(lowercaseQuery) ||
        (skillAreas[key] && skillAreas[key].some(area => area.toLowerCase().includes(lowercaseQuery)));

      return matchesQuery;
    });
  }, [debouncedQuery]);

  const sortedSkills = useMemo(() => {
    return [...filteredSkills].sort((a, b) => {
      const aSelected = skillAreas[a[0]]?.some(area => selectedAreas.has(area));
      const bSelected = skillAreas[b[0]]?.some(area => selectedAreas.has(area));
      if (aSelected && !bSelected) return -1;
      if (!aSelected && aSelected) return 1;
      return a[1].name.localeCompare(b[1].name);
    });
  }, [filteredSkills, selectedAreas]);

  return (
    <Section id="skills" title="Skills" count={filteredSkills.length}>
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {sortedSkills.map(([key, skill]) => {
          const isHighlighted = selectedAreas.size === 0 ||
            (skillAreas[key] && skillAreas[key].some(area => selectedAreas.has(area)));

          return (
            <div
              key={key}
              className={`transition-all duration-500 flex flex-col items-center gap-2 p-4 rounded-xl border ${
                isHighlighted
                  ? "bg-white dark:bg-slate-900 border-primary shadow-md scale-105"
                  : "bg-slate-50 dark:bg-slate-950 border-transparent opacity-40 grayscale scale-95"
              }`}
              style={{ color: isHighlighted && typeof skill.color === "string" ? skill.color : undefined }}
            >
              <span className="text-4xl">{skill.icon}</span>
              <span className="text-sm font-semibold text-foreground">{skill.name}</span>
            </div>
          );
        })}
      </div>
      {filteredSkills.length === 0 && (
        <p className="text-center text-slate-500 w-full py-8">No skills match your search.</p>
      )}
    </Section>
  );
};
