import Link from "next/link";

import React, { Fragment } from "react";
import { RiSidebarFoldLine, RiSidebarUnfoldLine } from "react-icons/ri";

import { Divider } from "@nextui-org/react";

import PageTitle from "./pageTitle";

export const sections = [
  {
    name: "skills",
    link: "#skills",
  },
  {
    name: "certifications",
    link: "#certifications",
  },
  {
    name: "education",
    link: "#education",
  },
];

export const pages = [
  {
    name: "projects",
    link: "./projects",
  },
  {
    name: "experience",
    link: "./positions",
  },
];

export const NavigationLinks = () => (
  <div className="h-full flex gap-2">
    {sections.map((section) => (
      <Link
        className={"hover:text-primary hover:dark:text-primary-dark"}
        href={section.link}
        key={section.name}
      >
        <div className="h-full pb-1 hover:pb-0 px-1 flex items-center border-primary dark:border-primary-dark transition-all">
          {section.name}
        </div>
      </Link>
    ))}
    <Divider orientation="vertical" className="h-100" />
    {pages.map((page) => (
      <Link
        className={"hover:text-primary hover:dark:text-primary-dark"}
        href={page.link}
        key={page.name}
      >
        <div className="h-full pb-1 hover:pb-0 px-1 flex items-center border-primary dark:border-primary-dark transition-all">
          {page.name}
        </div>
      </Link>
    ))}
  </div>
);

export const SidebarButton = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
}) => (
  <button
    className="text-black dark:text-white"
    onClick={() => setShowSidebar(!showSidebar)}
  >
    {showSidebar ? <RiSidebarFoldLine /> : <RiSidebarUnfoldLine />}
  </button>
);

export const Sidebar = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
}) => (
  <Fragment>
    <div
      className={`w-full h-screen bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.3)] fixed ${
        showSidebar ? null : "hidden"
      } top-0 left-0 z-10`}
      onClick={() => setShowSidebar(!showSidebar)}
    >
      {/* Sidebar */}
      <div
        className={`w-[70%] h-screen bg-white dark:bg-slate-800 ${
          showSidebar ? null : "translate-x-[-450px]"
        } transition-all duration-1000`}
      >
        <div className=" px-5 py-3 flex items-center gap-3">
          <SidebarButton
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />

          <PageTitle />
        </div>
        <div className="p-3 flex flex-col gap-3">
          {sections.map((section) => (
            <Link
              className="text-lg p-2 hover:text-primary hover:dark:text-primary-dark"
              href={section.link}
              key={section.name}
            >
              {section.name}
            </Link>
          ))}
          <Divider />
          {pages.map((page) => (
            <Link
              className={"hover:text-primary hover:dark:text-primary-dark"}
              href={page.link}
              key={page.name}
            >
              <div className="text-lg p-2 hover:text-primary hover:dark:text-primary-dark">
                {page.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </Fragment>
);
