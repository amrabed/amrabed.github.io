"use client";

import Link from "next/link";

import React from "react";
import {
  FaGithub,
  FaYoutube,
  FaApple,
  FaLink,
  FaGooglePlay,
  FaFileLines,
  FaPersonChalkboard,
} from "react-icons/fa6";

import { Card, Tooltip } from "@heroui/react";

import skills from "@/data/skills";
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

const Links = ({ links }: { links: ProjectLinks }) => {
  return (
    <div className="flex flex-row gap-4 mt-4">
      {links.github && (
        <IconLink href={links.github} title="GitHub">
          <FaGithub className="size-5" />
        </IconLink>
      )}
      {links.demo && (
        <IconLink href={links.demo} title="Demo">
          <FaYoutube className="size-5" />
        </IconLink>
      )}
      {links.app && (
        <IconLink
          href={links.app}
          title={links.app.includes("apple.com") ? "App Store" : "Google Play"}
        >
          {links.app.includes("apple.com") ? (
            <FaApple className="size-5" />
          ) : (
            <FaGooglePlay className="size-5" />
          )}
        </IconLink>
      )}
      {links.publication && (
        <IconLink href={links.publication} title="Publication">
          <FaFileLines className="size-5" />
        </IconLink>
      )}
      {links.presentation && (
        <IconLink href={links.presentation} title="Presentation">
          <FaPersonChalkboard className="size-5" />
        </IconLink>
      )}
      {links.homepage && (
        <IconLink href={links.homepage} title="Website">
          <FaLink className="size-5" />
        </IconLink>
      )}
    </div>
  );
};

const ProjectView = ({ project }: { project: Project }) => {
  return (
    <div className="flex flex-col gap-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow h-full">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
        {project.name}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        {project.tools.map((tool) => {
          const skill = skills[tool.toLowerCase()];
          return (
            <Tooltip key={tool}>
              <Tooltip.Trigger>
                <span className="flex items-center gap-1.5 px-2 py-1 text-[10px] uppercase font-bold tracking-wider rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  {skill ? (
                    <span style={{ color: skill.color as string }}>
                      {skill.icon}
                    </span>
                  ) : null}
                  {tool}
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <Tooltip.Arrow />
                {skill?.name || tool}
              </Tooltip.Content>
            </Tooltip>
          );
        })}
      </div>
      <Links links={project.links} />
    </div>
  );
};

export default ProjectView;
