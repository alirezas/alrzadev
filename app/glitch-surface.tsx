"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function GlitchSurface({ children }: { children: ReactNode }) {
  const surface = useRef<HTMLElement>(null);

  useEffect(() => {
    const words = surface.current?.querySelectorAll<HTMLElement>(".word");
    if (!words?.length) return;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const contrast = matchMedia("(forced-colors: active)");
    let nextGlitch: ReturnType<typeof setTimeout>;
    let resetGlitch: ReturnType<typeof setTimeout>;
    let activeWord: HTMLElement | undefined;

    function stop() {
      clearTimeout(nextGlitch);
      clearTimeout(resetGlitch);
      activeWord?.classList.remove("glitch");
      activeWord = undefined;
    }

    function schedule() {
      stop();
      if (motion.matches || contrast.matches || document.hidden) return;
      nextGlitch = setTimeout(() => {
        activeWord = words![Math.floor(Math.random() * words!.length)];
        activeWord.classList.add("glitch");
        resetGlitch = setTimeout(schedule, 140);
      }, 6500 + Math.random() * 11000);
    }

    motion.addEventListener("change", schedule);
    contrast.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", schedule);
    schedule();

    return () => {
      stop();
      motion.removeEventListener("change", schedule);
      contrast.removeEventListener("change", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, []);

  return <main ref={surface}>{children}</main>;
}
