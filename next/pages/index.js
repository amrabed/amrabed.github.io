import { Fragment } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/Header"))
const Footer = dynamic(() => import("@/components/Footer"))
const SocialMedia = dynamic(() => import("@/components/Social"))
const ScrollToTopButton = dynamic(() => import("@/components/ScrollToTopButton"))
const Intro = dynamic(() => import("@/sections/intro"))
const Skills = dynamic(() => import("@/sections/skills"))
const Certifications = dynamic(() => import("@/sections/Certifications"))
const Education = dynamic(() => import("@/sections/Education"))


const Home = () => (
  <Fragment>
    <Head>
      <title>Amr Abed</title>
      <meta content="Amr Abed" name="title" />
      <meta content="Amr Abed's Portfolio" name="description" />
      <meta content="" name="keywords" />
      <meta content="Amr Abed" name="author" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    </Head>
    <Header />
    <SocialMedia />
    <div>
      <Intro />
      <Skills />
      <Certifications />
      <Education />
      {/* <Experience /> */}
      {/* <Projects /> */}
      <Footer />
    </div>
    <ScrollToTopButton />
  </Fragment>
);

export default Home;
