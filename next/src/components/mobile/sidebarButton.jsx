import React from "react";
import { RiSidebarFoldLine, RiSidebarUnfoldLine } from "react-icons/ri";

const SidebarButton = ({ showSidebar, setShowSidebar }) => (
  <button
    className="text-black dark:text-white"
    onClick={() => setShowSidebar(!showSidebar)}
  >
    {showSidebar ? <RiSidebarFoldLine /> : <RiSidebarUnfoldLine />}
  </button>
);

export default SidebarButton;
