import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes
 * @param {...any} inputs - Class names
 * @returns {string} - Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format price to currency
 * @param {number} price - Price value
 * @returns {string} - Formatted price
 */
export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/**
 * Format date to readable string
 * @param {string|Date} date - Date value
 * @returns {string} - Formatted date
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} - Truncated text
 */
export function truncateText(text, length = 100) {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}
