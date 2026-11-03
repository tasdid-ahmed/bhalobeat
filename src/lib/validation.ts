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