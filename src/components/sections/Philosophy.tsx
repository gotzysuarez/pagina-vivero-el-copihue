import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IMAGES } from "@/lib/assets";
import { PHILOSOPHY_POINTS } from "@/lib/content";
import { scrollToId } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { Section, Eyebrow, SectionTitle, Fade } from "@/components/ui/Section";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Parallax } from "@/components/ui/Parallax";
import { ArrowRight, Plus } from "@/components/ui/Icons";

export function Philosophy() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const reduced = useReducedMotion() ?? false;

  return (
    <Section id="philosophy" className="border-t border-white/10">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5">
          <Eyebrow index="01">About</Eyebrow>

          <SectionTitle
            lines={["Nature's beauty", "is boundless."]}
            className="mt-7"
          />

          <AnimatedText
            as="p"
            mode="lines"
            animateOnMount={false}
            stagger={0.09}
            lines={[
              "Arkkhe nace en un taller de Girona con una obsesión:",
              "que el calor de una casa no le cueste nada al bosque",
              "que lo alimenta. Diseñamos estufas que queman menos,",
              "duran más y se desmontan con una sola llave.",
            ]}
            className="mt-8 max-w-[30rem] text-[16px] leading-[1.7] text-[#b2b3a7]"
          />

          <Fade delay={0.2} className="mt-10">
            <button
              type="button"
              onClick={() => scrollToId("stove")}
              className="group inline-flex h-14 cursor-pointer items-center gap-4 rounded-full border border-white/30 pl-7 pr-3 text-[15px] text-white transition-colors duration-500 hover:border-white/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span>Ver la colección</span>
              <span className="grid size-10 place-items-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-1">
                <ArrowRight className="size-4 text-white" />
              </span>
            </button>
          </Fade>
        </div>

        {/* Right Column (7 cols) */}
        <div className="lg:col-span-7">
          {/* Parallax Plate */}
          <Parallax distance={46}>
            <div className="relative overflow-hidden rounded-[40px] bg-[#d7d8d6]">
              <img
                src={IMAGES.mossBranch}
                alt="Rama cubierta de musgo sobre fondo blanco"
                className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
                <p className="max-w-[16rem] font-display text-[clamp(1.1rem,2vw,1.6rem)] leading-[1.15] tracking-[-0.09em] text-[#474842]">
                  Doce laderas medidas durante un invierno entero.
                </p>
                <span className="shrink-0 rounded-full bg-white/85 px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-[#474842]">
                  Girona, 2026
                </span>
              </div>
            </div>
          </Parallax>

          {/* Accordion */}
          <ul className="mt-12 border-t border-white/10">
            {PHILOSOPHY_POINTS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <li key={item.n} className="border-b border-white/10">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full cursor-pointer items-center py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    <span className="w-11 text-[12px] tracking-[0.2em] text-[#b2b3a7]">
                      {item.n}
                    </span>
                    <span className="font-display text-[clamp(1.15rem,2.2vw,1.75rem)] tracking-[-0.08em] text-white">
                      {item.title}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: reduced ? 0.001 : 0.4, ease: EASE }}
                      className="ml-auto grid size-9 shrink-0 place-items-center rounded-full border border-white/20 text-white"
                    >
                      <Plus className="size-4" />
                    </motion.span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: reduced ? 0.001 : 0.5, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="pb-7 pl-11 pr-10 text-[15px] leading-[1.7] text-[#b2b3a7]">
                      {item.body}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
