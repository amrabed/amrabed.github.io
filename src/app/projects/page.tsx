"use client";

import { match } from "@/components/search";
import { Section } from "@/components/section";
import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import projects from "@/data/projects";
import type { Project } from "@/types";

import { FilterBase } from "../../components/filter-base";
import ProjectView from "./project";

const filterByQuery = (project: Project, query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return (
    project.name.toLowerCase().includes(lowercaseQuery) ||
    match(project.roles, lowercaseQuery) ||
    match(project.tools, lowercaseQuery) ||
    match(project.tags, lowercaseQuery)
  );
};

const filterBySelection = (values: string[], selections: string[]) =>
  !selections?.length ||
  values.filter((value) => selections.includes(value.toLowerCase())).length;

const Page = () => {
  const { query } = useSearch();
  const { selected } = useFilter();

  const selectedRoles = selected["roles"] || [];
  const selectedTools = selected["tools"] || [];
  const selectedSkills = selected["skills"] || [];

  const filteredProjects = projects
    .filter(
      (project) =>
        filterByQuery(project, query) &&
        filterBySelection(project.roles, selectedRoles) &&
        filterBySelection(project.tags, selectedSkills) &&
        filterBySelection(project.tools, selectedTools),
    )
    .sort(
      (project1, project2) =>
        project1.group - project2.group ||
        new Date(project2.date).getFullYear() -
          new Date(project1.date).getFullYear(),
    );

  return (
    <FilterBase
      title="Projects"
      placeholder="Search by name, role, skill, or tool"
    >
      <Section id="projects" title="">
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 pt-[50px] gap-5">
          {filteredProjects.map((project: Project) => (
            <ProjectView key={project.id} project={project} />
          ))}
        </div>
      </Section>
    </FilterBase>
  );
};

export default Page;
