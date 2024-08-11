"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";


const Section = ({ id, title, children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const dataRef = useRef();
    const itemRef = useRef();

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
            }
        );

        observer.observe(dataRef.current);

        if (isVisible) {
            itemRef.current.classList.add("pop-up-child");
        } else {
            itemRef.current.classList.remove("pop-up-child");
        }
    }, [isVisible]);

    return (
        <Fragment>
            <section id={id} className='section' ref={dataRef}>
                <h2 className='section-heading'>{title}</h2>
                <div className='pop-down-child section-body' ref={itemRef}>
                    {children}
                </div>
            </section>
        </Fragment>
    );
};

export default Section;
