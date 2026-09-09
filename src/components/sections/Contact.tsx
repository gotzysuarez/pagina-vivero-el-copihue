import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRODUCTS } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { Section, Eyebrow, SectionTitle } from "@/components/ui/Section";
import { Field, EMAIL_RE } from "@/components/ui/Field";
import { Check } from "@/components/ui/Icons";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const reduced = useReducedMotion() ?? false;

  const chosenProduct = PRODUCTS.find((p) => p.id === productId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (name.trim().length < 2) {
      newErrors.name = "Decinos cómo te llamás.";
    }

    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      newErrors.email = "Ese correo no parece válido.";
    }

    if (message.trim().length < 10) {
      newErrors.message = "Contanos un poco más (mínimo 10 caracteres).";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("done");
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
    setStatus("idle");
  };

  return (
    <Section id="contact" className="border-t border-white/10">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5">
          <Eyebrow index="06">Contact</Eyebrow>
          <SectionTitle lines={["Escribinos", "y lo vemos."]} className="mt-7" />
          <p className="mt-6 max-w-[28rem] text-[16px] leading-[1.7] text-[#b2b3a7]">
            Contanos qué espacio querés calentar y te respondemos con una
            propuesta en menos de dos días hábiles. Sin formularios eternos.
          </p>

          <dl className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <dt className="text-[12px] uppercase tracking-[0.2em] text-white/40">
                Taller
              </dt>
              <dd className="mt-2 whitespace-pre-line text-[15px] leading-[1.6] text-[#b2b3a7]">
                {"Carrer del Bosc 14\n17001 Girona"}
              </dd>
            </div>
            <div>
              <dt className="text-[12px] uppercase tracking-[0.2em] text-white/40">
                Correo
              </dt>
              <dd className="mt-2 text-[15px] leading-[1.6] text-[#b2b3a7]">
                <a
                  href="mailto:hola@arkkhe.studio"
                  className="transition-colors hover:text-white"
                >
                  hola@arkkhe.studio
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[12px] uppercase tracking-[0.2em] text-white/40">
                Teléfono
              </dt>
              <dd className="mt-2 text-[15px] leading-[1.6] text-[#b2b3a7]">
                <a
                  href="tel:+34972000000"
                  className="transition-colors hover:text-white"
                >
                  +34 972 00 00 00
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[12px] uppercase tracking-[0.2em] text-white/40">
                Horario
              </dt>
              <dd className="mt-2 text-[15px] leading-[1.6] text-[#b2b3a7]">
                Lun a vie, 9 a 18 h
              </dd>
            </div>
          </dl>
        </div>

        {/* Right Column (7 cols): Contact Form Card */}
        <div className="lg:col-span-7">
          <div className="rounded-[40px] border border-white/10 bg-white/[0.03] p-7 sm:p-10">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -10 }}
                  transition={{ duration: reduced ? 0.001 : 0.45, ease: EASE }}
                  className="py-6"
                >
                  <div className="grid size-16 place-items-center rounded-full bg-white text-[#454640]">
                    <Check className="size-8" />
                  </div>
                  <h3 className="display-tight mt-6 text-[clamp(1.6rem,3vw,2.2rem)] text-white">
                    Mensaje enviado
                  </h3>
                  <p className="mt-3 max-w-[28rem] text-[15px] leading-[1.65] text-[#b2b3a7]">
                    Gracias, {name.split(" ")[0]}. Te escribimos a {email} sobre
                    la {chosenProduct?.name ?? "estufa"} en menos de dos días
                    hábiles.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-8 inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 text-[14px] font-medium text-white transition-colors hover:border-white/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0.001 : 0.35, ease: EASE }}
                  className="space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      id="contact-name"
                      label="Nombre"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name)
                          setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      error={errors.name}
                      placeholder="Tu nombre completo"
                      autoComplete="name"
                    />

                    <Field
                      id="contact-email"
                      label="Correo"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email)
                          setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      error={errors.email}
                      placeholder="nombre@correo.com"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-product"
                      className="mb-2 block text-[13px] uppercase tracking-[0.14em] text-white/45"
                    >
                      Me interesa
                    </label>
                    <select
                      id="contact-product"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      className="h-13 w-full cursor-pointer rounded-2xl border border-white/15 bg-white/5 px-5 text-[15px] text-white outline-none transition-colors focus:border-white/60"
                    >
                      {PRODUCTS.map((prod) => (
                        <option
                          key={prod.id}
                          value={prod.id}
                          className="bg-[#3a3b36] text-white"
                        >
                          {prod.name} — {prod.family} · {prod.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Field
                    id="contact-message"
                    label="Mensaje"
                    textarea
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message)
                        setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    error={errors.message}
                    placeholder="Metros del espacio, si hay salida de humos, plazos…"
                  />

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-white text-[15px] font-medium text-[#454640] transition-opacity hover:opacity-90 disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-10"
                    >
                      {status === "sending" ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-[#454640]/30 border-t-[#454640]" />
                          <span>Enviando…</span>
                        </>
                      ) : (
                        <span>Enviar mensaje</span>
                      )}
                    </button>
                  </div>

                  <p className="text-[13px] leading-[1.6] text-white/35">
                    Al enviar aceptás que guardemos tus datos para responderte.
                    Nada más.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
