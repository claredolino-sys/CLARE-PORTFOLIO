import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Github, Mail, Linkedin, Code2, Database, 
  LayoutTemplate, Terminal, Send, CheckCircle2, AlertCircle, FileText,
  Loader2, Users, Kanban, RefreshCw, GitBranch, Volume2, VolumeX, Flame, 
  GitCommit, Award, GraduationCap, Phone, MapPin, Sparkles, Cpu, Layers, 
  Briefcase, CheckSquare, BarChart3, ShieldCheck, Globe, Sun, Moon,
  X, ExternalLink, Calendar, Milestone, ArrowUpRight, Check, Flag, Zap,
  Inbox, MessageSquare, Clock, Trash2, Copy,
  Reply, CheckCheck, Info, Search, Layout, Lock, Maximize2, Minimize2, Eye, BookOpen, ShieldAlert,
  Palette, Activity
} from "lucide-react";
import clareProfile from "@/imports/CLARE_PROFILE.jpg";
import { InsightsSection } from "./components/InsightsSection";
import { ApproachSection } from "./components/ApproachSection";
import { EngineeringImpactDossier } from "./components/EngineeringImpactDossier";
import confetti from "canvas-confetti";
import { ButterflyWorld, type WorldFocus, type CatchInfo } from "./world/ButterflyWorld";
import { WorldHud, ButterflyGlyph, type CatchPopup } from "./world/WorldHud";
import { WORLDS, PROJECT_PALETTES, hexToRgbString } from "./world/worlds";

// --- Configuration ---
const SECTIONS = ["01 // Overture", "02 // Backstage", "03 // Approach", "04 // Tracklist", "05 // Encore", "06 // Insights"] as const;
type SectionType = typeof SECTIONS[number];

const SECTION_METADATA: Record<SectionType, { shortTitle: string; subtitle: string; index: number }> = {
  "01 // Overture": { shortTitle: "Overture", subtitle: "Overview & Philosophy", index: 1 },
  "02 // Backstage": { shortTitle: "Backstage", subtitle: "Origin, Skills & Cadence", index: 2 },
  "03 // Approach": { shortTitle: "Approach", subtitle: "6-Step Problem-Solving Methodology", index: 3 },
  "04 // Tracklist": { shortTitle: "Tracklist", subtitle: "Projects & Case Studies", index: 4 },
  "05 // Encore": { shortTitle: "Encore", subtitle: "Contact & Transmission", index: 5 },
  "06 // Insights": { shortTitle: "Insights", subtitle: "Technical Essays & Systems Thinking", index: 6 },
};

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

export interface ProjectPRD {
  fileName: string;
  pdfUrl: string;
  documentTitle: string;
  version: string;
  status: string;
  standard: string;
  classification: string;
  pages: number;
  executiveSummary: string;
  keyObjectives: string[];
  coreSpecifications: { section: string; details: string[] }[];
  complianceNotes: string;
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
  };
  stack: string[];
  detailedStack: ProjectStackCategory[];
  metric: string;
  keyMetrics: { label: string; value: string; detail: string }[];
  complexity: { level: number; label: string };
  milestones: ProjectMilestone[];
  highlights: string[];
  prd: ProjectPRD;
}

const PROJECTS: ProjectItem[] = [
  { 
    id: 1, 
    title: "PIA R8 Finance Monitoring System", 
    org: "Philippine Information Agency – Region 8",
    role: "Product Owner & Sole Full-Stack Developer",
    type: "Production Platform", 
    year: "2026", 
    link: "https://finance-monitoring-system-demo.vercel.app/", 
    desc: "Architected a dual-layer persistence system with RESTful APIs and in-memory fallback, slashing voucher verification and reporting cycles by 80%+ via chunked batch ingestion and context-aware lexical token auto-classification (PS vs. MOOE).",
    fullDesc: {
      overview: "An enterprise financial tracking and audit reconciliation platform built directly for the Philippine Information Agency (PIA) Regional Office 8. Designed to automate and govern multi-million peso public fund allocations, disbursement vouchers, and liquidation trails with zero accounting discrepancies.",
      challenge: "Finance officers relied on disconnected Excel workbooks and paper vouchers, resulting in multi-day reconciliation cycles, risk of duplicate voucher disbursements, and laborious manual classification between Personnel Services (PS) and Maintenance and Other Operating Expenses (MOOE) line items.",
      solution: "Engineered a dual-layer resilient architecture pairing Supabase PostgreSQL with in-memory state fallbacks. Integrated a context-aware lexical tokenizer that automatically classifies line items, chunked batch ingestion for thousand-row balance sheets, and real-time budget burn rate visualizers."
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
    complexity: { level: 5, label: "Lvl 5" },
    prd: {
      fileName: "Finance_Monitoring_System_PRD_e10c6e49.pdf",
      pdfUrl: "/assets/aistudio/Finance_Monitoring_System_PRD_e10c6e49.pdf",
      documentTitle: "Product Requirements Document (PRD) — Public Sector Fund & Finance Intelligence System",
      version: "Version 1.0 (Production GA)",
      status: "Approved & Shipped to Production",
      standard: "Public Sector Fund Accounting, ORS, DV, Checks & COA Guidelines",
      classification: "Production-Grade Web Application Specification (Sanitized Portfolio Demo)",
      pages: 7,
      executiveSummary: "Production PRD for GovFinance Intelligence Portal — a resilient, zero-latency financial operations platform designed for regional public sector agencies to automatically ingest unstructured multi-sheet fiscal workbooks, classify statutory fund disbursements in real time, enforce budget ceiling integrity, and generate auditable statutory reports in seconds instead of days.",
      keyObjectives: [
        "Slashed monthly compilation cycle by >85% (from 3–4 days down to <15 mins)",
        "Client-side heuristic multi-sheet SheetJS parsing with <2.8s ingestion for >500 rows",
        "98.4% automated classification accuracy for PS vs MOOE fund tagging",
        "100% duplicate voucher prevention via SHA-256 and composite key guard"
      ],
      coreSpecifications: [
        {
          section: "Dual-Layer Persistence & Offline Fallback",
          details: [
            "Primary Supabase PostgreSQL with strict foreign keys and Row-Level Security (RLS)",
            "In-memory transaction caching fallback for regional network dropouts",
            "Optimistic concurrency control with deterministic conflict-free reconciliation"
          ]
        },
        {
          section: "Lexical Classification Engine",
          details: [
            "Context-aware rule-based tokenizer inspecting voucher remarks and account descriptions",
            "Deterministic PS vs. MOOE budget allotment category mapping with zero latency",
            "Real-time confidence scoring backed by immutable audit verification trails"
          ]
        },
        {
          section: "Batch Ingestion & Reporting Suite",
          details: [
            "SheetJS chunked parser capable of processing 1,000+ row government financial workbooks",
            "One-click COA-compliant spreadsheet and summary generation ready for state auditors",
            "Dynamic budget burn rate calculation engine with automated expenditure threshold alerts"
          ]
        }
      ],
      complianceNotes: "Sanitized demo release compliant with Philippine government privacy standards and non-disclosure regulations. All production payee names and exact budget allocations have been masked."
    }
  },
  { 
    id: 2, 
    title: "TrackMyHours – DTR Platform", 
    org: "Philippine Information Agency – Region 8",
    role: "Product Manager & Lead Developer",
    type: "Production Platform", 
    year: "2026", 
    link: "https://trackmyhours-demo.vercel.app/", 
    desc: "Engineered a zero-trust attendance pipeline (IP/subnet, geofencing, facial liveness) with IndexedDB offline-first caching to resolve 5MB browser limits, plus Google Gemini function calling for autonomous multi-format document analysis (.pdf, .docx, .xlsx).",
    fullDesc: {
      overview: "An enterprise Daily Time Record (DTR) and personnel attendance monitoring system engineered with zero-trust security principles for regional government offices and field personnel.",
      challenge: "Paper attendance sheets and basic biometric clocks were susceptible to proxy check-ins, failed during regional power/internet dropouts, and created massive administrative overhead when verifying civil service travel orders and leaves.",
      solution: "Architected a zero-trust multi-factor check-in pipeline combining subnet verification, GPS geofencing radius validation, and client-side facial liveness detection. Powered by an IndexedDB offline-first synchronization engine and Google Gemini multimodal function calling for autonomous document parsing."
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
    complexity: { level: 5, label: "Lvl 5" },
    prd: {
      fileName: "TrackMyHours_PRD_b6243116.pdf",
      pdfUrl: "/assets/aistudio/TrackMyHours_PRD_b6243116.pdf",
      documentTitle: "Product Requirements Document (PRD) — Regional Internship & Staff (RIS) Portal",
      version: "Q2 2026 Production Rollout",
      status: "Approved & Successfully Deployed to Production",
      standard: "Civil Service Form 48 (CSC Form 48 PH Statutory Standard)",
      classification: "Automated Daily Time Recording (DTR), Anti-Spoof Geofence & Civil Service Compliance",
      pages: 6,
      executiveSummary: "Comprehensive PRD chartered to replace physical attendance logbooks with an automated, tamper-resilient, mobile-responsive digital attendance terminal featuring 150m GPS geofencing, camera anti-spoofing capture, civil service Form 48 DTR calculation engine, and supervisor dispute overrides with zero data loss.",
      keyObjectives: [
        "Achieved -96.3% reduction in monthly DTR audit time (4.5 hrs/user down to <10 seconds)",
        "100% buddy-punching elimination via 150m geofencing and camera snapshot verification",
        "Exact second timestamp accuracy for punctuality tracking with 100% dispute auditability",
        "Automated Civil Service Form 48 DTR generation and quota-bounded LRU cache storage"
      ],
      coreSpecifications: [
        {
          section: "Zero-Trust Verification Pipeline",
          details: [
            "IP Subnet validation matching against whitelisted agency office network gateways",
            "HTML5 GPS Geolocation radius verification with client-side mock coordinate detection",
            "Face-API neural landmark mesh liveness check requiring blink and multi-angle orientation"
          ]
        },
        {
          section: "Offline-First Sync Engine",
          details: [
            "IndexedDB persistent client store bypassing standard 5MB browser localStorage limits",
            "AES-256 local punch payload encryption before offline queue write",
            "Background synchronization worker with exponential backoff and optimistic state update"
          ]
        },
        {
          section: "Gemini Autonomous Document Processing",
          details: [
            "Multimodal vision extraction from scanned PDFs, photos, and medical certificates",
            "Structured JSON tool calling schema extracting dates, approval stamps, and reasons",
            "Automated leave ledger balance debit calculation upon official approval confirmation"
          ]
        }
      ],
      complianceNotes: "Adheres to Philippine Civil Service Commission statutory attendance tracking guidelines. Production biometric images and biometric hashes have been replaced with simulated vectors."
    }
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
      solution: "Led an agile team of 6 engineers to build a centralized repository with hierarchical Role-Based Access Control (RBAC), multi-stage digital endorsement pipelines, SHA-256 integrity verification, and full-text indexing."
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
    complexity: { level: 5, label: "Lvl 5" },
    prd: {
      fileName: "CDMIS_PRD_b6fe5bd0.pdf",
      pdfUrl: "/assets/aistudio/CDMIS_PRD_b6fe5bd0.pdf",
      documentTitle: "Product Requirements Document (PRD) — Centralized Document Management Information System (CDMIS)",
      version: "v1.0 Production (QMS Verified)",
      status: "Approved & Live (ISO/IEC 25010 Mean: 4.85/5.00)",
      standard: "Statutory Archival Mandate / ISO QMS / ISO/IEC 25010 Software Quality Standard",
      classification: "Enterprise Records Governance & Workflow Automation (Portfolio Artifact)",
      pages: 5,
      executiveSummary: "Authoritative Product Requirements Document governing the transition from decentralized paper-based records custody into a single, high-availability digital records platform. Establishes standardized classification taxonomy, automates multi-tier approval workflows for confidential records, and maintains an immutable audit trail.",
      keyObjectives: [
        "~80% reduction in end-to-end document retrieval and delivery latency (from days to seconds)",
        "95% speedup in confidential document review and sign-off SLA (from 48–72 hrs to <2.5 hrs)",
        "0% privilege leakage via multi-tier RBAC boundary isolation (Public, Custodian, Governance)",
        "Statutory records retention and automated disposition scheduling"
      ],
      coreSpecifications: [
        {
          section: "3-Tier Hierarchical RBAC",
          details: [
            "Admin: System Configuration, Global Audit Logs, User Provisions, and Security Controls",
            "Unit Officers: Document Ingestion, Departmental Filing, Unit-level Endorsement Routing",
            "Archive Custodian: Formal Archival Appraisal, NAP Form 1 Compliance, Permanent Retention"
          ]
        },
        {
          section: "NAP Form 1 Records Appraisal Engine",
          details: [
            "Section 1: Department & Office Information Registration with verified unit custodians",
            "Section 2: Records Series Title, Retention Periods & Statutory Classifications (General vs. Specific)",
            "Section 3: Physical Volume & Condition Assessment with storage location tracking",
            "Section 4: Formal Disposition Recommendation & Archival Clearance Handover matrix"
          ]
        },
        {
          section: "Security & Audit Governance",
          details: [
            "SHA-256 file checksum generation upon upload to detect unauthorized modifications",
            "Immutable activity logging recording user ID, timestamp, IP, and document mutations",
            "Granular unit-level privacy boundaries preventing cross-department record exposure"
          ]
        }
      ],
      complianceNotes: "Evaluated under ISO/IEC 25010 standard across Functional Suitability, Performance Efficiency, Usability, Reliability, Security, and Maintainability. All personnel signatures and real student IDs have been sanitized."
    }
  },
  { 
    id: 4, 
    title: "Requisition & Issue Slip (RIS) Portal", 
    org: "Philippine Information Agency – Region 8",
    role: "Lead Product Developer & Product Manager",
    type: "Production Platform", 
    year: "2026", 
    link: "https://requisition-slip-portal-demo.netlify.app/", 
    desc: "Defined operational workflows and data models for government compliance and COA auditability; implemented multi-tier RBAC, PostgreSQL Row Level Security (RLS), and a 24-hr automated disaster recovery pipeline via Supabase Edge Functions with pg_cron.",
    fullDesc: {
      overview: "A digital supply chain and asset requisition portal designed to automate internal material requisitions, stock disbursements, and inventory audits in strict compliance with Philippine Commission on Audit (COA) Appendix 63 standards.",
      challenge: "Supply requisition processes relied on multi-copy paper slips prone to loss, unmonitored stock depletion, lack of real-time inventory ledger balances, and risk of data loss due to lack of automated database backups.",
      solution: "Engineered an end-to-end requisition portal featuring dynamic stock balancing, role-segregated authorization workflows (Requester -> Recommending Approval -> Approving Authority -> Custodian), COA Appendix 63 Excel/PDF report generation, and automated 24-hour database disaster recovery."
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
    complexity: { level: 4, label: "Lvl 4" },
    prd: {
      fileName: "RIS_Portal_PRD_c871c819.pdf",
      pdfUrl: "/assets/aistudio/RIS_Portal_PRD_c871c819.pdf",
      documentTitle: "Product Requirements Document (PRD) — Enterprise Material Requisition & Issuance System (ERIS)",
      version: "Release v1.0 (Production GA)",
      status: "Approved & Deployed to Production",
      standard: "Government Accounting Manual (GAM) Vol. II Appendix 63 & COA Requisition Standards",
      classification: "Digital Requisition & Inventory Core Platform (Confidential Portfolio Artifact)",
      pages: 5,
      executiveSummary: "Production-grade PRD specifying a zero-friction web-based digital portal enabling staff to browse live inventory, compile multi-item slips, obtain automated approvals, and trigger atomic stock deductions with audit-ready vector PDF generation and SQLite ACID transaction safety.",
      keyObjectives: [
        "88% reduction in requisition turnaround time (compressed from 5 days to <4 hours)",
        "94% cut in physical-to-record inventory variance (discrepancy lowered to <2% via atomic DB locks)",
        "80% time saved during quarterly compliance prep through instant vector PDF generation",
        "Zero-cloud lock-in, deployable on local on-premise servers or air-gapped agency networks"
      ],
      coreSpecifications: [
        {
          section: "Dynamic Supply Cart & Stock Balancing",
          details: [
            "Real-time inventory lookup preventing requisition of depleted or low-stock items",
            "Atomic reservation locking preventing race conditions during concurrent staff submissions",
            "Automatic unit cost calculation and expenditure balance reporting against division allotments"
          ]
        },
        {
          section: "4-Tier Segregated Approval Chain",
          details: [
            "Tier 1 Requester: Item catalog selection, official justification, and digital draft submission",
            "Tier 2 Recommending Officer: Division-level budget and operational necessity clearance",
            "Tier 3 Approving Authority: Executive regional director procurement sign-off",
            "Tier 4 Property Custodian: Physical inspection, issue slip generation, and atomic stock deduction"
          ]
        },
        {
          section: "24-Hour Automated Disaster Recovery",
          details: [
            "Scheduled daily database snapshot triggers orchestrated via PostgreSQL pg_cron extension",
            "Supabase Edge Functions encrypting and staging incremental backups to external bucket",
            "One-command restore verification ensuring Recovery Point Objective (RPO) < 24 hours"
          ]
        }
      ],
      complianceNotes: "Complies with Government Accounting Manual (GAM) Volume II, Appendix 63 format specifications for government supply management. All official agency seals and personnel identifiers have been replaced with sanitized representations."
    }
  }
];

export interface SkillItem {
  name: string;
  proofBadge: string;
  projectId?: number;
  projectTag?: string;
  certUrl?: string;
  certBadge?: string;
  certTitle?: string;
}

export interface SkillCategoryData {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  items: SkillItem[];
}

export const SKILLS: Record<string, SkillCategoryData> = {
  "Product & Systems Analysis": { 
    title: "Product & Systems Analysis",
    subtitle: "Translating operational friction into technical specifications",
    icon: Kanban, 
    items: [
      { name: "Customer Research", proofBadge: "Field Interviews", projectId: 1, projectTag: "PIA R8 Finance" },
      { name: "Data Analysis", proofBadge: "Financial & Audit Modeling", projectId: 1, projectTag: "PIA R8 Finance" },
      { name: "Product Execution", proofBadge: "Full SDLC Handover", projectId: 1, projectTag: "PIA R8 Finance" },
      { name: "Functional Specifications", proofBadge: "PRD & RTM Formulation", projectId: 1, projectTag: "PIA R8 Finance" },
      { name: "Feature Prioritization", proofBadge: "MoSCoW / Value vs Effort", projectId: 3, projectTag: "CDMIS Capstone" },
      { name: "User Stories", proofBadge: "Agile Backlogs & UAT", projectId: 2, projectTag: "TrackMyHours" },
      { name: "Process Mapping (As-Is/To-Be)", proofBadge: "Operational Workflows", projectId: 4, projectTag: "RIS Portal" },
      { name: "Requirements Gathering & Analysis", proofBadge: "Client Work", projectId: 1, projectTag: "PIA R8 Finance" },
      { name: "Systems Analysis & Design", proofBadge: "Academic & Client Work", projectId: 3, projectTag: "CDMIS Capstone" },
      { name: "Agile / Scrum & Team Coordination", proofBadge: "Team Leadership", projectId: 3, projectTag: "CDMIS Capstone" },
    ] 
  },
  "Software Development": { 
    title: "Software Development",
    subtitle: "Hands-on full-stack engineering with modern web technologies",
    icon: Code2, 
    items: [
      { name: "React & Next.js", proofBadge: "Hands-on Implementation", projectId: 2, projectTag: "TrackMyHours" },
      { 
        name: "JavaScript & TypeScript", 
        proofBadge: "HackerRank Verified", 
        projectId: 1, 
        projectTag: "PIA R8 Finance",
        certUrl: "https://www.hackerrank.com/certificates/iframe/fab4af630aab",
        certBadge: "HackerRank Verified",
        certTitle: "JavaScript (Intermediate)"
      },
      { name: "HTML5 & CSS3", proofBadge: "Hands-on Implementation", projectId: 1, projectTag: "PIA R8 Finance" },
      { name: "Node.js & Express", proofBadge: "Production Use", projectId: 1, projectTag: "PIA R8 Finance" },
      { name: "Git & REST APIs", proofBadge: "Project Experience", projectId: 1, projectTag: "PIA R8 Finance" },
    ] 
  },
  "Data & Cloud Systems": { 
    title: "Data & Cloud Systems",
    subtitle: "Relational database modeling, security & automated pipelines",
    icon: Database, 
    items: [
      { name: "SQL & Relational Database Design", proofBadge: "Academic & Production", projectId: 1, projectTag: "PIA R8 Finance" },
      { name: "PostgreSQL & MySQL", proofBadge: "Production Use", projectId: 1, projectTag: "PIA R8 Finance" },
      { name: "Supabase & Access Controls", proofBadge: "Production Use", projectId: 2, projectTag: "TrackMyHours" },
      { name: "Cloud Deployment", proofBadge: "Production Live", projectId: 1, projectTag: "Cloud Run / Vercel" },
      { name: "Data Processing & Reporting Automation", proofBadge: "Client Work", projectId: 1, projectTag: "PIA R8 Finance" },
    ] 
  },
  "AI & Product Innovation": { 
    title: "AI & Product Innovation",
    subtitle: "AI-assisted development, multimodal APIs & intelligent automation",
    icon: Sparkles, 
    items: [
      { name: "AI-Assisted Software Development", proofBadge: "Hands-on Implementation", projectId: 2, projectTag: "TrackMyHours" },
      { name: "LLM API Integration", proofBadge: "Production Use", projectId: 2, projectTag: "TrackMyHours DTR" },
      { name: "Prompt Engineering & Prototyping", proofBadge: "Hands-on Implementation", projectId: 2, projectTag: "TrackMyHours" },
      { name: "AI Function Calling", proofBadge: "Production Use", projectId: 2, projectTag: "TrackMyHours (Gemini)" },
      { name: "AI Feature Evaluation & Iteration", proofBadge: "Project Experience", projectId: 2, projectTag: "TrackMyHours" },
    ] 
  }
};

const APPROACH_STEPS = [
  {
    num: "01",
    title: "Understand",
    icon: Search,
    summary: "Investigate context, intended users, and root operational friction.",
    detail: "Conduct operational interviews with end-users and review existing paper/spreadsheet workflows before proposing technical solutions.",
    example: "Interviewed PIA Region 8 finance officers to map disbursement voucher bottlenecks before writing the Finance Monitoring System specifications."
  },
  {
    num: "02",
    title: "Analyze",
    icon: GitBranch,
    summary: "Deconstruct problems into requirements, process flows, and constraints.",
    detail: "Author Product Requirements Documents (PRDs), Process Diagrams (PDs), and Requirements Traceability Matrices (RTMs) to establish clear scope.",
    example: "Mapped Commission on Audit (COA Circular) Appendix 63 regulations to database entities and authorization matrices for the RIS Inventory Portal."
  },
  {
    num: "03",
    title: "Design",
    icon: Layout,
    summary: "Architect relational schemas, role hierarchies, and intuitive interfaces.",
    detail: "Draft normalized 3NF ERDs, define REST API contracts, establish security models (RLS, RBAC), and prototype responsive user interfaces.",
    example: "Designed zero-trust check-in architecture combining subnet verification, geofencing, and facial liveness for TrackMyHours DTR Platform."
  },
  {
    num: "04",
    title: "Build",
    icon: Code2,
    summary: "Implement resilient full-stack systems with clean, maintainable code.",
    detail: "Develop TypeScript/React frontends and Express/Node.js or Supabase PostgreSQL backends with offline-first client caches and automated backups.",
    example: "Engineered dual-layer persistence pairing Supabase PostgreSQL with in-memory fallbacks and context-aware lexical auto-classification."
  },
  {
    num: "05",
    title: "Validate",
    icon: CheckCircle2,
    summary: "Execute empirical testing, UAT, and international quality evaluations.",
    detail: "Write structured test cases, conduct User Acceptance Testing with end-users, and measure software usability against ISO/IEC 25010 standards.",
    example: "Evaluated the CDMIS University Capstone with 50+ campus stakeholders, achieving an ISO/IEC 25010 usability score of 4.85 out of 5.00."
  },
  {
    num: "06",
    title: "Improve",
    icon: RefreshCw,
    summary: "Iterate based on user feedback, edge cases, and performance monitoring.",
    detail: "Refine user experience, optimize query performance, integrate AI function calling for automation, and provide administrative documentation.",
    example: "Integrated Google Gemini function calling into TrackMyHours to parse travel orders and auto-deduct leave credits based on user feedback."
  }
];

// --- Skill Brand Iconography ---
function SkillIcon({ name, className = "w-3.5 h-3.5 shrink-0" }: { name: string; className?: string }) {
  switch (name) {
    case "React & Next.js":
    case "React":
    case "React 18":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${className} text-[#00D8FF]`}>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      );
    case "JavaScript & TypeScript":
    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6" fillOpacity="0.25" stroke="#3178C6" strokeWidth="1.4" />
          <path d="M6.5 8.5h5m-2.5 0v7m4-7h3.2c.9 0 1.6.4 1.6 1.3 0 .7-.5 1.1-1.3 1.2.9.1 1.5.6 1.5 1.4 0 1-.8 1.6-1.8 1.6H13m0-7v7" stroke="#38BDF8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "HTML5 & CSS3":
    case "HTML/CSS":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${className} text-[#E34F26]`}>
          <path d="M4 3l1.5 16 6.5 2 6.5-2L20 3H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
          <path d="M16 7H8l.5 5h7l-.5 5-3 1-3-1-.2-2" stroke="#FF7043" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "Node.js & Express":
    case "Node.js":
    case "Express":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${className} text-[#68A063]`}>
          <path d="M12 2l8.5 4.9v9.8L12 21.6 3.5 16.7V6.9L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
          <path d="M12 7v5m0 0l4 2.5m-4-2.5l-4 2.5" stroke="#4ADE80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "PostgreSQL & MySQL":
    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${className} text-[#336791]`}>
          <ellipse cx="12" cy="6" rx="7.5" ry="3.5" stroke="currentColor" strokeWidth="1.4" fill="currentColor" fillOpacity="0.15" />
          <path d="M4.5 6v5.5c0 1.9 3.4 3.5 7.5 3.5s7.5-1.6 7.5-3.5V6m-15 5.5v5.5c0 1.9 3.4 3.5 7.5 3.5s7.5-1.6 7.5-3.5v-5.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M9 13.5c1 .8 2 1 3 1s2-.2 3-1" stroke="#60A5FA" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "Supabase & Access Controls":
    case "Supabase":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${className} text-[#3ECF8E]`}>
          <path d="M13.8 2.2L3.9 14.4c-.6.7-.1 1.8.8 1.8h7.5l-2 5.6c-.4 1.1 1 1.9 1.8 1l9.9-12.2c.6-.7.1-1.8-.8-1.8h-7.5l2-5.6c.4-1.1-1-1.9-1.8-1z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "Customer Research":
      return <Users className={`${className} text-[color:var(--w-a)]`} />;
    case "Data Analysis":
      return <BarChart3 className={`${className} text-[#38BDF8]`} />;
    case "Product Execution":
      return <Kanban className={`${className} text-[#C084FC]`} />;
    case "Functional Specifications":
    case "Functional Specs & UAT Testing":
      return <FileText className={`${className} text-[color:var(--w-a)]`} />;
    case "Feature Prioritization":
      return <CheckSquare className={`${className} text-[#4ADE80]`} />;
    case "User Stories":
      return <MessageSquare className={`${className} text-[#F87171]`} />;
    case "Process Mapping (As-Is/To-Be)":
    case "Process Mapping & Workflow Design":
      return <GitBranch className={`${className} text-[#38BDF8]`} />;
    case "Requirements Gathering & Analysis":
      return <FileText className={`${className} text-[color:var(--w-a)]`} />;
    case "Systems Analysis & Design":
      return <Layout className={`${className} text-[color:var(--w-a)]`} />;
    case "Agile / Scrum & Team Coordination":
      return <Kanban className={`${className} text-[#C084FC]`} />;
    case "Git & REST APIs":
      return <GitCommit className={`${className} text-[#F87171]`} />;
    case "SQL & Relational Database Design":
      return <Database className={`${className} text-[color:var(--w-a)]`} />;
    case "Cloud Deployment":
      return <Globe className={`${className} text-[#38BDF8]`} />;
    case "Data Processing & Reporting Automation":
    case "Data Processing & Reporting":
      return <BarChart3 className={`${className} text-[#22C55E]`} />;
    case "AI-Assisted Software Development":
    case "AI-Assisted Development":
      return <Sparkles className={`${className} text-[color:var(--w-a)]`} />;
    case "LLM API Integration":
      return <Cpu className={`${className} text-[#C084FC]`} />;
    case "Prompt Engineering & Prototyping":
      return <Terminal className={`${className} text-[#38BDF8]`} />;
    case "AI Function Calling":
      return <Zap className={`${className} text-[color:var(--w-a)]`} />;
    case "AI Feature Evaluation & Iteration":
      return <RefreshCw className={`${className} text-[#4ADE80]`} />;
    default:
      return <Code2 className={`${className} text-gray-400`} />;
  }
}

// --- Complexity Meter Graphic Component ---
function ComplexityMeter({ level, label }: { level: number; label: string }) {
  return (
    <div 
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 group-hover:border-[color:var(--w-a)]/40 transition-all font-mono shadow-sm"
      title={`Engineering Complexity: ${label} (${level}/5)`}
    >
      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 text-[color:var(--w-a)] shrink-0" aria-hidden="true">
        <path d="M2.5 11.5A6.5 6.5 0 0 1 13.5 11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M8 8l2.5-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      </svg>
      <div className="flex items-end gap-[2px] h-3" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((bar) => {
          const isFilled = bar <= level;
          const h = 4 + bar * 1.6;
          return (
            <span
              key={bar}
              style={{ height: `${h}px` }}
              className={`w-[2px] rounded-t-[1px] transition-all duration-300 ${
                isFilled
                  ? bar >= 4
                    ? "bg-[color:var(--w-b)] shadow-[0_0_4px_rgba(var(--w-b-rgb),0.8)]"
                    : "bg-[color:var(--w-a)] shadow-[0_0_4px_rgba(var(--w-a-rgb),0.8)]"
                  : "bg-white/15"
              }`}
            />
          );
        })}
      </div>
      <span className="text-[9px] uppercase tracking-wider text-gray-400 group-hover:text-gray-200">
        {label}
      </span>
    </div>
  );
}

// --- Evidence-Based Skill Item Row Component ---
function SkillItemRow({
  item,
  onSelectProject,
  onOpenCert,
}: {
  item: SkillItem;
  onSelectProject: (projectId: number) => void;
  onOpenCert?: () => void;
}) {
  const project = item.projectId ? PROJECTS.find((p) => p.id === item.projectId) : undefined;
  const [copied, setCopied] = useState(false);

  const handleCopySkill = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(item.name);
      soundEngine.playCardHover();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className={`group/skill flex flex-col p-2.5 rounded-xl border transition-all text-left relative ${
      copied 
        ? "bg-[color:var(--w-a)]/10 border-[color:var(--w-a)] shadow-[0_0_15px_rgba(var(--w-a-rgb),0.3)]" 
        : "bg-white/[0.02] border-white/5 hover:border-[color:var(--w-a)]/40"
    }`}>
      <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1.5 mb-1.5 min-w-0">
        <div 
          onClick={handleCopySkill}
          className="flex items-start gap-1.5 min-w-0 cursor-pointer group/copy hover:text-[color:var(--w-a)] flex-1 basis-36"
          title="Click to copy skill name to clipboard"
        >
          <SkillIcon name={item.name} className="w-4 h-4 shrink-0 text-[color:var(--w-a)] group-hover/skill:scale-110 transition-transform mt-0.5" />
          <span className="text-xs font-semibold text-white group-hover/skill:text-[color:var(--w-a)] transition-colors leading-snug break-words">
            {item.name}
          </span>
          <span className="opacity-0 group-hover/skill:opacity-100 transition-opacity p-0.5 text-gray-400 hover:text-[color:var(--w-a)] shrink-0 mt-0.5">
            {copied ? <Check className="w-3 h-3 text-[color:var(--w-a)]" /> : <Copy className="w-3 h-3" />}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-auto">
          {copied ? (
            <span className="px-2 py-0.5 rounded bg-[color:var(--w-a)]/20 border border-[color:var(--w-a)]/50 text-[9px] font-mono text-[color:var(--w-a)] font-bold uppercase animate-pulse">
              ✓ Copied!
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-gray-300 uppercase shrink-0 whitespace-nowrap leading-tight tracking-tight">
              {item.proofBadge}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-1">
        {project && item.projectTag && (
          <button
            onClick={() => onSelectProject(item.projectId!)}
            className="inline-flex items-center gap-1 text-[10px] font-mono text-[color:var(--w-a)]/80 hover:text-[color:var(--w-a)] hover:underline transition-colors cursor-pointer"
            title={`View Case Study: ${project.title}`}
          >
            <ArrowUpRight className="w-3 h-3 shrink-0" />
            <span>Verified in: {item.projectTag}</span>
          </button>
        )}

        {item.certUrl && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenCert) {
                onOpenCert();
              } else {
                window.open(item.certUrl, "_blank");
              }
            }}
            className="inline-flex items-center gap-1 text-[10px] font-mono text-[#00EA64] hover:text-white hover:underline transition-colors cursor-pointer"
            title={`View Verified HackerRank Certificate (${item.certTitle || "JavaScript Intermediate"})`}
          >
            <Award className="w-3 h-3 text-[#00EA64] shrink-0" />
            <span>{item.certBadge || "HackerRank Verified"} →</span>
          </button>
        )}
      </div>
    </div>
  );
}

// --- Animated Skill Category Card Component ---
function SkillCategoryCard({
  category,
  data,
  categoryIdx,
  isParentActive,
  onSelectProject,
  onOpenCert,
}: {
  category: string;
  data: SkillCategoryData;
  categoryIdx: number;
  isParentActive: boolean;
  onSelectProject: (projectId: number) => void;
  onOpenCert?: () => void;
}) {
  const CategoryIcon = data.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
        delay: categoryIdx * 0.08,
      }}
      whileHover={{
        y: -6,
        scale: 1.025,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      onMouseEnter={() => soundEngine.playCardHover()}
      className="group/skillcard bg-white/[0.015] border border-white/10 hover:border-[color:var(--w-a)] rounded-2xl p-4 sm:p-5 flex flex-col justify-between glow-border h-full hover:shadow-[0_0_25px_rgba(var(--w-a-rgb),0.35),0_0_50px_rgba(var(--w-a-rgb),0.12)] hover:bg-white/[0.04] cursor-pointer"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-2 rounded-xl bg-[color:var(--w-a)]/10 border border-[color:var(--w-a)]/30 text-[color:var(--w-a)] shrink-0 group-hover/skillcard:border-[color:var(--w-a)]/60 group-hover/skillcard:bg-[color:var(--w-a)]/20 group-hover/skillcard:scale-110 transition-all duration-300">
              <CategoryIcon className="w-4 h-4 shrink-0" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-white tracking-tight leading-snug break-words group-hover/skillcard:text-[color:var(--w-a)] transition-colors duration-300">{data.title}</h3>
          </div>
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest hidden sm:inline shrink-0 group-hover/skillcard:text-gray-300 transition-colors">0{categoryIdx + 1}</span>
        </div>

        <p className="text-[11px] font-mono text-gray-400 font-light leading-snug">
          {data.subtitle}
        </p>

        <div className="space-y-2 pt-1">
          {data.items.map((item) => (
            <SkillItemRow 
              key={item.name} 
              item={item} 
              onSelectProject={onSelectProject} 
              onOpenCert={onOpenCert}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}





function GitHubContributions({ 
  className = "", 
  style, 
  theme = "deep-space" 
}: { 
  className?: string; 
  style?: React.CSSProperties; 
  theme?: "deep-space" | "cyber-light";
} = {}) {
  const [hoveredCell, setHoveredCell] = useState<{ 
    date: string; 
    dateKey: string;
    count: number; 
    level: number;
    weekIdx: number; 
    dayIdx: number 
  } | null>(null);
  const [activePalette, setActivePalette] = useState<ContributionPalette>("cyan");
  const [highlightLevel, setHighlightLevel] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isLight = theme === "cyber-light";
  const palette = CONTRIBUTION_PALETTES[activePalette];
  const levelClasses = isLight ? palette.levelClassesLight : palette.levelClassesDark;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const totalCommits = useMemo(() => {
    return GENERATED_CONTRIBUTIONS.flat().reduce((acc, d) => acc + d.count, 0);
  }, []);

  const activeDaysCount = useMemo(() => {
    return Object.keys(EXACT_GITHUB_CONTRIBUTIONS).length;
  }, []);

  const peakDayCount = useMemo(() => {
    return Math.max(...Object.values(EXACT_GITHUB_CONTRIBUTIONS).map(v => v.count));
  }, []);

  return (
    <div 
      ref={containerRef}
      id="github-contributions-card"
      style={style}
      className={`relative rounded-2xl border transition-all duration-300 w-full overflow-hidden ${
        isLight
          ? "bg-white/95 border-slate-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
          : "bg-[#090D16]/90 backdrop-blur-2xl border-white/10 shadow-[0_12px_45px_rgba(0,0,0,0.7)]"
      } p-4 sm:p-6 lg:p-7 ${className}`}
    >
      {/* Top Radiant Accent Line */}
      <div 
        className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${palette.gradientBar} transition-all duration-500`}
        style={{ boxShadow: `0 0 14px ${palette.accentHex}` }}
      />

      {/* Header Row: Identity, Live Stats & Interactive Palette Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
        <div className="flex items-start sm:items-center gap-3">
          <a
            href="https://github.com/claredolino-sys"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 rounded-xl border transition-all duration-200 shrink-0 group ${
              isLight 
                ? "bg-slate-100 border-slate-200 text-slate-800 hover:border-slate-400 shadow-sm"
                : "bg-white/[0.04] border-white/10 text-white hover:border-[color:var(--w-a)]/50 shadow-sm"
            }`}
            title="Open Clare Dolino's GitHub Profile (@claredolino-sys)"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`text-base sm:text-lg md:text-xl font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                {totalCommits} Contributions
              </h3>
              <span className="text-xs font-mono text-gray-400">·</span>
              <a
                href="https://github.com/claredolino-sys"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-2.5 py-0.5 rounded-full border font-mono text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 ${palette.badgeBg} ${palette.badgeBorder} ${palette.badgeText} hover:opacity-85`}
                title="View @claredolino-sys on GitHub"
              >
                @claredolino-sys
              </a>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isLight ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"} flex items-center gap-1`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Verified Public Data</span>
              </span>
            </div>
            <p className={`text-xs font-light leading-relaxed mt-0.5 ${isLight ? "text-slate-500" : "text-gray-400"}`}>
              Direct verified 2025–2026 contribution matrix across system architecture, sprint milestones, and production deployments.
            </p>
          </div>
        </div>

        {/* Right Header Controls: Metrics & Palette Switcher */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Quick Metrics Badges */}
          <div className={`flex items-center gap-3 px-3 py-1.5 rounded-xl border text-xs font-mono ${
            isLight ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-white/[0.03] border-white/10 text-gray-300"
          }`}>
            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="font-bold text-white" style={{ color: palette.accentHex }}>{peakDayCount}</span>
              <span className="text-[10px] text-gray-400">Peak/Day</span>
            </div>
            <span className="text-gray-500">|</span>
            <div className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-[color:var(--w-a)] shrink-0" />
              <span className={`font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{activeDaysCount}</span>
              <span className="text-[10px] text-gray-400">Sprint Days</span>
            </div>
          </div>

          {/* Interactive Color Palette Selector */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border ${
            isLight ? "bg-slate-100 border-slate-200" : "bg-black/40 border-white/10"
          }`}>
            <span className="text-[10px] font-mono text-gray-400 px-1.5 hidden sm:inline flex items-center gap-1">
              <Palette className="w-3 h-3" />
              <span>Theme:</span>
            </span>
            {(["cyan", "emerald", "violet"] as ContributionPalette[]).map((pKey) => {
              const p = CONTRIBUTION_PALETTES[pKey];
              const isActive = activePalette === pKey;
              return (
                <button
                  key={pKey}
                  type="button"
                  onClick={() => setActivePalette(pKey)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                    isActive
                      ? isLight
                        ? "bg-white text-slate-900 shadow-sm border border-slate-200 font-bold"
                        : "bg-white/15 text-white shadow-sm border border-white/20 font-bold"
                      : isLight
                      ? "text-slate-600 hover:text-slate-900"
                      : "text-gray-400 hover:text-white"
                  }`}
                  title={`Switch to ${p.name} theme`}
                >
                  <span className={`w-2 h-2 rounded-full ${p.dotColor} shrink-0`} />
                  <span>{p.name.split(" ")[1]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Heatmap Matrix Viewport */}
      <div className="relative overflow-x-auto no-scrollbar pb-2 pt-1 w-full">
        <div className="w-full min-w-[660px]">
          {/* Months Header Labels */}
          <div className={`flex text-[10px] font-mono select-none mb-1.5 pl-6 sm:pl-7 w-full ${isLight ? "text-slate-500 font-medium" : "text-gray-400"}`}>
            {MONTH_LABELS.map(m => (
              <span key={m.name + m.weekIndex} style={{ width: `${(100 / 13).toFixed(2)}%` }} className="truncate pr-1 text-left">
                {m.name}
              </span>
            ))}
          </div>

          {/* Days Label & Contribution Grid */}
          <div className="flex gap-1.5 sm:gap-2 items-start w-full">
            <div className={`flex flex-col justify-between text-[9px] font-mono pr-1.5 select-none h-[92px] sm:h-[102px] w-6 sm:w-7 shrink-0 text-right ${isLight ? "text-slate-500 font-medium" : "text-gray-400"}`}>
              <span className="invisible">Sun</span>
              <span>Mon</span>
              <span className="invisible">Tue</span>
              <span>Wed</span>
              <span className="invisible">Thu</span>
              <span>Fri</span>
              <span className="invisible">Sat</span>
            </div>

            <div className="grid grid-flow-col auto-cols-fr gap-[2.5px] sm:gap-[3px] md:gap-[3.5px] w-full">
              {GENERATED_CONTRIBUTIONS.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[2.5px] sm:gap-[3px] md:gap-[3.5px]">
                  {week.map((day, dIdx) => {
                    const isHovered = hoveredCell?.weekIdx === wIdx && hoveredCell?.dayIdx === dIdx;
                    const dateObj = new Date(2025, 9, 12, 12, 0, 0);
                    dateObj.setDate(dateObj.getDate() + (wIdx * 7 + dIdx));
                    const y = dateObj.getFullYear();
                    const m = String(dateObj.getMonth() + 1).padStart(2, "0");
                    const d = String(dateObj.getDate()).padStart(2, "0");
                    const dateKey = `${y}-${m}-${d}`;
                    
                    const isHighlighted = highlightLevel !== null && day.level === highlightLevel;
                    const isDimmed = highlightLevel !== null && day.level !== highlightLevel;

                    // Fetch color class based on level & active theme
                    let colorClass = levelClasses.empty;
                    if (day.level === 1) colorClass = levelClasses[1];
                    else if (day.level === 2) colorClass = levelClasses[2];
                    else if (day.level === 3) colorClass = levelClasses[3];
                    else if (day.level === 4) colorClass = levelClasses[4];

                    const delayMs = wIdx * 6 + dIdx * 2;
                    const milestone = SPRINT_MILESTONES[dateKey];

                    return (
                      <div
                        key={dIdx}
                        onMouseEnter={() => setHoveredCell({ 
                          date: day.date, 
                          dateKey,
                          count: day.count, 
                          level: day.level,
                          weekIdx: wIdx, 
                          dayIdx: dIdx 
                        })}
                        onMouseLeave={() => setHoveredCell(null)}
                        style={{
                          transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
                        }}
                        className={`w-full aspect-square rounded-[2.5px] sm:rounded-[3px] border transition-all duration-200 ease-out cursor-pointer relative ${colorClass} ${
                          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                        } ${isHovered ? "!scale-150 z-30 ring-2 ring-white !opacity-100 shadow-xl" : ""} ${
                          isHighlighted ? "ring-2 ring-white scale-110 !opacity-100" : ""
                        } ${isDimmed ? "opacity-20" : ""}`}
                      >
                        {milestone && (
                          <span 
                            className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-amber-400 ring-1 ring-black pointer-events-none animate-ping"
                            title={milestone.label}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Footer & HUD Floating Details */}
      <div className={`mt-4 pt-3.5 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono ${
        isLight ? "border-slate-200" : "border-white/10"
      }`}>
        {/* Dynamic Hover HUD Information */}
        <div className="flex-1 min-w-0">
          {hoveredCell ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-medium ${
                hoveredCell.count > 0 
                  ? isLight ? "bg-slate-100 border-slate-300 text-slate-900" : "bg-white/10 border-white/20 text-white"
                  : isLight ? "bg-slate-50 border-slate-200 text-slate-500" : "bg-white/5 border-white/10 text-gray-400"
              }`}>
                <span className={`w-2 h-2 rounded-full ${hoveredCell.count > 0 ? palette.dotColor : "bg-gray-500"}`} />
                <strong>{hoveredCell.count > 0 ? `${hoveredCell.count} Contributions` : "No contributions"}</strong>
                <span className="text-gray-400">on</span>
                <span>{hoveredCell.date}</span>
              </span>

              {SPRINT_MILESTONES[hoveredCell.dateKey] && (
                <span className="px-2 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] font-semibold animate-pulse">
                  {SPRINT_MILESTONES[hoveredCell.dateKey].badge}
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-400 text-[11px]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Hover any day to inspect commit counts, or click a level box to filter intensity.</span>
            </div>
          )}
        </div>

        {/* Level Legend with Interactive Filter Clicking */}
        <div className="flex items-center gap-2 text-gray-400 text-[10px] shrink-0 self-end md:self-auto">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setHighlightLevel(highlightLevel === 0 ? null : 0)}
              className={`w-3.5 h-3.5 rounded-[2.5px] border transition-transform cursor-pointer ${levelClasses.empty} ${
                highlightLevel === 0 ? "scale-125 ring-2 ring-white" : "hover:scale-110"
              }`}
              title="Filter: No contributions"
            />
            <button
              type="button"
              onClick={() => setHighlightLevel(highlightLevel === 1 ? null : 1)}
              className={`w-3.5 h-3.5 rounded-[2.5px] border transition-transform cursor-pointer ${levelClasses[1]} ${
                highlightLevel === 1 ? "scale-125 ring-2 ring-white" : "hover:scale-110"
              }`}
              title="Filter: 1–3 contributions"
            />
            <button
              type="button"
              onClick={() => setHighlightLevel(highlightLevel === 2 ? null : 2)}
              className={`w-3.5 h-3.5 rounded-[2.5px] border transition-transform cursor-pointer ${levelClasses[2]} ${
                highlightLevel === 2 ? "scale-125 ring-2 ring-white" : "hover:scale-110"
              }`}
              title="Filter: 4–6 contributions"
            />
            <button
              type="button"
              onClick={() => setHighlightLevel(highlightLevel === 3 ? null : 3)}
              className={`w-3.5 h-3.5 rounded-[2.5px] border transition-transform cursor-pointer ${levelClasses[3]} ${
                highlightLevel === 3 ? "scale-125 ring-2 ring-white" : "hover:scale-110"
              }`}
              title="Filter: 7–11 contributions"
            />
            <button
              type="button"
              onClick={() => setHighlightLevel(highlightLevel === 4 ? null : 4)}
              className={`w-3.5 h-3.5 rounded-[2.5px] border transition-transform cursor-pointer ${levelClasses[4]} ${
                highlightLevel === 4 ? "scale-125 ring-2 ring-white" : "hover:scale-110"
              }`}
              title="Filter: 12+ contributions (Peak Velocity)"
            />
          </div>
          <span>More</span>

          {highlightLevel !== null && (
            <button
              type="button"
              onClick={() => setHighlightLevel(null)}
              className="ml-1 text-[10px] text-gray-400 hover:text-white underline cursor-pointer"
            >
              Reset
            </button>
          )}

          <a 
            href="https://github.com/claredolino-sys" 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 pl-2 border-l border-white/10 text-gray-400 hover:text-[color:var(--w-a)] transition-colors flex items-center gap-1"
            title="Inspect Clare Dolino's profile on GitHub"
          >
            <span>GitHub Profile</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

// --- Three.js Cosmos Background with Circular Star Balls & Orbital Constellation Rings ---
// --- Organic Lerp Physics Tilt Wrapper ---
function TiltWrapper({
  children,
  className = "",
  maxTilt = 0.6,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  disabled?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetTilt = useRef({ x: 0, y: 0 });
  const currentTilt = useRef({ x: 0, y: 0 });
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    if (disabled) return;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      // Smooth organic lerp dampening (0.035 factor) for subtle, natural tracking
      currentTilt.current.x = lerp(currentTilt.current.x, targetTilt.current.x, 0.035);
      currentTilt.current.y = lerp(currentTilt.current.y, targetTilt.current.y, 0.035);

      if (containerRef.current) {
        containerRef.current.style.transform = `perspective(1200px) rotateX(${currentTilt.current.x.toFixed(3)}deg) rotateY(${currentTilt.current.y.toFixed(3)}deg)`;
      }

      frameId.current = requestAnimationFrame(animate);
    };

    frameId.current = requestAnimationFrame(animate);

    return () => {
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [disabled]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetTilt.current = { x: y * maxTilt, y: x * -maxTilt };
  };

  const handleMouseLeave = () => {
    targetTilt.current = { x: 0, y: 0 };
  };

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        willChange: "transform",
      }}
      className={`relative ${className}`}
    >
      {children}
    </div>
  );
}

// --- Form Component ---
function ContactMeForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("sending");

    try {
      await fetch("https://formsubmit.co/ajax/clareangeliedolino@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `[Portfolio Inquiry] ${formData.name}`,
        }),
      });
    } catch {
      // Handled
    }

    soundEngine.playSuccessChime();
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  };

  if (status === "success") {
    return (
      <div className="bg-[color:var(--w-a)]/5 border border-[color:var(--w-a)]/30 rounded-2xl p-6 text-center my-4">
        <CheckCircle2 className="w-8 h-8 text-[color:var(--w-a)] mx-auto mb-2" />
        <h3 className="text-lg font-bold text-white mb-1">Transmission Transmitted</h3>
        <p className="text-xs text-gray-300">Thank you! Your message was sent directly to Clare's inbox.</p>
        <button onClick={() => setStatus("idle")} className="mt-4 px-4 py-2 rounded-full bg-white/10 text-xs font-mono text-[color:var(--w-a)]">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1">Your Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[color:var(--w-a)]"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1">Your Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@example.com"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[color:var(--w-a)]"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-mono text-gray-400 mb-1">Message *</label>
        <textarea
          rows={3}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Hi Clare, I came across your portfolio and would like to speak regarding an opportunity..."
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[color:var(--w-a)] resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[color:var(--w-a)] to-[color:var(--w-b)] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_15px_rgba(var(--w-a-rgb),0.3)] cursor-pointer disabled:opacity-50"
      >
        {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        <span>Send Message</span>
      </button>
    </form>
  );
}

// --- Sound Feedback Engine ---
class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private lastClickTime: number = 0;

  public unlock(): void {
    if (typeof window === "undefined") return;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // Audio not supported or blocked
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  playButtonClick() {
    if (!this.enabled) return;
    const nowMs = performance.now();
    if (nowMs - this.lastClickTime < 30) return;
    this.lastClickTime = nowMs;

    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Primary crisp tactile click transient
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.04);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Low thump body for tactile mechanical weight
      const bodyOsc = ctx.createOscillator();
      const bodyGain = ctx.createGain();

      bodyOsc.type = "triangle";
      bodyOsc.frequency.setValueAtTime(320, now);
      bodyOsc.frequency.exponentialRampToValueAtTime(110, now + 0.035);

      bodyGain.gain.setValueAtTime(0.0001, now);
      bodyGain.gain.linearRampToValueAtTime(0.12, now + 0.003);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      bodyOsc.connect(bodyGain);
      bodyGain.connect(ctx.destination);

      osc.start(now);
      bodyOsc.start(now);
      osc.stop(now + 0.055);
      bodyOsc.stop(now + 0.05);
    } catch {
      // Graceful fallback
    }
  }

  playNavClick() {
    if (!this.enabled) return;
    const nowMs = performance.now();
    if (nowMs - this.lastClickTime < 30) return;
    this.lastClickTime = nowMs;

    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(640, now);
      osc.frequency.exponentialRampToValueAtTime(1180, now + 0.06);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.075);
    } catch {
      // Graceful fallback
    }
  }

  playToggleClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      [750, 1100].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.025);

        gain.gain.setValueAtTime(0.0001, now + i * 0.025);
        gain.gain.linearRampToValueAtTime(0.12, now + i * 0.025 + 0.003);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.025 + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.025);
        osc.stop(now + i * 0.025 + 0.06);
      });
    } catch {
      // Graceful fallback
    }
  }

  playDismissClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(560, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.04);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Graceful fallback
    }
  }

  playSuccessChime() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      [587.33, 880, 1174.66].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + idx * 0.05;
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(0.14, t + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.11);
      });
    } catch {
      // Graceful fallback
    }
  }

  playNavHover() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(940, now + 0.035);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Graceful
    }
  }

  playCardHover() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.045);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Graceful
    }
  }
}

const soundEngine = new SoundEngine();

// --- HackerRank Brand Iconography ---
function HackerRankIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="HackerRank">
      <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm2.8 15.6h-2.1v-3.2H9.3v3.2H7.2V8.4h2.1v3.1h3.4V8.4h2.1v7.2z" />
    </svg>
  );
}

// --- HackerRank Verified Skill Certificate Modal ---
function HackerRankCertificateModal({
  onClose,
  theme = "deep-space",
}: {
  onClose: () => void;
  theme?: "deep-space" | "cyber-light";
}) {
  const isLight = theme === "cyber-light";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 16 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden ${
          isLight
            ? "bg-white border-slate-200 text-slate-900 shadow-2xl"
            : "bg-[#090D16] border-white/10 text-white shadow-[0_0_50px_rgba(0,234,100,0.18)]"
        }`}
      >
        {/* Top Modal Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-4 shrink-0 ${
          isLight ? "border-slate-200 bg-slate-50" : "border-white/10 bg-black/40"
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-[#00EA64]/15 border border-[#00EA64]/30 text-[#00EA64] shrink-0 shadow-[0_0_12px_rgba(0,234,100,0.25)]">
              <HackerRankIcon className="w-5 h-5 text-[#00EA64]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00EA64]/15 border border-[#00EA64]/30 text-[#00EA64] font-semibold uppercase tracking-wider">
                  Verified Skill Assessment
                </span>
                <span className="text-[10px] font-mono text-gray-400">
                  ID: fab4af630aab
                </span>
              </div>
              <h3 className={`text-base sm:text-lg font-bold font-mono tracking-tight mt-0.5 truncate ${
                isLight ? "text-slate-900" : "text-white"
              }`}>
                JavaScript (Intermediate) Certificate
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://www.hackerrank.com/certificates/iframe/fab4af630aab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 border border-white/20 text-xs font-mono font-medium transition-colors cursor-pointer"
              title="Open Direct HackerRank Certificate Iframe (fab4af630aab)"
            >
              <span>Iframe URL</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.hackerrank.com/certificates/fab4af630aab"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00EA64]/15 hover:bg-[#00EA64]/25 text-[#00EA64] border border-[#00EA64]/30 text-xs font-mono font-medium transition-colors cursor-pointer"
              title="Open Official Verification Page on HackerRank"
            >
              <span>Verify on HackerRank</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isLight
                  ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600"
                  : "bg-white/5 hover:bg-white/15 border-white/10 text-gray-300 hover:text-white"
              }`}
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Overview Bar */}
        <div className={`px-4 sm:px-6 py-2.5 border-b text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shrink-0 ${
          isLight ? "bg-slate-100/60 border-slate-200 text-slate-600" : "bg-white/[0.02] border-white/5 text-gray-300"
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Recipient:</span>
            <strong className={isLight ? "text-slate-900" : "text-white"}>Clare Angelie T. Dolino</strong>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <span>Core Competencies: Design Patterns · Memory Management · Concurrency Model · Event Loop</span>
          </div>
        </div>

        {/* Embedded Responsive Iframe */}
        <div className="flex-1 w-full min-h-[480px] sm:min-h-[580px] bg-slate-900 relative overflow-hidden">
          <iframe
            src="https://www.hackerrank.com/certificates/iframe/fab4af630aab"
            title="HackerRank Certificate - Clare Angelie T. Dolino"
            className="w-full h-full min-h-[480px] sm:min-h-[580px] border-0 bg-white"
          />
        </div>

        {/* Bottom Verification Footer */}
        <div className={`p-3 sm:p-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono shrink-0 ${
          isLight ? "border-slate-200 bg-slate-50 text-slate-600" : "border-white/10 bg-black/40 text-gray-400"
        }`}>
          <div className="flex items-center gap-2 text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-[#00EA64] shrink-0" />
            <span>Authenticated by HackerRank · Independent benchmark for software engineering proficiency</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <a
              href="https://www.hackerrank.com/certificates/fab4af630aab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00EA64] hover:underline flex items-center gap-1 text-[11px]"
            >
              <span>Direct Link: hackerrank.com/certificates/fab4af630aab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectDetailModal({ 
  project, 
  initialTab = "overview", 
  onClose 
}: { 
  project: ProjectItem; 
  initialTab?: "overview" | "milestones" | "stack" | "prd"; 
  onClose: () => void; 
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "milestones" | "stack" | "prd">(initialTab);
  const [isFullscreenPrd, setIsFullscreenPrd] = useState(false);

  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = orig; };
  }, []);

  // Escape key for fullscreen PRD reader
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreenPrd) {
        e.stopPropagation();
        setIsFullscreenPrd(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreenPrd]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[88vh] bg-[#090C15] border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-left"
        >
          
          {/* Modal Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-5 md:p-6 border-b border-white/10 bg-white/[0.02] shrink-0">
            <div className="space-y-1.5 min-w-0 w-full sm:w-auto">
              {/* Clean Badges */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-[color:var(--w-a)]/10 border border-[color:var(--w-a)]/30 text-[color:var(--w-a)] font-semibold uppercase">{project.type}</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 font-medium">{project.year}</span>
                <ComplexityMeter level={project.complexity.level} label={project.complexity.label} />
                <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-[#C084FC] font-semibold flex items-center gap-1">
                  <FileText className="w-3 h-3 text-[#C084FC]" />
                  <span>PRD Embedded</span>
                </span>
              </div>
              <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-tight break-words">{project.title}</h2>
              <div className="text-[11px] sm:text-xs font-mono text-[#C084FC] break-words leading-relaxed">{project.role} · {project.org}</div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[color:var(--w-a)] to-[color:var(--w-b)] text-black font-semibold text-xs font-mono uppercase shadow-md flex-1 sm:flex-initial">
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
              <button onClick={onClose} className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white cursor-pointer shrink-0 flex items-center gap-1.5" title="Close (Escape key)">
                <span className="hidden sm:inline text-[10px] font-mono text-gray-400">Esc</span>
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Modal Nav Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 pt-2.5 pb-2 border-b border-white/5 font-mono text-[11px] sm:text-xs overflow-x-auto no-scrollbar shrink-0">
            <button onClick={() => setActiveTab("overview")} className={`px-2.5 sm:px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${activeTab === "overview" ? "bg-[color:var(--w-a)]/15 text-[color:var(--w-a)] border border-[color:var(--w-a)]/30 font-semibold" : "text-gray-400 hover:text-white"}`}>
              01. Architecture & Impact
            </button>
            <button onClick={() => setActiveTab("milestones")} className={`px-2.5 sm:px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${activeTab === "milestones" ? "bg-[color:var(--w-a)]/15 text-[color:var(--w-a)] border border-[color:var(--w-a)]/30 font-semibold" : "text-gray-400 hover:text-white"}`}>
              02. SDLC Milestones ({project.milestones.length})
            </button>
            <button onClick={() => setActiveTab("stack")} className={`px-2.5 sm:px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${activeTab === "stack" ? "bg-[color:var(--w-a)]/15 text-[color:var(--w-a)] border border-[color:var(--w-a)]/30 font-semibold" : "text-gray-400 hover:text-white"}`}>
              03. Tech Stack Breakdown
            </button>
            <button 
              onClick={() => setActiveTab("prd")} 
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === "prd" ? "bg-[color:var(--w-a)]/15 text-[color:var(--w-a)] border border-[color:var(--w-a)]/30 font-semibold shadow-[0_0_12px_rgba(var(--w-a-rgb),0.2)]" : "text-gray-400 hover:text-white"}`}
            >
              <FileText className="w-3.5 h-3.5 text-[color:var(--w-a)]" />
              <span>04. Product Requirements Doc (PRD)</span>
              <span className="px-1.5 py-0.2 text-[9px] rounded bg-[color:var(--w-a)]/20 text-[color:var(--w-a)] font-bold uppercase tracking-wider">
                PDF Embed
              </span>
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6 text-left">
            {activeTab === "overview" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {project.keyMetrics.map((km, idx) => (
                    <div key={idx} className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-[10px] font-mono text-gray-400 uppercase">{km.label}</div>
                      <div className="text-base sm:text-xl font-bold font-mono text-[color:var(--w-a)] mt-0.5">{km.value}</div>
                      <div className="text-xs text-gray-300 font-light mt-0.5 leading-relaxed">{km.detail}</div>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[color:var(--w-a)] font-semibold">Executive Overview</h4>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light">{project.fullDesc.overview}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3.5 sm:p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/20 space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold">Operational Challenge</h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">{project.fullDesc.challenge}</p>
                  </div>
                  <div className="p-3.5 sm:p-5 rounded-2xl bg-[color:var(--w-a)]/[0.03] border border-[color:var(--w-a)]/20 space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[color:var(--w-a)] font-semibold">Engineered Solution</h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">{project.fullDesc.solution}</p>
                  </div>
                </div>

                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#C084FC] font-semibold">Key Individual Deliverables & Contributions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-gray-300 font-light leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[color:var(--w-a)] shrink-0 mt-0.5" />
                        <span className="break-words">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick PRD Jump Card */}
                {project.prd && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[color:var(--w-a)]/5 to-[color:var(--w-b)]/5 border border-[color:var(--w-a)]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-[color:var(--w-a)]/10 border border-[color:var(--w-a)]/30 text-[color:var(--w-a)] shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs sm:text-sm font-bold text-white font-mono">Official Product Requirements Document (PRD)</h5>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-mono">
                            Read-Only
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-300 font-light mt-0.5 leading-relaxed">
                          Authored by Clare Dolino · {project.prd.pages} Pages verified specification embedded directly in the app.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("prd")}
                      className="px-3.5 py-1.5 rounded-xl bg-[color:var(--w-a)]/15 hover:bg-[color:var(--w-a)]/25 text-[color:var(--w-a)] border border-[color:var(--w-a)]/30 text-xs font-mono font-medium transition-colors cursor-pointer shrink-0"
                    >
                      Open PRD Viewer →
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "milestones" && (
              <div className="space-y-3 sm:space-y-4">
                {project.milestones.map((m, idx) => (
                  <div key={idx} className="p-3.5 sm:p-5 rounded-xl bg-white/[0.025] border border-white/10 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-mono">
                      <span className="text-[color:var(--w-a)] font-semibold break-words">{m.phase}</span>
                      <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-gray-400 shrink-0">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{m.date}</span>
                        <span className="px-2 py-0.5 rounded bg-[color:var(--w-a)]/10 text-[color:var(--w-a)] border border-[color:var(--w-a)]/20 font-medium">{m.status}</span>
                      </div>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white break-words">{m.title}</h4>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">{m.summary}</p>
                    <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                      {m.deliverables.map((d, dIdx) => (
                        <span key={dIdx} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] sm:text-[11px] text-gray-300 font-mono break-words max-w-full">
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
                  <div key={cIdx} className="p-3.5 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                    <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">{cat.category}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-mono text-gray-200 break-words max-w-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 04: PRD DOCUMENT EMBED & SPECIFICATION OVERVIEW */}
            {activeTab === "prd" && project.prd && (
              <div className="space-y-4 sm:space-y-5">
                {/* Security Governance Notice Banner */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <div className="text-amber-300 font-mono font-semibold flex items-center gap-1.5">
                        <span>Protected Official Document · Read-Only Embed</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-200">
                          Non-Downloadable
                        </span>
                      </div>
                      <p className="text-gray-300 text-[11px] font-light leading-relaxed">
                        Per institutional governance and intellectual property policy, direct file downloading and local export are restricted. You can review, overview, and inspect the complete verified document directly in this viewport.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsFullscreenPrd(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors cursor-pointer shrink-0"
                    title="Open in Distraction-Free Fullscreen Reader"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[color:var(--w-a)]" />
                    <span>Expand Reader</span>
                  </button>
                </div>

                {/* PRD Executive Metadata Dossier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.025] border border-white/10 space-y-1">
                    <div className="text-[10px] font-mono text-gray-400 uppercase">Document Version</div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-[color:var(--w-a)] truncate">{project.prd.version}</div>
                    <div className="text-[10px] text-emerald-400 font-mono">● {project.prd.status}</div>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.025] border border-white/10 space-y-1">
                    <div className="text-[10px] font-mono text-gray-400 uppercase">Regulatory Benchmark</div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-white truncate" title={project.prd.standard}>
                      {project.prd.standard.split('&')[0]}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono truncate">{project.org}</div>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.025] border border-white/10 space-y-1">
                    <div className="text-[10px] font-mono text-gray-400 uppercase">Lead Engineer / Author</div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-[#C084FC]">Clare Angelie T. Dolino</div>
                    <div className="text-[10px] text-gray-400 font-mono truncate">{project.role}</div>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.025] border border-white/10 space-y-1">
                    <div className="text-[10px] font-mono text-gray-400 uppercase">Document Scale</div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-white">{project.prd.pages} Pages</div>
                    <div className="text-[10px] text-[color:var(--w-a)] font-mono">Full-Stack Specification</div>
                  </div>
                </div>

                {/* Embedded PDF Viewer Viewport */}
                <div 
                  className="rounded-2xl border border-white/15 bg-[#090C15] overflow-hidden shadow-2xl select-none"
                  onContextMenu={(e) => { e.preventDefault(); return false; }}
                  onDragStart={(e) => { e.preventDefault(); return false; }}
                >
                  {/* Viewport Top Header */}
                  <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 bg-black/60 border-b border-white/10 font-mono text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-[color:var(--w-a)] animate-pulse shrink-0"></span>
                      <span className="text-white font-medium truncate text-[11px] sm:text-xs">
                        {project.prd.fileName}
                      </span>
                      <span className="hidden md:inline text-gray-500 text-[10px]">
                        ({project.prd.pages} Pages · Verified Specification)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span>View-Only</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsFullscreenPrd(true)}
                        className="p-1 sm:px-2.5 sm:py-1 rounded-md bg-[color:var(--w-a)]/15 hover:bg-[color:var(--w-a)]/25 text-[color:var(--w-a)] text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-colors"
                        title="Expand Reader"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Fullscreen</span>
                      </button>
                    </div>
                  </div>

                  {/* Embedded Iframe Viewer */}
                  <div className="relative w-full h-[520px] sm:h-[620px] bg-slate-950 flex flex-col items-center justify-center">
                    <iframe
                      src={`${project.prd.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                      title={project.prd.documentTitle}
                      className="w-full h-full border-0 select-none bg-slate-900"
                      style={{ pointerEvents: "auto" }}
                      onContextMenu={(e) => { e.preventDefault(); return false; }}
                    />
                  </div>

                  {/* Viewport Footer Bar */}
                  <div className="px-4 py-2 bg-black/40 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] font-mono text-gray-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Authenticated PRD · Commissioned Specification</span>
                    </span>
                    <span className="text-gray-500">
                      Right-click & downloads disabled for confidentiality
                    </span>
                  </div>
                </div>

                {/* PRD Document Overview & Executive Specifications */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[color:var(--w-a)] font-semibold">
                      Document Executive Overview & Context
                    </h4>
                    <p className="text-xs text-gray-200 leading-relaxed font-light">
                      {project.prd.executiveSummary}
                    </p>
                  </div>

                  {/* Core System Objectives */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <h5 className="text-[11px] font-mono uppercase text-[#C084FC] font-semibold tracking-wider">
                      Core Functional & Strategic Objectives
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {project.prd.keyObjectives.map((obj, oIdx) => (
                        <div key={oIdx} className="flex items-start gap-2 text-gray-300 font-light leading-relaxed">
                          <Check className="w-3.5 h-3.5 text-[color:var(--w-a)] shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Specifications Matrix */}
                  <div className="space-y-2.5 pt-2 border-t border-white/5">
                    <h5 className="text-[11px] font-mono uppercase text-white font-semibold tracking-wider">
                      Technical Architecture & Requirements Matrix
                    </h5>
                    <div className="grid grid-cols-1 gap-2.5">
                      {project.prd.coreSpecifications.map((spec, sIdx) => (
                        <div key={sIdx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                          <div className="text-xs font-mono font-semibold text-[color:var(--w-a)]">
                            § {spec.section}
                          </div>
                          <ul className="space-y-1 text-[11px] text-gray-300 font-light">
                            {spec.details.map((d, dIdx) => (
                              <li key={dIdx} className="flex items-start gap-2">
                                <span className="text-gray-500 font-mono">›</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compliance & Sanitization Disclaimer */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-mono text-gray-400 space-y-1">
                    <div className="text-gray-300 font-semibold uppercase">Institutional Compliance & Data Privacy</div>
                    <p className="leading-relaxed">{project.prd.complianceNotes}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 sm:p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between shrink-0">
            {project.prd && (
              <div className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[color:var(--w-a)]" />
                <span className="hidden sm:inline">Official Document:</span>
                <span className="text-white truncate max-w-[180px] sm:max-w-xs">{project.prd.fileName}</span>
              </div>
            )}
            <button onClick={onClose} className="px-5 py-2 rounded-xl bg-white/5 text-xs font-mono text-gray-300 hover:text-white cursor-pointer flex items-center gap-2 ml-auto" title="Close (Escape key)">
              <span>Close</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-400 border border-white/10">Esc</kbd>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* FULLSCREEN PRD READER MODAL */}
      <AnimatePresence>
        {isFullscreenPrd && project.prd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex flex-col select-none"
            onContextMenu={(e) => { e.preventDefault(); return false; }}
          >
            {/* Top Reader Navigation Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#06080F]/90 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-1.5 rounded-lg bg-[color:var(--w-a)]/10 border border-[color:var(--w-a)]/30 text-[color:var(--w-a)]">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-white font-mono truncate">
                    {project.prd.documentTitle}
                  </h3>
                  <div className="text-[10px] font-mono text-gray-400 truncate">
                    {project.prd.version} · {project.prd.pages} Pages · Author: Clare Angelie T. Dolino
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300 text-[10px] font-mono">
                  <Lock className="w-3 h-3" />
                  <span>Downloads Disabled · View-Only</span>
                </div>
                <button
                  onClick={() => setIsFullscreenPrd(false)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Close Fullscreen (Esc)"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Minimize</span>
                  <span className="text-[10px] text-gray-400">Esc</span>
                </button>
              </div>
            </div>

            {/* Fullscreen Embedded Iframe */}
            <div className="flex-1 w-full h-full bg-slate-950 relative overflow-hidden">
              <iframe
                src={`${project.prd.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                title={project.prd.documentTitle}
                className="w-full h-full border-0 select-none"
                onContextMenu={(e) => { e.preventDefault(); return false; }}
              />
            </div>

            {/* Bottom Security Footer */}
            <div className="px-6 py-2 bg-[#06080F] border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400 shrink-0">
              <span>{project.org} · Technical Product Requirements Specification</span>
              <span>Protected Review Mode</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Global Cursor Click Highlight Overlay ---
function ClickHighlightOverlay() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Do not spawn or leave any highlight circle when clicking buttons or interactive elements
      if (target?.closest("button, a, input, select, textarea, .cursor-pointer, [role='button']")) {
        return;
      }
      const id = Date.now() + Math.random();
      const newRipple = { id, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-4), newRipple]);

      // Automatically unmount ripple from DOM after animation so nothing is ever left behind
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 420);
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{ left: r.x, top: r.y }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 bg-transparent pointer-events-none animate-click-ring"
        />
      ))}
    </div>
  );
}

// --- Section Transition Variants for Framer Motion ---
const sectionVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir >= 0 ? 24 : -24,
    scale: 0.985,
    filter: "blur(6px)",
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir >= 0 ? -18 : 18,
    scale: 0.985,
    filter: "blur(4px)",
    transition: {
      duration: 0.26,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// --- Main App Component ---
export default function App() {
  const [activeSection, setActiveSection] = useState<SectionType>("01 // Overture");
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<"overview" | "milestones" | "stack" | "prd">("overview");
  const [showHackerRankModal, setShowHackerRankModal] = useState(false);

  // --- Butterfly game state (persisted per browser) ---
  const [caught, setCaught] = useState<number>(() => {
    try { return Number(localStorage.getItem("portfolio_caught")) || 0; } catch { return 0; }
  });
  const [visited, setVisited] = useState<SectionType[]>(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("portfolio_visited") || "[]");
      return Array.isArray(raw) ? raw.filter((x: string): x is SectionType => (SECTIONS as readonly string[]).includes(x)) : [];
    } catch { return []; }
  });
  const [popups, setPopups] = useState<CatchPopup[]>([]);
  const [focus, setFocus] = useState<WorldFocus | null>(null);
  const [chrysalis, setChrysalis] = useState(false);
  const popupId = useRef(0);

  // Each section is its own world: publish its colours as CSS tokens (cross-faded by @property).
  useEffect(() => {
    const w = WORLDS[activeSection];
    const root = document.documentElement.style;
    root.setProperty("--w-a", w.a);
    root.setProperty("--w-b", w.b);
    root.setProperty("--w-c", w.c);
    root.setProperty("--w-bg", w.bg);
    root.setProperty("--w-a-rgb", hexToRgbString(w.a));
    root.setProperty("--w-b-rgb", hexToRgbString(w.b));
    root.setProperty("--w-c-rgb", hexToRgbString(w.c));
    setFocus(null);
    setVisited((prev) => {
      if (prev.includes(activeSection)) return prev;
      const next = [...prev, activeSection];
      try { localStorage.setItem("portfolio_visited", JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, [activeSection]);

  useEffect(() => {
    if (visited.length < SECTIONS.length) return;
    let seen = false;
    try { seen = localStorage.getItem("portfolio_chrysalis") === "1"; } catch { /* ignore */ }
    if (seen) return;
    try { localStorage.setItem("portfolio_chrysalis", "1"); } catch { /* ignore */ }
    setChrysalis(true);
  }, [visited]);

  useEffect(() => {
    if (!chrysalis) return;
    const t = setTimeout(() => setChrysalis(false), 4500);
    return () => clearTimeout(t);
  }, [chrysalis]);

  const handleCatch = React.useCallback((info: CatchInfo) => {
    soundEngine.unlock();
    soundEngine.playCardHover();
    setCaught((c) => {
      const n = c + 1;
      try { localStorage.setItem("portfolio_caught", String(n)); } catch { /* ignore */ }
      return n;
    });
    const id = ++popupId.current;
    setPopups((p) => [...p, { id, x: info.x, y: info.y - 10, color: info.colors[0] }]);
    setTimeout(() => setPopups((p) => p.filter((x) => x.id !== id)), 1100);
    try {
      confetti({
        particleCount: 26,
        spread: 75,
        startVelocity: 20,
        scalar: 0.7,
        gravity: 0.9,
        ticks: 70,
        origin: { x: info.x / window.innerWidth, y: info.y / window.innerHeight },
        colors: info.colors,
        disableForReducedMotion: true,
      });
    } catch { /* confetti is decoration only */ }
  }, []);

  const prevIndexRef = useRef<number>(0);
  const currIndex = SECTIONS.indexOf(activeSection);
  const navDirection = currIndex >= prevIndexRef.current ? 1 : -1;

  useEffect(() => {
    prevIndexRef.current = currIndex;
  }, [currIndex]);

  const [theme, setTheme] = useState<"deep-space" | "cyber-light">(() => {
    try {
      const saved = localStorage.getItem("portfolio_theme");
      if (saved === "deep-space" || saved === "cyber-light") return saved;
    } catch {
      // Fallback
    }
    return "deep-space";
  });

  const toggleTheme = React.useCallback(() => {
    soundEngine.playToggleClick();
    setTheme((prev) => {
      const next = prev === "deep-space" ? "cyber-light" : "deep-space";
      try { localStorage.setItem("portfolio_theme", next); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const isLight = theme === "cyber-light";

  useEffect(() => {
    document.body.style.backgroundColor = isLight ? "#F9FAFB" : "#06080F";
    document.documentElement.style.backgroundColor = isLight ? "#F9FAFB" : "#06080F";
  }, [isLight]);

  const currentIndex = SECTIONS.indexOf(activeSection);

  const handleNext = React.useCallback(() => {
    soundEngine.playNavClick();
    setActiveSection((curr) => {
      const idx = SECTIONS.indexOf(curr);
      return SECTIONS[(idx + 1) % SECTIONS.length];
    });
  }, []);

  const handlePrev = React.useCallback(() => {
    soundEngine.playNavClick();
    setActiveSection((curr) => {
      const idx = SECTIONS.indexOf(curr);
      return SECTIONS[(idx - 1 + SECTIONS.length) % SECTIONS.length];
    });
  }, []);

  useEffect(() => {
    setShowHeader(true);
    setIsScrolledPast(false);
  }, [activeSection]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;
    setIsScrolledPast(currentScrollY > 75);
  };

  const scrollToTop = () => {
    soundEngine.playNavHover();
    const activeSectionEl = document.querySelector(`section[data-section="${activeSection}"]`);
    if (activeSectionEl) activeSectionEl.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    soundEngine.enabled = soundEnabled;
  }, [soundEnabled]);

  // --- Universal Button Click Audio Feedback Listener ---
  useEffect(() => {
    const handleGlobalButtonPress = (e: MouseEvent | PointerEvent) => {
      if (!soundEnabled || !soundEngine.enabled) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const button = target.closest(
        "button, [role='button'], a[role='button'], input[type='button'], input[type='submit'], select"
      ) as HTMLElement | null;

      if (button) {
        soundEngine.unlock();

        // Categorize button type for tailored sound physics
        const isNav =
          button.closest("nav") ||
          button.closest("#fixed-section-heading") ||
          button.closest("#section-scroll-progress") ||
          button.getAttribute("data-sound") === "nav";

        const isTheme =
          button.textContent?.includes("Deep Space") ||
          button.textContent?.includes("Cyber-Light") ||
          button.getAttribute("data-sound") === "toggle";

        const isClose =
          button.querySelector("svg")?.classList.contains("lucide-x") ||
          button.textContent?.trim().toLowerCase() === "close";

        if (isTheme) {
          soundEngine.playToggleClick();
        } else if (isNav) {
          soundEngine.playNavClick();
        } else if (isClose) {
          soundEngine.playDismissClick();
        } else {
          soundEngine.playButtonClick();
        }
      }
    };

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!soundEnabled || !soundEngine.enabled) return;
      if (e.key === "Enter" || e.key === " ") {
        const target = e.target as HTMLElement | null;
        if (target?.closest("button, [role='button']")) {
          soundEngine.unlock();
          soundEngine.playButtonClick();
        }
      }
    };

    window.addEventListener("pointerdown", handleGlobalButtonPress, true);
    window.addEventListener("keydown", handleGlobalKeyDown, true);

    return () => {
      window.removeEventListener("pointerdown", handleGlobalButtonPress, true);
      window.removeEventListener("keydown", handleGlobalKeyDown, true);
    };
  }, [soundEnabled]);

  // --- Global Keyboard Shortcuts for Navigation, Theme & Accessibility ---
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      // Do not intercept if user is typing in form inputs, textareas, or selects
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Escape key closes modal if open
      if (e.key === "Escape") {
        if (showHackerRankModal) {
          e.preventDefault();
          soundEngine.playDismissClick();
          setShowHackerRankModal(false);
          return;
        }
        if (selectedProject) {
          e.preventDefault();
          soundEngine.playDismissClick();
          setSelectedProject(null);
          return;
        }
      }

      // If a modal is open, prevent background section navigation
      if (selectedProject || showHackerRankModal) return;

      // Section Navigation via Arrow Keys (Next: ArrowRight, ArrowDown; Prev: ArrowLeft, ArrowUp)
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        soundEngine.unlock();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        soundEngine.unlock();
        handlePrev();
      }
      // Theme Toggle shortcut ('t' or 'T')
      else if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        soundEngine.unlock();
        toggleTheme();
      }
      // Audio Mute/Unmute shortcut ('m' or 'M')
      else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        soundEngine.unlock();
        setSoundEnabled((prev) => {
          const next = !prev;
          soundEngine.enabled = next;
          if (next) soundEngine.playToggleClick();
          return next;
        });
      }
      // Jump directly to section via number keys (1 - 6)
      else if (["1", "2", "3", "4", "5", "6"].includes(e.key)) {
        const secIndex = parseInt(e.key, 10) - 1;
        if (secIndex >= 0 && secIndex < SECTIONS.length) {
          e.preventDefault();
          soundEngine.unlock();
          soundEngine.playNavClick();
          setActiveSection(SECTIONS[secIndex]);
        }
      }
      // Home and End keys for jumping to beginning or end
      else if (e.key === "Home") {
        e.preventDefault();
        soundEngine.unlock();
        soundEngine.playNavClick();
        setActiveSection(SECTIONS[0]);
      } else if (e.key === "End") {
        e.preventDefault();
        soundEngine.unlock();
        soundEngine.playNavClick();
        setActiveSection(SECTIONS[SECTIONS.length - 1]);
      }
    };

    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => window.removeEventListener("keydown", handleGlobalShortcuts);
  }, [selectedProject, handleNext, handlePrev, toggleTheme]);

  return (
    <div className={`w-screen h-screen relative font-sans overflow-hidden transition-colors duration-500 ${
      theme === "cyber-light" ? "cyber-light bg-[#F9FAFB] text-slate-900" : "bg-[#06080F] text-white"
    }`}>
      {/* Global Cursor Click Highlight Overlay */}
      <ClickHighlightOverlay />
      
      {/* Three.js Background */}
      <ButterflyWorld
        section={activeSection}
        theme={theme}
        focus={focus}
        projectIds={PROJECTS.map((p) => p.id)}
        interactive={!selectedProject && !showHackerRankModal}
        onCatch={handleCatch}
      />

      {/* Persistent Header - Fully Responsive for Mobile, iPad, Tablet & Desktop */}
      <header className={`absolute top-0 left-0 w-full h-16 sm:h-20 z-50 flex items-center justify-between px-3 sm:px-5 md:px-6 lg:px-8 xl:px-12 pointer-events-none transition-transform duration-500 max-w-full box-border ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="text-base sm:text-lg md:text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--w-a)] to-[color:var(--w-b)] font-mono pointer-events-auto shrink-0">
          C.DOLINO
        </div>

        {/* Mobile Section Nav Selector (visible on small mobile < md) */}
        <div className="flex md:hidden pointer-events-auto items-center gap-1.5 shrink min-w-0">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value as SectionType)}
            className="px-2.5 py-1 rounded-full bg-[#06080F]/90 border border-white/20 text-[color:var(--w-a)] font-mono text-[10px] sm:text-[11px] font-semibold uppercase focus:outline-none cursor-pointer shadow-md truncate max-w-[130px] sm:max-w-[180px]"
          >
            {SECTIONS.map((s) => (
              <option key={s} value={s} className="bg-[#090C15] text-white">
                {SECTION_METADATA[s]?.shortTitle || s.split("//")[1]?.trim() || s}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop & Tablet Navigation + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5 pointer-events-auto shrink-0 min-w-0">
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5 xl:gap-5 shrink min-w-0">
            {SECTIONS.map((s) => {
              const shortName = SECTION_METADATA[s]?.shortTitle || s.split("//")[1]?.trim() || s;
              const isActive = activeSection === s;
              return (
                <button
                  key={s}
                  onClick={() => setActiveSection(s)}
                  onMouseEnter={() => soundEngine.playNavHover()}
                  className={`text-[10px] lg:text-[11px] xl:text-xs tracking-wider xl:tracking-[0.16em] uppercase font-mono transition-all cursor-pointer whitespace-nowrap px-2 py-1 rounded-lg ${
                    isActive
                      ? isLight
                        ? 'text-cyan-700 font-bold bg-cyan-100 border border-cyan-300 shadow-sm'
                        : 'text-[color:var(--w-a)] font-bold bg-[color:var(--w-a)]/15 border border-[color:var(--w-a)]/35 shadow-[0_0_10px_rgba(var(--w-a-rgb),0.2)]'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={`Navigate to ${s}`}
                >
                  {/* On tablet / iPad (md to xl), show concise short title so it never overflows */}
                  <span className="xl:hidden">{shortName}</span>
                  {/* On full desktop / laptop (xl+), show full title like 01 // Overture */}
                  <span className="hidden xl:inline">{s}</span>
                </button>
              );
            })}
          </nav>

          {/* Sound / Interactive Audio Toggle Button - Fully responsive across mobile, iPad, tablet & desktop */}
          <button
            type="button"
            onClick={() => {
              const nextState = !soundEnabled;
              setSoundEnabled(nextState);
              soundEngine.enabled = nextState;
              if (nextState) {
                soundEngine.unlock();
                soundEngine.playToggleClick();
              }
            }}
            onMouseEnter={() => soundEngine.playNavHover()}
            title={soundEnabled ? "Mute interactive audio (Shortcut: 'M')" : "Enable interactive audio (Shortcut: 'M')"}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 md:px-3 py-1.5 rounded-full border font-mono text-[10px] uppercase cursor-pointer shrink-0 transition-all ${
              soundEnabled
                ? isLight
                  ? 'bg-cyan-50 hover:bg-cyan-100 border-cyan-300 text-cyan-800 shadow-sm'
                  : 'bg-[color:var(--w-a)]/10 hover:bg-[color:var(--w-a)]/20 border-[color:var(--w-a)]/30 text-[color:var(--w-a)] shadow-[0_0_10px_rgba(var(--w-a-rgb),0.2)]'
                : isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-500'
                : 'bg-white/[0.04] hover:bg-white/10 border-white/10 text-gray-400'
            }`}
          >
            {/* Animated Equalizer Waveform Bars (visible on sm+ when audio enabled) */}
            <div className="flex items-end gap-[2px] h-3 shrink-0">
              <div className={`w-[2px] rounded-full transition-all ${soundEnabled ? "bg-current animate-pulse h-3" : "bg-gray-500 h-1.5 opacity-30"}`} />
              <div className={`w-[2px] rounded-full transition-all ${soundEnabled ? "bg-current animate-pulse h-2 delay-75" : "bg-gray-500 h-1 opacity-30"}`} />
              <div className={`w-[2px] rounded-full transition-all ${soundEnabled ? "bg-current animate-pulse h-3.5 delay-150" : "bg-gray-500 h-2 opacity-30"}`} />
            </div>

            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 shrink-0" />
            )}
          </button>

          {/* Theme Toggle Button - Fits cleanly on all viewports without overflowing */}
          <button
            onClick={toggleTheme}
            onMouseEnter={() => soundEngine.playNavHover()}
            title="Toggle theme (Shortcut: 'T')"
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border font-mono text-[10px] uppercase cursor-pointer shrink-0 transition-all ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                : 'bg-white/[0.04] hover:bg-white/10 border-white/10 text-gray-300'
            }`}
          >
            {theme === "deep-space" ? <Moon className="w-3.5 h-3.5 text-[color:var(--w-a)]" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
            <span className="hidden xl:inline">{theme === "deep-space" ? "Deep Space" : "Cyber-Light"}</span>
          </button>
        </div>
      </header>

      {/* Main Sections with Framer Motion Entrance Animations */}
      <main id="main-content-container" className="absolute inset-0 z-10 flex items-center justify-center px-2 sm:px-6 overflow-hidden">
        <AnimatePresence mode="wait" custom={navDirection} initial={false}>
          {/* 01 // OVERTURE */}
          {activeSection === "01 // Overture" && (
            <motion.section
              key="01 // Overture"
              data-section="01 // Overture"
              custom={navDirection}
              variants={sectionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onScroll={handleScroll}
              className="absolute inset-0 w-full h-full pt-24 sm:pt-28 pb-28 sm:pb-36 px-3 sm:px-6 md:px-8 overflow-y-auto no-scrollbar flex flex-col pointer-events-auto"
            >
          <TiltWrapper className="my-auto" maxTilt={0.8}>
            <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
              {/* Role badge */}
              <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[color:var(--w-b)]/15 border border-[color:var(--w-b)]/30 text-[color:var(--w-a)] font-mono text-[9.5px] sm:text-xs uppercase tracking-[0.08em] sm:tracking-[0.12em] max-w-full shadow-sm">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[color:var(--w-a)] shrink-0" />
                <span className="whitespace-normal break-words text-center leading-snug">Technical Product Builder · Systems Thinker · Software Developer</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.18] sm:leading-[1.16] tracking-tight break-words px-2">
                I turn complex problems into<br className="hidden sm:inline" />{" "}
                <span className="iridescent-text inline-block">
                  practical digital solutions.
                </span>
              </h1>

              {/* Honor & Relocation Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto px-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-200 font-mono text-[11px] sm:text-xs">
                  <GraduationCap className="w-3.5 h-3.5 text-[color:var(--w-a)] shrink-0" />
                  <span>Magna Cum Laude (Rank 1, GWA 1.32)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-200 font-mono text-[11px] sm:text-xs">
                  <Award className="w-3.5 h-3.5 text-[color:var(--w-b)] shrink-0" />
                  <span>PIA Region 8 Proficiency Awardee</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playCardHover();
                    setShowHackerRankModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00EA64]/10 border border-[#00EA64]/30 text-[#00EA64] font-mono text-[11px] sm:text-xs hover:bg-[#00EA64]/20 transition-all cursor-pointer shadow-[0_0_12px_rgba(0,234,100,0.15)] group"
                  title="View HackerRank Certified JavaScript (Intermediate) Certificate"
                >
                  <HackerRankIcon className="w-3.5 h-3.5 text-[#00EA64] shrink-0" />
                  <span>HackerRank Certified (JS Intermediate)</span>
                  <ArrowUpRight className="w-3 h-3 text-[#00EA64] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <span className="inline-flex items-center justify-center text-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[color:var(--w-a)]/10 border border-[color:var(--w-a)]/30 text-[color:var(--w-a)] font-mono text-[10.5px] sm:text-xs font-semibold shadow-[0_0_12px_rgba(var(--w-a-rgb),0.15)] transition-all">
                  <Globe className="w-3.5 h-3.5 text-[color:var(--w-a)] shrink-0" />
                  <span className="tracking-tight sm:tracking-normal">Open for Relocation &amp; International Roles</span>
                </span>
              </div>

              {/* Bio Paragraph */}
              <p className="text-gray-300 text-xs sm:text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed sm:leading-loose px-2 sm:px-4">
                I'm Clare Angelie Dolino, a Magna Cum Laude Information Systems graduate who works across systems analysis, software development, product-oriented problem-solving, and AI-assisted development. I enjoy understanding how people and organizations work, identifying opportunities for improvement, and translating ideas into useful software solutions.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2">
                <button onClick={() => setActiveSection("04 // Tracklist")} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[color:var(--w-a)] to-[color:var(--w-b)] text-black font-semibold text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(var(--w-a-rgb),0.3)] cursor-pointer">
                  <span>Explore Projects & Case Studies</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button onClick={() => setActiveSection("02 // Backstage")} className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase text-gray-300 hover:text-white cursor-pointer">
                  <span>View Backstage & Skills</span>
                </button>
                <button onClick={() => setActiveSection("06 // Insights")} className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase text-gray-300 hover:text-[color:var(--w-a)] hover:border-[color:var(--w-a)]/40 cursor-pointer">
                  <span>Read Insights & Essays</span>
                </button>
              </div>
            </div>
          </TiltWrapper>
            </motion.section>
          )}

          {/* 02 // BACKSTAGE */}
          {activeSection === "02 // Backstage" && (
            <motion.section
              key="02 // Backstage"
              data-section="02 // Backstage"
              custom={navDirection}
              variants={sectionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onScroll={handleScroll}
              className="absolute inset-0 w-full h-full pt-24 sm:pt-28 pb-28 sm:pb-36 px-3 sm:px-6 md:px-8 overflow-y-auto no-scrollbar flex flex-col pointer-events-auto"
            >
          <TiltWrapper className="my-auto py-4" maxTilt={0.8}>
            <div className="w-full max-w-6xl mx-auto space-y-6">
              
              {/* Profile & Origin Story Header Card */}
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-3.5 sm:p-6 md:p-8 shadow-xl space-y-4 sm:space-y-6 max-w-full">
                
                {/* Header Row: Photo, Name, Honors & Contact Chips */}
                <div className="flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 items-start lg:items-center pb-4 sm:pb-6 border-b border-white/10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-6 w-full sm:w-auto">
                    <div className="w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden border-2 sm:border-4 border-[color:var(--w-b)]/70 ring-4 ring-[color:var(--w-a)]/30 shrink-0 shadow-2xl shadow-[color:var(--w-b)]/40 transition-transform duration-300 hover:scale-105">
                      <img src={clareProfile} alt="Clare Angelie T. Dolino" className="w-full h-full object-cover object-center" />
                    </div>
                    <div className="flex flex-col space-y-2 sm:space-y-1.5 text-left min-w-0 w-full">
                      {/* Name - Left-aligned */}
                      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight break-words text-left">
                        Clare Angelie T. Dolino
                      </h2>

                      {/* Professional Role - Left-aligned */}
                      <p className="text-[11px] sm:text-xs font-mono text-gray-300 text-left leading-relaxed">
                        Technical Product Builder · Systems Thinker · Software Developer
                      </p>

                      {/* Contact Info (Location, Email, Phone) - Left-aligned */}
                      <div className="flex flex-wrap items-center justify-start gap-1.5 sm:gap-3 text-[11px] sm:text-xs font-mono text-gray-400 pt-0.5 text-left">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[color:var(--w-a)] shrink-0" /> Biliran, Philippines (Relocation Ready)</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[color:var(--w-b)] shrink-0" /> clareangeliedolino@gmail.com</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[color:var(--w-a)] shrink-0" /> +63 964 963 3928</span>
                      </div>

                      {/* Honors & Relocation Badges - Well-fitted and wrapped on mobile */}
                      <div className="flex flex-wrap items-center justify-start gap-1.5 sm:gap-2.5 text-xs font-mono pt-2 sm:pt-2.5 max-w-full">
                        <span className="inline-flex items-center justify-center text-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[color:var(--w-a)]/15 border border-[color:var(--w-a)]/30 text-[color:var(--w-a)] font-semibold text-[10px] sm:text-xs shadow-sm transition-all hover:bg-[color:var(--w-a)]/20">
                          <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                          <span className="whitespace-normal sm:whitespace-nowrap leading-tight text-center">Magna Cum Laude (Rank 1, GWA 1.32)</span>
                        </span>
                        <span className="inline-flex items-center justify-center text-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[color:var(--w-b)]/15 border border-[color:var(--w-b)]/30 text-[#C084FC] font-semibold text-[10px] sm:text-xs shadow-sm transition-all hover:bg-[color:var(--w-b)]/20">
                          <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                          <span className="whitespace-normal sm:whitespace-nowrap leading-tight text-center">PIA R8 Proficiency Awardee</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            soundEngine.playCardHover();
                            setShowHackerRankModal(true);
                          }}
                          className="inline-flex items-center justify-center text-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#00EA64]/15 border border-[#00EA64]/30 text-[#00EA64] font-semibold text-[10px] sm:text-xs hover:bg-[#00EA64]/25 transition-all cursor-pointer shadow-[0_0_10px_rgba(0,234,100,0.15)] group"
                          title="View Verified HackerRank Certificate"
                        >
                          <HackerRankIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00EA64] shrink-0" />
                          <span className="whitespace-normal sm:whitespace-nowrap leading-tight text-center">HackerRank Certified (JS Intermediate)</span>
                          <ArrowUpRight className="w-2.5 h-2.5 text-[#00EA64] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                        </button>
                        <span className="inline-flex items-center justify-center text-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-[10px] sm:text-xs shadow-sm transition-all hover:bg-emerald-500/20">
                          <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                          <span className="whitespace-normal sm:whitespace-nowrap leading-tight text-center">Open for Relocation &amp; International Roles</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Education & Milestones Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 text-xs text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 transition-all"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[color:var(--w-a)] font-semibold uppercase text-[10px] sm:text-[11px]">
                      <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>Academic Excellence</span>
                    </div>
                    <div className="text-white font-bold text-xs sm:text-sm">BS in Information Systems</div>
                    <p className="text-gray-300 font-light text-[11px] sm:text-xs">Biliran Province State University (BiPSU)</p>
                    <p className="text-[color:var(--w-a)] font-mono text-[10px] sm:text-[11px]">Magna Cum Laude · Cohort Rank 1 (GWA 1.32)</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.08 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 transition-all"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[#C084FC] font-semibold uppercase text-[10px] sm:text-[11px]">
                      <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>Institutional Impact</span>
                    </div>
                    <div className="text-white font-bold text-xs sm:text-sm">Proficiency Awardee &amp; Lead Intern</div>
                    <p className="text-gray-300 font-light text-[11px] sm:text-xs">Philippine Information Agency (PIA Region VIII)</p>
                    <p className="text-gray-400 font-mono text-[10px] sm:text-[11px]">3 Production platforms delivered (Jan–Apr 2026)</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.16 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 transition-all"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[color:var(--w-a)] font-semibold uppercase text-[10px] sm:text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>Research &amp; Quality</span>
                    </div>
                    <div className="text-white font-bold text-xs sm:text-sm">Capstone Project Leader &amp; Author</div>
                    <p className="text-gray-300 font-light text-[11px] sm:text-xs">CDMIS — Centralized Document System</p>
                    <p className="text-[#C084FC] font-mono text-[10px] sm:text-[11px]">ISO/IEC 25010 Usability Rating: 4.85 / 5.00</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.24 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    onClick={() => {
                      soundEngine.playCardHover();
                      setShowHackerRankModal(true);
                    }}
                    className="p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00EA64]/50 transition-all space-y-1.5 cursor-pointer group shadow-sm hover:shadow-[0_0_20px_rgba(0,234,100,0.2)]"
                    title="Click to view verified HackerRank Certificate embed & details"
                  >
                    <div className="flex items-center justify-between font-mono text-[#00EA64] font-semibold uppercase text-[10px] sm:text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <HackerRankIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00EA64] shrink-0" />
                        <span>Verified Credential</span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500 group-hover:text-[#00EA64] transition-colors" />
                    </div>
                    <div className="text-white font-bold text-xs sm:text-sm group-hover:text-[#00EA64] transition-colors">JavaScript (Intermediate)</div>
                    <p className="text-gray-300 font-light text-[11px] sm:text-xs">HackerRank Certified Skill Assessment</p>
                    <p className="text-[#00EA64] font-mono text-[10px] sm:text-[11px] flex items-center gap-1">
                      <span>ID: fab4af630aab</span>
                      <span className="text-gray-500">·</span>
                      <span className="underline">View Embed ↗</span>
                    </p>
                  </motion.div>
                </div>

                {/* Subtle Animated Horizontal Line Separator */}
                <div className="relative w-full py-2 my-1 flex items-center justify-center overflow-hidden" aria-hidden="true">
                  <div className={`w-full h-[1px] bg-gradient-to-r from-transparent ${
                    theme === "cyber-light" ? "via-slate-300" : "via-white/15"
                  } to-transparent`} />
                  <motion.div
                    animate={{
                      x: ["-140%", "140%"],
                      opacity: [0, 0.85, 0.85, 0],
                    }}
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1,
                    }}
                    className="absolute top-1/2 -translate-y-1/2 w-56 sm:w-72 h-[1.5px] bg-gradient-to-r from-transparent via-[color:var(--w-a)] to-transparent shadow-[0_0_10px_rgba(var(--w-a-rgb),0.7)] pointer-events-none"
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[color:var(--w-a)]/30 border border-[color:var(--w-a)]/70 shadow-[0_0_6px_rgba(var(--w-a-rgb),0.5)]" />
                </div>

                {/* Narrative Summary & Core Principles */}
                <div className="pt-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl">
                    I lead the end-to-end systems analysis, problem ideation, requirements evaluation, and solution architecture—leveraging modern AI tooling as a high-velocity engineering accelerator to build, test, and deploy resilient full-stack digital solutions.
                  </p>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5 shrink-0 max-w-sm">
                    {["Systems Analysis", "BRD/BPD Authoring", "ISO/IEC 25010", "Full-Stack Dev", "AI Function Calling", "Agile Leadership", "Open for Relocation", "International Roles"].map((tag) => {
                      const isRelocation = tag.includes("Relocation");
                      return (
                        <span
                          key={tag}
                          className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-mono text-[9.5px] sm:text-[10px] inline-flex items-center gap-1 transition-all ${
                            isRelocation
                              ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold shadow-sm"
                              : "bg-white/[0.04] border border-white/10 text-gray-300"
                          }`}
                        >
                          {isRelocation && <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 shrink-0" />}
                          <span>{tag}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Subtle Animated Horizontal Rule between Profile Header and Skills Grid */}
              <div className="relative w-full max-w-full my-4 sm:my-6 flex items-center justify-center overflow-hidden px-1 sm:px-3 select-none" aria-hidden="true">
                {/* Left responsive glowing gradient line */}
                <div className={`relative flex-1 h-[1px] bg-gradient-to-r from-transparent ${
                  theme === "cyber-light" ? "to-slate-300" : "to-[color:var(--w-a)]/40"
                } overflow-hidden min-w-[20px]`}>
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[color:var(--w-a)] to-transparent pointer-events-none"
                  />
                </div>

                {/* Center Badge Pill: Centered text, auto-adjusting padding & font size, never overflows */}
                <div className={`mx-2 sm:mx-3 px-3 sm:px-4 py-1 rounded-full border flex items-center justify-center gap-1.5 sm:gap-2 shrink-0 max-w-[85vw] sm:max-w-none transition-all ${
                  theme === "cyber-light"
                    ? "bg-white border-slate-200 text-slate-700 shadow-sm"
                    : "bg-[#06080F]/90 border-white/10 text-gray-300 shadow-[0_0_15px_rgba(var(--w-a-rgb),0.12)]"
                }`}>
                  <div className="w-1.5 h-1.5 rotate-45 bg-[color:var(--w-a)] shadow-[0_0_6px_rgba(var(--w-a-rgb),0.8)] shrink-0" />
                  <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.14em] sm:tracking-[0.2em] font-semibold text-center whitespace-nowrap">
                    Core Technical Capabilities
                  </span>
                  <div className="w-1.5 h-1.5 rotate-45 bg-[color:var(--w-b)] shadow-[0_0_6px_rgba(var(--w-b-rgb),0.8)] shrink-0" />
                </div>

                {/* Right responsive glowing gradient line */}
                <div className={`relative flex-1 h-[1px] bg-gradient-to-l from-transparent ${
                  theme === "cyber-light" ? "to-slate-300" : "to-[color:var(--w-b)]/40"
                } overflow-hidden min-w-[20px]`}>
                  <motion.div
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[color:var(--w-b)] to-transparent pointer-events-none"
                  />
                </div>
              </div>

              {/* Skills Grid with Intersection Observer Entrance Animations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {Object.entries(SKILLS).map(([category, data], idx) => (
                  <SkillCategoryCard
                    key={category}
                    category={category}
                    data={data}
                    categoryIdx={idx}
                    isParentActive={activeSection === '02 // Backstage'}
                    onOpenCert={() => {
                      soundEngine.playCardHover();
                      setShowHackerRankModal(true);
                    }}
                    onSelectProject={(projectId) => {
                      const proj = PROJECTS.find((p) => p.id === projectId);
                      if (proj) {
                        soundEngine.playCardHover();
                        setModalInitialTab("overview");
                        setSelectedProject(proj);
                      }
                    }}
                  />
                ))}
              </div>

              {/* Systems Engineering Provenance & Impact Dossier */}
              <EngineeringImpactDossier
                theme={theme}
                onSelectProject={(projectId) => {
                  const proj = PROJECTS.find((p) => p.id === projectId);
                  if (proj) {
                    soundEngine.playCardHover();
                    setModalInitialTab("overview");
                    setSelectedProject(proj);
                  }
                }}
              />
            </div>
          </TiltWrapper>
            </motion.section>
          )}

          {/* 03 // APPROACH - Dedicated Problem-Solving Framework Section */}
          {activeSection === "03 // Approach" && (
            <motion.section
              key="03 // Approach"
              data-section="03 // Approach"
              custom={navDirection}
              variants={sectionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onScroll={handleScroll}
              className="absolute inset-0 w-full h-full pt-24 sm:pt-28 pb-28 sm:pb-36 px-3 sm:px-6 md:px-8 overflow-y-auto no-scrollbar flex flex-col pointer-events-auto"
            >
              <div className="my-auto py-2">
                <ApproachSection
                  theme={theme}
                  onSelectProject={(projectId) => {
                    const proj = PROJECTS.find((p) => p.id === projectId);
                    if (proj) {
                      soundEngine.playCardHover();
                      setModalInitialTab("overview");
                      setSelectedProject(proj);
                    }
                  }}
                  onExploreCaseStudies={() => {
                    soundEngine.playNavClick();
                    setActiveSection("04 // Tracklist");
                  }}
                />
              </div>
            </motion.section>
          )}

          {/* 04 // TRACKLIST */}
          {activeSection === "04 // Tracklist" && (
            <motion.section
              key="04 // Tracklist"
              data-section="04 // Tracklist"
              custom={navDirection}
              variants={sectionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onScroll={handleScroll}
              className="absolute inset-0 w-full h-full pt-24 sm:pt-28 pb-28 sm:pb-36 px-3 sm:px-6 md:px-8 overflow-y-auto no-scrollbar flex flex-col pointer-events-auto"
            >
          <div className="w-full max-w-5xl mx-auto my-auto space-y-5 sm:space-y-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-1">
                The Discography
              </h2>
              <p className="text-[color:var(--w-a)] font-mono text-xs tracking-[0.15em] uppercase">
                Featured Case Studies & Production Releases
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-6 w-full items-start pb-6">
              {PROJECTS.map((project, pi) => {
                const pal = PROJECT_PALETTES[project.id] ?? PROJECT_PALETTES[1];
                // The project's butterfly perches at the card's top-right corner while it is hovered or focused.
                const aim = (e: React.SyntheticEvent<HTMLElement>) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  setFocus({
                    id: project.id,
                    x: ((r.right - 44) / window.innerWidth) * 2 - 1,
                    y: -(((r.top - 10) / window.innerHeight) * 2 - 1),
                  });
                };
                const open = () => {
                  setModalInitialTab("overview");
                  setSelectedProject(project);
                };
                return (
                <TiltWrapper key={project.id} className={`flex flex-col ${pi % 2 === 1 ? "sm:mt-12" : ""}`}>
                  <div 
                    role="button"
                    tabIndex={0}
                    onClick={open}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        open();
                      }
                    }}
                    onMouseEnter={aim}
                    onFocus={aim}
                    onMouseLeave={() => setFocus(null)}
                    onBlur={() => setFocus(null)}
                    className="group glow-border film-card bg-white/[0.03] backdrop-blur-lg rounded-xl p-4 sm:p-5.5 cursor-pointer flex flex-col justify-between min-h-[220px] w-full text-left space-y-3"
                  >
                    <div className="space-y-2.5">
                      {/* Unboxed Header Metadata */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs font-mono">
                        <div className="flex flex-wrap items-center gap-1.5 text-[color:var(--w-a)] font-medium min-w-0">
                          <span className={`inline-flex items-center gap-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${isLight ? "text-slate-800 border-slate-300 bg-white/85" : "text-white border-white/20 bg-black/30"} px-2 py-0.5 rounded-full border shrink-0`}>
                            <ButterflyGlyph colors={pal} size={16} />
                            <span>LV {pi + 1}</span>
                          </span>
                          <span className="uppercase text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded bg-[color:var(--w-a)]/10 border border-[color:var(--w-a)]/25 shrink-0">
                            {project.type}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-mono text-gray-300 px-2 py-0.5 rounded bg-white/5 border border-white/10 shrink-0">
                            {project.year}
                          </span>
                          {project.prd && (
                            <span className="text-[10px] sm:text-[11px] font-mono text-purple-300 px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/25 shrink-0 flex items-center gap-1">
                              <FileText className="w-2.5 h-2.5 text-purple-400" />
                              <span>PRD</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-[color:var(--w-a)] font-mono font-semibold shrink-0 ml-auto group-hover:underline">
                          Inspect Details →
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug break-words group-hover:text-[color:var(--w-a)] transition-colors">
                        {project.title}
                      </h3>
                      
                      <div className="space-y-0.5 text-[11px] sm:text-xs font-mono">
                        <div className="text-[#C084FC] font-medium leading-snug break-words">{project.role}</div>
                        <div className="text-gray-400 text-[10px] sm:text-[11px] break-words">{project.org}</div>
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[color:var(--w-a)]/10 border border-[color:var(--w-a)]/25 text-[color:var(--w-a)] font-mono text-[10px] sm:text-[11px] w-full min-w-0 overflow-hidden">
                        <Flame className="w-3.5 h-3.5 text-[color:var(--w-a)] shrink-0" />
                        <span className="truncate min-w-0 flex-1">{project.metric}</span>
                      </div>

                      <p className="text-gray-300 text-xs leading-relaxed font-light break-words">{project.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[color:var(--w-a)] font-semibold flex items-center gap-1 text-[11px] sm:text-xs shrink-0">
                          <span>Case Study</span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                        </span>
                        {project.prd && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalInitialTab("prd");
                              setSelectedProject(project);
                            }}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[color:var(--w-a)]/10 hover:bg-[color:var(--w-a)]/25 text-[color:var(--w-a)] border border-[color:var(--w-a)]/30 text-[10px] font-mono font-medium transition-colors cursor-pointer"
                            title="Open Official PRD Document (Embed, Read-Only)"
                          >
                            <FileText className="w-3 h-3 shrink-0" />
                            <span>PRD Embed</span>
                            <Lock className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                          </button>
                        )}
                      </div>
                      <ComplexityMeter level={project.complexity.level} label={project.complexity.label} />
                    </div>
                  </div>
                </TiltWrapper>
                );
              })}
            </div>
          </div>
            </motion.section>
          )}

          {/* 05 // ENCORE */}
          {activeSection === "05 // Encore" && (
            <motion.section
              key="05 // Encore"
              data-section="05 // Encore"
              custom={navDirection}
              variants={sectionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onScroll={handleScroll}
              className="absolute inset-0 w-full h-full pt-24 sm:pt-28 pb-28 sm:pb-36 px-3 sm:px-6 md:px-8 overflow-y-auto no-scrollbar flex flex-col pointer-events-auto"
            >
          <TiltWrapper className="my-auto py-4" maxTilt={0.8}>
            <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl max-w-3xl w-full mx-auto text-center space-y-6">
              <div>
                <p className="text-[color:var(--w-a)] font-mono text-xs tracking-[0.2em] uppercase mb-2">Final Track // Contact</p>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2">Have a problem worth solving? Let's talk.</h2>
                <p className="text-gray-300 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
                  I'm interested in opportunities where analytical thinking, technology, and thoughtful execution come together to create useful products and better systems.
                </p>
              </div>

              {/* Direct Info Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-gray-300">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[color:var(--w-a)] shrink-0" /> clareangeliedolino@gmail.com</span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[color:var(--w-b)] shrink-0" /> +63 964 963 3928</span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[color:var(--w-a)] shrink-0" /> Biliran, Philippines</span>
                <span className="hidden sm:inline">·</span>
                <span className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-1.5 px-2.5 py-1 sm:py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px]">
                  <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Open for Relocation &amp; International Roles
                </span>
              </div>

              <ContactMeForm />

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-gray-400 text-center sm:text-left">
                  <Sparkles className="w-3.5 h-3.5 text-[color:var(--w-a)] shrink-0" />
                  <span className="text-center sm:text-left">Available for Full-Stack, Systems Analysis &amp; AI Engineering · Open for Relocation &amp; Worldwide Remote</span>
                </div>

                <div className="flex items-center gap-3">
                  <a 
                    href="https://github.com/claredolino-sys" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[color:var(--w-a)]/50 text-gray-400 hover:text-white transition-colors"
                    title="GitHub Profile (claredolino-sys)"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/clare-angelie-taringting-dolino-4180823a3" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[color:var(--w-b)]/50 text-gray-400 hover:text-white transition-colors"
                    title="LinkedIn Profile"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playCardHover();
                      setShowHackerRankModal(true);
                    }}
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#00EA64]/50 text-gray-400 hover:text-[#00EA64] transition-all cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(0,234,100,0.25)]"
                    title="View HackerRank Certified JavaScript (Intermediate) Certificate Embed"
                    aria-label="HackerRank Certificate"
                  >
                    <HackerRankIcon className="w-4 h-4 text-[#00EA64]" />
                  </button>
                </div>
              </div>
            </div>
          </TiltWrapper>
            </motion.section>
          )}

          {/* 06 // INSIGHTS */}
          {activeSection === "06 // Insights" && (
            <motion.section
              key="06 // Insights"
              data-section="06 // Insights"
              custom={navDirection}
              variants={sectionVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onScroll={handleScroll}
              className="absolute inset-0 w-full h-full pt-24 sm:pt-28 pb-28 sm:pb-36 px-3 sm:px-6 md:px-8 overflow-y-auto no-scrollbar flex flex-col pointer-events-auto"
            >
              <TiltWrapper className="my-auto py-4" maxTilt={0.6}>
                <InsightsSection theme={theme} onPlaySound={() => soundEngine.playButtonClick()} />
              </TiltWrapper>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Game HUD: world title card, world map, catch counter */}
      <WorldHud
        section={activeSection}
        sections={SECTIONS}
        onSelect={(sec) => { soundEngine.playNavClick(); setActiveSection(sec); }}
        caught={caught}
        visited={visited}
        popups={popups}
        showHint={caught === 0 && !selectedProject}
        chrysalis={chrysalis}
        isLight={isLight}
      />

      {/* Persistent Footer Equalizer Dock */}
      <footer className="fixed bottom-0 left-0 w-full h-16 sm:h-20 z-50 flex items-center justify-between px-3 sm:px-8 md:px-16 pointer-events-none bg-gradient-to-t from-[color:var(--w-bg)] via-[color:var(--w-bg)]/90 to-transparent">
        
        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center justify-between w-full pointer-events-auto px-1">
          <button onClick={handlePrev} className="px-3 py-1.5 bg-[#06080F]/90 border border-white/20 rounded-full text-xs font-mono text-[color:var(--w-a)] active:scale-95 cursor-pointer">
            ← Prev
          </button>
          <span className="text-[10px] font-mono text-gray-300 uppercase">
            {SECTION_METADATA[activeSection]?.shortTitle} ({currentIndex + 1}/{SECTIONS.length})
          </span>
          <button onClick={handleNext} className="px-3 py-1.5 bg-[#06080F]/90 border border-white/20 rounded-full text-xs font-mono text-[color:var(--w-a)] active:scale-95 cursor-pointer">
            Next →
          </button>
        </div>

        {/* Desktop Controls - Hidden on laptop, tablet, and iPad */}
        <div className="hidden items-center gap-3 text-gray-500 font-mono text-xs uppercase pointer-events-auto">
          <button 
            onClick={handlePrev} 
            className="px-2.5 py-1 border border-gray-700/80 rounded text-[10px] hover:text-[color:var(--w-a)] hover:border-[color:var(--w-a)]/50 transition-colors flex items-center gap-1 cursor-pointer" 
            title="Previous Section (Shortcut: ← or ↑)"
          >
            <kbd className="text-[9px] font-mono text-gray-400">←</kbd>
            <span>Prev</span>
          </button>
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <span>Navigate</span>
          </span>
          <button 
            onClick={handleNext} 
            className="px-2.5 py-1 border border-gray-700/80 rounded text-[10px] hover:text-[color:var(--w-a)] hover:border-[color:var(--w-a)]/50 transition-colors flex items-center gap-1 cursor-pointer" 
            title="Next Section (Shortcut: → or ↓)"
          >
            <span>Next</span>
            <kbd className="text-[9px] font-mono text-gray-400">→</kbd>
          </button>
        </div>

        {/* Footer audio dock moved to header - kept hidden for DOM preservation */}
        <div className="hidden items-center gap-3 bg-[#06080F]/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 shadow-lg pointer-events-auto">
          <div className="flex items-end gap-[3px] h-4">
            <div className={`eq-bar eq-1 ${!soundEnabled ? "!animate-none !h-1 opacity-30" : ""}`} />
            <div className={`eq-bar eq-2 ${!soundEnabled ? "!animate-none !h-1 opacity-30" : ""}`} />
            <div className={`eq-bar eq-3 ${!soundEnabled ? "!animate-none !h-1 opacity-30" : ""}`} />
            <div className={`eq-bar eq-4 ${!soundEnabled ? "!animate-none !h-1 opacity-30" : ""}`} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[9px] text-[color:var(--w-a)] font-mono leading-tight">Now Playing</span>
            <span className="text-xs font-bold text-white">CLARE.DEV</span>
          </div>
          <button
            onClick={() => {
              const nextState = !soundEnabled;
              setSoundEnabled(nextState);
              soundEngine.enabled = nextState;
              if (nextState) {
                soundEngine.unlock();
                soundEngine.playToggleClick();
              }
            }}
            className="ml-1 p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
            title={soundEnabled ? "Mute audio (Shortcut: 'M')" : "Enable audio (Shortcut: 'M')"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[color:var(--w-a)]" /> : <VolumeX className="w-3.5 h-3.5 text-gray-500" />}
          </button>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            initialTab={modalInitialTab} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
        {showHackerRankModal && (
          <HackerRankCertificateModal
            theme={theme}
            onClose={() => setShowHackerRankModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
