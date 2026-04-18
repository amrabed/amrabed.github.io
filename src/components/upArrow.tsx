"use client";

import { useEffect, useState } from "react";

import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <Button
          isIconOnly
          onPress={scrollToTop}
          className="scroll-button bg-primary hover:bg-indigo-700 h-12 w-12 min-w-0 p-0 rounded-full"
          aria-label="Scroll to top"
        >
          <ChevronUpIcon className="size-6 text-white" />
        </Button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
