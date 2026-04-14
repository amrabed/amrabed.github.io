import { match } from "@/components/search";
import type { Position, Project } from "@/types";

export const filterByQuery = (item: Project | Position, query: string) => {
  const lowercaseQuery = query.toLowerCase();
  const name = (item as Project).name || (item as Position).title;
  const roles = item.roles || [];
  const tools = (item as Project).tools || (item as Position).skills || [];
  const tags = item.tags || [];

  return (
    name.toLowerCase().includes(lowercaseQuery) ||
    match(roles, lowercaseQuery) ||
    match(tools, lowercaseQuery) ||
    match(tags, lowercaseQuery)
  );
};

export const filterBySelection = (values: string[], selections: string[]) =>
  !selections?.length ||
  values.filter((value) => selections.includes(value.toLowerCase())).length;
