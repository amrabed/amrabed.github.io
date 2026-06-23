export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

export const OPTIONS_RESPONSE = new Response(null, {
  status: 204,
  headers: CORS_HEADERS,
});

export function errorResponse(
  status: number,
  error: string,
): Readonly<Response> {
  return new Response(JSON.stringify({ error: error }), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}
