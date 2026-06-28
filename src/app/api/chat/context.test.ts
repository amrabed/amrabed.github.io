import { describe, expect, it } from "vitest";
import getConsolidatedContext from "./context";

describe("getConsolidatedContext", () => {
  it("should match the existing snapshot", () => {
    const context = getConsolidatedContext();
    expect(context).toMatchSnapshot();
  });
});
