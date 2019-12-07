import { useEffect, useRef, useState } from 'react';

export function useRafDebouncedValue<T>(value: T) {
  const [debouncedState, setDebouncedState] = useState(value);
  const queued = useRef<number>();

  useEffect(() => {
    queued.current = requestAnimationFrame(() => setDebouncedState(value));
    return () => {
      queued.current && cancelAnimationFrame(queued.current);
    };
  }, [value, setDebouncedState]);

  useEffect(() => {
    return () => {
      queued.current && cancelAnimationFrame(queued.current);
    };
  }, []);

  return [debouncedState];
}
