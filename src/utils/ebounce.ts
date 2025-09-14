import { useState, useEffect } from "react";

// Reusable debounce hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // cleanup
    };
  }, [value, delay]);

  return debouncedValue;
}
