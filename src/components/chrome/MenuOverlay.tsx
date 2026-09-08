import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MENU_ITEMS } from "@/lib/content";
import { IMAGES } from "@/lib/assets";
import { useLockBodyScroll, useEscape } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { TreeMark, Close, ArrowUpRight } from "@/components/ui/Icons";

const PREVIEWS: Record<string, string> = {
  home: IMAGES.heroBackdrop,
  philosophy: IMAGES.mossBranch,
  stove: IMAGES.mossRock,
  impact: IMAGES.mossRidge,
  journal: IMAGES.mossWave,
  questions: IMAGES.mossDark,
  contact: IMAGES.mossRidge,
};

export interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onOpenLogin: () => void;
}

export function MenuOverlay({
  open,
  onClose,
  onNavigate,
  onOpenLogin,
}: MenuOverlayProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  useLockBodyScroll(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        const firstFocusable = panelRef.current?.querySelector<HTMLElement>("a, button");
        firstFocusable?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setHoveredId(null);
    }
  }, [open]);

  const activePreview = hoveredId ? PREVIEWS[hoveredId] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-overlay"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
          className="fixed inset-0 z-[100] overflow-y-auto bg-[#33342f] text-white"
          initial={{
            opacity: 0,
            clipPath: reduced ? undefined : "inset(0 0 100% 0)",
          }}
          animate={{
            opacity: 1,
            clipPath: reduced ? undefined : "inset(0 0 0% 0)",
          }}
          exit={{
            opacity: 0,
            clipPath: reduced ? undefined : "inset(0 0 100% 0)",
          }}
          transition={{ duration: reduced ? 0.001 : 0.7, ease: EASE }}
        >
          {/* Hover Preview Panel (Desktop) */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden lg:block">
            <AnimatePresence mode="wait">
              {activePreview && (
                <motion.img
                  key={hoveredId}
                  src={activePreview}
                  alt=""
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 0.25, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0.001 : 0.6, ease: EASE }}
                  className="h-full w-full object-cover"
                />
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-[#33342f] via-[#33342f]/40 to-transparent" />
          </div>

          {/* Inner content */}
          <div className="relative z-10 mx-auto flex min-h-full w-full max-w-[1440px] flex-col justify-between px-6 py-6 sm:px-10 sm:py-8 lg:px-12 lg:py-10">
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <button
                type="button"
                onClick={() => {
                  onNavigate("home");
                }}
                className="flex items-center gap-3 text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <TreeMark className="size-6 text-white" />
                <span className="font-display text-[15px] tracking-[-0.08em]">
                  Arkkhe
                </span>
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className="grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-white/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <Close className="size-5" />
              </button>
            </div>

            {/* Nav list */}
            <nav className="my-10 lg:my-14" aria-label="Navegación del menú">
              <ul className="divide-y divide-white/10 border-t border-white/10">
                {MENU_ITEMS.map((item, index) => {
                  const numStr = String(index + 1).padStart(2, "0");
                  return (
                    <li key={item.id} className="overflow-hidden">
                      <motion.a
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(item.id);
                        }}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onFocus={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        initial={{ y: reduced ? 0 : "110%" }}
                        animate={{ y: 0 }}
                        transition={{
                          duration: reduced ? 0.001 : 0.75,
                          ease: EASE,
                          delay: reduced ? 0 : 0.15 + index * 0.06,
                        }}
                        className="group flex items-baseline gap-5 py-4 text-white/85 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:py-6"
                      >
                        <span className="w-8 shrink-0 text-[11px] font-light tracking-[0.2em] text-[#b2b3a7]">
                          {numStr}
                        </span>
                        <span className="display-tight text-[clamp(2rem,7vw,4.5rem)] text-white">
                          {item.label}
                        </span>
                        <ArrowUpRight className="ml-auto size-6 shrink-0 translate-y-[-4px] opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100" />
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer 4-column info block */}
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0.001 : 0.7,
                ease: EASE,
                delay: reduced ? 0 : 0.6,
              }}
              className="grid gap-8 border-t border-white/10 pt-8 text-[14px] text-[#b2b3a7] sm:grid-cols-2 lg:grid-cols-4"
            >
              <div>
                <p className="mb-2 text-[12px] uppercase tracking-[0.2em] text-white/40">
                  Taller
                </p>
                <p className="text-white/80">Carrer del Bosc 14</p>
                <p>17001 Girona, España</p>
              </div>
              <div>
                <p className="mb-2 text-[12px] uppercase tracking-[0.2em] text-white/40">
                  Contacto
                </p>
                <p>
                  <a
                    href="mailto:hola@arkkhe.studio"
                    className="text-white/80 transition-colors hover:text-white focus-visible:outline-none"
                  >
                    hola@arkkhe.studio
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+34972000000"
                    className="transition-colors hover:text-white focus-visible:outline-none"
                  >
                    +34 972 00 00 00
                  </a>
                </p>
              </div>
              <div>
                <p className="mb-2 text-[12px] uppercase tracking-[0.2em] text-white/40">
                  Social
                </p>
                <div className="flex gap-4">
                  <a
                    href="#home"
                    className="transition-colors hover:text-white focus-visible:outline-none"
                  >
                    Instagram
                  </a>
                  <a
                    href="#home"
                    className="transition-colors hover:text-white focus-visible:outline-none"
                  >
                    Pinterest
                  </a>
                  <a
                    href="#home"
                    className="transition-colors hover:text-white focus-visible:outline-none"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <div className="flex items-end sm:items-start lg:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenLogin();
                  }}
                  className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-[14px] font-medium text-white transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Área de cliente
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

