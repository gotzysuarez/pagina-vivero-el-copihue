import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { HERO_MOTION, IMAGES } from "@/lib/assets";
import { NAV_ITEMS, READOUTS } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { scrollToId } from "@/lib/hooks";
import { useChrome } from "@/components/chrome/SiteChrome";
import { TreeMark } from "@/components/ui/Icons";
import { BurgerButton } from "@/components/ui/BurgerButton";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { MediaLightbox } from "@/components/ui/MediaLightbox";
import { c } from "./units";
import { GridLines } from "./GridLines";
import { ProductsPill } from "./ProductsPill";
import { PlayButton } from "./PlayButton";
import { FeatureCard } from "./FeatureCard";
import { StatReadout } from "./StatReadout";
import { ScrollCue } from "./ScrollCue";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLVideoElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const reduced = useReducedMotion() ?? false;
  const { activeGroup, menuOpen, toggleMenu, openLogin, go } = useChrome();

  // EFFECT-02: pause backdrop if reduced motion
  useEffect(() => {
    if (typeof window === "undefined" || !backdropRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      backdropRef.current.pause();
      backdropRef.current.removeAttribute("autoplay");
    }
  }, []);

  // EFFECT-03: Parallax transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const asideY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const p = <T,>(value: T) => (reduced ? undefined : value);

  return (
    <>
      <section
        ref={sectionRef}
        id="home"
        className="grain relative isolate h-svh min-h-[620px] w-full overflow-hidden bg-[#454640]"
      >
        {/* EFFECT-02: Play-once backdrop film with still fallback */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full overflow-hidden"
          style={{ y: p(backdropY), scale: p(backdropScale) }}
        >
          <video
            ref={backdropRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={HERO_MOTION.poster}
            className="h-full w-full object-cover motion-reduce:hidden"
          >
            <source src={HERO_MOTION.webm} type="video/webm" />
            <source src={HERO_MOTION.mp4} type="video/mp4" />
          </video>
          <img
            src={IMAGES.heroStill}
            alt=""
            className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#454640]/45 via-transparent to-[#454640]/20" />
        </motion.div>

        {/* SECTION-03 + EFFECT-01: Desktop 1440x810 Artboard */}
        <div
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          style={{
            width: c(1440),
            height: c(810),
            ["--c" as string]: "var(--u)",
          }}
        >
          {/* GridLines */}
          <GridLines />

          {/* SECTION-04: Hero Navigation */}
          <motion.div
            className="absolute z-30"
            style={{
              left: c(29),
              top: c(27),
              width: c(1387),
              height: c(24),
            }}
            initial={{ opacity: 0, y: reduced ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0.001 : 0.9,
              delay: reduced ? 0 : 0.1,
              ease: EASE,
            }}
          >
            <div className="relative h-full w-full">
              {/* Logo */}
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  go("home");
                }}
                aria-label="Arkkhe, ir al inicio"
                style={{ width: c(24), height: c(24) }}
                className="absolute left-0 top-0 block text-white transition-opacity duration-300 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <TreeMark className="h-full w-full text-white" />
              </a>

              {/* Links */}
              <nav
                className="absolute top-0 flex items-center"
                style={{ left: c(172), gap: c(128) }}
                aria-label="Navegación del lienzo"
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = activeGroup === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.id);
                      }}
                      aria-current={isActive ? "page" : undefined}
                      style={{ fontSize: c(14), lineHeight: 1.4 }}
                      className={`transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                        isActive
                          ? "font-bold text-white"
                          : "font-normal text-[#b2b3a7] hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              {/* Login */}
              <button
                type="button"
                onClick={openLogin}
                style={{
                  right: c(71),
                  top: c(1),
                  fontSize: c(14),
                  lineHeight: 1.4,
                }}
                className="absolute cursor-pointer font-bold text-white transition-opacity duration-300 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Login
              </button>

              {/* BurgerButton */}
              <div
                className="absolute right-0"
                style={{ top: c(3) }}
              >
                <BurgerButton open={menuOpen} onClick={toggleMenu} />
              </div>
            </div>
          </motion.div>

          {/* SECTION-05: Hero Headline & Lede */}
          <AnimatedText
            as="h1"
            mode="chars"
            delay={0.35}
            lines={["Find your", "inner green"]}
            className="display-tight absolute text-white"
            style={{
              left: c(18),
              top: c(181),
              width: c(340),
              fontSize: c(52),
              lineHeight: 1.24,
              letterSpacing: c(-6.24),
              y: p(copyY),
            }}
          />

          <AnimatedText
            as="p"
            mode="lines"
            delay={0.75}
            lines={[
              "Nurturing green spaces,",
              "cultivating sustainable",
              "solutions, and inspiring a",
              "greener tomorrow for all.",
            ]}
            className="absolute font-normal text-[#b2b3a7]"
            style={{
              left: c(462),
              top: c(181),
              width: c(240),
              fontSize: c(16),
              lineHeight: 1.4,
              y: p(copyY),
            }}
          />

          {/* SECTION-05: "Our Products" Pill (Nested parallax + entrance) */}
          <motion.div
            className="absolute"
            style={{
              left: c(462),
              top: c(306),
              y: p(copyY),
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0.001 : 0.9,
                delay: reduced ? 0 : 1.1,
                ease: EASE,
              }}
            >
              <ProductsPill
                label="Our Products"
                onClick={() => scrollToId("stove")}
              />
            </motion.div>
          </motion.div>

          {/* SECTION-05: Play Button (Nested parallax + entrance) */}
          <motion.div
            className="absolute"
            style={{
              left: c(153),
              top: c(398),
              y: p(copyY),
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: reduced ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reduced ? 0.001 : 1.0,
                delay: reduced ? 0 : 1.25,
                ease: EASE,
              }}
            >
              <PlayButton onClick={() => setLightboxOpen(true)} />
            </motion.div>
          </motion.div>

          {/* SECTION-06: Top Card ("Nature's beauty", layout="top") */}
          <motion.div
            className="absolute"
            style={{
              left: c(820),
              top: c(201),
              y: p(cardsY),
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0.001 : 1.1,
                delay: reduced ? 0 : 0.55,
                ease: EASE,
              }}
            >
              <FeatureCard
                layout="top"
                kicker="About"
                titleLines={["Nature's", "beauty is", "boundless."]}
                image={IMAGES.mossBranch}
                imageAlt="Rama cubierta de musgo sobre fondo claro"
                onClick={() => scrollToId("philosophy")}
              />
            </motion.div>
          </motion.div>

          {/* SECTION-06: Bottom Card ("Heat for Life", layout="bottom") */}
          <motion.div
            className="absolute"
            style={{
              left: c(1116),
              top: c(477),
              y: p(cardsY),
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0.001 : 1.1,
                delay: reduced ? 0 : 0.75,
                ease: EASE,
              }}
            >
              <FeatureCard
                layout="bottom"
                kicker="EcoStove"
                titleLines={["Heat for Life"]}
                image={IMAGES.mossRock}
                imageAlt="Roca cubierta de musgo"
                onClick={() => scrollToId("stove")}
              />
            </motion.div>
          </motion.div>

          {/* SECTION-07: Stat Readout */}
          <motion.div
            className="absolute"
            style={{
              left: c(1195),
              top: c(220),
              y: p(asideY),
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: reduced ? 0 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: reduced ? 0.001 : 1.0,
                delay: reduced ? 0 : 1.35,
                ease: EASE,
              }}
            >
              <StatReadout items={READOUTS} />
            </motion.div>
          </motion.div>

          {/* SECTION-07: Scroll Cue */}
          <motion.div
            className="absolute"
            style={{
              left: c(710),
              top: c(648),
              opacity: p(cueOpacity),
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: reduced ? 0.001 : 1.0,
                delay: reduced ? 0 : 1.5,
                ease: EASE,
              }}
            >
              <ScrollCue onClick={() => scrollToId("philosophy")} />
            </motion.div>
          </motion.div>
        </div>

        {/* SECTION-08: Hero Mobile Column (< lg) */}
        <div className="relative z-10 flex h-full flex-col px-5 pb-8 pt-24 sm:px-7 lg:hidden">
          <GridLines />

          <AnimatedText
            as="h1"
            mode="chars"
            delay={0.25}
            lines={["Find your", "inner green"]}
            className="display-tight text-[clamp(2.4rem,11.5vw,3.9rem)] text-white"
          />

          <AnimatedText
            as="p"
            mode="lines"
            delay={0.6}
            lines={[
              "Nurturing green spaces,",
              "cultivating sustainable",
              "solutions, and inspiring a",
              "greener tomorrow for all.",
            ]}
            className="mt-5 max-w-[20rem] text-[15px] leading-[1.5] text-[#b2b3a7]"
          />

          <div className="relative mt-7 flex items-center gap-4">
            <ProductsPill
              label="Our Products"
              onClick={() => scrollToId("stove")}
              style={{ width: "auto", paddingRight: 24 }}
            />
            <PlayButton
              onClick={() => setLightboxOpen(true)}
              style={{ width: 56, height: 56 }}
            />
          </div>

          <div className="relative mt-auto flex items-end justify-between gap-6 pt-8">
            <StatReadout items={READOUTS} stacked />
            <ScrollCue onClick={() => scrollToId("philosophy")} />
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <MediaLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

