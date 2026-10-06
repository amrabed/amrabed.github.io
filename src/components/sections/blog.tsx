import { memo } from "react";
import { FaArrowUpRightFromSquare, FaBookOpen } from "react-icons/fa6";

import { NewspaperIcon } from "@heroicons/react/24/outline";
import { Card } from "@heroui/react";

import { IconLink } from "@/components/icon-link";
import { Section } from "@/components/section";
import { articles } from "@/lib/data";

export const BlogSection = memo(() => {
  return (
    <Section
      id="articles"
      title="Articles"
      icon={<NewspaperIcon className="size-7" />}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-10 space-y-8">
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
                <IconLink href={article.url} title="Read Article">
                  <FaBookOpen className="size-5" />
                </IconLink>
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
            <span>Read more articles</span>
            <FaArrowUpRightFromSquare className="size-4" />
          </a>
        </div>
      </div>
    </Section>
  );
});

BlogSection.displayName = "BlogSection";
