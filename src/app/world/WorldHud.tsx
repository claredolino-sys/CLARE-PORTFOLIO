import React, { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionKey, WORLDS } from "./worlds";

// ---------------------------------------------------------------------------
// Butterfly glyph: a small flapping SVG used by the HUD and the project cards.
// ---------------------------------------------------------------------------
const RIGHT_WING =
  "M24 20 C26 8 38 2 45 8 C48 14 42 19 32 21 C40 22 40 33 32 35 C27 37 24 28 24 20 Z";
const LEFT_WING =
  "M24 20 C22 8 10 2 3 8 C0 14 6 19 16 21 C8 22 8 33 16 35 C21 37 24 28 24 20 Z";

export function ButterflyGlyph({
  colors,
  size = 28,
  flap = true,
  className = "",
}: {
  colors: [string, string, string];
  size?: number;
  flap?: boolean;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();
  const animate = flap && !reduce ? { scaleX: [1, 0.35, 1] } : undefined;
  const transition = { duration: 0.9, repeat: Infinity, ease: "easeInOut" as const };
  return (
    <svg
      viewBox="0 0 48 40"
      width={size}
      height={(size * 40) / 48}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`wg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={colors[0]} />
          <stop offset="0.55" stopColor={colors[1]} />
          <stop offset="1" stopColor={colors[2]} />
        </linearGradient>
      </defs>
      <motion.path
        d={LEFT_WING}
        fill={`url(#wg-${id})`}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="0.8"
        style={{ transformOrigin: "24px 20px" }}
        animate={animate}
        transition={transition}
      />
      <motion.path
        d={RIGHT_WING}
        fill={`url(#wg-${id})`}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="0.8"
        style={{ transformOrigin: "24px 20px" }}
        animate={animate}
        transition={transition}
      />
      <rect x="23.2" y="12" width="1.6" height="22" rx="0.8" fill="#150b24" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// HUD
// ---------------------------------------------------------------------------
export interface CatchPopup {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface WorldHudProps {
  section: SectionKey;
  sections: readonly SectionKey[];
  onSelect: (s: SectionKey) => void;
  caught: number;
  visited: SectionKey[];
  popups: CatchPopup[];
  showHint: boolean;
  chrysalis: boolean;
  isLight?: boolean;
}

export function WorldHud({ section, sections, onSelect, caught, visited, popups, showHint, chrysalis, isLight = false }: WorldHudProps) {
  const world = WORLDS[section];
  const reduce = useReducedMotion();
  const trio: [string, string, string] = [world.a, world.b, world.c];
  const [hintReady, setHintReady] = useState(false);
  const panel = isLight ? "border-slate-300 bg-white/85 text-slate-800" : "border-white/10 bg-black/30 text-white";
  const muted = isLight ? "text-slate-500" : "text-white/60";
  const strong = isLight ? "text-slate-900" : "text-white";

  useEffect(() => {
    const t = setTimeout(() => setHintReady(true), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* World title card: plays on load and on every world change */}
      <motion.div
        key={section}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[45] flex flex-col items-center justify-center text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.1, times: [0, 0.18, 0.72, 1], delay: 0.2 }}
      >
        <motion.span
          className={`font-mono text-[11px] sm:text-xs uppercase ${isLight ? "text-slate-700" : "text-white/80"}`}
          initial={{ letterSpacing: reduce ? "0.4em" : "1em" }}
          animate={{ letterSpacing: "0.4em" }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          World {String(world.index).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
        </motion.span>
        <motion.h2
          className={`mt-3 text-3xl sm:text-6xl font-extrabold ${strong}`}
          style={{ textShadow: isLight ? "0 0 28px rgba(255,255,255,0.95), 0 0 60px rgba(255,255,255,0.8)" : `0 0 32px ${world.a}, 0 0 80px ${world.b}` }}
          initial={{ letterSpacing: reduce ? "0.14em" : "0.5em", filter: reduce ? "blur(0px)" : "blur(10px)" }}
          animate={{ letterSpacing: "0.14em", filter: "blur(0px)" }}
          transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {world.name.toUpperCase()}
        </motion.h2>
        <span className={`mt-3 font-mono text-[11px] sm:text-sm ${isLight ? "text-slate-700" : "text-white/70"}`}>{world.tagline}</span>
      </motion.div>

      {/* World card, bottom-left (desktop) */}
      <div className={`pointer-events-none fixed bottom-5 left-6 z-[55] hidden md:flex items-center gap-3 rounded-2xl border px-4 py-2.5 backdrop-blur-md ${panel}`}>
        <ButterflyGlyph colors={trio} size={30} />
        <div className="leading-tight">
          <div className={`font-mono text-[10px] uppercase tracking-[0.16em] ${muted}`}>
            World {String(world.index).padStart(2, "0")}/{String(sections.length).padStart(2, "0")}
          </div>
          <div className={`text-sm font-semibold ${strong}`}>{world.name}</div>
        </div>
      </div>

      {/* Catch counter and chrysalis ring */}
      <div className={`pointer-events-none fixed z-[55] top-[3.7rem] left-3 md:top-auto md:left-auto md:bottom-5 md:right-8 flex items-center gap-2.5 rounded-full border px-3 py-1.5 backdrop-blur-md ${panel}`}>
        <ButterflyGlyph colors={trio} size={20} flap={false} />
        <span className={`font-mono text-[11px] ${strong}`} aria-live="polite">
          {caught} <span className={muted}>caught</span>
          {showHint && hintReady && <span className={muted}> · tap a butterfly</span>}
        </span>
        <span className="flex items-center gap-1" title={`${visited.length} of ${sections.length} worlds explored`}>
          {sections.map((s) => (
            <span
              key={s}
              className="h-1.5 w-1.5 rounded-full border"
              style={{
                borderColor: WORLDS[s].a,
                background: visited.includes(s) ? WORLDS[s].a : "transparent",
              }}
            />
          ))}
        </span>
      </div>

      {/* +1 popups where a butterfly was caught */}
      <AnimatePresence>
        {popups.map((p) => (
          <motion.span
            key={p.id}
            className="pointer-events-none fixed z-[60] font-mono text-sm font-bold"
            style={{ left: p.x, top: p.y, color: p.color, textShadow: `0 0 12px ${p.color}`, translateX: "-50%" }}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: reduce ? 0 : -48, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            +1
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Chrysalis complete */}
      <AnimatePresence>
        {chrysalis && (
          <motion.div
            key="chrysalis"
            role="status"
            className="pointer-events-none fixed left-1/2 top-20 z-[60] -translate-x-1/2 rounded-2xl border border-white/20 bg-black/55 px-5 py-3 text-center backdrop-blur-md"
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Achievement unlocked</div>
            <div className="mt-0.5 text-sm font-semibold text-white">Chrysalis complete: all six worlds explored</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Constellation map, right edge (desktop) */}
      <nav
        aria-label="World map"
        className="fixed right-3 xl:right-6 top-1/2 z-40 hidden -translate-y-1/2 select-none lg:flex flex-col items-center"
      >
        <div className="relative flex flex-col items-center gap-5 py-2">
          <div className="absolute bottom-3 top-3 left-1/2 w-px -translate-x-1/2 bg-white/15" />
          {sections.map((s) => {
            const w = WORLDS[s];
            const active = s === section;
            const seen = visited.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => onSelect(s)}
                aria-label={`Go to world ${w.index}: ${w.name}`}
                aria-current={active ? "true" : undefined}
                className="group relative flex h-6 w-6 items-center justify-center cursor-pointer"
              >
                {active ? (
                  <ButterflyGlyph colors={[w.a, w.b, w.c]} size={24} />
                ) : (
                  <span
                    className="block h-2.5 w-2.5 rounded-full border-2 transition-transform group-hover:scale-125"
                    style={{ borderColor: w.a, background: seen ? w.a : "transparent" }}
                  />
                )}
                <span className="pointer-events-none absolute right-8 whitespace-nowrap rounded-md border border-white/10 bg-black/60 px-2 py-1 font-mono text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {String(w.index).padStart(2, "0")} {w.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
