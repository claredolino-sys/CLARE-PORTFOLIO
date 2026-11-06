import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { 
  GraduationCap, Award, CheckCircle2, Sparkles, ChevronRight, 
  ChevronLeft, Play, Pause, RotateCcw, Calendar, MapPin, 
  TrendingUp, ShieldCheck, Cpu, Code2, Users
} from "lucide-react";

export interface MilestoneItem {
  id: string;
  year: string;
  shortDate: string;
  title: string;
  badge: string;
  category: "Academic" | "Leadership" | "Engineering" | "Milestone";
  color: string;
  icon: "grad" | "award" | "system" | "rocket";
  summary: string;
  metric: string;
  metricLabel: string;
  details: string[];
  skills: string[];
}

const MILESTONES_DATA: MilestoneItem[] = [
  {
    id: "academic-summa-magna",
    year: "2022 - 2026",
    shortDate: "Graduation 2026",
    title: "Magna Cum Laude (Rank 1)",
    badge: "GWA 1.32 · Academic Honor",
    category: "Academic",
    color: "#00F2FE",
    icon: "grad",
    summary: "Graduated Rank 1 of the BS in Information Systems graduating class with continuous President's and Dean's Lister honors.",
    metric: "1.32 GWA",
    metricLabel: "Cohort Rank 1",
    details: [
      "Rank 1 BS in Information Systems Graduating Class at BiPSU",
      "Full 4-Year Academic Scholar & Multi-Semester President's Lister",
      "Mastery in Systems Analysis, Enterprise Architecture & Database Management"
    ],
    skills: ["Business Analysis", "Database Architecture", "Enterprise Systems", "Agile SDLC"]
  },
  {
    id: "pia-proficiency-award",
    year: "April 2026",
    shortDate: "Apr 2026",
    title: "PIA Region 8 Proficiency Awardee",
    badge: "Agency Recognition",
    category: "Leadership",
    color: "#7F00FF",
    icon: "award",
    summary: "Conferred the prestigious Proficiency Award by the Philippine Information Agency Region 8 for exemplary technical leadership.",
    metric: "3 Platforms",
    metricLabel: "Gov Agency Delivered",
    details: [
      "Authored comprehensive BRD, BPD, and RTM operational specifications",
      "Led and mentored a 6-member intern engineering pod",
      "Engineered 3 production portals: DTR Face-Scan, Requisition Slip, & Inventory System"
    ],
    skills: ["Project Management", "BRD / BPD / RTM", "Team Mentorship", "Stakeholder Alignment"]
  },
  {
    id: "capstone-profiling-iso",
    year: "2025 - 2026",
    shortDate: "Capstone 2026",
    title: "Barangay Profiling System",
    badge: "ISO 25010 (4.85/5.00)",
    category: "Engineering",
    color: "#38BDF8",
    icon: "system",
    summary: "Architected modern public administrative platform replacing physical paper records and reducing service delays by 80%+.",
    metric: "80%+ Faster",
    metricLabel: "Process Efficiency",
    details: [
      "Achieved 4.85 / 5.00 Usability & Security rating on ISO/IEC 25010 audit",
      "Cut citizen document issuance turnaround from hours to minutes",
      "Zero-data-loss automated backup routines and multi-role RBAC access"
    ],
    skills: ["Full-Stack React", "PostgreSQL / Firebase", "ISO/IEC 25010", "Data Privacy"]
  },
  {
    id: "industry-readiness",
    year: "Present & Beyond",
    shortDate: "2026+",
    title: "IT Business Analysis & PM Specialist",
    badge: "Industry Launch",
    category: "Milestone",
    color: "#10B981",
    icon: "rocket",
    summary: "Ready to accelerate high-velocity engineering and product teams with data-backed requirements and clean architectural design.",
    metric: "100%",
    metricLabel: "Execution Readiness",
    details: [
      "End-to-end fluency from discovery, scoping, user stories to code delivery",
      "Modern AI integration expertise with Gemini function calling and automation",
      "Based in Biliran, Philippines — open for hybrid, on-site, or remote roles"
    ],
    skills: ["Scrum / Sprint Cadence", "Gemini AI Automation", "Cross-Functional Bridge", "Client Delivery"]
  }
];

interface MilestoneProgressVisualizerProps {
  theme?: "deep-space" | "cyber-light";
  onSoundBlip?: () => void;
}

export function MilestoneProgressVisualizer({ theme = "deep-space", onSoundBlip }: MilestoneProgressVisualizerProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const isLight = theme === "cyber-light";

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MILESTONES_DATA.length);
      if (onSoundBlip) onSoundBlip();
    }, 4200);
    return () => clearInterval(timer);
  }, [isPlaying, onSoundBlip]);

  // Render D3 Interactive Visualization
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 700;
    const height = 90;
    const margin = { top: 28, right: 40, bottom: 20, left: 40 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr("width", width).attr("height", height).attr("viewBox", `0 0 ${width} ${height}`);

    const innerWidth = width - margin.left - margin.right;
    const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    // D3 Scale
    const xScale = d3
      .scalePoint<number>()
      .domain(MILESTONES_DATA.map((_, i) => i))
      .range([0, innerWidth])
      .padding(0.1);

    // Defs & Gradients
    const defs = svg.append("defs");

    // Glow Filter
    const filter = defs.append("filter").attr("id", "timeline-glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    filter.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "blur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Gradient for progress track
    const trackGradient = defs.append("linearGradient").attr("id", "track-gradient").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
    trackGradient.append("stop").attr("offset", "0%").attr("stop-color", "#00F2FE");
    trackGradient.append("stop").attr("offset", "50%").attr("stop-color", "#7F00FF");
    trackGradient.append("stop").attr("offset", "100%").attr("stop-color", "#10B981");

    // Background track line
    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", 16)
      .attr("y2", 16)
      .attr("stroke", isLight ? "#CBD5E1" : "rgba(255,255,255,0.12)")
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round");

    // Animated Active progress track line
    const activeTargetX = xScale(activeIndex) ?? 0;
    const activeLine = g.append("line")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 16)
      .attr("y2", 16)
      .attr("stroke", "url(#track-gradient)")
      .attr("stroke-width", 4)
      .attr("stroke-linecap", "round")
      .attr("filter", isLight ? "none" : "url(#timeline-glow)");

    activeLine.transition()
      .duration(600)
      .ease(d3.easeCubicOut)
      .attr("x2", activeTargetX);

    // Nodes
    MILESTONES_DATA.forEach((m, idx) => {
      const cx = xScale(idx) ?? 0;
      const cy = 16;
      const isActive = idx === activeIndex;
      const isPast = idx <= activeIndex;

      const nodeGroup = g.append("g")
        .attr("class", "milestone-node cursor-pointer")
        .style("cursor", "pointer")
        .on("click", () => {
          setActiveIndex(idx);
          if (onSoundBlip) onSoundBlip();
        });

      // Pulse ring for active node
      if (isActive) {
        nodeGroup.append("circle")
          .attr("cx", cx)
          .attr("cy", cy)
          .attr("r", 14)
          .attr("fill", "none")
          .attr("stroke", m.color)
          .attr("stroke-width", 2)
          .attr("opacity", 0.8)
          .append("animate")
          .attr("attributeName", "r")
          .attr("values", "10;22;10")
          .attr("dur", "2.4s")
          .attr("repeatCount", "indefinite");

        nodeGroup.append("circle")
          .attr("cx", cx)
          .attr("cy", cy)
          .attr("r", 14)
          .attr("fill", "none")
          .attr("stroke", m.color)
          .attr("stroke-width", 1.5)
          .append("animate")
          .attr("attributeName", "opacity")
          .attr("values", "0.8;0;0.8")
          .attr("dur", "2.4s")
          .attr("repeatCount", "indefinite");
      }

      // Outer circle
      nodeGroup.append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", isActive ? 10 : 7)
        .attr("fill", isActive ? m.color : isPast ? (isLight ? "#0284C7" : "#00F2FE") : (isLight ? "#F1F5F9" : "#0B0F19"))
        .attr("stroke", isActive ? "#FFFFFF" : isPast ? m.color : (isLight ? "#94A3B8" : "rgba(255,255,255,0.25)"))
        .attr("stroke-width", isActive ? 3 : 2)
        .attr("filter", isActive && !isLight ? "url(#timeline-glow)" : "none")
        .style("transition", "all 0.3s ease");

      // Inner core dot for active
      if (isActive) {
        nodeGroup.append("circle")
          .attr("cx", cx)
          .attr("cy", cy)
          .attr("r", 3.5)
          .attr("fill", "#05070D");
      }

      // Date label above node
      nodeGroup.append("text")
        .attr("x", cx)
        .attr("y", -6)
        .attr("text-anchor", "middle")
        .attr("font-family", "monospace")
        .attr("font-size", width < 500 ? "9px" : "11px")
        .attr("font-weight", isActive ? "700" : "500")
        .attr("fill", isActive ? (isLight ? "#0F172A" : "#00F2FE") : (isLight ? "#64748B" : "#94A3B8"))
        .text(m.shortDate);

      // Milestone Title snippet below node
      nodeGroup.append("text")
        .attr("x", cx)
        .attr("y", 38)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", width < 500 ? "9px" : "11px")
        .attr("font-weight", isActive ? "600" : "400")
        .attr("fill", isActive ? (isLight ? "#0284C7" : "#FFFFFF") : (isLight ? "#94A3B8" : "rgba(255,255,255,0.5)"))
        .text(() => {
          if (idx === 0) return "Magna Cum Laude";
          if (idx === 1) return "PIA Award";
          if (idx === 2) return "Capstone ISO";
          return "Industry Launch";
        });
    });

  }, [activeIndex, theme, isLight, onSoundBlip]);

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      // Force trigger re-render
      setActiveIndex((prev) => prev);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeMilestone = MILESTONES_DATA[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % MILESTONES_DATA.length);
    if (onSoundBlip) onSoundBlip();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + MILESTONES_DATA.length) % MILESTONES_DATA.length);
    if (onSoundBlip) onSoundBlip();
  };

  return (
    <div 
      id="overture-progress-visualizer"
      className="w-full max-w-4xl mx-auto my-6 p-4 sm:p-6 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 text-left"
    >
      {/* Header bar with controls and live progress index */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[color:var(--w-a)]/10 border border-[color:var(--w-a)]/30 flex items-center justify-center text-[color:var(--w-a)]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm md:text-base font-bold text-white tracking-tight">Milestone Progress Trajectory</h3>
              <span className="px-2 py-0.5 rounded-full bg-[color:var(--w-a)]/15 border border-[color:var(--w-a)]/30 text-[color:var(--w-a)] font-mono text-[10px] font-semibold">
                D3 Visualizer
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono">Interactive timeline of academic honors & institutional leadership</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto font-mono text-xs">
          <button
            type="button"
            onClick={handlePrev}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[color:var(--w-a)]/40 text-gray-300 hover:text-white transition-colors cursor-pointer"
            title="Previous Milestone"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlaying 
                ? "bg-[color:var(--w-a)]/20 border-[color:var(--w-a)]/50 text-[color:var(--w-a)]" 
                : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
            }`}
            title={isPlaying ? "Pause auto-progression" : "Play auto-progression"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{isPlaying ? "Autoplay On" : "Autoplay"}</span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[color:var(--w-a)]/40 text-gray-300 hover:text-white transition-colors cursor-pointer"
            title="Next Milestone"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* D3 Canvas Stage */}
      <div ref={containerRef} className="w-full pt-3 pb-1 overflow-x-auto no-scrollbar">
        <svg ref={svgRef} className="w-full select-none" />
      </div>

      {/* Active Milestone Detailed Focus Spotlight */}
      <div 
        key={activeMilestone.id}
        className="mt-3 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 animate-in fade-in zoom-in-98 duration-300 flex flex-col md:flex-row items-stretch justify-between gap-5 relative overflow-hidden"
      >
        {/* Glow ambient background pill */}
        <div 
          className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ backgroundColor: activeMilestone.color }}
        />

        {/* Left Column: Title & Key Narrative */}
        <div className="flex-1 space-y-3 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span 
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ 
                backgroundColor: `${activeMilestone.color}20`, 
                color: activeMilestone.color,
                borderColor: `${activeMilestone.color}50`,
                borderWidth: "1px"
              }}
            >
              {activeMilestone.category}
            </span>

            <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gray-500" />
              <span>{activeMilestone.year}</span>
            </span>

            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300 font-mono text-[10px]">
              {activeMilestone.badge}
            </span>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              {activeMilestone.icon === "grad" && <GraduationCap className="w-5 h-5 text-[color:var(--w-a)]" />}
              {activeMilestone.icon === "award" && <Award className="w-5 h-5 text-[color:var(--w-b)]" />}
              {activeMilestone.icon === "system" && <Cpu className="w-5 h-5 text-[#38BDF8]" />}
              {activeMilestone.icon === "rocket" && <Sparkles className="w-5 h-5 text-emerald-400" />}
              <span>{activeMilestone.title}</span>
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 font-light mt-1 leading-relaxed">
              {activeMilestone.summary}
            </p>
          </div>

          {/* Key Bullet Highlights */}
          <ul className="space-y-1.5 pt-1">
            {activeMilestone.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-gray-300 font-light">
                <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--w-a)] shrink-0 mt-0.5" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          {/* Skills / Competency tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {activeMilestone.skills.map((skill) => (
              <span key={skill} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[10px] text-gray-300">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: High-Impact Metric Showcase Block */}
        <div className="w-full md:w-56 shrink-0 flex flex-col justify-center p-4 rounded-xl bg-white/[0.03] border border-white/10 text-center z-10">
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400">Verified Impact</span>
          <div 
            className="text-2xl sm:text-3xl font-bold font-mono my-1 tracking-tight"
            style={{ color: activeMilestone.color }}
          >
            {activeMilestone.metric}
          </div>
          <span className="text-xs font-mono text-gray-300 font-medium">{activeMilestone.metricLabel}</span>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span>Stage</span>
            <span className="text-white font-bold">{activeIndex + 1} / {MILESTONES_DATA.length}</span>
          </div>
        </div>
      </div>

      {/* Quick Jump Stage Buttons */}
      <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-white/5">
        {MILESTONES_DATA.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveIndex(idx);
              if (onSoundBlip) onSoundBlip();
            }}
            className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono transition-all cursor-pointer ${
              activeIndex === idx
                ? "bg-white/15 border border-[color:var(--w-a)]/60 text-white shadow-sm font-semibold"
                : "bg-white/[0.02] border border-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/5"
            }`}
          >
            {item.shortDate}
          </button>
        ))}
      </div>
    </div>
  );
}
