"use client";

import { useMemo } from "react";

import PublicationView from "@/components/publication";
import publicationsData from "@/data/publications";

import { FilterableSection } from "../filterable-section";

export const PublicationsSection = () => {
  return (
    <FilterableSection
      id="publications"
      title="Publications"
      data={publicationsData}
      renderItem={(items: any) => {
        const publications = items as any[];
        const featuredPublications = publications.filter((p) => p.featured);
        const nonFeaturedPublications = publications.filter((p) => !p.featured);

        return (
          <div className="flex flex-col gap-6 w-full px-4 md:px-10" key="publications-container">
            {featuredPublications.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {featuredPublications.map((publication) => (
                  <PublicationView
                    key={publication.id}
                    publication={publication}
                    featured
                  />
                ))}
              </div>
            )}
            {nonFeaturedPublications.length > 0 && (
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {nonFeaturedPublications.map((publication) => (
                  <PublicationView
                    key={publication.id}
                    publication={publication}
                  />
                ))}
              </div>
            )}
          </div>
        );
      }}
      sortFn={(a, b) => Number(b.year) - Number(a.year)}
      isSingleContainer
    />
  );
};
