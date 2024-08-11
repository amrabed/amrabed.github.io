"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Head from "next/head";

const Intro = () => {
  const [isHome, setIsHome] = useState(false);

  const homeRef = useRef();
  const introRef = useRef();
  const profileRef = useRef();

  // Intersection observer animation on scroll
  useEffect(() => {
    const getScreenWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    // Scroll Animation
    if (homeRef.current) {
      const homeObserver = new IntersectionObserver(
        ([homeEntry]) => {
          setIsHome(homeEntry.isIntersecting);
        },
        {
          rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-300px"}`,
        }
      );

      homeObserver.observe(homeRef.current);

      if (isHome) {
        profileRef.current.classList.add("slide-in");
        introRef.current.classList.add("slide-in");
      } else {
        profileRef.current.classList.remove("slide-in");
        introRef.current.classList.remove("slide-in");
      }
    }
  }, [homeRef, isHome]);

  return (
    <Fragment>
      <Head>
        <title>Amr Abed</title>
      </Head>
      <section id='home'>
        <div
          className='min-h-[100vh] overflow-x-hidden px-[20px] md:px-[200px] lg:px-[200px] pt-[80px] md:pt-0 md:flex items-center justify-between shadow-zinc-300 dark:shadow-zinc-700 shadow-sm'
          ref={homeRef}
        >
          {/* Image */}
          <div
            className={
              "translate-x-[500px] transition-all opacity-0 duration-700 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-cover m-auto md:m-0 mt-[40px] md:mt-0 bg-no-repeat"
            }
            ref={profileRef}
            style={{ backgroundImage: "url(https://avatars.githubusercontent.com/u/3361565?v=4)" }}
          />

          <div
            className='translate-x-[-500px] transition-all duration-700 opacity-0'
            ref={introRef}
          >
            {/* Profile Name */}
            <p className='text-2xl md:text-4xl py-2 font-semibold font-sans'>
              I&apos;m
              <span className="text-[#665DC3] dark:text-[#07d0e5]">
                {" a"}
                <TypeAnimation
                  sequence={["n ENGINEER", 2000, " RESEARCHER", 2000, "n INSTRUCTOR", 2000, " CREATOR", 2000]}
                  wrapper="span"
                  speed={10}
                  // style={{ className="text-[#c72c6c] dark:text-[#07d0e5]" }}
                  repeat={Infinity}
                />
              </span>
            </p>
          </div>

        </div>
      </section>
    </Fragment>
  );
};

export default Intro;
