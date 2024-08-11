"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";

import { skills } from "@/data/skills";

const Skills = () => {
  const [istechStack, setIsTechStack] = useState(false);
  const skillsRef = useRef();
  const techBoxesRef = useRef();

  useEffect(() => {
    const getScreenWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const techStackObserver = new IntersectionObserver(
      ([techStackEntry]) => {
        setIsTechStack(techStackEntry.isIntersecting);
      },
      {
        rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-250px"}`,
      }
    );

    techStackObserver.observe(skillsRef.current);

    if (istechStack) {
      techBoxesRef.current.classList.add("pop-up-child");
    } else {
      techBoxesRef.current.classList.remove("pop-up-child");
    }
  }, [istechStack]);

  return (
    <Fragment>
      <section id='skills'>
        <div
          className='min-h-[100vh] overflow-x-hidden content-evenly items-center justify-between shadow-zinc-300 dark:shadow-zinc-700 shadow-sm overflow-hidden'
          ref={skillsRef}
        >
          <h2 className='text-3xl font-bold text-center p-4 flex justify-center items-center gap-3'>Technical Skills</h2>
          <div
            className='pop-down-child flex min-h-[450px] py-[30px] px-[20px] md:px-[100px] flex-wrap justify-center items-center gap-5'
            ref={techBoxesRef}
          >
            {skills.map((skill) => (
              <div
                className='transition-all duration-700 px-2 h-fit py-3 md:py-5 w-[120px] md:w-[150px] rounded flex flex-col gap-3 items-center'
                key={skill.name}
              >
                <p>{skill.icon}</p>
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Skills;
