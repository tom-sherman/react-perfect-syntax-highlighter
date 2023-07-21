import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidTheme(
  theme: string
): theme is "nord" | "github-dark" | "github-light" {
  return ["nord", "github-dark", "github-light"].includes(theme);
}
