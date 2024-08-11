import React, { Fragment } from "react";
import Link from "next/link";

import { profiles } from "@/data/profiles";

const SocialMedia = () => (
  <Fragment>
    <div className='fixed right-10 bottom-10 flex text-center flex-col gap-4 z-10'>
      {profiles.map((profile) => (
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

export default SocialMedia;
