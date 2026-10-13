import React from "react";
import { GraduationCap, Briefcase, Award, Layers, Users, ShieldCheck, CheckCircle2 } from "lucide-react";
import clareProfile from "@/imports/CLARE_PROFILE.jpg";

export function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          02. Background & Working Style
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Bridging Business Requirements & Practical Software
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl">
          How I approach problem-solving, work with teams, and transform complex operational needs into resilient software.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Card & Key Details (4 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-sky-400/50 shadow-lg shadow-sky-500/10 shrink-0">
              <img src={clareProfile} alt="Clare Angelie T. Dolino" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Clare Angelie T. Dolino</h3>
              <p className="text-xs font-mono text-cyan-300 mt-0.5">Information Systems Graduate</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                <span>Biliran, Philippines</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-start gap-2.5">
              <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">BS in Information Systems</strong>
                <span className="text-slate-300">Biliran Province State University (BiPSU)</span>
                <span className="text-cyan-300 block font-mono text-[11px] mt-0.5">Magna Cum Laude · Cohort Rank 1 (GWA 1.32)</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Award className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Proficiency Awardee</strong>
                <span className="text-slate-300">Philippine Information Agency Region VIII</span>
                <span className="text-slate-400 block text-[11px]">Awarded for technical leadership & system delivery</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Briefcase className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Lead Systems Analyst & Developer (Internship)</strong>
                <span className="text-slate-300">PIA Region 8 (Jan 2026 – Apr 2026)</span>
                <span className="text-slate-400 block text-[11px]">3 production platforms delivered</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">Core Principles</span>
            <div className="flex flex-wrap gap-1.5">
              {["Analytical", "Research-Oriented", "Structured", "Quietly Confident", "Practical Value", "User-Centered"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 text-[11px]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Story & Philosophy Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm leading-relaxed font-light">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Systems Mindset & SDLC Ownership</span>
            </h3>
            <p>
              My background in Information Systems taught me to view organizations as interconnected ecosystems. Rather than jumping straight into code, I start by investigating workflows, interviewing operational personnel, and isolating root-cause bottlenecks.
            </p>
            <p>
              At the Philippine Information Agency (Region 8), I translated manual government disbursement and time-tracking procedures into formal Business Requirements Documents (BRDs), Business Process Diagrams (BPDs), and Traceability Matrices (RTMs). I then took those exact specifications and authored the production software myself.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Bridging Stakeholders & Engineering Teams</span>
            </h3>
            <p>
              As the capstone project leader for our university's Centralized Document Management Information System (CDMIS), I led a 6-member engineering team through full SDLC delivery. I facilitated daily standups, resolved scope dependencies, conducted empirical ISO/IEC 25010 quality evaluations with 50+ campus evaluators, and defended the research manuscript to academic panels.
            </p>
            <p>
              I understand how to speak the language of non-technical stakeholders—accountants, regional directors, registrars—while maintaining technical rigor when discussing REST APIs, relational normal forms, or IndexedDB caching algorithms with developers.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AI as an Accelerator, Not a Substitute</span>
            </h3>
            <p>
              I actively incorporate modern AI tooling—including Google Gemini function calling, LLM document parsers, and AI-assisted development workflows—to prototype rapidly and automate repetitive data processing. However, I believe AI is an amplifier for solid engineering fundamentals, clean database normalization, and rigorous requirements analysis, not a replacement for them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
