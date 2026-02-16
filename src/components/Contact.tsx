"use client";

import React, { useState, useEffect } from "react";

export default function Contact() {
  const [, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const socialPlatforms = [
    {
      name: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      gradient: "from-blue-600 to-blue-400",
      shadowColor: "rgba(59, 130, 246, 0.5)",
      link: "https://www.linkedin.com/in/anbu-malligarjun-sri-835a372a4/",
      description: "Professional Network",
    },
    {
      name: "GitHub",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      gradient: "from-gray-700 to-gray-500",
      shadowColor: "rgba(75, 85, 99, 0.5)",
      link: "https://github.com/Anbu-Malligarjun-Sri",
      description: "Code Repository",
    },
    {
      name: "Twitter",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      gradient: "from-slate-800 to-slate-600",
      shadowColor: "rgba(51, 65, 85, 0.5)",
      link: "#",
      description: "Social Updates",
    },
    {
      name: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
        </svg>
      ),
      gradient: "from-purple-600 via-pink-600 to-orange-500",
      shadowColor: "rgba(219, 39, 119, 0.5)",
      link: "#",
      description: "Visual Stories",
    },
    {
      name: "Discord",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
        </svg>
      ),
      gradient: "from-indigo-600 to-purple-600",
      shadowColor: "rgba(99, 102, 241, 0.5)",
      link: "#",
      description: "Community Chat",
    },
    {
      name: "YouTube",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      gradient: "from-red-600 to-red-400",
      shadowColor: "rgba(239, 68, 68, 0.5)",
      link: "#",
      description: "Video Content",
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-void"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(0,255,148,0.16),transparent_45%),radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.14),transparent_45%),radial-gradient(ellipse_at_50%_80%,rgba(0,255,148,0.1),transparent_45%)]" />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 sm:px-10">
        {/* Header Section */}
        <div
          className={`mb-16 text-center transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-neon shadow-[0_0_0_6px_rgba(0,255,148,0.18)]" />
            <span className="bg-linear-to-r from-neon to-white bg-clip-text text-sm font-medium text-transparent">
              Connect & Collaborate
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl text-stark">
            Get In Touch
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stark-muted md:text-xl" style={{ fontFamily: 'var(--font-body)' }}>
            Prefer a warm intro, a direct email, or a quick DM — choose what works best. Every channel lands with me.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {socialPlatforms.map((platform, index) => (
            <a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative transition-all duration-700 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-void-200/60 p-8 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                {/* Hover Gradient Effect */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${platform.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
                />

                {/* Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${platform.shadowColor}, transparent 70%)`,
                    filter: "blur(40px)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div
                    className={`mb-4 inline-flex transform rounded-xl bg-linear-to-br p-3 ${platform.gradient} text-white transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
                  >
                    {platform.icon}
                  </div>

                  {/* Text */}
                  <h3 className="mb-1 text-lg font-semibold text-stark transition-colors duration-300">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-stark-muted transition-colors duration-300 group-hover:text-stark">
                    {platform.description}
                  </p>

                  {/* Arrow Icon */}
                  <div className="mt-4 flex items-center text-stark-muted transition-all duration-300 group-hover:text-white">
                    <span className="text-sm font-medium transition-all duration-300">
                      Connect
                    </span>
                    <svg
                      className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <a
            href="mailto:anbumalligarjun1@gmail.com"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-neon px-10 py-4 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-void transition-all duration-300 hover:scale-105 hover:shadow-[0_18px_48px_rgba(0,255,148,0.28)]"
          >
            <span className="relative z-10">Send me an Email</span>
            <svg
              className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>

            {/* Button Shimmer */}
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/anbu-malligarjun-sri-835a372a4/"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-8 py-3 font-mono text-xs uppercase tracking-[0.18em] text-stark transition-all duration-300 hover:border-white/25 hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              Open LinkedIn
            </a>
            <a
              href="https://github.com/Anbu-Malligarjun-Sri"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-8 py-3 font-mono text-xs uppercase tracking-[0.18em] text-stark transition-all duration-300 hover:border-white/25 hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Mouse Follow Light */}
      <div
        className="pointer-events-none fixed h-96 w-96 rounded-full opacity-20 blur-[100px] transition-all duration-200 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.3), transparent)",
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
        }}
      />
    </section>
  );
}
