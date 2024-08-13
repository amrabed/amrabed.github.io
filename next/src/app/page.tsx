import dynamic from "next/dynamic";

import { Fragment } from "react";

const Header = dynamic(() => import("@/components/header"));
const Footer = dynamic(() => import("@/components/Footer"));
const SocialMedia = dynamic(() => import("@/components/Social"));
const ScrollToTopButton = dynamic(
  () => import("@/components/scrollToTopButton"),
);
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
      {/* <Experience /> */}
      {/* <Projects /> */}
      <SocialMedia />
      <Footer />
    </div>
    <ScrollToTopButton />
  </Fragment>
);

export default Home;
