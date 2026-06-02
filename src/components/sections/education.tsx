"use client";

import { memo } from "react";

import degreesData from "@/data/degrees";

import { Section } from "../section";
import { SectionItemCard } from "../section-item-card";

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
