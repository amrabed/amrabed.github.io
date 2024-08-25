import dynamic from "next/dynamic";

import { Fragment } from "react";

const Header = dynamic(() => import("@/components/header"));
const SocialMedia = dynamic(() => import("@/components/Social"));
const Intro = dynamic(() => import("@/sections/intro"));
const Skills = dynamic(() => import("@/sections/skills"));
const Certifications = dynamic(() => import("@/sections/certifications"));
const Education = dynamic(() => import("@/sections/education"));

const Home = () => (
  <Fragment>
    <Header />
    <div>
      <Intro />
      <Skills />
      <Certifications />
      <Education />
      <SocialMedia />
    </div>
  </Fragment>
);

export default Home;
