import Link from "next/link";

import React, { Fragment } from "react";

import profiles from "@/data/profiles";

const SocialMedia = () => (
  <Fragment>
    <div className="flex justify-center">
      <div className="fixed bottom-12 flex flex-row gap-2 z-10 p-2">
        {profiles.map((profile) => (
          <Link
            className="w-fit"
            href={profile.link}
            key={profile.name}
            target="_blank"
            rel="noreferrer"
          >
            <div className="p-2 rounded-full text-xl text-white bg-black">
              {profile.icon}
            </div>
          </Link>
        ))}
      </div>
    </div>
  </Fragment>
);

export default SocialMedia;
