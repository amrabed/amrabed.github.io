import { describe, it, expect } from "vitest";

import { render } from "@testing-library/react";

import publications from "@/data/publications";

import PublicationCard from "./publication";

describe("PublicationCard", () => {
  it("renders correctly", () => {
    if (publications.length > 0) {
      const { getByText } = render(
        <PublicationCard publication={publications[0]} />,
      );
      expect(getByText(publications[0].title)).toBeInTheDocument();
    }
  });
});
