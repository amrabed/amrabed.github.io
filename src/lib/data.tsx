import type { ReactNode } from "react";
import { BiBrain } from "react-icons/bi";
import { CiGlobe } from "react-icons/ci";
import { DiSwift } from "react-icons/di";
import { FaAndroid, FaAws, FaDocker, FaJava, FaPython } from "react-icons/fa";
import {
  FaGithub,
  FaGoodreadsG,
  FaGoogleScholar,
  FaLinkedinIn,
  FaMedium,
  FaStackOverflow,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import {
  SiCplusplus,
  SiFirebase,
  SiFlutter,
  SiGooglecloud,
  SiKotlin,
  SiKubernetes,
  SiTensorflow,
  SiScikitlearn,
  SiJavascript,
  SiTypescript,
  SiGnubash,
  SiMlflow,
} from "react-icons/si";
import { TbBrandStackshare } from "react-icons/tb";
import colors from "tailwindcss/colors";

import {
  CloudIcon,
  DevicePhoneMobileIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import resumeJson from "@/data/resume.json";
import type {
  Area,
  Certification,
  Color,
  Degree,
  AnyPosition,
  Profile,
  Project,
  Publication,
  Role,
  Skill,
  ResumeData,
} from "@/types";

export const resume = resumeJson as unknown as ResumeData;
export const basics = resume.basics;

// Theme color and icon mapping layer decoupling JSX from data
const areaColors: Record<string, Color> = {
  cloud: colors.indigo,
  "machine learning": colors.amber,
  programming: colors.cyan,
  mobile: "green",
  devops: colors.purple,
  database: "yellow",
  web: colors.blue,
  security: "orange",
};

const areaIcons: Record<string, ReactNode> = {
  cloud: <CloudIcon />,
  "machine learning": <BiBrain className="text-2xl" />,
  programming: <CodeBracketIcon />,
  mobile: <DevicePhoneMobileIcon />,
  devops: <Cog6ToothIcon />,
  database: <CircleStackIcon />,
  web: <CiGlobe size="xl" />,
  security: <ShieldCheckIcon />,
};

const skillColors: Record<string, Color> = {
  python: "#3776AB",
  tensorflow: "#FF6F00",
  "scikit-learn": "#F7931E",
  mlflow: "#0194E2",
  aws: "#FF9900",
  "google cloud": "#4285F4",
  docker: "#2496ED",
  kubernetes: "#326CE5",
  firebase: "#FFC107",
  android: "#A4C639",
  kotlin: "#7F52A2",
  java: "#B00040",
  "c++": "#00599C",
  swift: "#FF9900",
  flutter: "#02569B",
  javascript: "#F7DF1E",
  typescript: "#3178C6",
  bash: "#4EAA25",
};

const skillIcons: Record<string, ReactNode> = {
  python: <FaPython />,
  tensorflow: <SiTensorflow />,
  "scikit-learn": <SiScikitlearn />,
  mlflow: <SiMlflow />,
  aws: <FaAws />,
  "google cloud": <SiGooglecloud />,
  docker: <FaDocker />,
  kubernetes: <SiKubernetes />,
  firebase: <SiFirebase />,
  android: <FaAndroid />,
  kotlin: <SiKotlin />,
  java: <FaJava />,
  "c++": <SiCplusplus />,
  swift: <DiSwift />,
  flutter: <SiFlutter />,
  javascript: <SiJavascript />,
  typescript: <SiTypescript />,
  bash: <SiGnubash />,
};

const roleColors: Record<string, Color> = {
  engineer: "blue",
  researcher: "orange",
  instructor: "green",
};

const profileIcons: Record<string, ReactNode> = {
  LinkedIn: <FaLinkedinIn />,
  GitHub: <FaGithub />,
  "Google Scholar": <FaGoogleScholar />,
  "Stack Overflow": <FaStackOverflow />,
  Goodreads: <FaGoodreadsG />,
  StackShare: <TbBrandStackshare />,
  Medium: <FaMedium />,
  YouTube: <FaYoutube />,
  X: <FaXTwitter />,
};

export const areas: Record<string, Area> = Object.fromEntries(
  Object.entries(resume.areas).map(([key, value]) => [
    key,
    {
      name: value.name,
      icon: areaIcons[key] ?? null,
      color: areaColors[key] ?? value.color,
    },
  ]),
);

export const skills: Record<string, Skill> = Object.fromEntries(
  Object.entries(resume.skills).map(([key, value]) => [
    key,
    {
      name: value.name,
      icon: skillIcons[key] ?? null,
      color: skillColors[key] ?? value.color,
    },
  ]),
);

export const roles: Record<string, Role> = Object.fromEntries(
  Object.entries(resume.roles).map(([key, value]) => [
    key,
    {
      name: value.name,
      color: roleColors[key] ?? value.color,
    },
  ]),
);

export const profiles: Profile[] = resume.basics.profiles.map((p) => ({
  name: p.name,
  link: p.link,
  icon: profileIcons[p.name] ?? null,
}));

export const areaSkills: Record<string, string[]> = resume.areaSkills;
export const positions: AnyPosition[] = resume.positions;
export const degrees: Degree[] = resume.degrees;
export const certifications: Certification[] = resume.certifications;
export const projects: Project[] = resume.projects;
export const publications: Publication[] = resume.publications;
