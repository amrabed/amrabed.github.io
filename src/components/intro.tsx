"use client";

import Image from "next/image";

import React, { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const Intro = () => {
  const [isHome, setIsHome] = useState(false);

  const homeRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Intersection observer animation on scroll
  useEffect(() => {
    const getScreenWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const currentHomeRef = homeRef.current;
    // Scroll Animation
    if (currentHomeRef) {
      const homeObserver = new IntersectionObserver(
        ([homeEntry]) => {
          setIsHome(homeEntry.isIntersecting);
        },
        {
          rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-300px"}`,
        },
      );

      homeObserver.observe(currentHomeRef);

      return () => {
        homeObserver.unobserve(currentHomeRef);
      };
    }
  }, []);

  useEffect(() => {
    if (isHome) {
      profileRef.current?.classList.add("slide-in");
      introRef.current?.classList.add("slide-in");
    } else {
      profileRef.current?.classList.remove("slide-in");
      introRef.current?.classList.remove("slide-in");
    }
  }, [isHome]);

  return (
    <section id="home" ref={homeRef}>
      <div className="min-h-[100vh] overflow-x-hidden px-[20px] md:px-[50px] lg:px-[100px] xl:px-[200px] 2xl:px-[400px] md:flex content-center items-center justify-between shadow-zinc-300 dark:shadow-zinc-700 shadow-sm">
        <div
          className="translate-x-[500px] transition-all opacity-0 duration-700 w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative m-auto md:m-0 mt-[40px] md:mt-0 md:order-last"
          ref={profileRef}
        >
          <Image
            src="/amr.webp"
            alt="Amr Abed"
            fill
            className="rounded-full object-cover"
            priority
          />
        </div>

        <div
          className="translate-x-[-500px] transition-all duration-700 opacity-0 md:order-first"
          ref={introRef}
        >
          <p className="text-2xl md:text-4xl py-2 font-sans text-center text-nowrap">
            I&apos;m
            <span className="text-primary">
              {" a"}
              <TypeAnimation
                sequence={[
                  "n Engineer",
                  2000,
                  " Researcher",
                  2000,
                  " Teacher",
                  2000,
                  " Creator",
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
