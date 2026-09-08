const DEFAULT_BASE = "https://pub-36eefd528bbb4e28bdef0ce39a1018e0.r2.dev/Prompt/40green/public";
const BASE = (
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_ASSET_BASE
    ? process.env.NEXT_PUBLIC_ASSET_BASE
    : ((import.meta as any).env?.VITE_ASSET_BASE ?? DEFAULT_BASE)
).replace(/\/$/, "");

export const asset = (path: string) => `${BASE}${path.startsWith("/") ? path : `/${path}`}`;

export const HERO_MOTION = {
  webm: asset("/media/hero-motion.webm"),
  mp4: asset("/media/hero-motion.mp4"),
  poster: asset("/media/hero-motion-poster.jpg"),
};

export const IMAGES = {
  heroStill: asset("/images/hero-still.jpg"),
  heroBackdrop: asset("/images/hero-bg.jpg"),
  mossRock: asset("/images/moss-rock.jpg"),
  mossBranch: asset("/images/moss-branch.jpg"),
  mossDark: asset("/images/moss-dark.jpg"),
  mossWave: asset("/images/moss-wave.jpg"),
  mossRidge: asset("/images/moss-ridge.jpg"),
};

export const BRAND_FILM = {
  mp4: asset("/media/arkkhe-film.mp4"),
  poster: asset("/media/arkkhe-film-poster.jpg"),
};

export const FAVICON = asset("/favicon.svg");

