import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  Search, 
  GitBranch, 
  Layout, 
  Code2, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  ArrowLeft, 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Grid3X3, 
  MousePointer2,
  FileText,
  ArrowLeftRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ApproachStepData {
  num: string;
  title: string;
  phaseTag: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  accentHex: string;
  gradient: string;
  badgeBg: string;
  badgeBorder: string;
  glowColor: string;
  summary: string;
  detail: string;
  deliverables: string[];
  example: string;
  projectTag: string;
  projectId?: number;
}

export const STRUCTURED_STEPS: ApproachStepData[] = [
  {
    num: "01",
    title: "Understand",
    phaseTag: "Discovery & User Context",
    icon: Search,
    color: "text-[color:var(--w-a)]",
    accentHex: "#00F2FE",
    gradient: "from-[color:var(--w-a)] via-[#38BDF8] to-blue-500",
    badgeBg: "bg-[color:var(--w-a)]/10",
    badgeBorder: "border-[color:var(--w-a)]/30",
    glowColor: "rgba(0, 242, 254, 0.25)",
    summary: "Investigate context, intended users, and root operational friction.",
    detail: "Conduct operational interviews with end-users and review existing paper/spreadsheet workflows before proposing technical solutions. Focus on observing where time is lost, where manual data entry duplicates effort, and where compliance vulnerabilities originate.",
    deliverables: [
      "Field User Interviews & Staff Shadowing",
      "Operational Bottleneck & Friction Mapping",
      "As-Is Legacy Workflow Audit (Paper & Spreadsheets)"
    ],
    example: "Interviewed PIA Region 8 finance officers to map disbursement voucher bottlenecks before writing the Finance Monitoring System specifications.",
    projectTag: "PIA R8 Finance Monitoring System",
    projectId: 1,
  },
  {
    num: "02",
    title: "Analyze",
    phaseTag: "Requirements & Scoping",
    icon: GitBranch,
    color: "text-[#38BDF8]",
    accentHex: "#38BDF8",
    gradient: "from-[#38BDF8] via-cyan-400 to-indigo-500",
    badgeBg: "bg-[#38BDF8]/10",
    badgeBorder: "border-[#38BDF8]/30",
    glowColor: "rgba(56, 189, 248, 0.25)",
    summary: "Deconstruct problems into requirements, process flows, and constraints.",
    detail: "Author Product Requirements Documents (PRDs), Process Diagrams (PDs), and Requirements Traceability Matrices (RTMs) to establish clear scope. Prioritize features via MoSCoW/RICE matrices to ensure high-value delivery within timeline constraints.",
    deliverables: [
      "Product Requirements Documents (PRD Formulation)",
      "Process Flow Diagrams & State Machines (PDs)",
      "Requirements Traceability Matrix (RTM) & MoSCoW Scoping"
    ],
    example: "Mapped Commission on Audit (COA Circular) Appendix 63 regulations to database entities and authorization matrices for the RIS Inventory Portal.",
    projectTag: "RIS Inventory Management Portal",
    projectId: 4,
  },
  {
    num: "03",
    title: "Design",
    phaseTag: "Architecture & Relational Modeling",
    icon: Layout,
    color: "text-[#818CF8]",
    accentHex: "#818CF8",
    gradient: "from-[#818CF8] via-indigo-400 to-[#C084FC]",
    badgeBg: "bg-[#818CF8]/10",
    badgeBorder: "border-[#818CF8]/30",
    glowColor: "rgba(129, 140, 248, 0.25)",
    summary: "Architect relational schemas, role hierarchies, and intuitive interfaces.",
    detail: "Draft normalized 3NF ERDs, define REST API contracts, establish security models (RLS, RBAC), and prototype responsive user interfaces. Prevent downstream rework by defining composite keys, strict cascade rules, and offline data structures upfront.",
    deliverables: [
      "3NF Normalized Relational Entity Models (ERD)",
      "Multi-Tier RBAC & PostgreSQL Row-Level Security (RLS)",
      "Zero-Trust Device, Geofence & Subnet Verification Policies"
    ],
    example: "Designed zero-trust check-in architecture combining subnet verification, geofencing, and facial liveness for TrackMyHours DTR Platform.",
    projectTag: "TrackMyHours – DTR Platform",
    projectId: 2,
  },
  {
    num: "04",
    title: "Build",
    phaseTag: "Full-Stack Implementation",
    icon: Code2,
    color: "text-[#C084FC]",
    accentHex: "#C084FC",
    gradient: "from-[#C084FC] via-purple-400 to-pink-500",
    badgeBg: "bg-[#C084FC]/10",
    badgeBorder: "border-[#C084FC]/30",
    glowColor: "rgba(192, 132, 252, 0.25)",
    summary: "Implement resilient full-stack systems with clean, maintainable code.",
    detail: "Develop TypeScript/React frontends and Express/Node.js or Supabase PostgreSQL backends with offline-first client caches and automated backups. Implement deterministic heuristic tokenizers and chunked parsers that handle thousand-row datasets with zero lag.",
    deliverables: [
      "Modular TypeScript / React Frontend Engine",
      "Dual-Layer Persistence (PostgreSQL + In-Memory Fallback)",
      "Sub-Second Client-Side Ingestion & Lexical Parsers"
    ],
    example: "Engineered dual-layer persistence pairing Supabase PostgreSQL with in-memory fallbacks and context-aware lexical auto-classification.",
    projectTag: "PIA R8 Finance Monitoring System",
    projectId: 1,
  },
  {
    num: "05",
    title: "Validate",
    phaseTag: "Empirical Quality & UAT",
    icon: CheckCircle2,
    color: "text-[#34D399]",
    accentHex: "#34D399",
    gradient: "from-[#34D399] via-emerald-400 to-teal-500",
    badgeBg: "bg-[#34D399]/10",
    badgeBorder: "border-[#34D399]/30",
    glowColor: "rgba(52, 211, 153, 0.25)",
    summary: "Execute empirical testing, UAT, and international quality evaluations.",
    detail: "Write structured test cases, conduct User Acceptance Testing with end-users, and measure software usability against ISO/IEC 25010 standards. Gather quantitative metrics on turnaround reduction, latency, and error rates to validate production readiness.",
    deliverables: [
      "100% Passed UAT Test Case Sign-off Protocol",
      "ISO/IEC 25010 Empirical Usability Evaluation (4.85/5.00)",
      "Immutable Audit Log Verification & Disaster Recovery Drills"
    ],
    example: "Evaluated the CDMIS University Capstone with 50+ campus stakeholders, achieving an ISO/IEC 25010 usability score of 4.85 out of 5.00.",
    projectTag: "CDMIS Centralized Records",
    projectId: 3,
  },
  {
    num: "06",
    title: "Improve",
    phaseTag: "Continuous Iteration & AI",
    icon: RefreshCw,
    color: "text-[#F472B6]",
    accentHex: "#F472B6",
    gradient: "from-[#F472B6] via-rose-400 to-amber-500",
    badgeBg: "bg-[#F472B6]/10",
    badgeBorder: "border-[#F472B6]/30",
    glowColor: "rgba(244, 114, 182, 0.25)",
    summary: "Iterate based on user feedback, edge cases, and performance monitoring.",
    detail: "Refine user experience, optimize query performance, integrate AI function calling for automation, and provide administrative documentation. Continuously eliminate manual work by layering multimodal intelligence onto stable operational workflows.",
    deliverables: [
      "Multimodal AI Autonomous Document Extraction",
      "Database Query Tuning & LRU Cache Eviction Policies",
      "Comprehensive Admin & End-User Handover Documentation"
    ],
    example: "Integrated Google Gemini function calling into TrackMyHours to parse travel orders and auto-deduct leave credits based on user feedback.",
    projectTag: "TrackMyHours – DTR Platform (Gemini AI)",
    projectId: 2,
  }
];

interface ApproachSectionProps {
  theme?: "deep-space" | "cyber-light";
  onSelectProject?: (projectId: number) => void;
  onExploreCaseStudies?: () => void;
}

export function ApproachSection({
  theme = "deep-space",
  onSelectProject,
  onExploreCaseStudies,
}: ApproachSectionProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [viewMode, setViewMode] = useState<"scroll-flow" | "grid">("scroll-flow");
  const [isTouchpadActive, setIsTouchpadActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const accumulatedDelta = useRef(0);
  const touchStartX = useRef<number | null>(null);

  const isLight = theme === "cyber-light";
  const activeStep = STRUCTURED_STEPS[activeStepIndex];
  const IconComponent = activeStep.icon;

  const goToStep = useCallback((index: number) => {
    if (index === activeStepIndex) return;
    setDirection(index > activeStepIndex ? 1 : -1);
    setActiveStepIndex(index);
    setIsTouchpadActive(true);
  }, [activeStepIndex]);

  const nextStep = useCallback(() => {
    if (activeStepIndex < STRUCTURED_STEPS.length - 1) {
      setDirection(1);
      setActiveStepIndex((prev) => prev + 1);
      setIsTouchpadActive(true);
    }
  }, [activeStepIndex]);

  const prevStep = useCallback(() => {
    if (activeStepIndex > 0) {
      setDirection(-1);
      setActiveStepIndex((prev) => prev - 1);
      setIsTouchpadActive(true);
    }
  }, [activeStepIndex]);

  // Touchpad horizontal swipe listener (moving left to right / right to left ONLY, ignoring up/down)
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (viewMode !== "scroll-flow") return;

    const deltaX = e.deltaX;
    const deltaY = e.deltaY;

    // Strict horizontal check: The user requested moving the touchpad from left to right, NOT up and down.
    // If vertical movement dominates, ignore so page can scroll naturally without triggering step changes.
    if (Math.abs(deltaY) > Math.abs(deltaX) || Math.abs(deltaX) < 6) {
      accumulatedDelta.current = 0;
      return;
    }

    const now = Date.now();
    // Debounce to ensure distinct deliberate step transitions
    if (now - lastScrollTime.current < 280) {
      accumulatedDelta.current = 0;
      return;
    }

    accumulatedDelta.current += deltaX;
    const threshold = 22; // Responsive horizontal trackpad swipe threshold

    if (accumulatedDelta.current > threshold) {
      accumulatedDelta.current = 0;
      if (activeStepIndex < STRUCTURED_STEPS.length - 1) {
        lastScrollTime.current = now;
        nextStep();
      }
    } else if (accumulatedDelta.current < -threshold) {
      accumulatedDelta.current = 0;
      if (activeStepIndex > 0) {
        lastScrollTime.current = now;
        prevStep();
      }
    }
  }, [viewMode, activeStepIndex, nextStep, prevStep]);

  // Keyboard navigation when this section is mounted (Left & Right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input or modal
      if ((e.target as HTMLElement)?.closest("input, textarea, select")) return;

      if (e.key === "ArrowRight") {
        if (viewMode === "scroll-flow" && activeStepIndex < STRUCTURED_STEPS.length - 1) {
          e.preventDefault();
          nextStep();
        }
      } else if (e.key === "ArrowLeft") {
        if (viewMode === "scroll-flow" && activeStepIndex > 0) {
          e.preventDefault();
          prevStep();
        }
      } else if (["1", "2", "3", "4", "5", "6"].includes(e.key)) {
        const target = parseInt(e.key, 10) - 1;
        if (target >= 0 && target < STRUCTURED_STEPS.length) {
          goToStep(target);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, activeStepIndex, nextStep, prevStep, goToStep]);

  // Touch horizontal swipe support for trackpad/mobile (left to right / right to left)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) nextStep();
      else prevStep();
    }
    touchStartX.current = null;
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 30 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 320, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  };

  const progressPercent = Math.round(((activeStepIndex + 1) / STRUCTURED_STEPS.length) * 100);

  return (
    <div 
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-7 text-left select-none"
    >
      {/* Top Header & Interactive Mode Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-2 border-b border-white/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-[color:var(--w-a)] tracking-[0.16em] uppercase font-semibold">
              03 // Approach
            </span>
            <span className="text-gray-500 font-mono text-xs">/</span>
            <span className="text-gray-400 font-mono text-xs">
              Methodology & Problem-Solving Blueprint
            </span>
          </div>
          
          <h2 className={`text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            How I Work: A Structured 6-Step Framework
          </h2>

          <p className={`text-xs sm:text-sm font-light max-w-2xl leading-relaxed ${
            isLight ? "text-slate-600" : "text-gray-300"
          }`}>
            A disciplined methodology for deconstructing operational friction, designing normalized data models, and delivering resilient, user-friendly digital products.
          </p>
        </div>

        {/* Control Badges: Touchpad Scroll Indicator & View Mode Switcher */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {/* Touchpad Guide Indicator */}
          {viewMode === "scroll-flow" && (
            <div 
              className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono transition-all duration-300 ${
                isTouchpadActive
                  ? "bg-[color:var(--w-a)]/15 border-[color:var(--w-a)]/40 text-[color:var(--w-a)] shadow-[0_0_15px_rgba(var(--w-a-rgb),0.2)]"
                  : isLight
                  ? "bg-slate-100 border-slate-200 text-slate-700"
                  : "bg-white/[0.04] border-white/10 text-gray-300"
              }`}
              title="Move two fingers horizontally (left to right / right to left) on your laptop touchpad to reveal steps"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[color:var(--w-a)] animate-pulse" />
              <span>Swipe touchpad left ⇄ right to reveal</span>
              <span className="text-[10px] text-gray-400">({activeStepIndex + 1}/6)</span>
            </div>
          )}

          {/* Segmented View Mode Switcher */}
          <div className={`p-1 rounded-xl border flex items-center gap-1 ${
            isLight ? "bg-slate-100 border-slate-200" : "bg-black/40 border-white/10"
          }`}>
            <button
              type="button"
              onClick={() => setViewMode("scroll-flow")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                viewMode === "scroll-flow"
                  ? isLight
                    ? "bg-white text-slate-900 shadow-sm font-bold border border-slate-200"
                    : "bg-[color:var(--w-a)]/20 text-[color:var(--w-a)] shadow-sm font-bold border border-[color:var(--w-a)]/30"
                  : isLight
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Scroll Flow</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                viewMode === "grid"
                  ? isLight
                    ? "bg-white text-slate-900 shadow-sm font-bold border border-slate-200"
                    : "bg-white/15 text-white shadow-sm font-bold border border-white/20"
                  : isLight
                  ? "text-slate-600 hover:text-slate-900"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: SCROLL-DRIVEN TOUCHPAD STEP EXPERIENCE */}
      {viewMode === "scroll-flow" && (
        <div className="space-y-5">
          {/* Interactive Step Timeline Progress Rail */}
          <div className={`p-3 sm:p-4 rounded-2xl border backdrop-blur-xl relative overflow-hidden ${
            isLight ? "bg-white/90 border-slate-200 shadow-sm" : "bg-[#090D16]/90 border-white/10 shadow-xl"
          }`}>
            {/* Top Micro Header: Progress Counter & Phase Highlight */}
            <div className="flex items-center justify-between text-xs font-mono mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[color:var(--w-a)] font-bold">STEP {activeStep.num} OF 06</span>
                <span className="text-gray-500">·</span>
                <span className={isLight ? "text-slate-700 font-semibold" : "text-white font-semibold"}>
                  {activeStep.title}
                </span>
                <span className="hidden md:inline text-gray-500">({activeStep.phaseTag})</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
                <span>{progressPercent}% Complete</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeStep.accentHex }}></span>
              </div>
            </div>

            {/* Connecting Continuous Progress Bar */}
            <div className="relative w-full h-1.5 bg-white/10 rounded-full mb-3.5 overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${activeStep.gradient}`}
                initial={false}
                animate={{ width: `${((activeStepIndex) / (STRUCTURED_STEPS.length - 1)) * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>

            {/* 6 Step Nodes Pipeline Buttons */}
            <div className="grid grid-cols-6 gap-1 sm:gap-2">
              {STRUCTURED_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isPassed = idx < activeStepIndex;
                const StepIcon = step.icon;

                return (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => goToStep(idx)}
                    className={`group relative flex flex-col items-center p-1.5 sm:p-2 rounded-xl border transition-all duration-200 cursor-pointer text-center ${
                      isActive
                        ? isLight
                          ? "bg-slate-100 border-slate-300 shadow-sm"
                          : "bg-white/10 border-white/20 shadow-[0_0_14px_rgba(var(--w-a-rgb),0.18)]"
                        : isPassed
                        ? isLight
                          ? "bg-slate-50 border-slate-200 text-slate-700"
                          : "bg-white/[0.02] border-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                        : isLight
                        ? "bg-transparent border-transparent text-slate-400 hover:text-slate-700"
                        : "bg-transparent border-transparent text-gray-500 hover:text-gray-300"
                    }`}
                    title={`Jump to Step ${step.num}: ${step.title}`}
                  >
                    <div className="flex items-center gap-1">
                      <span className={`text-[10px] sm:text-xs font-mono font-bold ${
                        isActive ? step.color : isPassed ? "text-gray-300" : "text-gray-500"
                      }`}>
                        {step.num}
                      </span>
                      <StepIcon className={`w-3 h-3 hidden sm:inline ${
                        isActive ? step.color : "text-gray-400"
                      }`} />
                    </div>
                    <span className={`text-[9px] sm:text-[11px] font-mono truncate w-full mt-0.5 ${
                      isActive 
                        ? isLight ? "text-slate-900 font-bold" : "text-white font-bold" 
                        : "text-gray-400 font-light"
                    }`}>
                      {step.title}
                    </span>

                    {/* Active Step Indicator Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeStepGlow"
                        className="absolute -bottom-1 w-5 h-[2px] rounded-full"
                        style={{ backgroundColor: step.accentHex }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Spotlight Step Card (Driven by Touchpad Scroll) */}
          <div className="relative min-h-[460px] sm:min-h-[480px] w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeStep.num}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -35 || info.velocity.x < -200) nextStep();
                  else if (info.offset.x > 35 || info.velocity.x > 200) prevStep();
                }}
                className={`relative rounded-3xl border p-5 sm:p-7 md:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden transition-colors duration-300 flex flex-col justify-between cursor-grab active:cursor-grabbing ${
                  isLight
                    ? "bg-white/95 border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                    : "bg-[#090D16]/95 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                }`}
                style={{
                  boxShadow: `0 0 35px ${activeStep.glowColor}`,
                }}
              >
                {/* Large Subtle Watermark in Background */}
                <div 
                  className="absolute -top-6 -right-3 font-mono font-black text-8xl sm:text-9xl md:text-[12rem] select-none pointer-events-none opacity-[0.035] leading-none text-right"
                  aria-hidden="true"
                >
                  {activeStep.num}
                </div>

                {/* Top Ambient Glow Edge */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${activeStep.gradient}`}
                />

                <div className="space-y-6 relative z-10">
                  {/* Phase Kicker & Step Title Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl border ${activeStep.badgeBg} ${activeStep.badgeBorder} ${activeStep.color} shadow-lg shrink-0`}>
                        <IconComponent className="w-6 h-6 shrink-0" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <span className="font-bold tracking-widest text-[color:var(--w-a)]">
                            STEP {activeStep.num}
                          </span>
                          <span className="text-gray-500">/</span>
                          <span className={`uppercase font-medium ${isLight ? "text-slate-600" : "text-gray-300"}`}>
                            {activeStep.phaseTag}
                          </span>
                        </div>
                        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-0.5 ${
                          isLight ? "text-slate-900" : "text-white"
                        }`}>
                          {activeStep.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Detail Narrative */}
                  <div className="space-y-2">
                    <p className={`text-sm sm:text-base md:text-lg font-semibold leading-snug ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}>
                      {activeStep.summary}
                    </p>
                    <p className={`text-xs sm:text-sm font-light leading-relaxed max-w-3xl ${
                      isLight ? "text-slate-600" : "text-gray-300"
                    }`}>
                      {activeStep.detail}
                    </p>
                  </div>

                  {/* Two-Column Showcase: Concrete Deliverables + Real Production Application */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                    {/* Column 1: Key Artifacts & Deliverables */}
                    <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                      isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/10"
                    }`}>
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#C084FC]">
                        <CheckCircle2 className="w-4 h-4 text-[#C084FC] shrink-0" />
                        <span>Key Deliverables & Artifacts</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        {activeStep.deliverables.map((d, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5">
                            <span 
                              className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                              style={{ backgroundColor: activeStep.accentHex }}
                            />
                            <span className={isLight ? "text-slate-700 font-medium" : "text-gray-200 font-light"}>
                              {d}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Real Production Project Application */}
                    <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 flex flex-col justify-between ${
                      isLight ? "bg-cyan-50/60 border-cyan-200" : "bg-[color:var(--w-a)]/[0.03] border-[color:var(--w-a)]/20"
                    }`}>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[color:var(--w-a)] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[color:var(--w-a)] shrink-0" />
                            <span>Verified Production Application</span>
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${activeStep.badgeBg} ${activeStep.badgeBorder} ${activeStep.color}`}>
                            {activeStep.projectTag.split("–")[0]}
                          </span>
                        </div>
                        <p className={`text-xs italic leading-relaxed ${
                          isLight ? "text-slate-800" : "text-gray-200"
                        }`}>
                          "{activeStep.example}"
                        </p>
                      </div>

                      {activeStep.projectId && onSelectProject && (
                        <button
                          type="button"
                          onClick={() => onSelectProject(activeStep.projectId!)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-[color:var(--w-a)] hover:underline cursor-pointer pt-2 group self-start"
                        >
                          <span>Inspect Project Case Study & PRD</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: ALL 6 STEPS GRID (Alternative Overview) */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {STRUCTURED_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.num}
                onClick={() => {
                  setActiveStepIndex(idx);
                  setViewMode("scroll-flow");
                }}
                className={`rounded-2xl border p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl text-left cursor-pointer ${
                  isLight
                    ? "bg-white border-slate-200 hover:border-[color:var(--w-a)] hover:shadow-lg"
                    : "bg-white/[0.02] border-white/10 hover:border-[color:var(--w-a)]/50"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${step.badgeBg} ${step.badgeBorder} ${step.color}`}>
                      <StepIcon className="w-5 h-5 shrink-0" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[color:var(--w-a)] tracking-widest">
                      STEP {step.num}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold tracking-tight group-hover:text-[color:var(--w-a)] transition-colors ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}>
                    {step.title}
                  </h3>

                  <p className={`text-xs font-medium leading-relaxed ${
                    isLight ? "text-slate-700" : "text-gray-200"
                  }`}>
                    {step.summary}
                  </p>

                  <p className={`text-xs font-light leading-relaxed ${
                    isLight ? "text-slate-500" : "text-gray-400"
                  }`}>
                    {step.detail}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 mt-4 space-y-1">
                  <span className="text-[10px] font-mono text-[#C084FC] uppercase tracking-wider block">
                    Real Application:
                  </span>
                  <p className={`text-[11px] italic font-light leading-snug ${
                    isLight ? "text-slate-600" : "text-gray-300"
                  }`}>
                    "{step.example}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Global Footer Callout */}
      <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono ${
        isLight ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-white/[0.02] border-white/10 text-gray-300"
      }`}>
        <div className="flex items-center gap-2 text-left">
          <Sparkles className="w-4 h-4 text-[color:var(--w-a)] shrink-0" />
          <span>See how this 6-step framework was deployed across live regional public platforms and university research:</span>
        </div>
        {onExploreCaseStudies && (
          <button
            type="button"
            onClick={onExploreCaseStudies}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[color:var(--w-a)] to-[color:var(--w-b)] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:opacity-95 transition-all shadow-md shrink-0 cursor-pointer"
          >
            <span>Explore Case Studies</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
