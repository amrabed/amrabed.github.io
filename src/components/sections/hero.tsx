"use client";

import Image from "next/image";

import React, { useEffect, useRef, useState, memo } from "react";
import { TypeAnimation } from "react-type-animation";

const HeroSection = memo(() => {
  const [mounted, setMounted] = useState(false);

  const homeRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Intersection observer animation on scroll
  useEffect(() => {
    setMounted(true);
    const getScreenWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const currentHomeRef = homeRef.current;
    // Scroll Animation
    if (currentHomeRef) {
      const homeObserver = new IntersectionObserver(
        ([homeEntry]) => {
          // ⚡ Optimization: Direct DOM manipulation to avoid redundant re-renders.
          const isHome = homeEntry.isIntersecting;

          if (profileRef.current) {
            if (isHome) {
              profileRef.current.classList.add("translate-x-0", "opacity-100");
              profileRef.current.classList.remove(
                "translate-x-[-500px]",
                "opacity-0",
              );
            } else {
              profileRef.current.classList.remove(
                "translate-x-0",
                "opacity-100",
              );
              profileRef.current.classList.add(
                "translate-x-[-500px]",
                "opacity-0",
              );
            }
          }

          if (introRef.current) {
            if (isHome) {
              introRef.current.classList.add("translate-x-0", "opacity-100");
              introRef.current.classList.remove(
                "translate-x-[500px]",
                "opacity-0",
              );
            } else {
              introRef.current.classList.remove("translate-x-0", "opacity-100");
              introRef.current.classList.add("translate-x-[500px]", "opacity-0");
            }
          }
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

  return (
    <section id="home" ref={homeRef} className="w-full">
      <div className="min-h-[100vh] w-full overflow-x-hidden px-[20px] md:px-[50px] lg:px-[100px] xl:px-[200px] 2xl:px-[400px] flex flex-col md:flex-row content-center items-center justify-between shadow-zinc-300 dark:shadow-zinc-700 shadow-sm">
        <div
          className="translate-x-0 opacity-100 transition-all duration-700 w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative m-auto md:m-0 mt-[40px] md:mt-0 order-last md:order-last"
          ref={profileRef}
        >
          <Image
            src="/amrabed.webp"
            alt="Amr Abed"
            fill
            className="rounded-full object-cover"
            priority
            sizes="(max-width: 768px) 300px, 400px"
          />
        </div>

        <div
          className="translate-x-0 opacity-100 transition-all duration-700 order-first md:order-first"
          ref={introRef}
        >
          <p className="text-2xl md:text-4xl py-2 font-sans text-center text-nowrap">
            I&apos;m
            <span className="text-primary">
              {" a"}
              {!mounted ? (
                "n Engineer"
              ) : (
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
              )}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
