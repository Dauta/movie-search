import { throttle } from "@/helpers/throttle";
import { useCallback, useEffect, useRef } from "react";

type OnScrollToBottomOptions = {
  skip?: boolean;
};

export const useOnScrollToBottomEvent = <T extends HTMLElement>(
  callback: Function,
  options: OnScrollToBottomOptions
) => {
  const containerRef = useRef<T | null>(null);

  const handleScroll = useCallback(() => {
    if (options.skip) return;
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight
    ) {
      throttle(callback, 250);
    }
  }, [callback, options.skip]);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return containerRef;
};
