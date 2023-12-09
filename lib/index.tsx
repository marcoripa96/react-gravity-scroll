import { HTMLAttributes, forwardRef } from "react";
import { UseGravityScrollProps, useGravityScroll } from "./useGravityScroll";

export type GravityScrollAreaProps = HTMLAttributes<HTMLDivElement> &
  UseGravityScrollProps;

const GravityScrollArea = forwardRef<HTMLDivElement, GravityScrollAreaProps>(
  (
    { autoScrollEnabled = true, scrollThreshold = 100, children, ...props },
    inputRef
  ) => {
    const { scrollAreaProps, viewportProps } = useGravityScroll({
      scrollAreaRef: inputRef,
      autoScrollEnabled,
      scrollThreshold,
    });

    return (
      <div {...props} {...scrollAreaProps}>
        {/* We use this wrapper so that we can easily check if the content size changes with the resize observer */}
        <div {...viewportProps}>{children}</div>
      </div>
    );
  }
);

GravityScrollArea.displayName = "GravityScrollArea";

export { GravityScrollArea };
