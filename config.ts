type ENVType = "DEV" | "PROD";

// Determine current environment
const ENV: ENVType =
  (process.env.NEXT_PUBLIC_NODE_ENV as ENVType) === "PROD" ? "PROD" : "DEV";

// API base URLs
const API_URL: Record<ENVType, string> = {
  DEV: process.env.NEXT_PUBLIC_BASE_URL_DEV!,
  PROD: process.env.NEXT_PUBLIC_BASE_URL_PROD!,
};

// WebSocket URLs
const API_WEBSOCKET_URL: Record<ENVType, string> = {
  DEV: process.env.NEXT_PUBLIC_DEV_API_WEBSOCKET_URL!,
  PROD: process.env.NEXT_PUBLIC_BASE_URL_PROD_WEBSOCKET!,
};

// Export selected URLs
export const baseUrl = API_URL[ENV];
export const wsUrl = API_WEBSOCKET_URL[ENV];

// Other environment variables
export const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_SECRET_KEY!;
