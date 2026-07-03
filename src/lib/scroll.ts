import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenisInstance(instance: Lenis | null) {
  lenisInstance = instance;
}

export function scrollToSection(target: string, offset = -88) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : null;
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
