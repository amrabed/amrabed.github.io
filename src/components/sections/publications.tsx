"use client";

import { useMemo } from "react";

import PublicationView from "@/components/publication";
import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import publicationsData from "@/data/publications";
import { filterByQuery, filterByArea } from "@/filter";

import { EmptyState } from "../empty-state";
import { Section } from "../section";

export const PublicationsSection = () => {
  const { debouncedQuery } = useSearch();
  const { selected } = useFilter();

  const areas = selected["areas"];
  const roles = selected["roles"];
  const skills = selected["skills"];

  // ⚡ Optimization: Memoize filter sets separately to avoid recreating them
  // unless the specific filter category changes.
  const selectedAreas = useMemo(() => new Set(areas || []), [areas]);
  const selectedRoles = useMemo(() => new Set(roles || []), [roles]);
  const selectedSkills = useMemo(() => new Set(skills || []), [skills]);

  // ⚡ Optimization: Pre-filter publications by selected area, role, and skill.
  // This avoids re-running these checks when only the search query changes.
  const matchingPublications = useMemo(() => {
    return publicationsData.filter((publication) => {
      const matchesArea = filterByArea(publication.tags, selectedAreas);
      const matchesRole =
        selectedRoles.size === 0 ||
        publication.roles.some((r) => selectedRoles.has(r.toLowerCase()));
      const matchesSkill =
        selectedSkills.size === 0 ||
        publication.skills.some((s) => selectedSkills.has(s.toLowerCase()));
      return matchesArea && matchesRole && matchesSkill;
    });
  }, [selectedAreas, selectedRoles, selectedSkills]);

  const filteredPublications = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();

    return matchingPublications
      .filter((publication) => filterByQuery(publication, lowercaseQuery))
      .sort((a, b) => Number(b.year) - Number(a.year));
  }, [debouncedQuery, matchingPublications]);

  const featuredPublications = useMemo(() => {
    return filteredPublications.filter((p) => p.featured);
  }, [filteredPublications]);

  const nonFeaturedPublications = useMemo(() => {
    return filteredPublications.filter((p) => !p.featured);
  }, [filteredPublications]);

  return (
    <Section id="publications" title="Publications">
      {filteredPublications.length > 0 ? (
        <div className="flex flex-col gap-6 w-full px-4 md:px-10">
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
      ) : (
        <EmptyState />
      )}
    </Section>
  );
};
