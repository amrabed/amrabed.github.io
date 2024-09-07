"use client";

import React, { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";

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
        },
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
    <section id="home">
      <div
        className="min-h-[100vh] overflow-x-hidden px-[20px] md:px-[50px] lg:px-[100px] xl:px-[200px] 2xl:px-[400px] md:flex content-center items-center justify-between shadow-zinc-300 dark:shadow-zinc-700 shadow-sm"
        ref={homeRef}
      >
        <div
          className={
            "translate-x-[500px] transition-all opacity-0 duration-700 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-cover m-auto md:m-0 mt-[40px] md:mt-0 bg-no-repeat rounded-full"
          }
          ref={profileRef}
          style={{
            backgroundImage:
              "url(https://avatars.githubusercontent.com/u/3361565?v=4)",
          }}
        />

        <div
          className="translate-x-[-500px] transition-all duration-700 opacity-0"
          ref={introRef}
        >
          <p className="text-2xl md:text-4xl py-2 font-sans text-center text-nowrap">
            I&apos;m
            <span className="text-primary">
              {" a"}
              <TypeAnimation
                sequence={[
                  "n ENGINEER",
                  2000,
                  " RESEARCHER",
                  2000,
                  "n INSTRUCTOR",
                  2000,
                  " CREATOR",
                  2000,
                ]}
                wrapper="span"
                speed={10}
                repeat={Infinity}
              />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
