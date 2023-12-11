# React Gravity Scroll

A simple component and hook to keep your container scrolled to the bottom. Docs here: https://react-gravity-scroll-docs.vercel.app/

---

When building applications that use AI completion streams you eventually run into the boring part of keeping a cointer scrolled to the bottom while a model is generating a response.

I was tired of having to build this everytime I had a chat-like experience in my applications. I couldn't find a library that worked consistently, so I built it myself with some simple concepts in mind:

- Small and dependency free
- Works with SSR
- Simple and customizable (works with Radix ScrollArea)

## Install

With npm:

```sh
npm install react-gravity-scroll
```

## Quick Start

You can simply use the `GravityScrollArea` component and that's it.

You can enable or disable the automatic scroll with the `autoScrollEnabled` prop and also set a custom `scrollThreshold` to let the component know when it should scroll to the bottom (works with both `px` and `%`).

```tsx
import { GravityScrollArea } from "react-gravity-scroll";

export default function App() {
  const { content } = ...

  return (
    <GravityScrollArea
        autoScrollEnabled
        scrollThreshold={200}
        >
        {content}
    </GravityScrollArea>
  )
}
```

## Custom gravity scroller component

You can also use the useGravityScroll hook to build your own gravity scroller component. For example let's use Radix `ScrollArea` primitive component:

```tsx
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useGravityScroll, GravityScrollAreaProps } from "react-gravity-scroll";

export function RadixGravityScroll({
  children,
  scrollThreshold,
  autoScrollEnabled,
}: GravityScrollAreaProps) {
  const { scrollAreaProps, viewportProps } = useGravityScroll({
    autoScrollEnabled,
    scrollThreshold,
  });

  return (
    <ScrollArea.Root>
      {/* The viewport is the element with overflow: scroll */}
      <ScrollArea.Viewport {...scrollAreaProps}>
        {/* Here we add the gravity viewport that contains the content of the ScrollArea */}
        <div {...viewportProps}>{children}</div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}
```
