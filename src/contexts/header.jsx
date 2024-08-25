"use client";

import React, { createContext, useEffect, useState } from "react";

export const HeaderContext = createContext();

const HeaderProvider = ({ children }) => {
  const [top, setTop] = useState("-80px");

  // show/hide header on scroll from top
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
    <HeaderContext.Provider value={{ top, setTop: setTop }}>
      <div
        className="w-full h-[50px] px-8 backdrop-filter backdrop-blur-lg hidden md:flex justify-between items-center gap-4 shadow-sm shadow-gray-300 dark:shadow-gray-800 fixed z-10 transition-all duration-500"
        style={{ top: top }}
      >
        {children}
      </div>
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
