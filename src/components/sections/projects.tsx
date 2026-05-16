"use client";

import { useMemo } from "react";

import ProjectView from "@/components/project";
import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import projectsData from "@/data/projects";
import { filterByQuery, filterByArea } from "@/filter";

import { EmptyState } from "../empty-state";
import { Section } from "../section";

export const ProjectsSection = () => {
  const { debouncedQuery } = useSearch();
  const { selected } = useFilter();

  const filteredProjects = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();
    const selectedAreas = new Set(selected["areas"] || []);
    const selectedRoles = new Set(selected["roles"] || []);
    const selectedSkills = new Set(selected["skills"] || []);

    return projectsData
      .filter((project) => {
        const matchesQuery = filterByQuery(project, lowercaseQuery);
        const matchesArea = filterByArea(project.tags, selectedAreas);
        const matchesRole =
          selectedRoles.size === 0 ||
          project.roles.some((r) => selectedRoles.has(r.toLowerCase()));
        const matchesSkill =
          selectedSkills.size === 0 ||
          project.tools.some((t) => selectedSkills.has(t.toLowerCase()));
        return matchesQuery && matchesArea && matchesRole && matchesSkill;
      })
      .sort((a, b) => {
        if (a.group !== b.group) return a.group - b.group;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [debouncedQuery, selected]);

  return (
    <Section id="projects" title="Projects" count={filteredProjects.length}>
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 w-full px-4 md:px-10">
          {filteredProjects.map((project) => (
            <ProjectView key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </Section>
  );
};
