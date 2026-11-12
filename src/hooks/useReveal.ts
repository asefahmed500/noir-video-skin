import { useEffect } from 'react';

/**
 * Marks elements marked with `data-reveal` as visible once they enter the
 * viewport. Elements already in view on load are revealed immediately.
 */
export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');

    if (typeof IntersectionObserver === 'undefined') {
      nodes.forEach((node) => node.setAttribute('data-visible', 'true'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-visible', 'true');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);
}
