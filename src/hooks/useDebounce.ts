import { useEffect, useState } from "react";

export default function useDebounce(value: string, ms = 1000) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);
    return () => {
      clearTimeout(id);
    };
  }, [value, ms]);

  return [debouncedValue, setDebouncedValue];
}
