import { Metadata } from "next";
import Link from "next/link";

import { Fragment } from "react";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import Section from "@/components/Section";
import Card from "@/components/card";
import Search from "@/components/search";
import projects from "@/data/projects";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Amr Abed - Projects",
};

const match = (values: string[], query: string) => {
  return values.find((value) => value.toLowerCase().includes(query));
};

const Page = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query?.toLocaleLowerCase() || "";
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
          <Search placeholder="Search projects by name, role, skill, or tool" />
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
            .map((project) => (
              <Card key={project.id} item={project} />
            ))}
        </div>
      </Section>
    </Fragment>
  );
};

export default Page;
