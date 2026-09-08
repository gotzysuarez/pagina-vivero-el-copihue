import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
}

export function TreeMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24.0083 24.0083"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M11.7172 2.46544C11.4231 2.45844 11.129 2.46594 10.8349 2.48795C9.65997 2.58248 8.49857 2.9231 7.57575 3.61334C6.80149 4.19254 6.30932 5.10635 6.14276 6.16572C5.4075 6.24075 4.67225 6.31877 4.13206 6.70591C3.42982 7.21008 3.00067 8.05637 3.00067 9.0032C3.00067 9.93953 3.40131 10.7888 4.09905 11.299C4.63174 11.6861 5.28446 11.8932 6.02872 11.9697C6.15926 13.6428 6.75347 14.9408 7.57876 15.9491C8.23298 16.7489 9.01175 17.3716 9.80552 17.9298C9.31936 18.9411 9.00275 20.1821 9.00275 21.7576C9.00275 21.9566 9.08179 22.1474 9.22249 22.2881C9.36319 22.4288 9.55403 22.5079 9.75301 22.5079H11.2535C11.4525 22.5079 11.6433 22.4288 11.784 22.2881C11.9247 22.1474 12.0038 21.9566 12.0038 21.7576C12.0038 18.9126 12.8546 17.241 13.8419 15.8051C14.7152 14.5341 15.7416 13.4447 16.2713 11.9937C17.3096 11.9442 18.3405 11.7386 19.2123 11.254C20.2311 10.6883 21.0069 9.62892 21.0069 8.25294C21.0069 6.87697 20.2311 5.8176 19.2138 5.2519C18.3195 4.75673 17.2406 4.63519 16.1767 4.59168C15.7506 3.84142 15.0648 3.27122 14.2171 2.94111C13.4169 2.64136 12.5715 2.48049 11.7172 2.46544ZM7.53224 12.0042H10.5288C10.6338 13.4807 11.048 14.6437 11.5866 15.4854C11.2249 15.8457 10.8899 16.2319 10.5843 16.6408C9.87905 16.1367 9.23983 15.613 8.73866 14.9993C8.10244 14.225 7.65528 13.3127 7.53224 12.0042ZM12.0338 12.0042H14.5202C14.2321 12.5414 13.8194 13.1131 13.4053 13.6698C13.1762 13.9159 12.9391 14.159 12.694 14.3991C12.3879 13.8199 12.1238 13.0246 12.0338 12.0042ZM18.0059 15.0053C15.7551 15.0053 15.0048 15.7555 15.0048 18.0063C17.2556 18.0063 18.0059 17.2561 18.0059 15.0053Z" />
    </svg>
  );
}

export function DotGrid({ className, ...props }: IconProps) {
  const points = [1.37047, 5.50007, 9.62943];
  return (
    <svg
      viewBox="0 0 11 11"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {points.flatMap((cy, row) =>
        points.map((cx, col) => {
          const isCorner = (row === 0 || row === 2) && (col === 0 || col === 2);
          return (
            <circle
              key={`${row}-${col}`}
              cx={cx}
              cy={cy}
              r={1.37047}
              opacity={isCorner ? 0.5 : 1}
            />
          );
        })
      )}
    </svg>
  );
}

export function PlayTriangle({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 8.13854 7.04818"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M4.06927 0L8.13854 7.04818H0L4.06927 0Z" />
    </svg>
  );
}

export function EllipseRing({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={i}
          cx="16"
          cy="16"
          rx="3.72"
          ry="6.91"
          strokeWidth="0.6"
          transform={`rotate(${i * 15} 16 16)`}
          opacity={0.35 + (i % 3) * 0.2}
        />
      ))}
    </svg>
  );
}

export function ArrowUpRight({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M7 17L17 7M17 7H8M17 7V16" />
    </svg>
  );
}

export function ArrowRight({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M4 12H20M20 12L14 6M20 12L14 18" />
    </svg>
  );
}

export function Plus({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 5V19M5 12H19" />
    </svg>
  );
}

export function Close({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M6 6L18 18M18 6L6 18" />
    </svg>
  );
}

export function Check({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M5 12.5L10 17.5L19 7" />
    </svg>
  );
}
