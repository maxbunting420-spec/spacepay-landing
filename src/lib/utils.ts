import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Parameter, APIMethod } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function titleCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function parseCurlCommand(curl: string): {
  url: string;
  method: APIMethod;
  headers: Parameter[];
  query: Parameter[];
  path: Parameter[];
  body: Parameter[];
} {
  const result: {
    url: string;
    method: APIMethod;
    headers: Parameter[];
    query: Parameter[];
    path: Parameter[];
    body: Parameter[];
  } = {
    url: "",
    method: "GET",
    headers: [],
    query: [],
    path: [],
    body: [],
  };

  // Extract method
  const methodMatch = curl.match(/-X\s+(GET|POST|PUT|PATCH|DELETE)/i);
  if (methodMatch) {
    result.method = methodMatch[1].toUpperCase() as APIMethod;
  }

  // Extract URL
  const urlMatch = curl.match(/curl\s+(?:-[^\s]+\s+)*['"]?(https?:\/\/[^\s'"]+)['"]?/);
  if (urlMatch) {
    result.url = urlMatch[1];
  }

  // Extract headers
  const headerRegex = /-H\s+['"]([^'"]+)['"]/g;
  let headerMatch;
  while ((headerMatch = headerRegex.exec(curl)) !== null) {
    const [key, ...valueParts] = headerMatch[1].split(":");
    if (key && valueParts.length) {
      result.headers.push({
        id: crypto.randomUUID(),
        key: key.trim(),
        value: valueParts.join(":").trim(),
      });
    }
  }

  // Extract body
  const bodyMatch = curl.match(/-d\s+['"]({[^}]+})['"]/);
  if (bodyMatch) {
    try {
      const bodyObj = JSON.parse(bodyMatch[1]);
      for (const [key, value] of Object.entries(bodyObj)) {
        result.body.push({
          id: crypto.randomUUID(),
          key,
          value: String(value),
        });
      }
      if (!methodMatch) result.method = "POST";
    } catch {
      // ignore parse errors
    }
  }

  return result;
}
