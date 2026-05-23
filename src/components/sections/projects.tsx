"use client";

import ProjectView from "@/components/project";
import projectsData from "@/data/projects";

import { FilterableSection } from "../filterable-section";

export const ProjectsSection = () => {
  return (
    <FilterableSection
      id="projects"
      title="Projects"
      data={projectsData}
      renderItem={(project) => <ProjectView key={(project as any).id} project={project as any} />}
      sortFn={(a, b) => {
        if (a.group !== (b as any).group) return (a as any).group - (b as any).group;
        return new Date(b.date!).getTime() - new Date(a.date!).getTime();
      }}
    />
  );
};
