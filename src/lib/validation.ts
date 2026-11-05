import { todayInDhaka } from "@/lib/format";

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(value: string): string | null {
  const name = value.trim();
  if (!name) return "Please enter your name.";
  if (name.length < 2) return "Name must be at least 2 characters long.";
  return null;
}

export function validateEmail(value: string): string | null {
  if (!value.trim()) return "Please enter your email address.";
  if (!EMAIL_REGEX.test(value.trim())) return "Please enter a valid email address.";
  return null;
}

export function validatePassword(value: string): string | null {
  if (value.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(value)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(value)) return "Password must include a lowercase letter.";
  return null;
}

export function validateUrl(value: string, label = "URL"): string | null {
  if (!value.trim()) return `Please enter the ${label}.`;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error();
    return null;
  } catch {
    return `Please enter a valid ${label} starting with http:// or https://.`;
  }
}

// Only allow redirects to paths inside this site.
export function getSafeRedirect(value: string | null): string {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

// Keeps only the fields that failed validation.
export function collectErrors<K extends string>(
  checks: Record<K, string | null>
): FieldErrors<K> {
  const errors: FieldErrors<K> = {};
  for (const key of Object.keys(checks) as K[]) {
    const message = checks[key];
    if (message) errors[key] = message;
  }
  return errors;
}

export function validateText(
  value: string,
  label: string,
  min: number,
  max: number
): string | null {
  const text = value.trim();
  if (!text) return `Please enter the ${label}.`;
  if (text.length < min) return `The ${label} must be at least ${min} characters.`;
  if (text.length > max) return `The ${label} must be at most ${max} characters.`;
  return null;
}

export function validateSelect(
  value: string,
  label: string,
  options: readonly string[]
): string | null {
  if (!value) return `Please choose the ${label}.`;
  if (!options.includes(value)) return `Please choose a valid ${label}.`;
  return null;
}

// Today's date in Dhaka as YYYY-MM-DD (the same rule the server uses).
export function todayInputValue(): string {
  return todayInDhaka();
}

export function validateEventDate(value: string): string | null {
  if (!value) return "Please choose the event date.";
  const parsed = new Date(`${value}T00:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== value
  ) {
    return "Please enter a valid event date.";
  }
  if (value < todayInputValue()) return "Event date cannot be in the past.";
  return null;
}