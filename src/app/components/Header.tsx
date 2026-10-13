import React from "react";
import { Sun, Moon, FileText, Send } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  showHeader: boolean;
  theme: "deep-space" | "cyber-light";
  toggleTheme: () => void;
  onPreviewResume: () => void;
  playNavHover: () => void;
}

export const SECTIONS = [
  { id: "overview", label: "01. Overview" },
  { id: "background", label: "02. Background" },
  { id: "case-studies", label: "03. Case Studies" },
  { id: "approach", label: "04. Approach" },
  { id: "contact", label: "05. Contact" },
] as const;

export function Header({
  activeSection,
  setActiveSection,
  showHeader,
  theme,
  toggleTheme,
  onPreviewResume,
  playNavHover,
}: HeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 w-full h-20 z-50 flex items-center justify-between px-6 md:px-12 backdrop-blur-md transition-transform duration-300 border-b ${
        theme === "cyber-light"
          ? "bg-white/90 border-slate-200/80 text-slate-900"
          : "bg-[#06080F]/85 border-white/10 text-white"
      } ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Zone 1: Single element wordmark (Brand Zone) */}
      <a
        href="#overview"
        onClick={(e) => {
          e.preventDefault();
          setActiveSection("overview");
        }}
        className="text-lg font-bold tracking-tight text-slate-900 dark:text-white hover:opacity-80 transition-opacity font-sans"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 font-extrabold">
          Clare Dolino
        </span>
      </a>

      {/* Zone 2: 4–6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium tracking-wide">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => {
                playNavHover();
                setActiveSection(sec.id);
              }}
              onMouseEnter={playNavHover}
              className={`transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? theme === "cyber-light"
                    ? "text-sky-600 font-semibold border-b-2 border-sky-600 pb-0.5"
                    : "text-cyan-300 font-semibold border-b-2 border-cyan-400 pb-0.5"
                  : theme === "cyber-light"
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {sec.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 1–2 primary actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          onMouseEnter={playNavHover}
          title={`Switch to ${theme === "deep-space" ? "Light" : "Dark"} mode`}
          className="p-2 rounded-lg border border-slate-700/50 hover:border-sky-400/50 transition-colors text-slate-300 hover:text-white cursor-pointer"
        >
          {theme === "deep-space" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-sky-600" />
          )}
        </button>

        <button
          onClick={() => {
            playNavHover();
            onPreviewResume();
          }}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-700/60 hover:border-sky-400/60 text-xs font-medium text-slate-200 hover:text-white transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span>Résumé</span>
        </button>

        <button
          onClick={() => {
            playNavHover();
            setActiveSection("contact");
          }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-xs font-semibold text-white shadow-md transition-all cursor-pointer whitespace-nowrap"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </button>
      </div>
    </header>
  );
}
