"use client";

import Image from "next/image";

import { memo } from "react";

import degreesData from "@/data/degrees";

import { Section } from "../section";

// ⚡ Optimization: EducationSection is memoized to prevent unnecessary re-renders.
// Since it only depends on static data (degreesData) and doesn't consume filter/search contexts,
// it should only re-render if its parent (Home) re-renders, which we also want to avoid.
export const EducationSection = memo(() => {
  return (
    <Section id="degrees" title="Education">
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
});

EducationSection.displayName = "EducationSection";
