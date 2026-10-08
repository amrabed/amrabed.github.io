"use client";

import { Social as UiSocial, type SocialProfileItem } from "@amrabed/ui";

import { Profile } from "@/types";

export interface SocialProps {
  profiles?: (Profile | SocialProfileItem)[];
  className?: string;
}

const Social = ({ profiles, className = "" }: SocialProps) => {
  const mappedProfiles: SocialProfileItem[] | undefined = profiles
    ? profiles.map((p) => {
        if ("link" in p && !("url" in p)) {
          return {
            name: p.name,
            url: p.link,
            icon: p.icon,
            color: typeof p.color === "string" ? p.color : undefined,
          };
        }
        return p as SocialProfileItem;
      })
    : undefined;

  return <UiSocial profiles={mappedProfiles} className={className} />;
};

export { UiSocial };
export default Social;
