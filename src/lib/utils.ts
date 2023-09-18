import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTimeToDouble(dateString: string) {
  const timestampInMilliseconds = Date.parse(dateString);
  const timestampInSeconds = timestampInMilliseconds / 1000;

  return timestampInSeconds;
}
