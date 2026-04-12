"use client";

import { Fragment } from "react";

import { Selections, Filter } from "@/components/filter";
import { PageHeader } from "@/components/header";
import { match } from "@/components/search";
import { Section } from "@/components/section";
import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import areas from "@/data/areas";
import positions from "@/data/positions";
import roles from "@/data/roles";
import skills from "@/data/skills";
import { Position } from "@/types";

import Timeline from "./timeline";

const filterByQuery = (position: Position, query: string) =>
  position.title.toLowerCase().includes(query) ||
  match(position.skills, query) ||
  match(position.tags, query);

const filterBySelection = (values: string[], selections: string[]) =>
  !selections?.length ||
  values.filter((value) => selections.includes(value.toLowerCase())).length;

const Page = () => {
  const { query, setQuery } = useSearch();
  const { selected, setSelected } = useFilter();

  const selectedRoles = selected["roles"] || [];
  const selectedTools = selected["tools"] || [];
  const selectedSkills = selected["skills"] || [];

  const filteredPositions = positions.filter(
    (position) =>
      filterByQuery(position, query) &&
      (filterBySelection(position.tags, selectedSkills) ||
        filterBySelection(position.roles, selectedRoles) ||
        filterBySelection(position.skills, selectedTools)),
  );

  return (
    <Fragment>
      <PageHeader
        title="Positions"
        query={query}
        setQuery={setQuery}
        placeholder="Search by title, role, skill, or tool"
      >
        <Filter>
          <Selections
            label="Roles"
            values={Object.values(roles).map((role) => role.name)}
            selected={selectedRoles}
            setSelected={(values) => setSelected("roles", values)}
          />
          <Selections
            label="Tools"
            values={Object.values(skills).map((skill) => skill.name)}
            selected={selectedTools}
            setSelected={(values) => setSelected("tools", values)}
          />
          <Selections
            label="Skills"
            values={Object.values(areas).map((area) => area.name)}
            selected={selectedSkills}
            setSelected={(values) => setSelected("skills", values)}
          />
        </Filter>
      </PageHeader>
      <Section id="experience" title="">
        <div className="flex text-center items-center content-center justify-center mt-[50px]">
          <Timeline positions={filteredPositions} />
        </div>
      </Section>
    </Fragment>
  );
};

export default Page;
