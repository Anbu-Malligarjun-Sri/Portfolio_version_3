"use client";

import React from "react";

export default function ToolsSection() {
  return (
    <section id="tools" className="relative overflow-hidden bg-void h-screen w-full">
      {/* Full-viewport iframe — fills the section completely */}
      <div className="absolute inset-0">
        <iframe
          src="/knowledge-tree/index.html"
          title="Knowledge Tree"
          className="w-full h-full"
          style={{ border: 'none', display: 'block' }}
        />
      </div>

      {/* Accessible fallback link in case embedding is blocked */}
      <noscript>
        <div className="p-6">
          <p className="text-center text-white/60">Interactive embed requires JavaScript. Open the full page: <a href="/knowledge-tree/index.html" className="underline">Knowledge Tree</a>.</p>
        </div>
      </noscript>
    </section>
  );
}
