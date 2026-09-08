import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLockBodyScroll, useEscape } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { Close } from "./Icons";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: "center" | "sheet";
  maxWidth?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  variant = "center",
  maxWidth = "560px",
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const prevActiveElement = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion() ?? false;

  useLockBodyScroll(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (!open) return;
    prevActiveElement.current = document.activeElement as HTMLElement | null;

    const timer = setTimeout(() => {
      if (panelRef.current) {
        const focusable = panelRef.current.querySelector<HTMLElement>(
          "input, textarea, select, button, [href], [tabindex]:not([tabindex='-1'])"
        );
        focusable?.focus();
      }
    }, 50);

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusableEls = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableEls.length === 0) return;
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTabKey);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleTabKey);
      if (prevActiveElement.current) {
        prevActiveElement.current.focus();
      }
    };
  }, [open]);

  if (typeof document === "undefined") return null;

  const panelVariants =
    variant === "center"
      ? {
          hidden: {
            opacity: 0,
            y: reduced ? 0 : 24,
            scale: reduced ? 1 : 0.97,
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: reduced ? 0.001 : 0.5, ease: EASE },
          },
          exit: {
            opacity: 0,
            y: reduced ? 0 : 20,
            scale: reduced ? 1 : 0.97,
            transition: { duration: reduced ? 0.001 : 0.3, ease: EASE },
          },
        }
      : {
          hidden: {
            opacity: 0,
            y: reduced ? 0 : 60,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reduced ? 0.001 : 0.5, ease: EASE },
          },
          exit: {
            opacity: 0,
            y: reduced ? 0 : 40,
            transition: { duration: reduced ? 0.001 : 0.3, ease: EASE },
          },
        };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center"
          aria-labelledby={title ? "modal-title" : undefined}
        >
          {/* Scrim */}
          <motion.button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="fixed inset-0 cursor-default bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.001 : 0.35, ease: EASE }}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title || "Diálogo"}
            style={{ maxWidth }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 max-h-[92svh] w-full overflow-y-auto rounded-t-[32px] border border-white/10 bg-[#3a3b36] p-7 shadow-2xl sm:rounded-[32px] sm:p-9"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Close className="size-5" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

