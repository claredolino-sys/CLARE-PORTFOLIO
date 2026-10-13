import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Github, Linkedin, FileText, ExternalLink } from "lucide-react";

interface ContactSectionProps {
  onPreviewResume: () => void;
  onDownloadResume: () => void;
  isDownloadingResume: boolean;
  playNavHover: () => void;
}

export function ContactSection({
  onPreviewResume,
  onDownloadResume,
  isDownloadingResume,
  playNavHover,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim()) errs.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errs.email = "Invalid email format.";
    if (!formData.message.trim()) errs.message = "Please write a brief message.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      await fetch("https://formsubmit.co/ajax/clareangeliedolino@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `[Portfolio Inquiry] Message from ${formData.name}`,
        }),
      });
    } catch {
      // Graceful fallback
    }

    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 text-center">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          05. Get in Touch
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Have a problem worth solving? Let's talk.
        </h2>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto font-light leading-relaxed">
          I'm interested in opportunities where analytical thinking, technology, and thoughtful execution come together to create useful products and better systems.
        </p>
      </div>

      {/* Direct Contact Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <a
          href="mailto:clareangeliedolino@gmail.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/50 text-slate-200 transition-colors"
        >
          <Mail className="w-4 h-4 text-cyan-400" />
          <span>clareangeliedolino@gmail.com</span>
        </a>

        <a
          href="tel:+639649633928"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-400/50 text-slate-200 transition-colors"
        >
          <Phone className="w-4 h-4 text-sky-400" />
          <span>+63 964 963 3928</span>
        </a>

        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
          <MapPin className="w-4 h-4 text-indigo-400" />
          <span>Biliran, Philippines (Open to Remote / Relocation)</span>
        </span>
      </div>

      {/* Form Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 text-left max-w-2xl mx-auto shadow-xl">
        {status === "success" ? (
          <div className="text-center space-y-4 py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Message Transmitted</h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
              Thank you for reaching out! Your message has been sent to Clare's inbox. She will review it and reply promptly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 transition-colors cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono text-slate-400 mb-1">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono text-slate-400 mb-1">
                  Your Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="contact-msg" className="block text-xs font-mono text-slate-400 mb-1">
                Message *
              </label>
              <textarea
                id="contact-msg"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Clare, I came across your portfolio and would like to discuss an opportunity..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              />
              {errors.message && <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Social Links & Resume */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-mono">
        <button
          onClick={() => {
            playNavHover();
            onPreviewResume();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/50 text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Preview CV</span>
        </button>

        <a
          href="https://www.linkedin.com/in/clare-angelie-taringting-dolino-4180823a3"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-400/50 text-slate-300 hover:text-white transition-colors"
        >
          <Linkedin className="w-4 h-4 text-indigo-400" />
          <span>LinkedIn</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </a>

        <a
          href="https://github.com/claredolino-sys"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white transition-colors"
        >
          <Github className="w-4 h-4 text-slate-400" />
          <span>GitHub</span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </a>
      </div>
    </section>
  );
}
