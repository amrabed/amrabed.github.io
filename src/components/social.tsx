"use client";

import { Tooltip } from "@heroui/react";

import { profiles } from "@/lib/data";
import { Profile } from "@/types";

const Social = ({
  profiles: propsProfiles,
  className = "",
}: {
  profiles?: Profile[];
  className?: string;
}) => {
  const socialProfiles = propsProfiles || profiles;
  return (
    <div
      className={`flex flex-row flex-wrap gap-4 px-4 ${className || "justify-center"}`}
    >
      {socialProfiles.map((profile) => (
        <Tooltip key={profile.name}>
          <Tooltip.Trigger>
            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={`${profile.name} (opens in a new tab)`}
              className="inline-flex items-center justify-center text-slate-500 rounded-full text-2xl transition-colors duration-200 hover:text-[var(--social-hover-color)] dark:hover:text-[var(--social-hover-color-dark,var(--social-hover-color))] p-2"
              style={
                profile.color
                  ? ({
                      "--social-hover-color":
                        profile.name === "GitHub" ||
                        profile.name === "Medium" ||
                        profile.name === "X"
                          ? "#000000"
                          : profile.color,
                      "--social-hover-color-dark":
                        profile.name === "GitHub" ||
                        profile.name === "Medium" ||
                        profile.name === "X"
                          ? "#f4f4f5"
                          : profile.name === "Goodreads"
                            ? "#f4f1ea"
                            : profile.color,
                    } as unknown as React.CSSProperties)
                  : undefined
              }
            >
              {profile.icon}
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Tooltip.Arrow />
            {profile.name}
          </Tooltip.Content>
        </Tooltip>
      ))}
    </div>
  );
};

export default Social;
