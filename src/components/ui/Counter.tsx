import React, { useRef, useState, useEffect } from "react";
import { useInView, useReducedMotion, animate, MotionStyle } from "framer-motion";

export interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
  style?: MotionStyle | React.CSSProperties;
  duration?: number;
}

export function Counter({
  value,
  suffix = "",
  className = "",
  style,
  duration = 1.6,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion() ?? false;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className} style={style as React.CSSProperties}>
      {display.toLocaleString("es-ES")}
      {suffix}
    </span>
  );
}

