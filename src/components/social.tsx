import { Button, Link, Tooltip } from "@nextui-org/react";

import profiles from "@/data/profiles";

const SocialMedia = () => (
  <>
    <div className="w-full fixed bottom-0 p-4 z-10">
      <div className="flex flex-row justify-center">
        {profiles.map((profile, index) => (
          <Tooltip key={index} content={profile.name}>
            <Link href={profile.link} isExternal rel="noreferrer">
              <div className="bg-background rounded-full p-1">
                <Button
                  isIconOnly
                  variant="light"
                  radius="full"
                  className="md:text-xl"
                >
                  {profile.icon}
                </Button>
              </div>
            </Link>
          </Tooltip>
        ))}
      </div>
    </div>
  </>
);

export default SocialMedia;
