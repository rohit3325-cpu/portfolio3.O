"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

export function CursorGlow() {
  const [active, setActive] = useState(false);
  const isTouch = useMediaQuery("(pointer: coarse)");
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(true);
    };
    const handleLeave = () => setActive(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [x, y, isTouch, reducedMotion]);

  if (isTouch || reducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40 hidden h-[420px] w-[420px] rounded-full mix-blend-screen md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(59,130,246,0.16) 0%, rgba(139,92,246,0.08) 45%, transparent 75%)",
        opacity: active ? 1 : 0,
        transition: "opacity 0.4s ease",
        filter: "blur(10px)",
      }}
    />
  );
}
