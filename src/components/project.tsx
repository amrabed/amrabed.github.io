"use client";

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

import { Card } from "@heroui/react";

import { IconLink } from "@/components/icon-link";
import { Areas, Tools } from "@/components/skills";
import { Project, ProjectLinks } from "@/types";

const Links = ({ links }: { links: ProjectLinks }) => {
  const githubLink = links.github ? `https://github.com/${links.github}` : null;

  return (
    <div className="flex flex-row gap-4">
      {githubLink && (
        <IconLink href={githubLink} title="GitHub">
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

const ProjectView = React.memo(({ project }: { project: Project }) => {
  return (
    <Card className="card-container h-full">
      <Card.Header className="flex justify-between items-start p-0 bg-transparent">
        <div className="flex flex-row items-center gap-2">
          <h3 className="card-title text-xl">{project.name}</h3>
          <span className="mx-1 text-slate-500/30">|</span>
          <Areas areas={project.tags} />
          <span className="text-slate-500/30">|</span>
          <Tools tools={project.tools} compact />
        </div>
        <Links links={project.links} />
      </Card.Header>

      <Card.Content className="p-0 mt-2 bg-transparent flex-grow">
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          {project.description}
        </p>
      </Card.Content>

      <Card.Footer className="flex flex-row justify-between items-center mt-6 p-0 bg-transparent">
        <div className="flex flex-row items-center gap-4">
          <ul className="flex flex-row gap-2 text-zinc-400 text-sm">
            {project.roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
        <span className="text-zinc-400 text-sm">
          {new Date(project.date).getFullYear()}
        </span>
      </Card.Footer>
    </Card>
  );
});

ProjectView.displayName = "ProjectView";

export default ProjectView;
