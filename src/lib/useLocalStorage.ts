"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  shouldSave: boolean = true // Add shouldSave parameter
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (shouldSave) { // Only save if shouldSave is true
      try {
        const valueToStore =
          typeof storedValue === "function"
            ? storedValue(storedValue)
            : storedValue;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    }
  }, [key, storedValue, shouldSave]);

  return [storedValue, setStoredValue];
}
