"use client";

import Image from "next/image";

import { useMemo } from "react";

import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import certificationsData from "@/data/certifications";
import { filterByQuery, filterByArea } from "@/filter";

import { EmptyState } from "../empty-state";
import { Section } from "../section";

export const CertificationsSection = () => {
  const { debouncedQuery } = useSearch();
  const { selected } = useFilter();

  const filteredCerts = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();
    const selectedAreas = new Set(selected["areas"] || []);
    const selectedSkills = new Set(selected["skills"] || []);

    return certificationsData.filter((cert) => {
      const matchesQuery = filterByQuery(cert, lowercaseQuery);
      const matchesArea = filterByArea(cert.areas || [], selectedAreas);
      const matchesSkill =
        selectedSkills.size === 0 ||
        (cert.skills || []).some((s) => selectedSkills.has(s.toLowerCase()));
      return matchesQuery && matchesArea && matchesSkill;
    });
  }, [debouncedQuery, selected]);

  return (
    <Section id="certifications" title="Certifications">
      <div className="section-body">
        {filteredCerts.length > 0 ? (
          filteredCerts.map((certificate) => (
            <div
              className="transition-all duration-700"
              key={certificate.title}
            >
              <a
                href={certificate.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="section-item p-3">
                  <Image
                    src={certificate.badge}
                    alt={`Badge for ${certificate.title}`}
                    width={150}
                    height={150}
                  />
                  <p className="md:text-xl text-foreground">
                    {certificate.title}
                  </p>
                  <p className="text-primary">
                    {certificate.organization.name}
                  </p>
                  <p className="text-secondary">{certificate.date}</p>
                </div>
              </a>
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </Section>
  );
};
