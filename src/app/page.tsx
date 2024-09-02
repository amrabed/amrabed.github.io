import dynamic from "next/dynamic";
import Image from "next/image";

import Section from "@/components/Section";
import { MainHeader } from "@/components/header";
import certificates from "@/data/certifications";
import degrees from "@/data/degrees";
import skills from "@/data/skills";
import type { Certification, Degree, Skill } from "@/types";
import "@/types";

const Intro = dynamic(() => import("@/components/intro"));
const SocialMedia = dynamic(() => import("@/components/social"));

const Skills = () => (
  <Section id="skills" title="Technical Skills">
    {Object.values(skills).map((skill: Skill) => (
      <div
        className="transition-all duration-700 section-item md:py-5 w-[120px] md:w-[150px]"
        key={skill.name}
      >
        <p className="md:text-4xl text-2xl">{skill.icon}</p>
        <p>{skill.name}</p>
      </div>
    ))}
  </Section>
);

const Certifications = () => (
  <Section id="certifications" title="Certifications">
    {certificates.map((certificate: Certification) => (
      <div className="transition-all duration-700" key={certificate.title}>
        <a href={certificate.link} target="_blank">
          <div className="section-item p-3 md:p-1">
            <Image
              src={certificate.badge}
              alt={`Badge for ${certificate.title}`}
              width={150}
              height={150}
            />
            <p className="text-nowrap md:text-xl">{certificate.title}</p>
            <p className="text-primary">{certificate.organization.name}</p>
            <p className="text-secondary">{certificate.date}</p>
          </div>
        </a>
      </div>
    ))}
  </Section>
);

const Degrees = () => (
  <Section id="degrees" title="Education">
    {degrees.map((degree: Degree) => (
      <div className="transition-all duration-700 gap-6" key={degree.title}>
        <a href={degree.university.url} target="_blank">
          <div className="section-item">
            <Image
              src={degree.university.logo ?? ""}
              alt={`${degree.university.name} logo`}
              height={150}
              width={150}
            />
            <p className="text-xl md:text-2xl text-foreground">
              {degree.title}
            </p>
            <p className="dark:text-primary-dark text-primary">
              {degree.university.name}
            </p>
            <p className="text-secondary">{degree.duration}</p>
          </div>
        </a>
      </div>
    ))}
  </Section>
);

const Home = () => (
  <>
    <MainHeader />
    <Intro />
    <Skills />
    <Certifications />
    <Degrees />
    <SocialMedia />
  </>
);

export default Home;
