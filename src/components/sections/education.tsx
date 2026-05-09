"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useSearch } from "@/contexts/search";
import degreesData from "@/data/degrees";
import { filterByQuery } from "@/filter";
import { Section } from "../section";

export const EducationSection = () => {
  const { debouncedQuery } = useSearch();

  const filteredDegrees = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();
    return degreesData.filter((degree) => filterByQuery(degree, lowercaseQuery));
  }, [debouncedQuery]);

  return (
    <Section id="degrees" title="Education" count={filteredDegrees.length}>
      {filteredDegrees.map((degree) => (
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
