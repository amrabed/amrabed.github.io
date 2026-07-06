import isRateLimited from "./ratelimit";
import sendRequest from "./request";
import { getCorsHeaders, optionsResponse, errorResponse } from "./response";

export async function OPTIONS(request: Request) {
  return optionsResponse(request.headers.get("origin"));
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
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

    if (errorMessage.includes("Message is too long")) {
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
