"use client";

import { ApiError, apiRequest } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export async function authedRequest<T>(
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<T> {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new ApiError("Your session has expired. Please log in again.", 401);
  }

  return apiRequest<T>(path, { ...options, token: data.token });
}