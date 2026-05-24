"use client";

import React from "react";
import {
  FaFileLines,
  FaPersonChalkboard,
  FaQuoteLeft,
  FaLink,
  FaCopy,
  FaCheck,
} from "react-icons/fa6";

import { Popover, Button, Card, Separator, Tooltip } from "@heroui/react";

import { IconLink } from "@/components/icon-link";
import { Areas, Tools } from "@/components/skills";
import { Publication, PublicationLinks } from "@/types";

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

  const [copied, setCopied] = React.useState(false);
  return (
    <Popover>
      <Popover.Trigger>
        <button
          aria-label="Cite"
          className="text-slate-500 hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium h-auto p-0 min-w-0 bg-transparent"
        >
          <FaQuoteLeft className="size-4" />
          <span>Cite</span>
        </button>
      </Popover.Trigger>
      <Popover.Content
        placement="top"
        className="dark:bg-slate-800 rounded-3xl"
      >
        <div className="flex flex-row justify-end text-muted-foreground p-2">
          {copied && <span className="flex flex-row text-sm font-medium p-2 gap-1"><FaCheck className="size-4 text-green-500" /> Copied</span>}
          <Tooltip>
            <Button
              size="sm"
              variant="ghost"
              onPress={() => {
                navigator.clipboard.writeText(bibtex);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              aria-label="Copy BibTeX to clipboard"
              isIconOnly
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaCopy className="size-4" />
            </Button>
            <Tooltip.Content>
              <Tooltip.Arrow />
              Copy to clipboard
            </Tooltip.Content>
          </Tooltip>
        </div>
        <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 p-3 rounded border border-slate-100 dark:border-slate-900">
          {bibtex}
        </pre>
      </Popover.Content>
    </Popover >
  );
};

const Links = ({
  links,
  compact = false,
}: {
  links: PublicationLinks;
  compact?: boolean;
}) => {
  return (
    <div
      className={`flex flex-row flex-wrap gap-x-4 gap-y-2 items-center ${compact ? "" : "justify-end"}`}
    >
      {links.fulltext && (
        <IconLink href={links.fulltext} title="Read">
          <FaFileLines className="size-4" />
          {!compact && <span className="text-sm font-medium">Read</span>}
        </IconLink>
      )}
      {links.presentation && (
        <IconLink href={links.presentation} title="Presentation">
          <FaPersonChalkboard className="size-4" />
          {!compact && (
            <span className="text-sm font-medium">Slides</span>
          )}
        </IconLink>
      )}
      {links.doi && (
        <IconLink href={`https://dx.doi.org/${links.doi}`} title="DOI">
          <FaLink className="size-4" />
          {!compact && <span className="text-sm font-medium">DOI</span>}
        </IconLink>
      )}
      {/* {links.scopus && (
        <IconLink href={links.scopus} title="Scopus">
          <SiScopus className="size-4" />
          {!compact && <span className="text-sm font-medium">Scopus</span>}
        </IconLink>
      )} */}
    </div>
  );
};

const PublicationView = React.memo(
  ({
    publication,
    featured = false,
  }: {
    publication: Publication;
    featured?: boolean;
  }) => {
    return (
      <Card
        className={`card-container h-full ${featured ? "md:col-span-2 xl:col-span-2 2xl:col-span-3" : ""}`}
      >
        <Card.Header className="flex justify-between items-start gap-4 p-0 bg-transparent">
          <div className="flex flex-col gap-1">
            <h3 className={`card-title ${featured ? "text-2xl" : "text-xl"}`}>
              {publication.title}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              {publication.authors.join(", ")}
            </p>
          </div>
        </Card.Header>

        <Card.Content className="p-0 mt-1 bg-transparent overflow-visible">
          <p className="text-primary font-medium text-sm italic">
            {publication.venue}, {publication.year}
          </p>
          <div className="flex-grow"></div>
        </Card.Content>

        <Card.Footer className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 bg-transparent overflow-visible">
          <div className="flex flex-row items-center gap-2">
            <Areas areas={publication.tags} />
            <Separator orientation="vertical" />
            <Tools tools={publication.skills} compact />
          </div>
          <div className="flex flex-row items-center gap-4">
            <CiteButton publication={publication} />
            <Links links={publication.links} />
          </div>
        </Card.Footer>
      </Card>
    );
  },
);

PublicationView.displayName = "PublicationView";

export default PublicationView;
