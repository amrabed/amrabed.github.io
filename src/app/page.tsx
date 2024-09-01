import dynamic from "next/dynamic";

import { MainHeader } from "@/components/header";

const SocialMedia = dynamic(() => import("@/components/social"));
const Intro = dynamic(() => import("@/sections/intro"));
const Skills = dynamic(() => import("@/sections/skills"));
const Certifications = dynamic(() => import("@/sections/certifications"));
const Education = dynamic(() => import("@/sections/education"));

const Home = () => (
  <>
    <MainHeader />
    <Intro />
    <Skills />
    <Certifications />
    <Education />
    <SocialMedia />
  </>
);

export default Home;
