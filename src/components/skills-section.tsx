"use client";

import { useMemo } from "react";
import { useSearch } from "@/contexts/search";
import skillsData from "@/data/skills";
import { Section } from "./section";

export const SkillsSection = () => {
  const { debouncedQuery } = useSearch();

  const filteredSkills = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();
    return Object.values(skillsData).filter((skill) => {
      return !lowercaseQuery || skill.name.toLowerCase().includes(lowercaseQuery);
    });
  }, [debouncedQuery]);

  return (
    <Section id="skills" title="Technical Skills" count={filteredSkills.length}>
      {filteredSkills.map((skill) => (
        <div
          className="transition-all duration-700 section-item md:py-5 w-[120px] md:w-[150px]"
          key={skill.name}
        >
          <p className="md:text-4xl text-2xl">{skill.icon}</p>
          <p>{skill.name}</p>
        </div>
      ))}
    </Section>
  );
};
