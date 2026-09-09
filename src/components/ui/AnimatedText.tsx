import React from "react";
import { motion, MotionStyle, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

export interface AnimatedTextProps {
  lines: string[];
  mode?: "chars" | "lines";
  className?: string;
  style?: MotionStyle;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
  animateOnMount?: boolean;
}

export function AnimatedText({
  lines,
  mode = "chars",
  className,
  style,
  lineClassName,
  delay = 0,
  stagger,
  as = "div",
  animateOnMount = true,
}: AnimatedTextProps) {
  const reduced = useReducedMotion() ?? false;
  const Tag = (motion as any)[as] || motion.div;
  const step = stagger ?? (mode === "chars" ? 0.028 : 0.12);

  let globalCharIndex = 0;

  return (
    <Tag
      className={className}
      style={style}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: reduced ? 0 : delay,
          },
        },
      }}
      initial="hidden"
      {...(animateOnMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, amount: 0.4 } })}
    >
      {lines.map((line, lineIdx) => {
        if (mode === "lines") {
          const pieceDelay = lineIdx * step;
          return (
            <span
              key={lineIdx}
              className={`block overflow-hidden ${lineClassName ?? ""}`}
            >
              <motion.span
                className="block will-change-transform"
                variants={{
                  hidden: {
                    y: reduced ? 0 : "110%",
                    opacity: reduced ? 0 : 1,
                  },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: reduced ? 0.001 : 0.8,
                      ease: EASE,
                      delay: reduced ? 0 : pieceDelay,
                    },
                  },
                }}
              >
                {line}
              </motion.span>
            </span>
          );
        }

        // mode === "chars"
        const chars = Array.from(line);
        return (
          <span
            key={lineIdx}
            className={`block overflow-hidden ${lineClassName ?? ""}`}
          >
            {chars.map((char, charIdx) => {
              const own = globalCharIndex++;
              const pieceDelay = own * step;
              const displayChar = char === " " ? "\u00A0" : char;
              return (
                <motion.span
                  key={charIdx}
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: {
                      y: reduced ? 0 : "110%",
                      opacity: reduced ? 0 : 1,
                    },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: reduced ? 0.001 : 0.8,
                        ease: EASE,
                        delay: reduced ? 0 : pieceDelay,
                      },
                    },
                  }}
                >
                  {displayChar}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
