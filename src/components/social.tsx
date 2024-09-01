import { Button, Link, Tooltip } from "@nextui-org/react";

import profiles from "@/data/profiles";

const SocialMedia = () => (
  <>
    <div className="flex justify-center">
      <div className="fixed bottom-12 flex flex-row z-10">
        {profiles.map((profile, index) => (
          <Tooltip key={index} content={profile.name}>
            <Link href={profile.link} isExternal rel="noreferrer">
              <Button
                isIconOnly
                variant="light"
                size="lg"
                radius="full"
                className="text-xl"
              >
                {profile.icon}
              </Button>
            </Link>
          </Tooltip>
        ))}
      </div>
    </div>
  </>
);

export default SocialMedia;
