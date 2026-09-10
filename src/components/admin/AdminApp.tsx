import React, { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ImagePlus,
  LogOut,
  Pencil,
  Plus,
  Save,
  Settings,
  Sprout,
  Trash2,
  X,
} from "lucide-react";
import { Plant } from "@/lib/catalog";
import {
  DEFAULT_SITE_DATA,
  FaqItem,
  SiteData,
  SiteSettings,
} from "@/lib/site-data";
type Tab = "plants" | "content" | "faqs";
type Session = { authenticated: boolean; email?: string; csrf?: string };
const emptyPlant: Plant = {
  id: "",
  name: "",
  botanical: "",
  category: "Exterior",
  price: null,
  image: "",
  light: "",
  water: "",
  season: "",
  difficulty: "",
  petNote: "",
  description: "",
};
async function api<T = unknown>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const r = await fetch(url, {
    credentials: "same-origin",
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });
  const b = await r.json().catch(() => ({ error: "Respuesta inválida" }));
  if (!r.ok) throw new Error(b.error || "No se pudo completar la operación");
  return b;
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string | number | null;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span>{label}</span>
      <input
        required={required}
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-xl border border-black/15 bg-white px-4 outline-none focus:border-[#9b7a35]"
      />
    </label>
  );
}
function Area({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span>{label}</span>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-black/15 bg-white px-4 py-3 outline-none focus:border-[#9b7a35]"
      />
    </label>
  );
}
function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center bg-[#101510] px-5 text-white">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

export default function AdminApp() {
  const [session, setSession] = useState<Session>({ authenticated: false }),
    [checking, setChecking] = useState(true),
    [data, setData] = useState<SiteData | null>(null),
    [tab, setTab] = useState<Tab>("plants"),
    [message, setMessage] = useState(""),
    [error, setError] = useState("");
  const adminData = async (current: Session) => {
    let result = await api<SiteData>("/api/admin.php");
    if (!result.plants.length) {
      await api("/api/admin.php?resource=bootstrap", {
        method: "POST",
        headers: { "X-CSRF-Token": current.csrf || "" },
        body: JSON.stringify(DEFAULT_SITE_DATA),
      });
      result = await api<SiteData>("/api/admin.php");
    }
    return result;
  };
  const load = async () => {
    const s = await api<Session>("/api/auth.php");
    setSession(s);
    if (s.authenticated) setData(await adminData(s));
  };
  useEffect(() => {
    load()
      .catch((e) => setError(e.message))
      .finally(() => setChecking(false));
  }, []);
  const refresh = async (text: string) => {
    setData(await api<SiteData>("/api/admin.php"));
    setError("");
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };
  if (checking)
    return (
      <Shell>
        <p className="text-center text-white/60">Comprobando acceso…</p>
      </Shell>
    );
  if (!session.authenticated)
    return (
      <Login
        error={error}
        onSuccess={async (s) => {
          setSession(s);
          setData(await adminData(s));
        }}
      />
    );
  if (!data)
    return (
      <Shell>
        <p>No se pudo cargar el panel.</p>
      </Shell>
    );
  return (
    <div className="min-h-screen bg-[#101510] text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#101510]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo-vivero-el-copihue.png"
              className="size-12 rounded-full"
              alt=""
            />
            <div>
              <strong className="block">Administración</strong>
              <span className="text-xs text-white/45">{session.email}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              className="grid size-11 place-items-center rounded-full border border-white/15"
              aria-label="Volver"
            >
              <ArrowLeft className="size-4" />
            </a>
            <button
              onClick={async () => {
                await api("/api/auth.php", {
                  method: "DELETE",
                  headers: { "X-CSRF-Token": session.csrf || "" },
                });
                location.href = "/admin";
              }}
              className="grid size-11 place-items-center rounded-full border border-white/15"
              aria-label="Salir"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1400px] px-5 py-8">
        <nav className="mb-7 flex flex-wrap gap-2">
          {(
            [
              ["plants", "Plantas", Sprout],
              ["content", "Página", Settings],
              ["faqs", "Preguntas", Check],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold ${tab === id ? "bg-[#d2b66e] text-[#151915]" : "border border-white/15 text-white/65"}`}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>
        {message && (
          <p className="mb-5 rounded-xl bg-[#1d6f42] p-4 text-sm">{message}</p>
        )}
        {error && (
          <p className="mb-5 rounded-xl bg-[#8c2b26] p-4 text-sm">{error}</p>
        )}
        {tab === "plants" && (
          <Plants
            plants={data.plants}
            csrf={session.csrf || ""}
            changed={() => refresh("Catálogo actualizado")}
            fail={setError}
          />
        )}{" "}
        {tab === "content" && (
          <Content
            settings={data.settings}
            csrf={session.csrf || ""}
            saved={(s) => {
              setData({ ...data, settings: s });
              setMessage("Contenido guardado");
            }}
            fail={setError}
          />
        )}{" "}
        {tab === "faqs" && (
          <Faqs
            faqs={data.faqs}
            csrf={session.csrf || ""}
            saved={(f) => {
              setData({ ...data, faqs: f });
              setMessage("Preguntas actualizadas");
            }}
            fail={setError}
          />
        )}
      </main>
    </div>
  );
}

function Login({
  onSuccess,
  error,
}: {
  onSuccess: (s: Session) => void;
  error: string;
}) {
  const [email, setEmail] = useState("Andreabelenrojasfarias@gmail.com"),
    [password, setPassword] = useState(""),
    [busy, setBusy] = useState(false),
    [localError, setLocalError] = useState("");
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setLocalError("");
    try {
      onSuccess(
        await api<Session>("/api/auth.php", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }),
      );
    } catch (x) {
      setLocalError(x instanceof Error ? x.message : "No se pudo ingresar");
    } finally {
      setBusy(false);
    }
  };
  return (
    <Shell>
      <div className="rounded-[28px] border border-[#d2b66e]/30 bg-[#172117] p-7 shadow-2xl">
        <img
          src="/assets/logo-vivero-el-copihue.png"
          className="mx-auto size-20 rounded-full"
          alt="Logo"
        />
        <h1 className="mt-5 text-center font-display text-4xl tracking-[-.07em]">
          Back office
        </h1>
        <p className="mt-2 text-center text-sm text-white/50">
          Administración privada del vivero
        </p>
        <form onSubmit={submit} className="mt-7 grid gap-4">
          <label className="grid gap-2 text-sm">
            <span>Correo</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl border border-white/15 bg-white/5 px-4 outline-none focus:border-[#d2b66e]"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span>Contraseña</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl border border-white/15 bg-white/5 px-4 outline-none focus:border-[#d2b66e]"
            />
          </label>
          {(localError || error) && (
            <p className="text-sm text-red-300">{localError || error}</p>
          )}
          <button
            disabled={busy}
            className="mt-2 h-13 rounded-full bg-[#d2b66e] font-bold text-[#151915] disabled:opacity-60"
          >
            {busy ? "Ingresando…" : "Ingresar"}
          </button>
        </form>
      </div>
    </Shell>
  );
}

function Plants({
  plants,
  csrf,
  changed,
  fail,
}: {
  plants: Plant[];
  csrf: string;
  changed: () => void;
  fail: (e: string) => void;
}) {
  const [editing, setEditing] = useState<Plant | null>(null);
  const sorted = useMemo(
    () => plants.slice().sort((a, b) => a.name.localeCompare(b.name, "es")),
    [plants],
  );
  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl tracking-[-.07em]">Plantas</h1>
          <p className="text-sm text-white/45">
            {plants.length} variedades publicadas
          </p>
        </div>
        <button
          onClick={() => setEditing({ ...emptyPlant, id: crypto.randomUUID() })}
          className="flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#151915]"
        >
          <Plus className="size-4" />
          Agregar
        </button>
      </div>
      <div className="grid gap-3">
        {sorted.map((p) => (
          <article
            key={p.id}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-3"
          >
            <img
              src={p.image}
              alt=""
              className="size-20 rounded-xl bg-black/20 object-cover"
            />
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-semibold">{p.name}</h2>
              <p className="mt-1 text-sm text-white/45">
                {p.category} ·{" "}
                {p.price === null
                  ? "Precio por confirmar"
                  : `$${p.price.toLocaleString("es-CL")}`}
              </p>
            </div>
            <button
              onClick={() => setEditing(p)}
              className="grid size-11 place-items-center rounded-full border border-white/15"
            >
              <Pencil className="size-4" />
            </button>
          </article>
        ))}
      </div>
      {editing && (
        <PlantForm
          plant={editing}
          csrf={csrf}
          close={() => setEditing(null)}
          saved={() => {
            setEditing(null);
            changed();
          }}
          fail={fail}
        />
      )}
    </section>
  );
}

function PlantForm({
  plant,
  csrf,
  close,
  saved,
  fail,
}: {
  plant: Plant;
  csrf: string;
  close: () => void;
  saved: () => void;
  fail: (e: string) => void;
}) {
  const [v, setV] = useState(plant),
    [busy, setBusy] = useState(false);
  const set = (k: keyof Plant, x: string | number | null) =>
    setV({ ...v, [k]: x });
  const upload = async (file: File) => {
    const f = new FormData();
    f.append("image", file);
    try {
      set(
        "image",
        (
          await api<{ url: string }>("/api/upload.php", {
            method: "POST",
            body: f,
            headers: { "X-CSRF-Token": csrf },
          })
        ).url,
      );
    } catch (e) {
      fail(e instanceof Error ? e.message : "No se pudo subir");
    }
  };
  const save = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api("/api/admin.php?resource=plants", {
        method: "PUT",
        headers: { "X-CSRF-Token": csrf },
        body: JSON.stringify(v),
      });
      saved();
    } catch (x) {
      fail(x instanceof Error ? x.message : "No se pudo guardar");
    } finally {
      setBusy(false);
    }
  };
  const remove = async () => {
    if (!confirm(`¿Eliminar ${v.name}?`)) return;
    try {
      await api(
        `/api/admin.php?resource=plants&id=${encodeURIComponent(v.id)}`,
        { method: "DELETE", headers: { "X-CSRF-Token": csrf } },
      );
      saved();
    } catch (x) {
      fail(x instanceof Error ? x.message : "No se pudo eliminar");
    }
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 p-3">
      <form
        onSubmit={save}
        className="ml-auto min-h-full max-w-3xl rounded-[26px] bg-[#f1eee5] p-5 text-[#151915] sm:p-8"
      >
        <div className="flex justify-between">
          <h2 className="font-display text-3xl">
            {plant.name ? `Editar ${plant.name}` : "Nueva planta"}
          </h2>
          <button type="button" onClick={close}>
            <X />
          </button>
        </div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field
            required
            label="Nombre"
            value={v.name}
            onChange={(x) => set("name", x)}
          />
          <Field
            label="Nombre científico"
            value={v.botanical}
            onChange={(x) => set("botanical", x)}
          />
          <Field
            required
            label="Categoría"
            value={v.category}
            onChange={(x) => set("category", x)}
          />
          <Field
            label="Precio (vacío = por confirmar)"
            type="number"
            value={v.price}
            onChange={(x) => set("price", x === "" ? null : Number(x))}
          />
          <Field
            label="Luz"
            value={v.light}
            onChange={(x) => set("light", x)}
          />
          <Field
            label="Riego"
            value={v.water}
            onChange={(x) => set("water", x)}
          />
          <Field
            label="Temporada"
            value={v.season}
            onChange={(x) => set("season", x)}
          />
          <Field
            label="Dificultad"
            value={v.difficulty}
            onChange={(x) => set("difficulty", x)}
          />
          <div className="sm:col-span-2">
            <Area
              label="Descripción"
              value={v.description}
              onChange={(x) => set("description", x)}
            />
          </div>
          <div className="sm:col-span-2">
            <Area
              label="Advertencia para mascotas"
              value={v.petNote}
              onChange={(x) => set("petNote", x)}
            />
          </div>
          <div className="sm:col-span-2">
            <Field
              label="Enlace de imagen"
              value={v.image}
              onChange={(x) => set("image", x)}
            />
            <label className="mt-3 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-black/25 bg-white">
              <ImagePlus className="size-4" />
              Subir fotografía
              <input
                hidden
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) =>
                  e.target.files?.[0] && void upload(e.target.files[0])
                }
              />
            </label>
            {v.image && (
              <img
                src={v.image}
                className="mt-3 aspect-[16/8] w-full rounded-xl object-cover"
                alt="Vista previa"
              />
            )}
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          {plant.name ? (
            <button
              type="button"
              onClick={remove}
              className="flex items-center gap-2 text-red-700"
            >
              <Trash2 className="size-4" />
              Eliminar
            </button>
          ) : (
            <span />
          )}
          <button
            disabled={busy}
            className="flex h-12 items-center gap-2 rounded-full bg-[#172117] px-6 font-bold text-white"
          >
            <Save className="size-4" />
            {busy ? "Guardando…" : "Guardar planta"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Content({
  settings,
  csrf,
  saved,
  fail,
}: {
  settings: SiteSettings;
  csrf: string;
  saved: (s: SiteSettings) => void;
  fail: (e: string) => void;
}) {
  const [v, setV] = useState(settings),
    set = (k: keyof SiteSettings, x: string) => setV({ ...v, [k]: x });
  const submit = async () => {
    try {
      await api("/api/admin.php?resource=settings", {
        method: "PUT",
        headers: { "X-CSRF-Token": csrf },
        body: JSON.stringify(v),
      });
      saved(v);
    } catch (e) {
      fail(e instanceof Error ? e.message : "No se pudo guardar");
    }
  };
  return (
    <section>
      <h1 className="font-display text-4xl">Contenido de la página</h1>
      <div className="mt-6 grid gap-6 rounded-[26px] bg-[#f1eee5] p-5 text-[#151915] sm:grid-cols-2 sm:p-8">
        <Field
          label="Texto sobre el título"
          value={v.heroEyebrow}
          onChange={(x) => set("heroEyebrow", x)}
        />
        <Field
          label="Primera línea del título"
          value={v.heroTitleFirst}
          onChange={(x) => set("heroTitleFirst", x)}
        />
        <Field
          label="Segunda línea del título"
          value={v.heroTitleSecond}
          onChange={(x) => set("heroTitleSecond", x)}
        />
        <div className="sm:col-span-2">
          <Area
            label="Descripción principal"
            value={v.heroDescription}
            onChange={(x) => set("heroDescription", x)}
          />
          <Area
            label="Texto del catálogo"
            value={v.catalogDescription}
            onChange={(x) => set("catalogDescription", x)}
          />
        </div>
        <Field
          label="Título del vivero"
          value={v.nurseryTitle}
          onChange={(x) => set("nurseryTitle", x)}
        />
        <div className="sm:col-span-2">
          <Area
            label="Descripción del vivero"
            value={v.nurseryDescription}
            onChange={(x) => set("nurseryDescription", x)}
          />
        </div>
        <Field
          label="WhatsApp visible"
          value={v.phoneDisplay}
          onChange={(x) => set("phoneDisplay", x)}
        />
        <Field
          label="WhatsApp para enlaces"
          value={v.phoneWhatsApp}
          onChange={(x) => set("phoneWhatsApp", x.replace(/\D/g, ""))}
        />
        <Field
          label="Dirección"
          value={v.address}
          onChange={(x) => set("address", x)}
        />
        <Field
          label="Horario"
          value={v.hours}
          onChange={(x) => set("hours", x)}
        />
        <Field
          label="Google Maps"
          value={v.maps}
          onChange={(x) => set("maps", x)}
        />
        <Field
          label="Valoración"
          value={v.rating}
          onChange={(x) => set("rating", x)}
        />
        <Field
          label="Opiniones"
          value={v.reviews}
          onChange={(x) => set("reviews", x)}
        />
        <div className="sm:col-span-2">
          <Area
            label="Texto de despachos"
            value={v.dispatchText}
            onChange={(x) => set("dispatchText", x)}
          />
        </div>
        <button
          onClick={submit}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#172117] font-bold text-white sm:col-start-2"
        >
          <Save className="size-4" />
          Guardar cambios
        </button>
      </div>
    </section>
  );
}

function Faqs({
  faqs,
  csrf,
  saved,
  fail,
}: {
  faqs: FaqItem[];
  csrf: string;
  saved: (f: FaqItem[]) => void;
  fail: (e: string) => void;
}) {
  const [v, setV] = useState(faqs);
  const submit = async () => {
    try {
      await api("/api/admin.php?resource=faqs", {
        method: "PUT",
        headers: { "X-CSRF-Token": csrf },
        body: JSON.stringify(v.map((x, i) => ({ ...x, position: i }))),
      });
      saved(v);
    } catch (e) {
      fail(e instanceof Error ? e.message : "No se pudo guardar");
    }
  };
  return (
    <section>
      <div className="flex justify-between">
        <h1 className="font-display text-4xl">Preguntas frecuentes</h1>
        <button
          onClick={() =>
            setV([
              ...v,
              { id: Date.now(), question: "", answer: "", position: v.length },
            ])
          }
          className="grid size-12 place-items-center rounded-full bg-white text-black"
        >
          <Plus />
        </button>
      </div>
      <div className="mt-6 grid gap-4">
        {v.map((f, i) => (
          <div
            key={f.id}
            className="rounded-2xl bg-[#f1eee5] p-5 text-[#151915]"
          >
            <div className="flex gap-3">
              <div className="grid flex-1 gap-4">
                <Field
                  label={`Pregunta ${i + 1}`}
                  value={f.question}
                  onChange={(x) =>
                    setV(
                      v.map((y) => (y.id === f.id ? { ...y, question: x } : y)),
                    )
                  }
                />
                <Area
                  label="Respuesta"
                  value={f.answer}
                  onChange={(x) =>
                    setV(
                      v.map((y) => (y.id === f.id ? { ...y, answer: x } : y)),
                    )
                  }
                />
              </div>
              <button
                onClick={() => setV(v.filter((y) => y.id !== f.id))}
                className="self-start text-red-700"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={submit}
          className="ml-auto flex h-12 items-center gap-2 rounded-full bg-[#d2b66e] px-6 font-bold text-black"
        >
          <Save className="size-4" />
          Guardar preguntas
        </button>
      </div>
    </section>
  );
}
