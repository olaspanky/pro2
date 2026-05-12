'use client';
import { useState, useEffect, useRef } from 'react';

// Mobile: https://youtu.be/W7AGeT4KzBM → ID: W7AGeT4KzBM
// Web:    https://youtu.be/xf4rSK28WM8 → ID: xf4rSK28WM8
const MOBILE_VIDEO_ID = 'W7AGeT4KzBM';
const DESKTOP_VIDEO_ID = 'xf4rSK28WM8';

export default function VSL() {
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  // Detect mobile (≤768px) — re-check on resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const videoId = isMobile ? MOBILE_VIDEO_ID : DESKTOP_VIDEO_ID;

  // YouTube embed URL — standard domain avoids "private video" false-positives
  const origin = typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';
  const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white&iv_load_policy=3&origin=${origin}`;

  return (
    <>
      <style>{`
        .vsl-section {
          position: relative;
          background: var(--navy, #0b1524);
          padding: 6rem 1.25rem;
          overflow: hidden;
        }

        /* ── animated grid bg ── */
        .vsl-grid {
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(0deg, rgba(255,255,255,.04) 1px, transparent 1px),
            repeating-linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* ── radial glow behind video ── */
        .vsl-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(900px, 130vw);
          height: min(700px, 100vw);
          background: radial-gradient(ellipse at center, rgba(245,184,0,0.09) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        /* ── container ── */
        .vsl-container {
          position: relative;
          z-index: 2;
          max-width: 860px;
          margin: 0 auto;
        }

        /* ── entrance animation ── */
        .vsl-animate {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.75s cubic-bezier(.22,.68,0,1.2), transform 0.75s cubic-bezier(.22,.68,0,1.2);
        }
        .vsl-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .vsl-animate.delay-1 { transition-delay: 0.1s; }
        .vsl-animate.delay-2 { transition-delay: 0.25s; }
        .vsl-animate.delay-3 { transition-delay: 0.4s; }

        /* ── badge ── */
        .vsl-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(245,184,0,0.35);
          color: #f5b800;
          font-size: 0.62rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 100px;
          margin-bottom: 1.25rem;
        }
        .vsl-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f5b800;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.75); }
        }

        .vsl-subtitle {
          color: rgba(255,255,255,0.72);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.7;
          font-size: 0.97rem;
        }

        /* ── video wrapper — 16:9 ── */
        .vsl-video-wrap {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;   /* 16:9 */
          border-radius: 14px;
          overflow: hidden;
          background: #0d1e35;
          /* Cinematic border */
          border: 1px solid rgba(245,184,0,0.18);
          box-shadow:
            0 0 0 1px rgba(245,184,0,0.07),
            0 30px 80px rgba(0,0,0,0.55),
            0 0 80px rgba(245,184,0,0.06);
        }

        /* corner accent lines */
        .vsl-video-wrap::before,
        .vsl-video-wrap::after {
          content: '';
          position: absolute;
          z-index: 10;
          pointer-events: none;
        }
        .vsl-video-wrap::before {
          top: 0; left: 0;
          width: 48px; height: 48px;
          border-top: 2px solid rgba(245,184,0,0.5);
          border-left: 2px solid rgba(245,184,0,0.5);
          border-radius: 14px 0 0 0;
        }
        .vsl-video-wrap::after {
          bottom: 0; right: 0;
          width: 48px; height: 48px;
          border-bottom: 2px solid rgba(245,184,0,0.5);
          border-right: 2px solid rgba(245,184,0,0.5);
          border-radius: 0 0 14px 0;
        }

        /* ── thumbnail / play state ── */
        .vsl-thumb {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
        }

        /* YouTube thumbnail image */
        .vsl-thumb-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.6s cubic-bezier(.22,.68,0,1.2);
          filter: brightness(0.45);
        }
        .vsl-thumb:hover .vsl-thumb-bg {
          transform: scale(1.04);
          filter: brightness(0.55);
        }

        /* scanline overlay */
        .vsl-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 3px,
            rgba(0,0,0,0.08) 3px,
            rgba(0,0,0,0.08) 4px
          );
          pointer-events: none;
          z-index: 2;
        }

        /* ── play button ── */
        .vsl-play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 110px; height: 110px;
          border-radius: 50%;
          background: #f5b800;
          border: 5px solid rgba(255,255,255,0.2);
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(.22,.68,0,1.6), box-shadow 0.3s ease, background 0.2s ease;
          box-shadow:
            0 0 0 0 rgba(245,184,0,0.6),
            0 0 60px rgba(245,184,0,0.4),
            0 16px 48px rgba(0,0,0,0.6);
          animation: ring-pulse 2.2s ease-in-out infinite;
        }
        @keyframes ring-pulse {
          0%,100% {
            box-shadow: 0 0 0 0 rgba(245,184,0,0.6), 0 0 60px rgba(245,184,0,0.4), 0 16px 48px rgba(0,0,0,0.6);
          }
          50% {
            box-shadow: 0 0 0 30px rgba(245,184,0,0), 0 0 90px rgba(245,184,0,0.25), 0 16px 48px rgba(0,0,0,0.6);
          }
        }
        .vsl-thumb:hover .vsl-play-btn {
          transform: translate(-50%, -50%) scale(1.12);
          background: #ffc914;
          box-shadow: 0 0 0 0 rgba(245,184,0,0.4), 0 0 110px rgba(245,184,0,0.55), 0 20px 60px rgba(0,0,0,0.7);
          animation: none;
        }
        .vsl-play-btn svg {
          width: 44px; height: 44px;
          fill: #0b1524;
          margin-left: 6px;
        }

        /* duration badge */
        .vsl-duration {
          position: absolute;
          z-index: 4;
          bottom: 14px;
          right: 14px;
          background: rgba(0,0,0,0.7);
          color: rgba(255,255,255,0.85);
          font-size: 0.7rem;
          font-variant-numeric: tabular-nums;
          letter-spacing: 1px;
          padding: 3px 8px;
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }

        /* mobile label badge */
        .vsl-mobile-badge {
          position: absolute;
          z-index: 4;
          top: 14px;
          left: 14px;
          background: rgba(245,184,0,0.15);
          border: 1px solid rgba(245,184,0,0.35);
          color: #f5b800;
          font-size: 0.58rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 100px;
          backdrop-filter: blur(4px);
        }

        /* ── live iframe ── */
        .vsl-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        /* ── footer label ── */
        .vsl-footer {
          text-align: center;
          margin-top: 1.5rem;
        }
        .vsl-footer-eyebrow {
          font-size: 0.62rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 4px;
        }
        .vsl-footer-name {
          font-size: 1.5rem;
          letter-spacing: 2px;
          color: #fff;
          font-weight: 700;
          text-transform: uppercase;
        }
        .vsl-footer-name span {
          color: #f5b800;
        }

        /* ── responsive ── */
        @media (max-width: 600px) {
          .vsl-section { padding: 4rem 1rem; }
          .vsl-play-btn { width: 84px; height: 84px; }
          .vsl-play-btn svg { width: 34px; height: 34px; }
          .vsl-footer-name { font-size: 1.15rem; }
        }
      `}</style>

      <section ref={sectionRef} className="vsl-section">
        {/* Background grid */}
        <div className="vsl-grid" />
        {/* Gold glow */}
        <div className="vsl-glow" />

        <div className="vsl-container">
          {/* Label */}
          <div className={`text-center mb-10 vsl-animate ${isVisible ? 'visible' : ''} delay-1`}>
            <div className="vsl-badge">
              <span className="vsl-badge-dot" />
              Hear it directly from our Founder
            </div>
            <p className="vsl-subtitle">
              Watch our founder explain exactly how Energy as a Service works — no upfront capital,
              no technical complexity, just clean power and a lower monthly bill from day one.
            </p>
          </div>

          {/* Video */}
          <div className={`vsl-animate ${isVisible ? 'visible' : ''} delay-2`}>
            <div className="vsl-video-wrap">
              {!playing ? (
                <div
                  ref={thumbRef}
                  className="vsl-thumb"
                  onClick={() => setPlaying(true)}
                  role="button"
                  aria-label="Play founder video"
                >
                  {/* HQ thumbnail from YouTube */}
                  <div
                    className="vsl-thumb-bg"
                    style={{
                      backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg), url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`
                    }}
                  />
                  <div className="vsl-scanlines" />

                  {/* Mobile indicator — only show when on mobile */}
                  {isMobile && (
                    <div className="vsl-mobile-badge">📱 Mobile Version</div>
                  )}

                  <button className="vsl-play-btn" aria-label="Play video">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>

                  <div className="vsl-duration">▶ Watch Now</div>
                </div>
              ) : (
                <iframe
                  className="vsl-iframe"
                  src={embedSrc}
                  title="ProSolar Energy — Founder Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </div>

          {/* Footer label */}
          <div className={`vsl-footer vsl-animate ${isVisible ? 'visible' : ''} delay-3`}>
            <div className="vsl-footer-eyebrow">Watch the EaaS Explainer</div>
            <div className="vsl-footer-name">
              <span>ProSolar</span> Energy — Founder
            </div>
          </div>
        </div>
      </section>
    </>
  );
}