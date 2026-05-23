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

  const areas = selected["areas"];
  const roles = selected["roles"];
  const skills = selected["skills"];

  // ⚡ Optimization: Memoize filter sets separately to avoid recreating them
  // unless the specific filter category changes.
  const selectedAreas = useMemo(() => new Set(areas || []), [areas]);
  const selectedRoles = useMemo(() => new Set(roles || []), [roles]);
  const selectedSkills = useMemo(() => new Set(skills || []), [skills]);

  // ⚡ Optimization: Pre-filter projects by selected area, role, and skill.
  // This avoids re-running these checks when only the search query changes.
  const matchingProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesArea = filterByArea(project.tags, selectedAreas);
      const matchesRole =
        selectedRoles.size === 0 ||
        project.roles.some((r) => selectedRoles.has(r.toLowerCase()));
      const matchesSkill =
        selectedSkills.size === 0 ||
        project.tools.some((t) => selectedSkills.has(t.toLowerCase()));
      return matchesArea && matchesRole && matchesSkill;
    });
  }, [selectedAreas, selectedRoles, selectedSkills]);

  const filteredProjects = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();

    return matchingProjects
      .filter((project) => filterByQuery(project, lowercaseQuery))
      .sort((a, b) => {
        if (a.group !== b.group) return a.group - b.group;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [debouncedQuery, matchingProjects]);

  return (
    <Section id="projects" title="Projects">
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
