import { useRef } from "react";
import { isScrolledToBottom } from "./utils";

import { ReactRefObject, useCombinedRefs } from "./useCombinedRefs";
import { useIsomorphicEffect } from "./useIsomorphicEffect";
import styles from "./styles.module.css";

// const styles = stylex.create({
//   base: {
//     overflowY: "auto",
//   },
//   viewport: {
//     width: "100%",
//   },
// });

export type UseGravityScrollProps = {
  /**
   * This prop acts as a toggle to enable or disable automatic scrolling to the bottom when new content is added.
   * If set to true, the container will automatically scroll to the bottom on content changes.
   * If false, it will maintain the current scroll position.
   * @default autoScrollEnabled = true
   */
  autoScrollEnabled?: boolean;
  /**
   * Defines the threshold distance from the bottom of the container.
   * If the user's scroll position is within this threshold, the container will automatically scroll to the bottom when new content is added.
   * The value should be a number or string representing pixels or a percentage string
   * @example
   * scrollThreshold = 100
   * scrollThreshold = "100px"
   * scrollThreshold = "20%"
   *
   * @default scrollThreshold = 100
   */
  scrollThreshold: number | string;
  scrollAreaRef?: ReactRefObject<HTMLDivElement>;
};

const defaultOptions: UseGravityScrollProps = {
  autoScrollEnabled: true,
  scrollThreshold: 100,
};

export function useGravityScroll(options?: UseGravityScrollProps) {
  const resolvedOptions = { ...defaultOptions, ...options };

  const {
    autoScrollEnabled,
    scrollThreshold,
    scrollAreaRef: scrollAreaRefProp,
  } = resolvedOptions;

  const scrollAreaRef = scrollAreaRefProp
    ? useCombinedRefs(scrollAreaRefProp)
    : useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicEffect(() => {
    const handleScroll = () => {
      if (
        !scrollAreaRef.current ||
        !viewportRef.current ||
        !autoScrollEnabled
      ) {
        return;
      }

      if (!isScrolledToBottom(scrollAreaRef.current, scrollThreshold)) {
        return;
      }

      scrollAreaRef.current.scrollTop = viewportRef.current.clientHeight;
    };

    if (!viewportRef.current) {
      return;
    }

    const observer = new ResizeObserver(handleScroll);
    observer.observe(viewportRef.current);

    return () => {
      observer.disconnect();
    };
  }, [autoScrollEnabled, scrollThreshold]);

  return {
    scrollAreaProps: {
      ref: scrollAreaRef,
      className: styles.scrollArea,
    },
    viewportProps: {
      ref: viewportRef,
      className: styles.viewPort,
    },
  };
}
