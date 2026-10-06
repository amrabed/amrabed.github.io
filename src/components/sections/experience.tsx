"use client";

import { memo } from "react";

import { BriefcaseIcon } from "@heroicons/react/24/outline";

import Timeline from "@/components/timeline";
import { positions as positionsData } from "@/lib/data";

import { FilterableSection } from "../filterable-section";

export const ExperienceSection = memo(() => {
  return (
    <FilterableSection
      id="experience"
      title="Experience"
      icon={<BriefcaseIcon className="size-7" />}
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
