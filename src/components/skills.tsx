import { Tooltip } from "@nextui-org/react";

import areas from "@/data/areas";
import skills from "@/data/skills";

export const Tools = ({ tools }: { tools: string[] }) => (
  <ul className="flex flex-row gap-2 text-2xl">
    {tools.map((tool: string) => {
      const icon = skills[tool.toLowerCase()]?.icon;
      return (
        icon && (
          <Tooltip
            key={tool}
            content={skills[tool.toLowerCase()]?.name}
            color="foreground"
          >
            <li>{icon}</li>
          </Tooltip>
        )
      );
    })}
  </ul>
);

export const Tags = ({ tags }: { tags: string[] }) => (
  <ul className="flex flex-row gap-2 p-1 text-md">
    {tags.map((tag: string) => (
      <Tooltip key={tag} content={tag} color="foreground">
        <li className="size-6 text-zinc">{areas[tag.toLowerCase()]?.icon}</li>
      </Tooltip>
    ))}
  </ul>
);

export const Roles = ({ roles }: { roles: string[] }) => (
  <ul className="flex flex-row gap-2">
    {roles.map((role: string) => (
      <li key={role}>
        <label className="text-sm text-zinc-500">{role}</label>
      </li>
    ))}
  </ul>
);
