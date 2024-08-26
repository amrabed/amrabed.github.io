"use client";

import { Metadata } from "next";
import Link from "next/link";

import { Fragment } from "react";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import Section from "@/components/Section";
import Card from "@/components/card";
import Search from "@/components/search";
import { useSearch } from "@/contexts/search";
import projects from "@/data/projects";
import { Project } from "@/types";

// export const metadata: Metadata = {
//   title: "Amr Abed - Projects",
// };

const match = (values: string[], query: string) => {
  return values.find((value) => value.toLowerCase().includes(query));
};

const Page = () => {
  const { query, setQuery } = useSearch();

  return (
    <Fragment>
      <div className="w-full p-5 backdrop-filter backdrop-blur-lg md:flex justify-between items-center gap-4 shadow-sm shadow-gray-300 dark:shadow-gray-800 fixed z-10 transition-all duration-500">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row gap-1 p-1">
            <Link href="/">
              <ChevronLeftIcon className="size-8 text-xl" color="primary" />
            </Link>
            <h1 className="text-xl p-1 hidden md:flex">Projects</h1>
          </div>
          <Search
            placeholder="Search projects by name, role, skill, or tool"
            query={query}
            setQuery={setQuery}
          />
        </div>
      </div>
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
              <Card key={project.id} project={project} />
            ))}
        </div>
      </Section>
    </Fragment>
  );
};

export default Page;
