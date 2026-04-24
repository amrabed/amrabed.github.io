import type { Position, Project } from "@/types";

/**
 * Checks if any of the values match the query (case-insensitive).
 * Expects lowercaseQuery to be already lowercased.
 */
export const match = (values: string[], lowercaseQuery: string) => {
  return values.some((value) => value.toLowerCase().includes(lowercaseQuery));
};

/**
 * Filters a project or position by a query string.
 * Optimizes performance by lowercasing the query once.
 */
export const filterByQuery = (
  item: Project | Position,
  lowercaseQuery: string,
) => {
  if (!lowercaseQuery) return true;
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

/**
 * Filters values based on a set of selections.
 * Expects selectionSet to be a Set of lowercase strings.
 */
export const filterBySelection = (values: string[], selectionSet: Set<string>) =>
  selectionSet.size === 0 ||
  values.some((value) => selectionSet.has(value.toLowerCase()));
