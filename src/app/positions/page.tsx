"use client";

import { Section } from "@/components/section";
import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import positions from "@/data/positions";
import { Position } from "@/types";
import { filterByQuery, filterBySelection } from "@/filter";

import { FilterBase } from "../../components/filter-base";
import Timeline from "./timeline";

const Page = () => {
  const { query } = useSearch();
  const { selected } = useFilter();

  const selectedRoles = selected["roles"] || [];
  const selectedTools = selected["tools"] || [];
  const selectedSkills = selected["skills"] || [];

  const filteredPositions = positions.filter(
    (position) =>
      filterByQuery(position, query) &&
      filterBySelection(position.tags, selectedSkills) &&
      filterBySelection(position.roles, selectedRoles) &&
      filterBySelection(position.skills, selectedTools),
  );

  return (
    <FilterBase
      title="Positions"
      placeholder="Search by title, role, skill, or tool"
    >
      <Section id="experience" title="">
        <div className="flex text-center items-center content-center justify-center mt-[50px]">
          <Timeline positions={filteredPositions} />
        </div>
      </Section>
    </FilterBase>
  );
};

export default Page;
