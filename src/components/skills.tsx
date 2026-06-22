import { Tooltip } from "@heroui/react";

import areasData from "@/data/areas";
import skillsData from "@/data/skills";
import { Skill } from "@/types";

export const Areas = ({
  areas,
  className,
}: {
  areas: string[];
  className?: string;
}) => (
  <ul className={`flex flex-row flex-wrap gap-2 ${className}`}>
    {areas.map((areaId) => {
      const area = areasData[areaId.toLowerCase()];
      if (!area) return null;
      return (
        <li key={area.name}>
          <Tooltip>
            <Tooltip.Trigger>
              <button
                type="button"
                aria-label={area.name}
                className="size-5 text-slate-500 dark:text-slate-400 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 rounded bg-transparent border-none p-0 cursor-default"
              >
                {area.icon}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <Tooltip.Arrow />
              {area.name}
            </Tooltip.Content>
          </Tooltip>
        </li>
      );
    })}
  </ul>
);

export const Tools = ({
  tools,
  compact = false,
}: {
  tools: string[];
  compact?: boolean;
}) => (
  <ul className="flex flex-row flex-wrap gap-2">
    {tools.map((toolId) => {
      const tool = skillsData[toolId.toLowerCase()];
      if (!tool) return null;
      return (
        <li key={tool.name} className="flex flex-col items-center">
          <Tooltip>
            <Tooltip.Trigger>
              {compact ? (
                <button
                  type="button"
                  aria-label={tool.name}
                  className="size-5 text-slate-500 dark:text-slate-400 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 rounded bg-transparent border-none p-0 cursor-default"
                >
                  {tool.icon}
                </button>
              ) : (
                <button
                  type="button"
                  aria-label={tool.name}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 border-none cursor-default"
                >
                  <div className="size-6 text-slate-600 dark:text-slate-400 flex items-center justify-center">
                    {tool.icon}
                  </div>
                </button>
              )}
            </Tooltip.Trigger>
            <Tooltip.Content>
              <Tooltip.Arrow />
              {tool.name}
            </Tooltip.Content>
          </Tooltip>
        </li>
      );
    })}
  </ul>
);

export const Tags = ({ tags }: { tags: string[] }) => (
  <ul className="flex flex-row flex-wrap gap-2">
    {tags.map((tag) => (
      <li key={tag}>
        <Tooltip>
          <Tooltip.Trigger>
            <button
              type="button"
              className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 border-none cursor-default"
            >
              {tag}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Tooltip.Arrow />
            {tag}
          </Tooltip.Content>
        </Tooltip>
      </li>
    ))}
  </ul>
);

const Skills = ({ skills }: { skills: Skill[] }) => (
  <div className="section-body">
    {skills.map((skill) => (
      <div key={skill.name} className="section-item">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="size-12 text-primary flex items-center justify-center text-4xl">
            {skill.icon}
          </div>
        </div>
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          {skill.name}
        </p>
      </div>
    ))}
  </div>
);

export default Skills;
