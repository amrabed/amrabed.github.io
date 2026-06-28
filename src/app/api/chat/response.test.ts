import { describe, expect, it } from "vitest";

import { CORS_HEADERS, OPTIONS_RESPONSE, errorResponse } from "./response";

describe("api response helpers", () => {
  it("should have correct CORS headers defined", () => {
    expect(CORS_HEADERS).toEqual({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    });
  });

  it("should have correct OPTIONS_RESPONSE configured", async () => {
    expect(OPTIONS_RESPONSE.status).toBe(204);
    expect(OPTIONS_RESPONSE.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });

  it("should generate correct errorResponse", async () => {
    const res = errorResponse(400, "Bad Request");
    expect(res.status).toBe(400);
    expect(res.headers.get("Content-Type")).toBe("application/json");
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");

    const body = await res.json();
    expect(body).toEqual({ error: "Bad Request" });
  });
});
