import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useGravityScroll } from "../lib/useGravityScroll";
import { PropsWithChildren } from "react";
import { GravityScrollAreaProps } from "../lib/GravityScrollArea";

export function RadixAutoScroll({
  children,
  scrollThreshold,
  autoScrollEnabled,
}: GravityScrollAreaProps) {
  const { scrollAreaProps, viewportProps } = useGravityScroll({
    autoScrollEnabled,
    scrollThreshold,
  });

  return (
    <ScrollArea.Root
      style={{
        width: 600,
        height: 300,
        border: "1px solid #000",
        whiteSpace: "pre-wrap",
      }}
    >
      <ScrollArea.Viewport {...scrollAreaProps}>
        <div {...viewportProps}>{children}</div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="vertical" style={{ width: "8px" }}>
        <ScrollArea.Thumb style={{ background: "rgba(0,0,0,0.1)" }} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}
