import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { c } from "./units";
import { PlayTriangle } from "@/components/ui/Icons";

export interface PlayButtonProps {
  onClick: () => void;
  style?: React.CSSProperties;
  label?: string;
  className?: string;
}

export function PlayButton({
  onClick,
  style,
  label = "Ver el film",
  className = "",
}: PlayButtonProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{
        width: c(126),
        height: c(126),
        ...style,
      }}
      className={`group relative grid cursor-pointer place-items-center rounded-full border border-white/20 transition-colors duration-500 hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className}`}
    >
      {/* EFFECT-18 pulse ring */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full border border-white/25"
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 1.18, 1],
                opacity: [0.5, 0, 0.5],
              }
        }
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* White disc */}
      <span
        style={{
          width: c(42),
          height: c(42),
        }}
        className="grid place-items-center rounded-full bg-white/90 shadow-sm transition-transform duration-500 group-hover:scale-110"
      >
        <PlayTriangle
          style={{
            width: c(9.4),
            height: c(8.1),
            transform: "rotate(90deg)",
            marginLeft: c(2),
          }}
          className="text-[#454640]"
        />
      </span>
    </button>
  );
}

