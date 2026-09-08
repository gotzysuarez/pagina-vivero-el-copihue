import React, { useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useReducedMotion,
} from "framer-motion";
import {
  PRODUCTS,
  PRODUCT_FAMILIES,
  Product,
  ProductFamily,
} from "@/lib/content";
import { scrollToId } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { Section, Eyebrow, SectionTitle, Fade } from "@/components/ui/Section";
import { Modal } from "@/components/ui/Modal";
import { DotGrid, ArrowRight } from "@/components/ui/Icons";

export function Products() {
  const [selectedFamily, setSelectedFamily] = useState<ProductFamily>("Todos");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const reduced = useReducedMotion() ?? false;

  const visible = useMemo(
    () =>
      selectedFamily === "Todos"
        ? PRODUCTS
        : PRODUCTS.filter((item) => item.family === selectedFamily),
    [selectedFamily]
  );

  const handleOrder = () => {
    setActiveProduct(null);
    setTimeout(() => {
      scrollToId("contact");
    }, 200);
  };

  return (
    <Section id="stove" className="border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow index="02">EcoStove</Eyebrow>
          <SectionTitle lines={["Heat for Life."]} className="mt-7" />
          <p className="mt-6 max-w-[30rem] text-[16px] leading-[1.7] text-[#b2b3a7]">
            Seis piezas, tres familias y una misma cámara de doble combustión.
            Elegí por dónde vas a quemar y te mostramos lo que encaja.
          </p>
        </div>

        {/* Filter Pills with LayoutGroup */}
        <LayoutGroup id="product-filter">
          <div
            role="tablist"
            aria-label="Familias de estufas"
            className="flex flex-wrap gap-2 rounded-full border border-white/15 p-1.5"
          >
            {PRODUCT_FAMILIES.map((family) => {
              const isSelected = selectedFamily === family;
              return (
                <button
                  key={family}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedFamily(family)}
                  className="relative cursor-pointer rounded-full px-5 py-2.5 text-[14px] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {isSelected && (
                    <motion.span
                      layoutId="product-filter-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ duration: reduced ? 0.001 : 0.45, ease: EASE }}
                    />
                  )}
                  <span
                    className={`relative z-10 font-medium ${
                      isSelected ? "text-[#454640]" : "text-[#b2b3a7]"
                    }`}
                  >
                    {family}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      {/* Product Grid */}
      <motion.ul layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((product, index) => (
            <motion.li
              key={product.id}
              layout
              initial={{ opacity: 0, y: reduced ? 0 : 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -16 }}
              transition={{
                duration: reduced ? 0.001 : 0.6,
                ease: EASE,
                delay: reduced ? 0 : index * 0.05,
              }}
            >
              <button
                type="button"
                onClick={() => setActiveProduct(product)}
                aria-label={`Ver ficha de ${product.name}`}
                className="group relative block h-full w-full cursor-pointer overflow-hidden rounded-[40px] bg-[#d7d8d6] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </span>

                <div className="flex items-end justify-between gap-4 p-7">
                  <div>
                    <span className="text-[15px] font-light tracking-[-0.02em] text-[#474842]/70">
                      {product.family} · {product.price}
                    </span>
                    <span className="mt-1.5 block font-display text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.05] tracking-[-0.1em] text-[#474842]">
                      {product.name}
                    </span>
                    <p className="mt-2 text-[14px] text-[#474842]/70">
                      {product.tagline}
                    </p>
                  </div>

                  <span className="grid size-[54px] shrink-0 place-items-center rounded-full bg-white shadow-sm transition-transform duration-500 ease-out group-hover:scale-110">
                    <DotGrid className="size-[11px] text-[#454640]" />
                  </span>
                </div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {/* Grid footer */}
      {visible.length === 0 ? (
        <p className="mt-14 text-center text-[15px] text-[#b2b3a7]">
          Todavía no hay piezas en esta familia.
        </p>
      ) : (
        <Fade delay={0.2} className="mt-12 text-[14px] text-[#b2b3a7]">
          <p>
            Mostrando {visible.length} de {PRODUCTS.length} piezas.
          </p>
        </Fade>
      )}

      {/* Product Detail Modal */}
      <Modal
        open={Boolean(activeProduct)}
        onClose={() => setActiveProduct(null)}
        title={activeProduct?.name}
        variant="sheet"
        maxWidth="720px"
      >
        {activeProduct && (
          <div className="pt-2">
            <img
              src={activeProduct.image}
              alt={activeProduct.name}
              className="aspect-[16/9] w-full rounded-[24px] object-cover"
            />
            <p className="mt-7 text-[13px] uppercase tracking-[0.2em] text-[#b2b3a7]">
              {activeProduct.family} · {activeProduct.fuel}
            </p>
            <h3 className="display-tight mt-3 text-[clamp(1.8rem,4vw,2.6rem)] text-white">
              {activeProduct.name}
            </h3>
            <p className="mt-4 max-w-[36rem] text-[16px] leading-[1.7] text-[#b2b3a7]">
              {activeProduct.description}
            </p>

            {/* Spec Table */}
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
              <div className="bg-[#3a3b36] p-4">
                <dt className="text-[12px] uppercase tracking-[0.14em] text-white/40">
                  Potencia
                </dt>
                <dd className="mt-1.5 font-display text-[17px] tracking-[-0.04em] text-white">
                  {activeProduct.output}
                </dd>
              </div>
              <div className="bg-[#3a3b36] p-4">
                <dt className="text-[12px] uppercase tracking-[0.14em] text-white/40">
                  Peso cámara
                </dt>
                <dd className="mt-1.5 font-display text-[17px] tracking-[-0.04em] text-white">
                  {activeProduct.weight}
                </dd>
              </div>
              <div className="bg-[#3a3b36] p-4">
                <dt className="text-[12px] uppercase tracking-[0.14em] text-white/40">
                  Rendimiento
                </dt>
                <dd className="mt-1.5 font-display text-[17px] tracking-[-0.04em] text-white">
                  {activeProduct.efficiency}
                </dd>
              </div>
              <div className="bg-[#3a3b36] p-4">
                <dt className="text-[12px] uppercase tracking-[0.14em] text-white/40">
                  Precio
                </dt>
                <dd className="mt-1.5 font-display text-[17px] tracking-[-0.04em] text-white">
                  {activeProduct.price}
                </dd>
              </div>
            </dl>

            {/* Features */}
            <div className="mt-6 flex flex-wrap gap-2">
              {activeProduct.features.map((feature) => (
                <span
                  key={feature}
                  className="rounded-full border border-white/15 px-4 py-2 text-[13px] text-[#b2b3a7]"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 pt-4">
              <button
                type="button"
                onClick={handleOrder}
                className="group inline-flex h-14 cursor-pointer items-center gap-4 rounded-full bg-white pl-7 pr-3 text-[15px] font-medium text-[#454640] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span>Pedir presupuesto</span>
                <span className="grid size-10 place-items-center rounded-full bg-[#454640]/10 transition-transform duration-500 group-hover:translate-x-1">
                  <ArrowRight className="size-4 text-[#454640]" />
                </span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
