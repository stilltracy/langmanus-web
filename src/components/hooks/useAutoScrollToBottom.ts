import { useEffect, type RefObject } from "react";

export const useAutoScrollToBottom = (
  elementRef: RefObject<HTMLElement>,
  enabled = true,
): void => {
  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const element = elementRef.current;
    const scrollToBottom = () => {
      element.scrollTop = element.scrollHeight;
    };

    scrollToBottom();

    const observer = new MutationObserver(scrollToBottom);

    observer.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [elementRef, enabled]);
};
