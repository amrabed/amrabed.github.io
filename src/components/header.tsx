"use client";

import React, { Fragment, useEffect, useState } from "react";

import HeaderProvider from "@/contexts/header";

import { Sidebar, NavigationLinks, SidebarButton } from "./nav";
import PageTitle from "./pageTitle";

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
        <div className="flex gap-4">
          <NavigationLinks />
        </div>
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

export default Header;
