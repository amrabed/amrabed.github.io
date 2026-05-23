"use client";

import Link from "next/link";

import React from "react";
import {
  FaFileLines,
  FaPersonChalkboard,
  FaQuoteLeft,
  FaLink,
} from "react-icons/fa6";
import { SiScopus } from "react-icons/si";

import { Tooltip, Popover, Button } from "@heroui/react";

import { Areas, Tools } from "@/components/skills";
import { Publication, PublicationLinks } from "@/types";

const IconLink = ({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) => (
  <Tooltip>
    <Tooltip.Trigger>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className="text-slate-500 hover:text-primary transition-colors flex items-center gap-1"
      >
        {children}
      </Link>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <Tooltip.Arrow />
      {title}
    </Tooltip.Content>
  </Tooltip>
);

const CiteButton = ({ publication }: { publication: Publication }) => {
  const author = publication.authors[0];
  const paperTitle = publication.title;
  const key =
    author.slice(author.lastIndexOf(" ") + 1) +
    publication.year +
    paperTitle.slice(0, paperTitle.indexOf(" ", 1));

  const bibtex = `@${publication.type}{${key},
  title = {${paperTitle}},
  author = {${publication.authors.join(" and ")}},
  ${publication.type === "article" ? "journal" : "booktitle"} = {${publication.venue}},
  year = {${publication.year}}
}`;

  return (
    <Popover placement="top" isDismissable={true}>
      <Popover.Trigger>
        <button
          aria-label="Cite"
          className="text-slate-500 hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium h-auto p-0 min-w-0 bg-transparent"
        >
          <FaQuoteLeft className="size-4" />
          <span>Cite</span>
        </button>
      </Popover.Trigger>
      <Popover.Content className="dark:bg-slate-800 rounded-3xl">
        <Popover.Dialog className="p-4 max-w-md bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xl">
          <pre className="text-xs font-mono whitespace-pre-wrap overflow-x-auto text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 p-3 rounded border border-slate-100 dark:border-slate-900">
            {bibtex}
          </pre>
          <div className="mt-3 flex justify-end">
            <Button
              size="sm"
              color="primary"
              onPress={() => {
                navigator.clipboard.writeText(bibtex);
              }}
            >
              Copy to Clipboard
            </Button>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};

const Links = ({ links }: { links: PublicationLinks }) => {
  return (
    <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 items-center justify-end">
      {links.fulltext && (
        <IconLink href={links.fulltext} title="Read">
          <FaFileLines className="size-4" />
          <span className="text-sm font-medium">Read</span>
        </IconLink>
      )}
      {links.presentation && (
        <IconLink href={links.presentation} title="Presentation">
          <FaPersonChalkboard className="size-4" />
          <span className="text-sm font-medium">Presentation</span>
        </IconLink>
      )}
      {links.doi && (
        <IconLink href={`https://dx.doi.org/${links.doi}`} title="DOI">
          <FaLink className="size-4" />
          <span className="text-sm font-medium">DOI</span>
        </IconLink>
      )}
      {links.scopus && (
        <IconLink href={links.scopus} title="Scopus">
          <SiScopus className="size-4" />
          <span className="text-sm font-medium">Scopus</span>
        </IconLink>
      )}
    </div>
  );
};

const PublicationView = React.memo(
  ({ publication }: { publication: Publication }) => {
    return (
      <div className="flex flex-col gap-2 p-6 rounded-2xl bg-transparent border-1 border-slate-500/50 shadow-none h-full hover:border-primary transition-colors duration-300">
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
              {publication.title}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              {publication.authors.join(", ")}
            </p>
          </div>
          <div className="flex flex-row gap-1 shrink-0">
            <Tools tools={publication.skills} compact />
          </div>
        </div>
        <p className="text-primary font-medium text-sm mt-1 italic">
          {publication.venue}, {publication.year}
        </p>

        <div className="flex-grow"></div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-row flex-wrap justify-between items-center gap-4">
            <div className="flex flex-row items-center gap-4">
              <Areas areas={publication.tags} />
              <CiteButton publication={publication} />
            </div>
            <Links links={publication.links} />
          </div>
        </div>
      </div>
    );
  },
);

PublicationView.displayName = "PublicationView";

export default PublicationView;
