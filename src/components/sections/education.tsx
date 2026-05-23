"use client";

import { memo } from "react";

import degreesData from "@/data/degrees";

import { Section } from "../section";
import { SectionItemCard } from "../section-item-card";

// ⚡ Optimization: EducationSection is memoized to prevent unnecessary re-renders.
// Since it only depends on static data (degreesData) and doesn't consume filter/search contexts,
// it should only re-render if its parent (Home) re-renders, which we also want to avoid.
export const EducationSection = memo(() => {
  return (
    <Section id="degrees" title="Education">
      {degreesData.map((degree) => (
        <SectionItemCard
          key={degree.title}
          href={degree.university.url}
          image={{
            src: degree.university.logo ?? "",
            alt: `${degree.university.name} logo`,
          }}
          title={degree.title}
          subtitle={degree.university.name}
          footer={degree.duration}
        />
      ))}
    </Section>
  );
});

EducationSection.displayName = "EducationSection";
