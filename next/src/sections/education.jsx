import Image from "next/image";

import Section from "@/components/Section";
import degrees from "@/data/degrees";

const Education = () => (
  <Section id="education" title="Education">
    {degrees.map((degree) => (
      <div className="transition-all duration-700 gap-6" key={degree.title}>
        <a href={degree.university.url} target="_blank">
          <div className="section-item">
            <Image
              src={degree.university.logo}
              alt={`${degree.university.name} logo`}
              height={150}
              width={150}
            />
            <p className="text-xl md:text-2xl text-secondary-600">
              {degree.title}
            </p>
            <p className="dark:text-primary-dark text-primary">
              {degree.university.name}
            </p>
            <p className="dark:text-zinc-400 text-zinc-600">
              {degree.duration}
            </p>
          </div>
        </a>
      </div>
    ))}
  </Section>
);

export default Education;
