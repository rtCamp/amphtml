import {observeIntersections} from '#core/dom/layout/viewport-observer';

import {useCallback, useRef} from '#preact';

/**
 * Uses a shared IntersectionObserver per window instance to observe the given `ref`.
 *
 * @param {function(IntersectionObserverEntry)} callback
 * @param opts
 * @return {function(Element)}
 */
export function useIntersectionObserver(callback, opts = {}) {
  const unobserveRef = useRef(null);
  const refCb = useCallback(
    (node) => {
      const cleanup = unobserveRef.current;
      if (cleanup) {
        cleanup();
        unobserveRef.current = null;
      }

      if (!node) {
        return;
      }
      unobserveRef.current = observeIntersections(node, callback, opts);
    },
    [callback, opts]
  );

  return refCb;
}
