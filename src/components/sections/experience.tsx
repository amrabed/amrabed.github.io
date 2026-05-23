"use client";

import Timeline from "@/components/timeline";
import positionsData from "@/data/positions";

import { FilterableSection } from "../filterable-section";

export const ExperienceSection = () => {
  return (
    <FilterableSection
      id="experience"
      title="Experience"
      data={positionsData}
      renderItem={(positions) => (
        <div className="w-full mt-8 px-4 md:px-10" key="experience-timeline">
          <Timeline positions={positions as any} />
        </div>
      )}
      isSingleContainer
    />
  );
};
