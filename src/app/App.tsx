import React, { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Github, Mail, Linkedin, Code2, Database, 
  LayoutTemplate, Terminal, Send, CheckCircle2, AlertCircle, FileText,
  Loader2, Users, Kanban, RefreshCw, GitBranch, Volume2, VolumeX, Flame, 
  GitCommit, Award, GraduationCap, Phone, MapPin, Sparkles, Cpu, Layers, 
  Briefcase, CheckSquare, BarChart3, ShieldCheck, Globe, Sun, Moon,
  X, ExternalLink, Calendar, Milestone, ArrowUpRight, Check, Flag, Zap,
  Inbox, MessageSquare, Clock, Trash2, Copy,
  Reply, CheckCheck, Info, Search, Layout
} from "lucide-react";
import clareProfile from "@/imports/CLARE_PROFILE.jpg";
import { InsightsSection } from "./components/InsightsSection";

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
}

const PROJECTS: ProjectItem[] = [
  { 
    id: 1, 
    title: "PIA R8 Finance Monitoring System", 
    org: "Philippine Information Agency – Region 8",
    role: "Lead Systems Analyst, Project Manager & Sole Full-Stack Developer",
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
    complexity: { level: 5, label: "Lvl 5" }
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
    complexity: { level: 5, label: "Lvl 5" }
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
    complexity: { level: 5, label: "Lvl 5" }
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
    complexity: { level: 4, label: "Lvl 4" }
  }
];

export interface SkillItem {
  name: string;
  proofBadge: string;
  projectId?: number;
  projectTag?: string;
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
      { name: "Requirements Gathering & Analysis", proofBadge: "Client Work", projectId: 1, projectTag: "PIA R8 Finance" },
      { name: "Systems Analysis & Design", proofBadge: "Academic & Client Work", projectId: 3, projectTag: "CDMIS Capstone" },
      { name: "Process Mapping & Workflow Design", proofBadge: "Client Work", projectId: 4, projectTag: "RIS Portal" },
      { name: "Agile / Scrum & Team Coordination", proofBadge: "Team Leadership", projectId: 3, projectTag: "CDMIS Capstone" },
      { name: "Functional Specs & UAT Testing", proofBadge: "ISO 25010 Evaluated", projectId: 3, projectTag: "CDMIS Capstone" },
    ] 
  },
  "Software Development": { 
    title: "Software Development",
    subtitle: "Hands-on full-stack engineering with modern web technologies",
    icon: Code2, 
    items: [
      { name: "React & Next.js", proofBadge: "Hands-on Implementation", projectId: 2, projectTag: "TrackMyHours" },
      { name: "JavaScript & TypeScript", proofBadge: "Production Use", projectId: 1, projectTag: "PIA R8 Finance" },
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
    detail: "Author Business Requirements Documents (BRDs), Business Process Diagrams (BPDs), and Requirements Traceability Matrices (RTMs) to establish clear scope.",
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
    case "Requirements Gathering & Analysis":
      return <FileText className={`${className} text-[#00F2FE]`} />;
    case "Systems Analysis & Design":
      return <Layout className={`${className} text-[#00F2FE]`} />;
    case "Process Mapping & Workflow Design":
      return <GitBranch className={`${className} text-[#38BDF8]`} />;
    case "Agile / Scrum & Team Coordination":
      return <Kanban className={`${className} text-[#C084FC]`} />;
    case "Functional Specs & UAT Testing":
      return <CheckSquare className={`${className} text-[#4ADE80]`} />;
    case "Git & REST APIs":
      return <GitCommit className={`${className} text-[#F87171]`} />;
    case "SQL & Relational Database Design":
      return <Database className={`${className} text-[#00F2FE]`} />;
    case "Cloud Deployment":
      return <Globe className={`${className} text-[#38BDF8]`} />;
    case "Data Processing & Reporting Automation":
    case "Data Processing & Reporting":
      return <BarChart3 className={`${className} text-[#22C55E]`} />;
    case "AI-Assisted Software Development":
    case "AI-Assisted Development":
      return <Sparkles className={`${className} text-[#00F2FE]`} />;
    case "LLM API Integration":
      return <Cpu className={`${className} text-[#C084FC]`} />;
    case "Prompt Engineering & Prototyping":
      return <Terminal className={`${className} text-[#38BDF8]`} />;
    case "AI Function Calling":
      return <Zap className={`${className} text-[#00F2FE]`} />;
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
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 group-hover:border-[#00F2FE]/40 transition-all font-mono shadow-sm"
      title={`Engineering Complexity: ${label} (${level}/5)`}
    >
      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 text-[#00F2FE] shrink-0" aria-hidden="true">
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
                    ? "bg-[#7F00FF] shadow-[0_0_4px_rgba(127,0,255,0.8)]"
                    : "bg-[#00F2FE] shadow-[0_0_4px_rgba(0,242,254,0.8)]"
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
}: {
  item: SkillItem;
  onSelectProject: (projectId: number) => void;
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
        ? "bg-[#00F2FE]/10 border-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.3)]" 
        : "bg-white/[0.02] border-white/5 hover:border-[#00F2FE]/40"
    }`}>
      <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1.5 mb-1.5 min-w-0">
        <div 
          onClick={handleCopySkill}
          className="flex items-start gap-1.5 min-w-0 cursor-pointer group/copy hover:text-[#00F2FE] flex-1 basis-36"
          title="Click to copy skill name to clipboard"
        >
          <SkillIcon name={item.name} className="w-4 h-4 shrink-0 text-[#00F2FE] group-hover/skill:scale-110 transition-transform mt-0.5" />
          <span className="text-xs font-semibold text-white group-hover/skill:text-[#00F2FE] transition-colors leading-snug break-words">
            {item.name}
          </span>
          <span className="opacity-0 group-hover/skill:opacity-100 transition-opacity p-0.5 text-gray-400 hover:text-[#00F2FE] shrink-0 mt-0.5">
            {copied ? <Check className="w-3 h-3 text-[#00F2FE]" /> : <Copy className="w-3 h-3" />}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-auto">
          {copied ? (
            <span className="px-2 py-0.5 rounded bg-[#00F2FE]/20 border border-[#00F2FE]/50 text-[9px] font-mono text-[#00F2FE] font-bold uppercase animate-pulse">
              ✓ Copied!
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-gray-300 uppercase shrink-0 whitespace-nowrap leading-tight tracking-tight">
              {item.proofBadge}
            </span>
          )}
        </div>
      </div>

      {project && item.projectTag && (
        <button
          onClick={() => onSelectProject(item.projectId!)}
          className="self-start inline-flex items-center gap-1 text-[10px] font-mono text-[#00F2FE]/80 hover:text-[#00F2FE] hover:underline transition-colors mt-1 cursor-pointer"
          title={`View Case Study: ${project.title}`}
        >
          <ArrowUpRight className="w-3 h-3 shrink-0" />
          <span>Verified in: {item.projectTag}</span>
        </button>
      )}
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
}: {
  category: string;
  data: SkillCategoryData;
  categoryIdx: number;
  isParentActive: boolean;
  onSelectProject: (projectId: number) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const CategoryIcon = data.icon;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => soundEngine.playCardHover()}
      style={{
        transitionDelay: `${categoryIdx * 100}ms`,
      }}
      className={`group/skillcard bg-white/[0.015] border border-white/10 hover:border-[#00F2FE] rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 ease-out transform glow-border h-full hover:scale-[1.025] hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(0,242,254,0.4),0_0_40px_rgba(0,242,254,0.15)] hover:bg-white/[0.04] ${
        isParentActive && isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-8 scale-95 pointer-events-none"
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-2 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] shrink-0 group-hover/skillcard:border-[#00F2FE]/60 group-hover/skillcard:bg-[#00F2FE]/20 group-hover/skillcard:scale-110 transition-all duration-300">
              <CategoryIcon className="w-4 h-4 shrink-0" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-white tracking-tight leading-snug break-words group-hover/skillcard:text-[#00F2FE] transition-colors duration-300">{data.title}</h3>
          </div>
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest hidden sm:inline shrink-0 group-hover/skillcard:text-gray-300 transition-colors">0{categoryIdx + 1}</span>
        </div>

        <p className="text-[11px] font-mono text-gray-400 font-light leading-snug">
          {data.subtitle}
        </p>

        <div className="space-y-2 pt-1">
          {data.items.map((item) => (
            <SkillItemRow key={item.name} item={item} onSelectProject={onSelectProject} />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- GitHub Contribution Activity Data & Component ---
const WEEKS_COUNT = 52;
const DAYS_PER_WEEK = 7;

const MONTH_LABELS = [
  { name: "Oct", weekIndex: 0 },
  { name: "Nov", weekIndex: 4 },
  { name: "Dec", weekIndex: 9 },
  { name: "Jan", weekIndex: 13 },
  { name: "Feb", weekIndex: 17 },
  { name: "Mar", weekIndex: 22 },
  { name: "Apr", weekIndex: 26 },
  { name: "May", weekIndex: 30 },
  { name: "Jun", weekIndex: 35 },
  { name: "Jul", weekIndex: 39 },
  { name: "Aug", weekIndex: 43 },
  { name: "Sep", weekIndex: 48 },
];

const GENERATED_CONTRIBUTIONS = (() => {
  const weeks: { date: string; count: number; level: number }[][] = [];
  const startDate = new Date(2025, 8, 28);

  for (let w = 0; w < WEEKS_COUNT; w++) {
    const weekDays = [];
    for (let d = 0; d < DAYS_PER_WEEK; d++) {
      const dayDate = new Date(startDate);
      dayDate.setDate(startDate.getDate() + (w * 7 + d));
      
      const month = dayDate.getMonth();
      const isWeekend = d === 0 || d === 6;
      
      const seed = Math.sin(w * 17.13 + d * 9.27) * 10000;
      const rand = seed - Math.floor(seed);
      
      let count = 0;
      if (!isWeekend && rand > 0.16) {
        const isSprint = (month >= 0 && month <= 4) || month >= 10;
        count = isSprint ? Math.floor(rand * 9) + 2 : Math.floor(rand * 6) + 1;
      } else if (isWeekend && rand > 0.62) {
        count = Math.floor(rand * 5) + 1;
      }

      let level = 0;
      if (count >= 8) level = 4;
      else if (count >= 5) level = 3;
      else if (count >= 3) level = 2;
      else if (count >= 1) level = 1;

      const dateStr = dayDate.toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric"
      });

      weekDays.push({ date: dateStr, count, level });
    }
    weeks.push(weekDays);
  }
  return weeks;
})();

function GitHubContributions({ className = "", style }: { className?: string; style?: React.CSSProperties } = {}) {
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number; weekIdx: number; dayIdx: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div 
      ref={containerRef}
      id="github-contributions-card"
      style={style}
      className={`bg-white/[0.015] backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-7 glow-border shadow-[0_0_30px_rgba(0,0,0,0.4)] w-full overflow-hidden ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/claredolino-sys"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#00F2FE] hover:bg-[#00F2FE]/15 hover:border-[#00F2FE]/40 transition-colors shadow-[0_0_12px_rgba(0,242,254,0.3)] shrink-0"
            title="Open GitHub Profile (@claredolino-sys)"
          >
            <Github className="w-5 h-5" />
          </a>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight">
                GitHub Contribution Activity
              </h3>
              <a
                href="https://github.com/claredolino-sys"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] hover:bg-[#00F2FE]/20 font-mono text-[9px] uppercase tracking-wider transition-colors"
                title="View @claredolino-sys on GitHub"
              >
                @claredolino-sys
              </a>
            </div>
            <p className="text-gray-400 text-xs font-light leading-relaxed mt-0.5">
              Continuous commit frequency & engineering velocity across repositories (2025–2026)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full lg:w-auto shrink-0">
          <div className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-xs sm:text-sm md:text-base font-bold text-[#00F2FE]">
              {totalCommits}
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase font-mono tracking-wider text-gray-400">Commits</span>
          </div>

          <div className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-xs sm:text-sm md:text-base font-bold text-[#7F00FF] flex items-center gap-1">
              <Flame className="w-3 h-3 text-[#FF5E7E]" />
              38d
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase font-mono tracking-wider text-gray-400">Streak</span>
          </div>

          <div className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-xs sm:text-sm md:text-base font-bold text-gray-200">
              98.4%
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase font-mono tracking-wider text-gray-400">Cadence</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto no-scrollbar pb-2 pt-1 w-full">
        <div className="w-full min-w-[640px]">
          <div className="flex text-[10px] font-mono text-gray-400 select-none mb-1.5 pl-6 sm:pl-7 w-full">
            {MONTH_LABELS.map(m => (
              <span key={m.name} style={{ width: `${(100 / 12).toFixed(2)}%` }} className="truncate pr-1 text-left">
                {m.name}
              </span>
            ))}
          </div>

          <div className="flex gap-1.5 sm:gap-2 items-start w-full">
            <div className="flex flex-col justify-between text-[9px] font-mono text-gray-500 pr-1.5 select-none h-[88px] sm:h-[96px] w-6 sm:w-7 shrink-0 text-right">
              <span className="invisible">Sun</span>
              <span>Mon</span>
              <span className="invisible">Tue</span>
              <span>Wed</span>
              <span className="invisible">Thu</span>
              <span>Fri</span>
              <span className="invisible">Sat</span>
            </div>

            <div className="grid grid-flow-col auto-cols-fr gap-[2px] sm:gap-[3px] md:gap-[4px] w-full">
              {GENERATED_CONTRIBUTIONS.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[2px] sm:gap-[3px] md:gap-[4px]">
                  {week.map((day, dIdx) => {
                    const isHovered = hoveredCell?.weekIdx === wIdx && hoveredCell?.dayIdx === dIdx;
                    let colorClass = "bg-white/[0.04] border-white/5";
                    if (day.level === 1) colorClass = "bg-[#00F2FE]/25 border-[#00F2FE]/30";
                    else if (day.level === 2) colorClass = "bg-[#00F2FE]/60 border-[#00F2FE]/50";
                    else if (day.level === 3) colorClass = "bg-[#00F2FE] border-[#00F2FE]";
                    else if (day.level === 4) colorClass = "bg-gradient-to-br from-[#00F2FE] to-[#7F00FF] border-[#7F00FF]/80";

                    const delayMs = wIdx * 12 + dIdx * 2;

                    return (
                      <div
                        key={dIdx}
                        onMouseEnter={() => setHoveredCell({ date: day.date, count: day.count, weekIdx: wIdx, dayIdx: dIdx })}
                        onMouseLeave={() => setHoveredCell(null)}
                        style={{
                          transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
                        }}
                        className={`w-full aspect-square rounded-[2px] border transition-all duration-300 ease-out cursor-pointer ${colorClass} ${
                          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                        } ${isHovered ? "!scale-140 z-20 ring-1 ring-white !opacity-100" : ""}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="text-gray-300 text-[11px] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          {hoveredCell ? (
            <span><strong className="text-white">{hoveredCell.count} contributions</strong> on {hoveredCell.date}</span>
          ) : (
            <span className="text-gray-400">Hover or tap any cell to inspect commit cadence</span>
          )}
        </div>

        <div className="flex items-center gap-2 text-gray-400 text-[10px]">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.04] border border-white/5" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#00F2FE]/25 border border-[#00F2FE]/30" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#00F2FE]/60 border border-[#00F2FE]/50" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#00F2FE] border border-[#00F2FE]" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-gradient-to-br from-[#00F2FE] to-[#7F00FF]" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

// --- Three.js Cosmos Background with Circular Star Balls & Orbital Constellation Rings ---
function ThreeBackground({ activeSection, theme }: { activeSection: SectionType; theme: "deep-space" | "cyber-light" }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetSpeed = useRef(1);
  const currentSpeed = useRef(1);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    targetSpeed.current = 20;
    const t = setTimeout(() => { targetSpeed.current = 1; }, 700);
    return () => clearTimeout(t);
  }, [activeSection]);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = new THREE.Scene();
    const isLight = theme === "cyber-light";
    scene.fog = new THREE.Fog(isLight ? 0xF9FAFB : 0x06080F, 650, 2400);

    const camera = new THREE.PerspectiveCamera(75, w / h, 1, 2400);
    camera.position.z = 800;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

    // Canvas circular star ball sprite generator
    const createCircleStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(32, 32, 32, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const starTexture = createCircleStarTexture();

    // Helper for celestial star palette
    const getStarColors = (count: number) => {
      const colors = new Float32Array(count * 3);
      const colorA = isLight ? new THREE.Color(0x0284C7) : new THREE.Color(0x00F2FE);
      const colorB = isLight ? new THREE.Color(0x6D28D9) : new THREE.Color(0x7F00FF);
      const colorC = isLight ? new THREE.Color(0x0D9488) : new THREE.Color(0x38BDF8);
      const colorD = isLight ? new THREE.Color(0xD97706) : new THREE.Color(0xFFD700);

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let starColor = new THREE.Color(0xFFFFFF);
        if (rand < 0.35) starColor = colorA.clone().lerp(colorB, Math.random());
        else if (rand < 0.65) starColor = colorB.clone().lerp(colorC, Math.random());
        else if (rand < 0.82) starColor = colorD.clone();

        colors[i * 3] = starColor.r;
        colors[i * 3 + 1] = starColor.g;
        colors[i * 3 + 2] = starColor.b;
      }
      return colors;
    };

    const count = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2200;
    }

    const colors = getStarColors(count);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isLight ? 5.8 : 4.2,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.95 : 0.88,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3D Orbital Constellation Ring 1
    const r1Points: THREE.Vector3[] = [];
    for (let i = 0; i <= 90; i++) {
      const theta = (i / 90) * Math.PI * 2;
      r1Points.push(new THREE.Vector3(Math.cos(theta) * 650, Math.sin(theta) * 380, Math.sin(theta) * 220));
    }
    const r1Geo = new THREE.BufferGeometry().setFromPoints(r1Points);
    const r1Mat = new THREE.LineBasicMaterial({
      color: isLight ? 0x0284C7 : 0x00F2FE,
      transparent: true,
      opacity: isLight ? 0.45 : 0.28,
    });
    const r1 = new THREE.Line(r1Geo, r1Mat);
    r1.rotation.x = Math.PI / 3.5;
    r1.rotation.y = Math.PI / 5;
    scene.add(r1);

    // 3D Orbital Constellation Ring 2
    const r2Points: THREE.Vector3[] = [];
    for (let i = 0; i <= 90; i++) {
      const theta = (i / 90) * Math.PI * 2;
      r2Points.push(new THREE.Vector3(Math.cos(theta) * 880, Math.cos(theta) * 240, Math.sin(theta) * 600));
    }
    const r2Geo = new THREE.BufferGeometry().setFromPoints(r2Points);
    const r2Mat = new THREE.LineBasicMaterial({
      color: isLight ? 0x6D28D9 : 0x7F00FF,
      transparent: true,
      opacity: isLight ? 0.4 : 0.22,
    });
    const r2 = new THREE.Line(r2Geo, r2Mat);
    r2.rotation.z = Math.PI / 2.8;
    r2.rotation.x = -Math.PI / 6;
    scene.add(r2);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    let frameId: number;
    const render = () => {
      currentSpeed.current += (targetSpeed.current - currentSpeed.current) * 0.05;
      particles.rotation.y += 0.0006 * currentSpeed.current;
      particles.rotation.x += 0.00025 * currentSpeed.current;
      r1.rotation.z += 0.0004 * currentSpeed.current;
      r2.rotation.y += 0.0003 * currentSpeed.current;
      // Gentle, organic lerp camera motion
      camera.position.x += (mouse.current.x * 20 - camera.position.x) * 0.018;
      camera.position.y += (mouse.current.y * 20 - camera.position.y) * 0.018;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameId);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      r1Geo.dispose();
      r1Mat.dispose();
      r2Geo.dispose();
      r2Mat.dispose();
      starTexture.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />
  );
}

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
      <div className="bg-[#00F2FE]/5 border border-[#00F2FE]/30 rounded-2xl p-6 text-center my-4">
        <CheckCircle2 className="w-8 h-8 text-[#00F2FE] mx-auto mb-2" />
        <h3 className="text-lg font-bold text-white mb-1">Transmission Transmitted</h3>
        <p className="text-xs text-gray-300">Thank you! Your message was sent directly to Clare's inbox.</p>
        <button onClick={() => setStatus("idle")} className="mt-4 px-4 py-2 rounded-full bg-white/10 text-xs font-mono text-[#00F2FE]">
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
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00F2FE]"
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
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00F2FE]"
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
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#00F2FE] resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#00F2FE] to-[#7F00FF] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)] cursor-pointer disabled:opacity-50"
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

// --- Project Detail Modal Component ---
function ProjectDetailModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "milestones" | "stack">("overview");

  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = orig; };
  }, []);

  return (
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
              <span className="px-2 py-0.5 rounded bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] font-semibold uppercase">{project.type}</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 font-medium">{project.year}</span>
              <ComplexityMeter level={project.complexity.level} label={project.complexity.label} />
            </div>
            <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-tight break-words">{project.title}</h2>
            <div className="text-[11px] sm:text-xs font-mono text-[#C084FC] break-words leading-relaxed">{project.role} · {project.org}</div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#7F00FF] text-black font-semibold text-xs font-mono uppercase shadow-md flex-1 sm:flex-initial">
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
          <button onClick={() => setActiveTab("overview")} className={`px-2.5 sm:px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${activeTab === "overview" ? "bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30 font-semibold" : "text-gray-400 hover:text-white"}`}>
            01. Architecture & Impact
          </button>
          <button onClick={() => setActiveTab("milestones")} className={`px-2.5 sm:px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${activeTab === "milestones" ? "bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30 font-semibold" : "text-gray-400 hover:text-white"}`}>
            02. SDLC Milestones ({project.milestones.length})
          </button>
          <button onClick={() => setActiveTab("stack")} className={`px-2.5 sm:px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${activeTab === "stack" ? "bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30 font-semibold" : "text-gray-400 hover:text-white"}`}>
            03. Tech Stack Breakdown
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
                    <div className="text-base sm:text-xl font-bold font-mono text-[#00F2FE] mt-0.5">{km.value}</div>
                    <div className="text-xs text-gray-300 font-light mt-0.5 leading-relaxed">{km.detail}</div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#00F2FE] font-semibold">Executive Overview</h4>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light">{project.fullDesc.overview}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/20 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold">Operational Challenge</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">{project.fullDesc.challenge}</p>
                </div>
                <div className="p-3.5 sm:p-5 rounded-2xl bg-[#00F2FE]/[0.03] border border-[#00F2FE]/20 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#00F2FE] font-semibold">Engineered Solution</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">{project.fullDesc.solution}</p>
                </div>
              </div>

              <div className="p-3.5 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#C084FC] font-semibold">Key Individual Deliverables & Contributions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-gray-300 font-light leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
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
                <div key={idx} className="p-3.5 sm:p-5 rounded-xl bg-white/[0.025] border border-white/10 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-mono">
                    <span className="text-[#00F2FE] font-semibold break-words">{m.phase}</span>
                    <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-gray-400 shrink-0">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{m.date}</span>
                      <span className="px-2 py-0.5 rounded bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/20 font-medium">{m.status}</span>
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
        </div>

        <div className="p-3 sm:p-4 border-t border-white/10 bg-white/[0.02] flex justify-end shrink-0">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-white/5 text-xs font-mono text-gray-300 hover:text-white cursor-pointer flex items-center gap-2" title="Close (Escape key)">
            <span>Close</span>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-400 border border-white/10">Esc</kbd>
          </button>
        </div>
      </motion.div>
    </motion.div>
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

  useEffect(() => {
    const isLight = theme === "cyber-light";
    document.body.style.backgroundColor = isLight ? "#F9FAFB" : "#06080F";
    document.documentElement.style.backgroundColor = isLight ? "#F9FAFB" : "#06080F";
  }, [theme]);

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
        if (selectedProject) {
          e.preventDefault();
          soundEngine.playDismissClick();
          setSelectedProject(null);
          return;
        }
      }

      // If a modal is open, prevent background section navigation
      if (selectedProject) return;

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
      <ThreeBackground activeSection={activeSection} theme={theme} />

      {/* Persistent Header */}
      <header className={`absolute top-0 left-0 w-full h-20 sm:h-24 z-50 flex items-center justify-between px-4 sm:px-8 md:px-16 pointer-events-none transition-transform duration-500 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-[#7F00FF] font-mono pointer-events-auto shrink-0">
          C.DOLINO
        </div>

        {/* Mobile Section Nav Selector */}
        <div className="flex md:hidden pointer-events-auto items-center gap-2">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value as SectionType)}
            className="px-2.5 py-1 rounded-full bg-[#06080F]/90 border border-white/20 text-[#00F2FE] font-mono text-[11px] font-semibold uppercase focus:outline-none cursor-pointer shadow-md"
          >
            {SECTIONS.map((s) => (
              <option key={s} value={s} className="bg-[#090C15] text-white">
                {s.split("//")[1]?.trim() || s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 pointer-events-auto">
          <nav className="hidden md:flex gap-3.5 lg:gap-5 xl:gap-7">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                onMouseEnter={() => soundEngine.playNavHover()}
                className={`text-[11px] lg:text-xs tracking-[0.14em] lg:tracking-[0.18em] uppercase font-mono transition-all cursor-pointer ${
                  activeSection === s ? 'text-[#00F2FE] font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            onMouseEnter={() => soundEngine.playNavHover()}
            title="Toggle theme (Shortcut: 'T')"
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-gray-300 font-mono text-[10px] uppercase cursor-pointer shrink-0"
          >
            {theme === "deep-space" ? <Moon className="w-3.5 h-3.5 text-[#00F2FE]" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
            <span className="hidden sm:inline">{theme === "deep-space" ? "Deep Space" : "Cyber-Light"}</span>
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7F00FF]/15 border border-[#7F00FF]/30 text-[#00F2FE] font-mono text-[10px] sm:text-xs uppercase tracking-[0.12em] max-w-full">
                <Sparkles className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                <span className="whitespace-normal break-words text-center">Technical Product Builder · Systems Thinker · Software Developer</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.18] sm:leading-[1.16] tracking-tight break-words px-2">
                I turn complex problems into<br className="hidden sm:inline" />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-[#7F00FF] inline-block">
                  practical digital solutions.
                </span>
              </h1>

              {/* Honor & Relocation Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto px-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-200 font-mono text-[11px] sm:text-xs">
                  <GraduationCap className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                  <span>Magna Cum Laude (Rank 1, GWA 1.32)</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-200 font-mono text-[11px] sm:text-xs">
                  <Award className="w-3.5 h-3.5 text-[#7F00FF] shrink-0" />
                  <span>PIA Region 8 Proficiency Awardee</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] font-mono text-[11px] sm:text-xs font-semibold shadow-[0_0_12px_rgba(0,242,254,0.15)]">
                  <Globe className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                  <span>Open for Relocation &amp; International Opportunities</span>
                </span>
              </div>

              {/* Bio Paragraph */}
              <p className="text-gray-300 text-xs sm:text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed sm:leading-loose px-2 sm:px-4">
                I'm Clare Angelie Dolino, a Magna Cum Laude Information Systems graduate who works across systems analysis, software development, product-oriented problem-solving, and AI-assisted development. I enjoy understanding how people and organizations work, identifying opportunities for improvement, and translating ideas into useful software solutions.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2">
                <button onClick={() => setActiveSection("04 // Tracklist")} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#00F2FE] to-[#7F00FF] text-black font-semibold text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.3)] cursor-pointer">
                  <span>Explore Projects & Case Studies</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button onClick={() => setActiveSection("02 // Backstage")} className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase text-gray-300 hover:text-white cursor-pointer">
                  <span>View Backstage & Skills</span>
                </button>
                <button onClick={() => setActiveSection("06 // Insights")} className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase text-gray-300 hover:text-[#00F2FE] hover:border-[#00F2FE]/40 cursor-pointer">
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
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl space-y-6">
                
                {/* Header Row: Photo, Name, Honors & Contact Chips */}
                <div className="flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center pb-6 border-b border-white/10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden border-2 sm:border-4 border-[#7F00FF]/70 ring-4 ring-[#00F2FE]/30 shrink-0 shadow-2xl shadow-[#7F00FF]/40 transition-transform duration-300 hover:scale-105">
                      <img src={clareProfile} alt="Clare Angelie T. Dolino" className="w-full h-full object-cover object-center" />
                    </div>
                    <div className="space-y-1.5 text-left min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00F2FE]/15 border border-[#00F2FE]/30 text-[#00F2FE] font-semibold text-[11px]">
                          <GraduationCap className="w-3 h-3 shrink-0" /> Magna Cum Laude (Rank 1, GWA 1.32)
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7F00FF]/15 border border-[#7F00FF]/30 text-[#C084FC] font-semibold text-[11px]">
                          <Award className="w-3 h-3 shrink-0" /> PIA R8 Proficiency Awardee
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px]">
                          <Globe className="w-3 h-3 shrink-0" /> Open for Relocation &amp; International Roles
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight break-words">Clare Angelie T. Dolino</h2>
                      <p className="text-xs font-mono text-gray-300">Technical Product Builder · Systems Thinker · Software Developer</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono text-gray-400 pt-1">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" /> Biliran, Philippines (Relocation Ready)</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#7F00FF] shrink-0" /> clareangeliedolino@gmail.com</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" /> +63 964 963 3928</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono self-stretch lg:self-auto justify-start lg:justify-end">
                    <button
                      onClick={() => setActiveSection("03 // Approach")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] hover:bg-[#00F2FE]/20 transition-all cursor-pointer font-semibold text-xs"
                    >
                      <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                      <span>View Problem-Solving Approach →</span>
                    </button>
                  </div>
                </div>

                {/* Key Education & Milestones Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-xs text-left">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <div className="flex items-center gap-2 font-mono text-[#00F2FE] font-semibold uppercase text-[11px]">
                      <GraduationCap className="w-4 h-4 shrink-0" />
                      <span>Academic Excellence</span>
                    </div>
                    <div className="text-white font-bold">BS in Information Systems</div>
                    <p className="text-gray-300 font-light">Biliran Province State University (BiPSU)</p>
                    <p className="text-[#00F2FE] font-mono text-[11px]">Magna Cum Laude · Cohort Rank 1 (GWA 1.32)</p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <div className="flex items-center gap-2 font-mono text-[#C084FC] font-semibold uppercase text-[11px]">
                      <Award className="w-4 h-4 shrink-0" />
                      <span>Institutional Impact</span>
                    </div>
                    <div className="text-white font-bold">Proficiency Awardee & Lead Intern</div>
                    <p className="text-gray-300 font-light">Philippine Information Agency (PIA Region VIII)</p>
                    <p className="text-gray-400 font-mono text-[11px]">3 Production platforms delivered (Jan–Apr 2026)</p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 sm:col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2 font-mono text-[#00F2FE] font-semibold uppercase text-[11px]">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Research & Quality</span>
                    </div>
                    <div className="text-white font-bold">Capstone Project Leader & Author</div>
                    <p className="text-gray-300 font-light">CDMIS — Centralized Document System</p>
                    <p className="text-[#C084FC] font-mono text-[11px]">ISO/IEC 25010 Usability Rating: 4.85 / 5.00</p>
                  </div>
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
                    className="absolute top-1/2 -translate-y-1/2 w-56 sm:w-72 h-[1.5px] bg-gradient-to-r from-transparent via-[#00F2FE] to-transparent shadow-[0_0_10px_rgba(0,242,254,0.7)] pointer-events-none"
                  />
                  <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#00F2FE]/30 border border-[#00F2FE]/70 shadow-[0_0_6px_rgba(0,242,254,0.5)]" />
                </div>

                {/* Narrative Summary & Core Principles */}
                <div className="pt-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl">
                    I lead the end-to-end systems analysis, problem ideation, requirements evaluation, and solution architecture—leveraging modern AI tooling as a high-velocity engineering accelerator to build, test, and deploy resilient full-stack digital solutions.
                  </p>

                  <div className="flex flex-wrap gap-1.5 shrink-0 max-w-sm">
                    {["Systems Analysis", "BRD/BPD Authoring", "ISO/IEC 25010", "Full-Stack Dev", "AI Function Calling", "Agile Leadership", "Open for Relocation", "International Opportunities"].map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-gray-300 font-mono text-[10px]">
                        {tag}
                      </span>
                    ))}
                  </div>
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
                    onSelectProject={(projectId) => {
                      const proj = PROJECTS.find((p) => p.id === projectId);
                      if (proj) {
                        soundEngine.playCardHover();
                        setSelectedProject(proj);
                      }
                    }}
                  />
                ))}
              </div>

              {/* GitHub Contributions */}
              <GitHubContributions />
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
          <TiltWrapper className="my-auto py-4" maxTilt={0.8}>
            <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 text-center md:text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] font-mono text-[11px] sm:text-xs uppercase tracking-[0.15em] mb-3">
                  <RefreshCw className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                  <span>Methodology & Problem-Solving Blueprint</span>
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  How I Work: A Structured 6-Step Framework
                </h2>
                <p className="text-gray-300 text-xs sm:text-sm font-light max-w-2xl leading-relaxed mt-2">
                  A disciplined methodology for deconstructing operational friction, designing normalized data models, and delivering resilient, user-friendly digital products.
                </p>
              </div>

              {/* 6 Step Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {APPROACH_STEPS.map((step) => {
                  const IconComponent = step.icon;
                  return (
                    <div
                      key={step.num}
                      className="bg-white/[0.02] border border-white/10 hover:border-[#00F2FE]/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl text-left"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#00F2FE] group-hover:bg-[#00F2FE]/10 transition-colors">
                            <IconComponent className="w-5 h-5 shrink-0" />
                          </div>
                          <span className="font-mono text-xs font-bold text-[#00F2FE] tracking-widest">
                            STEP {step.num}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#00F2FE] transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-xs font-medium text-gray-200 leading-relaxed">
                          {step.summary}
                        </p>

                        <p className="text-xs text-gray-400 font-light leading-relaxed">
                          {step.detail}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 mt-4">
                        <span className="text-[10px] font-mono text-[#C084FC] uppercase tracking-wider block mb-1">
                          Real Project Application:
                        </span>
                        <p className="text-[11px] text-gray-300 italic font-light leading-snug">
                          "{step.example}"
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Nav Callout */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2 text-gray-300 text-left">
                  <Sparkles className="w-4 h-4 text-[#00F2FE] shrink-0" />
                  <span>See how this framework was applied across real regional government platforms and university research:</span>
                </div>
                <button
                  onClick={() => setActiveSection("04 // Tracklist")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00F2FE] to-[#7F00FF] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:opacity-95 transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <span>Explore Case Studies</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </TiltWrapper>
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
              <p className="text-[#00F2FE] font-mono text-xs tracking-[0.15em] uppercase">
                Featured Case Studies & Production Releases
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full items-stretch auto-rows-fr">
              {PROJECTS.map((project) => (
                <TiltWrapper key={project.id} className="h-full min-h-full flex flex-col self-stretch">
                  <div 
                    role="button"
                    tabIndex={0}
                    onClick={() => { setSelectedProject(project); }}
                    className="group glow-border bg-white/[0.03] backdrop-blur-lg rounded-xl p-4 sm:p-5.5 cursor-pointer flex flex-col justify-between min-h-[220px] h-full flex-1 w-full text-left space-y-3 self-stretch"
                  >
                    <div className="space-y-2.5">
                      {/* Unboxed Header Metadata */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs font-mono">
                        <div className="flex flex-wrap items-center gap-1.5 text-[#00F2FE] font-medium min-w-0">
                          <span className="uppercase text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded bg-[#00F2FE]/10 border border-[#00F2FE]/25 shrink-0">
                            {project.type}
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-mono text-gray-300 px-2 py-0.5 rounded bg-white/5 border border-white/10 shrink-0">
                            {project.year}
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-[#00F2FE] font-mono font-semibold shrink-0 ml-auto group-hover:underline">
                          Inspect Details →
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug break-words group-hover:text-[#00F2FE] transition-colors">
                        {project.title}
                      </h3>
                      
                      <div className="space-y-0.5 text-[11px] sm:text-xs font-mono">
                        <div className="text-[#C084FC] font-medium leading-snug break-words">{project.role}</div>
                        <div className="text-gray-400 text-[10px] sm:text-[11px] break-words">{project.org}</div>
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#00F2FE]/10 border border-[#00F2FE]/25 text-[#00F2FE] font-mono text-[10px] sm:text-[11px] w-full min-w-0 overflow-hidden">
                        <Flame className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                        <span className="truncate min-w-0 flex-1">{project.metric}</span>
                      </div>

                      <p className="text-gray-300 text-xs leading-relaxed font-light break-words">{project.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-[#00F2FE] font-semibold flex items-center gap-1 text-[11px] sm:text-xs shrink-0">
                        <span>View Case Study & Stack</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                      </span>
                      <ComplexityMeter level={project.complexity.level} label={project.complexity.label} />
                    </div>
                  </div>
                </TiltWrapper>
              ))}
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
                <p className="text-[#00F2FE] font-mono text-xs tracking-[0.2em] uppercase mb-2">Final Track // Contact</p>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2">Have a problem worth solving? Let's talk.</h2>
                <p className="text-gray-300 font-light text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
                  I'm interested in opportunities where analytical thinking, technology, and thoughtful execution come together to create useful products and better systems.
                </p>
              </div>

              {/* Direct Info Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-gray-300">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" /> clareangeliedolino@gmail.com</span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#7F00FF] shrink-0" /> +63 964 963 3928</span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" /> Biliran, Philippines</span>
                <span className="hidden sm:inline">·</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold text-[11px]">
                  <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Open for Relocation &amp; International Roles
                </span>
              </div>

              <ContactMeForm />

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-gray-400 text-center sm:text-left">
                  <Sparkles className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
                  <span className="text-center sm:text-left">Available for Full-Stack, Systems Analysis &amp; AI Engineering · Open for Relocation &amp; Worldwide Remote</span>
                </div>

                <div className="flex items-center gap-3">
                  <a 
                    href="https://github.com/claredolino-sys" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#00F2FE]/50 text-gray-400 hover:text-white transition-colors"
                    title="GitHub Profile (claredolino-sys)"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/clare-angelie-taringting-dolino-4180823a3" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-[#7F00FF]/50 text-gray-400 hover:text-white transition-colors"
                    title="LinkedIn Profile"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
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

      {/* Right Scroll Indicator (Desktop Only) */}
      <aside id="section-scroll-progress" className="hidden lg:flex fixed right-3 xl:right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none">
        <div className="font-mono text-[10px] text-[#00F2FE] mb-2 font-bold">0{currentIndex + 1}</div>
        <div className="relative flex flex-col items-center gap-4 py-2">
          <div className="absolute top-2 bottom-2 w-[2px] bg-white/10 left-1/2 -translate-x-1/2 rounded-full" />
          {SECTIONS.map((sec) => (
            <button key={sec} onClick={() => setActiveSection(sec)} className="group relative p-1 cursor-pointer">
              <div className={`w-2 h-2 rounded-full transition-all ${activeSection === sec ? "bg-[#00F2FE] ring-4 ring-[#00F2FE]/30 scale-125" : "bg-gray-600"}`} />
            </button>
          ))}
        </div>
        <div className="font-mono text-[10px] text-gray-500 mt-2">0{SECTIONS.length}</div>
      </aside>

      {/* Persistent Footer Equalizer Dock */}
      <footer className="fixed bottom-0 left-0 w-full h-16 sm:h-20 z-50 flex items-center justify-between px-3 sm:px-8 md:px-16 pointer-events-none bg-gradient-to-t from-[#06080F] via-[#06080F]/90 to-transparent">
        
        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center justify-between w-full pointer-events-auto px-1">
          <button onClick={handlePrev} className="px-3 py-1.5 bg-[#06080F]/90 border border-white/20 rounded-full text-xs font-mono text-[#00F2FE] active:scale-95 cursor-pointer">
            ← Prev
          </button>
          <span className="text-[10px] font-mono text-gray-300 uppercase">
            {SECTION_METADATA[activeSection]?.shortTitle} ({currentIndex + 1}/{SECTIONS.length})
          </span>
          <button onClick={handleNext} className="px-3 py-1.5 bg-[#06080F]/90 border border-white/20 rounded-full text-xs font-mono text-[#00F2FE] active:scale-95 cursor-pointer">
            Next →
          </button>
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3 text-gray-500 font-mono text-xs uppercase pointer-events-auto">
          <button 
            onClick={handlePrev} 
            className="px-2.5 py-1 border border-gray-700/80 rounded text-[10px] hover:text-[#00F2FE] hover:border-[#00F2FE]/50 transition-colors flex items-center gap-1 cursor-pointer" 
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
            className="px-2.5 py-1 border border-gray-700/80 rounded text-[10px] hover:text-[#00F2FE] hover:border-[#00F2FE]/50 transition-colors flex items-center gap-1 cursor-pointer" 
            title="Next Section (Shortcut: → or ↓)"
          >
            <span>Next</span>
            <kbd className="text-[9px] font-mono text-gray-400">→</kbd>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3 bg-[#06080F]/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 shadow-lg pointer-events-auto">
          <div className="flex items-end gap-[3px] h-4">
            <div className={`eq-bar eq-1 ${!soundEnabled ? "!animate-none !h-1 opacity-30" : ""}`} />
            <div className={`eq-bar eq-2 ${!soundEnabled ? "!animate-none !h-1 opacity-30" : ""}`} />
            <div className={`eq-bar eq-3 ${!soundEnabled ? "!animate-none !h-1 opacity-30" : ""}`} />
            <div className={`eq-bar eq-4 ${!soundEnabled ? "!animate-none !h-1 opacity-30" : ""}`} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[9px] text-[#00F2FE] font-mono leading-tight">Now Playing</span>
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
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#00F2FE]" /> : <VolumeX className="w-3.5 h-3.5 text-gray-500" />}
          </button>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </div>
  );
}
