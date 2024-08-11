import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const NavbarMobile = ({ setShowMenu, setThemeFun, theme, showMenu, top }) => {
  return (
    //  Mobile Header
    <div
      className='w-full px-5 py-3 bg-[#ffffffcc] dark:bg-[#000000cc] backdrop-filter backdrop-blur-lg flex justify-between md:hidden shadow-md shadow-gray-300 dark:shadow-gray-800 fixed z-10'
      style={{ top }}
    >
      <div className='flex items-center gap-4'>
        {/* Open Sidebar Button */}
        <button
          className='text-black dark:text-white text-3xl font-semibold'
          onClick={() => setShowMenu(!showMenu)}
        >
          <GiHamburgerMenu />
        </button>

        {/* Name Logo */}
        <p className='text-gray-400 flex'>
          <span className='text-lg font-bold'>Amr Abed</span>
        </p>
      </div>

      {/* Toggle Theme Button */}
      <div className='flex items-center gap-4'>
        <button
          className='text-[#c72c6c] dark:text-[#07d0e5] text-2xl font-semibold hover:scale-110'
          onClick={setThemeFun}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </div>
  );
};

export default NavbarMobile;
