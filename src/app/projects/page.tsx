"use client";

import { Fragment } from "react";

import Section from "@/components/Section";
import { PageHeader } from "@/components/header";
import { match } from "@/components/search";
import { useSearch } from "@/contexts/search";
import projects from "@/data/projects";
import { Project } from "@/types";

import ProjectView from "./project";

const Page = () => {
  const { query, setQuery } = useSearch();

  return (
    <Fragment>
      <PageHeader
        title="Projects"
        query={query}
        setQuery={setQuery}
        placeholder="Search projects by name, role, skill, or tool"
      />
      <Section id="projects" title="">
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 pt-[50px] gap-5">
          {projects
            .filter(
              (project) =>
                project.name.toLowerCase().includes(query) ||
                match(project.roles, query) ||
                match(project.tools, query) ||
                match(project.tags, query),
            )
            .sort(
              (project1, project2) =>
                project1.group - project2.group ||
                new Date(project2.date).getFullYear() -
                  new Date(project1.date).getFullYear(),
            )
            .map((project: Project) => (
              <ProjectView key={project.id} project={project} />
            ))}
        </div>
      </Section>
    </Fragment>
  );
};

export default Page;
