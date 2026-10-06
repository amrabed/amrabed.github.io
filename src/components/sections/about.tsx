"use client";

import { memo } from "react";

import { UserIcon } from "@heroicons/react/24/outline";

import { Section } from "../section";

export const AboutSection = memo(() => {
  return (
    <Section id="about" title="About" icon={<UserIcon className="size-7" />}>
      <div className="max-w-4xl mx-auto text-lg leading-relaxed text-slate-600 dark:text-slate-400 space-y-4">
        <p>
          I am an Engineering Manager, software engineer, and researcher with a
          PhD in Computer Engineering from Virginia Tech and former engineering
          experience at Google. Currently, I lead machine learning engineering
          at Sophi, where I architected and scaled intelligent paywall and
          content curation systems serving hundreds of major publisher websites
          globally.
        </p>
        <p>
          With extensive expertise across cloud architecture, distributed
          systems, and applied artificial intelligence, I hold multiple AWS
          certifications, including AWS Certified Generative AI Developer -
          Professional, Machine Learning - Specialty, and Solutions Architect -
          Associate. My work bridges foundational research and production scale,
          focusing on MLOps, resilient cloud backends, and high-impact AI
          systems.
        </p>
        <p>
          As an educator and researcher, I have published 7 peer-reviewed papers
          in cloud security, container security, and anomaly detection, and have
          taught over 20 university-level computer science and engineering
          courses across four institutions. I am also the creator of production
          mobile applications across iOS and Android with active users
          worldwide, driven by a passion for building elegant, user-centric
          software.
        </p>
      </div>
    </Section>
  );
});

AboutSection.displayName = "AboutSection";
