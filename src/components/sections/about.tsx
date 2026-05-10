"use client";

import { Section } from "../section";

export const AboutSection = () => {
  return (
    <Section id="about" title="About">
      <div className="max-w-4xl mx-auto text-lg leading-relaxed text-slate-600 dark:text-slate-400 space-y-4 pb-20">
        <p>
          I am a passionate software engineer, researcher, and educator with a
          focus on cloud computing, machine learning, and mobile development.
          With a background in Computer Engineering and years of experience in
          both academia and industry, I strive to build impactful solutions that
          bridge the gap between complex research and practical application.
        </p>
        <p>
          My work spans across various domains, including developing scalable
          cloud architectures, implementing advanced machine learning models,
          and creating intuitive mobile experiences. I am a strong advocate for
          agile methodologies and continuous learning, always seeking to stay at
          the forefront of technological advancements.
        </p>
        <p>
          When I&apos;m not coding or researching, I enjoy sharing my knowledge
          through teaching and mentoring, helping the next generation of
          engineers grow and succeed in the ever-evolving tech landscape.
        </p>
      </div>
    </Section>
  );
};
