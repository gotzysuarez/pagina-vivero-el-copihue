import React from "react";

export function GridLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
      <div className="absolute left-[25%] top-0 h-full w-px bg-white/10" />
      <div
        className="absolute left-1/2 w-px -translate-x-1/2 bg-white/10"
        style={{ height: "79.56%", top: "10.22%" }}
      />
      <div className="absolute left-[75%] top-0 h-full w-px bg-white/10" />
      <div className="absolute left-full -translate-x-px top-0 h-full w-px bg-white/10" />
    </div>
  );
}

