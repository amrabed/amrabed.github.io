import React from "react";
import { FiSidebar } from "react-icons/fi";

const SidebarButton = ({ showSidebar, setShowSidebar }) => (
    <button className='text-black dark:text-white' onClick={() => setShowSidebar(!showSidebar)}>
        <FiSidebar />
    </button>
);

export default SidebarButton;