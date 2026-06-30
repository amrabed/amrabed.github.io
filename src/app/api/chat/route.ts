import isRateLimited from "./ratelimit";
import sendRequest from "./request";
import { CORS_HEADERS, OPTIONS_RESPONSE, errorResponse } from "./response";

export async function OPTIONS() {
  return OPTIONS_RESPONSE;
}

export async function POST(request: Request) {
  if (await isRateLimited(request)) {
    return errorResponse(
      429,
      "You've reached the daily limit. Come back tomorrow!",
    );
  }

  try {
    const result = await sendRequest(request);
    return result.toUIMessageStreamResponse({
      headers: CORS_HEADERS,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred.";

    if (errorMessage.includes("Message is too long")) {
      return errorResponse(400, errorMessage);
    }

    console.error("API error:", error);
    return errorResponse(500, "An error occurred. Please try again later.");
  }
}
