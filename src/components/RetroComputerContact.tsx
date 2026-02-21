"use client";

import React, {
  useRef,
  useState,
  useEffect,
  Suspense,
  useCallback,
  useMemo,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  PerspectiveCamera,
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
    // FIX: animate Y relative to base — use local position, not world
    const target = isPressed ? -0.008 : 0;
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
        {/* FIX: show label for all short labels, including special keys like fn/ret */}
        {label.length > 0 && label.length <= 3 && (
          <Text
            position={[0, 0.021, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.018}
            color="#555"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        )}
      </group>
    </group>
  );
};

/* ═══════════════════════════════════════════════════════════════════
 * KEYBOARD
 * FIX: Added proper row staggering (each row offset like a real keyboard),
 *      added more key rows (numbers, modifiers), and applied stagger values.
 * ═══════════════════════════════════════════════════════════════════ */

interface KeyboardProps {
  pressedKeys: Set<string>;
}

// FIX: stagger is now actually used — it offsets each row left/right like a real keyboard
const ROWS: { keys: string[]; stagger: number; rowLabel: string }[] = [
  { keys: ["1","2","3","4","5","6","7","8","9","0","-","="], stagger: 0,     rowLabel: "numbers" },
  { keys: ["Q","W","E","R","T","Y","U","I","O","P","[","]"], stagger: 0.037, rowLabel: "top"     },
  { keys: ["A","S","D","F","G","H","J","K","L",";","'"],     stagger: 0.055, rowLabel: "home"    },
  { keys: ["Z","X","C","V","B","N","M",",",".","/"],          stagger: 0.074, rowLabel: "bottom"  },
];

const Keyboard: React.FC<KeyboardProps> = ({ pressedKeys }) => {
  const kbWidth = 1.08;
  const kbDepth = 0.44;

  return (
    <group position={[0, 0.025, 0.5]}>
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

      {/* FIX: Apply stagger offset per row so keys align like a real keyboard */}
      {ROWS.map((row, ri) => {
        const rowWidth = row.keys.length * KEY_GAP;
        // FIX: stagger shifts the starting X of each row to the right
        const startX = -rowWidth / 2 + KEY_GAP / 2 + row.stagger;
        // distribute rows evenly in Z, from back to front
        const totalRows = ROWS.length;
        const z = (ri - (totalRows - 1) / 2) * KEY_GAP;
        return row.keys.map((key, ki) => (
          <Key
            key={`${ri}-${ki}`}
            position={[startX + ki * KEY_GAP, 0.015, z]}
            label={key}
            isPressed={pressedKeys.has(key.toLowerCase())}
          />
        ));
      })}

      {/* Spacebar row — centered below bottom row */}
      {(() => {
        const bottomRowZ = ((ROWS.length - 1) - (ROWS.length - 1) / 2) * KEY_GAP;
        const spacebarZ = bottomRowZ + KEY_GAP;
        return (
          <>
            {/* Left modifiers */}
            <Key position={[-0.44, 0.015, spacebarZ]} label="ctrl" width={0.082} depth={KEY_SIZE} isPressed={pressedKeys.has("control")} isSpecial />
            <Key position={[-0.35, 0.015, spacebarZ]} label="opt"  width={0.082} depth={KEY_SIZE} isPressed={pressedKeys.has("alt")}     isSpecial />
            <Key position={[-0.26, 0.015, spacebarZ]} label="cmd"  width={0.082} depth={KEY_SIZE} isPressed={pressedKeys.has("meta")}    isSpecial />
            {/* Spacebar */}
            <Key position={[0.03, 0.015, spacebarZ]}  label=""     width={0.30}  depth={KEY_SIZE} isPressed={pressedKeys.has(" ")} />
            {/* Right modifiers */}
            <Key position={[0.22, 0.015, spacebarZ]}  label="cmd"  width={0.082} depth={KEY_SIZE} isPressed={pressedKeys.has("meta")}  isSpecial />
            <Key position={[0.31, 0.015, spacebarZ]}  label="opt"  width={0.082} depth={KEY_SIZE} isPressed={pressedKeys.has("alt")}   isSpecial />
            <Key position={[0.40, 0.015, spacebarZ]}  label="fn"   width={0.082} depth={KEY_SIZE} isPressed={false}                    isSpecial />
          </>
        );
      })()}

      {/* Top row: Tab, Caps, Shift, Backspace — above numbers row */}
      {(() => {
        const topRowZ = (0 - (ROWS.length - 1) / 2) * KEY_GAP;
        const modRowZ = topRowZ - KEY_GAP;
        return (
          <>
            {/* Tab key — left side above Q row */}
            <Key position={[-0.46, 0.015, topRowZ + KEY_GAP]} label="tab" width={0.105} depth={KEY_SIZE} isPressed={pressedKeys.has("tab")} isSpecial />
            {/* Backspace — right side above = key */}
            <Key position={[0.44, 0.015, modRowZ]}  label="⌫"   width={0.105} depth={KEY_SIZE} isPressed={pressedKeys.has("backspace")} isSpecial />
            {/* Return/Enter — right side home row */}
            <Key
              position={[0.455, 0.015, (2 - (ROWS.length - 1) / 2) * KEY_GAP]}
              label="ret"
              width={0.09}
              depth={KEY_SIZE}
              isPressed={pressedKeys.has("enter")}
              isSpecial
            />
            {/* Caps lock */}
            <Key
              position={[-0.46, 0.015, (2 - (ROWS.length - 1) / 2) * KEY_GAP]}
              label="caps"
              width={0.09}
              depth={KEY_SIZE}
              isPressed={pressedKeys.has("capslock")}
              isSpecial
            />
            {/* Left shift */}
            <Key
              position={[-0.445, 0.015, (3 - (ROWS.length - 1) / 2) * KEY_GAP]}
              label="⇧"
              width={0.12}
              depth={KEY_SIZE}
              isPressed={pressedKeys.has("shift")}
              isSpecial
            />
            {/* Right shift */}
            <Key
              position={[0.44, 0.015, (3 - (ROWS.length - 1) / 2) * KEY_GAP]}
              label="⇧"
              width={0.12}
              depth={KEY_SIZE}
              isPressed={pressedKeys.has("shift")}
              isSpecial
            />
          </>
        );
      })()}

      {/* Slight front-lip */}
      <mesh position={[0, 0.003, kbDepth / 2 + 0.004]}>
        <boxGeometry args={[kbWidth - 0.01, 0.01, 0.008]} />
        <meshStandardMaterial color="#c8c0ad" roughness={0.5} />
      </mesh>
    </group>
  );
};

/* ═══════════════════════════════════════════════════════════════════
 * iMAC G3 MONITOR
 * Screen position is exposed via a hidden anchor mesh.
 * ScreenProjector projects it to 2D pixels each frame.
 * ContactForm is rendered as an absolute CSS overlay outside Canvas.
 * ═══════════════════════════════════════════════════════════════════ */

const SCREEN_W = 0.80;
const SCREEN_H = 0.60;

interface MonitorProps {
  screenAnchorRef?: React.RefObject<THREE.Mesh>;
}

const Monitor: React.FC<MonitorProps> = ({ screenAnchorRef }) => {
  const screenRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (
      screenRef.current &&
      screenRef.current.material instanceof THREE.MeshStandardMaterial
    ) {
      screenRef.current.material.emissiveIntensity =
        0.28 + Math.sin(t * 1.2) * 0.05;
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
      opacity: 0.72,          // was 0.42 — too transparent to see against dark bg
      envMapIntensity: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      side: THREE.DoubleSide as THREE.Side,
    }),
    []
  );

  return (
    <group position={[0, 0.52, -0.04]}>
      {/* Outer translucent shell */}
      <RoundedBox
        args={[1.05, 0.88, 0.44]}
        radius={0.1}
        smoothness={5}
        position={[0, 0, -0.02]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial {...shellMat} />
      </RoundedBox>

      {/* Inner back-fill — BackSide to give depth illusion */}
      <RoundedBox
        args={[0.98, 0.82, 0.38]}
        radius={0.08}
        smoothness={4}
        position={[0, 0, -0.02]}
      >
        <meshPhysicalMaterial
          color="#071018"
          roughness={0.6}
          metalness={0.0}
          side={THREE.BackSide}
        />
      </RoundedBox>

      {/* Bezel */}
      <RoundedBox
        args={[0.94, 0.76, 0.04]}
        radius={0.03}
        smoothness={4}
        position={[0, 0, 0.155]}
        castShadow
      >
        <meshStandardMaterial
          color={BEZEL_DARK}
          roughness={0.85}
          metalness={0.15}
        />
      </RoundedBox>

      {/* Screen background (opaque black base) */}
      <mesh position={[0, 0, 0.172]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial color="#010408" />
      </mesh>

      {/* Screen emissive surface (subtle glow layer) */}
      <mesh ref={screenRef} position={[0, 0, 0.174]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshStandardMaterial
          color="#010408"
          roughness={0.05}
          metalness={0.6}
          emissive="#0d2550"
          emissiveIntensity={0.28}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Bevel ring around screen */}
      <mesh position={[0, 0, 0.171]}>
        <planeGeometry args={[SCREEN_W + 0.025, SCREEN_H + 0.025]} />
        <meshBasicMaterial color="#050b16" />
      </mesh>

      {/* CRT ambient glow light */}
      <pointLight
        ref={glowRef}
        position={[0, 0, 0.65]}
        intensity={0.35}
        color="#4fb8e8"
        distance={1.8}
        decay={2}
      />

      {/* Screen position anchor mesh — used by ScreenProjector to get pixel coords */}
      <mesh ref={screenAnchorRef} position={[0, 0, 0.185]} visible={false}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial />
      </mesh>

      {/* Stand neck */}
      <mesh position={[0, -0.5, 0.02]} castShadow>
        <cylinderGeometry args={[0.048, 0.09, 0.2, 32]} />
        <meshPhysicalMaterial
          color={IMAC_BLUE}
          roughness={0.2}
          metalness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Stand base */}
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
            opacity={0.85}
          />
        </mesh>
        {/* Ring accent on stand base */}
        <mesh position={[0, 0.018, 0]}>
          <torusGeometry args={[0.27, 0.004, 12, 48]} />
          <meshStandardMaterial
            color="#fff"
            metalness={0.9}
            roughness={0.15}
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>

      {/* Apple logo dot */}
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

      {/* Top vents */}
      {[-0.2, -0.1, 0, 0.1, 0.2].map((x, i) => (
        <mesh
          key={`vent-${i}`}
          position={[x, 0.38, -0.05]}
          rotation={[0.25, 0, 0]}
        >
          <boxGeometry args={[0.035, 0.006, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
        </mesh>
      ))}

      {/* Carry handle */}
      <mesh
        position={[0, 0.38, -0.18]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <torusGeometry args={[0.1, 0.016, 12, 24, Math.PI]} />
        <meshPhysicalMaterial
          color={IMAC_BLUE}
          roughness={0.25}
          metalness={0.08}
          clearcoat={0.6}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

/* ═══════════════════════════════════════════════════════════════════
 * PROPS
 * ═══════════════════════════════════════════════════════════════════ */

const MouseDevice: React.FC = () => (
  <group position={[0.62, 0.035, 0.52]} rotation={[0, -0.15, 0]}>
    {/* Mouse body */}
    <RoundedBox
      args={[0.065, 0.025, 0.09]}
      radius={0.012}
      smoothness={4}
      castShadow
    >
      <meshPhysicalMaterial
        color="#f0ece4"
        roughness={0.22}
        metalness={0.04}
        clearcoat={0.6}
        clearcoatRoughness={0.15}
      />
    </RoundedBox>
    {/* Click seam */}
    <mesh position={[0, 0.014, -0.01]}>
      <boxGeometry args={[0.05, 0.001, 0.001]} />
      <meshStandardMaterial color="#c0c0c0" roughness={0.5} />
    </mesh>
    {/* Cable */}
    <mesh position={[0, 0.004, -0.1]} rotation={[-0.2, 0, 0]}>
      <cylinderGeometry args={[0.0025, 0.0025, 0.14, 8]} />
      <meshStandardMaterial color="#a0a0a0" roughness={0.65} />
    </mesh>
    {/* Mouse pad */}
    <RoundedBox
      args={[0.18, 0.002, 0.22]}
      radius={0.02}
      smoothness={3}
      position={[0, -0.013, 0]}
      receiveShadow
    >
      <meshStandardMaterial
        color="#1a1a22"
        roughness={0.98}
        metalness={0.0}
      />
    </RoundedBox>
  </group>
);

const Desk: React.FC = () => (
  <group position={[0, -0.02, 0.18]}>
    <RoundedBox
      args={[2.4, 0.05, 1.4]}
      radius={0.015}
      smoothness={4}
      receiveShadow
      castShadow
    >
      <meshPhysicalMaterial
        color="#1e1e24"
        roughness={0.5}
        metalness={0.12}
        clearcoat={0.35}
        clearcoatRoughness={0.3}
      />
    </RoundedBox>
    {/* Front desk edge highlight */}
    <mesh position={[0, -0.015, 0.7]} receiveShadow>
      <boxGeometry args={[2.38, 0.02, 0.006]} />
      <meshStandardMaterial color="#2a2a30" roughness={0.6} metalness={0.1} />
    </mesh>
  </group>
);

const DeskAccessories: React.FC = () => (
  <group>
    {/* Pen cup */}
    <group position={[-0.68, 0.06, 0.35]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.032, 0.035, 0.08, 16]} />
        <meshPhysicalMaterial
          color="#2a2a30"
          roughness={0.5}
          metalness={0.2}
          clearcoat={0.3}
        />
      </mesh>
      <mesh position={[0.008, 0.06, 0]} rotation={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.003, 0.003, 0.1, 8]} />
        <meshStandardMaterial color="#444" roughness={0.4} />
      </mesh>
      <mesh position={[-0.005, 0.055, 0.005]} rotation={[0, 0, -0.12]}>
        <cylinderGeometry args={[0.003, 0.003, 0.09, 8]} />
        <meshStandardMaterial color="#8b4513" roughness={0.6} />
      </mesh>
    </group>
    {/* Coaster */}
    <mesh position={[-0.55, 0.01, 0.58]} castShadow receiveShadow>
      <cylinderGeometry args={[0.06, 0.06, 0.006, 24]} />
      <meshStandardMaterial
        color="#3a3a3a"
        roughness={0.8}
        metalness={0.05}
      />
    </mesh>
  </group>
);

/* ═══════════════════════════════════════════════════════════════════
 * CONTACT FORM
 * FIX: onPointerLeave replaced with a proper focus/blur approach.
 *      The form div no longer fires "blur" when moving between its
 *      own child inputs. Instead we track focus at the window level.
 * FIX: timeout refs stored so they can be cleaned up on unmount.
 * ═══════════════════════════════════════════════════════════════════ */

const COUNTRY_CODES = [
  { code: "US", dial: "+1" },
  { code: "GB", dial: "+44" },
  { code: "IN", dial: "+91" },
  { code: "AU", dial: "+61" },
  { code: "CA", dial: "+1" },
  { code: "DE", dial: "+49" },
  { code: "FR", dial: "+33" },
  { code: "JP", dial: "+81" },
  { code: "CN", dial: "+86" },
  { code: "BR", dial: "+55" },
  { code: "MX", dial: "+52" },
  { code: "SG", dial: "+65" },
  { code: "AE", dial: "+971" },
  { code: "NL", dial: "+31" },
  { code: "SE", dial: "+46" },
];

// Base design dimensions — the form is designed at this size, 
// then CSS-scaled to fill whatever pixel rect the 3D screen projects to.
const FORM_BASE_W = 360;
const FORM_BASE_H = 262;

interface ContactFormProps {
  onKeyPress: (key: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  overlayWidth?: number;
  overlayHeight?: number;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onKeyPress,
  onFocus,
  onBlur,
  overlayWidth,
  overlayHeight,
}) => {
  // Use CSS zoom to scale the form to fill the overlay rect.
  // Unlike transform:scale, zoom DOES resize the layout box, so clicks work everywhere.
  const zoomScale = overlayWidth ? overlayWidth / FORM_BASE_W : 1;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [countryCode, setCountryCode] = useState("IN");
  const [focused, setFocused] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);

  // FIX: track active child-focus count so we don't fire onBlur between sibling inputs
  const focusCountRef = useRef(0);
  // FIX: store timeout IDs so we can cancel them on unmount (no memory leaks)
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (blurTimerRef.current) clearTimeout(blurTimerRef.current);
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  const handleChildFocus = useCallback(() => {
    focusCountRef.current += 1;
    if (blurTimerRef.current) {
      clearTimeout(blurTimerRef.current);
      blurTimerRef.current = null;
    }
    if (focusCountRef.current === 1) {
      onFocus?.();
    }
  }, [onFocus]);

  const handleChildBlur = useCallback(() => {
    focusCountRef.current = Math.max(0, focusCountRef.current - 1);
    // Defer: if another child immediately gains focus, cancel this blur
    blurTimerRef.current = setTimeout(() => {
      if (focusCountRef.current === 0) {
        onBlur?.();
      }
    }, 100);
  }, [onBlur]);

  const dialCode =
    COUNTRY_CODES.find((c) => c.code === countryCode)?.dial ?? "+1";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    onKeyPress(e.key);
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    height: "24px",
    background:
      focused === field
        ? "rgba(14,28,60,0.95)"
        : "rgba(8,16,36,0.85)",
    border: `1px solid ${
      focused === field
        ? "rgba(96,165,250,0.55)"
        : "rgba(79,184,232,0.18)"
    }`,
    borderRadius: "4px",
    color: "#e2edff",
    fontSize: "10px",
    fontFamily: "'SF Mono','JetBrains Mono','Fira Code',monospace",
    padding: "0 8px",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
    boxSizing: "border-box" as const,
    boxShadow:
      focused === field
        ? "0 0 0 2px rgba(96,165,250,0.1),inset 0 1px 3px rgba(0,0,0,0.4)"
        : "inset 0 1px 3px rgba(0,0,0,0.3)",
  });

  const labelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "7px",
    letterSpacing: "0.14em",
    color: "#60a5fa",
    marginBottom: "2px",
    fontFamily: "'SF Mono','JetBrains Mono',monospace",
    fontWeight: 600,
    textTransform: "uppercase" as const,
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.message.trim()
      )
        return;
      setIsSubmitting(true);
      const fullPhone = formData.phone
        ? `${dialCode} ${formData.phone}`
        : "";
      try {
        const sid = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const tid = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
        if (sid && tid && pk) {
          const ejs = await import("@emailjs/browser");
          await ejs.send(
            sid,
            tid,
            {
              from_name: formData.name,
              from_email: formData.email,
              phone: fullPhone,
              message: formData.message,
            },
            pk
          );
        } else {
          const body = `${formData.message}\n\nFrom: ${formData.email}${
            fullPhone ? `\nPhone: ${fullPhone}` : ""
          }`;
          window.location.href = `mailto:anbumalligarjun1@gmail.com?subject=${encodeURIComponent(
            "Contact from " + formData.name
          )}&body=${encodeURIComponent(body)}`;
        }
        setIsSubmitting(false);
        setSubmitSuccess(true);
        // FIX: store timer ref for cleanup
        successTimerRef.current = setTimeout(() => {
          setSubmitSuccess(false);
          setFormData({ name: "", email: "", phone: "", message: "" });
          setCharCount(0);
        }, 3500);
      } catch {
        setIsSubmitting(false);
        const body = `${formData.message}\n\nFrom: ${formData.email}${
          fullPhone ? `\nPhone: ${fullPhone}` : ""
        }`;
        window.location.href = `mailto:anbumalligarjun1@gmail.com?subject=${encodeURIComponent(
          "Contact from " + formData.name
        )}&body=${encodeURIComponent(body)}`;
      }
    },
    [formData, dialCode]
  );

  /* ── Success screen ── */
  if (submitSuccess) {
    return (
      <div
        style={{
          width: `${FORM_BASE_W}px`,
          height: `${FORM_BASE_H}px`,
          zoom: zoomScale,
          background:
            "linear-gradient(135deg, #020a14 0%, #061422 40%, #020810 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'SF Mono','JetBrains Mono',monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,148,0.012) 3px,rgba(0,255,148,0.012) 4px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ fontSize: "36px", marginBottom: "8px" }}>✦</div>
        <div
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#4ade80",
            letterSpacing: "0.15em",
            marginBottom: "5px",
          }}
        >
          TRANSMITTED
        </div>
        <div
          style={{
            fontSize: "9px",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.08em",
          }}
        >
          Message received · Will respond shortly
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#4ade80",
                opacity: 0.5,
                animation: `blink 1.2s ${i * 0.4}s infinite`,
              }}
            />
          ))}
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `@keyframes blink{0%,100%{opacity:.15}50%{opacity:.8}}`,
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        width: `${FORM_BASE_W}px`,
        height: `${FORM_BASE_H}px`,
        zoom: zoomScale,
        background:
          "linear-gradient(145deg, #020a18 0%, #080f20 55%, #04091a 100%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box" as const,
        fontFamily: "'SF Mono','JetBrains Mono','Fira Code',monospace",
      }}
    >
      {/* Scanlines overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.055) 3px,rgba(0,0,0,0.055) 4px)",
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Top accent bar */}
      <div
        style={{
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #3b82f6 30%, #8b5cf6 70%, transparent)",
          flexShrink: 0,
          zIndex: 3,
        }}
      />

      {/* Header strip */}
      <div
        style={{
          padding: "5px 12px 4px",
          flexShrink: 0,
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(59,130,246,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: c,
                boxShadow: `0 0 4px ${c}66`,
              }}
            />
          ))}
        </div>
        <div
          style={{
            fontSize: "7px",
            letterSpacing: "0.2em",
            color: "rgba(148,163,184,0.6)",
            fontWeight: 500,
          }}
        >
          SECURE CHANNEL
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 5px rgba(74,222,128,0.6)",
            }}
          />
          <span
            style={{
              fontSize: "7px",
              color: "rgba(74,222,128,0.8)",
              letterSpacing: "0.1em",
            }}
          >
            LIVE
          </span>
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          textAlign: "center",
          padding: "4px 12px 3px",
          flexShrink: 0,
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "0.06em",
            background:
              "linear-gradient(90deg,#60a5fa,#818cf8,#a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
          }}
        >
          CONTACT TERMINAL
        </div>
        <div
          style={{
            fontSize: "7px",
            color: "rgba(100,116,139,0.7)",
            letterSpacing: "0.18em",
            marginTop: "1px",
          }}
        >
          v2.4.1 — ENCRYPTED
        </div>
      </div>

      {/* Form body */}
      <form
        onSubmit={handleSubmit}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "4px 12px 7px",
          gap: "5px",
          minHeight: 0,
          zIndex: 3,
        }}
      >
        {/* ── Name ── */}
        <div style={{ flexShrink: 0 }}>
          <div style={labelStyle}>
            <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="4" r="3" stroke="#60a5fa" strokeWidth="1.2" />
              <circle cx="4" cy="4" r="1.2" fill="#60a5fa" />
            </svg>
            IDENTIFIER
          </div>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((p) => ({ ...p, name: e.target.value }))
            }
            onKeyDown={handleKeyDown}
            onFocus={() => { setFocused("name"); handleChildFocus(); }}
            onBlur={() => { setFocused(null); handleChildBlur(); }}
            placeholder="Your full name"
            style={inputStyle("name")}
          />
        </div>

        {/* ── Email ── */}
        <div style={{ flexShrink: 0 }}>
          <div style={labelStyle}>
            <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
              <rect
                x="0.6"
                y="1.6"
                width="6.8"
                height="4.8"
                rx="0.8"
                stroke="#60a5fa"
                strokeWidth="1"
              />
              <path
                d="M0.6 2.4L4 4.6L7.4 2.4"
                stroke="#60a5fa"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
            COMM CHANNEL
          </div>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData((p) => ({ ...p, email: e.target.value }))
            }
            onKeyDown={handleKeyDown}
            onFocus={() => { setFocused("email"); handleChildFocus(); }}
            onBlur={() => { setFocused(null); handleChildBlur(); }}
            placeholder="your@email.com"
            style={inputStyle("email")}
          />
        </div>

        {/* ── Phone ── */}
        <div style={{ flexShrink: 0 }}>
          <div style={labelStyle}>
            <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
              <path
                d="M1.5 1.5h1.5l.6 1.5-.9.6c.3.7.8 1.2 1.5 1.5l.6-.9 1.5.6v1.5A.5.5 0 016.5 7C3.5 7 1 4.5 1 1.5a.5.5 0 01.5-.5z"
                stroke="#60a5fa"
                strokeWidth="0.9"
                fill="none"
              />
            </svg>
            SIGNAL LINE
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            {/* Country selector */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                onFocus={() => { setFocused("phone_cc"); handleChildFocus(); }}
                onBlur={() => { setFocused(null); handleChildBlur(); }}
                style={{
                  height: "24px",
                  background:
                    focused === "phone_cc"
                      ? "rgba(14,28,60,0.95)"
                      : "rgba(8,16,36,0.85)",
                  border: `1px solid ${
                    focused === "phone_cc"
                      ? "rgba(96,165,250,0.55)"
                      : "rgba(79,184,232,0.18)"
                  }`,
                  borderRadius: "4px",
                  color: "#93c5fd",
                  fontSize: "9px",
                  fontFamily: "'SF Mono','JetBrains Mono',monospace",
                  fontWeight: 600,
                  padding: "0 4px",
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none" as const,
                  WebkitAppearance: "none" as const,
                  width: "64px",
                  textAlign: "center",
                  letterSpacing: "0.04em",
                }}
              >
                {COUNTRY_CODES.map((c) => (
                  <option
                    key={c.code}
                    value={c.code}
                    style={{ background: "#040c1e", color: "#e2edff" }}
                  >
                    {c.code} {c.dial}
                  </option>
                ))}
              </select>
              <div
                style={{
                  position: "absolute",
                  right: "4px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                  <path
                    d="M1 1l2.5 2.5L6 1"
                    stroke="#60a5fa"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* Dial code badge */}
            <div
              style={{
                height: "24px",
                display: "flex",
                alignItems: "center",
                padding: "0 6px",
                background: "rgba(96,165,250,0.08)",
                border: "1px solid rgba(79,184,232,0.18)",
                borderRadius: "4px",
                color: "#60a5fa",
                fontSize: "9px",
                fontFamily: "'SF Mono','JetBrains Mono',monospace",
                fontWeight: 700,
                letterSpacing: "0.04em",
                flexShrink: 0,
                minWidth: "34px",
                justifyContent: "center",
              }}
            >
              {dialCode}
            </div>
            {/* Number input */}
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  phone: e.target.value.replace(/[^\d\s\-().+]/g, ""),
                }))
              }
              onKeyDown={handleKeyDown}
              onFocus={() => { setFocused("phone"); handleChildFocus(); }}
              onBlur={() => { setFocused(null); handleChildBlur(); }}
              placeholder="(555) 000-0000"
              style={{ ...inputStyle("phone"), flex: 1 }}
            />
          </div>
        </div>

        {/* ── Message ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ ...labelStyle, justifyContent: "space-between" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                <rect
                  x="0.6"
                  y="0.6"
                  width="6.8"
                  height="6.8"
                  rx="0.8"
                  stroke="#60a5fa"
                  strokeWidth="1"
                />
                <line
                  x1="2"
                  y1="2.8"
                  x2="6"
                  y2="2.8"
                  stroke="#60a5fa"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <line
                  x1="2"
                  y1="4.4"
                  x2="5"
                  y2="4.4"
                  stroke="#60a5fa"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              MESSAGE
            </span>
            <span
              style={{
                fontSize: "7px",
                color:
                  charCount > 180 ? "#f87171" : "rgba(100,116,139,0.5)",
              }}
            >
              {charCount}/200
            </span>
          </div>
          <textarea
            required
            value={formData.message}
            onChange={(e) => {
              const v = e.target.value.slice(0, 200);
              setFormData((p) => ({ ...p, message: v }));
              setCharCount(v.length);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => { setFocused("msg"); handleChildFocus(); }}
            onBlur={() => { setFocused(null); handleChildBlur(); }}
            placeholder="Write your message here..."
            style={{
              ...inputStyle("msg"),
              height: "auto",
              flex: 1,
              minHeight: "40px",
              padding: "6px 8px",
              resize: "none",
              lineHeight: 1.5,
              verticalAlign: "top",
            }}
          />
        </div>

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            flexShrink: 0,
            height: "27px",
            width: "100%",
            background: isSubmitting
              ? "rgba(59,130,246,0.25)"
              : "linear-gradient(90deg, #1d4ed8 0%, #6d28d9 100%)",
            border: "1px solid rgba(99,102,241,0.45)",
            borderRadius: "5px",
            color: "#e0e7ff",
            fontSize: "10px",
            fontWeight: 700,
            fontFamily: "'SF Mono','JetBrains Mono',monospace",
            letterSpacing: "0.14em",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            boxShadow: "0 2px 12px -2px rgba(99,102,241,0.45)",
            transition: "opacity 0.2s",
            opacity: isSubmitting ? 0.6 : 1,
          }}
        >
          {isSubmitting ? (
            <>
              <span
                style={{
                  width: 9,
                  height: 9,
                  border: "2px solid rgba(255,255,255,0.25)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.75s linear infinite",
                }}
              />
              TRANSMITTING
            </>
          ) : (
            <>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M1 6L11 6M7 2L11 6L7 10"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              SEND MESSAGE
            </>
          )}
        </button>
      </form>

      {/* Bottom bar */}
      <div
        style={{
          height: "1.5px",
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.35) 30%, rgba(139,92,246,0.35) 70%, transparent)",
          flexShrink: 0,
          zIndex: 3,
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `@keyframes spin{to{transform:rotate(360deg)}}`,
        }}
      />
    </div>
  );
};


/* ═══════════════════════════════════════════════════════════════════
 * SCREEN PROJECTOR
 * Projects the 3D screen anchor mesh to 2D canvas-relative pixel
 * coordinates every frame. Calls onRect with {left,top,width,height}
 * so the parent can position an absolutely-placed form overlay.
 * This is pixel-perfect regardless of drei version or distanceFactor.
 * ═══════════════════════════════════════════════════════════════════ */

interface ScreenRect { left: number; top: number; width: number; height: number; }

interface ScreenProjectorProps {
  anchorRef: React.RefObject<THREE.Mesh>;
  onRect: (rect: ScreenRect) => void;
}

const ScreenProjector: React.FC<ScreenProjectorProps> = ({ anchorRef, onRect }) => {
  const { camera, gl } = useThree();
  const vecTL = useMemo(() => new THREE.Vector3(), []);
  const vecBR = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!anchorRef.current) return;
    const mesh = anchorRef.current;

    // Get world position of screen corners (top-left and bottom-right)
    // Screen plane is SCREEN_W × SCREEN_H, centered at mesh position
    mesh.localToWorld(vecTL.set(-SCREEN_W / 2, SCREEN_H / 2, 0));
    mesh.localToWorld(vecBR.set(SCREEN_W / 2, -SCREEN_H / 2, 0));

    // Project to NDC [-1,1]
    vecTL.project(camera);
    vecBR.project(camera);

    // Convert NDC to canvas pixel coordinates
    const canvas = gl.domElement;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    const left   = ((vecTL.x + 1) / 2) * w;
    const top    = ((-vecTL.y + 1) / 2) * h;
    const right  = ((vecBR.x + 1) / 2) * w;
    const bottom = ((-vecBR.y + 1) / 2) * h;

    onRect({
      left,
      top,
      width: right - left,
      height: bottom - top,
    });
  });

  return null;
};

/* ═══════════════════════════════════════════════════════════════════
 * SCENE
 * FIX: formFocused is now wired to OrbitControls enableRotate so
 *      the camera locks when the user is typing (instead of only
 *      stopping autoRotate, which still allowed manual drag to fight
 *      with the form focus state).
 * ═══════════════════════════════════════════════════════════════════ */

interface SceneProps {
  onFormFocus: () => void;
  onFormBlur: () => void;
  formFocused: boolean;
  onScreenRect: (rect: ScreenRect) => void;
  screenAnchorRef: React.RefObject<THREE.Mesh>;
  pressedKeys: Set<string>;
}

const Scene: React.FC<SceneProps> = ({
  onFormFocus,
  onFormBlur,
  formFocused,
  onScreenRect,
  screenAnchorRef,
  pressedKeys,
}) => {

  return (
    <>
      <color attach="background" args={["#06070c"]} />
      {/* Fog starts at 5 so it doesn't fog near objects — camera is at z=2.5, monitor at z≈0 */}
      <fog attach="fog" args={["#06070c", 5, 14]} />

      {/* Boosted ambient so dark objects (monitor shell, desk) are actually visible */}
      <ambientLight intensity={0.6} color="#c8d4e8" />
      <directionalLight position={[3, 6, 3]} intensity={1.8} color="#fff0e0" castShadow
        shadow-mapSize-width={1024} shadow-mapSize-height={1024}
        shadow-camera-near={0.5} shadow-camera-far={12}
        shadow-camera-left={-2.5} shadow-camera-right={2.5}
        shadow-camera-top={2.5} shadow-camera-bottom={-2.5}
        shadow-bias={-0.0003}
      />
      <directionalLight position={[-3, 2, 1]} intensity={0.6} color="#6db3e0" />
      <pointLight position={[2.5, 1.5, 2]} intensity={0.5} color="#d68a5a" decay={2} distance={8} />
      <pointLight position={[-2, 2, 2]} intensity={0.4} color="#5aa4d6" decay={2} distance={7} />

        {/* Removed Environment preset="city" because it fetched an external HDR
          asset (potsdamer_platz_1k.hdr) which failed to load in some setups.
          Use local lights as a deterministic fallback. */}
        <hemisphereLight skyColor="#c8d4e8" groundColor="#101426" intensity={0.6} />

      {/*
        Camera directly in front of the monitor at eye-level.
        Monitor center is at world [0, 0.52, 0]. Camera at z=2.6 is ~2.45
        units in front of the screen face. fov=44 frames it naturally.
        Polar angle clamped tightly around π/2 (horizontal) so the orbit
        stays near eye-level — never top-down.
      */}
      <PerspectiveCamera makeDefault position={[0, 0.52, 2.6]} fov={44} near={0.1} far={50} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={!formFocused}
        minDistance={2.0}
        maxDistance={4.5}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 2 - 0.3}
        autoRotate={!formFocused}
        autoRotateSpeed={0.4}
        target={[0, 0.52, 0]}
      />

      <Desk />
      <DeskAccessories />
      <Monitor screenAnchorRef={screenAnchorRef} />
      <ScreenProjector anchorRef={screenAnchorRef} onRect={onScreenRect} />
      <Keyboard pressedKeys={pressedKeys} />
      <MouseDevice />

      <Sparkles
        count={30}
        scale={[6, 3, 6]}
        size={0.6}
        speed={0.06}
        opacity={0.15}
        color="#5aa4d6"
      />
      <ContactShadows
        position={[0, -0.05, 0.18]}
        opacity={0.5}
        scale={5}
        blur={2.8}
        far={3.5}
        color="#0a0a1a"
      />
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
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="rgba(79,184,232,0.12)"
            strokeWidth="2"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="url(#lg)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="44 132"
            transform="rotate(-90 32 32)"
          />
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4fb8e8" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25">
        Initializing
      </p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
 * EXPORT
 * FIX: formFocused state is now passed down to Scene so OrbitControls
 *      can react to it. Previously it was set but never consumed.
 * ═══════════════════════════════════════════════════════════════════ */

export default function RetroComputerContact(): React.ReactElement {
  const [mounted, setMounted] = useState(false);
  const [formFocused, setFormFocused] = useState(false);
  const [screenRect, setScreenRect] = useState<ScreenRect | null>(null);
  const screenAnchorRef = useRef<THREE.Mesh>(null);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const keyTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    setMounted(true);
    return () => { keyTimers.current.forEach(t => clearTimeout(t)); };
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    const k = key.toLowerCase();
    setPressedKeys(prev => new Set(prev).add(k));
    const existing = keyTimers.current.get(k);
    if (existing) clearTimeout(existing);
    const t = setTimeout(() => {
      setPressedKeys(prev => { const n = new Set(prev); n.delete(k); return n; });
      keyTimers.current.delete(k);
    }, 120);
    keyTimers.current.set(k, t);
  }, []);

  if (!mounted) {
    return (
      <div
        className="relative h-[600px] w-full rounded-2xl lg:h-[700px]"
        style={{ backgroundColor: "#06070c" }}
      >
        <LoadingFallback />
      </div>
    );
  }

  return (
    <div
      className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-white/5 lg:h-[700px]"
      style={{ backgroundColor: "#06070c" }}
    >
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(6,7,12,0.6) 100%)",
        }}
      />

      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ pointerEvents: formFocused ? "none" : "auto" }}
      >
        <Suspense fallback={null}>
          <Scene
            formFocused={formFocused}
            onFormFocus={() => setFormFocused(true)}
            onFormBlur={() => setFormFocused(false)}
            onScreenRect={setScreenRect}
            screenAnchorRef={screenAnchorRef}
            pressedKeys={pressedKeys}
          />
        </Suspense>
      </Canvas>

      {/* ContactForm overlay — positioned exactly over the 3D screen plane via ScreenProjector */}
      {screenRect && (
        <div
          style={{
            position: "absolute",
            left: screenRect.left,
            top: screenRect.top,
            width: screenRect.width,
            height: screenRect.height,
            // Always receive pointer events so clicks reach inputs
            pointerEvents: "auto",
            zIndex: 15,
            overflow: "hidden",
            borderRadius: "4px",
            cursor: "default",
          }}
        >
          <ContactForm
            onKeyPress={handleKeyPress}
            onFocus={() => setFormFocused(true)}
            onBlur={() => setFormFocused(false)}
            overlayWidth={screenRect.width}
            overlayHeight={screenRect.height}
          />
        </div>
      )}

      {/* HUD badge */}
      <div
        className="pointer-events-none absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-lg px-3 py-1.5 backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(6,7,12,0.8)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          className="h-1.5 w-1.5 animate-pulse rounded-full"
          style={{
            backgroundColor: "#4ade80",
            boxShadow: "0 0 6px rgba(74,222,128,0.5)",
          }}
        />
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/25">
          Interactive 3D
        </span>
      </div>

      {/* Instruction pill */}
      <div
        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full px-5 py-2 backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(6,7,12,0.8)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <p className="text-center font-mono text-[10px] text-white/25">
          {formFocused
            ? "Typing mode — camera locked"
            : "Click form to type · Drag to orbit · Scroll to zoom"}
        </p>
      </div>
    </div>
  );
}