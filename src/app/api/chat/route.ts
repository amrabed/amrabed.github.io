import { convertToModelMessages, streamText } from "ai";

// Import Amr's data directly
import certifications from "@/data/certifications";
import degrees from "@/data/degrees";
import positions from "@/data/positions";
import profiles from "@/data/profiles";
import projects from "@/data/projects";
import publications from "@/data/publications";
import skills from "@/data/skills";
import { chatModel } from "@/middleware/genai";
import { ratelimit } from "@/middleware/upstash";

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}

function getConsolidatedContext(): string {
  let context = "Amr Abed's Portfolio Data:\n\n";

  // Profiles
  context += "### Profiles & Professional Links\n";
  profiles.forEach((p) => {
    context += `- ${p.name}: ${p.link}\n`;
  });
  context += "\n";

  // Degrees
  context += "### Education\n";
  degrees.forEach((d) => {
    context += `- Degree: ${d.title} from ${d.university.name} (${d.duration})\n`;
  });
  context += "\n";

  // Certifications
  context += "### Certifications\n";
  certifications.forEach((c) => {
    context += `- ${c.title} (Issued by: ${c.organization.name}, Date: ${c.date})\n`;
  });
  context += "\n";

  // Skills
  context += "### Technical Skills & Tools\n";
  Object.values(skills).forEach((s) => {
    context += `- ${s.name}\n`;
  });
  context += "\n";

  // Work Experience
  context += "### Professional Experience\n";
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

  // Projects
  context += "### Projects\n";
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

  // Publications
  context += "### Publications\n";
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

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

export async function POST(req: Request) {
  const corsHeaders = getCorsHeaders();

  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response(
      JSON.stringify({
        error: "You've reached the daily limit. Come back tomorrow!",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      },
    );
  }

  try {
    const { messages } = await req.json();
    const modelMessages = await convertToModelMessages(messages);
    const lastMessage = modelMessages[modelMessages.length - 1];

    const userQuery =
      typeof lastMessage.content === "string"
        ? lastMessage.content
        : lastMessage.content
            .filter((c) => c.type === "text")
            .map((c) => c.text)
            .join("");

    if (userQuery.length > 10000) {
      return new Response(
        JSON.stringify({
          error: "Message is too long (maximum 10,000 characters).",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    const recentMessages = modelMessages.slice(-6);
    const context = getConsolidatedContext();

    const systemPrompt = `You are Miro, an AI assistant on Amr Abed's personal portfolio website.
Amr is a software engineer and cloud architect based in Kitchener, Ontario, specializing in AWS, AI/ML, and full-stack web development with React and Next.js.

Answer questions about Amr's experience, skills, projects, and professional background using ONLY the context provided below.
If the answer is not in the context, say: 'I don't have that detail handy — feel free to reach out to Amr directly through the contact section.' Never fabricate projects, skills, or experience.
Keep answers to 3–4 sentences, friendly and professional in tone. Always speak in the third person when discussing Amr. Refer to yourself as Miro.

When discussing specific topics, always guide the user to relevant sections of this website using markdown anchor links:
- Use [#experience](#experience) when discussing his roles, organizations, or work history.
- Use [#projects](#projects) when discussing specific projects he has built or worked on.
- Use [#publications](#publications) when referring to his research papers, PhD dissertation, or articles.
- Use [#certifications](#certifications) when discussing his certificates, Scrum credentials, or AWS badges.
- Use [#skills](#skills) when discussing specific programming languages, tools, or architectural skills.
- Use [#education](#education) when discussing his PhD, MS, or BS degrees.
- Use [#about](#about) or contact links when explaining how to reach out to him.

If the context contains a specific link (like a project's github repository or a publication's fulltext URL), always provide that link in markdown (e.g., [GitHub](url) or [Full Text](url)).

Context:
${context}`;

    const result = streamText({
      model: chatModel,
      messages: recentMessages,
      system: systemPrompt,
    });

    return result.toUIMessageStreamResponse({
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred.";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  }
}
