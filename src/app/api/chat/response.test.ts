import { describe, expect, it } from "vitest";

import { getCorsHeaders, optionsResponse, errorResponse } from "./response";

describe("api response helpers", () => {
  it("should have correct CORS headers for allowed origins", () => {
    expect(getCorsHeaders("https://amrabed.com")).toEqual({
      "Access-Control-Allow-Origin": "https://amrabed.com",
      "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
      "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "86400",
    });

    expect(
      getCorsHeaders("https://amrabed.github.io")["Access-Control-Allow-Origin"],
    ).toBe("https://amrabed.github.io");

    expect(
      getCorsHeaders("https://some-project.vercel.app")[
        "Access-Control-Allow-Origin"
      ],
    ).toBe("https://some-project.vercel.app");

    expect(
      getCorsHeaders("https://some-project.web.app")[
        "Access-Control-Allow-Origin"
      ],
    ).toBe("https://some-project.web.app");
  });

  it("should fallback to amrabed.com for disallowed origins", () => {
    expect(
      getCorsHeaders("https://evil.com")["Access-Control-Allow-Origin"],
    ).toBe("https://amrabed.com");

    expect(
      getCorsHeaders("https://evilvercel.app")["Access-Control-Allow-Origin"],
    ).toBe("https://amrabed.com");

    expect(
      getCorsHeaders("https://malicious.github.io")[
        "Access-Control-Allow-Origin"
      ],
    ).toBe("https://amrabed.com");
  });

  it("should have correct OPTIONS_RESPONSE configured", async () => {
    const res = optionsResponse("https://amrabed.com");
    expect(res.status).toBe(204);
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://amrabed.com",
    );
  });

  it("should generate correct errorResponse", async () => {
    const res = errorResponse(400, "Bad Request", "https://amrabed.com");
    expect(res.status).toBe(400);
    expect(res.headers.get("Content-Type")).toBe("application/json");
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://amrabed.com",
    );

    const body = await res.json();
    expect(body).toEqual({ error: "Bad Request" });
  });
});
