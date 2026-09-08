import { IMAGES } from "./assets";

export const NAV_ITEMS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Stove", href: "#stove", id: "stove" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const MENU_ITEMS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Philosophy", href: "#philosophy", id: "philosophy" },
  { label: "Stove", href: "#stove", id: "stove" },
  { label: "Impact", href: "#impact", id: "impact" },
  { label: "Journal", href: "#journal", id: "journal" },
  { label: "Questions", href: "#questions", id: "questions" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const PRODUCT_FAMILIES = ["Todos", "Indoor", "Outdoor", "Portable"] as const;
export type ProductFamily = (typeof PRODUCT_FAMILIES)[number];

export interface Product {
  id: string;
  name: string;
  family: "Indoor" | "Outdoor" | "Portable";
  tagline: string;
  price: string;
  output: string;
  weight: string;
  efficiency: string;
  fuel: string;
  image: string;
  description: string;
  features: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "aurora",
    name: "Aurora 01",
    family: "Indoor",
    tagline: "Heat for Life",
    price: "€ 1.480",
    output: "8,4 kW",
    weight: "282 G",
    efficiency: "91%",
    fuel: "Pellet de biomasa",
    image: IMAGES.mossRock,
    description:
      "La estufa de interior que abre la colección. Cámara de combustión de doble pared en acero de titanio y un cristal que deja ver el fuego desde tres lados.",
    features: ["Doble combustión", "Control por app", "Acero de titanio", "Silencio total"],
  },
  {
    id: "verdant",
    name: "Verdant 02",
    family: "Indoor",
    tagline: "Warmth that breathes",
    price: "€ 1.920",
    output: "10,1 kW",
    weight: "318 G",
    efficiency: "93%",
    fuel: "Pellet de biomasa",
    image: IMAGES.mossDark,
    description:
      "Pensada para espacios abiertos. Reparte el calor por convección natural y filtra el 99% de las partículas antes de que salgan por el tiro.",
    features: ["Convección natural", "Filtro de partículas", "Tiro sellado", "Modo eco"],
  },
  {
    id: "ridge",
    name: "Ridge 03",
    family: "Outdoor",
    tagline: "Fire under the sky",
    price: "€ 940",
    output: "6,0 kW",
    weight: "204 G",
    efficiency: "88%",
    fuel: "Leña certificada",
    image: IMAGES.mossRidge,
    description:
      "Brasero de exterior con pantalla térmica desmontable. Resiste la intemperie sin tratamiento y envejece con una pátina verde propia.",
    features: ["Uso en exterior", "Pantalla térmica", "Pátina viva", "Montaje sin tornillos"],
  },
  {
    id: "wave",
    name: "Wave 04",
    family: "Outdoor",
    tagline: "Nature's beauty is boundless",
    price: "€ 1.120",
    output: "7,2 kW",
    weight: "246 G",
    efficiency: "89%",
    fuel: "Leña certificada",
    image: IMAGES.mossWave,
    description:
      "Una pieza escultórica para jardín. La curva del cuerpo dirige el aire y mantiene la llama estable incluso con viento cruzado.",
    features: ["Cuerpo curvo", "Estable con viento", "Base flotante", "Acabado mate"],
  },
  {
    id: "seed",
    name: "Seed 05",
    family: "Portable",
    tagline: "Take the forest with you",
    price: "€ 380",
    output: "2,8 kW",
    weight: "96 G",
    efficiency: "84%",
    fuel: "Bio-alcohol",
    image: IMAGES.mossBranch,
    description:
      "La más pequeña de la familia. Cabe en una mochila, se enciende en veinte segundos y no deja rastro donde se apoya.",
    features: ["Portátil", "Sin humo", "Encendido en 20 s", "Funda de lino"],
  },
  {
    id: "phyto",
    name: "Phyto 06",
    family: "Portable",
    tagline: "Phytotherapy at 43%",
    price: "€ 520",
    output: "3,4 kW",
    weight: "134 G",
    efficiency: "86%",
    fuel: "Bio-alcohol",
    image: IMAGES.mossRock,
    description:
      "Difusor y estufa a la vez: un cajón superior de cerámica libera aceites esenciales del bosque mientras la llama trabaja.",
    features: ["Difusor integrado", "Cerámica porosa", "Doble mecha", "Recarga magnética"],
  },
];

export const PHILOSOPHY_POINTS = [
  {
    n: "01",
    title: "Materia primero",
    body: "Elegimos el material antes que la forma. Titanio, lino, cerámica porosa y madera certificada: nada que no pueda volver al suelo o al horno.",
  },
  {
    n: "02",
    title: "Fuego contenido",
    body: "La doble combustión quema el humo antes de que salga. Menos partículas, más calor por gramo de biomasa y un cristal que se mantiene limpio.",
  },
  {
    n: "03",
    title: "Bosque devuelto",
    body: "Por cada estufa que sale del taller replantamos noventa metros cuadrados de ladera junto a las cooperativas con las que compramos la leña.",
  },
];

export const STATS = [
  { label: "Titanium Forest", value: 282, suffix: " G", caption: "Peso del cuerpo de combustión" },
  { label: "Phytotherapy", value: 43, suffix: "%", caption: "Más aceites esenciales en el aire" },
  { label: "Hectáreas replantadas", value: 1240, suffix: "", caption: "Desde 2019, con seis cooperativas" },
  { label: "Emisiones evitadas", value: 96, suffix: "%", caption: "Frente a una estufa de leña abierta" },
];

export const JOURNAL = [
  {
    id: "musgo",
    kicker: "Campo",
    title: "El musgo como termómetro",
    date: "12 Mar 2026",
    readingTime: "6 min",
    image: IMAGES.mossDark,
    excerpt:
      "Medimos la humedad de doce laderas durante un invierno entero. El musgo contó mejor la historia que los sensores.",
  },
  {
    id: "titanio",
    kicker: "Taller",
    title: "Por qué elegimos titanio",
    date: "28 Feb 2026",
    readingTime: "4 min",
    image: IMAGES.mossRidge,
    excerpt:
      "Pesa un tercio menos que el acero y aguanta el doble de ciclos térmicos. Tardamos dos años en poder pagarlo.",
  },
  {
    id: "humo",
    kicker: "Investigación",
    title: "Un fuego que casi no deja humo",
    date: "05 Feb 2026",
    readingTime: "8 min",
    image: IMAGES.mossWave,
    excerpt:
      "La doble combustión no es nueva. Lo nuevo es hacerla funcionar en una cámara de veinte centímetros.",
  },
];

export const FAQ = [
  {
    q: "¿Cuánto tarda en llegar una estufa?",
    a: "Cada pieza se arma por encargo en el taller de Girona. El plazo habitual es de tres a cinco semanas, y te avisamos el día que entra en montaje.",
  },
  {
    q: "¿Sirve para un piso sin salida de humos?",
    a: "Sí, en la familia Portable. Los modelos Seed 05 y Phyto 06 funcionan con bio-alcohol y no necesitan tiro. Los modelos Indoor sí requieren una salida homologada.",
  },
  {
    q: "¿Qué mantenimiento pide?",
    a: "Un vaciado de cenizas cada quince usos y una revisión de juntas al año. Te mandamos el kit de juntas sin coste durante los cinco primeros años.",
  },
  {
    q: "¿De dónde sale el pellet?",
    a: "De seis cooperativas forestales del Pirineo con certificación FSC. Cada saco lleva el código de la parcela de la que vino la madera.",
  },
  {
    q: "¿Hay garantía?",
    a: "Diez años sobre la cámara de combustión y cinco sobre el resto. Reparamos antes que reemplazar: las piezas están pensadas para desmontarse con una sola llave.",
  },
];

export const READOUTS = [
  { label: "Titanium Forest", value: 282, suffix: " G" },
  { label: "Phytotherapy", value: 43, suffix: "%" },
];
