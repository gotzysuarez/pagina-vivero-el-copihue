import React from "react";
import { c } from "./units";
import { DotGrid } from "@/components/ui/Icons";

export interface FeatureCardProps {
  kicker: string;
  titleLines: string[];
  image: string;
  imageAlt: string;
  layout: "bottom" | "top";
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export function FeatureCard({
  kicker,
  titleLines,
  image,
  imageAlt,
  layout,
  onClick,
  style,
  className = "",
}: FeatureCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: c(296),
        height: c(280),
        borderRadius: c(40),
        ...style,
      }}
      className={`group relative block cursor-pointer overflow-hidden bg-[#d7d8d6] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className}`}
    >
      {layout === "bottom" ? (
        <>
          <img
            src={image}
            alt={imageAlt}
            className="pointer-events-none absolute max-w-none select-none transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            style={{
              width: "236%",
              left: "-44%",
              bottom: "-12%",
              transformOrigin: "50% 100%",
            }}
          />
          <div
            style={{
              left: c(41),
              top: c(38),
              width: c(180),
            }}
            className="absolute flex flex-col text-[#474842]"
          >
            <span
              style={{
                fontSize: c(16),
                lineHeight: 1.4,
                letterSpacing: c(-0.32),
              }}
              className="font-light"
            >
              {kicker}
            </span>
            <span
              style={{
                fontSize: c(24),
                letterSpacing: c(-2.4),
                marginTop: c(10),
                lineHeight: 1.04,
              }}
              className="font-display"
            >
              {titleLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </span>
          </div>
        </>
      ) : (
        <>
          <span
            className="absolute overflow-hidden"
            style={{
              width: c(486),
              height: c(324),
              left: c(-16),
              top: c(-13),
              transform: "rotate(-6.67deg)",
            }}
          >
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full max-w-none object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />
            <span
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(191.23deg, rgba(215,216,214,0) 73.43%, rgb(215,216,214) 88.52%)",
              }}
            />
          </span>
          <div
            style={{
              left: c(41),
              bottom: c(26),
              width: c(180),
            }}
            className="absolute flex flex-col text-[#474842]"
          >
            <span
              style={{
                fontSize: c(16),
                lineHeight: 1.4,
                letterSpacing: c(-0.32),
              }}
              className="font-light"
            >
              {kicker}
            </span>
            <span
              style={{
                fontSize: c(24),
                letterSpacing: c(-2.4),
                marginTop: c(8),
                lineHeight: 1.35,
              }}
              className="font-display"
            >
              {titleLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </span>
          </div>
        </>
      )}

      {/* White disc with DotGrid */}
      <span
        style={{
          width: c(54),
          height: c(54),
          right: c(20),
          bottom: c(20),
        }}
        className="absolute grid place-items-center rounded-full bg-white shadow-sm transition-transform duration-500 ease-out group-hover:scale-110"
      >
        <DotGrid
          style={{ width: c(11), height: c(11) }}
          className="text-[#454640]"
        />
      </span>
    </button>
  );
}
