import type { Directive } from "vue";
export const vTilt: Directive<HTMLElement, void> = {
  mounted(el) {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    el.style.transformStyle = "preserve-3d";
    el.style.transition = "transform 200ms ease";
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - y) * 20;
      const ry = (x - 0.5) * 20;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    };
    const onLeave = () => {
      el.style.transform =
        "perspective(800px) rotateX(0) rotateY(0) translateZ(0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    (el as any)._tiltCleanup = () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  },
  beforeUnmount(el: any) {
    el._tiltCleanup && el._tiltCleanup();
  },
};
