"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Card } from "@heroui/react";
import { useSearch } from "@/contexts/search";
import degreesData from "@/data/degrees";
import { filterByQuery } from "@/filter";
import { Section } from "./section";

export const EducationSection = () => {
  const { debouncedQuery } = useSearch();

  const filteredDegrees = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();
    return degreesData.filter((degree) => filterByQuery(degree, lowercaseQuery));
  }, [debouncedQuery]);

  return (
    <Section id="education" title="Education" count={filteredDegrees.length}>
      <div className="flex flex-col gap-6 w-full">
        {filteredDegrees.map((degree) => (
          <a
            key={degree.title}
            href={degree.university.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="hover:border-primary border-1 transition-all duration-300 bg-white dark:bg-slate-900 p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="relative size-24 shrink-0">
                <Image
                  src={degree.university.logo ?? ""}
                  alt={`${degree.university.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  {degree.title}
                </h3>
                <p className="text-primary font-medium text-lg">
                  {degree.university.name}
                </p>
                <p className="text-secondary">{degree.duration}</p>
              </div>
            </Card>
          </a>
        ))}
      </div>
      {filteredDegrees.length === 0 && (
        <p className="text-center text-slate-500 w-full py-8">No education entries match your search.</p>
      )}
    </Section>
  );
};
