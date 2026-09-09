import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

export interface BurgerButtonProps {
  open: boolean;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function BurgerButton({ open, onClick, className = "", style }: BurgerButtonProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls="menu-overlay"
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      onClick={onClick}
      style={style}
      className={`relative flex h-[18px] w-[32px] cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className}`}
    >
      <motion.span
        className="absolute left-0 block h-px w-full bg-white"
        animate={{
          y: open ? 0 : -4,
          rotate: open ? 45 : 0,
        }}
        transition={{ duration: reduced ? 0.001 : 0.35, ease: EASE }}
      />
      <motion.span
        className="absolute left-0 block h-px w-full bg-white"
        animate={{
          y: open ? 0 : 4,
          rotate: open ? -45 : 0,
        }}
        transition={{ duration: reduced ? 0.001 : 0.35, ease: EASE }}
      />
    </button>
  );
}
