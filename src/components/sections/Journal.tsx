import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { JOURNAL } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Modal } from "@/components/ui/Modal";
import { ArrowUpRight } from "@/components/ui/Icons";

export function Journal() {
  const [activeNote, setActiveNote] = useState<(typeof JOURNAL)[number] | null>(
    null
  );
  const reduced = useReducedMotion() ?? false;

  return (
    <Section id="journal" className="border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow index="04">Journal</Eyebrow>
          <SectionTitle lines={["Notas del taller."]} className="mt-7" />
        </div>
        <p className="max-w-[24rem] text-[16px] leading-[1.7] text-[#b2b3a7]">
          Lo que aprendemos midiendo, quemando y rompiendo cosas. Sin campaña
          detrás.
        </p>
      </div>

      {/* Grid */}
      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {JOURNAL.map((note, index) => (
          <motion.li
            key={note.id}
            initial={{ opacity: 0, y: reduced ? 0 : 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: reduced ? 0.001 : 0.85,
              ease: EASE,
              delay: reduced ? 0 : index * 0.1,
            }}
          >
            <button
              type="button"
              onClick={() => setActiveNote(note)}
              className="group block h-full w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span className="block overflow-hidden rounded-[32px] bg-[#3a3b36]">
                <img
                  src={note.image}
                  alt={note.title}
                  className="aspect-[5/4] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </span>

              <div className="mt-6 flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-[#b2b3a7]">
                <span>{note.kicker}</span>
                <span className="h-px w-6 bg-white/20" />
                <span>{note.readingTime}</span>
              </div>

              <div className="mt-3 flex items-start justify-between gap-4">
                <h3 className="font-display text-[clamp(1.2rem,2.2vw,1.6rem)] leading-[1.15] tracking-[-0.09em] text-white">
                  {note.title}
                </h3>
                <ArrowUpRight className="size-5 shrink-0 text-white/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white" />
              </div>

              <p className="mt-3 text-[15px] leading-[1.6] text-[#b2b3a7]">
                {note.excerpt}
              </p>
            </button>
          </motion.li>
        ))}
      </ul>

      {/* Note Modal Sheet */}
      <Modal
        open={Boolean(activeNote)}
        onClose={() => setActiveNote(null)}
        title={activeNote?.title}
        variant="sheet"
        maxWidth="680px"
      >
        {activeNote && (
          <div className="pt-2">
            <img
              src={activeNote.image}
              alt={activeNote.title}
              className="aspect-[16/9] w-full rounded-[24px] object-cover"
            />
            <p className="mt-6 text-[13px] uppercase tracking-[0.2em] text-[#b2b3a7]">
              {activeNote.kicker} · {activeNote.date} · {activeNote.readingTime}
            </p>
            <h3 className="display-tight mt-3 text-[clamp(1.7rem,4vw,2.4rem)] text-white">
              {activeNote.title}
            </h3>
            <p className="mt-5 text-[16px] leading-[1.75] text-white/90">
              {activeNote.excerpt}
            </p>
            <p className="mt-4 border-t border-white/10 pt-4 text-[15px] leading-[1.7] text-[#b2b3a7]">
              La nota completa vive en el boletín del taller. Sale una vez al
              mes, con las mediciones en crudo y las fotos que no llegaron a la
              web.
            </p>
          </div>
        )}
      </Modal>
    </Section>
  );
}
