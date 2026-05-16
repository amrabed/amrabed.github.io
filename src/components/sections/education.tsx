"use client";

import Image from "next/image";

import degreesData from "@/data/degrees";

import { Section } from "../section";

export const EducationSection = () => {
  return (
    <Section id="degrees" title="Education" count={degreesData.length}>
      {degreesData.map((degree) => (
        <div className="transition-all duration-700 gap-6" key={degree.title}>
          <a
            href={degree.university.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="section-item p-3">
              <Image
                src={degree.university.logo ?? ""}
                alt={`${degree.university.name} logo`}
                height={150}
                width={150}
              />
              <p className="text-xl md:text-2xl text-foreground">
                {degree.title}
              </p>
              <p className="dark:text-primary-dark text-primary">
                {degree.university.name}
              </p>
              <p className="text-secondary">{degree.duration}</p>
            </div>
          </a>
        </div>
      ))}
    </Section>
  );
};
