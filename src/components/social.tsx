"use client";

import { Button, Tooltip } from "@heroui/react";

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
            <Button
              variant="ghost"
              size="lg"
              isIconOnly
              aria-label={`${profile.name} (opens in a new tab)`}
              className="text-slate-500 rounded-full text-2xl transition-colors duration-200 hover:text-[var(--social-hover-color)] dark:hover:text-[var(--social-hover-color-dark,var(--social-hover-color))]"
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
              onPress={() =>
                window.open(profile.link, "_blank", "noopener,noreferrer")
              }
            >
              {profile.icon}
            </Button>
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
