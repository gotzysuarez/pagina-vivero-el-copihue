import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

export interface ParallaxProps {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}

export function Parallax({ children, distance = 60, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [distance, -distance]
  );
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={reduced ? undefined : { y }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
