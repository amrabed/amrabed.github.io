"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type HeaderContextType = {
  top: string;
  setTop: (top: string) => void;
};
export const HeaderContext = createContext<HeaderContextType | undefined>(
  undefined,
);

// Custom hook to use the header context
export const useTheme: () => HeaderContextType = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

const HeaderProvider = ({ children }: { children: ReactNode }) => {
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

  const contextValue = useMemo(() => ({ top, setTop }), [top, setTop]);

  return (
    <HeaderContext.Provider value={contextValue}>
      <div
        className="w-full h-[50px] px-8 bg-white dark:bg-slate-800 backdrop-filter backdrop-blur-lg hidden md:flex justify-between items-center gap-4 shadow-sm shadow-gray-300 dark:shadow-gray-800 fixed z-10 transition-all duration-500"
        style={{ top: top }}
      >
        {children}
      </div>
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
