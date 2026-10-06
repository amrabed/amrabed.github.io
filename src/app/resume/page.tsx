import type { Metadata } from "next";
import Link from "next/link";

import { FaGithub, FaGoogleScholar, FaLinkedinIn } from "react-icons/fa6";

import { GlobeAltIcon } from "@heroicons/react/24/outline";

import {
  basics,
  positions,
  degrees,
  certifications,
  publications,
  projects,
  areaSkills,
  skills as skillsMap,
} from "@/lib/data";

import PrintButton from "./print-button";

export const metadata: Metadata = {
  title: "Amr Abed - Resume",
  description:
    "Professional resume of Amr Abed — Engineering Manager, PhD in Computer Engineering, AWS Certified, Cloud & AI Architect.",
};

const skillDomains: { key: string; label: string }[] = [
  { key: "cloud", label: "Cloud" },
  { key: "machine learning", label: "Machine Learning" },
  { key: "programming", label: "Programming" },
  { key: "devops", label: "DevOps" },
  { key: "mobile", label: "Mobile" },
  { key: "web", label: "Web" },
];

export default function ResumePage() {
  const linkedIn = basics.profiles.find(
    (p) => p.name.toLowerCase() === "linkedin",
  );
  const github = basics.profiles.find((p) => p.name.toLowerCase() === "github");
  const scholar = basics.profiles.find((p) =>
    p.name.toLowerCase().includes("scholar"),
  );

  const featuredProjects = projects.filter((p) => p.featured);
  const keyProjects =
    featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 5);

  const featuredPublications = publications.filter((p) => p.featured);
  const keyPublications =
    featuredPublications.length > 0
      ? featuredPublications
      : publications.slice(0, 3);

  const locationStr = [
    basics.location.city,
    basics.location.region,
    basics.location.countryCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white print:text-black">
      <div className="max-w-4xl mx-auto space-y-8 print:space-y-6">
        {/* Screen-only Action Toolbar */}
        <aside
          aria-label="Resume actions"
          className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm print:hidden"
        >
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
          >
            ← Back to Portfolio
          </Link>
          <div className="flex items-center gap-3">
            {basics.resumeUrl && (
              <a
                href={basics.resumeUrl}
                download
                className="inline-flex items-center justify-center text-sm font-semibold px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 shadow-sm transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Download PDF
              </a>
            )}
            <PrintButton />
          </div>
        </aside>

        {/* ATS-friendly Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 pb-6 print:pb-4 print:border-black">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white print:text-black">
                {basics.name}
              </h1>
              <p className="text-lg font-medium text-primary dark:text-indigo-400 print:text-black mt-1">
                {basics.label}
              </p>
            </div>
            {locationStr && (
              <p className="text-sm text-slate-600 dark:text-slate-400 print:text-black">
                {locationStr}
              </p>
            )}
          </div>

          {basics.tagline && (
            <p className="text-sm italic text-slate-500 dark:text-slate-400 print:text-black mt-2">
              {basics.tagline}
            </p>
          )}

          {/* Contact & Profiles */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 dark:text-slate-300 print:text-black mt-4">
            {basics.email && (
              <a
                href={`mailto:${basics.email}`}
                className="hover:text-primary transition-colors hover:underline print:no-underline"
              >
                {basics.email}
              </a>
            )}
            {basics.url && (
              <a
                href={basics.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors hover:underline print:no-underline"
              >
                <GlobeAltIcon className="size-4 print:hidden" />
                <span>{basics.url.replace(/^https?:\/\//, "")}</span>
              </a>
            )}
            {linkedIn && (
              <a
                href={linkedIn.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors hover:underline print:no-underline"
              >
                <FaLinkedinIn className="size-4 print:hidden" />
                <span>LinkedIn</span>
              </a>
            )}
            {github && (
              <a
                href={github.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors hover:underline print:no-underline"
              >
                <FaGithub className="size-4 print:hidden" />
                <span>GitHub</span>
              </a>
            )}
            {scholar && (
              <a
                href={scholar.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors hover:underline print:no-underline"
              >
                <FaGoogleScholar className="size-4 print:hidden" />
                <span>Google Scholar</span>
              </a>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {basics.summary && (
          <section
            aria-labelledby="summary-heading"
            className="space-y-2 print:break-inside-avoid"
          >
            <h2
              id="summary-heading"
              className="text-xl font-bold uppercase tracking-wide border-b border-slate-200 dark:border-slate-800 pb-1 text-slate-900 dark:text-slate-100 print:text-black print:border-black"
            >
              Summary
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 print:text-black">
              {basics.summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        <section aria-labelledby="experience-heading" className="space-y-4">
          <h2
            id="experience-heading"
            className="text-xl font-bold uppercase tracking-wide border-b border-slate-200 dark:border-slate-800 pb-1 text-slate-900 dark:text-slate-100 print:text-black print:border-black"
          >
            Experience
          </h2>
          <div className="space-y-6 print:space-y-4">
            {positions.map((pos) => (
              <article
                key={pos.id}
                className="space-y-2 print:break-inside-avoid"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 print:text-black">
                    {pos.title} —{" "}
                    {pos.organization.url ? (
                      <a
                        href={pos.organization.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:text-primary print:no-underline"
                      >
                        {pos.organization.name}
                      </a>
                    ) : (
                      <span>{pos.organization.name}</span>
                    )}
                  </h3>
                  <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 print:text-black whitespace-nowrap">
                    {pos.duration.start} – {pos.duration.end}
                  </span>
                </div>

                {pos.tasks && pos.tasks.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 print:text-black">
                    {pos.tasks.map((task) => (
                      <li key={task} className="leading-snug">
                        {task}
                      </li>
                    ))}
                  </ul>
                )}

                {pos.skills && pos.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {pos.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 print:bg-transparent print:border print:border-black print:text-black"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section aria-labelledby="education-heading" className="space-y-4">
          <h2
            id="education-heading"
            className="text-xl font-bold uppercase tracking-wide border-b border-slate-200 dark:border-slate-800 pb-1 text-slate-900 dark:text-slate-100 print:text-black print:border-black"
          >
            Education
          </h2>
          <div className="space-y-4 print:space-y-3">
            {degrees.map((deg) => (
              <div
                key={deg.title}
                className="space-y-1 print:break-inside-avoid"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 print:text-black">
                    {deg.title} —{" "}
                    {deg.university.url ? (
                      <a
                        href={deg.university.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline hover:text-primary print:no-underline"
                      >
                        {deg.university.name}
                      </a>
                    ) : (
                      <span>{deg.university.name}</span>
                    )}
                  </h3>
                  <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 print:text-black whitespace-nowrap">
                    {deg.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Competencies */}
        <section
          aria-labelledby="skills-heading"
          className="space-y-4 print:break-inside-avoid"
        >
          <h2
            id="skills-heading"
            className="text-xl font-bold uppercase tracking-wide border-b border-slate-200 dark:border-slate-800 pb-1 text-slate-900 dark:text-slate-100 print:text-black print:border-black"
          >
            Skills & Competencies
          </h2>
          <div className="space-y-2.5 text-sm">
            {skillDomains.map(({ key, label }) => {
              const domainSkillKeys = areaSkills[key] || [];
              const domainSkillNames = domainSkillKeys
                .map((sk) => skillsMap[sk]?.name ?? sk)
                .filter(Boolean);

              if (domainSkillNames.length === 0) return null;

              return (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 print:break-inside-avoid"
                >
                  <span className="font-semibold text-slate-900 dark:text-slate-100 print:text-black min-w-36">
                    {label}:
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 print:text-black">
                    {domainSkillNames.join(", ")}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Certifications Section */}
        <section aria-labelledby="certifications-heading" className="space-y-4">
          <h2
            id="certifications-heading"
            className="text-xl font-bold uppercase tracking-wide border-b border-slate-200 dark:border-slate-800 pb-1 text-slate-900 dark:text-slate-100 print:text-black print:border-black"
          >
            Certifications
          </h2>
          <div className="space-y-3 print:space-y-2">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 print:break-inside-avoid"
              >
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 print:text-black">
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-primary print:no-underline"
                    >
                      {cert.title}
                    </a>
                  ) : (
                    <span>{cert.title}</span>
                  )}
                  <span className="font-normal text-slate-600 dark:text-slate-400 print:text-black">
                    {" "}
                    — {cert.organization.name}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 print:text-black whitespace-nowrap">
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Publications & Projects Section */}
        <section aria-labelledby="pubs-projects-heading" className="space-y-6">
          <h2
            id="pubs-projects-heading"
            className="text-xl font-bold uppercase tracking-wide border-b border-slate-200 dark:border-slate-800 pb-1 text-slate-900 dark:text-slate-100 print:text-black print:border-black"
          >
            Publications & Projects
          </h2>

          {/* Key Publications */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 print:text-black">
              Selected Publications
            </h3>
            <div className="space-y-3 print:space-y-2">
              {keyPublications.map((pub) => {
                const pubLink = pub.links.doi
                  ? `https://doi.org/${pub.links.doi}`
                  : pub.links.fulltext;
                return (
                  <div
                    key={pub.id}
                    className="text-sm space-y-0.5 print:break-inside-avoid"
                  >
                    <p className="font-medium text-slate-900 dark:text-slate-100 print:text-black">
                      {pubLink ? (
                        <a
                          href={pubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline hover:text-primary print:no-underline"
                        >
                          "{pub.title}"
                        </a>
                      ) : (
                        `"${pub.title}"`
                      )}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 print:text-black">
                      {pub.authors.join(", ")} · <em>{pub.venue}</em> (
                      {pub.year})
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 print:text-black">
              Featured Projects
            </h3>
            <div className="space-y-3 print:space-y-2">
              {keyProjects.map((project) => {
                const projectLink =
                  project.links.homepage ||
                  (project.links.github
                    ? `https://github.com/${project.links.github}`
                    : undefined);
                return (
                  <div
                    key={project.id}
                    className="text-sm space-y-0.5 print:break-inside-avoid"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                      <span className="font-semibold text-slate-900 dark:text-slate-100 print:text-black">
                        {projectLink ? (
                          <a
                            href={projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-primary print:no-underline"
                          >
                            {project.name}
                          </a>
                        ) : (
                          project.name
                        )}
                      </span>
                      {project.date && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 print:text-black">
                          {project.date}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 print:text-black">
                      {project.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
