import Link from "next/link";

import { FaGithub, FaYoutube, FaApple, FaLink } from "react-icons/fa6";

import { Tooltip } from "@heroui/react";

import { Project, ProjectLinks } from "@/types";

const IconLink = ({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) => (
  <Tooltip>
    <Tooltip.Trigger>
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-slate-500 hover:text-primary transition-colors"
      >
        {children}
      </Link>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <Tooltip.Arrow />
      {title}
    </Tooltip.Content>
  </Tooltip>
);

const Links = ({ links }: { links: ProjectLinks }) => (
  <div className="flex flex-row gap-4 mt-4">
    {links.github && (
      <IconLink href={links.github} title="GitHub">
        <FaGithub className="size-5" />
      </IconLink>
    )}
    {(links as any).youtube && (
      <IconLink href={(links as any).youtube} title="YouTube">
        <FaYoutube className="size-5" />
      </IconLink>
    )}
    {links.app && (
      <IconLink href={links.app} title="App Store">
        <FaApple className="size-5" />
      </IconLink>
    )}
    {links.homepage && (
      <IconLink href={links.homepage} title="Website">
        <FaLink className="size-5" />
      </IconLink>
    )}
  </div>
);

const ProjectView = ({ project }: { project: Project }) => (
  <div className="flex flex-col gap-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow h-full">
    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
      {project.name}
    </h3>
    <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow">
      {project.description}
    </p>
    <div className="flex flex-wrap gap-2 mt-4">
      {project.tools.map((tool) => (
        <span
          key={tool}
          className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
        >
          {tool}
        </span>
      ))}
    </div>
    <Links links={project.links} />
  </div>
);

export default ProjectView;
