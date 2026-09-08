import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { Field, EMAIL_RE } from "@/components/ui/Field";
import { TreeMark, Check } from "@/components/ui/Icons";
import { EASE } from "@/lib/motion";

export interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const reduced = useReducedMotion() ?? false;

  // Reset 400ms after closing
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setStatus("idle");
        setEmail("");
        setPassword("");
        setErrors({});
        setMode("login");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Escribí tu correo.";
    } else if (!EMAIL_RE.test(email.trim())) {
      newErrors.email = "Ese correo no parece válido.";
    }

    if (!password) {
      newErrors.password = "Escribí tu contraseña.";
    } else if (password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("done");
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Área de cliente"
      maxWidth="480px"
      variant="center"
    >
      <div className="pt-2">
        <div className="mb-4">
          <TreeMark className="size-7 text-white" />
        </div>

        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -10 }}
              transition={{ duration: reduced ? 0.001 : 0.45, ease: EASE }}
              className="py-4 text-center sm:text-left"
            >
              <div className="grid size-14 place-items-center rounded-full bg-white text-[#454640]">
                <Check className="size-7" />
              </div>
              <h2 className="display-tight mt-6 text-[28px] text-white">
                {mode === "login" ? "Sesión iniciada" : "Cuenta creada"}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#b2b3a7]">
                {mode === "login"
                  ? `Te dimos entrada como ${email}. Desde el área de cliente podés seguir el montaje de tu estufa.`
                  : `Mandamos un correo a ${email} para confirmar la cuenta.`}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-white text-[15px] font-medium text-[#454640] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Volver al sitio
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0.001 : 0.35, ease: EASE }}
            >
              <h2 className="display-tight text-[28px] text-white">
                {mode === "login" ? "Entrar" : "Crear cuenta"}
              </h2>
              <p className="mt-2 text-[14px] leading-[1.6] text-[#b2b3a7]">
                {mode === "login"
                  ? "Seguí tu pedido, descargá manuales y pedí piezas de repuesto."
                  : "Una cuenta para tu estufa, tus recambios y tu historial de mantenimiento."}
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                <Field
                  id="login-email"
                  label="Correo"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  error={errors.email}
                  placeholder="nombre@correo.com"
                  autoComplete="email"
                />

                <Field
                  id="login-password"
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  error={errors.password}
                  placeholder="••••••••"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />

                {mode === "login" && (
                  <div className="flex items-center justify-between pt-1 text-[13px] text-[#b2b3a7]">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="rounded border-white/20 bg-white/5 accent-white"
                      />
                      <span>Recordarme</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => alert("Te enviamos un enlace de recuperación.")}
                      className="text-white/60 transition-colors hover:text-white focus-visible:outline-none"
                    >
                      Olvidé la contraseña
                    </button>
                  </div>
                )}

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-white text-[15px] font-medium text-[#454640] transition-opacity hover:opacity-90 disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-[#454640]/30 border-t-[#454640]" />
                        <span>{mode === "login" ? "Entrando…" : "Creando cuenta…"}</span>
                      </>
                    ) : (
                      <span>{mode === "login" ? "Entrar" : "Crear cuenta"}</span>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 border-t border-white/10 pt-4 text-center text-[13px] text-[#b2b3a7]">
                {mode === "login" ? (
                  <p>
                    ¿Todavía no tenés cuenta?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("register");
                        setErrors({});
                      }}
                      className="font-medium text-white underline underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-none"
                    >
                      Creá una
                    </button>
                  </p>
                ) : (
                  <p>
                    ¿Ya tenés cuenta?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setErrors({});
                      }}
                      className="font-medium text-white underline underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-none"
                    >
                      Entrá
                    </button>
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}

