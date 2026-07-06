const ALLOWED_ORIGINS = ["https://amrabed.com", "http://localhost:3000"];

const isAllowedOrigin = (origin: string | null) => {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (origin.endsWith(".vercel.app")) return true;
  if (origin.endsWith(".onrender.com")) return true;
  if (origin.endsWith(".web.app") || origin.endsWith(".firebaseapp.com"))
    return true;
  return false;
};

export const getCorsHeaders = (origin: string | null) => {
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin)
      ? (origin as string)
      : "https://amrabed.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
};

export const optionsResponse = (origin: string | null) =>
  new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });

export function errorResponse(
  status: number,
  error: string,
  origin: string | null,
): Readonly<Response> {
  return new Response(JSON.stringify({ error: error }), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...getCorsHeaders(origin),
    },
  });
}
