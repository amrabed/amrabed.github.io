import React from "react";

import PageTitle from "../PageTitle";
import ToggleThemeButton from "../ToggleThemeButton";
import SidebarButton from "./SidebarButton";

const NavbarMobile = ({
  theme,
  toggleTheme,
  showSidebar,
  setShowSidebar,
  top,
}) => (
  <div
    className="w-full px-5 py-3 bg-[#ffffffcc] dark:bg-[#000000cc] backdrop-filter backdrop-blur-lg flex justify-between md:hidden shadow-md shadow-gray-300 dark:shadow-gray-800 fixed z-10"
    style={{ top }}
  >
    <div className="flex items-center gap-3 text-primary dark:text-darkPrimary">
      <SidebarButton
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <PageTitle />
      {/* <p className='text-lg font-bold'>Amr Abed</p> */}
    </div>

    <ToggleThemeButton theme={theme} toggleTheme={toggleTheme} />
  </div>
);

export default NavbarMobile;
