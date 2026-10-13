import React from "react";
import { GraduationCap, Briefcase, Award, ShieldCheck, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function ExperienceEducationSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Section Title */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          Education, Experience & Honors
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Demonstrated Academic & Field Track Record
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl font-light">
          A history of academic distinction, leadership in student research, and institutional delivery in regional government.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Education & Academic Honors */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <span>Academic Qualifications</span>
          </h3>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div>
                <h4 className="text-lg font-bold text-white">Bachelor of Science in Information Systems</h4>
                <p className="text-xs text-cyan-300 font-mono">Biliran Province State University (BiPSU)</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
                GWA 1.32
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-white font-medium">
                <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Magna Cum Laude · Rank 1 in Cohort</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-light pl-6">
                Highest academic honor in the Information Systems department; full academic scholarship recipient; multi-semester President's and Dean's Lister.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 text-xs">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Core Coursework & Specialized Focus:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Systems Analysis & Design",
                  "IS Project Management",
                  "Database Systems (Relational 3NF)",
                  "Business Process Management",
                  "Software Engineering & SDLC",
                  "Information Systems Strategy"
                ].map((c) => (
                  <span key={c} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Recognition Card */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Institutional Capstone Leadership</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Served as Project Leader, Lead Programmer, and Head Technical Research Writer for the CDMIS capstone project. Evaluated across 50+ campus stakeholders with an ISO/IEC 25010 rating of 4.85/5.00 and earned top academic research honors.
            </p>
          </div>
        </div>

        {/* Professional Experience */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <span>Field Experience & Internships</span>
          </h3>

          <div className="space-y-4">
            {/* PIA Region 8 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <h4 className="text-base font-bold text-white">IT Business Analyst, PM & Lead Developer</h4>
                  <p className="text-xs text-indigo-300 font-mono">Philippine Information Agency – Region 8</p>
                </div>
                <span className="text-xs font-mono text-slate-400">Jan 2026 – Apr 2026</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-mono">
                <Award className="w-3.5 h-3.5" />
                <span>Proficiency Awardee</span>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed font-light pt-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Authored BRDs, BPDs, and RTMs; led a 6-person Agile intern development team.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Engineered 3 production systems: PIA Finance Monitoring, TrackMyHours DTR, and RIS Inventory Portal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Reduced voucher verification turnaround cycles by 80%+ via chunked batch ingestion.</span>
                </li>
              </ul>
            </div>

            {/* Freelance Web Developer */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-2">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <h4 className="text-base font-bold text-white">Freelance Web Developer</h4>
                  <p className="text-xs text-slate-400 font-mono">Independent Client Deliveries</p>
                </div>
                <span className="text-xs font-mono text-slate-400">May 2023 – Present</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Delivering custom web applications and business portals for clients, handling end-to-end scope elicitation, frontend UI development, database setup, and AI tool integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
