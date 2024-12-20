import { useCallback, useRef } from 'react';

export function useDebounce() {
  const timeoutRef = useRef(null);

  // returning debounced fn
  return useCallback((cb, delay) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      cb();
    }, delay);
  }, []);
}
