import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MENU_ITEMS } from "@/lib/content";
import { scrollToId } from "@/lib/hooks";
import { EMAIL_RE } from "@/components/ui/Field";
import { EASE } from "@/lib/motion";
import { TreeMark, ArrowRight, ArrowUpRight, Check } from "@/components/ui/Icons";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const reduced = useReducedMotion() ?? false;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      setError("Necesitamos un correo válido.");
      return;
    }

    setError(null);
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("done");
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#3a3b36] text-white">
      <div className="mx-auto w-full max-w-[1360px] px-5 py-20 sm:px-7 lg:px-10 lg:py-24">
        {/* Band 1: Newsletter */}
        <div className="grid gap-10 border-b border-white/10 pb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="display-tight text-[clamp(1.9rem,4.4vw,3.2rem)] text-white">
              Una carta al mes,
              <br />
              nada más.
            </h2>
            <p className="mt-5 max-w-[28rem] text-[16px] leading-[1.7] text-[#b2b3a7]">
              Mediciones en crudo, notas del taller y la primera fila cuando sale
              una pieza nueva.
            </p>
          </div>

          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0.001 : 0.45, ease: EASE }}
                  className="flex items-center gap-4 rounded-full border border-white/15 bg-white/5 px-6 py-4"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#454640]">
                    <Check className="size-4" />
                  </span>
                  <p className="text-[15px] text-white">
                    Listo. Te anotamos con{" "}
                    <span className="font-medium text-white">{email}</span>.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubscribe}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0.001 : 0.35, ease: EASE }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3 rounded-full border border-white/20 p-2 pl-6 transition-colors focus-within:border-white/60">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Correo electrónico
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="nombre@correo.com"
                      className="w-full bg-transparent text-[15px] text-white placeholder:text-white/30 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group grid h-12 shrink-0 cursor-pointer place-items-center rounded-full bg-white px-6 text-[15px] font-medium text-[#454640] transition-opacity hover:opacity-90 disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      <span className="flex items-center gap-2">
                        <span>
                          {status === "sending" ? "Enviando…" : "Suscribirme"}
                        </span>
                        <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                      </span>
                    </button>
                  </div>
                  {error && (
                    <p role="alert" className="pl-6 text-[13px] text-red-300">
                      {error}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Band 2: Columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("home");
              }}
              className="flex items-center gap-3 text-white transition-opacity hover:opacity-80 focus-visible:outline-none"
            >
              <TreeMark className="size-7 text-white" />
              <span className="font-display text-[17px] tracking-[-0.08em]">
                Arkkhe
              </span>
            </a>
            <p className="mt-5 max-w-[22rem] text-[15px] leading-[1.7] text-[#b2b3a7]">
              Estufas de biomasa hechas a mano en Girona. Menos humo, más
              bosque.
            </p>
          </div>

          {/* Navegar */}
          <div className="lg:col-span-3">
            <p className="mb-5 text-[12px] uppercase tracking-[0.2em] text-white/40">
              Navegar
            </p>
            <ul className="space-y-3">
              {MENU_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.id);
                    }}
                    className="text-[15px] text-[#b2b3a7] transition-colors hover:text-white focus-visible:outline-none"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-3">
            <p className="mb-5 text-[12px] uppercase tracking-[0.2em] text-white/40">
              Social
            </p>
            <ul className="space-y-3">
              {["Instagram", "Pinterest", "LinkedIn", "Youtube"].map(
                (platform) => (
                  <li key={platform}>
                    <a
                      href="#home"
                      className="group inline-flex items-center gap-1.5 text-[15px] text-[#b2b3a7] transition-colors hover:text-white focus-visible:outline-none"
                    >
                      <span>{platform}</span>
                      <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Taller */}
          <div className="lg:col-span-2">
            <p className="mb-5 text-[12px] uppercase tracking-[0.2em] text-white/40">
              Taller
            </p>
            <address className="not-italic text-[15px] leading-[1.7] text-[#b2b3a7]">
              Carrer del Bosc 14
              <br />
              17001 Girona
              <br />
              España
            </address>
          </div>
        </div>

        {/* Band 3: Legal */}
        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[14px] text-white/35">
            © {new Date().getFullYear()} Arkkhe. Todos los derechos reservados.
          </p>

          <div className="flex flex-wrap gap-6 text-[14px] text-white/45">
            <a href="#home" className="transition-colors hover:text-white">
              Aviso legal
            </a>
            <a href="#home" className="transition-colors hover:text-white">
              Privacidad
            </a>
            <a href="#home" className="transition-colors hover:text-white">
              Cookies
            </a>
            <a href="#home" className="transition-colors hover:text-white">
              Garantía
            </a>
          </div>

          <button
            type="button"
            onClick={() => scrollToId("home")}
            className="group flex cursor-pointer items-center gap-3 text-[14px] text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span>Volver arriba</span>
            <span className="grid size-9 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-white/50">
              <span className="transition-transform duration-500 group-hover:-translate-y-1">
                <ArrowUpRight className="size-4 -rotate-45" />
              </span>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
