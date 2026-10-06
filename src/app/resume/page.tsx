import type { Metadata } from "next";
import Link from "next/link";

import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

import { GlobeAltIcon, MapPinIcon } from "@heroicons/react/24/outline";

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
  { key: "programming", label: "Programming" },
  { key: "machine learning", label: "AI & ML" },
  { key: "devops", label: "MLOps & DevOps" },
  { key: "cloud", label: "Cloud" },
];

export default function ResumePage() {
  const linkedIn = basics.profiles.find(
    (p) => p.name.toLowerCase() === "linkedin",
  );
  const github = basics.profiles.find((p) => p.name.toLowerCase() === "github");

  const locationStr = [basics.location.city, basics.location.region]
    .filter(Boolean)
    .join(", ");

  const featuredProjects = projects.filter((p) => p.featured);
  const selectProjects =
    featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4);

  const featuredPublications = publications.filter((p) => p.featured);
  const selectPublications =
    featuredPublications.length > 0
      ? featuredPublications
      : publications.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-6 sm:py-10 px-3 sm:px-6 lg:px-8 print:p-0 print:bg-white print:text-black font-sans">
      <div className="max-w-5xl mx-auto space-y-6 print:space-y-0">
        {/* Screen-only Action Toolbar */}
        <aside
          aria-label="Resume actions"
          className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-sm print:hidden"
        >
          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
          >
            ← Back to Portfolio
          </Link>
          <div className="flex items-center gap-2.5">
            {basics.resumeUrl && (
              <a
                href={basics.resumeUrl}
                download
                className="inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-lg bg-primary text-white hover:opacity-90 shadow-sm transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Download PDF
              </a>
            )}
            <PrintButton />
          </div>
        </aside>

        {/* Paper Document Container matching amrabed/resume style */}
        <main className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-10 shadow-md print:border-none print:shadow-none print:p-0 print:bg-white print:rounded-none">
          {/* Header - Centered title matching \namesection{Amr Abed}{...} */}
          <header className="text-center pb-6 border-b border-slate-300 dark:border-slate-700 print:border-slate-400 print:pb-4">
            <h1 className="text-3xl sm:text-5xl font-light tracking-wide text-slate-900 dark:text-white print:text-black">
              {basics.name}
            </h1>

            {basics.label && (
              <p className="text-sm sm:text-base font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400 print:text-slate-700 mt-1.5">
                {basics.label}
              </p>
            )}

            {/* Contact row with icons matching LaTeX faGlobe, faLinkedin, faGithub, etc. */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 print:text-black mt-3">
              {basics.url && (
                <a
                  href={basics.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors hover:underline print:no-underline"
                >
                  <GlobeAltIcon className="size-3.5 print:hidden" />
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
                  <FaLinkedinIn className="size-3.5 print:hidden" />
                  <span>linkedin.com/in/amrabed</span>
                </a>
              )}
              {github && (
                <a
                  href={github.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors hover:underline print:no-underline"
                >
                  <FaGithub className="size-3.5 print:hidden" />
                  <span>github.com/amrabed</span>
                </a>
              )}
              {basics.email && (
                <a
                  href={`mailto:${basics.email}`}
                  className="hover:text-primary transition-colors hover:underline print:no-underline"
                >
                  {basics.email}
                </a>
              )}
              {locationStr && (
                <span className="inline-flex items-center gap-1">
                  <MapPinIcon className="size-3.5 print:hidden" />
                  <span>{locationStr}</span>
                </span>
              )}
            </div>

            {basics.tagline && (
              <p className="text-xs italic text-slate-500 dark:text-slate-400 print:text-black mt-2">
                {basics.tagline}
              </p>
            )}
          </header>

          {/* Two-Column Resume Body matching minipage 0.60 / 0.33 in LaTeX */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 print:grid-cols-12 print:gap-6 print:pt-4">
            {/* Left Column (60% width) - Summary & Experience */}
            <div className="md:col-span-7 print:col-span-7 space-y-6 print:space-y-5">
              {/* Summary Section */}
              {basics.summary && (
                <section
                  aria-labelledby="summary-heading"
                  className="space-y-1.5 print:break-inside-avoid"
                >
                  <h2
                    id="summary-heading"
                    className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-black border-b border-slate-200 dark:border-slate-800 print:border-black pb-0.5"
                  >
                    Summary
                  </h2>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 print:text-black text-justify">
                    {basics.summary}
                  </p>
                </section>
              )}

              {/* Experience Section */}
              <section
                aria-labelledby="experience-heading"
                className="space-y-4"
              >
                <h2
                  id="experience-heading"
                  className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-black border-b border-slate-200 dark:border-slate-800 print:border-black pb-0.5"
                >
                  Experience
                </h2>
                <div className="space-y-4 print:space-y-3.5">
                  {positions.map((pos) => (
                    <article
                      key={pos.id}
                      className="space-y-1 print:break-inside-avoid"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-slate-900 dark:text-white print:text-black">
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
                            pos.organization.name
                          )}
                          <span className="font-normal normal-case text-slate-600 dark:text-slate-400 print:text-black">
                            {" "}
                            | {pos.title}
                          </span>
                        </h3>
                        <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 print:text-black whitespace-nowrap">
                          {pos.duration.start} – {pos.duration.end}
                        </span>
                      </div>

                      {pos.tasks && pos.tasks.length > 0 && (
                        <ul className="list-disc pl-4 space-y-0.5 text-xs text-slate-700 dark:text-slate-300 print:text-black">
                          {pos.tasks.map((task) => (
                            <li key={task} className="leading-snug">
                              {task}
                            </li>
                          ))}
                        </ul>
                      )}

                      {pos.skills && pos.skills.length > 0 && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-black pt-0.5">
                          <span className="font-medium text-slate-600 dark:text-slate-300 print:text-black">
                            Technologies:
                          </span>{" "}
                          {pos.skills.join(" • ")}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </section>

              {/* Select Projects */}
              <section
                aria-labelledby="projects-heading"
                className="space-y-3 print:break-inside-avoid"
              >
                <h2
                  id="projects-heading"
                  className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-black border-b border-slate-200 dark:border-slate-800 print:border-black pb-0.5"
                >
                  Select Projects
                </h2>
                <div className="space-y-2.5 print:space-y-2">
                  {selectProjects.map((project) => {
                    const projectLink =
                      project.links.homepage ||
                      (project.links.github
                        ? `https://github.com/${project.links.github}`
                        : undefined);
                    return (
                      <div
                        key={project.id}
                        className="space-y-0.5 print:break-inside-avoid text-xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                          <span className="font-bold text-slate-900 dark:text-white print:text-black">
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
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 print:text-black">
                              {project.date}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 print:text-black leading-snug">
                          {project.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Publications Section */}
              <section
                aria-labelledby="publications-heading"
                className="space-y-3 print:break-inside-avoid"
              >
                <h2
                  id="publications-heading"
                  className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-black border-b border-slate-200 dark:border-slate-800 print:border-black pb-0.5"
                >
                  Publications
                </h2>
                <div className="space-y-2 print:space-y-1.5 text-xs">
                  {selectPublications.map((pub) => {
                    const pubLink = pub.links.doi
                      ? `https://doi.org/${pub.links.doi}`
                      : pub.links.fulltext;
                    return (
                      <div
                        key={pub.id}
                        className="space-y-0.5 print:break-inside-avoid"
                      >
                        <p className="font-semibold text-slate-900 dark:text-white print:text-black leading-snug">
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
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 print:text-black">
                          {pub.authors.join(", ")} · <em>{pub.venue}</em> (
                          {pub.year})
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right Column (40% width) - Skills, Education, Certifications */}
            <div className="md:col-span-5 print:col-span-5 space-y-6 print:space-y-5">
              {/* Skills Section matching \subsection{...} item \textbullet{} item */}
              <section
                aria-labelledby="skills-heading"
                className="space-y-3 print:break-inside-avoid"
              >
                <h2
                  id="skills-heading"
                  className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-black border-b border-slate-200 dark:border-slate-800 print:border-black pb-0.5"
                >
                  Skills
                </h2>
                <div className="space-y-3 text-xs">
                  {skillDomains.map(({ key, label }) => {
                    const domainSkillKeys = areaSkills[key] || [];
                    const domainSkillNames = domainSkillKeys
                      .map((sk) => skillsMap[sk]?.name ?? sk)
                      .filter(Boolean);

                    if (domainSkillNames.length === 0) return null;

                    return (
                      <div key={key} className="space-y-0.5">
                        <h3 className="font-bold uppercase tracking-tight text-slate-900 dark:text-slate-100 print:text-black">
                          {label}
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 print:text-black leading-relaxed">
                          {domainSkillNames.join(" • ")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Education Section matching \subsection{University} \descript{Degree} \location{Dates} */}
              <section
                aria-labelledby="education-heading"
                className="space-y-3 print:break-inside-avoid"
              >
                <h2
                  id="education-heading"
                  className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-black border-b border-slate-200 dark:border-slate-800 print:border-black pb-0.5"
                >
                  Education
                </h2>
                <div className="space-y-3 print:space-y-2.5 text-xs">
                  {degrees.map((deg) => (
                    <div
                      key={deg.title}
                      className="space-y-0.5 print:break-inside-avoid"
                    >
                      <h3 className="font-bold text-slate-900 dark:text-white print:text-black">
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
                          deg.university.name
                        )}
                      </h3>
                      <p className="italic text-slate-700 dark:text-slate-300 print:text-black">
                        {deg.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-black">
                        {deg.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications Section */}
              <section
                aria-labelledby="certifications-heading"
                className="space-y-3 print:break-inside-avoid"
              >
                <h2
                  id="certifications-heading"
                  className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-black border-b border-slate-200 dark:border-slate-800 print:border-black pb-0.5"
                >
                  Certifications
                </h2>
                <div className="space-y-2.5 print:space-y-2 text-xs">
                  {certifications.map((cert) => (
                    <div
                      key={cert.title}
                      className="space-y-0.5 print:break-inside-avoid"
                    >
                      <h3 className="font-medium text-slate-900 dark:text-white print:text-black">
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
                          cert.title
                        )}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 print:text-black">
                        {cert.organization.name} · {cert.date}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Info / Languages matching \section{Languages} in amrabed/resume */}
              <section
                aria-labelledby="languages-heading"
                className="space-y-2 print:break-inside-avoid"
              >
                <h2
                  id="languages-heading"
                  className="text-base sm:text-lg font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 print:text-black border-b border-slate-200 dark:border-slate-800 print:border-black pb-0.5"
                >
                  Languages
                </h2>
                <p className="text-xs text-slate-700 dark:text-slate-300 print:text-black">
                  Arabic • English • French
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
