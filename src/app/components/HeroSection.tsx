import React from "react";
import { ArrowRight, FileText, GraduationCap, Award, Sparkles, CheckCircle2, Eye, Download } from "lucide-react";
import clareProfile from "@/imports/CLARE_PROFILE.jpg";

interface HeroSectionProps {
  onExploreWork: () => void;
  onContact: () => void;
  onPreviewResume: () => void;
  onDownloadResume: () => void;
  isDownloadingResume: boolean;
  playNavHover: () => void;
}

export function HeroSection({
  onExploreWork,
  onContact,
  onPreviewResume,
  onDownloadResume,
  isDownloadingResume,
  playNavHover,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="w-full text-center space-y-8 my-auto">
        
        {/* Top Professional Identifier & Distinction Line */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/25 text-sky-300 text-xs font-mono tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span className="font-semibold">Technical Product Builder · Systems Thinker · Software Developer</span>
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
          I turn complex problems into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400">
            practical digital solutions.
          </span>
        </h1>

        {/* Academic Distinction Badge Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto text-xs text-slate-300">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/80">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <strong className="text-white">Magna Cum Laude</strong> · Rank 1 in Cohort (GWA 1.32)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/80">
            <Award className="w-4 h-4 text-indigo-400" />
            PIA Region 8 Proficiency Awardee
          </span>
        </div>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
          I'm Clare Angelie Dolino, a Magna Cum Laude Information Systems graduate who works across systems analysis, software development, product-oriented problem-solving, and AI-assisted development. I enjoy understanding how people and organizations work, identifying opportunities for improvement, and translating ideas into useful software solutions.
        </p>

        {/* Key Metrics / Proof Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left pt-2">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <div className="text-xs text-slate-400 font-mono">Turnaround Velocity</div>
            <div className="text-xl font-bold text-cyan-300 font-mono mt-0.5">80%+ Faster</div>
            <div className="text-[11px] text-slate-400 leading-tight mt-1">Reconciliation & processing reduction</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <div className="text-xs text-slate-400 font-mono">Software Quality</div>
            <div className="text-xl font-bold text-indigo-300 font-mono mt-0.5">4.85 / 5.00</div>
            <div className="text-[11px] text-slate-400 leading-tight mt-1">ISO/IEC 25010 empirical evaluation</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <div className="text-xs text-slate-400 font-mono">Institutional Platforms</div>
            <div className="text-xl font-bold text-sky-300 font-mono mt-0.5">3 Systems</div>
            <div className="text-[11px] text-slate-400 leading-tight mt-1">Delivered for government agency</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <div className="text-xs text-slate-400 font-mono">Security Model</div>
            <div className="text-xl font-bold text-emerald-300 font-mono mt-0.5">Zero-Trust</div>
            <div className="text-[11px] text-slate-400 leading-tight mt-1">Geofence, subnet & liveness checks</div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              playNavHover();
              onExploreWork();
            }}
            onMouseEnter={playNavHover}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-500/20 transition-all cursor-pointer group"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              playNavHover();
              onContact();
            }}
            onMouseEnter={playNavHover}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white font-medium text-sm transition-all cursor-pointer"
          >
            <span>Get in Touch</span>
          </button>

          <button
            onClick={() => {
              playNavHover();
              onPreviewResume();
            }}
            onMouseEnter={playNavHover}
            className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Preview Résumé (CV)</span>
          </button>
        </div>

      </div>
    </section>
  );
}
