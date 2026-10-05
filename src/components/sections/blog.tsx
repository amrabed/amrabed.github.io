import { memo } from "react";
import {
  FaArrowRight,
  FaArrowUpRightFromSquare,
  FaBookOpen,
} from "react-icons/fa6";

import { Card } from "@heroui/react";

import { IconLink } from "@/components/icon-link";
import { Section } from "@/components/section";
import { articles } from "@/lib/data";

export const BlogSection = memo(() => {
  return (
    <Section id="blog" title="Articles & Insights">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
            Thoughts and deep dives on engineering leadership, machine learning
            systems, AWS cloud architectures, and container security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="card-container h-full flex flex-col justify-between"
            >
              <Card.Header className="p-0 bg-transparent flex justify-between items-start">
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
                  <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 hover:text-primary transition-colors">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </a>
                  </h3>
                </div>
                <IconLink href={article.url} title="Read Article">
                  <FaBookOpen className="size-5" />
                </IconLink>
              </Card.Header>

              <Card.Content className="p-0 mt-3 bg-transparent flex-grow">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {article.summary}
                </p>
              </Card.Content>

              <Card.Footer className="p-0 mt-4 bg-transparent flex justify-between items-center">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline"
                >
                  Read <FaArrowRight className="size-3" />
                </a>
              </Card.Footer>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <a
            href="https://amrabed.com/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white font-medium transition-colors"
          >
            <span>Visit Full Blog</span>
            <FaArrowUpRightFromSquare className="size-4" />
          </a>
        </div>
      </div>
    </Section>
  );
});

BlogSection.displayName = "BlogSection";
