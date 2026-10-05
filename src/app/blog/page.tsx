import type { Metadata } from "next";
import Link from "next/link";

import { FaArrowLeft, FaBookOpen } from "react-icons/fa6";

import { Banner } from "@/components/banner";
import { IconLink } from "@/components/icon-link";
import { articles, basics } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog & Technical Articles | Amr Abed",
  description:
    "Technical articles, architectural deep dives, and engineering insights by Amr Abed on AI/ML, AWS, MLOps, and scalable software systems.",
  alternates: {
    canonical: "https://amrabed.com/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <header className="w-full bg-background/80 backdrop-blur-md border-b border-divider px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors"
        >
          <FaArrowLeft className="size-4" />
          <span>Back to Portfolio</span>
        </Link>
        <span className="font-bold text-lg">{basics.name}</span>
      </header>

      <main className="flex-grow max-w-5xl mx-auto px-6 py-12 w-full space-y-10">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Technical Blog &amp; Articles
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Writings and architectural reflections on scaling machine learning
            pipelines, multi-cloud platforms, container security, and software
            craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="card-container flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{article.date}</span>
                      {article.readTime && (
                        <>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 hover:text-primary transition-colors">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {article.title}
                      </a>
                    </h2>
                  </div>
                  <IconLink href={article.url} title="Read Article">
                    <FaBookOpen className="size-5" />
                  </IconLink>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Read on Medium →
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
