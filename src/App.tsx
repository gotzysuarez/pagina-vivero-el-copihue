import React from "react";
import { SiteChrome } from "@/components/chrome/SiteChrome";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { Hero } from "@/components/hero/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Products } from "@/components/sections/Products";
import { Impact } from "@/components/sections/Impact";
import { Journal } from "@/components/sections/Journal";
import { Questions } from "@/components/sections/Questions";
import { Contact } from "@/components/sections/Contact";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function App() {
  return (
    <SiteChrome>
      {/* EFFECT-14: Spring-smoothed scroll progress bar */}
      <ScrollProgress />

      {/* Skip link */}
      <a
        href="#stove"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[200] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-[14px] focus:font-medium focus:text-[#454640] focus:shadow-lg focus:outline-none"
      >
        Saltar al contenido
      </a>

      {/* Main content flow */}
      <main id="main-content">
        <Hero />
        <Philosophy />
        <Products />
        <Impact />
        <Journal />
        <Questions />
        <Contact />
      </main>

      {/* Footer outside main */}
      <SiteFooter />
    </SiteChrome>
  );
}
