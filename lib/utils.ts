export const isClient = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export const isApiSupported = (api: string): boolean =>
  typeof window !== "undefined" ? api in window : false;

/**
 * Check if the container is scrolled to the bottom
 */
export function isScrolledToBottom(
  element: HTMLElement,
  threshold: number | string
) {
  let thresholdInPixels;

  if (typeof threshold === "string") {
    if (threshold.endsWith("%")) {
      // Convert percentage to a decimal and calculate pixel value
      const percentage = parseFloat(threshold.slice(0, -1)) / 100;
      thresholdInPixels = element.scrollHeight * percentage;
    } else if (threshold.endsWith("px")) {
      thresholdInPixels = parseFloat(threshold.slice(0, -2));
    } else {
      throw new Error(
        'scrollThreshold must be a number or string representing pixels or a percentage and must end either with "px" or "%".'
      );
    }
  } else {
    // Use the threshold as a pixel value directly
    thresholdInPixels = threshold;
  }

  return (
    element.scrollHeight - element.scrollTop - thresholdInPixels <=
    element.clientHeight
  );
}
