import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrencyCode(currencyName: string | undefined): string {
  if (!currencyName) {
    return 'USD';
  }

  const lowerCaseCurrency = currencyName.toLowerCase();
  
  const currencyMap: { [key: string]: string } = {
    'uk pounds': 'GBP',
    'us dollar': 'USD',
    'euros': 'EUR',
    'canadian dollar': 'CAD',
    'australian dollar': 'AUD',
    'yen': 'JPY',
    'rupees': 'INR',
    'pound sterling': 'GBP'
  };

  for (const key in currencyMap) {
    if (lowerCaseCurrency.includes(key)) {
      return currencyMap[key];
    }
  }
  
  // Fallback for 3-letter codes that are already correct
  if (currencyName.length === 3) {
      return currencyName.toUpperCase();
  }

  return 'USD'; // Default fallback
}
