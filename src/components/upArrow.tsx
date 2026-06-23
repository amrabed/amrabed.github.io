"use client";

import { motion, AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";

import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { Button, Tooltip } from "@heroui/react";

import { useFilter } from "@/contexts/filter";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isFilterBarVisible } = useFilter();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

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
    <div
      className={`fixed ${isFilterBarVisible ? "bottom-20" : "bottom-6"} left-4 sm:left-6 z-[1000] transition-all duration-300`}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Tooltip>
              <Tooltip.Trigger>
                <Button
                  isIconOnly
                  onPress={scrollToTop}
                  className="scroll-button bg-primary hover:bg-indigo-700 h-12 w-12 min-w-0 p-0 rounded-full"
                  aria-label="Scroll to top"
                >
                  <ChevronUpIcon className="size-6 text-white" />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <Tooltip.Arrow />
                Scroll to top
              </Tooltip.Content>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollToTopButton;
