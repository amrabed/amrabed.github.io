/* eslint-disable react/display-name, @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";

import type { ReactNode } from "react";

import { render } from "@testing-library/react";

import Skills, { Areas, Tools, Tags } from "./skills";

vi.mock("@heroui/react", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();

  const MockTooltip = ({ children }: { children: ReactNode }) => (
    <div data-testid="tooltip">{children}</div>
  );
  MockTooltip.displayName = "MockTooltip";

  const Trigger = ({ children }: { children: ReactNode }) => (
    <div data-testid="tooltip-trigger">{children}</div>
  );
  Trigger.displayName = "MockTooltip.Trigger";
  MockTooltip.Trigger = Trigger;

  const Content = ({ children }: { children: ReactNode }) => (
    <div data-testid="tooltip-content">{children}</div>
  );
  Content.displayName = "MockTooltip.Content";
  MockTooltip.Content = Content;

  MockTooltip.Arrow = () => null;

  return { ...actual, Tooltip: MockTooltip };
});

describe("Skills components", () => {
  describe("Areas", () => {
    it("renders empty list correctly", () => {
      const { container } = render(<Areas areas={[]} />);
      expect(container.querySelector("ul")).toBeInTheDocument();
      expect(container.querySelectorAll("li").length).toBe(0);
    });

    it("renders valid areas and skips invalid ones", () => {
      const { container } = render(
        <Areas areas={["cloud", "invalid_area_id"]} />,
      );
      expect(container.textContent).toContain("Cloud");
      expect(container.textContent).not.toContain("invalid_area_id");
    });
  });

  describe("Tools", () => {
    it("renders empty tools correctly", () => {
      const { container } = render(<Tools tools={[]} />);
      expect(container.querySelector("ul")).toBeInTheDocument();
    });

    it("renders compact tools and skips invalid ones", () => {
      const { container, getAllByLabelText } = render(
        <Tools tools={["python", "nonexistent"]} compact={true} />,
      );
      expect(getAllByLabelText("Python")[0]).toBeInTheDocument();
      expect(container.querySelectorAll("li").length).toBe(1);
    });

    it("renders non-compact tools and skips invalid ones", () => {
      const { container, getAllByLabelText } = render(
        <Tools tools={["python", "nonexistent"]} compact={false} />,
      );
      expect(getAllByLabelText("Python")[0]).toBeInTheDocument();
      expect(container.querySelectorAll("li").length).toBe(1);
    });
  });

  describe("Tags", () => {
    it("renders tags correctly", () => {
      const { container } = render(<Tags tags={["AI", "Mobile"]} />);
      expect(container.textContent).toContain("AI");
      expect(container.textContent).toContain("Mobile");
    });
  });

  describe("Skills (default export)", () => {
    it("renders the skill list correctly", () => {
      const mockSkills = [
        { name: "Kotlin", icon: "kotlin-icon" },
        { name: "Swift", icon: "swift-icon" },
      ];
      const { getByText } = render(<Skills skills={mockSkills as any} />);
      expect(getByText("Kotlin")).toBeInTheDocument();
      expect(getByText("Swift")).toBeInTheDocument();
      expect(getByText("kotlin-icon")).toBeInTheDocument();
      expect(getByText("swift-icon")).toBeInTheDocument();
    });
  });
});
