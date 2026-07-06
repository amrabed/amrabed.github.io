import type {
  Position,
  Project,
  Certification,
  Degree,
  Publication,
} from "@/types";

/**
 * Checks if any of the values match the query (case-insensitive).
 * Expects lowercaseQuery to be already lowercased.
 */
const lowerCaseCache = new Map<string, string>();
const toLowerCaseCached = (value: string) => {
  let lower = lowerCaseCache.get(value);
  if (lower === undefined) {
    lower = value.toLowerCase();
    // Prevent unbounded memory growth if data is dynamic
    if (lowerCaseCache.size > 10000) lowerCaseCache.clear();
    lowerCaseCache.set(value, lower);
  }
  return lower;
};

export const match = (values: string[], lowercaseQuery: string) => {
  return values.some((value) =>
    toLowerCaseCached(value).includes(lowercaseQuery),
  );
};

const filterPublicationByQuery = (pub: Publication, lowercaseQuery: string) => {
  return (
    pub.title.toLowerCase().includes(lowercaseQuery) ||
    pub.venue.toLowerCase().includes(lowercaseQuery) ||
    match(pub.authors || [], lowercaseQuery) ||
    match(pub.roles || [], lowercaseQuery) ||
    match(pub.skills || [], lowercaseQuery) ||
    match(pub.tags || [], lowercaseQuery)
  );
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
    (cert.skills ? match(cert.skills, lowercaseQuery) : false) ||
    (cert.areas ? match(cert.areas, lowercaseQuery) : false)
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
 * Filters a project, position, certification, publication or degree by a query string.
 * Optimizes performance by lowercasing the query once.
 */
export const filterByQuery = (
  item: Project | Position | Certification | Degree | Publication,
  lowercaseQuery: string,
) => {
  if (!lowercaseQuery) return true;

  if ("name" in item) return filterProjectByQuery(item, lowercaseQuery);

  if ("title" in item) {
    if ("university" in item) return filterDegreeByQuery(item, lowercaseQuery);
    if ("badge" in item)
      return filterCertificationByQuery(item, lowercaseQuery);
    if ("authors" in item)
      return filterPublicationByQuery(item, lowercaseQuery);
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
