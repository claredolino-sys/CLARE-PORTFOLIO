import React, { useState, useEffect } from "react";
import { FileText, Download, ExternalLink, Printer, X, Loader2 } from "lucide-react";

interface ResumePreviewModalProps {
  onClose: () => void;
  onDownload: () => void;
  isDownloading: boolean;
}

export function ResumePreviewModal({ onClose, onDownload, isDownloading }: ResumePreviewModalProps) {
  const [activePage, setActivePage] = useState<"all" | "1" | "2">("all");

  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-left"
      >
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Curriculum Vitae</h3>
              <p className="text-xs font-mono text-cyan-300">Clare Angelie T. Dolino · 2 Pages</p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActivePage("all")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                activePage === "all" ? "bg-sky-500/20 text-sky-300 font-semibold" : "text-slate-400 hover:text-white"
              }`}
            >
              All Pages
            </button>
            <button
              onClick={() => setActivePage("1")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                activePage === "1" ? "bg-sky-500/20 text-sky-300 font-semibold" : "text-slate-400 hover:text-white"
              }`}
            >
              Page 1
            </button>
            <button
              onClick={() => setActivePage("2")}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                activePage === "2" ? "bg-sky-500/20 text-sky-300 font-semibold" : "text-slate-400 hover:text-white"
              }`}
            >
              Page 2
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-mono font-semibold transition-colors cursor-pointer disabled:opacity-60"
            >
              {isDownloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Print document"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document Pages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950 flex flex-col items-center gap-8">
          {(activePage === "all" || activePage === "1") && (
            <div className="w-full max-w-[760px] bg-white text-slate-900 rounded-lg shadow-2xl p-6 sm:p-10 font-sans text-left border border-slate-200">
              <div className="text-center pb-3 border-b border-slate-200 mb-4">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">CLARE ANGELIE T. DOLINO</h1>
                <div className="text-xs font-semibold text-sky-700 tracking-wide mb-1.5">
                  Technical Product Builder · Systems Thinker · Software Developer
                </div>
                <div className="text-[11px] text-slate-600 font-mono leading-relaxed">
                  Biliran, Philippines &nbsp;|&nbsp; clareangeliedolino@gmail.com &nbsp;|&nbsp; +63 964 963 3928
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase pb-0.5 border-b border-slate-300 mb-1.5">
                  Professional Summary
                </h2>
                <p className="text-[12px] text-slate-700 leading-relaxed font-normal">
                  <strong>Magna Cum Laude Information Systems graduate (Rank 1, GWA 1.32)</strong> with experience across systems analysis, software development, project coordination, and AI-assisted software delivery. Delivered 3 production platforms at the Philippine Information Agency and led an award-winning capstone project at Biliran Province State University, achieving an ISO/IEC 25010 usability score of 4.85/5.00 and slashing workflow turnaround times by 80%+.
                </p>
              </div>

              <div className="mb-4">
                <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase pb-0.5 border-b border-slate-300 mb-1.5">
                  Core Competencies
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11.5px] text-slate-700">
                  <div>• Business Requirements Analysis (BRD/BPD/RTM)</div>
                  <div>• Agile / Scrum Leadership & Coordination</div>
                  <div>• Full-Stack Development (React, TypeScript, Node.js)</div>
                  <div>• Relational Database Design (PostgreSQL, MySQL, Supabase)</div>
                  <div>• AI Tooling (Gemini API, Function Calling)</div>
                  <div>• ISO/IEC 25010 Quality Evaluation & Testing</div>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase pb-0.5 border-b border-slate-300 mb-2">
                  Professional Experience
                </h2>
                <div className="mb-3">
                  <div className="flex justify-between items-baseline gap-1 text-xs font-bold text-slate-900">
                    <span>IT Business Analyst, PM & Lead Developer (Intern Leader)</span>
                    <span className="text-slate-500 font-mono text-[11px]">Jan 2026 – Apr 2026</span>
                  </div>
                  <div className="text-[11.5px] text-sky-700 font-medium mb-1">
                    Philippine Information Agency – Region 8
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-[11.5px] text-slate-700 leading-relaxed">
                    <li>Led requirements elicitation and authored BRD/BPD documents for 3 institutional platforms.</li>
                    <li>Architected and authored the production code for the Finance Monitoring System, reducing voucher verification turnaround time by 80%+.</li>
                    <li>Received the Proficiency Award from PIA Region 8 for technical leadership and system delivery.</li>
                  </ul>
                </div>
              </div>

              <div className="text-right text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                Page 1 of 2
              </div>
            </div>
          )}

          {(activePage === "all" || activePage === "2") && (
            <div className="w-full max-w-[760px] bg-white text-slate-900 rounded-lg shadow-2xl p-6 sm:p-10 font-sans text-left border border-slate-200">
              <div className="mb-4">
                <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase pb-0.5 border-b border-slate-300 mb-2">
                  Key Projects & Research
                </h2>
                <div className="mb-3">
                  <div className="font-bold text-slate-900 text-xs">CDMIS Capstone Project — Biliran Province State University</div>
                  <div className="text-[11.5px] text-sky-700 mb-1">Project Leader, Lead Programmer & Head Research Writer</div>
                  <ul className="list-disc list-outside pl-4 space-y-1 text-[11.5px] text-slate-700 leading-relaxed">
                    <li>Directed a 6-member engineering team to build a university-wide document management portal.</li>
                    <li>Achieved an ISO/IEC 25010 software quality evaluation score of 4.85 out of 5.00 across 50+ evaluators.</li>
                  </ul>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase pb-0.5 border-b border-slate-300 mb-2">
                  Education & Honors
                </h2>
                <div className="flex justify-between items-baseline gap-1 text-xs font-bold text-slate-900">
                  <span>BS in Information Systems</span>
                  <span className="text-slate-500 font-mono text-[11px]">Graduated 2026</span>
                </div>
                <div className="text-[11.5px] text-sky-700 mb-1">Biliran Province State University</div>
                <ul className="list-disc list-outside pl-4 space-y-1 text-[11.5px] text-slate-700 leading-relaxed">
                  <li><strong>Magna Cum Laude, Rank 1 in entire cohort</strong> (GWA: 1.32)</li>
                  <li>Academic scholarship recipient, continuous President's and Dean's Lister</li>
                </ul>
              </div>

              <div className="text-right text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                Page 2 of 2
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
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
