"use client";

import certificationsData from "@/data/certifications";

import { FilterableSection } from "../filterable-section";
import { SectionItemCard } from "../section-item-card";

export const CertificationsSection = () => {
  return (
    <FilterableSection
      id="certifications"
      title="Certifications"
      data={certificationsData}
      renderItem={(certificate) => (
        <SectionItemCard
          key={certificate.title}
          href={certificate.link}
          image={{
            src: certificate.badge,
            alt: `Badge for ${certificate.title}`,
          }}
          title={certificate.title}
          subtitle={certificate.organization.name}
          footer={certificate.date}
        />
      )}
      gridClassName="section-body"
    />
  );
};
