import Section from "@/components/Section";
import { skills } from "@/data/skills";

const Skills = () => (
  <Section id="skills" title="Technical Skills" className="justify-center">
    {skills.map((skill) => (
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

export default Skills;
