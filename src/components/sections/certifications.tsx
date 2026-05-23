"use client";

import Image from "next/image";

import certificationsData from "@/data/certifications";

import { FilterableSection } from "../filterable-section";

export const CertificationsSection = () => {
  return (
    <FilterableSection
      id="certifications"
      title="Certifications"
      data={certificationsData}
      renderItem={(certificate) => (
        <div className="transition-all duration-700" key={certificate.title}>
          <a href={certificate.link} target="_blank" rel="noopener noreferrer">
            <div className="section-item p-3">
              <Image
                src={certificate.badge}
                alt={`Badge for ${certificate.title}`}
                width={150}
                height={150}
              />
              <p className="md:text-xl text-foreground">{certificate.title}</p>
              <p className="text-primary">{certificate.organization.name}</p>
              <p className="text-secondary">{certificate.date}</p>
            </div>
          </a>
        </div>
      )}
      gridClassName="section-body"
    />
  );
};
