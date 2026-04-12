import { Selections, Filter } from "@/components/filter";
import { PageHeader } from "@/components/header";
import { useFilter } from "@/contexts/filter";
import { useSearch } from "@/contexts/search";
import areas from "@/data/areas";
import roles from "@/data/roles";
import skills from "@/data/skills";
import { ReactNode, Fragment } from "react";

interface FilterBaseProps {
  title: string;
  placeholder: string;
  children: ReactNode;
}

export const FilterBase = ({
  title,
  placeholder,
  children,
}: FilterBaseProps) => {
  const { query, setQuery } = useSearch();
  const { selected, setSelected } = useFilter();

  const selectedRoles = selected["roles"] || [];
  const selectedTools = selected["tools"] || [];
  const selectedSkills = selected["skills"] || [];

  return (
    <Fragment>
      <PageHeader
        title={title}
        query={query}
        setQuery={setQuery}
        placeholder={placeholder}
      >
        <Filter>
          <Selections
            label="Roles"
            values={Object.values(roles).map((role) => role.name)}
            selected={selectedRoles}
            setSelected={(values) => setSelected("roles", values as string[])}
          />
          <Selections
            label="Tools"
            values={Object.values(skills).map((skill) => skill.name)}
            selected={selectedTools}
            setSelected={(values) => setSelected("tools", values as string[])}
          />
          <Selections
            label="Skills"
            values={Object.values(areas).map((area) => area.name)}
            selected={selectedSkills}
            setSelected={(values) => setSelected("skills", values as string[])}
          />
        </Filter>
      </PageHeader>
      {children}
    </Fragment>
  );
};
