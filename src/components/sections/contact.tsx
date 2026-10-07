"use client";

import { memo } from "react";
import { FaFileLines, FaLinkedin } from "react-icons/fa6";

import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

import { Section } from "@/components/section";
import { basics, profiles } from "@/lib/data";

export const ContactSection = memo(() => {
  const linkedIn = profiles.find((p) => p.name.toLowerCase() === "linkedin");
  const connectUrl = linkedIn
    ? linkedIn.link
    : "https://www.linkedin.com/in/amrabed";

  return (
    <Section
      id="contact"
      title="Get In Touch"
      icon={<ChatBubbleLeftRightIcon className="size-7" />}
    >
      <div className="w-full max-w-4xl mx-auto px-4 text-center space-y-8">
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Have an interesting engineering problem, cloud/AI project, speaking
          opportunity, or just want to connect? Feel free to reach out via
          LinkedIn or connect across any of my social profiles.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={connectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:opacity-90 transition-opacity"
            aria-label="Connect with Amr Abed on LinkedIn"
          >
            <FaLinkedin className="size-5" />
            <span>Connect on LinkedIn</span>
          </a>

          {basics.resumeUrl && (
            <a
              href={basics.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:border-primary hover:text-primary transition-colors"
              aria-label="View Amr Abed's Resume"
            >
              <FaFileLines className="size-5" />
              <span>View Resume</span>
            </a>
          )}
        </div>
      </div>
    </Section>
  );
});

ContactSection.displayName = "ContactSection";
