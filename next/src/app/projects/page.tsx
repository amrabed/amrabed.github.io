import Link from "next/link";

import { Fragment } from "react";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import Section from "@/components/Section";
import Card from "@/components/card";
import HeaderProvider from "@/contexts/header";
import projects from "@/data/projects";

const Page = () => (
  <Fragment>
    <HeaderProvider>
      <Link href="/">
        <ChevronLeftIcon className="size-8 gap-4" />
      </Link>
    </HeaderProvider>
    <Section id="projects" title="Creations">
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        {projects
          .sort(
            (project1, project2) =>
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

export default Page;
