import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useScrollSpy, scrollToId, SPY_IDS } from "@/lib/hooks";
import { NAV_ITEMS } from "@/lib/content";
import { useScrolled } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { TreeMark } from "@/components/ui/Icons";
import { BurgerButton } from "@/components/ui/BurgerButton";
import { MenuOverlay } from "./MenuOverlay";
import { LoginModal } from "./LoginModal";
import { motion, useReducedMotion } from "framer-motion";

interface ChromeContextType {
  activeGroup: string;
  menuOpen: boolean;
  toggleMenu: () => void;
  openLogin: () => void;
  go: (id: string) => void;
}

const ChromeContext = createContext<ChromeContextType | null>(null);

export function useChrome() {
  const ctx = useContext(ChromeContext);
  if (!ctx) {
    throw new Error("useChrome must be used within a SiteChrome provider");
  }
  return ctx;
}

function StickyBars() {
  const { activeGroup, menuOpen, toggleMenu, openLogin, go } = useChrome();
  const scrolled = useScrolled(560);
  const reduced = useReducedMotion() ?? false;

  return (
    <>
      {/* Desktop Sticky Header (Past 560px) */}
      <motion.header
        initial={false}
        animate={{
          y: scrolled ? 0 : -120,
          opacity: scrolled ? 1 : 0,
        }}
        transition={{ duration: reduced ? 0.001 : 0.5, ease: EASE }}
        style={{ pointerEvents: scrolled ? "auto" : "none" }}
        className="fixed inset-x-0 top-0 z-50 hidden border-b border-white/10 bg-[#454640]/85 backdrop-blur-xl lg:block"
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-7">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            aria-label="Arkkhe, ir al inicio"
            className="flex items-center gap-3 text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <TreeMark className="size-6 text-white" />
            <span className="font-display text-[15px] tracking-[-0.08em]">
              Arkkhe
            </span>
          </a>

          {/* Links */}
          <nav aria-label="Navegación fija" className="flex items-center gap-12">
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
                  className={`text-[14px] leading-[1.4] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
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

          {/* Right */}
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={openLogin}
              className="cursor-pointer text-[14px] font-bold text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Login
            </button>
            <BurgerButton open={menuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </motion.header>

      {/* Mobile Always-Visible Header (< lg) */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#454640]/85 px-5 backdrop-blur-xl sm:px-7 lg:hidden">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            go("home");
          }}
          aria-label="Arkkhe, ir al inicio"
          className="flex items-center gap-2.5 text-white"
        >
          <TreeMark className="size-6 text-white" />
          <span className="font-display text-[15px] tracking-[-0.08em]">
            Arkkhe
          </span>
        </a>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={openLogin}
            className="cursor-pointer text-[14px] font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Login
          </button>
          <BurgerButton open={menuOpen} onClick={toggleMenu} />
        </div>
      </header>
    </>
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { activeGroup } = useScrollSpy(SPY_IDS);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const openLogin = useCallback(() => {
    setLoginOpen(true);
  }, []);

  const go = useCallback((id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  }, []);

  const value = useMemo(
    () => ({
      activeGroup,
      menuOpen,
      toggleMenu,
      openLogin,
      go,
    }),
    [activeGroup, menuOpen, toggleMenu, openLogin, go]
  );

  return (
    <ChromeContext.Provider value={value}>
      <StickyBars />
      {children}
      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={go}
        onOpenLogin={() => {
          setMenuOpen(false);
          setLoginOpen(true);
        }}
      />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </ChromeContext.Provider>
  );
}
