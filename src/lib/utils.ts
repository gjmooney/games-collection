import { clsx, type ClassValue } from "clsx";
import { AES, enc } from "crypto-js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTimeToDouble(dateString: string) {
  const timestampInMilliseconds = Date.parse(dateString);
  const timestampInSeconds = timestampInMilliseconds / 1000;

  return timestampInSeconds;
}

export function decryptCookies(encryptedCookie: string) {
  const decodedCookie = decodeURIComponent(encryptedCookie);
  return AES.decrypt(decodedCookie, process.env.ENCRYPTION_KEY!).toString(
    enc.Utf8
  );
}
