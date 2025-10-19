import { Button, Link, Tooltip } from "@nextui-org/react";

import profiles from "@/data/profiles";

const SocialMedia = () => (
  <div className="w-full p-2 z-10 flex flex-wrap justify-center items-center">
    {profiles.map((profile) => (
      <Tooltip key={profile.name} content={profile.name}>
        <Link href={profile.link} isExternal rel="noreferrer">
          <div className="bg-background rounded-full">
            <Button
              title={profile.name}
              isIconOnly
              variant="light"
              radius="full"
              size="lg"
              className="text-2xl text-foreground"
            >
              {profile.icon}
            </Button>
          </div>
        </Link>
      </Tooltip>
    ))}
  </div>
);

export default SocialMedia;
