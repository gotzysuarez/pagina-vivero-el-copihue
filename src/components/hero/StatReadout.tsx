import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { c } from "./units";
import { EllipseRing } from "@/components/ui/Icons";
import { Counter } from "@/components/ui/Counter";

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export interface StatReadoutProps {
  items: StatItem[];
  style?: React.CSSProperties;
  className?: string;
  stacked?: boolean;
}

export function StatReadout({
  items,
  style,
  className = "",
  stacked = false,
}: StatReadoutProps) {
  const reduced = useReducedMotion() ?? false;

  return (
    <div
      style={{
        width: stacked ? undefined : c(216),
        ...style,
      }}
      className={className}
    >
      {items.map((item, index) => {
        const isSecond = index === 1;
        return (
          <div
            key={item.label}
            style={{
              gap: c(9),
              marginLeft: isSecond && !stacked ? c(60) : undefined,
              marginTop: isSecond ? (stacked ? c(20) : c(82)) : undefined,
            }}
            className="flex items-start"
          >
            <motion.div
              style={{
                width: c(31),
                height: c(31),
              }}
              className="shrink-0 text-white/60"
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{
                duration: 26,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <EllipseRing className="h-full w-full" />
            </motion.div>
            <div
              style={{ gap: c(5) }}
              className="flex flex-col"
            >
              <span
                style={{
                  fontSize: c(14),
                  lineHeight: 1.4,
                }}
                className="text-[#b2b3a7]"
              >
                {item.label}
              </span>
              <Counter
                value={item.value}
                suffix={item.suffix}
                style={{
                  fontSize: c(14),
                  lineHeight: 1.4,
                }}
                className="font-medium text-white"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
