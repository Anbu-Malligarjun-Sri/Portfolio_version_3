"use client";

import { useEffect } from "react";
import Link from "next/link";
import "../pages.css";

export default function SagittariusPage() {
  useEffect(() => {
    const rungsContainer = document.querySelector(".dna-rungs");
    if (rungsContainer) {
      rungsContainer.innerHTML = "";
      for (let i = 0; i < 20; i++) {
        const rung = document.createElement("div");
        rung.className = "dna-rung";
        rung.style.top = `${i * 5}%`;
        rung.style.animationDelay = `${i * 0.1}s`;
        rungsContainer.appendChild(rung);
      }
    }
  }, []);

  return (
    <div className="subpage startup-page">
      {/* Navigation */}
      <header className="header header-dark">
        <nav className="nav">
          <Link href="/" className="nav-logo">
            <span className="logo-text">AM</span>
          </Link>
          <Link href="/" className="nav-back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </Link>
        </nav>
      </header>

      {/* Hero Section with DNA Animation */}
      <section className="page-hero startup-hero">
        <div className="dna-container">
          <div className="dna-helix">
            <div className="dna-strand strand-left"></div>
            <div className="dna-strand strand-right"></div>
            <div className="dna-rungs"></div>
          </div>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="company-badge">
            <span className="badge-text">Founder &amp; CEO</span>
          </div>
          <h1 className="page-title">
            <span className="title-line">Sagittarius</span>
          </h1>
          <p className="page-subtitle">AI × Biology × Gene Editing</p>
          <div className="hero-tags">
            <span className="tag">Artificial Intelligence</span>
            <span className="tag">Bioinformatics</span>
            <span className="tag">Gene Editing</span>
            <span className="tag">Regenerative Medicine</span>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="page-section vision-section">
        <div className="section-container">
          <div className="vision-block">
            <div className="vision-marker">
              <span className="marker-line"></span>
              <span className="marker-text">The Vision</span>
            </div>
            <h2 className="vision-statement">
              Our dream is to build a company that focuses on integrating{" "}
              <span className="highlight">AI technology</span> in all fields of{" "}
              <span className="highlight">STEM</span>, starting with biology.
            </h2>
          </div>
        </div>
      </section>

      {/* Mission Pillars */}
      <section className="page-section pillars-section">
        <div className="section-container">
          <h2 className="section-heading">Mission Pillars</h2>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-number">01</div>
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 8a4 4 0 0 1 0 8" />
                </svg>
              </div>
              <h3 className="pillar-title">Gene Editing &amp; Disease Prevention</h3>
              <p className="pillar-description">
                Identify the specific gene sequences that cause inherited diseases through
                generational transmission. Our AI models analyze genomic data to pinpoint
                mutations, enabling targeted gene editing interventions that can{" "}
                <strong>stop hereditary diseases</strong> before they manifest.
              </p>
              <div className="pillar-tags">
                <span>CRISPR</span>
                <span>Genomics</span>
                <span>Hereditary Diseases</span>
              </div>
            </div>

            <div className="pillar-card">
              <div className="pillar-number">02</div>
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="pillar-title">Regenerative Medicine Research</h3>
              <p className="pillar-description">
                Pioneering AI-driven research in tissue regeneration and cellular reprogramming.
                Our algorithms model complex biological processes to accelerate discoveries
                in stem cell therapy, organ regeneration, and age-related disease reversal.
              </p>
              <div className="pillar-tags">
                <span>Stem Cells</span>
                <span>Tissue Engineering</span>
                <span>Longevity</span>
              </div>
            </div>

            <div className="pillar-card">
              <div className="pillar-number">03</div>
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 12c2-3 6-6 10-6s8 3 10 6c-2 3-6 6-10 6s-8-3-10-6z" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M3 20l18-16" />
                </svg>
              </div>
              <h3 className="pillar-title">Marine Species eDNA Analysis</h3>
              <p className="pillar-description">
                Environmental DNA (eDNA) analysis of marine ecosystems using machine learning.
                Track biodiversity, detect invasive species, and monitor ocean health through
                water sample analysis — preserving our planet&apos;s most mysterious frontier.
              </p>
              <div className="pillar-tags">
                <span>eDNA</span>
                <span>Marine Biology</span>
                <span>Conservation</span>
              </div>
            </div>

            <div className="pillar-card">
              <div className="pillar-number">04</div>
              <div className="pillar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a10 10 0 0 0 0 20M2 12a10 10 0 0 1 20 0" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="pillar-title">Quantum Wave Mechanics &amp; Cancer</h3>
              <p className="pillar-description">
                Exploring the intersection of quantum physics and oncology. Using AI to model
                quantum wave mechanics at the molecular level, we&apos;re investigating novel
                approaches to cancer treatment that operate at the fundamental physics of
                cellular behavior.
              </p>
              <div className="pillar-tags">
                <span>Quantum Biology</span>
                <span>Oncology</span>
                <span>Molecular Modeling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Quote */}
      <section className="page-section quote-section">
        <div className="section-container">
          <blockquote className="featured-quote">
            <p>
              &ldquo;The code of life is the most elegant program ever written.
              Our mission is to learn its syntax, understand its logic,
              and when necessary — debug its errors.&rdquo;
            </p>
            <cite>— Anbu Malligarjun, Founder</cite>
          </blockquote>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="page-section tech-section">
        <div className="section-container">
          <h2 className="section-heading">Technology Stack</h2>
          <p className="section-subheading">The tools and frameworks powering our research</p>

          <div className="tech-grid">
            <div className="tech-category">
              <h3>Machine Learning</h3>
              <ul>
                <li>PyTorch / TensorFlow</li>
                <li>Transformers (BioBERT, ESM)</li>
                <li>Graph Neural Networks</li>
                <li>Reinforcement Learning</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Bioinformatics</h3>
              <ul>
                <li>Biopython</li>
                <li>BLAST / HMMER</li>
                <li>AlphaFold Integration</li>
                <li>Genome Analysis Tools</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Data Infrastructure</h3>
              <ul>
                <li>Apache Spark</li>
                <li>PostgreSQL / MongoDB</li>
                <li>AWS / GCP Cloud</li>
                <li>Docker / Kubernetes</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Visualization</h3>
              <ul>
                <li>PyMOL / ChimeraX</li>
                <li>D3.js / Plotly</li>
                <li>Three.js (3D Models)</li>
                <li>Jupyter Notebooks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="page-section connect-section startup-connect">
        <div className="section-container">
          <h2 className="section-heading">Get Involved</h2>
          <p className="section-subheading">Interested in our mission? Let&apos;s connect.</p>

          <div className="connect-grid">
            <a href="https://github.com/Sagittarius-py" target="_blank" rel="noopener noreferrer" className="connect-card">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <div className="connect-info">
                <span className="connect-label">GitHub Organization</span>
                <span className="connect-value">Sagittarius-py</span>
              </div>
            </a>

            <a href="mailto:anbumalligarjun@gmail.com?subject=Sagittarius Inquiry" className="connect-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <div className="connect-info">
                <span className="connect-label">Contact</span>
                <span className="connect-value">anbumalligarjun@gmail.com</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Status Banner */}
      <section className="page-section status-section">
        <div className="section-container">
          <div className="status-banner">
            <div className="status-indicator">
              <span className="pulse"></span>
              <span className="status-text">Currently in Research Phase</span>
            </div>
            <p className="status-description">
              Sagittarius is currently in the research and development phase.
              We&apos;re building foundational AI models and establishing partnerships
              with research institutions. Stay tuned for updates.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="page-footer">
        <div className="footer-content">
          <Link href="/" className="footer-back">← Back to Portfolio</Link>
          <span className="footer-copyright">© 2026 Sagittarius × Anbu Malligarjun</span>
        </div>
      </footer>
    </div>
  );
}
