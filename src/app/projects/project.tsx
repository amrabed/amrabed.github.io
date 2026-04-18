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

import { Tooltip } from "@heroui/react";

import { Areas, Tools } from "@/components/skills";
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
    <div className="flex flex-row gap-4">
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
    <div className="flex flex-col gap-2 p-6 rounded-2xl bg-transparent border-1 border-slate-500/50 shadow-none h-full">
      <div className="flex justify-between items-start">
        <div className="flex flex-row items-center gap-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {project.name}
          </h3>
          <div className="flex flex-row gap-1">
            <Tools tools={project.tools} compact />
          </div>
        </div>
        <Links links={project.links} />
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow mt-2">
        {project.description}
      </p>
      <div className="flex flex-row justify-between items-center mt-6">
        <div className="flex flex-row items-center gap-4">
          <Areas areas={project.tags} />
          <ul className="flex flex-row gap-2 text-zinc-400 text-sm">
            {project.roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
        <span className="text-zinc-400 text-sm">
          {new Date(project.date).getFullYear()}
        </span>
      </div>
    </div>
  );
};

export default ProjectView;
