"use client";

import { memo, ReactNode, useEffect, useRef, useState } from "react";

// ⚡ Optimization: Section component is memoized to prevent redundant re-renders of the section wrapper.
export const Section = memo(({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const dataRef = useRef<HTMLElement | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getScreenWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-250px"}`,
      },
    );

    const currentDataRef = dataRef.current;
    if (currentDataRef) {
      observer.observe(currentDataRef);
    }

    return () => {
      if (currentDataRef) {
        observer.unobserve(currentDataRef);
      }
    };
  }, []);

  useEffect(() => {
    if (itemRef.current) {
      if (isVisible) {
        itemRef.current.classList.add("pop-up-child");
      } else {
        itemRef.current.classList.remove("pop-up-child");
      }
    }
  }, [isVisible]);

  return (
    <section id={id} className="section scroll-mt-48" ref={dataRef}>
      <div className="flex items-center gap-4 mb-8">
        <h2 className="section-heading mb-0">{title}</h2>
      </div>
      <div className="pop-down-child section-body" ref={itemRef}>
        {children}
      </div>
    </section>
  );
});

Section.displayName = "Section";
