import React from "react";

import PageTitle from "../pageTitle";
import SidebarButton from "./sidebarButton";

const NavbarMobile = ({
  showSidebar,
  setShowSidebar,
  top,
}: {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
  top: string;
}) => (
  <div
    className="w-full px-5 py-3 bg-[#ffffffcc] dark:bg-[#000000cc] backdrop-filter backdrop-blur-lg flex justify-between md:hidden shadow-md shadow-gray-300 dark:shadow-gray-800 fixed z-10"
    style={{ top }}
  >
    <div className="flex items-center gap-3 text-primary dark:text-primary-dark">
      <SidebarButton
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <PageTitle />
      {/* <p className='text-lg font-bold'>Amr Abed</p> */}
    </div>
  </div>
);

export default NavbarMobile;
