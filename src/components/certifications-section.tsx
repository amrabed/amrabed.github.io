"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Card, Chip } from "@heroui/react";
import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import certificationsData from "@/data/certifications";
import { filterByQuery, filterByArea } from "@/filter";
import { Section } from "./section";

export const CertificationsSection = () => {
  const { debouncedQuery } = useSearch();
  const { selectedAreas } = useFilter();

  const filteredCerts = useMemo(() => {
    const lowercaseQuery = debouncedQuery.toLowerCase();
    return certificationsData.filter((cert) => {
      const matchesQuery = filterByQuery(cert, lowercaseQuery);
      const matchesArea = filterByArea(cert.areas || [], selectedAreas);
      return matchesQuery && matchesArea;
    });
  }, [debouncedQuery, selectedAreas]);

  return (
    <Section id="certifications" title="Certifications" count={filteredCerts.length}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {filteredCerts.map((cert) => (
          <a
            key={cert.title}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
          >
            <Card className="h-full hover:border-primary border-1 transition-all duration-300 bg-white dark:bg-slate-900 p-6 flex flex-col items-center text-center gap-4">
              <div className="relative size-32">
                <Image
                  src={cert.badge}
                  alt={`Badge for ${cert.title}`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-foreground leading-tight">{cert.title}</h3>
                <p className="text-primary font-medium">{cert.organization.name}</p>
                <p className="text-secondary text-sm">{cert.date}</p>
              </div>
              <div className="flex flex-wrap gap-1 justify-center mt-auto pt-4">
                {cert.areas?.map(area => (
                  <Chip key={area} size="sm" variant="soft" color="accent" className="capitalize text-[10px]">
                    {area}
                  </Chip>
                ))}
              </div>
            </Card>
          </a>
        ))}
      </div>
      {filteredCerts.length === 0 && (
        <p className="text-center text-slate-500 w-full py-8">No certifications match your filters.</p>
      )}
    </Section>
  );
};
