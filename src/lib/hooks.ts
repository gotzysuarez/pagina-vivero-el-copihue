import { useState, useEffect, useCallback } from "react";

export const SPY_IDS = [
  "home",
  "philosophy",
  "stove",
  "impact",
  "journal",
  "questions",
  "contact",
];

export const NAV_GROUPS: Record<string, string> = {
  home: "home",
  philosophy: "home",
  stove: "stove",
  impact: "stove",
  journal: "stove",
  questions: "contact",
  contact: "contact",
};

export function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const cleanId = id.replace(/^#/, "");
  const target = document.getElementById(cleanId);
  if (!target) return;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start",
  });
}

export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked || typeof window === "undefined") return;
    const body = document.body;
    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (gap > 0) {
      body.style.paddingRight = `${gap}px`;
    }

    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}

export function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active || typeof window === "undefined") return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, onEscape]);
}

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}

export function useScrollSpy(ids: string[] = SPY_IDS, offset = 120) {
  const [activeId, setActiveId] = useState(ids[0] ?? "home");

  const update = useCallback(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    // Check if scrolled to bottom
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 2
    ) {
      setActiveId(ids[ids.length - 1]);
      return;
    }

    const line = window.scrollY + offset;
    let current = ids[0] ?? "home";

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= line) {
        current = id;
      }
    }

    setActiveId(current);
  }, [ids, offset]);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const activeGroup = NAV_GROUPS[activeId] ?? "home";

  return { activeId, activeGroup };
}
