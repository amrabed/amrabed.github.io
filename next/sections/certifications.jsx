"use client";
import React, { Fragment, useState, useEffect, useRef } from "react";
import Image from 'next/image';

import { certificates } from "@/data/certifications";

const Certifications = () => {
    const [isCert, setIsCert] = useState(false);
    const certRef = useRef();
    const certBoxesRef = useRef();

    useEffect(() => {
        const expeObserver = new IntersectionObserver(
            ([entry]) => {
                setIsCert(entry.isIntersecting);
            }
        );

        expeObserver.observe(certRef.current);

        if (isCert) {
            certBoxesRef.current.classList.add("pop-up-child");
        } else {
            certBoxesRef.current.classList.remove("pop-up-child");
        }
    }, [isCert]);


    return (
        <Fragment>
            <section id='certifications'>
                <div
                    className='min-h-[100vh] overflow-x-hidden content-evenly items-center justify-between shadow-zinc-300 dark:shadow-zinc-700 shadow-sm overflow-hidden'
                    ref={certRef}
                >
                    <h2 className='text-3xl font-bold text-center p-4 flex justify-center items-center gap-3'>Certifications</h2>
                    <div
                        className='pop-down-child flex min-h-[450px] py-[30px] px-[20px] md:px-[100px] justify-between items-center gap-5'
                        ref={certBoxesRef}
                    >
                        {certificates.map((certificate) => (
                            <div
                                className='transition-all duration-700 flex rounded gap-6'
                                key={certificate.title}
                            >
                                <a href={certificate.link} target="_blank">
                                    <div className='flex flex-col gap-2 p-3 md:p-1 items-center'>
                                        <Image src={certificate.badge} alt={`Badge for ${certificate.title}`} width={150} height={150} />
                                        <p className='text-xl md:text-xl font-bold text-secondary-600'>{certificate.title}</p>
                                        <p className='dark:text-[#07d0e5] text-[#665DC3]'>{certificate.organization.name}</p>
                                        <p className='text-gray'>{certificate.date}</p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default Certifications;
