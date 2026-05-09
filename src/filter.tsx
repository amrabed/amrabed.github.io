import type { Position, Project, Certification, Degree } from "@/types";

/**
 * Checks if any of the values match the query (case-insensitive).
 * Expects lowercaseQuery to be already lowercased.
 */
export const match = (values: string[], lowercaseQuery: string) => {
  return values.some((value) => value.toLowerCase().includes(lowercaseQuery));
};

/**
 * Filters a project, position, certification or degree by a query string.
 * Optimizes performance by lowercasing the query once.
 */
export const filterByQuery = (
  item: Project | Position | Certification | Degree,
  lowercaseQuery: string,
) => {
  if (!lowercaseQuery) return true;

  // Project search
  if ("name" in item) {
    const project = item as Project;
    return (
      project.name.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      match(project.roles || [], lowercaseQuery) ||
      match(project.tools || [], lowercaseQuery) ||
      match(project.tags || [], lowercaseQuery)
    );
  }

  // Certification, Degree, Position search
  if ("title" in item) {
    if (item.title.toLowerCase().includes(lowercaseQuery)) return true;

    if ("organization" in item) {
      // Certification or Position
      if (item.organization.name.toLowerCase().includes(lowercaseQuery))
        return true;

      // Check if it's a Certification (has optional skills/areas)
      // and also check Position fields
      const cert = item as Certification;
      if (cert.skills && match(cert.skills, lowercaseQuery)) return true;
      if (cert.areas && match(cert.areas, lowercaseQuery)) return true;

      const pos = item as Position;
      if (pos.roles && match(pos.roles, lowercaseQuery)) return true;
      if (pos.skills && match(pos.skills, lowercaseQuery)) return true;
      if (pos.tags && match(pos.tags, lowercaseQuery)) return true;
      if (pos.tasks && match(pos.tasks, lowercaseQuery)) return true;
    }

    if ("university" in item) {
      // Degree
      const degree = item as Degree;
      if (degree.university.name.toLowerCase().includes(lowercaseQuery))
        return true;
    }
  }

  return false;
};

/**
 * Filters values based on a set of selections.
 * Expects selectionSet to be a Set of lowercase strings.
 */
export const filterBySelection = (
  values: string[],
  selectionSet: Set<string>,
) =>
  selectionSet.size === 0 ||
  values.some((value) => selectionSet.has(value.toLowerCase()));

/**
 * Specifically for area filtering, which applies to Projects, Positions, and Certifications.
 */
export const filterByArea = (areas: string[], selectionSet: Set<string>) =>
  filterBySelection(areas, selectionSet);
