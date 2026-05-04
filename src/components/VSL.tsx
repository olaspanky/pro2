'use client';
import { useState } from 'react';

const VIDEO_ID = 'YOUR_VIDEO_ID'; // ← replace with real YouTube ID

export default function VSL() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="vsl" className="relative bg-[var(--navy)] py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.3)_1px,transparent_1px),repeating-linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] bg-[length:40px_40px]" />

      <div className="vsl-container relative z-10">
        {/* Label */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 border border-[rgba(245,184,0,0.3)] text-gold text-[0.65rem] tracking-[3px] uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Hear it directly from our Founder
          </div>
          <p className="text-[rgba(255,255,255,0.75)] max-w-xl mx-auto leading-relaxed">
            Watch our founder explain exactly how Energy as a Service works — no upfront capital, no technical complexity, just clean power and a lower monthly bill from day one.
          </p>
        </div>

        {/* Video */}
        <div className="vsl-video-wrap">
          {!playing ? (
            <div className="vsl-thumb-inner flex items-center justify-center bg-[var(--navy-2)]">
              <button
                onClick={() => VIDEO_ID !== 'YOUR_VIDEO_ID' && setPlaying(true)}
                className="vsl-play-btn"
                aria-label="Play video"
              >
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </button>
              <p className="absolute bottom-4 text-[rgba(255,255,255,0.4)] text-sm">Your founder video will appear here</p>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          )}
        </div>

        {/* Sub-label */}
        <div className="text-center mt-6">
          <div className="text-[0.65rem] tracking-[3px] uppercase text-[rgba(255,255,255,0.4)] mb-1">Watch the EaaS Explainer</div>
          <div className="font-bebas text-white text-2xl tracking-wider">ProSolar Energy — Founder</div>
        </div>
      </div>
    </section>
  );
}
