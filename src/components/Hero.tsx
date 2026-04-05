'use client';
import { useEffect, useRef } from 'react';

const STATS = [
  { num: '10MW',  label: 'Industrial Capacity'        },
  { num: '12–60', label: 'Months Lease Period'        },
  { num: '₦0',    label: 'EaaS Upfront Cost'          },
  { num: '25yr',  label: 'Lifetime System Performance'},
];

export default function Hero({ onAdvisorOpen }: { onAdvisorOpen: () => void }) {
  const statsRef = useRef<HTMLDivElement>(null);

  // Counter animation for numeric stats
  useEffect(() => {
    const nums = statsRef.current?.querySelectorAll<HTMLDivElement>('.h-stat-num');
    nums?.forEach(el => { el.style.animation = 'countUp .6s ease both'; });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-20">
      <div className="hero-bg-image" />
      <div className="hero-bg-overlay" />
      <div className="hero-bg-grid" />
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />

      <div className="hero-content relative z-10 w-full px-[5%] py-20">
        <h1 className="h-title">
          Eliminate Diesel Costs.<br />
          <span className="line2">
            Power Your Business <span className="text-gold">With Solar.</span>
          </span>
        </h1>

        <p className="hero-sub mx-auto text-white" style={{ maxWidth: 580, marginBottom: 64 }}>
          Switch to reliable, industrial-grade solar from 16kVA to 10MW. No upfront burden — pay only for the energy you use, or pay monthly for a period to own the system.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-24">
          <button onClick={onAdvisorOpen} className="btn-primary">
            ☀ Talk to an Advisor
          </button>
          <a href="#packages" className="btn-ghost">View Packages →</a>
        </div>

        <div ref={statsRef} className="hero-stats-grid">
          {STATS.map(s => (
            <div key={s.label} className="h-stat text-center">
              <div className="h-stat-num font-bebas text-[clamp(2rem,5vw,3rem)] text-gold leading-none">
                {s.num.includes('₦')
                  ? <><span style={{fontSize:'0.9em', verticalAlign:'middle'}}>{s.num[0]}</span>{s.num.slice(1)}</>
                  : s.num}
              </div>
              <div className="h-stat-label text-[0.75rem] tracking-[1px] uppercase text-[rgba(255,255,255,0.6)] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
