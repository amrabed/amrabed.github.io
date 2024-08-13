"use client";

import React, { Fragment, useContext, useEffect, useState } from "react";

import { ThemeContext } from "@/contexts/theme";

import NavbarMobile from "./mobile/header";
import MobileNavbar from "./mobile/sidebar";
import NavbarLinks from "./navbarLinks";
import PageTitle from "./pageTitle";
import ToggleThemeButton from "./toggleThemeButton";

const Header = () => {
  const [top, setTop] = useState("0");
  const [showSidebar, setShowSidebar] = useState(false);

  const { toggleTheme, theme } = useContext(ThemeContext);

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
      {/* Desktop Header */}
      <div
        className="w-full h-[70px] px-8 bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(0,0,0,0.8)] backdrop-filter backdrop-blur-lg hidden md:flex justify-between items-center gap-4 shadow-sm shadow-gray-300 dark:shadow-gray-800 fixed z-10 transition-all duration-500"
        style={{ top: top }}
      >
        <PageTitle />
        <NavbarLinks />

        <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* Mobile Header */}
      <NavbarMobile
        theme={theme}
        toggleTheme={toggleTheme}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        top={top}
      />

      {/* SideMenu For Mobile Screen */}
      <MobileNavbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
    </Fragment>
  );
};

export default Header;
