"use client";

import { FeaturedSectionContainer } from "@/components/featured-section-container";
import PublicationView from "@/components/publication";
import publicationsData from "@/data/publications";

import { FilterableSection } from "../filterable-section";

export const PublicationsSection = () => {
  return (
    <FilterableSection
      id="publications"
      title="Publications"
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
};
