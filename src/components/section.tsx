"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export const Section = ({
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

    if (dataRef.current) {
      observer.observe(dataRef.current);
    }

    return () => {
      if (dataRef.current) {
        observer.unobserve(dataRef.current);
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
    <section id={id} className="section" ref={dataRef}>
      <h2 className="section-heading">{title}</h2>
      <div className="pop-down-child section-body" ref={itemRef}>
        {children}
      </div>
    </section>
  );
};
