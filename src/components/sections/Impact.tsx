import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { STATS } from "@/lib/content";
import { IMAGES } from "@/lib/assets";
import { EASE } from "@/lib/motion";
import { Section, Eyebrow, SectionTitle, Fade } from "@/components/ui/Section";
import { EllipseRing } from "@/components/ui/Icons";
import { Counter } from "@/components/ui/Counter";
import { Parallax } from "@/components/ui/Parallax";

export function Impact() {
  const reduced = useReducedMotion() ?? false;

  return (
    <Section id="impact" className="border-t border-white/10">
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Left Column (4 cols) */}
        <div className="lg:col-span-4">
          <Eyebrow index="03">Impact</Eyebrow>
          <SectionTitle lines={["Lo que", "devolvemos."]} className="mt-7" />
          <p className="mt-6 max-w-[26rem] text-[16px] leading-[1.7] text-[#b2b3a7]">
            Cuatro cifras que revisamos cada trimestre con una auditoría
            externa. Si una baja, lo contamos igual.
          </p>
        </div>

        {/* Right Column (8 cols): 2x2 Stat Grid */}
        <div className="lg:col-span-8">
          <ul className="grid gap-px overflow-hidden rounded-[32px] bg-white/10 sm:grid-cols-2">
            {STATS.map((stat, index) => (
              <motion.li
                key={stat.label}
                initial={{ opacity: 0, y: reduced ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: reduced ? 0.001 : 0.8,
                  ease: EASE,
                  delay: reduced ? 0 : index * 0.08,
                }}
                className="bg-[#454640] p-8 lg:p-10"
              >
                <motion.div
                  className="size-9 text-white/50"
                  animate={reduced ? undefined : { rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <EllipseRing className="size-full" />
                </motion.div>

                <div className="mt-7">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-[-0.1em] text-white"
                  />
                </div>

                <p className="mt-4 text-[15px] font-medium text-white">
                  {stat.label}
                </p>
                <p className="mt-1.5 text-[14px] leading-[1.6] text-[#b2b3a7]">
                  {stat.caption}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Panoramic Plate */}
      <Fade delay={0.15} className="mt-16">
        <Parallax distance={40}>
          <div className="relative overflow-hidden rounded-[40px] bg-[#3a3b36]">
            <img
              src={IMAGES.mossWave}
              alt="Onda de musgo en el bosque"
              className="aspect-[21/9] w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#454640] via-[#454640]/20 to-transparent" />
            <p className="absolute bottom-8 left-8 right-8 max-w-[34rem] font-display text-[clamp(1.2rem,2.6vw,2rem)] leading-[1.2] tracking-[-0.09em] text-white">
              Cada estufa que sale del taller replanta noventa metros cuadrados
              de ladera.
            </p>
          </div>
        </Parallax>
      </Fade>
    </Section>
  );
}

