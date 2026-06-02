"use client";

import { memo } from "react";

import Timeline from "@/components/timeline";
import positionsData from "@/data/positions";

import { FilterableSection } from "../filterable-section";

export const ExperienceSection = memo(() => {
  return (
    <FilterableSection
      id="experience"
      title="Experience"
      data={positionsData}
      renderItem={() => null}
      renderContainer={(items) => (
        <div className="w-full mt-8 px-4 md:px-10" key="experience-timeline">
          <Timeline positions={items} />
        </div>
      )}
    />
  );
});

ExperienceSection.displayName = "ExperienceSection";
