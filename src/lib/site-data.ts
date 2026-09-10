import { useCallback, useEffect, useState } from "react";
import { PLANTS, Plant, STORE } from "@/lib/catalog";

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  position: number;
}
export interface SiteSettings {
  heroEyebrow: string;
  heroTitleFirst: string;
  heroTitleSecond: string;
  heroDescription: string;
  catalogDescription: string;
  nurseryTitle: string;
  nurseryDescription: string;
  phoneDisplay: string;
  phoneWhatsApp: string;
  maps: string;
  address: string;
  hours: string;
  rating: string;
  reviews: string;
  dispatchText: string;
}
export interface SiteData {
  plants: Plant[];
  settings: SiteSettings;
  faqs: FaqItem[];
}

export const DEFAULT_SETTINGS: SiteSettings = {
  heroEyebrow: "Vivero familiar · Melipilla",
  heroTitleFirst: "Tu espacio,",
  heroTitleSecond: "más vivo.",
  heroDescription:
    "Elige tus plantas, revisa sus cuidados y arma tu pedido. Confirmamos stock, entrega y pago contigo directamente por WhatsApp.",
  catalogDescription:
    "especies con una guía rápida de luz, riego y temporada. El stock y precio final se confirman por WhatsApp.",
  nurseryTitle: "Atención cercana,\nplantas bien cuidadas.",
  nurseryDescription:
    "En Google, quienes han visitado Vivero El Copihue destacan su variedad, precios accesibles y atención amable. Somos un centro de jardinería familiar en Melipilla con opción de despacho.",
  phoneDisplay: STORE.phoneDisplay,
  phoneWhatsApp: STORE.phoneWhatsApp,
  maps: STORE.maps,
  address: STORE.address,
  hours: STORE.hours,
  rating: STORE.rating,
  reviews: STORE.reviews,
  dispatchText:
    "Sí, realizamos despachos con un cargo adicional. La cobertura, fecha y valor se coordinan directamente por WhatsApp.",
};
export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 1,
    position: 0,
    question: "¿La compra se paga en esta página?",
    answer:
      "No. La página arma tu solicitud y la envía a WhatsApp. Allí confirmamos stock, precio final, retiro o despacho y la forma de pago.",
  },
  {
    id: 2,
    position: 1,
    question: "¿Los precios y el stock están actualizados?",
    answer:
      "Los precios son referenciales y la disponibilidad se confirma antes de cerrar cada pedido.",
  },
  {
    id: 3,
    position: 2,
    question: "¿Puedo pedir varias unidades?",
    answer:
      "Sí. En el carrito puedes aumentar o disminuir cantidades antes de enviar el mensaje.",
  },
  {
    id: 4,
    position: 3,
    question: "¿Hacen despachos?",
    answer:
      "Sí, realizamos despachos con un cargo adicional. La cobertura, fecha y valor se coordinan directamente por WhatsApp.",
  },
  {
    id: 5,
    position: 4,
    question: "¿Las fichas reemplazan el consejo de un especialista?",
    answer:
      "No. Son una guía inicial; el riego y la temporada cambian según ubicación, maceta y clima. Para mascotas, consulta también a un profesional veterinario.",
  },
];
export const DEFAULT_SITE_DATA: SiteData = {
  plants: PLANTS,
  settings: DEFAULT_SETTINGS,
  faqs: DEFAULT_FAQS,
};

export function useSiteData() {
  const [data, setData] = useState(DEFAULT_SITE_DATA);
  const [loading, setLoading] = useState(true);
  const reload = useCallback(async () => {
    try {
      const r = await fetch("/api/content.php", {
        headers: { Accept: "application/json" },
      });
      if (!r.ok) throw new Error();
      const remote = (await r.json()) as SiteData;
      setData({
        ...remote,
        settings: { ...DEFAULT_SETTINGS, ...remote.settings },
        faqs: remote.faqs.length ? remote.faqs : DEFAULT_FAQS,
        plants: remote.plants.length ? remote.plants : PLANTS,
      });
    } catch {
      setData(DEFAULT_SITE_DATA);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void reload();
  }, [reload]);
  return { data, loading, reload };
}
