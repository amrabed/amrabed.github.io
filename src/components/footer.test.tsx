import { describe, it, expect } from "vitest";

import { render } from "@testing-library/react";

import Footer from "./footer";

describe("Footer", () => {
  it("renders correctly with default profiles", () => {
    const { getByText, getByLabelText } = render(<Footer />);
    expect(getByText(/Amr Abed/i)).toBeInTheDocument();
    expect(
      getByText(/Built with Next\.js, Tailwind CSS, and HeroUI/i),
    ).toBeInTheDocument();
    expect(getByLabelText("LinkedIn (opens in a new tab)")).toBeInTheDocument();
    expect(getByLabelText("GitHub (opens in a new tab)")).toBeInTheDocument();
  });

  it("renders with custom profiles", () => {
    const customProfiles = [
      {
        name: "CustomNet",
        link: "https://custom.example.com",
        icon: <span>CN</span>,
      },
    ];
    const { getByLabelText } = render(<Footer profiles={customProfiles} />);
    const link = getByLabelText("CustomNet (opens in a new tab)").closest("a");
    expect(link).toHaveAttribute("href", "https://custom.example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
