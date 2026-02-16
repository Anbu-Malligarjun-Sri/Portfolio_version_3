"use client";

import Link from "next/link";
import "../pages.css";

export default function WritingPage() {
  return (
    <div className="subpage philosophy-page">
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
      <section className="page-hero philosophy-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="page-title">Philosophy</h1>
          <p className="page-subtitle">Reflections on Existence</p>
          <div className="hero-intro">
            <p>
              I see the world through different lenses — sometimes optimistic, sometimes melancholic,
              often contemplative. These are fragments of my inner dialogue, thoughts that surface
              when the noise fades and only questions remain.
            </p>
          </div>
        </div>
      </section>

      {/* Author&apos;s Note */}
      <section className="page-section author-note-section">
        <div className="section-container">
          <div className="author-note">
            <div className="note-marker">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <p>
              I have like different personalities for different occasions. Confusing, I know — but perhaps
              that&apos;s what makes us human. We&apos;re not singular entities but orchestras of voices,
              each playing a different tune depending on when you&apos;re listening.
            </p>
          </div>
        </div>
      </section>

      {/* Positive Philosophy */}
      <section className="page-section writing-section positive-section">
        <div className="section-container">
          <div className="writing-card tone-positive">
            <div className="philosophy-image-wrapper">
              <img src="/Philosophy/Gemini_Generated_Image_wif5znwif5znwif5.png" alt="Light of Hope" className="philosophy-image" />
              <div className="image-glow positive-glow"></div>
            </div>
            <div className="tone-indicator">
              <span className="tone-icon">☀</span>
              <span className="tone-label">The Optimist</span>
            </div>
            <div className="writing-content">
              <blockquote className="philosophy-quote">
                <p>
                  Life is a <em>serendipity</em>.
                </p>
                <p>
                  Life is only given once — to enjoy and experience what it is to be lived.
                  Every sunrise is an invitation, every breath a gift we didn&apos;t earn but received anyway.
                  We stumble upon beauty in unexpected corners: a stranger&apos;s smile,
                  the smell of rain on warm earth, the perfect alignment of moments that
                  somehow brought us here, reading these words, existing in this improbable universe.
                </p>
                <p>
                  The cosmos conspired for 13.8 billion years to create this exact moment.
                  Stars had to die so that the atoms in your body could exist.
                  That&apos;s not random — that&apos;s destiny dressed as coincidence.
                </p>
                <p>
                  So live. Not carefully, not fearfully — but fully.
                  The universe didn&apos;t go through all that trouble for you to play it safe.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Negative Philosophy */}
      <section className="page-section writing-section negative-section">
        <div className="section-container">
          <div className="writing-card tone-negative">
            <div className="philosophy-image-wrapper">
              <img src="/Philosophy/1769969164918.jpeg" alt="Shadows of Doubt" className="philosophy-image" />
              <div className="image-glow negative-glow"></div>
            </div>
            <div className="tone-indicator">
              <span className="tone-icon">☾</span>
              <span className="tone-label">The Melancholic</span>
            </div>
            <div className="writing-content">
              <blockquote className="philosophy-quote">
                <p>
                  How come life is to enjoy when all it has to offer is just <em>sufferings</em>?
                </p>
                <p>
                  We enter this world screaming, and we spend the rest of our time
                  trying to understand why. Love leads to loss. Dreams dissolve into disappointments.
                  We build sandcastles knowing the tide is coming.
                </p>
                <p>
                  Perhaps the ancient pessimists were right — to exist is to suffer.
                  Buddha saw it. Schopenhauer wrote about it. Every human heart eventually learns it.
                  We chase happiness like shadows, only to find that the closer we get,
                  the more it recedes.
                </p>
                <p>
                  And yet... we persist. Maybe that&apos;s the tragedy. Or maybe that&apos;s the point.
                  I haven&apos;t decided which.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Neutral Perspectives */}
      <section className="page-section perspectives-section">
        <div className="section-container">
          <div className="section-header-block">
            <span className="section-eyebrow">Perspectives</span>
            <h2 className="section-heading">Neutral Grounds</h2>
            <p className="section-subheading">Neither dark nor light — just observation</p>
            <div className="section-divider"></div>
          </div>

          <div className="perspectives-grid">
            {/* Philosophical View */}
            <article className="perspective-card" data-perspective="philosopher">
              <div className="perspective-image-wrapper">
                <img src="/Philosophy/1769969171995.jpeg" alt="The Philosopher" className="perspective-image" />
                <div className="perspective-image-overlay"></div>
              </div>
              <div className="perspective-body">
                <div className="perspective-header">
                  <span className="perspective-number">01</span>
                  <div className="perspective-title-block">
                    <span className="perspective-label">The Mind</span>
                    <h3>The Philosopher</h3>
                  </div>
                </div>
                <div className="perspective-content">
                  <p className="perspective-lead">
                    Meaning is not discovered — it is <em>created</em>.
                  </p>
                  <p>
                    The universe is fundamentally indifferent, neither kind nor cruel.
                    We are meaning-making machines in a meaning-absent cosmos,
                    and therein lies our tragedy and our power.
                  </p>
                  <p>
                    Sartre said we are condemned to be free. I&apos;d say we are privileged to be confused.
                    Every question we ask is a small rebellion against entropy,
                    a whisper into the void that says: &ldquo;I am here, and I am wondering.&rdquo;
                  </p>
                  <p className="perspective-closing">
                    That&apos;s enough. That has to be enough.
                  </p>
                </div>
              </div>
            </article>

            {/* Poetic View */}
            <article className="perspective-card" data-perspective="poet">
              <div className="perspective-image-wrapper">
                <img src="/Philosophy/1769969177076.jpeg" alt="The Poet" className="perspective-image" />
                <div className="perspective-image-overlay"></div>
              </div>
              <div className="perspective-body">
                <div className="perspective-header">
                  <span className="perspective-number">02</span>
                  <div className="perspective-title-block">
                    <span className="perspective-label">The Heart</span>
                    <h3>The Poet</h3>
                  </div>
                </div>
                <div className="perspective-content">
                  <p className="perspective-lead">
                    We are stardust learning to contemplate <em>stars</em>.
                  </p>
                  <div className="poetry-block">
                    <p>
                      Atoms arranged in patterns that ask why they&apos;re arranged.<br />
                      The universe looking at itself through human eyes,<br />
                      wondering if what it sees is beautiful or broken.
                    </p>
                    <p>
                      Words fail where feelings flourish.<br />
                      Language is a net with holes too large<br />
                      to catch the fish that matter most.
                    </p>
                  </div>
                  <p className="perspective-closing">
                    Perhaps poetry isn&apos;t about capturing truth,<br />
                    but about admitting that truth cannot be caught.
                  </p>
                </div>
              </div>
            </article>

            {/* Stoic View */}
            <article className="perspective-card" data-perspective="stoic">
              <div className="perspective-image-wrapper">
                <img src="/Philosophy/wallpaperflare.com_wallpaper (13).jpg" alt="The Stoic" className="perspective-image" />
                <div className="perspective-image-overlay"></div>
              </div>
              <div className="perspective-body">
                <div className="perspective-header">
                  <span className="perspective-number">03</span>
                  <div className="perspective-title-block">
                    <span className="perspective-label">The Will</span>
                    <h3>The Stoic</h3>
                  </div>
                </div>
                <div className="perspective-content">
                  <p className="perspective-lead">
                    Control what you can. Accept what you <em>cannot</em>.
                  </p>
                  <p>
                    The distinction between the two is the beginning of wisdom.
                    Emotions are data, not directives. They inform but should not command.
                  </p>
                  <p>
                    The Stoics understood this: feel everything, react to nothing impulsively.
                    Let the storm pass through you without becoming the storm.
                  </p>
                  <p>
                    Strength is not the absence of vulnerability — it&apos;s the choice to stand
                    despite it.
                  </p>
                  <p className="perspective-closing stoic-closing">
                    The obstacle is the way. Face it.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Final Reflection */}
      <section className="page-section reflection-section">
        <div className="section-container">
          <div className="final-reflection">
            <div className="reflection-border"></div>
            <div className="reflection-content">
              <h2>A Final Word</h2>
              <p>
                If these words seem contradictory, that&apos;s because they are.
                I am optimist and pessimist, poet and analyst,
                dreamer and skeptic — all coexisting in a single mind.
              </p>
              <p>
                Perhaps you&apos;re the same. Perhaps we all are.
              </p>
              <p>
                And perhaps that&apos;s not a flaw to fix but a complexity to embrace.
                We are not monoliths but mosaics —
                beautiful precisely because we contain multitudes.
              </p>
              <div className="reflection-signature">
                — A.M.
              </div>
            </div>
            <div className="reflection-border"></div>
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
