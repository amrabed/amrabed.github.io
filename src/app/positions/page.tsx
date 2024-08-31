"use client";

import { Fragment } from "react";

import Section from "@/components/Section";
import Filters, { FilterModal } from "@/components/filter";
import { PageHeader } from "@/components/header";
import { match } from "@/components/search";
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
  !selections ||
  !selections.length ||
  values.filter((value) => selections.includes(value.toLowerCase())).length;

const Page = () => {
  const { query, setQuery } = useSearch();
  const { selected: selectedSkills, setSelected: setSelectedSkills } =
    useFilter();
  const { selected: selectedAreas, setSelected: setSelectedAreas } =
    useFilter();
  const { selected: selectedRoles, setSelected: setSelectedRoles } =
    useFilter();

  const filteredPositions = positions.filter(
    (position) =>
      filterByQuery(position, query) &&
      (filterBySelection(position.tags, selectedAreas) ||
        filterBySelection(position.roles, selectedRoles) ||
        filterBySelection(position.skills, selectedSkills)),
  );

  return (
    <Fragment>
      <PageHeader
        title="Positions"
        query={query}
        setQuery={setQuery}
        placeholder="Search positions by title, skill, or tool"
      >
        <FilterModal>
          <Filters
            label="skills"
            values={Object.values(roles).map((role) => role.name)}
            selected={selectedRoles}
            setSelected={setSelectedRoles}
          />
          <Filters
            label="skills"
            values={Object.values(skills).map((skill) => skill.name)}
            selected={selectedSkills}
            setSelected={setSelectedSkills}
          />
          <Filters
            label="areas"
            values={Object.values(areas).map((areas) => areas.name)}
            selected={selectedAreas}
            setSelected={setSelectedAreas}
          />
        </FilterModal>
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
