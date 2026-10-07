"use client";

import { memo } from "react";
import { FaArrowUpRightFromSquare, FaGraduationCap } from "react-icons/fa6";

import { Card } from "@heroui/react";

import { Section } from "@/components/section";
import { positions } from "@/lib/data";
import type { TeachingPosition } from "@/types";

export const TeachingSection = memo(() => {
  const teachingPositions = positions.filter(
    (p): p is TeachingPosition =>
      "courses" in p &&
      Array.isArray((p as TeachingPosition).courses) &&
      ((p as TeachingPosition).courses?.length ?? 0) > 0,
  );

  return (
    <Section
      id="teaching"
      title="Teaching"
      icon={<FaGraduationCap className="size-6" />}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teachingPositions.slice(0, 2).map((pos) => (
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
                        {c.link ? (
                          <a
                            href={c.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:text-primary transition-colors hover:underline"
                          >
                            <span>{c.title}</span>
                            {c.code && (
                              <span className="text-xs text-slate-500">
                                ({c.code})
                              </span>
                            )}
                            <FaArrowUpRightFromSquare className="size-3 text-slate-400 group-hover:text-primary inline-block" />
                          </a>
                        ) : (
                          <>
                            {c.title}
                            {c.code && (
                              <span className="text-xs text-slate-500 ml-1">
                                ({c.code})
                              </span>
                            )}
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card.Content>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachingPositions.slice(2).map((pos) => (
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
                        {c.link ? (
                          <a
                            href={c.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:text-primary transition-colors hover:underline"
                          >
                            <span>{c.title}</span>
                            {c.code && (
                              <span className="text-xs text-slate-500">
                                ({c.code})
                              </span>
                            )}
                            <FaArrowUpRightFromSquare className="size-3 text-slate-400 group-hover:text-primary inline-block" />
                          </a>
                        ) : (
                          <>
                            {c.title}
                            {c.code && (
                              <span className="text-xs text-slate-500 ml-1">
                                ({c.code})
                              </span>
                            )}
                          </>
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
    </Section>
  );
});

TeachingSection.displayName = "TeachingSection";
