import React, { useState } from "react";
import { 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  Layers, 
  Lock, 
  Scale, 
  ArrowUpRight, 
  FileText, 
  Server, 
  Database, 
  Activity, 
  Cpu, 
  Flame, 
  Sparkles,
  GitBranch,
  Gauge,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ImpactMetric {
  id: string;
  category: "Velocity" | "Integrity" | "Compliance" | "Architecture";
  title: string;
  metric: string;
  metricLabel: string;
  baseline: string;
  outcome: string;
  system: string;
  projectId: number;
  standard: string;
  technicalMechanism: string;
  highlights: string[];
}

export const VERIFIED_IMPACT_METRICS: ImpactMetric[] = [
  {
    id: "finance-velocity",
    category: "Velocity",
    title: "Financial Liquidation & Voucher Audit Turnaround",
    metric: ">85%",
    metricLabel: "Time Saved Per Monthly Cycle",
    baseline: "3–4 manual working days per month per agency unit",
    outcome: "<15 minutes automated batch parsing & reconciliation",
    system: "PIA R8 Finance Monitoring System",
    projectId: 1,
    standard: "Commission on Audit (COA) Guidelines",
    technicalMechanism: "Client-side SheetJS chunked ingestion + deterministic lexical tokenizer mapping Personnel Services (PS) vs. MOOE accounts in <250ms with zero server latency.",
    highlights: [
      "100% duplicate voucher disbursement prevention via composite unique relational constraints",
      "Thousand-row expenditure spreadsheet parsing with sub-2.8s client-side ingestion",
      "Automated COA-compliant balance summary generation eliminating accounting discrepancies"
    ]
  },
  {
    id: "attendance-zerotrust",
    category: "Integrity",
    title: "Civil Service Attendance & DTR Audit Verification",
    metric: "-96.3%",
    metricLabel: "DTR Audit Verification Overhead",
    baseline: "4.5 hours per user per month on paper logbooks",
    outcome: "<10 seconds automated biometric audit & compliance",
    system: "TrackMyHours – DTR Platform",
    projectId: 2,
    standard: "Civil Service Commission (CSC) Form 48 PH",
    technicalMechanism: "3-layer zero-trust pipeline combining agency IP subnet matching, 150m GPS geofencing, and client-side facial liveness neural checks with IndexedDB offline queuing.",
    highlights: [
      "100% elimination of proxy check-ins ('buddy punching') across regional agency offices",
      "IndexedDB offline buffer storage resolving standard 5MB browser localStorage limits",
      "Google Gemini multimodal function calling parsing heterogeneous travel orders & medical slips"
    ]
  },
  {
    id: "records-iso",
    category: "Compliance",
    title: "Campus Archival Records Access & Usability",
    metric: "4.85 / 5.00",
    metricLabel: "Empirical ISO/IEC 25010 Quality Benchmark",
    baseline: "Decentralized paper archival cabinets taking 2–5 days to locate",
    outcome: "Sub-second digital lookup across 12 academic/admin units",
    system: "CDMIS – Centralized Document Management",
    projectId: 3,
    standard: "ISO/IEC 25010 Software Quality & NAP Form 1",
    technicalMechanism: "3-tier hierarchical RBAC clearance hierarchy (Public, Custodian, Governance) paired with SHA-256 tamper-evident document hashing and NAP Form 1 inventory taxonomy.",
    highlights: [
      "Empirical quality validation scored across 50 campus stakeholders (faculty, officers, admins)",
      "~80% reduction in end-to-end document retrieval and handover delivery latency",
      "Permanent audit logging and retention disposition scheduling meeting National Archives standards"
    ]
  },
  {
    id: "inventory-atomic",
    category: "Architecture",
    title: "Requisition Turnaround & Stock Ledger Variance",
    metric: "88%",
    metricLabel: "Requisition Turnaround Velocity",
    baseline: "5–7 day manual paper multi-copy requisition routing",
    outcome: "<4 hours digital routing from submission to custodian issuance",
    system: "RIS Inventory Management Portal",
    projectId: 4,
    standard: "GAM Vol. II Appendix 63 & COA Standards",
    technicalMechanism: "Atomic reservation locks preventing inventory race conditions, paired with 24h automated disaster recovery database snapshots via Supabase Edge Functions with pg_cron.",
    highlights: [
      "Inventory variance dropped to <2% through strict atomic ledger deduction triggers",
      "4-tier segregated approval chain: Requester → Recommending → Approver → Property Custodian",
      "Instant COA Appendix 63 vector PDF and Excel ledger exports for quarterly audit review"
    ]
  }
];

export interface CompliancePillar {
  name: string;
  agency: string;
  standardCode: string;
  role: string;
  system: string;
  projectId: number;
  description: string;
  keyControls: string[];
}

export const COMPLIANCE_PILLARS: CompliancePillar[] = [
  {
    name: "Statutory Fund Accounting & Disbursing Rules",
    agency: "Commission on Audit (COA) Philippines",
    standardCode: "COA Circulars / ORS / DV / Check Disbursements",
    role: "Product Owner & Sole Full-Stack Developer",
    system: "PIA R8 Finance Monitoring System",
    projectId: 1,
    description: "Strict adherence to Philippine public sector fund accounting principles, maintaining clear division between Personal Services (PS) and MOOE allocations with immutable audit trails.",
    keyControls: [
      "Compound unique constraints preventing duplicate disbursement vouchers",
      "Deterministic lexical token classification matching official charts of accounts",
      "Automated standard monthly balance liquidation summary generation"
    ]
  },
  {
    name: "Civil Service Daily Time Record Standards",
    agency: "Civil Service Commission (CSC)",
    standardCode: "CSC Form 48 PH Statutory Standard",
    role: "Product Manager & Lead Developer",
    system: "TrackMyHours – DTR Platform",
    projectId: 2,
    description: "Digital transformation of statutory daily time record logs, computing exact second-level attendance, undertime, and overtime in compliance with national civil service rules.",
    keyControls: [
      "150m GPS geofencing radius validation with client-side coordinate spoof detection",
      "Agency IP subnet whitelist matching against official government network gateways",
      "Multi-angle facial liveness neural landmark checks preventing proxy submissions"
    ]
  },
  {
    name: "Software Product Quality Evaluation Standard",
    agency: "International Organization for Standardization",
    standardCode: "ISO/IEC 25010:2011 Standard",
    role: "Project Leader, Lead Programmer & Head Research Writer",
    system: "CDMIS – Centralized Document Management",
    projectId: 3,
    description: "Comprehensive empirical evaluation across 8 software quality characteristics: Functional Suitability, Performance Efficiency, Usability, Reliability, Security, and Maintainability.",
    keyControls: [
      "Empirical testing with 50 evaluators achieving 4.85/5.00 overall excellence rating",
      "National Archives of the Philippines (NAP) Form 1 archival taxonomy integration",
      "SHA-256 cryptographic document hashing ensuring tamper-proof record custody"
    ]
  },
  {
    name: "Government Accounting Manual Supply Protocols",
    agency: "Commission on Audit / DBM",
    standardCode: "GAM Vol. II Appendix 63 Standard Requisition",
    role: "Lead Product Developer & Product Manager",
    system: "RIS Inventory Management Portal",
    projectId: 4,
    description: "Full digitization of material requisition, custodian custody transfers, and physical inventory reconciliations according to Philippine public sector procurement and asset rules.",
    keyControls: [
      "Atomic reservation locking preventing inventory race conditions during peak requisition",
      "Automated 24-hour disaster recovery snapshot pipeline using pg_cron & Edge Functions",
      "4-tier segregated approval chain with cryptographic digital signature verification"
    ]
  }
];

export interface EngineeringImpactDossierProps {
  theme?: "deep-space" | "cyber-light";
  onSelectProject?: (projectId: number) => void;
  className?: string;
}

export function EngineeringImpactDossier({
  theme = "deep-space",
  onSelectProject,
  className = ""
}: EngineeringImpactDossierProps) {
  const [activeTab, setActiveTab] = useState<"telemetry" | "standards" | "architecture">("telemetry");
  const [selectedMetricId, setSelectedMetricId] = useState<string>("finance-velocity");

  const isLight = theme === "cyber-light";
  const activeMetric = VERIFIED_IMPACT_METRICS.find((m) => m.id === selectedMetricId) || VERIFIED_IMPACT_METRICS[0];

  return (
    <div 
      id="engineering-impact-dossier"
      className={`relative rounded-3xl border transition-all duration-300 w-full overflow-hidden ${
        isLight
          ? "bg-white/95 border-slate-200 shadow-[0_15px_45px_rgba(0,0,0,0.06)]"
          : "bg-[#090D16]/95 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
      } p-5 sm:p-7 md:p-8 ${className}`}
    >
      {/* Top Radiant Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#00F2FE] via-[#7F00FF] to-[#00EA64]" />

      {/* Header Row: Title, Subtitle & Interactive Navigation Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1.5 text-left">
          <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
            <span className="text-[#00F2FE] font-bold tracking-widest uppercase">
              Systems Engineering Provenance
            </span>
            <span className="text-gray-500">/</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Audited Production Outcomes</span>
            </span>
          </div>

          <h3 className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Engineering Impact & Institutional Standards
          </h3>

          <p className={`text-xs sm:text-sm font-light max-w-2xl leading-relaxed ${
            isLight ? "text-slate-600" : "text-gray-300"
          }`}>
            Empirical data, statutory compliance matrices, and architectural patterns delivered across Philippine regional public agencies and university systems.
          </p>
        </div>

        {/* Tab Switcher - Responsive on mobile, tablet & desktop */}
        <div className={`p-1 rounded-xl sm:rounded-2xl border flex items-center justify-between gap-1 w-full sm:w-auto self-stretch sm:self-start lg:self-center shrink-0 ${
          isLight ? "bg-slate-100 border-slate-200" : "bg-black/40 border-white/10"
        }`}>
          <button
            type="button"
            onClick={() => setActiveTab("telemetry")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-mono transition-all cursor-pointer truncate ${
              activeTab === "telemetry"
                ? isLight
                  ? "bg-white text-slate-900 shadow-sm font-bold border border-slate-200"
                  : "bg-[#00F2FE]/20 text-[#00F2FE] shadow-sm font-bold border border-[#00F2FE]/30"
                : isLight
                ? "text-slate-600 hover:text-slate-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Gauge className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="sm:hidden">Telemetry</span>
            <span className="hidden sm:inline">ROI Telemetry</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("standards")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-mono transition-all cursor-pointer truncate ${
              activeTab === "standards"
                ? isLight
                  ? "bg-white text-slate-900 shadow-sm font-bold border border-slate-200"
                  : "bg-purple-500/20 text-[#C084FC] shadow-sm font-bold border border-purple-500/30"
                : isLight
                ? "text-slate-600 hover:text-slate-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Scale className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="sm:hidden">Standards</span>
            <span className="hidden sm:inline">Statutory Standards</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("architecture")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-mono transition-all cursor-pointer truncate ${
              activeTab === "architecture"
                ? isLight
                  ? "bg-white text-slate-900 shadow-sm font-bold border border-slate-200"
                  : "bg-emerald-500/20 text-emerald-400 shadow-sm font-bold border border-emerald-500/30"
                : isLight
                ? "text-slate-600 hover:text-slate-900"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Server className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="sm:hidden">Architecture</span>
            <span className="hidden sm:inline">Resilience Architecture</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ROI & OPERATIONAL VELOCITY TELEMETRY */}
      {activeTab === "telemetry" && (
        <div className="pt-6 space-y-6 text-left">
          {/* Top 4 Metrics Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {VERIFIED_IMPACT_METRICS.map((item) => {
              const isSelected = item.id === selectedMetricId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedMetricId(item.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? isLight
                        ? "bg-white border-[#00F2FE] shadow-[0_0_20px_rgba(0,242,254,0.18)] ring-1 ring-[#00F2FE]"
                        : "bg-white/[0.06] border-[#00F2FE]/50 shadow-[0_0_25px_rgba(0,242,254,0.18)] ring-1 ring-[#00F2FE]/40"
                      : isLight
                      ? "bg-slate-50 border-slate-200 hover:border-slate-300"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#00F2FE] font-bold uppercase">{item.category}</span>
                      <span className={isSelected ? "text-[#00F2FE]" : "text-gray-500 group-hover:text-gray-300"}>
                        Inspect →
                      </span>
                    </div>

                    <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white group-hover:text-[#00F2FE] transition-colors">
                      {item.metric}
                    </div>

                    <div className={`text-xs font-semibold leading-snug ${isLight ? "text-slate-800" : "text-gray-200"}`}>
                      {item.metricLabel}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 mt-3 text-[10px] font-mono text-gray-400 truncate">
                    {item.system.split("–")[0]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep-Dive Inspection Panel for Selected Metric */}
          <div className={`p-5 sm:p-7 rounded-2xl border relative overflow-hidden ${
            isLight ? "bg-slate-50/80 border-slate-200" : "bg-white/[0.02] border-white/10"
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left Column: Metric Overview & Technical Mechanism */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded-md bg-[#00F2FE]/15 border border-[#00F2FE]/30 text-[#00F2FE] font-semibold">
                    {activeMetric.category} Focus
                  </span>
                  <span className="text-gray-500">·</span>
                  <span className={isLight ? "text-slate-700" : "text-gray-300"}>
                    {activeMetric.system}
                  </span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-400">{activeMetric.standard}</span>
                </div>

                <h4 className={`text-lg sm:text-xl font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                  {activeMetric.title}
                </h4>

                {/* Baseline vs Outcome Comparison Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className={`p-3.5 rounded-xl border ${
                    isLight ? "bg-red-50/60 border-red-200 text-slate-800" : "bg-red-500/[0.05] border-red-500/20 text-gray-300"
                  }`}>
                    <span className="text-[10px] font-mono text-red-400 uppercase tracking-wider block font-semibold mb-1">
                      Legacy Baseline (Pre-Implementation)
                    </span>
                    <p className="text-xs font-light leading-relaxed">
                      {activeMetric.baseline}
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-xl border ${
                    isLight ? "bg-emerald-50/60 border-emerald-200 text-slate-800" : "bg-emerald-500/[0.05] border-emerald-500/20 text-gray-300"
                  }`}>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-semibold mb-1">
                      Production Outcome (Delivered System)
                    </span>
                    <p className="text-xs font-semibold leading-relaxed text-emerald-300">
                      {activeMetric.outcome}
                    </p>
                  </div>
                </div>

                {/* Technical Mechanism */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C084FC]">
                    Underlying Technical Mechanism:
                  </span>
                  <p className={`text-xs font-light leading-relaxed ${isLight ? "text-slate-700" : "text-gray-300"}`}>
                    {activeMetric.technicalMechanism}
                  </p>
                </div>
              </div>

              {/* Right Column: Key Architectural Highlights & Action Button */}
              <div className={`p-4 sm:p-5 rounded-2xl border space-y-4 flex flex-col justify-between h-full ${
                isLight ? "bg-white border-slate-200 shadow-sm" : "bg-[#090D16] border-white/10"
              }`}>
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F2FE] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
                    <span>Key Verification Points</span>
                  </span>

                  <div className="space-y-2 text-xs">
                    {activeMetric.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className={isLight ? "text-slate-700 font-medium" : "text-gray-300 font-light"}>
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {onSelectProject && (
                  <button
                    type="button"
                    onClick={() => onSelectProject(activeMetric.projectId)}
                    className="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#7F00FF] text-black font-bold text-[11px] sm:text-xs font-mono uppercase tracking-wide hover:opacity-95 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] active:scale-[0.98] transition-all shadow-md cursor-pointer mt-3 sm:mt-4"
                  >
                    <span className="whitespace-nowrap">Inspect Case Study &amp; PRD</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STATUTORY COMPLIANCE & INSTITUTIONAL STANDARDS */}
      {activeTab === "standards" && (
        <div className="pt-6 space-y-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPLIANCE_PILLARS.map((pillar) => (
              <div
                key={pillar.standardCode}
                className={`p-5 rounded-2xl border space-y-3.5 flex flex-col justify-between ${
                  isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/10 hover:border-purple-500/40"
                } transition-all duration-300`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-purple-400 font-bold uppercase tracking-wider">
                      {pillar.agency}
                    </span>
                    <span className="text-gray-500 text-[10px] font-mono">
                      {pillar.standardCode.split('/')[0]}
                    </span>
                  </div>

                  <h4 className={`text-base sm:text-lg font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                    {pillar.name}
                  </h4>

                  <div className="text-[11px] font-mono text-[#00F2FE]">
                    Role: {pillar.role}
                  </div>

                  <p className={`text-xs font-light leading-relaxed ${isLight ? "text-slate-600" : "text-gray-300"}`}>
                    {pillar.description}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10">
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                    Institutional Security & Verification Controls:
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {pillar.keyControls.map((ctrl, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span className={isLight ? "text-slate-700" : "text-gray-300 font-light"}>
                          {ctrl}
                        </span>
                      </div>
                    ))}
                  </div>

                  {onSelectProject && (
                    <button
                      type="button"
                      onClick={() => onSelectProject(pillar.projectId)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-400 hover:text-purple-300 pt-2 cursor-pointer font-medium"
                    >
                      <span>Open Verified System Specification</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: RESILIENCE ARCHITECTURE & FAULT TOLERANCE PATTERNS */}
      {activeTab === "architecture" && (
        <div className="pt-6 space-y-4 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pattern 1 */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/10"
            }`}>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-[#00F2FE] w-fit">
                <Database className="w-5 h-5" />
              </div>
              <h4 className={`text-base font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                Dual-Layer State & In-Memory Fallback
              </h4>
              <p className={`text-xs font-light leading-relaxed ${isLight ? "text-slate-600" : "text-gray-300"}`}>
                Primary Supabase PostgreSQL paired with in-memory transaction queuing for frequent provincial network dropouts. Guarantees deterministic synchronization with zero lost vouchers upon reconnection.
              </p>
              <div className="pt-2 text-[10px] font-mono text-[#00F2FE]">
                Production: PIA R8 Finance System
              </div>
            </div>

            {/* Pattern 2 */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/10"
            }`}>
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 w-fit">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className={`text-base font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                Zero-Trust Verification Pipeline
              </h4>
              <p className={`text-xs font-light leading-relaxed ${isLight ? "text-slate-600" : "text-gray-300"}`}>
                Combines agency subnet whitelist validation, 150m GPS geofencing radius checks, and client-side neural landmark facial liveness detection to eliminate proxy check-ins completely.
              </p>
              <div className="pt-2 text-[10px] font-mono text-purple-400">
                Production: TrackMyHours Platform
              </div>
            </div>

            {/* Pattern 3 */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/10"
            }`}>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit">
                <Server className="w-5 h-5" />
              </div>
              <h4 className={`text-base font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                Atomic Locking & Automated Snapshots
              </h4>
              <p className={`text-xs font-light leading-relaxed ${isLight ? "text-slate-600" : "text-gray-300"}`}>
                ACID atomic reservation locks preventing simultaneous inventory over-allocation during concurrent employee submissions, backed by automated 24h pg_cron database disaster recovery pipelines.
              </p>
              <div className="pt-2 text-[10px] font-mono text-emerald-400">
                Production: RIS Inventory Portal
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
