"use client";

import Link from "next/link";

import React, { Fragment, useContext } from "react";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import Section from "@/components/Section";
import ToggleThemeButton from "@/components/toggleThemeButton";
import HeaderProvider from "@/contexts/header";
import { ThemeContext } from "@/contexts/theme";
import projects from "@/data/projects";

const Timeline = () => (
  <div className="flex justify-center">
    <ul className="list-none">
      {projects.map((item) => (
        <li className="mb-5" key={item.id}>
          <div className="">
            <span className="relative left-5 xl:left-[-90px] xl:top-5 text-zinc">
              {item.released}
            </span>
            <div
              className="border-r-4 border-black dark:border-gray-800 absolute h-full top-5"
              style={{ left: "9px" }}
            ></div>
          </div>
          <div className="flex group">
            <div className="bg-gray-800 dark:bg-gray-600 group-hover:bg-primary z-10 rounded-full border-4 border-black dark:border-gray-800 h-5 w-5">
              <div className="bg-black dark:bg-gray-800 h-1 w-6 items-center ml-4 mt-1"></div>
            </div>
            <div className="flex-auto ml-6 z-10 font-medium">
              <div className="order-1 space-y-2 bg-gray-800 group-hover:bg-primary rounded-lg shadow-only transition-ease w-3/5 px-6 py-4">
                <h3 className="mb-3 font-semibold text-white text-lg">
                  {item.name}
                </h3>
                {/* <p className="pb-4 text-sm text-gray-100">
                    {item.organization.name}
                </p> */}
                <hr />
                <p>{item.description}</p>
                {/* <ul className="">
                    <li className="text-sm font-medium leading-snug tracking-wide text-gray-300 text-opacity-100">
                    {item.tasks[0]}
                    </li>
                    <li className="text-sm font-medium leading-snug tracking-wide text-gray-300 text-opacity-100">
                    {item.tasks[1]}
                    </li>
                </ul> */}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const Page = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Fragment>
      <HeaderProvider>
        <Link href="/">
          <ChevronLeftIcon className="size-8 gap-4" />
        </Link>
        <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} />
      </HeaderProvider>
      <Section id="projects" title="Projects">
        <Timeline />
      </Section>
    </Fragment>
  );
};

export default Page;
