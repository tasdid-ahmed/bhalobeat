const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

if (!configuredApiUrl && process.env.NODE_ENV === "production") {
  throw new Error("NEXT_PUBLIC_API_URL must be set for production builds.");
}

export const API_URL = (configuredApiUrl || "http://localhost:5000").replace(/\/+$/, "");

export type EventItem = {
  _id: string;
  title: string;
  description: string;
  type: string;
  thumbnail: string;
  location: string;
  date: string;
  creatorName: string;
  createdAt: string;
  updatedAt: string;
  joinedAt?: string;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  token?: string;
};

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {};
  if (options.body !== undefined) headers["Content-Type"] = "application/json";
  if (options.token) headers.Authorization = `Bearer ${options.token}`;

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: options.method ?? "GET",
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiError(
      "Cannot reach the server right now. Please check your connection and try again.",
      0
    );
  }

  const json: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof json === "object" && json !== null && "message" in json
        ? String((json as { message: unknown }).message)
        : "Something went wrong. Please try again.";
    throw new ApiError(message, response.status);
  }

  return json as T;
}

export async function getUpcomingEvents(limit?: number): Promise<EventItem[]> {
  const query = limit ? `?limit=${limit}` : "";
  const result = await apiRequest<{ data: EventItem[] }>(
    `/api/events/upcoming${query}`
  );
  return result.data;
}

export async function getEventById(id: string): Promise<EventItem> {
  const result = await apiRequest<{ data: EventItem }>(
    `/api/events/${encodeURIComponent(id)}`
  );
  return result.data;
}