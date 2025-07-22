import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isPositiveInt(value: unknown) {
  return Number.isInteger(value)
    && (value as number > 0);
}
