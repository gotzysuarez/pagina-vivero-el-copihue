import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLockBodyScroll, useEscape } from "@/lib/hooks";
import { BRAND_FILM } from "@/lib/assets";
import { EASE } from "@/lib/motion";
import { Close } from "./Icons";

export interface MediaLightboxProps {
  open: boolean;
  onClose: () => void;
}

export function MediaLightbox({ open, onClose }: MediaLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(true);
  const reduced = useReducedMotion() ?? false;

  useLockBodyScroll(open);
  useEscape(open, onClose);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (open) {
      try {
        videoRef.current.currentTime = 0;
      } catch {
        // ignore
      }
      void videoRef.current.play().catch(() => undefined);
    } else {
      videoRef.current.pause();
    }
  }, [open]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Film de taller"
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-7"
        >
          {/* Scrim */}
          <motion.button
            type="button"
            aria-label="Cerrar reproductor"
            onClick={onClose}
            className="fixed inset-0 cursor-default bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.001 : 0.35, ease: EASE }}
          />

          {/* Close button top right */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar reproductor"
            className="fixed right-5 top-5 z-20 grid size-11 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <Close className="size-6" />
          </button>

          {/* Player figure */}
          <motion.figure
            className="relative z-10 w-full max-w-[1100px]"
            initial={{ opacity: 0, scale: reduced ? 1 : 0.96, y: reduced ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 0.96, y: reduced ? 0 : 16 }}
            transition={{ duration: reduced ? 0.001 : 0.45, ease: EASE }}
          >
            <video
              ref={videoRef}
              src={BRAND_FILM.mp4}
              poster={BRAND_FILM.poster}
              className="aspect-video w-full rounded-[24px] bg-black object-cover shadow-2xl"
              controls
              loop
              playsInline
              muted={muted}
              preload="metadata"
            />
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-4 px-2 text-[14px] text-[#b2b3a7]">
              <p>
                <span className="text-white">Find your inner green</span> — film
                de taller, 2026
              </p>
              <button
                type="button"
                onClick={() => setMuted((prev) => !prev)}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[13px] text-white transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {muted ? "Activar sonido" : "Silenciar"}
              </button>
            </figcaption>
          </motion.figure>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
