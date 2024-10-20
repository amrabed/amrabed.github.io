"use client";

import Link from "next/link";

import { ReactNode } from "react";
import { BiLogoPlayStore } from "react-icons/bi";
import { FaGithub, FaYoutube, FaApple, FaLink } from "react-icons/fa6";
import { RiSlideshow2Line } from "react-icons/ri";

import { DocumentIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@nextui-org/react";

import { Roles, Tags, Tools } from "@/components/skills";
import { Project, ProjectLinks } from "@/types";

const IconLink = ({
  title,
  url,
  children,
}: {
  title: string;
  url: string | undefined;
  children: ReactNode;
}) =>
  url && (
    <Tooltip content={title}>
      <Link href={url} target="_blank">
        {children}
      </Link>
    </Tooltip>
  );

const Links = ({ links }: { links: ProjectLinks }) => (
  <div id="links" className="flex flex-row gap-2 text-2xl text-zinc">
    <IconLink url={links.homepage} title="homepage">
      <FaLink />
    </IconLink>
    <IconLink url={links.app} title="app">
      {links.app?.includes("apple") ? <FaApple /> : <BiLogoPlayStore />}
    </IconLink>
    <IconLink url={links.publication} title="publication">
      <DocumentIcon className="size-6" />
    </IconLink>
    <IconLink url={links.presentation} title="presentation">
      <RiSlideshow2Line />
    </IconLink>
    <IconLink url={links.demo} title="demo">
      <FaYoutube />
    </IconLink>
    <IconLink
      url={links.github ? "https://github.com/" + links.github : undefined}
      title="github"
    >
      <FaGithub />
    </IconLink>
  </div>
);

const ProjectView = ({ project }: { project: Project }) => (
  <div className="group overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 md:gap-8 hover:border-zinc-400/50 border-zinc-600 p-4">
    <h3 className="mb-3 font-semibold text-zinc">
      <div className="flex justify-between">
        <div className="flex md:flex-row flex-col gap-4">
          <div className="text-slated-500 text-lg md:text-xl">
            {project.name}
          </div>
          <Tools tools={project.tools} />
        </div>
        <Links links={project.links} />
      </div>
    </h3>
    <p className="pb-4 xl:h-20 text-sm text-zinc">{project.description}</p>
    <Tags tags={project.tags} />
    <div className="flex flex-row justify-between">
      <Roles roles={project.roles} />
      <p className="text-zinc-500 text-end text-md">
        {new Date(project.date).getFullYear()}
      </p>
    </div>
  </div>
);

export default ProjectView;
