import React from "react";
import { Search, GitBranch, Layout, Code2, CheckCircle2, RefreshCw } from "lucide-react";

export function ApproachSection() {
  const STEPS = [
    {
      num: "01",
      title: "Understand",
      icon: Search,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      summary: "Investigate context, intended users, and root operational friction.",
      detail: "Conduct stakeholder interviews, shadow end-users, and review existing paper/spreadsheet workflows before proposing technical solutions.",
      example: "Interviewed PIA Region 8 finance officers to map disbursement voucher bottlenecks before writing the Finance Monitoring System specifications."
    },
    {
      num: "02",
      title: "Analyze",
      icon: GitBranch,
      color: "text-sky-400",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/20",
      summary: "Deconstruct problems into requirements, process flows, and constraints.",
      detail: "Author Business Requirements Documents (BRDs), Business Process Diagrams (BPDs), and Requirements Traceability Matrices (RTMs) to establish clear scope.",
      example: "Mapped Commission on Audit (COA Circular) Appendix 63 regulations to database entities and authorization matrices for the RIS Inventory Portal."
    },
    {
      num: "03",
      title: "Design",
      icon: Layout,
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
      summary: "Architect relational schemas, role hierarchies, and intuitive interfaces.",
      detail: "Draft normalized 3NF ERDs, define REST API contracts, establish security models (RLS, RBAC), and prototype responsive user interfaces.",
      example: "Designed zero-trust check-in architecture combining subnet verification, geofencing, and facial liveness for TrackMyHours DTR Platform."
    },
    {
      num: "04",
      title: "Build",
      icon: Code2,
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
      summary: "Implement resilient full-stack systems with clean, maintainable code.",
      detail: "Develop TypeScript/React frontends and Express/Node.js or Supabase PostgreSQL backends with offline-first client caches and automated backups.",
      example: "Engineered dual-layer persistence pairing Supabase PostgreSQL with in-memory fallbacks and context-aware lexical auto-classification."
    },
    {
      num: "05",
      title: "Validate",
      icon: CheckCircle2,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      summary: "Execute empirical testing, UAT, and international quality evaluations.",
      detail: "Write structured test cases, conduct User Acceptance Testing with end-users, and measure software usability against ISO/IEC 25010 standards.",
      example: "Evaluated the CDMIS University Capstone with 50+ campus stakeholders, achieving an ISO/IEC 25010 usability score of 4.85 out of 5.00."
    },
    {
      num: "06",
      title: "Improve",
      icon: RefreshCw,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      summary: "Iterate based on user feedback, edge cases, and performance monitoring.",
      detail: "Refine user experience, optimize query performance, integrate AI function calling for automation, and provide administrative documentation.",
      example: "Integrated Google Gemini function calling into TrackMyHours to parse travel orders and auto-deduct leave credits based on user feedback."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Section Title */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          04. Problem-Solving Approach
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          How I Work: A Structured 6-Step Methodology
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl font-light">
          A disciplined framework for turning ambiguous operational problems into dependable, user-friendly digital products.
        </p>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STEPS.map((step) => {
          const IconComponent = step.icon;
          return (
            <div
              key={step.num}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-4 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`p-2.5 rounded-xl ${step.bgColor} ${step.borderColor} border`}>
                    <IconComponent className={`w-5 h-5 ${step.color}`} />
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-500 tracking-wider">
                    {step.num} // STEP
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs font-medium text-slate-200 leading-relaxed">
                  {step.summary}
                </p>

                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {step.detail}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  Project Example:
                </span>
                <p className="text-[11px] text-slate-300 italic leading-snug">
                  "{step.example}"
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
