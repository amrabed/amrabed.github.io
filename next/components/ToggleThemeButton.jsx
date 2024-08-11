import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";


const ToggleThemeButton = ({ theme, toggleTheme }) => (
    <div className='flex items-center gap-4'>
        <button
            className='text-primary dark:text-darkPrimary text-2xl font-semibold hover:scale-110'
            onClick={toggleTheme}
        >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
    </div>
);

export default ToggleThemeButton;