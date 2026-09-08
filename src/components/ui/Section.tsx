import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { AnimatedText } from "./AnimatedText";

export interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full px-5 py-24 sm:px-7 lg:px-10 lg:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1360px]">{children}</div>
    </section>
  );
}

export interface EyebrowProps {
  children: React.ReactNode;
  index: string;
  className?: string;
}

export function Eyebrow({ children, index, className = "" }: EyebrowProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.p
      className={`flex items-center gap-4 text-[12px] uppercase tracking-[0.24em] text-[#b2b3a7] ${className}`}
      initial={{ opacity: 0, y: reduced ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduced ? 0.001 : 0.7, ease: EASE }}
    >
      <span className="text-white/40">{index}</span>
      <span className="h-px w-10 bg-white/20" />
      <span>{children}</span>
    </motion.p>
  );
}

export interface SectionTitleProps {
  lines: string[];
  className?: string;
}

export function SectionTitle({ lines, className = "" }: SectionTitleProps) {
  return (
    <AnimatedText
      as="h2"
      mode="lines"
      animateOnMount={false}
      stagger={0.1}
      lines={lines}
      className={`display-tight text-[clamp(2.1rem,5.2vw,4rem)] text-white ${className}`}
    />
  );
}

export interface FadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export function Fade({ children, delay = 0, className = "", y = 28 }: FadeProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: reduced ? 0.001 : 0.9,
        ease: EASE,
        delay: reduced ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}

