"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// ════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ════════════════════════════════════════════════════════════════════════════
const GREEN = "#33ff33";
const AMBER = "#ffb000";
const BG = "#0a0a0a";
const DIM = "rgba(51,255,51,0.4)";

const FONT = "'VT323', 'Courier New', monospace";

// ════════════════════════════════════════════════════════════════════════════
// BOOT LINES
// ════════════════════════════════════════════════════════════════════════════
const BOOT = [
  "BIOS v3.14 ............ OK",
  "RAM: 640K ............. OK",
  "AM_OS v2.0 ............ OK",
  "Neural Link ........... OK",
  "> CONTACT TERMINAL READY_",
];

// ════════════════════════════════════════════════════════════════════════════
// PROPS
// ════════════════════════════════════════════════════════════════════════════
interface Props {
  onKeyPress?: (key: string) => void;
}

// ════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ════════════════════════════════════════════════════════════════════════════
export default function RetroTerminalForm({ onKeyPress }: Props) {
  const [phase, setPhase] = useState<"boot" | "form" | "sending" | "sent" | "error">("boot");
  const [bootIdx, setBootIdx] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // ── boot timer ──
  useEffect(() => {
    if (phase !== "boot") return;
    if (bootIdx >= BOOT.length) {
      const t = setTimeout(() => {
        setPhase("form");
        setTimeout(() => nameRef.current?.focus(), 100);
      }, 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setBootIdx((i) => i + 1), 200 + Math.random() * 200);
    return () => clearTimeout(t);
  }, [phase, bootIdx]);

  // ── auto-scroll ──
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
  }, [bootIdx, phase, name, email, msg]);

  // ── key propagation ──
  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      onKeyPress?.(e.key);
    },
    [onKeyPress],
  );

  // ── submit ──
  const submit = useCallback(async () => {
    if (!name.trim() || !email.trim() || !msg.trim()) return;
    setPhase("sending");
    try {
      const sid = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const tid = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (sid && tid && pk) {
        const ejs = await import("@emailjs/browser");
        await ejs.send(sid, tid, { from_name: name, from_email: email, message: msg }, pk);
      } else {
        window.location.href = `mailto:anbumalligarjun1@gmail.com?subject=${encodeURIComponent("Contact from " + name)}&body=${encodeURIComponent(msg + "\n\nFrom: " + email)}`;
      }
      setPhase("sent");
    } catch {
      setPhase("error");
      setTimeout(() => setPhase("form"), 3000);
    }
  }, [name, email, msg]);

  // ═══════════════════ shared inline styles ═══════════════════
  const txt: React.CSSProperties = {
    fontFamily: FONT,
    fontSize: 14,
    lineHeight: 1.6,
    color: GREEN,
    textShadow: `0 0 6px rgba(51,255,51,0.5)`,
  };

  const inputStyle: React.CSSProperties = {
    ...txt,
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${DIM}`,
    outline: "none",
    width: "100%",
    padding: "2px 0",
    caretColor: GREEN,
    marginTop: 2,
  };

  // ═══════════════════ RENDER ═══════════════════
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: BG,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: FONT,
        color: GREEN,
        position: "relative",
        // scanlines
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0px, transparent 1px, transparent 3px)",
        backgroundSize: "100% 3px",
      }}
    >
      {/* ─── TITLE BAR ─── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "3px 8px",
          background: "#0d1f0d",
          borderBottom: `1px solid ${DIM}`,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: 4 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        </div>
        <span style={{ ...txt, fontSize: 10, letterSpacing: 1.5, color: DIM }}>
          CONTACT.EXE
        </span>
        <span style={{ ...txt, fontSize: 9, color: DIM }}>v2.0</span>
      </div>

      {/* ─── BODY ─── */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "6px 8px",
          ...txt,
        }}
      >
        {/* Boot lines */}
        {BOOT.slice(0, bootIdx).map((l, i) => (
          <div key={i}>
            <span style={{ color: DIM }}>{">"}</span> {l}
          </div>
        ))}

        {/* ─── FORM ─── */}
        {phase === "form" && (
          <div style={{ marginTop: 6 }}>
            <div style={{ color: DIM, margin: "4px 0" }}>
              ─────────────────────────────
            </div>

            {/* NAME */}
            <div style={{ marginBottom: 6 }}>
              <label style={{ color: AMBER, textShadow: `0 0 4px rgba(255,176,0,0.4)` }}>
                NAME{" "}
                <span style={{ color: DIM }}>{">"}</span>
              </label>
              <input
                ref={nameRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={onKey}
                placeholder="your name"
                style={inputStyle}
              />
            </div>

            {/* EMAIL */}
            <div style={{ marginBottom: 6 }}>
              <label style={{ color: AMBER, textShadow: `0 0 4px rgba(255,176,0,0.4)` }}>
                EMAIL{" "}
                <span style={{ color: DIM }}>{">"}</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={onKey}
                placeholder="you@example.com"
                style={inputStyle}
              />
            </div>

            {/* MESSAGE */}
            <div style={{ marginBottom: 8 }}>
              <label style={{ color: AMBER, textShadow: `0 0 4px rgba(255,176,0,0.4)` }}>
                MSG{" "}
                <span style={{ color: DIM }}>{">"}</span>
              </label>
              <textarea
                rows={3}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={onKey}
                placeholder="type your message..."
                style={{
                  ...inputStyle,
                  resize: "none",
                  display: "block",
                  marginTop: 2,
                }}
              />
            </div>

            {/* TRANSMIT */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                submit();
              }}
              disabled={!name || !email || !msg}
              style={{
                ...txt,
                background: "rgba(51,255,51,0.08)",
                border: `1px solid ${DIM}`,
                padding: "4px 16px",
                cursor: !name || !email || !msg ? "not-allowed" : "pointer",
                opacity: !name || !email || !msg ? 0.35 : 1,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (name && email && msg) {
                  e.currentTarget.style.background = "rgba(51,255,51,0.2)";
                  e.currentTarget.style.borderColor = GREEN;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(51,255,51,0.08)";
                e.currentTarget.style.borderColor = DIM;
              }}
            >
              [ TRANSMIT ]
            </button>
          </div>
        )}

        {/* SENDING */}
        {phase === "sending" && (
          <div style={{ marginTop: 8, animation: "rtf-p 1s infinite" }}>
            <div><span style={{ color: DIM }}>{">"}</span> Establishing secure channel...</div>
            <div><span style={{ color: DIM }}>{">"}</span> Encrypting payload...</div>
            <div><span style={{ color: DIM }}>{">"}</span> Transmitting...</div>
          </div>
        )}

        {/* SENT */}
        {phase === "sent" && (
          <div style={{ marginTop: 8 }}>
            <div><span style={{ color: DIM }}>{">"}</span> <span style={{ color: GREEN }}>✓ MESSAGE TRANSMITTED SUCCESSFULLY</span></div>
            <div style={{ color: DIM }}>{">"} Awaiting response from Anbu...</div>
          </div>
        )}

        {/* ERROR */}
        {phase === "error" && (
          <div style={{ marginTop: 8, color: "#ff4444", textShadow: "0 0 6px rgba(255,68,68,0.5)" }}>
            {">"} ✗ TRANSMISSION FAILED — retrying...
          </div>
        )}

        {/* CURSOR */}
        {phase !== "boot" && (
          <div style={{ marginTop: 4 }}>
            <span style={{ color: DIM }}>{">"}</span>{" "}
            <span style={{ animation: "rtf-b 1s step-end infinite" }}>█</span>
          </div>
        )}
      </div>

      {/* ─── STATUS BAR ─── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2px 8px",
          background: "#0d1f0d",
          borderTop: `1px solid ${DIM}`,
          flexShrink: 0,
          ...txt,
          fontSize: 9,
          color: DIM,
        }}
      >
        <span>{phase === "form" ? "READY" : phase === "boot" ? "LOADING" : phase.toUpperCase()}</span>
        <span>UTF-8 | LF</span>
      </div>

      <style>{`
        @keyframes rtf-b { 50% { opacity:0 } }
        @keyframes rtf-p { 0%,100%{opacity:1} 50%{opacity:0.4} }
        input::placeholder, textarea::placeholder {
          color: rgba(51,255,51,0.2) !important;
          font-family: ${FONT};
        }
      `}</style>
    </div>
  );
}