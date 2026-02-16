"use client";

import Link from "next/link";
import "../pages.css";

export default function YouTubePage() {
  return (
    <div className="subpage youtube-page">
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

      {/* Hero Section */}
      <section className="page-hero youtube-hero">
        <div className="hero-bg-image" style={{ backgroundImage: "url('/Yotube/background.png')" }}></div>
        <div className="hero-overlay"></div>

        {/* Animated Stars Background */}
        <div className="stars-container">
          <div className="stars stars-1"></div>
          <div className="stars stars-2"></div>
          <div className="stars stars-3"></div>
        </div>

        {/* Floating Particles */}
        <div className="floating-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>

        {/* Animated Nebula Glow */}
        <div className="nebula-glow"></div>

        {/* Orbital Rings */}
        <div className="orbital-system">
          <div className="orbit orbit-1"></div>
          <div className="orbit orbit-2"></div>
          <div className="orbit orbit-3"></div>
        </div>

        <div className="hero-content">
          {/* Logo with Glow Ring */}
          <div className="logo-container">
            <div className="logo-glow-ring"></div>
            <div className="logo-pulse-ring"></div>
            <a href="https://www.youtube.com/@SamSciTech" target="_blank" rel="noopener noreferrer" className="hero-logo-link">
              <img src="/Yotube/logo.jpg" alt="Sam SciTech Logo" className="channel-logo" />
            </a>
          </div>

          {/* Animated Title */}
          <h1 className="page-title glitch-text" data-text="Sam SciTech">Sam SciTech</h1>
          <p className="page-subtitle typewriter">Where the Universe Meets Understanding</p>

          {/* Enhanced Tags with Glow */}
          <div className="hero-tags">
            <a href="https://www.feynmanlectures.caltech.edu/" target="_blank" rel="noopener noreferrer" className="tag-link glow-tag">
              <span className="tag-icon">⚛️</span>
              <span>Physics</span>
            </a>
            <a href="https://www.khanacademy.org/math" target="_blank" rel="noopener noreferrer" className="tag-link glow-tag">
              <span className="tag-icon">∑</span>
              <span>Mathematics</span>
            </a>
            <a href="https://www.deeplearning.ai/" target="_blank" rel="noopener noreferrer" className="tag-link glow-tag">
              <span className="tag-icon">🧠</span>
              <span>Machine Learning</span>
            </a>
            <a href="https://www.nasa.gov/" target="_blank" rel="noopener noreferrer" className="tag-link glow-tag">
              <span className="tag-icon">🔭</span>
              <span>Astronomy</span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <div className="scroll-mouse">
              <div className="scroll-wheel"></div>
            </div>
            <span>Scroll to Explore</span>
          </div>
        </div>
      </section>

      {/* Channel Dashboard */}
      <section className="channel-showcase">
        <div className="dashboard-container">
          <div className="dashboard-image-wrapper">
            <img src="/Yotube/background.png" alt="Sam SciTech Channel" className="dashboard-image" />
            <div className="dashboard-overlay">
              <a href="https://www.youtube.com/@SamSciTech" target="_blank" rel="noopener noreferrer" className="visit-channel-btn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>Visit Channel</span>
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="page-section">
        <div className="section-container">
          <div className="intro-block">
            <h2 className="section-heading">The Pursuit of Understanding</h2>
            <div className="intro-content">
              <p className="lead-text">
                From the infinitesimal dance of subatomic particles to the majestic spiral of galaxies
                billions of light-years away, the universe speaks in the language of mathematics.{" "}
                <strong>Sam SciTech</strong> is my endeavour to decode that language and share it with the world.
              </p>
              <p>
                Physics isn&apos;t just equations on a blackboard — it&apos;s the poetry of reality. Mathematics
                isn&apos;t mere abstraction — it&apos;s the architecture of the cosmos. And when these disciplines
                converge with the power of machine learning, we unlock unprecedented capabilities to
                understand, predict, and shape our world.
              </p>
              <p>
                Through this channel, I break down complex scientific concepts into digestible content,
                from the mysteries of quantum mechanics to the linear algebra that powers neural networks.
                Whether you&apos;re a student, a curious mind, or a professional seeking deeper understanding,
                there&apos;s something here for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="page-section videos-section">
        <div className="section-container">
          <h2 className="section-heading">Featured Videos</h2>
          <p className="section-subheading">Explore the cosmos and the mathematics that governs it</p>

          <div className="videos-grid">
            {/* Video 1: Big Bang Theory */}
            <a href="https://youtu.be/VwfX2WYES2A?si=0cq0OY2CIcrL2wm2" target="_blank" rel="noopener noreferrer" className="video-card">
              <div className="video-thumbnail">
                <img src="https://img.youtube.com/vi/VwfX2WYES2A/maxresdefault.jpg" alt="Big Bang Theory Video Thumbnail" />
                <div className="play-overlay">
                  <div className="play-button">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="video-info">
                <h3 className="video-title">The Big Bang Theory</h3>
                <p className="video-description">
                  Journey to the beginning of time itself. Exploring the cosmic origin story —
                  from the initial singularity to the formation of the first atoms.
                </p>
                <div className="video-tags">
                  <span>Cosmology</span>
                  <span>Physics</span>
                  <span>Origin</span>
                </div>
              </div>
            </a>

            {/* Video 2: Linear Algebra */}
            <a href="https://youtu.be/Cof8M8wDJzs?si=xxecNjFfs8psIOFU" target="_blank" rel="noopener noreferrer" className="video-card">
              <div className="video-thumbnail">
                <img src="https://img.youtube.com/vi/Cof8M8wDJzs/maxresdefault.jpg" alt="Linear Algebra Video Thumbnail" />
                <div className="play-overlay">
                  <div className="play-button">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="video-info">
                <h3 className="video-title">Linear Algebra Fundamentals</h3>
                <p className="video-description">
                  The mathematical foundation that powers machine learning. Understanding vectors,
                  matrices, and transformations that shape modern AI.
                </p>
                <div className="video-tags">
                  <span>Mathematics</span>
                  <span>ML Foundations</span>
                  <span>Linear Algebra</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="page-section topics-section">
        <div className="section-container">
          <h2 className="section-heading">What I Cover</h2>

          <div className="topics-grid">
            <div className="topic-card">
              <div className="topic-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a10 10 0 0 1 0 20" />
                  <path d="M2 12h20" />
                  <path d="M12 2c2.5 2.5 4 6 4 10s-1.5 7.5-4 10" />
                </svg>
              </div>
              <h3>Astrophysics &amp; Cosmology</h3>
              <p>From black holes to the expanding universe, exploring the grandest structures and phenomena in existence.</p>
            </div>

            <div className="topic-card">
              <div className="topic-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              </div>
              <h3>Quantum Mechanics</h3>
              <p>Diving into the bizarre world of the very small, where particles exist in superposition and reality defies intuition.</p>
            </div>

            <div className="topic-card">
              <div className="topic-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16v16H4z" />
                  <path d="M4 12h16M12 4v16" />
                </svg>
              </div>
              <h3>Mathematics for ML</h3>
              <p>Linear algebra, calculus, probability, and statistics — the essential mathematics powering artificial intelligence.</p>
            </div>

            <div className="topic-card">
              <div className="topic-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Classical Physics</h3>
              <p>Newtonian mechanics, electromagnetism, and thermodynamics — the foundations upon which modern physics is built.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="page-section connect-section">
        <div className="section-container">
          <h2 className="section-heading">Join the Journey</h2>
          <p className="section-subheading">Connect across platforms and be part of the scientific exploration</p>

          <div className="social-grid">
            <a href="https://www.youtube.com/@SamSciTech" target="_blank" rel="noopener noreferrer" className="social-card youtube">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span className="social-name">YouTube</span>
              <span className="social-handle">@SamSciTech</span>
            </a>

            <a href="https://www.instagram.com/sam_scitech" target="_blank" rel="noopener noreferrer" className="social-card instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="social-name">Instagram</span>
              <span className="social-handle">@sam_scitech</span>
            </a>

            <a href="https://x.com/BrosSam14929" target="_blank" rel="noopener noreferrer" className="social-card twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="social-name">X / Twitter</span>
              <span className="social-handle">@BrosSam14929</span>
            </a>

            <a href="https://www.reddit.com/user/Sam_SciTech/" target="_blank" rel="noopener noreferrer" className="social-card reddit">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z" />
              </svg>
              <span className="social-name">Reddit</span>
              <span className="social-handle">u/Sam_SciTech</span>
            </a>

            <a href="https://www.threads.com/@sam_scitech" target="_blank" rel="noopener noreferrer" className="social-card threads">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.332-3.023.855-.71 2.024-1.121 3.39-1.194 1.073-.06 2.094.067 3.046.378l.022-.308c.048-1.02-.272-1.833-.949-2.415-.756-.65-1.9-.988-3.404-1.004l-.018-2.118c1.578.013 3.381.377 4.678 1.493 1.103.95 1.726 2.297 1.855 4.007.007.084.01.168.01.252a8.182 8.182 0 0 1-.058.971c.91.502 1.676 1.2 2.239 2.047.775 1.17 1.084 2.59.893 4.106-.274 2.177-1.31 3.994-3.003 5.26C17.86 23.156 15.307 24 12.186 24z" />
              </svg>
              <span className="social-name">Threads</span>
              <span className="social-handle">@sam_scitech</span>
            </a>

            <a href="https://github.com/Sam-SciTech" target="_blank" rel="noopener noreferrer" className="social-card github">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="social-name">GitHub</span>
              <span className="social-handle">Sam-SciTech</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="page-footer">
        <div className="footer-content">
          <Link href="/" className="footer-back">← Back to Portfolio</Link>
          <span className="footer-copyright">© 2026 Anbu Malligarjun</span>
        </div>
      </footer>
    </div>
  );
}
