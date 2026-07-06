import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PublicationCard from "./publication";
import publications from "@/data/publications";

describe("PublicationCard", () => {
  it("renders correctly", () => {
    if (publications.length > 0) {
      const { getByText } = render(<PublicationCard publication={publications[0]} />);
      expect(getByText(publications[0].title)).toBeInTheDocument();
    }
  });
});
