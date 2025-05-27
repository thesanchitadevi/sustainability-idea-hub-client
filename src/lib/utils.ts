import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSearchParamsLink(
  searchParams: URLSearchParams | Record<string, string> | string,
  filters: Record<string, string | number | boolean | undefined>
): string {
  // Create a new URLSearchParams instance
  const params = new URLSearchParams(
    searchParams instanceof URLSearchParams
      ? searchParams
      : typeof searchParams === "string"
      ? new URLSearchParams(searchParams)
      : Object.entries(searchParams || {})
  );

  // Add or update with the new filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.set(key, String(value));
    } else {
      // Remove the parameter if value is undefined or null
      params.delete(key);
    }
  });

  // Return the search string
  return `?${params.toString()}`;
}
