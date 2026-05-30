"use client";

import { memo } from "react";

import { FeaturedSectionContainer } from "@/components/featured-section-container";
import ProjectView from "@/components/project";
import projectsData from "@/data/projects";

import { FilterableSection } from "../filterable-section";

// ⚡ Optimization: ProjectsSection is memoized to prevent redundant re-renders.
export const ProjectsSection = memo(() => {
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
        const pA = a.priority ?? Infinity;
        const pB = b.priority ?? Infinity;
        if (pA !== pB) return pA - pB;
        return new Date(b.date!).getTime() - new Date(a.date!).getTime();
      }}
    />
  );
});

ProjectsSection.displayName = "ProjectsSection";
