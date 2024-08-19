"use client";

import React, { Fragment, useContext, useEffect, useState } from "react";

import ToggleThemeButton from "@/components/toggleThemeButton";
import HeaderProvider from "@/contexts/header";
import { ThemeContext } from "@/contexts/theme";

import NavbarMobile from "./mobile/header";
import MobileNavbar from "./mobile/sidebar";
import NavbarLinks from "./navLinks";
import PageTitle from "./pageTitle";

const Header = () => {
  const [top, setTop] = useState("-80px");
  const [showSidebar, setShowSidebar] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);

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
          <NavbarLinks />
          <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} />
        </div>
      </HeaderProvider>

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
