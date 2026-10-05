"use client";

import { memo } from "react";
import { FaEnvelope, FaFileArrowDown } from "react-icons/fa6";

import { Section } from "@/components/section";
import Social from "@/components/social";
import { basics } from "@/lib/data";

export const ContactSection = memo(() => {
  return (
    <Section id="contact" title="Get In Touch">
      <div className="w-full max-w-4xl mx-auto px-4 text-center space-y-8 pb-16">
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Have an interesting engineering problem, cloud/AI project, speaking
          opportunity, or just want to connect? My inbox is always open.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${basics.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:opacity-90 transition-opacity"
            aria-label="Send an email to Amr Abed"
          >
            <FaEnvelope className="size-5" />
            <span>Say Hello ({basics.email})</span>
          </a>

          {basics.resumeUrl && (
            <a
              href={basics.resumeUrl}
              download="Amr_Abed_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:border-primary hover:text-primary transition-colors"
              aria-label="Download Amr Abed's Resume"
            >
              <FaFileArrowDown className="size-5" />
              <span>Download Resume (PDF)</span>
            </a>
          )}
        </div>

        <div className="pt-4">
          <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-4 font-semibold">
            Connect Across Platforms
          </p>
          <Social className="justify-center" />
        </div>
      </div>
    </Section>
  );
});

ContactSection.displayName = "ContactSection";
