"use client";

import { useMemo } from "react";
import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import projectsData from "@/data/projects";
import { filterByQuery, filterByArea } from "@/filter";
import ProjectView from "@/app/projects/project";
import { Section } from "./section";

export const ProjectsSection = () => {
  const { debouncedQuery } = useSearch();
  const { selectedAreas } = useFilter();

  const filteredProjects = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();
    return projectsData
      .filter((project) => {
        const matchesQuery = filterByQuery(project, lowercaseQuery);
        const matchesArea = filterByArea(project.tags, selectedAreas);
        return matchesQuery && matchesArea;
      })
      .sort((a, b) => {
        if (a.group !== b.group) return a.group - b.group;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [debouncedQuery, selectedAreas]);

  return (
    <Section id="projects" title="Projects" count={filteredProjects.length}>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 w-full px-4 md:px-10">
        {filteredProjects.map((project) => (
          <ProjectView key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
};
