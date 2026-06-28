"use client";

import { memo, ReactNode, useEffect, useRef } from "react";

export const Section = memo(
  ({
    id,
    title,
    children,
    contentClassName = "section-body",
  }: {
    id: string;
    title: string;
    children: ReactNode;
    contentClassName?: string;
  }) => {
    const dataRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      const currentDataRef = dataRef.current;
      const observer = new IntersectionObserver(
        ([entry]) => {
          // ⚡ Optimization: Toggle in-view class on the parent element
          currentDataRef?.classList.toggle("in-view", entry.isIntersecting);
        },
        {
          rootMargin: screenWidth <= 700 ? "-100px" : "-250px",
        },
      );

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
        <div className={`pop-down-child ${contentClassName}`}>{children}</div>
      </section>
    );
  },
);

Section.displayName = "Section";
