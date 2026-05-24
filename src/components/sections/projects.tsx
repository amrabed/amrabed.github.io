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
      renderItem={() => null}
      renderContainer={(projects) => {
        const featuredProjects = projects.filter((p) => p.featured);
        const nonFeaturedProjects = projects.filter((p) => !p.featured);

        return (
          <div
            className="flex flex-col gap-6 w-full px-4 md:px-10"
            key="projects-container"
          >
            {featuredProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <ProjectView key={project.id} project={project} />
                ))}
              </div>
            )}
            {nonFeaturedProjects.length > 0 && (
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {nonFeaturedProjects.map((project) => (
                  <ProjectView key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        );
      }}
      sortFn={(a, b) => {
        const pA = a.priority ?? Infinity;
        const pB = b.priority ?? Infinity;
        if (pA !== pB) return pA - pB;
        return new Date(b.date!).getTime() - new Date(a.date!).getTime();
      }}
    />
  );
};
