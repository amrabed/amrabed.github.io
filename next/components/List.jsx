"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";

const List = (id, title, view) => {
  const [istechStack, setIsTechStack] = useState(false);
  const itemRef = useRef();
  const boxRef = useRef();

  useEffect(() => {
    const getScreenWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const techStackObserver = new IntersectionObserver(
      ([entry]) => {
        setIsTechStack(entry.isIntersecting);
      },
      {
        rootMargin: `${getScreenWidth() <= 700 ? "-100px" : "-250px"}`,
      }
    );

    techStackObserver.observe(itemRef.current);

    if (istechStack) {
      boxRef.current.classList.add("pop-up-child");
    } else {
      boxRef.current.classList.remove("pop-up-child");
    }
  }, [istechStack]);

  return (
    <Fragment>
      <section id={id}>
        <div
          className='min-h-[100vh] overflow-x-hidden content-evenly items-center justify-between shadow-zinc-300 dark:shadow-zinc-700 shadow-sm overflow-hidden'
          ref={itemRef}
        >
          <h2 className='text-3xl font-bold text-center p-4 flex justify-center items-center gap-3'>{title}</h2>
          <div
            className='pop-down-child flex min-h-[450px] py-[30px] px-[20px] md:px-[100px] flex-wrap justify-center items-center gap-5'
            ref={boxRef}
          >
            {view}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default List;
