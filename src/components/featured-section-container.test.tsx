import { describe, expect, it } from "vitest";


import { render } from "@testing-library/react";

import { FeaturedSectionContainer } from "./featured-section-container";

describe("FeaturedSectionContainer", () => {
  const mockItems = [
    { id: "1", featured: true, name: "Featured 1" },
    { id: "2", featured: false, name: "Normal 2" },
  ];

  it("should separate featured and non-featured items", () => {
    const { getByText } = render(
      <FeaturedSectionContainer
        items={mockItems}
        renderItem={(item: (typeof mockItems)[0]) => (
          <div key={item.id}>{item.name}</div>
        )}
      />,
    );

    expect(getByText("Featured 1")).toBeInTheDocument();
    expect(getByText("Normal 2")).toBeInTheDocument();
  });
});
