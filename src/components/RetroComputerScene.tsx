"use client";

import React, { Suspense, useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Html,
  OrbitControls,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import RetroTerminalForm from "./RetroTerminalForm";

// ═══════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════
const MODEL_PATH = "/models/retro_computer.glb";

const HTML_W = 380;
const HTML_H = 320;

// ═══════════════════════════════════════════════════════════════════
// THE COMPUTER MODEL + HTML SCREEN OVERLAY
// ═══════════════════════════════════════════════════════════════════
function ComputerModel() {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef<THREE.Group>(null);
  const kbRef = useRef<THREE.Object3D | null>(null);
  const kbRestY = useRef(0);

  const [screenData, setScreenData] = useState<{
    center: [number, number, number];
    width: number;
    height: number;
  } | null>(null);

  // ── On mount: traverse model, find screen, make it transparent ──
  useEffect(() => {
    scene.updateMatrixWorld(true);

    let screenObj: THREE.Object3D | null = null;

    scene.traverse((child) => {
      const n = child.name.toLowerCase();

      // Find the screen mesh
      if (n.includes("screen")) {
        if (!screenObj) screenObj = child;

        // Make the screen mesh transparent so the HTML form shows through
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat) {
            mat.transparent = true;
            mat.opacity = 0.05; // nearly invisible — HTML takes over
            mat.color.set("#0a0a0a");
            mat.needsUpdate = true;
          }
        }
      }

      // Find keyboard
      if (n.includes("keyboard")) {
        kbRef.current = child;
        kbRestY.current = child.position.y;
      }
    });

    if (screenObj) {
      const box = new THREE.Box3().setFromObject(screenObj);
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);

      setScreenData({
        center: [center.x, center.y, box.max.z + 0.001],
        width: size.x,
        height: size.y,
      });
    } else {
      // Fallback from GLB node analysis
      setScreenData({
        center: [-0.087, 0.271, 0.008],
        width: 0.14,
        height: 0.10,
      });
    }
  }, [scene]);

  // ── Keyboard tap animation ──
  const handleKeyPress = useCallback((key: string) => {
    const kb = kbRef.current;
    if (!kb) return;
    kb.position.y = kbRestY.current - 0.002;
    setTimeout(() => {
      if (kb) kb.position.y = kbRestY.current;
    }, 70);
  }, []);

  // ── Subtle idle breathing ──
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.003;
    }
  });

  // ── Compute the scale so HTML pixels map to 3D units ──
  const htmlScale = useMemo(() => {
    if (!screenData) return 0.0004;
    // We want HTML_W px to fill screenData.width 3D units (with slight padding)
    return (screenData.width * 0.90) / HTML_W;
  }, [screenData]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />

      {screenData && (
        <>
          {/*
            The "magic trick":
            drei <Html transform> renders a real DOM <div> as a CSS3D element,
            positioned at the 3D screen coordinates. When the camera orbits,
            the HTML moves with the model — looking like it's INSIDE the monitor.
            
            Key: NO occlude (blocks clicks), pointer-events auto on every layer.
          */}
          <Html
            transform
            position={screenData.center}
            scale={htmlScale}
            zIndexRange={[16777271, 0]}
            style={{
              pointerEvents: "auto",
              userSelect: "text",
            }}
            // This wrapper div receives all events
            wrapperClass=""
          >
            <div
              style={{
                width: HTML_W,
                height: HTML_H,
                overflow: "hidden",
                borderRadius: 3,
                background: "#0a0a0a",
                boxShadow:
                  "0 0 24px rgba(51,255,51,0.25), inset 0 0 40px rgba(51,255,51,0.04)",
                pointerEvents: "auto",
              }}
              // Prevent orbit controls from stealing focus when clicking the form
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onPointerMove={(e) => e.stopPropagation()}
            >
              <RetroTerminalForm onKeyPress={handleKeyPress} />
            </div>
          </Html>

          {/* Green CRT glow light */}
          <pointLight
            position={[
              screenData.center[0],
              screenData.center[1],
              screenData.center[2] + 0.06,
            ]}
            color="#33ff33"
            intensity={0.4}
            distance={0.5}
            decay={2}
          />
        </>
      )}
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CAMERA RIG — smoothly looks at the computer
// ═══════════════════════════════════════════════════════════════════
function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0.15, 0);
  }, [camera]);
  return null;
}

// ═══════════════════════════════════════════════════════════════════
// LOADER
// ═══════════════════════════════════════════════════════════════════
function Loader() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'VT323', monospace",
        color: "#33ff33",
        background: "#050505",
        textShadow: "0 0 8px rgba(51,255,51,0.5)",
        gap: 12,
      }}
    >
      <div style={{ width: 200, height: 2, background: "rgba(51,255,51,0.15)", borderRadius: 1, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            background: "#33ff33",
            boxShadow: "0 0 8px rgba(51,255,51,0.6)",
            animation: "rcs-bar 2s ease-in-out infinite",
          }}
        />
      </div>
      <span style={{ fontSize: 14, letterSpacing: 2 }}>{">"} LOADING TERMINAL...</span>
      <style>{`
        @keyframes rcs-bar {
          0%   { width:0%; margin-left:0 }
          50%  { width:60%; margin-left:20% }
          100% { width:0%; margin-left:100% }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCANLINES
// ═══════════════════════════════════════════════════════════════════
function ScanlineOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        background:
          "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        mixBlendMode: "multiply",
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════
// EXPORTED SECTION
// ═══════════════════════════════════════════════════════════════════
export default function RetroComputerScene() {
  return (
    <section
      id="retro-contact"
      className="relative mx-auto w-full max-w-6xl px-6 py-24"
    >
      {/* Section heading */}
      <div className="mb-12 text-center">
        <h2
          style={{
            fontFamily: "'VT323', monospace",
            color: "#33ff33",
            textShadow: "0 0 20px rgba(51,255,51,0.3)",
            letterSpacing: 2,
          }}
          className="text-4xl font-bold tracking-tight md:text-5xl"
        >
          {">"} CONTACT_TERMINAL
        </h2>
        <p
          style={{
            fontFamily: "'VT323', monospace",
            color: "rgba(51,255,51,0.45)",
            letterSpacing: 3,
          }}
          className="mt-3 text-sm uppercase"
        >
          Click the screen. Type your message. Hit transmit.
        </p>
      </div>

      {/* 3D Canvas */}
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{
          aspectRatio: "16 / 10",
          border: "1px solid rgba(51,255,51,0.12)",
          background: "#050505",
        }}
      >
        <Suspense fallback={<Loader />}>
          <Canvas
            camera={{
              position: [0, 0.25, 0.55],
              fov: 42,
              near: 0.005,
              far: 50,
            }}
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: "high-performance",
            }}
            dpr={[1, 1.5]}
            style={{ background: "#050505" }}
            // CRITICAL: allow HTML events inside the Canvas
            eventPrefix="client"
          >
            <CameraRig />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[3, 4, 5]} intensity={0.6} />
            <directionalLight position={[-2, 2, -1]} intensity={0.15} color="#33ff33" />
            <spotLight
              position={[0, 2, 1.5]}
              angle={0.6}
              penumbra={0.5}
              intensity={0.25}
              color="#33ff33"
            />

            <Environment preset="night" />

            <ComputerModel />

            <ContactShadows
              position={[0, -0.05, 0]}
              opacity={0.25}
              scale={2}
              blur={2}
              far={1}
              color="#000000"
            />

            <OrbitControls
              enablePan={false}
              enableZoom
              minDistance={0.25}
              maxDistance={1.2}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.2}
              minAzimuthAngle={-Math.PI / 4}
              maxAzimuthAngle={Math.PI / 4}
              target={[0, 0.15, 0]}
              // Don't steal events from the HTML form
              makeDefault
            />
          </Canvas>
        </Suspense>

        <ScanlineOverlay />
      </div>
    </section>
  );
}

useGLTF.preload(MODEL_PATH);
