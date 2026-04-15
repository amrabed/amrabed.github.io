import { ReactNode } from "react";
import colors from "tailwindcss/colors";

export type Color = string | (typeof colors)[keyof typeof colors];

export interface Icon {
  icon: ReactNode;
}

export interface Skill extends Icon {
  name: string;
  color: Color;
}

export interface Area extends Icon {
  name: string;
  icon: ReactNode;
  color: Color;
}

export interface Role {
  name: string;
  color: Color;
}

export interface Profile extends Icon {
  name: string;
  link: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  app?: string;
  publication?: string;
  presentation?: string;
  homepage?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  details?: string;
  date: string;
  roles: string[];
  tags: string[];
  tools: string[];
  links: ProjectLinks;
  status?: string;
  group: number;
}

export interface Organization {
  name: string;
  url: string;
  logo?: string;
  department?: string;
}

export interface Certification {
  title: string;
  organization: Organization;
  badge: string;
  link: string;
  date: string;
}

export interface Duration {
  start: string;
  end: string;
}

export interface Degree {
  title: string;
  university: Organization;
  duration: string;
}

export interface Position {
  id: string;
  title: string;
  organization: Organization;
  duration: Duration;
  tasks: string[];
  skills: string[];
  tags: string[];
  roles: string[];
}

export interface Course {
  id?: string;
  title: string;
  description?: string;
  code?: string;
  link?: string;
  semester?: string;
}

export interface TeachingPosition extends Position {
  courses?: Course[];
}

export interface ResearchPosition extends Position {
  project?: string;
  sponsors?: Organization[];
}

export type AnyPosition = TeachingPosition | ResearchPosition | Position;
