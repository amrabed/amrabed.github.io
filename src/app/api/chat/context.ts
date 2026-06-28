import certifications from "@/data/certifications";
import degrees from "@/data/degrees";
import positions from "@/data/positions";
import profiles from "@/data/profiles";
import projects from "@/data/projects";
import publications from "@/data/publications";
import skills from "@/data/skills";

function getProfilesContext(): string {
  let context = "### Profiles & Professional Links\n";
  profiles.forEach((p) => {
    context += `- ${p.name}: ${p.link}\n`;
  });
  context += "\n";
  return context;
}

function getEducationContext(): string {
  let context = "### Education\n";
  degrees.forEach((d) => {
    context += `- Degree: ${d.title} from ${d.university.name} (${d.duration})\n`;
  });
  context += "\n";
  return context;
}

function getCertificationsContext(): string {
  let context = "### Certifications\n";
  certifications.forEach((c) => {
    context += `- ${c.title} (Issued by: ${c.organization.name}, Date: ${c.date})\n`;
  });
  context += "\n";
  return context;
}

function getSkillsContext(): string {
  let context = "### Technical Skills & Tools\n";
  Object.values(skills).forEach((s) => {
    context += `- ${s.name}\n`;
  });
  context += "\n";
  return context;
}

function getPositionsContext(): string {
  let context = "### Professional Experience\n";
  positions.forEach((p) => {
    const org = p.organization;
    const orgStr = org.department
      ? `${org.name} (${org.department})`
      : org.name;
    const endStr = p.duration.end || "Present";
    context += `- Role: ${p.title} at ${orgStr}\n`;
    context += `  Duration: ${p.duration.start} - ${endStr}\n`;

    if ("project" in p && p.project) {
      context += `  Project: ${p.project}\n`;
    }

    if ("sponsors" in p && p.sponsors && p.sponsors.length > 0) {
      context += `  Sponsors: ${p.sponsors.map((s) => s.name).join(", ")}\n`;
    }

    if (p.tasks && p.tasks.length > 0) {
      context += `  Responsibilities & Achievements:\n`;
      p.tasks.forEach((t) => {
        context += `    * ${t}\n`;
      });
    }
    if (p.skills && p.skills.length > 0) {
      context += `  Key skills used: ${p.skills.join(", ")}\n`;
    }

    if ("courses" in p && p.courses && p.courses.length > 0) {
      context += `  Courses taught:\n`;
      p.courses.forEach((c) => {
        const codeStr = c.code ? ` (${c.code})` : "";
        const descStr = c.description ? `: ${c.description}` : "";
        context += `    * ${c.title}${codeStr}${descStr}\n`;
      });
    }
    context += "\n";
  });
  return context;
}

function getProjectsContext(): string {
  let context = "### Projects\n";
  projects.forEach((p) => {
    context += `- Project Name: ${p.name}\n`;
    context += `  Date: ${p.date}\n`;
    context += `  Description: ${p.description}\n`;
    if (p.details) {
      context += `  Details: ${p.details}\n`;
    }
    if (p.tools && p.tools.length > 0) {
      context += `  Tools: ${p.tools.join(", ")}\n`;
    }
    if (p.roles && p.roles.length > 0) {
      context += `  Amr's Role: ${p.roles.join(", ")}\n`;
    }
    if (p.links) {
      context += `  Links: ${JSON.stringify(p.links)}\n`;
    }
    context += "\n";
  });
  return context;
}

function getPublicationsContext(): string {
  let context = "### Publications\n";
  publications.forEach((p) => {
    context += `- Title: ${p.title}\n`;
    context += `  Authors: ${p.authors.join(", ")}\n`;
    context += `  Venue: ${p.venue} (${p.year})\n`;
    if (p.links && Object.keys(p.links).length > 0) {
      context += `  Links: ${JSON.stringify(p.links)}\n`;
    }
    context += "\n";
  });
  return context;
}

export default function getConsolidatedContext(): string {
  return [
    "Amr Abed's Portfolio Data:\n\n",
    getProfilesContext(),
    getEducationContext(),
    getCertificationsContext(),
    getSkillsContext(),
    getPositionsContext(),
    getProjectsContext(),
    getPublicationsContext(),
  ].join("");
}
