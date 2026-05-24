"use client";

import { FeaturedSectionContainer } from "@/components/featured-section-container";
import ProjectView from "@/components/project";
import projectsData from "@/data/projects";

import { FilterableSection } from "../filterable-section";

export const ProjectsSection = () => {
  return (
    <FilterableSection
      id="projects"
      title="Projects"
      data={projectsData}
      renderItem={() => null}
      renderContainer={(projects) => (
        <FeaturedSectionContainer
          items={projects}
          renderItem={(project) => (
            <ProjectView key={project.id} project={project} />
          )}
        />
      )}
      sortFn={(a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        return new Date(b.date!).getTime() - new Date(a.date!).getTime();
      }}
    />
  );
};
