import { describe, it, expect } from "vitest";

import { render } from "@testing-library/react";

import projects from "@/data/projects";

import ProjectCard from "./project";

describe("ProjectCard", () => {
  it("renders correctly", () => {
    if (projects.length > 0) {
      const { getByText } = render(<ProjectCard project={projects[0]} />);
      expect(getByText(projects[0].name)).toBeInTheDocument();
    }
  });
});
