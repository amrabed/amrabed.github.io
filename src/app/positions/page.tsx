"use client";

import { Fragment } from "react";

import Section from "@/components/Section";
import { PageHeader } from "@/components/header";
import { match } from "@/components/search";
import { useSearch } from "@/contexts/search";
import positions from "@/data/positions";

import Timeline from "./timeline";

const Page = () => {
  const { query, setQuery } = useSearch();

  return (
    <Fragment>
      <PageHeader
        title="Positions"
        query={query}
        setQuery={setQuery}
        placeholder="Search positions by title, skill, or tool"
      />
      <Section id="experience" title="">
        <div className="flex text-center items-center content-center justify-center mt-[50px]">
          <Timeline
            positions={positions.filter(
              (position) =>
                position.title.toLowerCase().includes(query) ||
                match(position.skills, query) ||
                match(position.tags, query),
            )}
          />
        </div>
      </Section>
    </Fragment>
  );
};

export default Page;
