import React from "react";
import { c } from "./units";
import { DotGrid } from "@/components/ui/Icons";

export interface ProductsPillProps {
  label?: string;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export function ProductsPill({
  label = "Our Products",
  onClick,
  style,
  className = "",
}: ProductsPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: c(178),
        height: c(56),
        borderRadius: c(999),
        ...style,
      }}
      className={`group relative flex cursor-pointer items-center border border-white/40 transition-colors duration-500 hover:border-white/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className}`}
    >
      <span
        style={{
          width: c(40),
          height: c(40),
          left: c(7),
        }}
        className="absolute grid place-items-center rounded-full bg-white/7 transition-all duration-500 group-hover:bg-white/20"
      >
        <DotGrid
          style={{ width: c(11), height: c(11) }}
          className="text-white"
        />
      </span>
      <span
        style={{
          marginLeft: c(55),
          fontSize: c(16),
          lineHeight: 1.4,
        }}
        className="whitespace-nowrap font-normal text-white"
      >
        {label}
      </span>
    </button>
  );
}

