const ALLOWED_ORIGINS = [
  "https://amrabed.com",
  "https://amrabed.github.io",
  "http://localhost:3000",
];

export const isAllowedOrigin = (origin: string | null) => {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;

  try {
    const { hostname } = new URL(origin);
    const isSubdomainOf = (domain: string) =>
      hostname === domain || hostname.endsWith(`.${domain}`);

    return (
      isSubdomainOf("vercel.app") ||
      isSubdomainOf("onrender.com") ||
      isSubdomainOf("web.app") ||
      isSubdomainOf("firebaseapp.com")
    );
  } catch {
    return false;
  }
};

export const getCorsHeaders = (origin: string | null) => {
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin)
      ? (origin as string)
      : "https://amrabed.com",
    "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
    "Access-Control-Allow-Credentials": "true",
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
