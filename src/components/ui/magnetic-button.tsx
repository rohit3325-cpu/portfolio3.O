"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  strength?: number;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
  children: React.ReactNode;
}

export function MagneticButton({
  as = "button",
  href,
  target,
  rel,
  strength = 0.35,
  className,
  onClick,
  children,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const sharedClassName = cn(
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-medium transition-colors",
    className
  );
  const sharedStyle = { x: springX, y: springY };

  if (as === "a") {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={sharedStyle}
        className={sharedClassName}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={sharedStyle}
      className={sharedClassName}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
