import React from "react";
import { Kanban, Code2, Sparkles, Database, ShieldCheck, CheckCircle2 } from "lucide-react";

export function SkillsSection() {
  const SKILL_GROUPS = [
    {
      title: "Product & Problem-Solving",
      icon: Kanban,
      desc: "Eliciting requirements, mapping operational workflows, and guiding software delivery.",
      skills: [
        { name: "Requirements Analysis (BRD/BPD)", exp: "Core" },
        { name: "Systems Analysis & Design", exp: "Core" },
        { name: "Workflow & Process Mapping", exp: "Core" },
        { name: "Agile / Scrum Team Coordination", exp: "Team Lead" },
        { name: "User Acceptance Testing (UAT)", exp: "Verified" },
        { name: "Stakeholder Communication", exp: "Experienced" },
      ]
    },
    {
      title: "Software & Systems Engineering",
      icon: Code2,
      desc: "Building production web applications with typed code, normalized schemas, and REST APIs.",
      skills: [
        { name: "React 18 & TypeScript", exp: "Production" },
        { name: "Node.js & Express.js", exp: "Production" },
        { name: "PostgreSQL & Supabase", exp: "Production" },
        { name: "MySQL Relational Databases", exp: "Academic/Cap" },
        { name: "RESTful API Design", exp: "Core" },
        { name: "Tailwind CSS & Modern UI", exp: "Production" },
      ]
    },
    {
      title: "AI-Enabled Development",
      icon: Sparkles,
      desc: "Integrating Gemini API multimodal models and function calling to automate document extraction.",
      skills: [
        { name: "Google Gemini API (LLM/Vision)", exp: "Production" },
        { name: "Structured Function Calling", exp: "Production" },
        { name: "Multimodal Document Parsing", exp: "Production" },
        { name: "AI-Assisted Rapid Prototyping", exp: "Daily" },
        { name: "Prompt Engineering & Guardrails", exp: "Core" },
        { name: "IndexedDB Offline-First Caching", exp: "Production" },
      ]
    },
    {
      title: "Data, Governance & Compliance",
      icon: Database,
      desc: "Ensuring regulatory audit compliance, row-level security, and structured data exports.",
      skills: [
        { name: "3NF Relational Database Normalization", exp: "Core" },
        { name: "Commission on Audit (COA) Compliance", exp: "Institutional" },
        { name: "Row Level Security (RLS) & RBAC", exp: "Production" },
        { name: "SheetJS Excel Batch Ingestion", exp: "Production" },
        { name: "Immutable Audit Logging", exp: "Production" },
        { name: "Disaster Recovery Pipeline (pg_cron)", exp: "Production" },
      ]
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          Capabilities & Technical Toolkit
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Organized by Functional Domain
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl font-light">
          A balanced technical and analytical toolkit built through academic distinction and hands-on system delivery.
        </p>
      </div>

      {/* Grid of Skill Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_GROUPS.map((group) => {
          const IconComp = group.icon;
          return (
            <div
              key={group.title}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {group.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light">
                      {group.desc}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-200 font-medium truncate pr-2">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 shrink-0">
                        {skill.exp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
