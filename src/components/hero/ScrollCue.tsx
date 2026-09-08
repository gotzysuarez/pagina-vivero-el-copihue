import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { c } from "./units";

export interface ScrollCueProps {
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export function ScrollCue({ onClick, style, className = "" }: ScrollCueProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Bajar a la siguiente sección"
      style={style}
      className={`group flex cursor-pointer flex-col items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className}`}
    >
      <span
        style={{
          fontSize: c(12),
          letterSpacing: c(11),
          writingMode: "vertical-rl",
          lineHeight: 1.4,
        }}
        className="font-extralight uppercase text-white/90 transition-opacity group-hover:opacity-75"
      >
        Scroll
      </span>
      <span
        style={{
          height: c(40),
          marginTop: c(10),
        }}
        className="relative w-px overflow-hidden bg-white/25"
      >
        <motion.span
          className="absolute left-0 top-0 w-px bg-white"
          style={{ height: "40%" }}
          animate={
            reduced
              ? undefined
              : {
                  y: ["-100%", "250%"],
                }
          }
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </span>
    </button>
  );
}

