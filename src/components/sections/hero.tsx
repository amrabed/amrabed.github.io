"use client";

import Image from "next/image";

import React, { useEffect, useRef, useState, memo } from "react";
import { TypeAnimation } from "react-type-animation";

const HeroSection = memo(() => {
  const [mounted, setMounted] = useState(false);

  const homeRef = useRef<HTMLElement>(null);

  // Intersection observer animation on scroll
  useEffect(() => {
    setMounted(true);
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const currentHomeRef = homeRef.current;
    if (currentHomeRef) {
      const homeObserver = new IntersectionObserver(
        ([entry]) => {
          // ⚡ Optimization: Direct DOM manipulation to toggle a single class on the parent
          // container, letting Tailwind's group variants handle child transitions.
          currentHomeRef.classList.toggle("in-view", entry.isIntersecting);
        },
        {
          rootMargin: screenWidth <= 700 ? "-100px" : "-300px",
        },
      );

      homeObserver.observe(currentHomeRef);

      return () => {
        homeObserver.unobserve(currentHomeRef);
      };
    }
  }, []);

  return (
    <section id="home" ref={homeRef} className="w-full group in-view">
      <div className="min-h-[100vh] w-full overflow-x-hidden px-[20px] md:px-[50px] lg:px-[100px] xl:px-[200px] 2xl:px-[400px] flex flex-col md:flex-row content-center items-center justify-between shadow-zinc-300 dark:shadow-zinc-700 shadow-sm">
        <div
          className="transition-all duration-700 w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative m-auto md:m-0 mt-[40px] md:mt-0 order-last md:order-last opacity-0 translate-x-[-500px] group-[.in-view]:opacity-100 group-[.in-view]:translate-x-0"
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
          className="transition-all duration-700 order-first md:order-first opacity-0 translate-x-[500px] group-[.in-view]:opacity-100 group-[.in-view]:translate-x-0"
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
