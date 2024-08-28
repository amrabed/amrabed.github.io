"use client";

import Link from "next/link";

import React, { Fragment, ReactNode, useEffect, useState } from "react";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import HeaderProvider from "@/contexts/header";

import { Sidebar, NavigationLinks, SidebarButton } from "./nav";
import PageTitle from "./pageTitle";
import Search from "./search";

const MobileHeader = ({
  showSidebar,
  setShowSidebar,
  top,
}: {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
  top: string;
}) => (
  <div
    className="w-full px-5 py-3 bg-white dark:bg-slate-800 backdrop-filter backdrop-blur-lg flex justify-between md:hidden fixed z-10"
    style={{ top }}
  >
    <div className="flex items-center gap-3 text-primary dark:text-primary-dark">
      <SidebarButton
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <PageTitle />
    </div>
  </div>
);

const Header = () => {
  const [top, setTop] = useState("-80px");
  const [showSidebar, setShowSidebar] = useState(false);

  // show/hide navbar on scroll from top
  useEffect(() => {
    const handleScroll = () => {
      setTop(window.scrollY > 0 ? "0" : "-80px");
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <HeaderProvider>
        <PageTitle />
        <NavigationLinks />
      </HeaderProvider>

      {/* Mobile Header */}
      <MobileHeader
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        top={top}
      />

      {/* SideMenu For Mobile Screen */}
      <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
    </Fragment>
  );
};

export const PageHeader = ({
  title,
  query,
  setQuery,
  placeholder,
  children,
}: {
  title: string;
  query: string;
  setQuery: (query: string) => void;
  placeholder: string;
  children: ReactNode;
}) => (
  <div className="w-full p-5 backdrop-filter backdrop-blur-lg md:flex justify-between items-center gap-4 shadow-sm shadow-gray-300 dark:shadow-gray-800 fixed z-10 transition-all duration-500">
    <div className="flex flex-row justify-between w-full">
      <div className="flex flex-row gap-1 p-1">
        <Link href="/">
          <ChevronLeftIcon className="size-8 text-xl" color="primary" />
        </Link>
        <h1 className="text-xl p-1 hidden md:flex">{title}</h1>
      </div>
      <Search placeholder={placeholder} query={query} setQuery={setQuery} />
      {children}
    </div>
  </div>
);

export default Header;
