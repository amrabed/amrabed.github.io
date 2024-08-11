import React, { Fragment } from "react";
import Link from "next/link";

import { social } from "@/data/social";

const SocialMedia = () => {
  return (
    <Fragment>
      <div className='fixed right-10 bottom-10 flex text-center flex-col gap-4 z-10'>
        {social.map((profile) => (
          <Link className='w-fit' href={profile.link} key={profile.name} target="_blank" rel="noreferrer">
            <div
              className={"p-2 rounded-full text-xl text-white"}
              style={{ background: "#000000" }}
            >
              {profile.icon}
            </div>
          </Link>
        ))}
      </div>
    </Fragment>
  );
};

export default SocialMedia;
