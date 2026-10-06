"use client";

import { memo } from "react";

import { BookOpenIcon } from "@heroicons/react/24/outline";

import { FeaturedSectionContainer } from "@/components/featured-section-container";
import PublicationView from "@/components/publication";
import { publications as publicationsData } from "@/lib/data";

import { FilterableSection } from "../filterable-section";

export const PublicationsSection = memo(() => {
  return (
    <FilterableSection
      id="publications"
      title="Publications"
      icon={<BookOpenIcon className="size-7" />}
      data={publicationsData}
      renderItem={() => null}
      renderContainer={(publications) => (
        <FeaturedSectionContainer
          items={publications}
          renderItem={(publication) => (
            <PublicationView key={publication.id} publication={publication} />
          )}
        />
      )}
      sortFn={(a, b) => Number(b.year) - Number(a.year)}
    />
  );
});

PublicationsSection.displayName = "PublicationsSection";
