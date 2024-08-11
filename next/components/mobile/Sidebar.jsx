import React, { Fragment } from "react";

import SidebarButton from "./SidebarButton";
import { MobileNavbarLinks } from "@/components/NavbarLinks";

const MobileNavbar = ({ showSidebar, setShowSidebar }) => (
  <Fragment>
    <div
      className={`w-full h-screen bg-[rgba(255,255,255,0.3)] dark:bg-[rgba(0,0,0,0.3)] fixed ${showSidebar ? null : "hidden"
        } top-0 left-0 z-10`}
      onClick={() => setShowSidebar(!showSidebar)}
    >
      {/* Sidebar */}
      <div
        className={`w-[70%] h-screen bg-white dark:bg-black shadow-sm shadow-gray-600 dark:shadow-gray-300 ${showSidebar ? null : "translate-x-[-450px]"
          } transition-all duration-1000`}
      >
        <div className='p-3 flex items-center gap-3'>
          <SidebarButton showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <div className='flex items-center gap-2'>
            <p>
              <span className='text-lg font-bold'>Amr Abed</span>
            </p>
          </div>
        </div>
        <MobileNavbarLinks />
      </div>
    </div>
  </Fragment>
);

export default MobileNavbar;
