import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Areas } from "./skills";

vi.mock("@heroui/react", async (importOriginal) => {
  const actual: any = await importOriginal();
  const MockTooltip = ({ children }: any) => <div>{children}</div>;
  MockTooltip.Trigger = ({ children }: any) => <>{children}</>;
  MockTooltip.Content = ({ children }: any) => <div>{children}</div>;
  return { ...actual, Tooltip: MockTooltip };
});

describe("Areas", () => {
  it("renders correctly", () => {
    const { container } = render(<Areas areas={[]} />);
    expect(container).toBeInTheDocument();
  });
});
