import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  BookOpen, Calendar, Clock, ArrowUpRight, Search, X, Check, Copy, 
  Sparkles, Layers, Cpu, ShieldCheck, Share2, Tag, Terminal,
  Maximize2, Minimize2, Type, Columns, List, ChevronRight,
  ArrowLeft, ArrowRight, ExternalLink, ArrowUp, Hash
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface InsightPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  summary: string;
  featured?: boolean;
  content: string;
}

// Fallback embedded markdown if fetch is restricted or offline
const FALLBACK_MARKDOWN = `---article---
id: 1
slug: state-machine-govtech-workflows
title: Deconstructing Bureaucratic Friction: State-Machine Driven Workflows in GovTech
date: Oct 2026
readTime: 6 min read
category: Systems Architecture
tags: ["GovTech", "State Machines", "PostgreSQL", "Workflow Optimization"]
summary: How replacing disconnected paper vouchers and spreadsheets with deterministic state-machine pipelines reduced regional government disbursement cycles by over 80%.
featured: true

### The Anatomy of Operational Friction

In public sector administration, expenditure verification is frequently stalled not by lack of personnel diligence, but by **non-deterministic workflow transitions**. When financial records travel across multiple desks without an authoritative state machine, vouchers exist in ambiguous in-between states: pending reviews without assignees, duplicate invoice risks, and manual classification errors between Personnel Services (PS) and Maintenance and Other Operating Expenses (MOOE).

When mapping the operational baseline at the Philippine Information Agency (Region 8), financial officers navigated fragmented workbooks where even a single incorrect account code necessitated a multi-day review loop.

### Engineering Deterministic State Pipelines

To eliminate this friction, we modeled the voucher lifecycle as a formal Finite State Machine (FSM). Each state change requires cryptographically verifiable role authorization and atomic database transactions:

\`\`\`typescript
type VoucherState = 
  | 'DRAFT_INGESTED' 
  | 'LEXICAL_VALIDATED' 
  | 'AUDIT_PENDING' 
  | 'OBLIGATION_CERTIFIED' 
  | 'DISBURSED';

interface StateTransitionRule {
  from: VoucherState;
  to: VoucherState;
  requiredRole: 'finance_analyst' | 'chief_accountant' | 'regional_director';
  invariantChecks: string[];
}
\`\`\`

### Context-Aware Lexical Auto-Classification

Rather than expecting clerks to manually cross-reference thousand-page government chart of accounts, we implemented a context-aware lexical tokenizer running in under 250ms. By scoring accounting description tokens against standardized Commission on Audit (COA) taxonomy dictionaries, line items are auto-suggested with 99.4% confidence:

- *Token clustering* identifies whether line items belong to statutory allowances, utility overhead, or capital outlay.
- *Atomic rollbacks* prevent duplicate voucher numbers through unique compound database constraints.

### Outcome & Systems Thinking Lesson

The engineering triumph was not merely replacing paper with digital screens; it was replacing ambiguity with mathematical determinism. The turnaround time for monthly liquidation packets plummeted by 80%+, proving that good software architecture in government is fundamentally an exercise in trust and transparency.

---article---
id: 2
slug: iso-iec-25010-academic-archiving
title: ISO/IEC 25010 in Practice: Evaluating Usability & Security in University Archiving
date: Sep 2026
readTime: 7 min read
category: Software Engineering
tags: ["ISO/IEC 25010", "System Architecture", "RBAC", "Research"]
summary: An empirical evaluation framework measuring functional suitability, usability, and security in institutional document systems—scoring 4.85/5.00 across 50+ university stakeholders.
featured: true

### Moving Beyond Anecdotal Software Quality

Software engineering in academic and institutional settings often suffers from subjective evaluations: "the UI looks nice" or "it feels faster." In building the Centralized Document Management and Information System (CDMIS) for Biliran Province State University (BiPSU), our 6-member engineering team grounded every milestone in the international standard **ISO/IEC 25010 System and Software Quality Model**.

### Structuring Empirical Evaluation Criteria

We formulated structured Likert instruments measuring three foundational quality characteristics:

1. **Functional Suitability:** Does the system fulfill 100% of administrative document routing, barcode issuance, and endorsement requirements without data corruption?
2. **Usability (Operability & Learnability):** Can an administrative clerk index a newly scanned 40-page administrative memorandum in under 45 seconds on their first day of system handover?
3. **Security (Integrity & Non-Repudiation):** Are document checksums computed via SHA-256 and verified upon every download to guarantee zero unauthorized file tampering?

### Architectural Safeguards

To achieve our target quality metrics, the system architecture relied on three pillars:

- **Hierarchical Role-Based Access Control (RBAC):** Access rights are derived strictly from institutional department organizational hierarchies (Dean, Registrar, President, Custodian), enforced at both API middleware and database query layers.
- **SHA-256 Document Fingerprinting:** Whenever a PDF is uploaded through multipart streams, an SHA-256 hash is computed in-memory before blob persistence. If a bit is modified in underlying storage, the audit engine flags an integrity mismatch.
- **Normalized 3NF Relational Schemas:** Strict 3rd Normal Form schema definitions ensured zero data redundancy across decades of archival records.

### Statistical Validation Results

Empirical testing with over 50 university evaluators yielded an aggregate rating of **4.85 out of 5.00**—the highest score awarded during capstone defense. The primary takeaway: engineering rigorous automated testing and standards-based metrics from Day 1 elevates student capstone projects into enduring institutional infrastructure.

---article---
id: 3
slug: prompt-to-production-llm-function-calling
title: Beyond Prompting: Architecting Reliable Applications with LLM Function Calling
date: Aug 2026
readTime: 5 min read
category: AI Engineering
tags: ["AI Engineering", "Function Calling", "Gemini API", "Type Safety"]
summary: Why raw text prompts fail in enterprise applications, and how declarative schema-driven LLM function calling creates reliable, auditable automations.
featured: false

### The Fallacy of Pure Text Generation

The widespread excitement around generative AI often leads engineers to treat LLMs as conversational chatbots. However, when building production software—such as parsing institutional travel orders, computing leave credits, or extracting budget items—free-form text generation is brittle, unpredictable, and prone to silent hallucinations.

Enterprise systems cannot parse *"I've checked the travel order and it seems like John was in Tacloban for 3 days."* Enterprise systems demand deterministic JSON payloads matching strict domain schemas.

### Declarative Function Calling as Type-Safe Contracts

By leveraging modern Gemini API Structured Outputs and Tool Declarations, the LLM stops acting as a creative writer and begins acting as a semantic entity extractor constrained by a JSON Schema:

\`\`\`typescript
const extractTravelOrderSchema = {
  type: "OBJECT",
  properties: {
    personnelId: { type: "STRING" },
    destination: { type: "STRING" },
    startDate: { type: "STRING", format: "date" },
    endDate: { type: "STRING", format: "date" },
    totalOfficialHours: { type: "INTEGER" },
    authorizedExpenses: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          category: { type: "STRING", enum: ["TRANSPORT", "PER_DIEM", "REGISTRATION"] },
          amount: { type: "NUMBER" }
        },
        required: ["category", "amount"]
      }
    }
  },
  required: ["personnelId", "startDate", "endDate", "totalOfficialHours"]
};
\`\`\`

### The Architectural Pipeline

1. **Document Ingestion:** Travel orders and receipts are ingested and pre-processed.
2. **Constrained Function Dispatch:** The model is invoked with strict tool declarations, ensuring the output conforms to schema rules.
3. **Application Validation:** Domain validators check business logic (e.g., verifying if the requested dates overlap with prior approved travel).
4. **Automated Ledger Mutation:** Only verified payloads trigger database updates.

### Conclusion

The future of software engineering is not writing prose to an AI, but designing rock-solid type contracts and error-handling scaffolds that allow probabilistic models to execute deterministic operations safely.

---article---
id: 4
slug: dual-layer-persistence-resilience
title: Designing Dual-Layer Persistence for Unreliable Regional Networks
date: Jul 2026
readTime: 6 min read
category: Systems Architecture
tags: ["Resilience", "Offline-First", "Supabase", "Edge Computing"]
summary: Engineering resilient data architectures that pair cloud databases with in-memory fallbacks to maintain zero downtime during infrastructure outages.
featured: false

### The Reality of Regional Infrastructure

Most modern web frameworks are designed with the hidden assumption of gigabit fiber connections and zero network latency. In provincial regional centers, network connectivity is variable: undersea cable maintenance, sudden ISP dropouts, and intermittent micro-disconnections are daily realities.

When building operational platforms for regional government agencies, a network timeout cannot result in lost voucher submissions or blank white error screens.

### The Dual-Layer Architecture

In our financial monitoring and requisition systems, we engineered a dual-layer caching and synchronization pattern:

- **Layer 1: Relational Cloud Persistence (PostgreSQL / Supabase):** The source of truth with Row-Level Security, database triggers, and immutable audit logging.
- **Layer 2: Optimistic Local State & In-Memory Fallback:** An IndexedDB and in-memory cache layer that stores pending ledger mutations with monotonic timestamp vectors.

\`\`\`
[User Action] ---> [Local In-Memory Cache] (Instant UI Feedback < 16ms)
                          |
                   [Network Monitor]
                   /               \\
         (Connected)              (Disconnected)
             /                          \\
[Sync to Supabase Postgres]     [Queue in Monotonic Buffer]
             |                          |
    [Commit Confirmed]         [Retry on 'online' event]
\`\`\`

### Conflict Resolution & Monotonic Ordering

When the user comes back online, the queued operations are replayed sequentially using idempotent UUID transaction tokens. If an expenditure item was modified on another terminal while offline, the system employs vector clock checks and field-level deterministic merges rather than coarse-grained last-write-wins overwrites.

### The Result

Users never experience interface freezing or lost work. The platform delivers instant, sub-16ms tactile feedback regardless of external regional network conditions.

---article---
id: 5
slug: systems-analyst-as-bridge
title: The Systems Analyst as Bridge: Why BRD Formulation is High-Leverage Engineering
date: Jun 2026
readTime: 5 min read
category: Systems Thinking
tags: ["Requirements Analysis", "BRD", "Systems Thinking", "SDLC"]
summary: Why the most critical phase of software engineering happens before writing code—translating organizational bottlenecks into unambiguous system models.
featured: false

### Code is Cheap, Clarity is Rare

A recurring anti-pattern in software development is diving straight into writing code before understanding the human and systemic reality of the problem. A team can construct the most elegant React components and microservices, but if the underlying business model misinterprets operational rules, the product is useless.

As Lead Systems Analyst across multiple enterprise and capstone systems, I've observed that **unclear requirements are responsible for 90% of software rework**.

### Deconstructing the Problem Space

Effective requirements engineering requires wearing multiple hats:

1. **Ethnographic Observation:** Sitting alongside administrative personnel and procurement officers to watch how they actually handle invoices, not just how the manual says they should.
2. **Friction Mapping:** Identifying redundant approval steps that exist solely because people lack visibility into previous reviewers' actions.
3. **Data Modeling (3NF & ERD):** Translating real-world operational physical documents (vouchers, slips, receipts) into normalized, tamper-evident relational models.

### From Human Intent to Technical Artifacts

The outcome of this discovery phase is not a dusty 100-page document that nobody reads, but a living **Business Requirements Document (BRD)** featuring:

- Clear actor role matrices and permission boundaries.
- Deterministic swimlane process workflows.
- Unambiguous input/output data dictionaries.

When the engineering team begins implementing features based on a pristine, vetted BRD, coding velocity increases tenfold because there are zero architectural ambiguities left to guess.
`;

function parseMarkdownArticles(raw: string): InsightPost[] {
  const chunks = raw.split("---article---").map(c => c.trim()).filter(Boolean);
  const posts: InsightPost[] = [];

  for (const chunk of chunks) {
    try {
      const parts = chunk.split("###");
      const metadataPart = parts[0];
      const contentPart = parts.slice(1).map(p => "###" + p).join("");

      const lines = metadataPart.split("\n");
      const meta: Record<string, string> = {};

      for (const line of lines) {
        const colonIdx = line.indexOf(":");
        if (colonIdx > -1) {
          const key = line.slice(0, colonIdx).trim();
          const val = line.slice(colonIdx + 1).trim();
          meta[key] = val;
        }
      }

      let tags: string[] = [];
      if (meta.tags) {
        try {
          tags = JSON.parse(meta.tags);
        } catch {
          tags = meta.tags.replace(/[[\]"]/g, "").split(",").map(t => t.trim());
        }
      }

      if (meta.title) {
        posts.push({
          id: parseInt(meta.id || "1", 10),
          slug: meta.slug || `post-${posts.length + 1}`,
          title: meta.title,
          date: meta.date || "2026",
          readTime: meta.readTime || "5 min read",
          category: meta.category || "Systems Thinking",
          tags,
          summary: meta.summary || "",
          featured: meta.featured === "true",
          content: contentPart || chunk,
        });
      }
    } catch {
      // Ignore parse failure on individual chunk
    }
  }

  return posts;
}

// Inline formatted text helper: handles **bold**, *italics*, and `inline code`
function FormattedInlineText({ text, isLight }: { text: string; isLight: boolean }) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
          return (
            <strong
              key={i}
              className={`font-semibold ${isLight ? "text-slate-900" : "text-white"}`}
            >
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
          return (
            <em
              key={i}
              className={`italic font-medium ${isLight ? "text-cyan-800" : "text-cyan-200"}`}
            >
              {part.slice(1, -1)}
            </em>
          );
        }
        if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
          return (
            <code
              key={i}
              className={`px-1.5 py-0.5 rounded text-[0.9em] font-mono ${
                isLight
                  ? "bg-slate-100 text-cyan-800 border border-slate-200"
                  : "bg-white/10 text-cyan-300 border border-white/15"
              }`}
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// Markdown rendering helper with dynamic font sizes, code copy, and enhanced list/heading styling
function RenderMarkdownBody({ 
  content, 
  fontSize,
  isLight
}: { 
  content: string;
  fontSize: "normal" | "large" | "xl";
  isLight: boolean;
}) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const sections = content.split("###").filter(Boolean);

  const handleCopyCode = (code: string, idx: number) => {
    try {
      navigator.clipboard.writeText(code);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {}
  };

  // Typography scale classes based on font size selection
  const bodyTextClasses = useMemo(() => {
    switch (fontSize) {
      case "xl":
        return "text-lg sm:text-xl md:text-[21px] leading-relaxed md:leading-[1.85]";
      case "large":
        return "text-base sm:text-lg md:text-[19px] leading-relaxed md:leading-[1.8]";
      case "normal":
      default:
        return "text-sm sm:text-base md:text-[17px] leading-relaxed md:leading-[1.75]";
    }
  }, [fontSize]);

  const headingTextClasses = useMemo(() => {
    switch (fontSize) {
      case "xl":
        return "text-xl sm:text-2xl md:text-3xl";
      case "large":
        return "text-lg sm:text-xl md:text-2xl";
      case "normal":
      default:
        return "text-base sm:text-lg md:text-xl";
    }
  }, [fontSize]);

  return (
    <div className={`space-y-10 sm:space-y-12 ${isLight ? "text-slate-700" : "text-gray-200"} ${bodyTextClasses} font-normal`}>
      {sections.map((sec, secIdx) => {
        const lines = sec.trim().split("\n");
        const heading = lines[0];
        const bodyLines = lines.slice(1).join("\n").trim();
        const sectionId = `article-section-${secIdx}`;

        // Check for code blocks
        const hasCode = bodyLines.includes("```");

        return (
          <section key={secIdx} id={sectionId} className="space-y-5 scroll-mt-28">
            {/* Section Heading with numeric identifier badge */}
            <div className={`flex items-center gap-3 pt-3 pb-3 border-b ${
              isLight ? "border-slate-200" : "border-white/10"
            }`}>
              <div className={`px-2.5 py-1 rounded-md font-mono text-xs font-bold uppercase tracking-wider shrink-0 ${
                isLight 
                  ? "bg-cyan-50 border border-cyan-200 text-cyan-800" 
                  : "bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE]"
              }`}>
                § 0{secIdx + 1}
              </div>
              <h3 className={`${headingTextClasses} font-extrabold ${isLight ? "text-slate-900" : "text-white"} tracking-tight flex-1`}>
                {heading}
              </h3>
            </div>

            {hasCode ? (
              <div className="space-y-5">
                {bodyLines.split("```").map((part, pIdx) => {
                  if (pIdx % 2 === 1) {
                    // Code block
                    const codeLines = part.trim().split("\n");
                    const lang = codeLines[0].trim();
                    const codeBody = (lang === "typescript" || lang === "javascript" || lang === "sql" || lang === "json")
                      ? codeLines.slice(1).join("\n")
                      : part;

                    const codeId = secIdx * 100 + pIdx;
                    const isCopied = copiedIndex === codeId;

                    return (
                      <div 
                        key={pIdx} 
                        className={`rounded-2xl overflow-hidden border my-5 shadow-2xl transition-all ${
                          isLight 
                            ? "border-slate-300 bg-slate-950 text-cyan-200" 
                            : "border-white/15 bg-black/80 text-cyan-300"
                        }`}
                      >
                        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-white/[0.06] border-b border-white/10 text-gray-300 text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-[#00F2FE]" />
                            <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
                              {lang || "architecture-spec"}
                            </span>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => handleCopyCode(codeBody, codeId)}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors cursor-pointer text-[11px]"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#00F2FE]" />
                                <span className="text-[#00F2FE] font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm md:text-[15px] leading-relaxed no-scrollbar select-text">
                          <code>{codeBody}</code>
                        </pre>
                      </div>
                    );
                  }

                  return part.trim() ? (
                    <p key={pIdx} className="leading-relaxed">
                      <FormattedInlineText text={part.trim()} isLight={isLight} />
                    </p>
                  ) : null;
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {bodyLines.split("\n\n").map((para, pIdx) => {
                  const trimmedPara = para.trim();

                  // Numbered list detection (e.g. "1. Functional Suitability:")
                  if (/^\d+\.\s+/.test(trimmedPara)) {
                    const items = trimmedPara.split("\n").filter(Boolean);
                    return (
                      <div key={pIdx} className="space-y-3.5 my-4">
                        {items.map((it, itIdx) => {
                          const match = it.match(/^(\d+)\.\s+(.*)/);
                          const num = match ? match[1] : `${itIdx + 1}`;
                          const rawContent = match ? match[2] : it;

                          return (
                            <div 
                              key={itIdx} 
                              className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border ${
                                isLight 
                                  ? "bg-slate-50 border-slate-200 shadow-sm" 
                                  : "bg-white/[0.02] border-white/10"
                              }`}
                            >
                              <span className={`shrink-0 px-2.5 py-1 rounded-lg font-mono text-xs font-bold ${
                                isLight 
                                  ? "bg-cyan-100/70 border border-cyan-300 text-cyan-900" 
                                  : "bg-[#00F2FE]/15 border border-[#00F2FE]/40 text-[#00F2FE]"
                              }`}>
                                {num.padStart(2, "0")}
                              </span>
                              <div className="flex-1 leading-relaxed">
                                <FormattedInlineText text={rawContent} isLight={isLight} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }

                  // Bullet list detection (e.g. "- Hierarchical Role-Based")
                  if (trimmedPara.startsWith("- ") || trimmedPara.startsWith("* ")) {
                    const items = trimmedPara.split("\n").filter(Boolean);
                    return (
                      <ul key={pIdx} className="space-y-3 my-4 pl-1">
                        {items.map((it, itIdx) => {
                          const bulletContent = it.replace(/^[-*]\s*/, "");
                          return (
                            <li key={itIdx} className="flex items-start gap-3 leading-relaxed">
                              <span className={`w-2 h-2 rounded-full mt-2.5 shrink-0 ${
                                isLight ? "bg-cyan-600 ring-2 ring-cyan-200" : "bg-[#00F2FE] shadow-[0_0_8px_#00F2FE]"
                              }`} />
                              <div className="flex-1">
                                <FormattedInlineText text={bulletContent} isLight={isLight} />
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }

                  return (
                    <p key={pIdx} className="leading-relaxed">
                      <FormattedInlineText text={trimmedPara} isLight={isLight} />
                    </p>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

// Full Article Deep Dive Reader Modal with Expansive "Bigger View"
function EssayReaderModal({ 
  post, 
  posts,
  theme = "deep-space",
  onSelectPost,
  onClose,
  onPlaySound 
}: { 
  post: InsightPost; 
  posts: InsightPost[];
  theme?: "deep-space" | "cyber-light";
  onSelectPost: (p: InsightPost) => void;
  onClose: () => void;
  onPlaySound?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xl">("large");
  const [widthMode, setWidthMode] = useState<"wide" | "focus">("wide");
  const [showOutline, setShowOutline] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeadingIndex, setActiveHeadingIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isLight = theme === "cyber-light";

  // Next / Previous Post Navigation
  const currentPostIndex = posts.findIndex(p => p.id === post.id);
  const prevPost = currentPostIndex > 0 ? posts[currentPostIndex - 1] : null;
  const nextPost = currentPostIndex < posts.length - 1 ? posts[currentPostIndex + 1] : null;

  // Prevent background body scrolling while reader modal is open
  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = orig; };
  }, []);

  // Keyboard controls: Esc to close, F to toggle fullscreen, Left/Right arrows for previous/next essay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA";
      if (isInput) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "f" || e.key === "F") {
        setIsFullscreen(prev => !prev);
      } else if (e.key === "ArrowLeft" && prevPost) {
        if (onPlaySound) onPlaySound();
        onSelectPost(prevPost);
        if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "ArrowRight" && nextPost) {
        if (onPlaySound) onPlaySound();
        onSelectPost(nextPost);
        if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, prevPost, nextPost, onSelectPost, onPlaySound]);

  // Extract section titles for Table of Contents
  const sectionHeadings = useMemo(() => {
    const rawSections = post.content.split("###").filter(Boolean);
    return rawSections.map((sec, i) => {
      const heading = sec.trim().split("\n")[0].trim();
      return { id: `article-section-${i}`, title: heading, index: i };
    });
  }, [post.content]);

  // Track scroll progress and current active heading
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const progress = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100)) : 0;
    setScrollProgress(progress);

    // Determine active section based on scroll offset
    for (let i = sectionHeadings.length - 1; i >= 0; i--) {
      const el = document.getElementById(sectionHeadings[i].id);
      if (el) {
        const top = el.offsetTop - scrollRef.current.offsetTop - 120;
        if (scrollTop >= top) {
          setActiveHeadingIndex(i);
          break;
        }
      }
    }
  };

  const handleJumpToSection = (id: string, index: number) => {
    if (onPlaySound) onPlaySound();
    setActiveHeadingIndex(index);
    const el = document.getElementById(id);
    if (el && scrollRef.current) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleShare = () => {
    if (onPlaySound) onPlaySound();
    try {
      navigator.clipboard.writeText(`${window.location.origin}#${post.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className={`fixed inset-0 z-[100] flex ${
        isFullscreen ? "p-0 items-center justify-center" : "items-start pt-2 sm:pt-3 md:pt-4 px-2 sm:px-4 justify-center"
      } bg-black/85 backdrop-blur-md`}
      onClick={onClose}
    >
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={`relative flex flex-col overflow-hidden text-left transition-all ${
          isFullscreen
            ? "w-screen h-screen max-w-none max-h-none rounded-none"
            : "w-[98vw] max-w-6xl xl:max-w-7xl 2xl:max-w-[92vw] h-[97vh] max-h-[98vh] rounded-2xl md:rounded-3xl border shadow-[0_0_90px_rgba(0,0,0,0.9)]"
        } ${
          isLight
            ? "bg-white border-slate-200 text-slate-800"
            : "bg-[#090C15] border-white/10 text-white"
        }`}
      >
        {/* Top Glowing Reading Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-30 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00F2FE] via-[#7F00FF] to-[#00F2FE] shadow-[0_0_12px_#00F2FE]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Reader Navigation & Controls Bar */}
        <header className={`px-4 sm:px-6 py-3 border-b flex items-center justify-between gap-3 shrink-0 select-none z-20 ${
          isLight ? "bg-slate-50/90 border-slate-200" : "bg-white/[0.02] border-white/10"
        }`}>
          {/* Left Metadata & Outline Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setShowOutline(prev => !prev)}
              className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                showOutline
                  ? isLight
                    ? "bg-cyan-50 border-cyan-300 text-cyan-800 font-semibold"
                    : "bg-[#00F2FE]/15 border-[#00F2FE]/40 text-[#00F2FE] font-semibold"
                  : isLight
                    ? "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
                    : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
              }`}
              title="Toggle Table of Contents Outline"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Outline</span>
              <span className="text-[10px] opacity-75 font-mono">({sectionHeadings.length})</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs font-mono shrink-0">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase ${
                isLight 
                  ? "bg-cyan-100 text-cyan-900 border border-cyan-200" 
                  : "bg-[#00F2FE]/15 text-[#00F2FE] border border-[#00F2FE]/30"
              }`}>
                {post.category}
              </span>
              <span className="text-gray-400 flex items-center gap-1 text-[11px]">
                <Clock className="w-3 h-3 text-[#00F2FE]" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Center Reading Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-gray-400 truncate px-2">
            <span className="truncate max-w-xs">{post.title}</span>
            <span className="text-cyan-400 font-bold">({Math.round(scrollProgress)}%)</span>
          </div>

          {/* Right Toolbar Controls (Bigger View Toggles) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Font Size Adjuster Controls */}
            <div className={`flex items-center rounded-xl border p-0.5 ${
              isLight ? "bg-white border-slate-200" : "bg-white/5 border-white/10"
            }`}>
              <button
                type="button"
                onClick={() => { if (onPlaySound) onPlaySound(); setFontSize("normal"); }}
                className={`px-2 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  fontSize === "normal"
                    ? isLight ? "bg-slate-200 text-slate-900 font-bold" : "bg-white/20 text-white font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Regular Font Size (16px)"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => { if (onPlaySound) onPlaySound(); setFontSize("large"); }}
                className={`px-2 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  fontSize === "large"
                    ? isLight ? "bg-slate-200 text-slate-900 font-bold" : "bg-[#00F2FE]/25 text-[#00F2FE] font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Large Font Size (18px) - Recommended"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => { if (onPlaySound) onPlaySound(); setFontSize("xl"); }}
                className={`px-2 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  fontSize === "xl"
                    ? isLight ? "bg-slate-200 text-slate-900 font-bold" : "bg-[#00F2FE] text-black font-extrabold shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Extra Large Font Size (21px) - Maximum Legibility"
              >
                A++
              </button>
            </div>



            {/* Fullscreen / Bigger View Immersion Toggle */}
            <button
              onClick={() => {
                if (onPlaySound) onPlaySound();
                setIsFullscreen(prev => !prev);
              }}
              className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                isFullscreen
                  ? isLight
                    ? "bg-cyan-100 border-cyan-300 text-cyan-900 font-bold"
                    : "bg-[#00F2FE] text-black font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)]"
                  : isLight
                    ? "bg-white border-slate-200 text-slate-700 hover:text-slate-900"
                    : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
              }`}
              title={isFullscreen ? "Exit Fullscreen (F / Esc)" : "Bigger View / Fullscreen Immersion (F)"}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5 text-[#00F2FE]" />}
              <span className="hidden sm:inline font-semibold">{isFullscreen ? "Exit Fullscreen" : "Bigger View"}</span>
            </button>

            {/* Share / Copy */}
            <button
              onClick={handleShare}
              className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                isLight
                  ? "bg-white border-slate-200 text-slate-700 hover:text-slate-900"
                  : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
              }`}
              title="Copy Essay Deep Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00F2FE]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">{copied ? "Copied" : "Share"}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                if (onPlaySound) onPlaySound();
                onClose();
              }}
              className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors cursor-pointer ${
                isLight
                  ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800"
                  : "bg-white/10 hover:bg-white/20 border-white/15 text-white"
              }`}
              title="Close Essay (Escape)"
            >
              <span className="hidden sm:inline text-[10px] font-mono text-gray-400">Esc</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content Body: Outline Sidebar + Expansive Article Container */}
        <div className="flex-1 flex overflow-hidden">
          {/* Collapsible Left Outline / Table of Contents */}
          <AnimatePresence initial={false}>
            {showOutline && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className={`hidden lg:flex flex-col border-r shrink-0 overflow-y-auto no-scrollbar select-none ${
                  isLight ? "bg-slate-50/70 border-slate-200" : "bg-black/40 border-white/10"
                }`}
              >
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2.5 border-white/5">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#00F2FE] flex items-center gap-1.5">
                      <Hash className="w-3 h-3 text-[#00F2FE]" />
                      Table of Contents
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      {Math.round(scrollProgress)}% read
                    </span>
                  </div>

                  <nav className="space-y-1">
                    {sectionHeadings.map((sec, idx) => {
                      const isActive = activeHeadingIndex === idx;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => handleJumpToSection(sec.id, idx)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition-all flex items-start gap-2.5 cursor-pointer ${
                            isActive
                              ? isLight
                                ? "bg-cyan-100 text-cyan-900 font-bold border border-cyan-300"
                                : "bg-[#00F2FE]/15 text-[#00F2FE] font-bold border border-[#00F2FE]/30 shadow-sm"
                              : isLight
                                ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span className={`text-[10px] shrink-0 mt-0.5 ${isActive ? "text-[#00F2FE]" : "text-gray-500"}`}>
                            0{idx + 1}
                          </span>
                          <span className="leading-snug line-clamp-2">
                            {sec.title}
                          </span>
                        </button>
                      );
                    })}
                  </nav>

                  {/* Quick Metadata Box in Outline */}
                  <div className={`p-3.5 rounded-xl border space-y-2 mt-4 text-[11px] font-mono ${
                    isLight ? "bg-white border-slate-200 text-slate-600" : "bg-white/[0.02] border-white/5 text-gray-400"
                  }`}>
                    <div className="flex items-center justify-between">
                      <span>Article ID:</span>
                      <span className="text-gray-200 font-bold">#{post.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Published:</span>
                      <span className="text-gray-200 font-bold">{post.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Est. Read:</span>
                      <span className="text-cyan-400 font-bold">{post.readTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Author:</span>
                      <span className="text-gray-200 font-bold">C. Dolino</span>
                    </div>
                  </div>

                  <button
                    onClick={handleScrollToTop}
                    className={`w-full py-2 px-3 rounded-xl border text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isLight 
                        ? "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700" 
                        : "bg-white/5 hover:bg-white/10 border-white/10 text-gray-300"
                    }`}
                  >
                    <ArrowUp className="w-3 h-3 text-[#00F2FE]" />
                    <span>Scroll to Top</span>
                  </button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Article Canvas (Expansive & Responsive Scroll) */}
          <main
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto no-scrollbar px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 space-y-8 select-text"
          >
            <div className={`mx-auto transition-all ${
              widthMode === "focus" 
                ? "max-w-3xl" 
                : "max-w-5xl xl:max-w-6xl"
            } space-y-8 sm:space-y-10`}>
              
              {/* Article Grand Header */}
              <header className="space-y-4 border-b border-white/10 pb-8">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                    isLight 
                      ? "bg-cyan-100 text-cyan-900 border border-cyan-200" 
                      : "bg-[#00F2FE]/15 border border-[#00F2FE]/30 text-[#00F2FE]"
                  }`}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-[#00F2FE]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <Clock className="w-3.5 h-3.5 text-[#00F2FE]" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <Sparkles className="w-3.5 h-3.5 text-[#7F00FF]" />
                    Systems Thinking Essay
                  </span>
                </div>

                <h1 className={`text-2xl sm:text-4xl md:text-5xl lg:text-[44px] font-black tracking-tight leading-[1.18] ${
                  isLight ? "text-slate-900" : "text-white"
                }`}>
                  {post.title}
                </h1>

                {/* Author byline */}
                <div className="flex items-center gap-3 pt-1 text-xs font-mono text-gray-400">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00F2FE] to-[#7F00FF] flex items-center justify-center text-black font-bold text-xs">
                    CD
                  </div>
                  <div>
                    <span className={`font-semibold ${isLight ? "text-slate-800" : "text-gray-200"}`}>
                      Clare Angelie T. Dolino
                    </span>
                    <span className="text-gray-400 hidden sm:inline"> · Lead Systems Analyst &amp; Software Engineer</span>
                  </div>
                </div>

                {/* Tags row */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                        isLight 
                          ? "bg-slate-100 border border-slate-200 text-slate-700" 
                          : "bg-white/[0.04] border border-white/10 text-gray-300"
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </header>

              {/* Executive Summary Callout (Generous & High Contrast) */}
              <div className={`p-5 sm:p-7 rounded-2xl border-l-4 shadow-xl transition-all ${
                isLight 
                  ? "bg-cyan-50/70 border-l-cyan-600 border border-cyan-100 text-slate-800" 
                  : "bg-gradient-to-r from-[#00F2FE]/10 via-[#00F2FE]/5 to-transparent border-l-[#00F2FE] border border-white/10 text-gray-100"
              }`}>
                <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider font-bold text-[#00F2FE]">
                  <Sparkles className="w-4 h-4 text-[#00F2FE]" />
                  <span>Executive Summary // Architectural Takeaway</span>
                </div>
                <blockquote className={`text-base sm:text-lg md:text-xl italic font-serif leading-relaxed ${
                  isLight ? "text-slate-800" : "text-gray-100"
                }`}>
                  "{post.summary}"
                </blockquote>
              </div>

              {/* Main Markdown Content Body */}
              <RenderMarkdownBody 
                content={post.content} 
                fontSize={fontSize} 
                isLight={isLight} 
              />

              {/* End of Essay Divider & Architectural Milestone */}
              <div className="pt-8 border-t border-white/10 space-y-6">
                <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#00F2FE]" />
                    <span>Authored by Clare Angelie T. Dolino</span>
                  </div>
                  <button
                    onClick={handleScrollToTop}
                    className="flex items-center gap-1.5 text-[#00F2FE] hover:underline cursor-pointer"
                  >
                    <span>Back to Top</span>
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Author Card Box */}
                <div className={`p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isLight ? "bg-slate-50 border-slate-200" : "bg-white/[0.02] border-white/10"
                }`}>
                  <div className="space-y-1">
                    <h4 className={`text-sm sm:text-base font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                      Clare Angelie T. Dolino
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
                      Lead Systems Analyst &amp; Full-Stack Engineer specializing in deterministic workflows, ISO/IEC 25010 empirical evaluation, and AI-accelerated system architecture.
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer shrink-0 ${
                      isLight 
                        ? "bg-slate-900 text-white hover:bg-slate-800" 
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                    }`}
                  >
                    Close Essay
                  </button>
                </div>

                {/* Next & Previous Essay Sequential Navigation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {prevPost ? (
                    <button
                      onClick={() => {
                        if (onPlaySound) onPlaySound();
                        onSelectPost(prevPost);
                        handleScrollToTop();
                      }}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer group ${
                        isLight 
                          ? "bg-white border-slate-200 hover:border-cyan-500 shadow-sm" 
                          : "bg-white/[0.02] border-white/10 hover:border-[#00F2FE]/50"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 mb-1">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-[#00F2FE]" />
                        <span>Previous Essay</span>
                      </div>
                      <span className={`text-sm font-bold line-clamp-1 group-hover:text-[#00F2FE] transition-colors ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}>
                        {prevPost.title}
                      </span>
                    </button>
                  ) : <div />}

                  {nextPost ? (
                    <button
                      onClick={() => {
                        if (onPlaySound) onPlaySound();
                        onSelectPost(nextPost);
                        handleScrollToTop();
                      }}
                      className={`p-4 rounded-xl border text-right flex flex-col justify-between transition-all cursor-pointer group sm:ml-auto w-full ${
                        isLight 
                          ? "bg-white border-slate-200 hover:border-cyan-500 shadow-sm" 
                          : "bg-white/[0.02] border-white/10 hover:border-[#00F2FE]/50"
                      }`}
                    >
                      <div className="flex items-center justify-end gap-1.5 text-xs font-mono text-gray-400 mb-1">
                        <span>Next Essay</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#00F2FE]" />
                      </div>
                      <span className={`text-sm font-bold line-clamp-1 group-hover:text-[#00F2FE] transition-colors ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}>
                        {nextPost.title}
                      </span>
                    </button>
                  ) : <div />}
                </div>

              </div>
            </div>
          </main>
        </div>

        {/* Bottom Floating Bar in Fullscreen / Mobile */}
        <div className={`px-4 py-2.5 border-t flex items-center justify-between text-xs font-mono shrink-0 select-none ${
          isLight ? "bg-slate-100 border-slate-200 text-slate-600" : "bg-black/60 border-white/10 text-gray-400"
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
            <span>Reading: {post.title.slice(0, 36)}...</span>
          </div>

          <div className="flex items-center gap-3">
            <span>{Math.round(scrollProgress)}% completed</span>
            <button
              onClick={onClose}
              className="text-[#00F2FE] hover:underline cursor-pointer"
            >
              Exit View
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function InsightsSection({
  theme = "deep-space",
  onPlaySound,
}: {
  theme?: "deep-space" | "cyber-light";
  onPlaySound?: () => void;
}) {
  const [posts, setPosts] = useState<InsightPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePost, setActivePost] = useState<InsightPost | null>(null);

  const isLight = theme === "cyber-light";

  // Fetch from markdown file on mount
  useEffect(() => {
    let isMounted = true;

    async function loadMarkdown() {
      try {
        const res = await fetch("/content/insights.md");
        if (!res.ok) throw new Error("Fetch failed");
        const text = await res.text();
        if (isMounted) {
          const parsed = parseMarkdownArticles(text);
          setPosts(parsed.length > 0 ? parsed : parseMarkdownArticles(FALLBACK_MARKDOWN));
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          // Fallback to embedded articles
          setPosts(parseMarkdownArticles(FALLBACK_MARKDOWN));
          setLoading(false);
        }
      }
    }

    loadMarkdown();
    return () => { isMounted = false; };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    posts.forEach(p => set.add(p.category));
    return Array.from(set);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        p.title.toLowerCase().includes(q) || 
        p.summary.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return posts.find(p => p.featured) || posts[0];
  }, [posts]);

  const handleOpenPost = (p: InsightPost) => {
    if (onPlaySound) onPlaySound();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActivePost(p);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 sm:space-y-8 my-auto py-2">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-center md:text-left">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] font-mono text-[11px] sm:text-xs uppercase tracking-[0.15em]">
            <BookOpen className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
            <span>Section 06 // Systems & Architecture Essays</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
            isLight
              ? "text-slate-900"
              : "text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400"
          }`}>
            Engineering Insights
          </h2>
          <p className={`text-xs sm:text-sm font-light max-w-2xl leading-relaxed ${
            isLight ? "text-slate-600" : "text-gray-300"
          }`}>
            Written perspectives on decomposing bureaucratic friction, applying ISO/IEC 25010 empirical rigor, building dual-layer persistence, and architecting reliable type-safe LLM function calling.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, tags..."
            className={`w-full rounded-full pl-9 pr-8 py-2 text-xs font-mono transition-colors focus:outline-none focus:border-[#00F2FE] ${
              isLight
                ? "bg-white border border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm"
                : "bg-white/[0.03] border border-white/10 text-white placeholder-gray-500"
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              if (onPlaySound) onPlaySound();
              setSelectedCategory(cat);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? isLight
                  ? "bg-cyan-100 border border-cyan-400 text-cyan-900 font-bold shadow-sm"
                  : "bg-[#00F2FE]/20 border border-[#00F2FE] text-[#00F2FE] font-semibold shadow-[0_0_12px_rgba(0,242,254,0.3)]"
                : isLight
                  ? "bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200"
                  : "bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Lead Story (shown when viewing All and no search) */}
      {!searchQuery && selectedCategory === "All" && featuredPost && (
        <div 
          role="button"
          tabIndex={0}
          onClick={() => handleOpenPost(featuredPost)}
          className={`group relative border hover:border-[#00F2FE] rounded-2xl p-5 sm:p-7 transition-all duration-300 cursor-pointer shadow-xl glow-border text-left ${
            isLight
              ? "bg-white border-slate-200 shadow-sm hover:shadow-md"
              : "bg-gradient-to-br from-white/[0.04] to-white/[0.01] border-white/10"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-[#7F00FF]/20 border border-[#7F00FF]/40 text-[#C084FC] font-semibold text-[10px] uppercase">
                  Featured Deep Dive
                </span>
                <span className="text-gray-400 text-[11px] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#00F2FE]" />
                  {featuredPost.date}
                </span>
                <span className="text-gray-400 text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#00F2FE]" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h3 className={`text-lg sm:text-2xl font-bold group-hover:text-[#00F2FE] transition-colors tracking-tight leading-snug ${
                isLight ? "text-slate-900" : "text-white"
              }`}>
                {featuredPost.title}
              </h3>

              <p className={`text-xs sm:text-sm font-light leading-relaxed ${
                isLight ? "text-slate-600" : "text-gray-300"
              }`}>
                {featuredPost.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {featuredPost.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      isLight 
                        ? "bg-slate-100 border border-slate-200 text-slate-700" 
                        : "bg-white/5 border border-white/10 text-gray-300"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 self-start lg:self-center">
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[#00F2FE] font-mono text-xs font-semibold uppercase group-hover:bg-[#00F2FE] group-hover:text-black transition-all shadow-md">
                <span>Read Full Essay</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 text-left">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            role="button"
            tabIndex={0}
            onClick={() => handleOpenPost(post)}
            className={`group glow-border border hover:border-[#00F2FE]/60 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg space-y-4 ${
              isLight
                ? "bg-white border-slate-200 hover:bg-slate-50/80 shadow-sm"
                : "bg-white/[0.02] hover:bg-white/[0.04] border-white/10"
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2 text-xs font-mono">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                  isLight 
                    ? "bg-cyan-50 border border-cyan-200 text-cyan-800" 
                    : "bg-white/5 border border-white/10 text-[#00F2FE]"
                }`}>
                  {post.category}
                </span>
                <span className="text-gray-400 text-[10px] flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <h4 className={`text-base sm:text-lg font-bold group-hover:text-[#00F2FE] transition-colors leading-snug ${
                isLight ? "text-slate-900" : "text-white"
              }`}>
                {post.title}
              </h4>

              <p className={`text-xs font-light leading-relaxed line-clamp-3 ${
                isLight ? "text-slate-600" : "text-gray-300"
              }`}>
                {post.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 text-xs font-mono">
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((t) => (
                  <span key={t} className="text-[10px] text-gray-400">
                    #{t}
                  </span>
                ))}
              </div>
              <span className="text-[#00F2FE] group-hover:underline flex items-center gap-1 text-[11px] font-semibold shrink-0">
                <span>Read Essay</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl space-y-2">
          <BookOpen className="w-8 h-8 text-gray-500 mx-auto" />
          <p className="text-sm text-gray-300 font-mono">No essays found matching "{searchQuery}"</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
            className="text-xs text-[#00F2FE] underline font-mono cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Full Article Reader Modal with Expansive Bigger View */}
      <AnimatePresence>
        {activePost && (
          <EssayReaderModal
            post={activePost}
            posts={posts}
            theme={theme}
            onSelectPost={(p) => setActivePost(p)}
            onClose={() => setActivePost(null)}
            onPlaySound={onPlaySound}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default InsightsSection;
