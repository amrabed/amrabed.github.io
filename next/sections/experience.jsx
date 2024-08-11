"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { MdWork } from "react-icons/md";

import { positions } from "@/data/experience";

const Experience = () => {
  const [desc, setDesc] = useState("");
  const [isExpe, setIsExpe] = useState(false);
  const expeRef = useRef();
  const expeBoxesRef = useRef();

  useEffect(() => {
    const expeObserver = new IntersectionObserver(
      ([expeEntry]) => {
        setIsExpe(expeEntry.isIntersecting);
      },
      {
        rootMargin: "-100px",
      },
    );

    expeObserver.observe(expeRef.current);

    if (isExpe) {
      expeBoxesRef.current.classList.add("pop-up-child");
    } else {
      expeBoxesRef.current.classList.remove("pop-up-child");
    }
  }, [isExpe]);

  return (
    <Fragment>
      <section id="experience" ref={expeRef}>
        <div className="min-h-[100vh] overflow-x-hidden content-center items-center justify-between">
          <h2 className="text-3xl font-bold text-center p-4 flex justify-center items-center gap-3">
            Experience
          </h2>

          <div
            className="pop-down-child pb-[30px] px-[20px]"
            ref={expeBoxesRef}
          >
            {positions.map((position, index) =>
              index % 2 == 0 ? (
                <div
                  className={`md:flex gap-2 items-end transition-all duration-500 ${index !== 0 ? "mt-7" : ""}`}
                  key={position.organization.name}
                >
                  <div
                    className="md:w-[45%] cursor-pointer p-3"
                    onClick={() =>
                      setDesc(desc === position.tasks ? "" : position.tasks[0])
                    }
                  >
                    <div className="flex justify-between gap-2">
                      <p className="text-xl md:text-2xl font-bold text-red-600">
                        {position.organization.name}
                      </p>
                      <image
                        src={position.organization.logo}
                        alt="${position.organization}-logo"
                      />
                    </div>

                    <div className="flex justify-between text-gray-600 dark:text-gray-400 gap-2 mt-2">
                      <p className="font-semibold">{position.position}</p>
                      <p>{position.duration}</p>
                    </div>

                    <p
                      className="mt-2 text-justify transition-all duration-500 overflow-hidden text-gray-700 dark:text-gray-500"
                      style={
                        desc == position.description
                          ? { maxHeight: "400px" }
                          : { maxHeight: "0px" }
                      }
                    >
                      {position.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className="md:flex justify-end items-end mt-7 gap-2 transition-all duration-500 "
                  key={position.organization.name}
                >
                  <div
                    className="md:w-[45%] cursor-pointer  transition-all duration-500 p-3"
                    onClick={() =>
                      setDesc(
                        desc === position.description
                          ? ""
                          : position.description,
                      )
                    }
                  >
                    <div className="flex justify-between gap-2">
                      <p className="text-xl md:text-2xl font-bold text-red-600">
                        {position.organization.name}
                      </p>
                      <image
                        src={position.organization.logo}
                        alt="${position.organization}-logo"
                      />
                    </div>

                    <div className="flex justify-between text-gray-600 dark:text-gray-400 mt-2 gap-2">
                      <p className="font-semibold">{position.position}</p>
                      <p>{position.duration}</p>
                    </div>
                    <p
                      className="mt-2 overflow-hidden transition-all duration-500 text-justify text-gray-700 dark:text-gray-500"
                      style={
                        desc == position.description
                          ? { maxHeight: "400px" }
                          : { maxHeight: "0px" }
                      }
                    >
                      {position.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Experience;
