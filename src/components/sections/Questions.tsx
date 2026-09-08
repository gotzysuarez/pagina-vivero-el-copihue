import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FAQ } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Plus } from "@/components/ui/Icons";

export function Questions() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion() ?? false;

  return (
    <Section id="questions" className="border-t border-white/10">
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Title column (4 cols) */}
        <div className="lg:col-span-4">
          <Eyebrow index="05">Questions</Eyebrow>
          <SectionTitle
            lines={["Lo que", "más nos", "preguntan."]}
            className="mt-7"
          />
        </div>

        {/* Accordion list (8 cols) */}
        <div className="lg:col-span-8">
          <ul className="border-t border-white/10">
            {FAQ.map((item, index) => {
              const isOpen = openIndex === index;
              const numStr = String(index + 1).padStart(2, "0");
              const panelId = `faq-panel-${index}`;

              return (
                <li key={index} className="border-b border-white/10">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full cursor-pointer items-center py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:py-7"
                    >
                      <span className="w-11 text-[12px] tracking-[0.2em] text-[#b2b3a7]">
                        {numStr}
                      </span>
                      <span className="text-[clamp(1.05rem,2vw,1.35rem)] leading-[1.4] text-white">
                        {item.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{
                          duration: reduced ? 0.001 : 0.4,
                          ease: EASE,
                        }}
                        className="ml-auto grid size-10 shrink-0 place-items-center rounded-full border border-white/20 text-white"
                      >
                        <Plus className="size-4" />
                      </motion.span>
                    </button>
                  </h3>

                  <motion.div
                    id={panelId}
                    role="region"
                    aria-label={item.q}
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                      duration: reduced ? 0.001 : 0.4,
                      ease: EASE,
                    }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[44rem] pb-8 pl-11 text-[15px] leading-[1.75] text-[#b2b3a7]">
                      {item.a}
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

