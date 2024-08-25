"use client";

import React, { Fragment, useEffect, useState } from "react";

import HeaderProvider from "@/contexts/header";

import NavbarMobile from "./mobile/header";
import MobileNavbar from "./mobile/sidebar";
import NavbarLinks from "./navLinks";
import PageTitle from "./pageTitle";

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
          <NavbarLinks />
        </div>
      </HeaderProvider>

      {/* Mobile Header */}
      <NavbarMobile
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
