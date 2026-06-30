"use client";

import { useMemo, memo } from "react";

import { useFilter } from "@/contexts/filter";
import { useDebouncedSearch } from "@/contexts/search";
import areaSkills from "@/data/areaSkills";
import skillsData from "@/data/skills";

import { EmptyState } from "../empty-state";
import { Section } from "../section";

export const SkillsSection = memo(() => {
  const { debouncedQuery } = useDebouncedSearch();
  const { selected } = useFilter();

  const areas = selected["areas"];
  const skills = selected["skills"];

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

  const selectedSkills = useMemo(() => new Set(skills || []), [skills]);

  const filteredSkills = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();

    return Object.entries(skillsData).filter(([key, skill]) => {
      const matchesQuery =
        !lowercaseQuery || skill.name.toLowerCase().includes(lowercaseQuery);
      const matchesArea = areaMatchingSkills.has(key);
      const matchesSkill = selectedSkills.size === 0 || selectedSkills.has(key);
      return matchesQuery && matchesArea && matchesSkill;
    });
  }, [debouncedQuery, areaMatchingSkills, selectedSkills]);

  return (
    <Section
      id="skills"
      title="Technical Skills"
      contentClassName="section-body"
    >
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
    </Section>
  );
});

SkillsSection.displayName = "SkillsSection";
