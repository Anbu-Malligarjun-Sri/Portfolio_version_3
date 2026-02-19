"use client";

import React, {
  useRef,
  useState,
  useEffect,
  Suspense,
  useCallback,
  useMemo,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Html,
  Environment,
  Sparkles,
  RoundedBox,
  OrbitControls,
  Text,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════════
 * CONSTANTS
 * ═══════════════════════════════════════════════════════════════════ */

const IMAC_BLUE = "#3dadd6";
const IMAC_BLUE_DARK = "#2a8ab5";
const BEZEL_DARK = "#111111";
const KEY_WHITE = "#f0ede6";
const KEY_SPECIAL = "#dad5ca";

const KEY_SIZE = 0.068;
const KEY_GAP = 0.074;

/* ═══════════════════════════════════════════════════════════════════
 * KEY — lightweight RoundedBox + SDF Text
 * ═══════════════════════════════════════════════════════════════════ */

interface KeyProps {
  position: [number, number, number];
  label: string;
  width?: number;
  depth?: number;
  isPressed: boolean;
  isSpecial?: boolean;
}

const Key: React.FC<KeyProps> = ({
  position,
  label,
  width = KEY_SIZE,
  depth = KEY_SIZE,
  isPressed,
  isSpecial = false,
}) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!ref.current) return;
    const target = isPressed ? -0.01 : 0;
    ref.current.position.y += (target - ref.current.position.y) * 0.3;
  });

  return (
    <group position={position}>
      <group ref={ref}>
        {/* Key cap */}
        <RoundedBox
          args={[width - 0.005, 0.018, depth - 0.005]}
          radius={0.004}
          smoothness={3}
          position={[0, 0.01, 0]}
          castShadow
        >
          <meshPhysicalMaterial
            color={isSpecial ? KEY_SPECIAL : KEY_WHITE}
            roughness={0.4}
            metalness={0.02}
            clearcoat={0.15}
            clearcoatRoughness={0.4}
          />
        </RoundedBox>
        {/* Key stem */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[width * 0.5, 0.008, depth * 0.5]} />
          <meshStandardMaterial color="#c8c3b8" roughness={0.8} />
        </mesh>
        {label.length <= 2 && (
          <Text
            position={[0, 0.021, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.019}
            color="#555"
            anchorX="center"
            anchorY="middle"
            font={undefined}
          >
            {label}
          </Text>
        )}
      </group>
    </group>
  );
};

/* ═══════════════════════════════════════════════════════════════════
 * KEYBOARD — centered rows, proper alignment
 * ═══════════════════════════════════════════════════════════════════ */

interface KeyboardProps {
  pressedKeys: Set<string>;
}

const ROWS: { keys: string[]; stagger: number }[] = [
  { keys: ["1","2","3","4","5","6","7","8","9","0","-","="], stagger: 0 },
  { keys: ["Q","W","E","R","T","Y","U","I","O","P"], stagger: 0 },
  { keys: ["A","S","D","F","G","H","J","K","L"], stagger: 0 },
  { keys: ["Z","X","C","V","B","N","M"], stagger: 0 },
];

const Keyboard: React.FC<KeyboardProps> = ({ pressedKeys }) => {
  const kbWidth = 1.0;
  const kbDepth = 0.42;

  return (
    <group position={[0, 0.025, 0.48]}>
      {/* Base plate */}
      <RoundedBox
        args={[kbWidth, 0.028, kbDepth]}
        radius={0.012}
        smoothness={4}
        receiveShadow
        castShadow
      >
        <meshPhysicalMaterial
          color="#d4ccb8"
          roughness={0.42}
          metalness={0.06}
          clearcoat={0.3}
          clearcoatRoughness={0.25}
        />
      </RoundedBox>

      {/* Recessed key area */}
      <mesh position={[0, 0.015, 0]} receiveShadow>
        <boxGeometry args={[kbWidth - 0.06, 0.002, kbDepth - 0.04]} />
        <meshStandardMaterial color="#ccc5b4" roughness={0.6} />
      </mesh>

      {/* Keys — all rows centered horizontally */}
      {ROWS.map((row, ri) => {
        const rowWidth = row.keys.length * KEY_GAP;
        const startX = -rowWidth / 2 + KEY_GAP / 2;
        const z = (ri - 1.5) * KEY_GAP;
        return row.keys.map((key, ki) => (
          <Key
            key={`${ri}-${ki}`}
            position={[startX + ki * KEY_GAP, 0.015, z]}
            label={key}
            isPressed={pressedKeys.has(key.toLowerCase())}
          />
        ));
      })}

      {/* Spacebar — centered */}
      <Key
        position={[0, 0.015, 1.5 * KEY_GAP + KEY_GAP / 2]}
        label=""
        width={0.32}
        depth={KEY_SIZE}
        isPressed={pressedKeys.has(" ")}
      />

      {/* Modifier keys beside spacebar */}
      <Key position={[-0.24, 0.015, 1.5 * KEY_GAP + KEY_GAP / 2]} label="fn" width={0.08} depth={KEY_SIZE} isPressed={false} isSpecial />
      <Key position={[0.24, 0.015, 1.5 * KEY_GAP + KEY_GAP / 2]} label="ret" width={0.08} depth={KEY_SIZE} isPressed={false} isSpecial />

      {/* Slight front-lip */}
      <mesh position={[0, 0.003, kbDepth / 2 + 0.004]}>
        <boxGeometry args={[kbWidth - 0.01, 0.01, 0.008]} />
        <meshStandardMaterial color="#c8c0ad" roughness={0.5} />
      </mesh>
    </group>
  );
};

/* ═══════════════════════════════════════════════════════════════════
 * iMAC G3 MONITOR — rounded shell, flush bezel, tight screen
 * ═══════════════════════════════════════════════════════════════════ */

interface MonitorProps {
  children?: React.ReactNode;
}

// screenW and screenH are the 3D plane sizes in world units.
// distanceFactor is tuned so the HTML div fills the screen exactly.
// Screen AR = screenW / screenH = 0.80 / 0.60 = 1.333 (matches 480/360 px)
const SCREEN_W = 0.80;
const SCREEN_H = 0.60;
// HTML canvas will be 480 × 360 px — perfectly fills the 3D screen plane
const HTML_W = 480;
const HTML_H = 360;
// distanceFactor: pixels per world unit at unit camera distance.
// Drei scales: screen_world = html_px / distanceFactor
// We want SCREEN_W = HTML_W / distanceFactor → distanceFactor = HTML_W / SCREEN_W
const DIST_FACTOR = HTML_W / SCREEN_W; // = 600

const Monitor: React.FC<MonitorProps> = ({ children }) => {
  const screenRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (screenRef.current && screenRef.current.material instanceof THREE.MeshStandardMaterial) {
      screenRef.current.material.emissiveIntensity = 0.28 + Math.sin(t * 1.2) * 0.05;
    }
    if (glowRef.current) {
      glowRef.current.intensity = 0.35 + Math.sin(t * 1.2) * 0.07;
    }
  });

  const shellMat = useMemo(
    () => ({
      color: IMAC_BLUE,
      roughness: 0.18,
      metalness: 0.0,
      transparent: true,
      opacity: 0.42,
      envMapIntensity: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      side: THREE.DoubleSide as THREE.Side,
    }),
    []
  );

  // All positions relative to this group's origin (screen center = y:0, z:0.18)
  return (
    <group position={[0, 0.52, -0.04]}>
      {/* ── Outer iMac G3 shell ── */}
      <RoundedBox args={[1.05, 0.88, 0.44]} radius={0.1} smoothness={5} position={[0, 0, -0.02]} castShadow receiveShadow>
        <meshPhysicalMaterial {...shellMat} />
      </RoundedBox>

      {/* Shell inner back-fill — opaque so HTML never shows through the back */}
      <RoundedBox args={[0.98, 0.82, 0.38]} radius={0.08} smoothness={4} position={[0, 0, -0.02]}>
        <meshPhysicalMaterial color="#071018" roughness={0.6} metalness={0.0} side={THREE.BackSide} />
      </RoundedBox>

      {/* ── Dark bezel ── */}
      <RoundedBox args={[0.94, 0.76, 0.04]} radius={0.03} smoothness={4} position={[0, 0, 0.155]} castShadow>
        <meshStandardMaterial color={BEZEL_DARK} roughness={0.85} metalness={0.15} />
      </RoundedBox>

      {/* ── Black screen background (behind HTML) ── */}
      <mesh position={[0, 0, 0.172]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial color="#010408" />
      </mesh>

      {/* ── Screen emissive surface ── */}
      <mesh ref={screenRef} position={[0, 0, 0.174]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshStandardMaterial color="#010408" roughness={0.05} metalness={0.6} emissive="#0d2550" emissiveIntensity={0.28} transparent opacity={0.35} />
      </mesh>

      {/* Screen bevel ring */}
      <mesh position={[0, 0, 0.171]}>
        <planeGeometry args={[SCREEN_W + 0.025, SCREEN_H + 0.025]} />
        <meshBasicMaterial color="#050b16" />
      </mesh>

      {/* CRT glow */}
      <pointLight ref={glowRef} position={[0, 0, 0.65]} intensity={0.35} color="#4fb8e8" distance={1.8} decay={2} />

      {/* ── HTML form — centered exactly on screen ── */}
      <Html
        transform
        occlude
        distanceFactor={DIST_FACTOR}
        position={[0, 0, 0.18]}
        center
      >
        <div
          style={{
            width: `${HTML_W}px`,
            height: `${HTML_H}px`,
            overflow: "hidden",
            background: "#010408",
            pointerEvents: "auto",
            transformOrigin: "center center",
          }}
        >
          {children}
        </div>
      </Html>

      {/* ── Stand: conical neck ── */}
      <mesh position={[0, -0.5, 0.02]} castShadow>
        <cylinderGeometry args={[0.048, 0.09, 0.2, 32]} />
        <meshPhysicalMaterial
          color={IMAC_BLUE}
          roughness={0.2}
          metalness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* ── Stand: elegant elliptical base ── */}
      <group position={[0, -0.61, 0.02]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.3, 0.035, 48]} />
          <meshPhysicalMaterial
            color={IMAC_BLUE}
            roughness={0.22}
            metalness={0.08}
            clearcoat={0.7}
            clearcoatRoughness={0.12}
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Base ring accent */}
        <mesh position={[0, 0.018, 0]}>
          <torusGeometry args={[0.27, 0.004, 12, 48]} />
          <meshStandardMaterial color="#fff" metalness={0.9} roughness={0.15} transparent opacity={0.25} />
        </mesh>
      </group>

      {/* ── Apple-style logo dot ── */}
      <mesh position={[0, -0.32, 0.175]}>
        <circleGeometry args={[0.02, 32]} />
        <meshStandardMaterial
          color="#eee"
          metalness={0.95}
          roughness={0.08}
          emissive="#fff"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* ── Top vent slots ── */}
      {[-0.2, -0.1, 0, 0.1, 0.2].map((x, i) => (
        <mesh key={`vent-${i}`} position={[x, 0.38, -0.05]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[0.035, 0.006, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
        </mesh>
      ))}

      {/* ── Carry handle ── */}
      <mesh position={[0, 0.38, -0.18]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.1, 0.016, 12, 24, Math.PI]} />
        <meshPhysicalMaterial
          color={IMAC_BLUE}
          roughness={0.25}
          metalness={0.08}
          clearcoat={0.6}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
};

/* ═══════════════════════════════════════════════════════════════════
 * MOUSE — proportioned, subtle pad
 * ═══════════════════════════════════════════════════════════════════ */

const MouseDevice: React.FC = () => (
  <group position={[0.56, 0.035, 0.52]} rotation={[0, -0.15, 0]}>
    {/* Mouse body */}
    <RoundedBox args={[0.065, 0.025, 0.09]} radius={0.012} smoothness={4} castShadow>
      <meshPhysicalMaterial
        color="#f0ece4"
        roughness={0.22}
        metalness={0.04}
        clearcoat={0.6}
        clearcoatRoughness={0.15}
      />
    </RoundedBox>
    {/* Click divider */}
    <mesh position={[0, 0.014, -0.01]}>
      <boxGeometry args={[0.05, 0.001, 0.001]} />
      <meshStandardMaterial color="#c0c0c0" roughness={0.5} />
    </mesh>
    {/* Cable */}
    <mesh position={[0, 0.004, -0.1]} rotation={[-0.2, 0, 0]}>
      <cylinderGeometry args={[0.0025, 0.0025, 0.14, 8]} />
      <meshStandardMaterial color="#a0a0a0" roughness={0.65} />
    </mesh>
    {/* Mousepad — subtle  */}
    <RoundedBox args={[0.18, 0.002, 0.22]} radius={0.02} smoothness={3} position={[0, -0.013, 0]} receiveShadow>
      <meshStandardMaterial color="#1a1a22" roughness={0.98} metalness={0.0} />
    </RoundedBox>
  </group>
);

/* ═══════════════════════════════════════════════════════════════════
 * DESK — dark charcoal, clean edge
 * ═══════════════════════════════════════════════════════════════════ */

const Desk: React.FC = () => (
  <group position={[0, -0.02, 0.18]}>
    {/* Desktop surface */}
    <RoundedBox args={[2.4, 0.05, 1.4]} radius={0.015} smoothness={4} receiveShadow castShadow>
      <meshPhysicalMaterial
        color="#1e1e24"
        roughness={0.5}
        metalness={0.12}
        clearcoat={0.35}
        clearcoatRoughness={0.3}
      />
    </RoundedBox>
    {/* Subtle front edge chamfer */}
    <mesh position={[0, -0.015, 0.7]} receiveShadow>
      <boxGeometry args={[2.38, 0.02, 0.006]} />
      <meshStandardMaterial color="#2a2a30" roughness={0.6} metalness={0.1} />
    </mesh>
  </group>
);

/* ═══════════════════════════════════════════════════════════════════
 * SMALL DESK ACCESSORIES (professional touches)
 * ═══════════════════════════════════════════════════════════════════ */

const DeskAccessories: React.FC = () => (
  <group>
    {/* Small pencil holder on the left */}
    <group position={[-0.68, 0.06, 0.35]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.032, 0.035, 0.08, 16]} />
        <meshPhysicalMaterial color="#2a2a30" roughness={0.5} metalness={0.2} clearcoat={0.3} />
      </mesh>
      {/* Pen */}
      <mesh position={[0.008, 0.06, 0]} rotation={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.003, 0.003, 0.1, 8]} />
        <meshStandardMaterial color="#444" roughness={0.4} />
      </mesh>
      <mesh position={[-0.005, 0.055, 0.005]} rotation={[0, 0, -0.12]}>
        <cylinderGeometry args={[0.003, 0.003, 0.09, 8]} />
        <meshStandardMaterial color="#8b4513" roughness={0.6} />
      </mesh>
    </group>

    {/* Small coaster on the right */}
    <mesh position={[-0.55, 0.01, 0.58]} castShadow receiveShadow>
      <cylinderGeometry args={[0.06, 0.06, 0.006, 24]} />
      <meshStandardMaterial color="#3a3a3a" roughness={0.8} metalness={0.05} />
    </mesh>
  </group>
);

/* ═══════════════════════════════════════════════════════════════════
 * CONTACT FORM — creative, fills screen edge-to-edge (440 × 324 px)
 * ═══════════════════════════════════════════════════════════════════ */

interface ContactFormProps {
  onKeyPress: (key: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onKeyPress, onFocus, onBlur }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    onKeyPress(e.key);
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    height: "30px",
    background: focused === field ? "rgba(14,28,60,0.95)" : "rgba(8,16,36,0.85)",
    border: `1px solid ${focused === field ? "rgba(96,165,250,0.55)" : "rgba(79,184,232,0.18)"}`,
    borderRadius: "5px",
    color: "#e2edff",
    fontSize: "11px",
    fontFamily: "'SF Mono','JetBrains Mono','Fira Code',monospace",
    padding: "0 10px",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    boxSizing: "border-box",
    boxShadow: focused === field ? "0 0 0 2px rgba(96,165,250,0.1),inset 0 1px 3px rgba(0,0,0,0.4)" : "inset 0 1px 3px rgba(0,0,0,0.3)",
  });

  const labelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "8.5px",
    letterSpacing: "0.14em",
    color: "#60a5fa",
    marginBottom: "4px",
    fontFamily: "'SF Mono','JetBrains Mono',monospace",
    fontWeight: 600,
    textTransform: "uppercase" as const,
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
      setIsSubmitting(true);
      try {
        const sid = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const tid = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
        if (sid && tid && pk) {
          const ejs = await import("@emailjs/browser");
          await ejs.send(sid, tid, { from_name: formData.name, from_email: formData.email, message: formData.message }, pk);
        } else {
          window.location.href = `mailto:anbumalligarjun1@gmail.com?subject=${encodeURIComponent("Contact from " + formData.name)}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.email)}`;
        }
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setTimeout(() => { setSubmitSuccess(false); setFormData({ name: "", email: "", message: "" }); setCharCount(0); }, 3500);
      } catch {
        setIsSubmitting(false);
        window.location.href = `mailto:anbumalligarjun1@gmail.com?subject=${encodeURIComponent("Contact from " + formData.name)}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.email)}`;
      }
    },
    [formData]
  );

  if (submitSuccess) {
    return (
      <div style={{ width: `${HTML_W}px`, height: `${HTML_H}px`, background: "linear-gradient(135deg, #020a14 0%, #061422 40%, #020810 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'SF Mono','JetBrains Mono',monospace", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,148,0.012) 3px,rgba(0,255,148,0.012) 4px)", pointerEvents: "none" }} />
        <div style={{ fontSize: "38px", marginBottom: "10px" }}>✦</div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#4ade80", letterSpacing: "0.15em", marginBottom: "6px" }}>TRANSMITTED</div>
        <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>Message received · Will respond shortly</div>
        <div style={{ position: "absolute", bottom: "14px", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "5px" }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", opacity: 0.5, animation: `blink 1.2s ${i*0.4}s infinite` }} />)}
        </div>
        <style dangerouslySetInnerHTML={{ __html: `@keyframes blink{0%,100%{opacity:.15}50%{opacity:.8}}` }} />
      </div>
    );
  }

  return (
    <div
      onPointerDown={(e) => { e.stopPropagation(); onFocus?.(); }}
      onPointerLeave={() => onBlur?.()}
      style={{
        width: `${HTML_W}px`,
        height: `${HTML_H}px`,
        background: "linear-gradient(145deg, #020a18 0%, #080f20 55%, #04091a 100%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "'SF Mono','JetBrains Mono','Fira Code',monospace",
        userSelect: "none",
      }}
    >
      {/* Scanlines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.055) 3px,rgba(0,0,0,0.055) 4px)" }} />
      {/* Vignette */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
      {/* Top accent bar */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #3b82f6 30%, #8b5cf6 70%, transparent)", flexShrink: 0, zIndex: 3 }} />

      {/* Header strip */}
      <div style={{ padding: "9px 16px 7px", flexShrink: 0, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(59,130,246,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Traffic lights */}
          {["#ff5f57","#febc2e","#28c840"].map((c,i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c, boxShadow: `0 0 4px ${c}66` }} />)}
        </div>
        <div style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(148,163,184,0.6)", fontWeight: 500 }}>SECURE CHANNEL</div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 5px rgba(74,222,128,0.6)" }} />
          <span style={{ fontSize: "8px", color: "rgba(74,222,128,0.8)", letterSpacing: "0.1em" }}>LIVE</span>
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", padding: "8px 16px 6px", flexShrink: 0, zIndex: 3 }}>
        <div style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "0.06em", background: "linear-gradient(90deg,#60a5fa,#818cf8,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2 }}>CONTACT TERMINAL</div>
        <div style={{ fontSize: "8px", color: "rgba(100,116,139,0.7)", letterSpacing: "0.18em", marginTop: "2px" }}>v2.4.1 — ENCRYPTED</div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex", flexDirection: "column", padding: "4px 14px 10px", gap: "8px", minHeight: 0, zIndex: 3 }}>

        {/* Name */}
        <div style={{ flexShrink: 0 }}>
          <div style={labelStyle}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><circle cx="4" cy="4" r="3" stroke="#60a5fa" strokeWidth="1.2"/><circle cx="4" cy="4" r="1.2" fill="#60a5fa"/></svg>
            IDENTIFIER
          </div>
          <input
            id="cf-name" type="text" required
            value={formData.name}
            onChange={e => setFormData(p => ({...p, name: e.target.value}))}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            style={inputStyle("name")}
            placeholder="Your full name"
          />
        </div>

        {/* Email */}
        <div style={{ flexShrink: 0 }}>
          <div style={labelStyle}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><rect x="0.6" y="1.6" width="6.8" height="4.8" rx="0.8" stroke="#60a5fa" strokeWidth="1"/><path d="M0.6 2.4L4 4.6L7.4 2.4" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round"/></svg>
            COMM CHANNEL
          </div>
          <input
            id="cf-email" type="email" required
            value={formData.email}
            onChange={e => setFormData(p => ({...p, email: e.target.value}))}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            style={inputStyle("email")}
            placeholder="your@email.com"
          />
        </div>

        {/* Message */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ ...labelStyle, justifyContent: "space-between" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><rect x="0.6" y="0.6" width="6.8" height="6.8" rx="0.8" stroke="#60a5fa" strokeWidth="1"/><line x1="2" y1="2.8" x2="6" y2="2.8" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round"/><line x1="2" y1="4.4" x2="5" y2="4.4" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round"/></svg>
              MESSAGE
            </span>
            <span style={{ fontSize: "7.5px", color: charCount > 180 ? "#f87171" : "rgba(100,116,139,0.5)" }}>{charCount}/200</span>
          </div>
          <textarea
            id="cf-msg" required
            value={formData.message}
            onChange={e => { const v = e.target.value.slice(0,200); setFormData(p=>({...p,message:v})); setCharCount(v.length); }}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused("msg")}
            onBlur={() => setFocused(null)}
            placeholder="Write your message here..."
            style={{
              ...inputStyle("msg"),
              height: "auto",
              flex: 1,
              minHeight: "52px",
              padding: "8px 10px",
              resize: "none",
              lineHeight: 1.55,
              verticalAlign: "top",
            }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            flexShrink: 0,
            height: "32px",
            width: "100%",
            background: isSubmitting ? "rgba(59,130,246,0.25)" : "linear-gradient(90deg, #1d4ed8 0%, #6d28d9 100%)",
            border: "1px solid rgba(99,102,241,0.45)",
            borderRadius: "6px",
            color: "#e0e7ff",
            fontSize: "10.5px",
            fontWeight: 700,
            fontFamily: "'SF Mono','JetBrains Mono',monospace",
            letterSpacing: "0.14em",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            boxShadow: "0 2px 12px -2px rgba(99,102,241,0.45)",
            transition: "opacity 0.2s",
            opacity: isSubmitting ? 0.6 : 1,
          }}
        >
          {isSubmitting ? (
            <>
              <span style={{ width: 11, height: 11, border: "2px solid rgba(255,255,255,0.25)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.75s linear infinite" }} />
              TRANSMITTING
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6L11 6M7 2L11 6L7 10" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              SEND MESSAGE
            </>
          )}
        </button>
      </form>

      {/* Bottom bar */}
      <div style={{ height: "1.5px", background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.35) 30%, rgba(139,92,246,0.35) 70%, transparent)", flexShrink: 0, zIndex: 3 }} />

      <style dangerouslySetInnerHTML={{ __html: `@keyframes spin{to{transform:rotate(360deg)}}` }} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
 * SCENE — cinematic lighting, tight composition
 * ═══════════════════════════════════════════════════════════════════ */

interface SceneProps {
  onFormFocus: () => void;
  onFormBlur: () => void;
}

const Scene: React.FC<SceneProps> = ({ onFormFocus, onFormBlur }) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [autoRotate, setAutoRotate] = useState(true);

  const handleFormFocus = useCallback(() => {
    setAutoRotate(false);
    onFormFocus();
  }, [onFormFocus]);

  const handleFormBlur = useCallback(() => {
    setAutoRotate(true);
    onFormBlur();
  }, [onFormBlur]);

  const handleKeyPress = useCallback((key: string) => {
    const k = key.toLowerCase();
    setPressedKeys((prev) => new Set(prev).add(k));
    setTimeout(() => {
      setPressedKeys((prev) => { const n = new Set(prev); n.delete(k); return n; });
    }, 120);
  }, []);

  return (
    <>
      <color attach="background" args={["#06070c"]} />
      <fog attach="fog" args={["#06070c", 3.5, 12]} />

      {/* Key light — warm from top-right */}
      <directionalLight
        position={[3, 6, 3]}
        intensity={1.4}
        color="#fff0e0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={12}
        shadow-camera-left={-2.5}
        shadow-camera-right={2.5}
        shadow-camera-top={2.5}
        shadow-camera-bottom={-2.5}
        shadow-bias={-0.0003}
      />

      {/* Fill light — cool from left */}
      <directionalLight position={[-3, 2, 1]} intensity={0.35} color="#6db3e0" />

      {/* Ambient — very subtle */}
      <ambientLight intensity={0.2} color="#c8d4e8" />

      {/* Accent lights */}
      <pointLight position={[2.5, 1.5, -2]} intensity={0.2} color="#d68a5a" decay={2} distance={6} />
      <pointLight position={[-2, 2, 2]} intensity={0.15} color="#5aa4d6" decay={2} distance={5} />

      {/* Rim/back light for depth separation */}
      <spotLight
        position={[0, 3.5, -3]}
        angle={0.5}
        penumbra={0.8}
        intensity={0.8}
        color="#6366f1"
        castShadow={false}
        target-position={[0, 0.5, 0]}
      />

      <Environment preset="city" />

      <PerspectiveCamera makeDefault position={[0, 0.52, 2.5]} fov={36} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={1.8}
        maxDistance={4.5}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={0.3}
        autoRotate={autoRotate}
        autoRotateSpeed={0.3}
        target={[0, 0.4, 0]}
      />

      <Desk />
      <DeskAccessories />
      <Monitor>
        <ContactForm onKeyPress={handleKeyPress} onFocus={handleFormFocus} onBlur={handleFormBlur} />
      </Monitor>
      <Keyboard pressedKeys={pressedKeys} />
      <MouseDevice />

      <Sparkles count={30} scale={[6, 3, 6]} size={0.6} speed={0.06} opacity={0.15} color="#5aa4d6" />
      <ContactShadows position={[0, -0.05, 0.18]} opacity={0.5} scale={5} blur={2.8} far={3.5} color="#0a0a1a" />
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════
 * LOADING FALLBACK
 * ═══════════════════════════════════════════════════════════════════ */

const LoadingFallback: React.FC = () => (
  <div className="absolute inset-0 z-10 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-14 w-14">
        <svg className="h-14 w-14 animate-spin" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(79,184,232,0.12)" strokeWidth="2" />
          <circle cx="32" cy="32" r="28" fill="none" stroke="url(#lg)" strokeWidth="2" strokeLinecap="round" strokeDasharray="44 132" transform="rotate(-90 32 32)" />
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4fb8e8" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25">Initializing</p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
 * EXPORT
 * ═══════════════════════════════════════════════════════════════════ */

export default function RetroComputerContact(): React.ReactElement {
  const [mounted, setMounted] = useState(false);
  const [formFocused, setFormFocused] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="relative h-150 w-full rounded-2xl lg:h-175" style={{ backgroundColor: "#06070c" }}>
        <LoadingFallback />
      </div>
    );
  }

  return (
    <div className="relative h-150 w-full overflow-hidden rounded-2xl border border-white/5 lg:h-175" style={{ backgroundColor: "#06070c" }}>
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(6,7,12,0.6) 100%)" }} />

      <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <Scene
            onFormFocus={() => setFormFocused(true)}
            onFormBlur={() => setFormFocused(false)}
          />
        </Suspense>
      </Canvas>

      {/* HUD badge */}
      <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-lg px-3 py-1.5 backdrop-blur-sm" style={{ backgroundColor: "rgba(6,7,12,0.8)", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.5)" }} />
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/25">Interactive 3D</span>
      </div>

      {/* Instruction pill */}
      <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full px-5 py-2 backdrop-blur-sm" style={{ backgroundColor: "rgba(6,7,12,0.8)", border: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-center font-mono text-[10px] text-white/25">Click form to type &bull; Drag to orbit &bull; Scroll to zoom</p>
      </div>
    </div>
  );
}
