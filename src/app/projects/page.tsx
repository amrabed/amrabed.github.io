"use client";

import { Fragment } from "react";

import Section from "@/components/Section";
import Filters, { FilterModal } from "@/components/filter";
import { PageHeader } from "@/components/header";
import { match } from "@/components/search";
import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import areas from "@/data/areas";
import projects from "@/data/projects";
import roles from "@/data/roles";
import skills from "@/data/skills";
import type { Project } from "@/types";

import ProjectView from "./project";

const filterByQuery = (project: Project, query: string) =>
  project.name.toLowerCase().includes(query) ||
  match(project.roles, query) ||
  match(project.tools, query) ||
  match(project.tags, query);

const filterBySelection = (values: string[], selections: string[]) =>
  !selections ||
  !selections.length ||
  values.filter((value) => selections.includes(value.toLowerCase())).length;

const Page = () => {
  const { query, setQuery } = useSearch();
  const { selected: selectedRoles, setSelected: setSelectedRoles } =
    useFilter();
  const { selected: selectedSkills, setSelected: setSelectedSkills } =
    useFilter();
  const { selected: selectedAreas, setSelected: setSelectedAreas } =
    useFilter();

  const filteredProjects = projects
    .filter(
      (project) =>
        filterByQuery(project, query) &&
        (filterBySelection(project.roles, selectedRoles) ||
          filterBySelection(project.tags, selectedAreas) ||
          filterBySelection(project.tools, selectedSkills)),
    )
    .sort(
      (project1, project2) =>
        project1.group - project2.group ||
        new Date(project2.date).getFullYear() -
          new Date(project1.date).getFullYear(),
    );

  return (
    <Fragment>
      <PageHeader
        title="Projects"
        query={query}
        setQuery={setQuery}
        placeholder="Search projects by name, role, skill, or tool"
      >
        <FilterModal>
          <Filters
            label="roles"
            values={Object.values(roles).map((role) => role.name)}
            selected={selectedRoles}
            setSelected={setSelectedRoles}
          />
          <Filters
            label="skills"
            values={Object.values(skills).map((skill) => skill.name)}
            selected={selectedSkills}
            setSelected={setSelectedSkills}
          />
          <Filters
            label="areas"
            values={Object.values(areas).map((areas) => areas.name)}
            selected={selectedAreas}
            setSelected={setSelectedAreas}
          />
        </FilterModal>
      </PageHeader>
      <Section id="projects" title="">
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 pt-[50px] gap-5">
          {filteredProjects.map((project: Project) => (
            <ProjectView key={project.id} project={project} />
          ))}
        </div>
      </Section>
    </Fragment>
  );
};

export default Page;
