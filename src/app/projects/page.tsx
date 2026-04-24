"use client";

import { Section } from "@/components/section";
import React, { useMemo } from "react";

import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import projects from "@/data/projects";
import { filterByQuery, filterBySelection } from "@/filter";
import type { Project } from "@/types";

import { FilterBase } from "../../components/filter-base";
import ProjectView from "./project";

const Page = () => {
  const { query } = useSearch();
  const { selected } = useFilter();

  const filteredProjects = useMemo(() => {
    const lowercaseQuery = query.toLowerCase();
    const roleSet = new Set((selected["roles"] || []).map((s) => s.toLowerCase()));
    const toolSet = new Set((selected["tools"] || []).map((s) => s.toLowerCase()));
    const skillSet = new Set((selected["skills"] || []).map((s) => s.toLowerCase()));

    return projects
      .filter(
        (project) =>
          filterByQuery(project, lowercaseQuery) &&
          filterBySelection(project.roles, roleSet) &&
          filterBySelection(project.tags, skillSet) &&
          filterBySelection(project.tools, toolSet),
      )
      .sort(
        (project1, project2) =>
          project1.group - project2.group ||
          new Date(project2.date).getFullYear() -
            new Date(project1.date).getFullYear(),
      );
  }, [query, selected]);

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
