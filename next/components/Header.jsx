"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FaSun, FaMoon } from "react-icons/fa";


import MobileNavbar from "./mobile/Sidebar";
import NavbarMobile from "./mobile/Header";
import { NavbarMenu } from "../data/navbar";

import { ThemeContext } from "@/context/themeContext";

const Header = () => {
  const [top, setTop] = useState("0");
  const [showMenu, setShowMenu] = useState(false);

  const { setThemeFun, theme } = useContext(ThemeContext);

  // Logic for Navbar Hide and Show on scrolling behaviour
  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos) {
        setTop("0"); // Show the navbar
      } else {
        setTop("-80px"); // Hide the navbar
      }

      prevScrollPos = currentScrollPos;
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
        className='w-full h-[70px] px-8 bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(0,0,0,0.8)] backdrop-filter backdrop-blur-lg hidden md:flex justify-between items-center gap-4 shadow-sm shadow-gray-300 dark:shadow-gray-800 fixed z-10 transition-all duration-500'
        style={{ top: top }}
      >
        {/* Name Logo */}
        <a href="#">
          <p className='text-white-400 dark:text-black-400 flex'>
            <span className='text-lg font-bold'>AMR ABED</span>
          </p>
        </a>
        <div className='h-full flex gap-4'>
          {/* Navbar Links */}
          {NavbarMenu.map((navbar) => (
            <Link
              className={"text-[#665DC3] dark:text-[#07d0e5] font-semibold"}
              href={navbar.link}
              key={navbar.name}
            >
              <div className='h-full pb-1 hover:pb-0 px-2 flex items-center hover:border-b-4  border-[#665DC3] dark:border-[#07d0e5] transition-all'>
                {navbar.name}
              </div>
            </Link>
          ))}
        </div>
        {/* Toggle Theme button */}
        <div className='flex items-center gap-4'>
          <button
            className='text-xl text-[#665DC3] dark:text-[#07d0e5] hover:scale-110'
            onClick={setThemeFun}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <NavbarMobile
        setShowMenu={setShowMenu}
        setThemeFun={setThemeFun}
        showMenu={showMenu}
        theme={theme}
        top={top}
      />

      {/* SideMenu For Mobile Screen */}
      <MobileNavbar setShowMenu={setShowMenu} showMenu={showMenu} />
    </Fragment>
  );
};

export default Header;
