import type { Directive } from "vue";
export const vReveal: Directive<HTMLElement, void> = {
  mounted(el) {
    el.classList.add("reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            obs.unobserve(e.target as Element);
          }
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
  },
};
