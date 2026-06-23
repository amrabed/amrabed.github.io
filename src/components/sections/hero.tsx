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
    <section id="home" ref={homeRef} className="w-full in-view">
      <div className="hero-container">
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

        <div className="hero-intro">
          <p className="hero-intro-text">
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
