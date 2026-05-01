"use client";

import { Section } from "@/components/section";
import React, { useMemo } from "react";

import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import positions from "@/data/positions";
import { filterByQuery, filterBySelection } from "@/filter";

import { EmptyState } from "@/components/empty-state";

import { FilterBase } from "../../components/filter-base";
import Timeline from "./timeline";

const Page = () => {
  const { query } = useSearch();
  const { selected } = useFilter();

  const filteredPositions = useMemo(() => {
    const lowercaseQuery = query.toLowerCase();
    const roleSet = new Set((selected["roles"] || []).map((s) => s.toLowerCase()));
    const toolSet = new Set((selected["tools"] || []).map((s) => s.toLowerCase()));
    const skillSet = new Set((selected["skills"] || []).map((s) => s.toLowerCase()));

    return positions.filter(
      (position) =>
        filterByQuery(position, lowercaseQuery) &&
        filterBySelection(position.tags, skillSet) &&
        filterBySelection(position.roles, roleSet) &&
        filterBySelection(position.skills, toolSet),
    );
  }, [query, selected]);

  return (
    <FilterBase
      title="Positions"
      placeholder="Search by title, role, skill, or tool"
    >
      <Section id="experience" title="">
        {filteredPositions.length > 0 ? (
          <div className="flex text-center items-center content-center justify-center mt-[50px]">
            <Timeline positions={filteredPositions} />
          </div>
        ) : (
          <EmptyState />
        )}
      </Section>
    </FilterBase>
  );
};

export default Page;
