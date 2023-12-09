import { MutableRefObject, RefObject, useEffect, useRef } from "react";

export type ReactRefObject<T> =
  | MutableRefObject<T>
  | RefObject<T>
  | ((instance: T | null) => void)
  | null;

/**
 * Combine forwarded ref with local ref
 */
export function useCombinedRefs<T>(ref: ReactRefObject<T>) {
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === "function") {
      (ref as (instance: T | null) => void)(targetRef.current);
    } else if ("current" in ref) {
      (ref as MutableRefObject<T | null>).current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
}
