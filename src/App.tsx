import React, { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sun,
  Droplets,
  CalendarDays,
  X,
} from "lucide-react";
import { CartProvider, useCart } from "@/components/cart/CartContext";
import { formatCLP, Plant } from "@/lib/catalog";
import { HERO_MOTION } from "@/lib/assets";
import { FaqItem, SiteSettings, useSiteData } from "@/lib/site-data";
const ease = [0.22, 1, 0.36, 1] as const;

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-[#8b7136] via-[#e5ca7d] to-[#b18c42]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

function WhatsAppButton({ settings }: { settings: SiteSettings }) {
  const message = encodeURIComponent(
    "Hola, Vivero El Copihue. Quisiera consultar por sus plantas y disponibilidad.",
  );
  return (
    <motion.a
      href={`https://wa.me/${settings.phoneWhatsApp}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Consultar por WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.55, ease }}
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.96 }}
      className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-3 rounded-full border border-[#e5ca7d]/45 bg-[#1d6f42] px-4 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(0,0,0,.4)] sm:bottom-7 sm:right-7 sm:h-16 sm:px-5"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-ping rounded-full border border-[#e5ca7d]/30 opacity-30 [animation-duration:2.4s]"
      />
      <MessageCircle className="size-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </motion.a>
  );
}

function Header() {
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useCart();
  const links = [
    ["Plantas", "catalogo"],
    ["Cómo comprar", "como-comprar"],
    ["El vivero", "vivero"],
    ["Preguntas", "preguntas"],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090b09]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <a
          href="#inicio"
          className="flex items-center gap-3"
          aria-label="Vivero El Copihue, inicio"
        >
          <img
            src="/assets/logo-vivero-el-copihue.png"
            alt=""
            className="size-14 rounded-full object-cover"
          />
          <span className="hidden text-sm font-semibold tracking-wide sm:block">
            Vivero El Copihue
          </span>
        </a>
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navegación principal"
        >
          {links.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm text-white/65 transition hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen(true)}
            className="relative flex h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm transition hover:bg-white hover:text-[#101510]"
            aria-label={`Abrir carrito, ${count} productos`}
          >
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Carrito</span>
            <span className="grid size-5 place-items-center rounded-full bg-[#cf332d] text-[11px] font-bold text-white">
              {count}
            </span>
          </button>
          <button
            onClick={() => setMenu((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
            aria-label="Abrir menú"
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-[#090b09] px-5 py-5 lg:hidden"
          >
            {links.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenu(false)}
                className="block border-b border-white/10 py-4 text-lg"
              >
                {label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({
  plants,
  settings,
}: {
  plants: Plant[];
  settings: SiteSettings;
}) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.25], [0, reduced ? 0 : 110]);
  return (
    <section
      id="inicio"
      className="grain relative flex min-h-svh items-end overflow-hidden bg-[#101510] pt-24"
    >
      <motion.img
        style={{ y, scale: 1.06 }}
        src={(plants[1] || plants[0])?.image}
        alt="Hortensias en flor"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,5,.94)_0%,rgba(5,8,5,.65)_52%,rgba(5,8,5,.22)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090b09] via-transparent to-[#090b09]/45" />
      <div className="relative mx-auto grid w-full max-w-[1440px] gap-10 px-5 pb-14 sm:px-8 lg:grid-cols-[1fr_360px] lg:items-end lg:pb-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[.24em] text-[#d2b66e]"
          >
            <span className="size-1.5 rounded-full bg-[#cf332d]" />
            {settings.heroEyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="max-w-4xl font-display text-[clamp(3.2rem,8.5vw,8.6rem)] leading-[.86] tracking-[-.095em]"
          >
            {settings.heroTitleFirst}
            <br />
            <span className="text-[#bdc6b4]">{settings.heroTitleSecond}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 max-w-xl text-base leading-7 text-white/65 sm:text-lg"
          >
            {settings.heroDescription}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a
              href="#catalogo"
              className="inline-flex h-14 items-center gap-4 rounded-full bg-white px-7 font-semibold text-[#101510] transition hover:scale-[1.02]"
            >
              Ver plantas <ArrowRight className="size-4" />
            </a>
            <a
              href={settings.maps}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 items-center gap-3 rounded-full border border-white/25 px-6 font-medium backdrop-blur transition hover:bg-white/10"
            >
              <MapPin className="size-4" />
              Cómo llegar
            </a>
          </motion.div>
        </div>
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
          className="rounded-[28px] border border-white/15 bg-black/25 p-6 backdrop-blur-xl"
        >
          <div className="flex items-end justify-between">
            <div>
              <strong className="font-display text-5xl tracking-[-.08em]">
                {settings.rating}
              </strong>
              <p className="mt-1 text-sm text-white/55">
                {settings.reviews} en Google
              </p>
            </div>
            <span className="text-[#d2b66e]">★★★★★</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 text-sm">
            <div>
              <span className="block text-white/45">Atención</span>
              <strong>Familiar</strong>
            </div>
            <div>
              <span className="block text-white/45">Servicio</span>
              <strong>Despacho</strong>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function ProductCard({
  plant,
  onDetail,
}: {
  plant: Plant;
  onDetail: () => void;
}) {
  const { add } = useCart();
  return (
    <article className="group overflow-hidden rounded-[30px] bg-[#e9e6dc] text-[#151915]">
      <button
        onClick={onDetail}
        className="block w-full text-left"
        aria-label={`Ver detalles de ${plant.name}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={plant.image}
            alt={plant.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-[#101510]/75 px-3 py-1.5 text-xs text-white backdrop-blur">
            {plant.category}
          </span>
        </div>
        <div className="px-6 pt-5">
          <p className="text-xs italic text-[#151915]/50">{plant.botanical}</p>
          <h3 className="mt-1 font-display text-2xl tracking-[-.08em]">
            {plant.name}
          </h3>
          <div className="mt-4 text-xs text-[#151915]/65">
            <span className="rounded-full bg-black/5 px-3 py-2">
              {plant.light}
            </span>
          </div>
        </div>
      </button>
      <div className="flex items-center justify-between p-6">
        <div>
          <strong className="text-lg">{formatCLP(plant.price)}</strong>
          <span className="block text-[11px] text-[#151915]/45">
            {plant.price === null
              ? "Confirmar por WhatsApp"
              : "Precio referencial"}
          </span>
        </div>
        <button
          onClick={() => add(plant)}
          className="grid size-12 place-items-center rounded-full bg-[#172117] text-white transition hover:scale-110"
          aria-label={`Agregar ${plant.name} al carrito`}
        >
          <Plus className="size-5" />
        </button>
      </div>
    </article>
  );
}

function RootMotion() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease }}
      className="relative min-h-[230px] overflow-hidden rounded-[30px] border border-[#d2b66e]/25 bg-[#080a08] sm:min-h-[300px] lg:min-h-[360px]"
    >
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -8, 0], rotate: [-0.25, 0.25, -0.25] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-4"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_MOTION.poster}
          className="h-full w-full object-cover motion-reduce:hidden"
        >
          <source src={HERO_MOTION.webm} type="video/webm" />
          <source src={HERO_MOTION.mp4} type="video/mp4" />
        </video>
        <img
          src={HERO_MOTION.poster}
          alt="Raíz cubierta de musgo"
          className="hidden h-full w-full object-cover motion-reduce:block"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#101510]/45 via-transparent to-[#101510]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080a08]/55 via-transparent to-transparent" />
      <div className="absolute inset-x-6 bottom-5 flex items-center justify-between border-t border-white/15 pt-4 text-[11px] uppercase tracking-[.2em] text-white/55">
        <span>Raíces vivas</span>
        <span className="text-[#d2b66e]">El origen de todo</span>
      </div>
    </motion.div>
  );
}

function RootPageBackdrop() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.22, 0.82, 1],
    [0, 0, 0.13, 0.1, 0],
  );
  return (
    <motion.div
      aria-hidden="true"
      style={{ y, opacity }}
      className="pointer-events-none fixed inset-y-[-12%] right-[-16%] z-[3] w-[105vw] overflow-hidden [mask-image:linear-gradient(to_left,black_10%,transparent_88%)] sm:right-[-8%] sm:w-[78vw]"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={HERO_MOTION.poster}
        className="h-full w-full scale-125 object-cover mix-blend-soft-light motion-reduce:hidden"
      >
        <source src={HERO_MOTION.webm} type="video/webm" />
        <source src={HERO_MOTION.mp4} type="video/mp4" />
      </video>
      <img
        src={HERO_MOTION.poster}
        alt=""
        className="hidden h-full w-full scale-125 object-cover mix-blend-soft-light motion-reduce:block"
      />
    </motion.div>
  );
}

function Catalog({
  plants,
  settings,
}: {
  plants: Plant[];
  settings: SiteSettings;
}) {
  const [category, setCategory] = useState("Todas");
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<Plant | null>(null);
  const categories = useMemo(
    () => ["Todas", ...new Set(plants.map((plant) => plant.category))],
    [plants],
  );
  const filtered = useMemo(
    () =>
      plants.filter(
        (plant) =>
          (category === "Todas" || plant.category === category) &&
          `${plant.name} ${plant.botanical}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [category, query, plants],
  );
  return (
    <section id="catalogo" className="bg-[#101510] px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <p className="eyebrow">01 · Catálogo de prueba</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
          <div>
            <h2 className="section-title">
              Plantas para
              <br />
              cada rincón.
            </h2>
            <p className="mt-5 max-w-lg text-white/55">
              {plants.length} {settings.catalogDescription}
            </p>
          </div>
          <RootMotion />
        </div>
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-5 py-2.5 text-sm transition ${category === item ? "bg-white text-[#101510]" : "border border-white/15 text-white/60 hover:text-white"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="flex h-13 items-center gap-3 rounded-full border border-white/15 px-5">
            <Search className="size-4 text-white/45" />
            <span className="sr-only">Buscar planta</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar planta"
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/35 sm:w-52"
            />
          </label>
        </div>
        <motion.div
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence>
            {filtered.map((plant) => (
              <motion.div
                key={plant.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease }}
              >
                <ProductCard plant={plant} onDetail={() => setDetail(plant)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {!filtered.length && (
          <p className="py-20 text-center text-white/50">
            No encontramos plantas con ese nombre.
          </p>
        )}
      </div>
      <PlantDetail plant={detail} onClose={() => setDetail(null)} />
    </section>
  );
}

function PlantDetail({
  plant,
  onClose,
}: {
  plant: Plant | null;
  onClose: () => void;
}) {
  const { add } = useCart();
  useEffect(() => {
    if (plant) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [plant]);
  return (
    <AnimatePresence>
      {plant && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-end bg-black/70 p-0 backdrop-blur-sm sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="max-h-[96vh] w-full overflow-y-auto rounded-t-[32px] bg-[#e9e6dc] text-[#151915] sm:max-w-2xl sm:rounded-[32px]"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-[32px]">
              <img
                src={plant.image}
                alt={plant.name}
                className="h-full w-full object-cover"
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-black/60 text-white backdrop-blur"
                aria-label="Cerrar detalles"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-sm italic text-black/45">{plant.botanical}</p>
              <div className="flex items-start justify-between gap-5">
                <h3 className="font-display text-4xl tracking-[-.09em] sm:text-5xl">
                  {plant.name}
                </h3>
                <strong className="shrink-0 text-xl">
                  {formatCLP(plant.price)}
                </strong>
              </div>
              <p className="mt-5 leading-7 text-black/65">
                {plant.description}
              </p>
              <dl className="mt-7 grid gap-px overflow-hidden rounded-2xl bg-black/10 sm:grid-cols-3">
                <Care icon={<Sun />} label="Luz" value={plant.light} />
                <Care icon={<Droplets />} label="Riego" value={plant.water} />
                <Care
                  icon={<CalendarDays />}
                  label="Temporada"
                  value={plant.season}
                />
              </dl>
              <p className="mt-5 rounded-2xl bg-[#cf332d]/10 p-4 text-sm text-[#6f201c]">
                Mascotas: {plant.petNote}
              </p>
              <button
                onClick={() => {
                  add(plant);
                  onClose();
                }}
                className="mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#172117] font-semibold text-white"
              >
                Agregar al carrito <ShoppingBag className="size-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
function Care({
  icon,
  label,
  value,
}: {
  icon: React.ReactElement;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white/65 p-4">
      <div className="mb-3 size-5 text-[#52634f]">{icon}</div>
      <dt className="text-[11px] uppercase tracking-wider text-black/40">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold">{value}</dd>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    [
      "01",
      "Elige tus plantas",
      "Agrega una o varias plantas al carrito y ajusta sus cantidades.",
    ],
    [
      "02",
      "Envía tu pedido",
      "El carrito prepara un mensaje claro y abre la conversación en WhatsApp.",
    ],
    [
      "03",
      "Confirma con nosotros",
      "Revisamos stock, precio final, retiro o despacho antes de concretar la compra.",
    ],
  ];
  return (
    <section
      id="como-comprar"
      className="bg-[#e9e6dc] px-5 py-24 text-[#151915] sm:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="eyebrow !text-[#8c2b26]">02 · Compra acompañada</p>
        <h2 className="section-title mt-6 max-w-4xl">
          Del vivero a tu hogar, sin complicaciones.
        </h2>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[32px] bg-black/10 lg:grid-cols-3">
          {steps.map(([n, title, copy]) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#f3f0e7] p-8 lg:min-h-72"
            >
              <span className="text-xs text-black/35">{n}</span>
              <h3 className="mt-16 font-display text-3xl tracking-[-.08em]">
                {title}
              </h3>
              <p className="mt-4 max-w-sm leading-7 text-black/55">{copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Nursery({ settings }: { settings: SiteSettings }) {
  return (
    <section
      id="vivero"
      className="relative overflow-hidden bg-[#172117] px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="absolute -right-24 top-0 size-[540px] rounded-full bg-[#cf332d]/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="eyebrow">03 · El Vivero</p>
          <h2 className="section-title mt-6">
            {settings.nurseryTitle.split("\n").map((line, index) => (
              <React.Fragment key={line}>
                {index > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/58">
            {settings.nurseryDescription}
          </p>
          <a
            href={settings.maps}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-3 border-b border-[#d2b66e] pb-2 text-[#d2b66e]"
          >
            Abrir ubicación en Google Maps <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Fact value={settings.rating} label="Valoración en Google" />
          <Fact
            value={settings.reviews.replace(/\D/g, "") || settings.reviews}
            label="Opiniones públicas"
          />
          <Fact value="6 días" label="Abierto de lunes a sábado" />
          <Fact value="Sí" label="Despacho disponible" />
        </div>
      </div>
    </section>
  );
}
function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-h-44 flex-col justify-between rounded-[26px] border border-white/10 bg-black/15 p-6">
      <strong className="font-display text-4xl tracking-[-.08em] text-[#d2b66e]">
        {value}
      </strong>
      <span className="text-sm text-white/50">{label}</span>
    </div>
  );
}

function FAQ({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  return (
    <section
      id="preguntas"
      className="bg-[#101510] px-5 py-24 sm:px-8 lg:py-32"
    >
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <p className="eyebrow">04 · Preguntas</p>
          <h2 className="section-title mt-6">
            Antes de
            <br />
            pedir.
          </h2>
        </div>
        <div>
          {faqs.map((faq, i) => (
            <div key={faq.id} className="border-t border-white/12">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-5 py-7 text-left text-lg font-semibold"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`size-5 shrink-0 transition ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="max-w-2xl overflow-hidden pb-7 leading-7 text-white/55"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CartDrawer({ settings }: { settings: SiteSettings }) {
  const { items, total, open, setOpen, change, remove } = useCart();
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const hasPendingPrice = items.some(({ plant }) => plant.price === null);
  const send = () => {
    if (!items.length) return;
    const lines = items.map(
      ({ plant, quantity }) =>
        `• ${quantity} × ${plant.name} — ${plant.price === null ? "precio por confirmar" : `${formatCLP(plant.price)} c/u`}`,
    );
    const message = [
      "Hola, Vivero El Copihue. Quisiera consultar disponibilidad de:",
      "",
      ...lines,
      "",
      `Total referencial de productos con precio: ${formatCLP(total)}`,
      "",
      "¿Me confirman stock, precio final y opciones de retiro o despacho?",
    ].join("\n");
    window.open(
      `https://wa.me/${settings.phoneWhatsApp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] bg-black/65 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease }}
            className="ml-auto flex h-full w-full max-w-lg flex-col bg-[#e9e6dc] text-[#151915]"
          >
            <div className="flex h-20 items-center justify-between border-b border-black/10 px-6">
              <div>
                <h2 className="font-display text-2xl tracking-[-.08em]">
                  Tu carrito
                </h2>
                <p className="text-xs text-black/45">
                  Solicitud sin pago en línea
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center rounded-full border border-black/15"
                aria-label="Cerrar carrito"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {!items.length ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <ShoppingBag className="mx-auto size-10 text-black/25" />
                    <p className="mt-4 font-semibold">Tu carrito está vacío</p>
                    <button
                      onClick={() => setOpen(false)}
                      className="mt-5 text-sm underline"
                    >
                      Explorar plantas
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map(({ plant, quantity }) => (
                    <li
                      key={plant.id}
                      className="flex gap-4 rounded-2xl bg-white/65 p-3"
                    >
                      <img
                        src={plant.image}
                        alt=""
                        className="size-24 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-3">
                          <div>
                            <h3 className="font-semibold">{plant.name}</h3>
                            <p className="text-xs text-black/45">
                              {plant.price === null
                                ? "Precio por confirmar"
                                : `${formatCLP(plant.price)} c/u`}
                            </p>
                          </div>
                          <button
                            onClick={() => remove(plant.id)}
                            aria-label={`Eliminar ${plant.name}`}
                          >
                            <X className="size-4 text-black/35" />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <button
                            onClick={() => change(plant.id, -1)}
                            className="grid size-8 place-items-center rounded-full border border-black/15"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-4 text-center text-sm font-bold">
                            {quantity}
                          </span>
                          <button
                            onClick={() => change(plant.id, 1)}
                            className="grid size-8 place-items-center rounded-full border border-black/15"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-black/10 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black/50">
                    {hasPendingPrice
                      ? "Subtotal con precios disponibles"
                      : "Total referencial"}
                  </span>
                  <strong className="text-2xl">{formatCLP(total)}</strong>
                </div>
                <p className="mt-2 text-xs leading-5 text-black/45">
                  La disponibilidad, precio final y despacho se confirman en la
                  conversación.
                </p>
                <button
                  onClick={send}
                  className="mt-5 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#1d6f42] font-semibold text-white transition hover:bg-[#175c36]"
                >
                  Enviar pedido por WhatsApp <ArrowRight className="size-4" />
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-white/10 bg-[#080a08] px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/assets/logo-vivero-el-copihue.png"
            alt="Logo de Vivero El Copihue"
            className="size-20 rounded-full"
          />
          <div>
            <strong>Vivero El Copihue</strong>
            <p className="mt-1 max-w-sm text-sm text-white/45">
              {settings.address}
            </p>
            <p className="mt-1 text-sm text-white/45">
              {settings.hours} · Domingo cerrado
            </p>
          </div>
        </div>
        <div className="text-sm text-white/45">
          <a
            className="block text-white hover:underline"
            href={`tel:+${settings.phoneWhatsApp}`}
          >
            {settings.phoneDisplay}
          </a>
          <a
            className="mt-2 block hover:text-white"
            href={settings.maps}
            target="_blank"
            rel="noreferrer"
          >
            Ver ubicación
          </a>
          <p className="mt-4 text-xs text-white/35">
            Página creada por kprile@oulook.es
          </p>
          <a
            className="mt-4 inline-flex rounded-full border border-[#d2b66e]/50 px-4 py-2 text-xs font-semibold text-[#d2b66e] transition hover:bg-[#d2b66e] hover:text-[#101510]"
            href="/?admin"
          >
            Administrar sitio
          </a>
        </div>
      </div>
    </footer>
  );
}
function AppContent() {
  const { data } = useSiteData();
  return (
    <>
      <RootPageBackdrop />
      <ScrollProgress />
      <Header />
      <main>
        <Hero plants={data.plants} settings={data.settings} />
        <Catalog plants={data.plants} settings={data.settings} />
        <HowItWorks />
        <Nursery settings={data.settings} />
        <FAQ faqs={data.faqs} />
      </main>
      <Footer settings={data.settings} />
      <WhatsAppButton settings={data.settings} />
      <CartDrawer settings={data.settings} />
    </>
  );
}
export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
