import { Button, Link, Tooltip } from "@nextui-org/react";

import profiles from "@/data/profiles";

const SocialMedia = () => (
  <div className="w-full p-2 z-10 flex flex-wrap justify-center items-center">
    {profiles.map((profile, index) => (
      <Tooltip key={index} content={profile.name}>
        <Link href={profile.link} isExternal rel="noreferrer">
          <div className="bg-background rounded-full p-1">
            <Button
              isIconOnly
              variant="light"
              radius="full"
              className="md:text-xl text-foreground"
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
