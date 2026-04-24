"use client";

import { Button, Tooltip } from "@heroui/react";

import profiles from "@/data/profiles";
import { Profile } from "@/types";

const Social = ({ profiles: propsProfiles }: { profiles?: Profile[] }) => {
  const socialProfiles = propsProfiles || profiles;
  return (
    <div className="flex flex-row flex-wrap justify-center gap-4 px-4">
      {socialProfiles.map((profile) => (
        <Tooltip key={profile.name}>
          <Tooltip.Trigger>
            <Button
              variant="ghost"
              size="lg"
              isIconOnly
              className="text-slate-500 hover:text-primary rounded-full text-2xl"
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
