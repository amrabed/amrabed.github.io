import type { Position, Project, Certification, Degree } from "@/types";

/**
 * Checks if any of the values match the query (case-insensitive).
 * Expects lowercaseQuery to be already lowercased.
 */
export const match = (values: string[], lowercaseQuery: string) => {
  return values.some((value) => value.toLowerCase().includes(lowercaseQuery));
};

const filterProjectByQuery = (project: Project, lowercaseQuery: string) => {
  return (
    project.name.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    match(project.roles || [], lowercaseQuery) ||
    match(project.tools || [], lowercaseQuery) ||
    match(project.tags || [], lowercaseQuery)
  );
};

const filterCertificationByQuery = (
  cert: Certification,
  lowercaseQuery: string,
) => {
  return (
    cert.title.toLowerCase().includes(lowercaseQuery) ||
    cert.organization.name.toLowerCase().includes(lowercaseQuery) ||
    (cert.skills && match(cert.skills, lowercaseQuery)) ||
    (cert.areas && match(cert.areas, lowercaseQuery))
  );
};

const filterPositionByQuery = (pos: Position, lowercaseQuery: string) => {
  return (
    pos.title.toLowerCase().includes(lowercaseQuery) ||
    pos.organization.name.toLowerCase().includes(lowercaseQuery) ||
    match(pos.roles || [], lowercaseQuery) ||
    match(pos.skills || [], lowercaseQuery) ||
    match(pos.tags || [], lowercaseQuery) ||
    match(pos.tasks || [], lowercaseQuery)
  );
};

const filterDegreeByQuery = (degree: Degree, lowercaseQuery: string) => {
  return (
    degree.title.toLowerCase().includes(lowercaseQuery) ||
    degree.university.name.toLowerCase().includes(lowercaseQuery)
  );
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

  if ("name" in item) return filterProjectByQuery(item, lowercaseQuery);

  if ("title" in item) {
    if ("university" in item) return filterDegreeByQuery(item, lowercaseQuery);
    if ("badge" in item)
      return filterCertificationByQuery(item, lowercaseQuery);
    return filterPositionByQuery(item, lowercaseQuery);
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
