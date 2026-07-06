import { describe, it, expect, vi } from "vitest";

import { render } from "@testing-library/react";

import { Areas } from "./skills";

import type { ReactNode } from "react";

vi.mock("@heroui/react", async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  
  const MockTooltip = ({ children }: { children: ReactNode }) => <div>{children}</div>;
  MockTooltip.displayName = "MockTooltip";
  
  const Trigger = ({ children }: { children: ReactNode }) => <>{children}</>;
  Trigger.displayName = "MockTooltip.Trigger";
  MockTooltip.Trigger = Trigger;
  
  const Content = ({ children }: { children: ReactNode }) => <div>{children}</div>;
  Content.displayName = "MockTooltip.Content";
  MockTooltip.Content = Content;
  
  return { ...actual, Tooltip: MockTooltip };
});

describe("Areas", () => {
  it("renders correctly", () => {
    const { container } = render(<Areas areas={[]} />);
    expect(container).toBeInTheDocument();
  });
});
