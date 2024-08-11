"use client";
import React, { Fragment, useRef, useState, useEffect } from "react";
import Image from 'next/image';

import { EducationData } from "@/data/education";

const Education = () => {
  const [isEducation, setIsEducation] = useState(false);
  const educationRef = useRef();
  const educationBoxesRef = useRef();

  useEffect(() => {
    const getScreenWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const educationObserver = new IntersectionObserver(
      ([educationEntry]) => {
        setIsEducation(educationEntry.isIntersecting);
      },
      {
        rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-300px"}`,
      }
    );

    educationObserver.observe(educationRef.current);

    if (isEducation) {
      educationBoxesRef.current.classList.add("pop-up-child");
    } else {
      educationBoxesRef.current.classList.remove("pop-up-child");
    }
  }, [isEducation]);

  return (
    <Fragment>
      <section id='education'>
        <div
          className='min-h-[100vh] overflow-x-hidden content-center items-center justify-between shadow-zinc-300 dark:shadow-zinc-700 shadow-sm overflow-x-hidden'

          ref={educationRef}
        >
          <h2 className='text-3xl font-bold text-center p-4 flex justify-center items-center gap-3'>Education</h2>

          <div
            className='pop-down-child pb-[30px] px-[20px] md:px-[100px] lg:px-[200px] flex flex-row content-center items-center justify-between gap-[20px] md:gap-[50px]'
            ref={educationBoxesRef}
          >
            {EducationData.map((education) => (
              <div
                className='transition-all duration-700 flex rounded gap-6'
                key={education.degree}
              >
                <div className='flex flex-col gap-2 p-3 md:p-1 items-center'>
                  <a href={education.institute.url} target="_blank">
                    <Image src={education.institute.logo} width={150} height={150} />
                  </a>
                  <p className='text-xl md:text-2xl font-bold text-secondary-600'>{education.degree}</p>
                  {/* <p className='dark:text-[#07d0e5] text-[#c72c6c]'>{education.institute.name}</p> */}
                  <p className='text-gray'>{education.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Education;
