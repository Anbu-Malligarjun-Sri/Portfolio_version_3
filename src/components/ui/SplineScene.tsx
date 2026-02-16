"use client";

import React, { Suspense, lazy, Component } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: (splineApp: any) => void;
}

/* ── Error Boundary — catches runtime crashes from Spline ── */
interface EBProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}
interface EBState {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn("[SplineScene] 3D scene error:", error.message);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/* ── Loading / error fallback ── */
function SplineFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-pulse rounded-full bg-void-300/50" />
        <div className="h-24 w-20 animate-pulse rounded-2xl bg-void-300/40" style={{ animationDelay: "100ms" }} />
        <div className="absolute top-20 -left-6 h-20 w-4 animate-pulse rounded-full bg-void-300/30" style={{ animationDelay: "200ms" }} />
        <div className="absolute top-20 -right-6 h-20 w-4 animate-pulse rounded-full bg-void-300/30" style={{ animationDelay: "200ms" }} />
        <span className="mt-4 font-mono text-[10px] tracking-[0.3em] text-stark-dim/60 uppercase">
          Loading 3D…
        </span>
        <div className="absolute inset-0 -z-10 h-48 w-32 rounded-full bg-neon/5 blur-3xl" />
      </div>
    </div>
  );
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return (
    <SplineErrorBoundary fallback={<SplineFallback />}>
      <Suspense fallback={<SplineFallback />}>
        <Spline scene={scene} className={className} onLoad={onLoad} />
      </Suspense>
    </SplineErrorBoundary>
  );
}
