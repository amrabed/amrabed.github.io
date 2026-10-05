"use client";

import { memo } from "react";
import { FaGraduationCap, FaPersonChalkboard } from "react-icons/fa6";

import { Card } from "@heroui/react";

import { IconLink } from "@/components/icon-link";
import { Section } from "@/components/section";
import { positions, publications } from "@/lib/data";
import type { TeachingPosition } from "@/types";

export const TeachingSection = memo(() => {
  const teachingPositions = positions.filter(
    (p): p is TeachingPosition =>
      "courses" in p &&
      Array.isArray((p as TeachingPosition).courses) &&
      ((p as TeachingPosition).courses?.length ?? 0) > 0,
  );

  const presentations = publications.filter((p) => p.links?.presentation);

  return (
    <Section id="teaching" title="Teaching & Speaking">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-10 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Over a decade of university-level and professional instruction
            across 4 institutions, having designed and taught 20+ undergraduate
            courses in Computer Engineering, Cloud Computing, and Artificial
            Intelligence.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-6">
            <FaGraduationCap className="text-primary" />
            University &amp; Professional Courses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachingPositions.map((pos) => (
              <Card key={pos.id} className="card-container h-full">
                <Card.Header className="p-0 bg-transparent flex flex-col items-start">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                    {pos.title}
                  </h4>
                  <p className="text-sm font-medium text-primary">
                    {pos.organization.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {pos.duration.start} – {pos.duration.end || "Present"}
                  </p>
                </Card.Header>
                <Card.Content className="p-0 mt-3 bg-transparent flex-grow">
                  <ul className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                    {pos.courses?.map((c) => (
                      <li
                        key={c.id || c.title}
                        className="flex items-start gap-1.5"
                      >
                        <span className="text-primary font-bold">•</span>
                        <span>
                          {c.title}
                          {c.code && (
                            <span className="text-xs text-slate-500 ml-1">
                              ({c.code})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>

        {presentations.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-6">
              <FaPersonChalkboard className="text-primary" />
              Public Speaking &amp; Conference Presentations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {presentations.map((pub) => (
                <Card key={pub.id} className="card-container h-full">
                  <Card.Header className="p-0 bg-transparent flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                        {pub.title}
                      </h4>
                      <p className="text-xs text-primary font-medium mt-0.5">
                        {pub.venue} ({pub.year})
                      </p>
                    </div>
                    {pub.links.presentation && (
                      <IconLink
                        href={pub.links.presentation}
                        title="SlideShare Presentation"
                      >
                        <FaPersonChalkboard className="size-5" />
                      </IconLink>
                    )}
                  </Card.Header>
                  <Card.Content className="p-0 mt-2 bg-transparent">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Technical research presentation exploring container
                      anomaly detection and security architectures.
                    </p>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
});

TeachingSection.displayName = "TeachingSection";
