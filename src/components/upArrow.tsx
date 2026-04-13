"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

import { Button } from "@heroui/react";

const UpArrow = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top flex justify-center">
      {isVisible && (
        <Button
          id="up"
          onClick={scrollToTop}
          radius="full"
          size="lg"
          variant="light"
          isIconOnly
          // className="scroll-button bg-black dark:bg-slate-800 hover:bg-zinc-600 dark:hover:bg-slate-500"
        >
          <FaArrowUp />
        </Button>
      )}
    </div>
  );
};

export default UpArrow;
