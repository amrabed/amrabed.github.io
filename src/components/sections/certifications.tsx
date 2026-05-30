"use client";

import { memo } from "react";

import certificationsData from "@/data/certifications";

import { FilterableSection } from "../filterable-section";
import { SectionItemCard } from "../section-item-card";

// ⚡ Optimization: CertificationsSection is memoized to prevent redundant re-renders.
export const CertificationsSection = memo(() => {
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
});

CertificationsSection.displayName = "CertificationsSection";
