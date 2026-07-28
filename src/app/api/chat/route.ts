import isRateLimited from "./ratelimit";
import sendRequest from "./request";
import {
  getCorsHeaders,
  optionsResponse,
  errorResponse,
  isAllowedOrigin,
} from "./response";

export async function OPTIONS(request: Request) {
  return optionsResponse(request.headers.get("origin"));
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");

  if (!isAllowedOrigin(origin)) {
    return errorResponse(403, "Forbidden: Invalid origin", origin);
  }

  if (await isRateLimited(request)) {
    return errorResponse(
      429,
      "You've reached the daily limit. Come back tomorrow!",
      origin,
    );
  }

  try {
    const result = await sendRequest(request);
    return result.toUIMessageStreamResponse({
      headers: getCorsHeaders(origin),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred.";

    // Classify client-side payload validation issues (e.g. malformed JSON, invalid/empty messages) as 400 Bad Request
    // to prevent server log pollution and correctly reflect client error.
    if (
      error instanceof SyntaxError ||
      errorMessage.includes("JSON") ||
      errorMessage.includes("Message is too long") ||
      errorMessage.includes("Invalid request")
    ) {
      return errorResponse(400, errorMessage, origin);
    }

    console.error("API error:", error);
    return errorResponse(
      500,
      "An error occurred. Please try again later.",
      origin,
    );
  }
}
