import React, { useState } from "react";
import { ArrowUpRight, Flame, ShieldCheck, CheckCircle2, Calendar, Milestone, ExternalLink, X, Zap, AlertCircle, Sparkles, Layers, Scale, Bot } from "lucide-react";

export interface ProjectMilestone {
  phase: string;
  title: string;
  date: string;
  status: "Completed" | "Production Live" | "Defended";
  summary: string;
  deliverables: string[];
}

export interface ProjectStackCategory {
  category: string;
  items: string[];
}

export interface ProjectItem {
  id: number;
  title: string;
  org: string;
  role: string;
  type: string;
  year: string;
  link: string;
  desc: string;
  fullDesc: {
    overview: string;
    challenge: string;
    solution: string;
    tradeoffs: string;
    aiNecessity: string;
  };
  stack: string[];
  detailedStack: ProjectStackCategory[];
  metric: string;
  keyMetrics: { label: string; value: string; detail: string }[];
  complexity: { level: number; label: string };
  milestones: ProjectMilestone[];
  highlights: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: "PIA R8 Finance Monitoring System",
    org: "Philippine Information Agency – Region 8",
    role: "Lead BA, Project Manager & Sole Full-Stack Developer",
    type: "Production Platform",
    year: "2026",
    link: "https://finance-monitoring-system-demo.vercel.app/",
    desc: "Architected a dual-layer persistence system with RESTful APIs and in-memory fallback, slashing voucher verification and reporting cycles by 80%+ via chunked batch ingestion and context-aware lexical token auto-classification (PS vs. MOOE).",
    fullDesc: {
      overview: "An enterprise financial tracking and audit reconciliation platform built directly for the Philippine Information Agency (PIA) Regional Office 8. Designed to automate and govern multi-million peso public fund allocations, disbursement vouchers, and liquidation trails with zero accounting discrepancies.",
      challenge: "Finance officers relied on disconnected Excel workbooks and paper vouchers, resulting in multi-day reconciliation cycles, risk of duplicate voucher disbursements, and laborious manual classification between Personnel Services (PS) and Maintenance and Other Operating Expenses (MOOE) line items.",
      solution: "Engineered a dual-layer resilient architecture pairing Supabase PostgreSQL with in-memory state fallbacks. Integrated a context-aware lexical tokenizer that automatically classifies line items, chunked batch ingestion for thousand-row balance sheets, and real-time budget burn rate visualizers.",
      tradeoffs: "Considered pure cloud persistence vs. dual-layer in-memory caching. Cloud-only was discarded due to frequent provincial network dropouts that risked aborted voucher reviews. Also evaluated calling an LLM API for account categorization vs. an in-engine lexical tokenizer: selected the rule-based lexical tokenizer because Commission on Audit (COA) accounting rules are strictly deterministic and require <250ms zero-latency execution with 100% mathematical auditability and zero external API costs.",
      aiNecessity: "Evaluated and deliberately bypassed generative AI: Government fiscal reconciliation requires 100% deterministic, non-hallucinatory compliance with legal charts of accounts. A probabilistic LLM was inappropriate for legal financial disbursements; instead, deterministic token scoring combined with compound database relational constraints delivered guaranteed audit accuracy."
    },
    stack: ["JavaScript", "Node.js", "Express", "PostgreSQL", "Supabase", "SheetJS", "Cloud Run"],
    detailedStack: [
      { category: "Frontend & Visualization", items: ["Vanilla JavaScript (ES6+)", "Tailwind CSS", "SheetJS (XLSX parsing & export)", "Dynamic SVG Charts"] },
      { category: "Backend & Microservices", items: ["Node.js", "Express.js REST API", "Chunked Batch Ingestion", "Lexical Token Auto-Classifier"] },
      { category: "Database & Cloud Storage", items: ["PostgreSQL", "Supabase", "Row-Level Security (RLS)", "Google Cloud Run"] },
      { category: "Governance & Security", items: ["COA Compliance Matrix", "Disaster Recovery Pipeline", "Dual-Layer In-Memory Cache", "Immutable Audit Logging"] }
    ],
    metric: "80%+ turnaround reduction · Lexical auto-classification",
    keyMetrics: [
      { label: "Turnaround Velocity", value: "80%+", detail: "Reduction in voucher verification & monthly liquidation cycles" },
      { label: "Data Integrity", value: "100%", detail: "Zero duplicate voucher disbursements via unique relational constraints" },
      { label: "Classification Speed", value: "< 250ms", detail: "Real-time automated parsing of PS vs. MOOE budget entries" }
    ],
    highlights: [
      "Sole architect responsible for full SDLC from BRD formulation to production container deployment",
      "Chunked batch ingestion capable of parsing thousand-row government expenditure files instantly",
      "Automated standard Commission on Audit (COA) compliant balance summary generation",
      "Robust failover design guaranteeing zero data loss during unstable network conditions"
    ],
    milestones: [
      {
        phase: "Phase 1: Discovery & Requirements",
        title: "BRD/BPD Formulation & Stakeholder Alignment",
        date: "Nov 2025 – Dec 2025",
        status: "Completed",
        summary: "Conducted deep operational interviews with regional accountants and administrative heads. Authored full Business Requirements Document (BRD) and Business Process Diagrams (BPD).",
        deliverables: ["Signed BRD & Traceability Matrix (RTM)", "COA Accounting Compliance Specification", "Data Flow Architecture & Entity Relationship Diagrams"]
      },
      {
        phase: "Phase 2: Core Engineering",
        title: "Dual-Layer Persistence & Schema Modeling",
        date: "Jan 2026 – Feb 2026",
        status: "Completed",
        summary: "Modeled normalized PostgreSQL schemas on Supabase with strict foreign keys and created an Express middleware layer with in-memory transaction fallback.",
        deliverables: ["PostgreSQL Schema with RLS security policies", "RESTful CRUD API endpoints with token authentication", "In-memory failover caching engine"]
      },
      {
        phase: "Phase 3: Intelligence & Automation",
        title: "Lexical Classifier & SheetJS Report Suite",
        date: "Feb 2026 – Mar 2026",
        status: "Completed",
        summary: "Implemented tokenizer algorithm to inspect voucher remarks and auto-categorize PS vs. MOOE accounts. Integrated SheetJS for bidirectional Excel imports and exports.",
        deliverables: ["Rule-based lexical classifier engine", "One-click COA-compliant spreadsheet exporter", "Burn-rate calculation & alert widgets"]
      },
      {
        phase: "Phase 4: Verification & Handover",
        title: "User Acceptance Testing & Production Handover",
        date: "Mar 2026 – Present",
        status: "Production Live",
        summary: "Executed comprehensive UAT with 100% test case pass rate. Deployed production instance to Cloud Run with full administrative documentation.",
        deliverables: ["100% Passed UAT Test Case Sign-off", "Administrator & End-User Training Manual", "Live Regional Production Deployment"]
      }
    ],
    complexity: { level: 5, label: "High Complexity" }
  },
  {
    id: 2,
    title: "TrackMyHours – DTR Platform",
    org: "Philippine Information Agency – Region 8",
    role: "Project Manager, Lead Analyst & Lead Programmer",
    type: "Production Platform",
    year: "2026",
    link: "https://trackmyhours-demo.vercel.app/",
    desc: "Engineered a zero-trust attendance pipeline (IP/subnet, geofencing, facial liveness) with IndexedDB offline-first caching to resolve 5MB browser limits, plus Google Gemini function calling for autonomous multi-format document analysis (.pdf, .docx, .xlsx).",
    fullDesc: {
      overview: "An enterprise Daily Time Record (DTR) and personnel attendance monitoring system engineered with zero-trust security principles for regional government offices and field personnel.",
      challenge: "Paper attendance sheets and basic biometric clocks were susceptible to proxy check-ins, failed during regional power/internet dropouts, and created massive administrative overhead when verifying civil service travel orders and leaves.",
      solution: "Architected a zero-trust multi-factor check-in pipeline combining subnet verification, GPS geofencing radius validation, and client-side facial liveness detection. Powered by an IndexedDB offline-first synchronization engine and Google Gemini multimodal function calling for autonomous document parsing.",
      tradeoffs: "Evaluated browser localStorage vs. IndexedDB for offline attendance caching: localStorage was rejected due to its 5MB hard quota and synchronous thread-blocking during camera frame caching. IndexedDB was chosen for asynchronous structured blob caching. For document analysis, evaluated standard OCR (Tesseract) vs. Gemini Multimodal API: Tesseract failed on variable-layout smartphone photos and non-standard government travel order templates, whereas Gemini function calling reliably extracted nested structured data.",
      aiNecessity: "AI was strictly necessary because personnel submit heterogeneous travel orders, hospital clearances, and authority slips issued by dozens of external government agencies across varying formats (.pdf, .docx, scanned photos). Rigid regex and static OCR fail on arbitrary layouts; Google Gemini multimodal function calling was required to semantically parse dates, destination names, and authorized hours while returning strictly typed JSON schemas for automated leave credit balance deduction."
    },
    stack: ["TypeScript", "React", "Node.js", "Supabase", "IndexedDB", "Gemini API", "Tailwind"],
    detailedStack: [
      { category: "Frontend & State Management", items: ["React 18", "TypeScript", "Tailwind CSS", "IndexedDB Client Cache", "Lucide Vector Suite"] },
      { category: "AI & Autonomous Agents", items: ["Google Gemini API (Vision / LLM)", "Structured Function Calling", "Multimodal Document Extraction (.pdf, .docx, .xlsx)"] },
      { category: "Security & Verification", items: ["IP Subnet Validator", "HTML5 Geolocation Geofencing", "Biometric / Liveness Camera Engine", "Anti-Spoofing Checks"] },
      { category: "Cloud & Backend Services", items: ["Supabase PostgreSQL", "Row Level Security (RLS)", "Node.js Edge Handlers", "Realtime WebSockets"] }
    ],
    metric: "Zero-trust attendance · Gemini 2.5/3.0 function calling",
    keyMetrics: [
      { label: "Attendance Security", value: "Zero-Trust", detail: "3-layer validation: IP Subnet + GPS Geofence + Facial Liveness" },
      { label: "Offline Resilience", value: "100%", detail: "IndexedDB buffer exceeds standard 5MB browser localStorage limits" },
      { label: "AI Doc Processing", value: "< 3s", detail: "Gemini autonomous extraction of travel orders & medical slips" }
    ],
    highlights: [
      "Pioneered Gemini multimodal tool calling for automated travel authority and leave verification",
      "Offline-first IndexedDB architecture allowing personnel to log punches in remote low-connectivity areas",
      "Fine-grained role-based dashboard for regional directors and HR administrative officers",
      "Exportable Civil Service Commission (CSC) Form 48 standardized DTR print layouts"
    ],
    milestones: [
      {
        phase: "Phase 1: Architecture & Threat Modeling",
        title: "Zero-Trust Security & Compliance Blueprint",
        date: "Jan 2026",
        status: "Completed",
        summary: "Formulated security parameters including IP subnet verification, GPS boundary tolerances, and anti-proxy biometric requirements in compliance with CSC rules.",
        deliverables: ["Security Threat Model & Validation Flow", "BRD & User Story Backlog", "Figma Interactive Wireframe Prototype"]
      },
      {
        phase: "Phase 2: Offline-First Engine",
        title: "IndexedDB Persistence & Conflict-Free Sync",
        date: "Jan 2026 – Feb 2026",
        status: "Completed",
        summary: "Engineered local queue manager utilizing IndexedDB to store encrypted punch records and image frames locally with auto-retry background synchronization.",
        deliverables: ["IndexedDB Storage Manager", "Background sync worker thread", "Optimistic UI state handlers"]
      },
      {
        phase: "Phase 3: AI Tool Calling Integration",
        title: "Gemini Multimodal Document Parser",
        date: "Feb 2026 – Mar 2026",
        status: "Completed",
        summary: "Integrated Google Gemini API with structured JSON schemas and function calling to extract employee IDs, approval stamps, and date ranges from scanned PDFs and photos.",
        deliverables: ["Gemini Vision Document Parsing Pipeline", "Automated Attachment Classifier", "Leave Credit Auto-Deduction Engine"]
      },
      {
        phase: "Phase 4: Regional Deployment",
        title: "System Rollout & Admin Analytics Dashboard",
        date: "Mar 2026 – Present",
        status: "Production Live",
        summary: "Rolled out to PIA Region 8 division personnel with real-time attendance visualizer, automated CSC Form 48 generators, and audit log monitors.",
        deliverables: ["Live Staging & Production Deployment", "CSC Form 48 Dynamic PDF Engine", "Admin Realtime Monitoring Dashboard"]
      }
    ],
    complexity: { level: 5, label: "High Complexity" }
  },
  {
    id: 3,
    title: "Centralized Document Management (CDMIS)",
    org: "BiPSU Records & Archives Office · Capstone Research",
    role: "Project Leader, Lead Programmer & Head Research Writer",
    type: "Award-Winning Capstone",
    year: "2025 – 2026",
    link: "https://cdmis-demo.netlify.app",
    desc: "Directed a 6-member team through full SDLC to replace paper-based archives. Achieved an ISO/IEC 25010 software usability score of 4.85/5.00 and reduced document retrieval times by ~80% with hierarchical RBAC and immutable audit logging.",
    fullDesc: {
      overview: "An institutional-grade Centralized Document Management and Information System developed for Biliran Province State University (BiPSU). Built as a comprehensive university capstone and institutional research project to digitize, index, and secure decades of academic and administrative records.",
      challenge: "University records across 12 academic and administrative units suffered from slow manual filing, physical degradation risks, lack of document tracking across approval chains, and lack of auditable access controls.",
      solution: "Led an agile team of 6 engineers to build a centralized repository with hierarchical Role-Based Access Control (RBAC), multi-stage digital endorsement pipelines, SHA-256 integrity verification, and full-text indexing.",
      tradeoffs: "Considered NoSQL document storage (MongoDB) vs. a normalized 3NF MySQL relational model: relational was chosen because multi-department approval chains demand strict foreign key integrity to eliminate orphaned endorsement records. Also evaluated commercial cloud drives (Google Drive/OneDrive API): rejected because they lack ISO/IEC 25010 granular auditability, role-segregated endorsement trees, and cryptographic SHA-256 tamper verification.",
      aiNecessity: "Evaluated AI vector embeddings vs. deterministic hierarchical RBAC search: Vector similarity was deliberately ruled out to protect strictly confidential academic tenure and presidential clearance documents from cross-department leakage. Instead, deterministic role hierarchies and SHA-256 cryptographic fingerprinting were chosen to ensure 100% compliance with ISO/IEC 25010 data security and integrity standards."
    },
    stack: ["TypeScript", "React 18", "Tailwind", "Vite", "MySQL", "Cloud Run"],
    detailedStack: [
      { category: "Frontend & Workspace UI", items: ["TypeScript", "React 18", "Tailwind CSS", "Vite Bundler", "PDF.js Document Viewer"] },
      { category: "Backend & Microservices", items: ["Node.js", "Express RESTful Architecture", "Multer Multipart Handlers", "JWT Authentication Engine"] },
      { category: "Database & Storage", items: ["MySQL Relational Engine", "Normalized 3NF Schema", "Cloud Run Microservices", "Secure Blob File Storage"] },
      { category: "Security & Standards", items: ["ISO/IEC 25010 Software Quality Standard", "Hierarchical RBAC", "SHA-256 File Checksums", "Immutable Audit Trails"] }
    ],
    metric: "4.85/5.00 ISO/IEC Usability · 80% faster processing",
    keyMetrics: [
      { label: "ISO/IEC 25010 Score", value: "4.85 / 5.00", detail: "Empirically validated software quality across 50+ university evaluators" },
      { label: "Search & Retrieval", value: "~80% Faster", detail: "Reduction in file retrieval and multi-department routing latency" },
      { label: "Research Honor", value: "Top Honors", detail: "Lead author of high-scoring capstone manuscript & software defense" }
    ],
    highlights: [
      "Served as Project Leader, Lead Programmer, and Head Technical Research Writer for the 6-person team",
      "Formulated rigorous ISO/IEC 25010 evaluation instruments measuring Functional Suitability, Usability, and Security",
      "Engineered multi-level approval hierarchies allowing dean, registrar, and president office clearances",
      "Implemented SHA-256 document hashing preventing undetected modification or unauthorized tampering"
    ],
    milestones: [
      {
        phase: "Phase 1: Institutional Gap Analysis",
        title: "Archival Workflow Study & BRD Formulation",
        date: "Aug 2025 – Oct 2025",
        status: "Completed",
        summary: "Conducted field interviews across 12 campus departments. Authored the institutional problem statement, operational flowcharts, and system requirement specifications.",
        deliverables: ["Comprehensive Capstone Proposal & BRD", "Departmental Document Taxonomy", "Data Privacy & Security Protocols"]
      },
      {
        phase: "Phase 2: Architecture & Relational Schema",
        title: "3NF Database Design & RBAC Middleware",
        date: "Nov 2025 – Dec 2025",
        status: "Completed",
        summary: "Designed 3rd Normal Form MySQL database schema with role hierarchies, document metadata tables, and tamper-evident audit log registers.",
        deliverables: ["Normalized MySQL Schema & Data Dictionaries", "JWT Authentication & RBAC Authorization Middleware", "RESTful Backend API Suite"]
      },
      {
        phase: "Phase 3: Frontend & Endorsement Pipelines",
        title: "Responsive Web Workspace & Tracking Engine",
        date: "Jan 2026 – Feb 2026",
        status: "Completed",
        summary: "Constructed high-speed React 18 frontend with integrated PDF reader, real-time routing status trackers, and automated document barcode generator.",
        deliverables: ["Interactive React 18 Document Portal", "Real-Time Tracking & Endorsement Tree", "PDF Document Preview & Annotator"]
      },
      {
        phase: "Phase 4: ISO/IEC 25010 Defense & Handover",
        title: "Empirical Testing & Academic Defense",
        date: "Mar 2026 – Present",
        status: "Defended",
        summary: "Conducted empirical ISO/IEC 25010 testing with 50+ campus stakeholders. Delivered defense presentation scoring a 4.85/5.00 rating with highest commendations.",
        deliverables: ["Published Research Manuscript & Defense", "ISO/IEC 25010 Empirical Statistical Report", "University Records Office System Handover"]
      }
    ],
    complexity: { level: 5, label: "High Complexity" }
  },
  {
    id: 4,
    title: "Requisition & Issue Slip (RIS) Portal",
    org: "Philippine Information Agency – Region 8",
    role: "Lead Analyst & Sole Full-Stack Developer",
    type: "Production Platform",
    year: "2026",
    link: "https://requisition-slip-portal-demo.netlify.app/",
    desc: "Defined operational workflows and data models for government compliance and COA auditability; implemented multi-tier RBAC, PostgreSQL Row Level Security (RLS), and a 24-hr automated disaster recovery pipeline via Supabase Edge Functions with pg_cron.",
    fullDesc: {
      overview: "A digital supply chain and asset requisition portal designed to automate internal material requisitions, stock disbursements, and inventory audits in strict compliance with Philippine Commission on Audit (COA) Appendix 63 standards.",
      challenge: "Supply requisition processes relied on multi-copy paper slips prone to loss, unmonitored stock depletion, lack of real-time inventory ledger balances, and risk of data loss due to lack of automated database backups.",
      solution: "Engineered an end-to-end requisition portal featuring dynamic stock balancing, role-segregated authorization workflows (Requester -> Recommending Approval -> Approving Authority -> Custodian), COA Appendix 63 Excel/PDF report generation, and automated 24-hour database disaster recovery.",
      tradeoffs: "Evaluated client-side inventory deduction vs. PostgreSQL server triggers: selected atomic database triggers with Row-Level Security (RLS) to prevent race conditions during simultaneous requisitions. For backup resilience, considered third-party SaaS backup tools vs. native Supabase pg_cron Edge Functions: chose native pg_cron to ensure automated 24h disaster recovery with zero additional vendor costs and zero external credential exposure.",
      aiNecessity: "Evaluated generative AI for stock predictions: Deliberately avoided using an LLM where deterministic arithmetic was mandatory. Government procurement compliance (COA Circular Appendix 63) legally mandates exact arithmetic balances and immutable audit trails; applying AI here would introduce non-deterministic risk into a legally regulated process."
    },
    stack: ["TypeScript", "React 18", "PostgreSQL", "Supabase", "Edge Functions", "SheetJS"],
    detailedStack: [
      { category: "Frontend & UI Architecture", items: ["TypeScript", "React 18", "Tailwind CSS", "Vite", "Lucide React"] },
      { category: "Database & Backend Engine", items: ["PostgreSQL", "Supabase", "Row Level Security (RLS)", "Automated Database Triggers"] },
      { category: "DevOps & Disaster Recovery", items: ["Supabase Edge Functions", "pg_cron Scheduled Snapshots", "24h Automated Backup Pipeline", "Netlify CI/CD"] },
      { category: "Reporting & Government Compliance", items: ["COA Circular Form 63 Generator", "SheetJS Excel Ledger Generator", "Digital Signature Verification"] }
    ],
    metric: "COA-compliant auditability · 24h disaster recovery",
    keyMetrics: [
      { label: "Audit Adherence", value: "100%", detail: "Strict compliance with COA Appendix 63 procurement standards" },
      { label: "Inventory Accuracy", value: "Real-time", detail: "Instant atomic stock deduction upon custodian issuance" },
      { label: "Disaster Recovery", value: "24-Hour", detail: "Automated snapshot backup pipeline via pg_cron & Edge Functions" }
    ],
    highlights: [
      "Sole developer and analyst mapping government inventory rules to automated database triggers",
      "Implemented PostgreSQL Row Level Security (RLS) ensuring strict isolation across administrative roles",
      "Created dynamic supply cart with real-time stock availability check and item category filtering",
      "Automated export of government-standard Requisition and Issue Slips ready for formal printing"
    ],
    milestones: [
      {
        phase: "Phase 1: Procurement Regulatory Mapping",
        title: "COA Circular & Workflow Analysis",
        date: "Jan 2026",
        status: "Completed",
        summary: "Mapped Philippine government procurement guidelines and Appendix 63 requisites into technical data models and user permission matrices.",
        deliverables: ["Regulatory Compliance Specification", "Role-Based Approval Matrix", "Entity Relationship Diagram (ERD)"]
      },
      {
        phase: "Phase 2: Dynamic Supply Catalog",
        title: "Catalog Engine & Multi-Tier Workflow",
        date: "Feb 2026",
        status: "Completed",
        summary: "Constructed inventory item registry with real-time quantity counters, requisition carts, and stage-by-stage approval status transitions.",
        deliverables: ["Dynamic Material Catalog UI", "Requisition Submission & Review Queue", "Stock Availability Trigger Functions"]
      },
      {
        phase: "Phase 3: Disaster Recovery & Exports",
        title: "Edge Functions & Automated Backup Automation",
        date: "Feb 2026 – Mar 2026",
        status: "Completed",
        summary: "Configured automated pg_cron jobs on Supabase Edge Functions for daily database replication and integrated SheetJS for one-click COA report printing.",
        deliverables: ["24-Hour pg_cron Automated Disaster Recovery", "SheetJS COA Appendix 63 Format Generator", "Audit History & Activity Ledger"]
      },
      {
        phase: "Phase 4: Operational Commissioning",
        title: "User Training & Production Handover",
        date: "Mar 2026 – Present",
        status: "Production Live",
        summary: "Conducted training for supply custodians and division heads, successfully transitioning office operations to 100% digital requisition tracking.",
        deliverables: ["Live Production Deployment", "Supply Custodian User Handbook", "Administrative Security Audit Report"]
      }
    ],
    complexity: { level: 4, label: "Medium-High Complexity" }
  }
];

interface ProjectsSectionProps {
  playNavHover: () => void;
}

export function ProjectsSection({ playNavHover }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Title */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          03. Case Studies & Evidence
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Featured Engineering & Systems Work
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl font-light">
          Concrete evidence of how I translate complex organizational requirements into resilient, production-ready software.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
        {PROJECTS.map((proj) => (
          <div
            key={proj.id}
            onClick={() => {
              playNavHover();
              setSelectedProject(proj);
            }}
            onMouseEnter={playNavHover}
            className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-4 sm:p-5.5 transition-all duration-300 space-y-3 cursor-pointer flex flex-col justify-between h-full flex-1 group shadow-lg text-left"
          >
            <div className="space-y-2.5">
              {/* Unboxed Header Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs font-mono">
                <div className="flex flex-wrap items-center gap-1.5 text-cyan-400 font-medium min-w-0">
                  <span className="uppercase text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/25 shrink-0">
                    {proj.type}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-300 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/50 shrink-0">
                    {proj.year}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-cyan-400 font-mono font-semibold shrink-0 ml-auto group-hover:underline">
                  Inspect Details →
                </span>
              </div>

              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight leading-snug break-words">
                {proj.title}
              </h3>

              <div className="space-y-0.5 text-[11px] sm:text-xs font-mono">
                <div className="text-indigo-300 font-medium leading-snug break-words">{proj.role}</div>
                <div className="text-slate-400 text-[10px] sm:text-[11px] break-words">{proj.org}</div>
              </div>

              <p className="text-xs text-slate-300 font-light leading-relaxed break-words">
                {proj.desc}
              </p>

              {/* Key Metric Highlight */}
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[10px] sm:text-[11px] flex items-center gap-2 w-full min-w-0 overflow-hidden">
                <Flame className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate min-w-0 flex-1">{proj.metric}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
              <span>Inspect Case Study & Architecture</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => {
            playNavHover();
            setSelectedProject(null);
          }}
        />
      )}
    </section>
  );
}

interface CaseStudyModalProps {
  project: ProjectItem;
  onClose: () => void;
}

function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "milestones" | "stack">("overview");

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden text-left shadow-2xl"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-5 md:p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/50 shrink-0">
          <div className="space-y-1.5 min-w-0 w-full sm:w-auto">
            {/* Clean Badges */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold uppercase">{project.type}</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-medium">{project.year}</span>
            </div>
            <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-tight break-words">{project.title}</h2>
            <p className="text-[11px] sm:text-xs font-mono text-indigo-300 break-words">{project.role} · {project.org}</p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/50">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs transition-colors flex-1 sm:flex-initial"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 border-b border-slate-800 bg-slate-950/40 font-mono text-[11px] sm:text-xs overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === "overview" ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            01. Problem, Tradeoffs & AI Rationale
          </button>
          <button
            onClick={() => setActiveTab("milestones")}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === "milestones" ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            02. SDLC Milestones ({project.milestones.length})
          </button>
          <button
            onClick={() => setActiveTab("stack")}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === "stack" ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30" : "text-slate-400 hover:text-white"
            }`}
          >
            03. Tech Stack Breakdown
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1 text-sm text-slate-300 text-left">
          {activeTab === "overview" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {project.keyMetrics.map((km, idx) => (
                  <div key={idx} className="p-3 sm:p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">{km.label}</div>
                    <div className="text-base sm:text-xl font-bold font-mono text-cyan-300 mt-0.5">{km.value}</div>
                    <div className="text-xs text-slate-400 font-light mt-0.5 leading-relaxed">{km.detail}</div>
                  </div>
                ))}
              </div>

              {/* Narrative */}
              <div className="space-y-3 sm:space-y-4">
                <div className="p-3.5 sm:p-5 rounded-xl bg-slate-950/40 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 font-semibold">Executive Overview</h4>
                  <p className="text-xs text-slate-200 leading-relaxed font-light">{project.fullDesc.overview}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3.5 sm:p-5 rounded-xl bg-rose-500/5 border border-rose-500/20">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2 font-semibold">1. Process: The Operational Problem</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">{project.fullDesc.challenge}</p>
                  </div>

                  <div className="p-3.5 sm:p-5 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 font-semibold">Engineered Solution</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">{project.fullDesc.solution}</p>
                  </div>
                </div>

                {/* Architectural Tradeoffs & Options Considered */}
                <div className="p-3.5 sm:p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5" />
                    <span>2. Architectural Tradeoffs &amp; Options Considered</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{project.fullDesc.tradeoffs}</p>
                </div>

                {/* AI Engineering & Necessity */}
                <div className="p-3.5 sm:p-5 rounded-xl bg-violet-500/5 border border-violet-500/20 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5" />
                    <span>4. AI Necessity &amp; Implementation Rationale</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{project.fullDesc.aiNecessity}</p>
                </div>
              </div>

              {/* Deliverables & Individual Contributions */}
              <div className="p-3.5 sm:p-5 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>3. Key Deliverables &amp; Specific Individual Contributions</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-300 font-light leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="break-words">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "milestones" && (
            <div className="space-y-3 sm:space-y-4">
              {project.milestones.map((m, idx) => (
                <div key={idx} className="p-3.5 sm:p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-mono">
                    <span className="text-xs font-mono text-cyan-300 font-semibold break-words">{m.phase}</span>
                    <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400 shrink-0">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">{m.date}</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">{m.status}</span>
                    </div>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white break-words">{m.title}</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{m.summary}</p>
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-1.5">
                    {m.deliverables.map((d, dIdx) => (
                      <span key={dIdx} className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-[10px] sm:text-[11px] text-slate-300 font-mono break-words max-w-full">
                        ✓ {d}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "stack" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {project.detailedStack.map((cat, cIdx) => (
                <div key={cIdx} className="p-3.5 sm:p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-mono uppercase text-white font-bold tracking-wider">{cat.category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700/50 text-[11px] sm:text-xs font-mono text-slate-200 break-words max-w-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
          </button>
        </div>
      </div>
    </div>
  );
}
