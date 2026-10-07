"use client";

import Image from "next/image";

import { useEffect, useRef, useState, memo } from "react";
import { TypeAnimation } from "react-type-animation";
import { sendGAEvent } from "@next/third-parties/google";

import Social from "@/components/social";
import { basics } from "@/lib/data";

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
    <section id="home" ref={homeRef} className="w-full in-view">
      <div className="hero-container flex flex-col justify-between">
        <div className="w-full flex-grow flex flex-col md:flex-row items-center justify-between gap-8 my-auto">
          <div className="hero-intro flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Amr Abed
            </h1>
            <p className="hero-intro-text text-xl md:text-3xl text-slate-700 dark:text-slate-300 mt-1">
              I&apos;m{" "}
              <span className="text-primary font-semibold">
                a
                {mounted ? (
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
                ) : (
                  "n Engineer"
                )}
              </span>
            </p>
            <p className="mt-2 text-sm sm:text-base md:text-lg font-medium text-slate-600 dark:text-slate-400 max-w-lg">
              PhD · Engineering Manager · AWS Certified · Cloud &amp; AI
              Architect
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a
                href="#about"
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium shadow-sm hover:opacity-90 transition-opacity"
                onClick={() => sendGAEvent({ event: "cta_click", value: "about_me" })}
              >
                About Me
              </a>
              {basics.resumeUrl && (
                <a
                  href={basics.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary transition-colors font-medium"
                  aria-label="View Amr Abed's Resume"
                  onClick={() => sendGAEvent({ event: "cta_click", value: "view_resume" })}
                >
                  View Resume
                </a>
              )}
            </div>
          </div>

          <div className="hero-profile">
            <Image
              src="/amrabed.webp"
              alt="Amr Abed"
              fill
              className="rounded-full object-cover"
              priority
              sizes="(max-width: 768px) 300px, 400px"
            />
          </div>
        </div>

        <div className="w-full flex justify-center pt-6 pb-2">
          <Social className="justify-center" />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
