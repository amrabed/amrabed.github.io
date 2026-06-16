"use client";

import { memo, ReactNode, useEffect, useRef } from "react";

export const Section = memo(
  ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: ReactNode;
  }) => {
    const dataRef = useRef<HTMLElement | null>(null);
    const itemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      // ⚡ Optimization: Use direct DOM manipulation instead of React state to toggle classes.
      // This prevents unnecessary re-renders of the entire section and its children
      // every time it enters or leaves the viewport.
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (itemRef.current) {
            if (entry.isIntersecting) {
              itemRef.current.classList.add("pop-up-child");
            } else {
              itemRef.current.classList.remove("pop-up-child");
            }
          }
        },
        {
          rootMargin: screenWidth <= 700 ? "-100px" : "-250px",
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
  },
);

Section.displayName = "Section";
