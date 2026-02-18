"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const contactRows = [
    {
      label: "Email",
      value: "hello@anbumalligarjun.com",
      displayValue: "hello@anbumalligarjun.com",
      href: "mailto:anbumalligarjunsri@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "@anbumalligarjun",
      displayValue: "@anbumalligarjun",
      href: "https://github.com/Anbu-Malligarjun-Sri",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "/in/anbumalligarjun",
      displayValue: "/in/anbumalligarjun",
      href: "https://www.linkedin.com/in/anbu-malligarjun-sri-835a372a4/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      value: "@SamSciTech",
      displayValue: "@SamSciTech",
      href: "https://www.youtube.com/channel/UCXHN6dAbYjsC9eF8Dk2qTtg",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-void"
    >
      {/* Ambient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(0,255,148,0.08),transparent_45%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 py-24 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl w-full">
          <SectionHeading
            label="Get In Touch"
            title="Let's Build Something Together."
            subtitle="Whether it's a collaboration on de-extinction research, an educational initiative, an engineering challenge, or just a conversation worth having — I'm always open."
            align="left"
          />

          {/* Contact Rows */}
          <div className="mt-12 space-y-0 divide-y divide-white/8">
            {contactRows.map((row, index) => (
              <a
                key={row.label}
                href={row.href}
                target={row.label === "Email" ? undefined : "_blank"}
                rel={row.label === "Email" ? undefined : "noopener noreferrer"}
                className={`group flex items-center gap-5 py-6 transition-all duration-500 hover:pl-2 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-stark-dim transition-all duration-300 group-hover:bg-neon/10 group-hover:text-neon">
                  {row.icon}
                </div>

                {/* Label + Value */}
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neon/60">
                    {row.label}
                  </p>
                  <p className="mt-0.5 text-base font-medium text-stark transition-colors duration-300 group-hover:text-neon truncate">
                    {row.displayValue}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  className="h-4 w-4 shrink-0 text-stark-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-neon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div
            className={`mt-12 transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            <a
              href="mailto:anbumalligarjunsri@gmail.com"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-neon px-10 py-4 font-mono text-sm font-semibold uppercase tracking-[0.18em] text-void transition-all duration-300 hover:scale-105 hover:shadow-[0_18px_48px_rgba(0,255,148,0.28)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Send me an email
              </span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
