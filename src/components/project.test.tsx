import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProjectCard from "./project";
import projects from "@/data/projects";

describe("ProjectCard", () => {
  it("renders correctly", () => {
    if (projects.length > 0) {
      const { getByText } = render(<ProjectCard project={projects[0]} />);
      expect(getByText(projects[0].name)).toBeInTheDocument();
    }
  });
});
