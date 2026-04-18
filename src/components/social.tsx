"use client";

import { Button, Tooltip } from "@heroui/react";

import profiles from "@/data/profiles";
import { Profile } from "@/types";

const Social = ({ profiles: propsProfiles }: { profiles?: Profile[] }) => {
  const socialProfiles = propsProfiles || profiles;
  return (
    <div className="flex flex-row justify-center gap-6">
      {socialProfiles.map((profile) => (
        <Tooltip key={profile.name}>
          <Tooltip.Trigger>
            <Button
              variant="ghost"
              size="lg"
              isIconOnly
              className="text-slate-500 hover:text-primary rounded-full"
              onPress={() => window.open(profile.link, "_blank", "noreferrer")}
            >
              <span className="text-2xl">{profile.icon}</span>
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
