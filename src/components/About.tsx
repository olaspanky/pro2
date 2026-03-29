'use client';
import { useState } from 'react';
import Image from 'next/image';

const PROJECTS = [
  {
    img:'/images/project1.webp', alt:'95kWp Solar Plant, Dobi Abuja',
    cap:'95', unit:'kWp', title:'Solar Power Plant', loc:'📍 Dobi, Gwagwalada — Abuja',
    tech:'AC Coupled BESS', battery:'65 kWh', solar:'96 kWp', inverter:'122 KVA', year:'2022',
  },
  {
    img:'/images/project2.webp', alt:'100kWp Solar Plant, Otuan Bayelsa',
    cap:'100', unit:'kWp', title:'Solar Power Plant', loc:'📍 Otuan, Southern Ijaw — Bayelsa',
    tech:'DC Coupled Hybrid', battery:'230 kWh', solar:'100 kWp', inverter:'100 KVA', year:'2023',
  },
  {
    img:'/images/project3.webp', alt:'33kWp Solar Plant, Aguobiri Bayelsa',
    cap:'33', unit:'kWp', title:'Solar Power Plant', loc:'📍 Aguobiri, Southern Ijaw — Bayelsa',
    tech:'DC Coupled Hybrid', battery:'60 kWh', solar:'33 kWp', inverter:'12 KVA', year:'2023',
  },
  {
    img:'/images/project4.webp', alt:'100kWp Solar Plant, Korokorosei Bayelsa',
    cap:'100', unit:'kWp', title:'Solar Power Plant', loc:'📍 Korokorosei, Southern Ijaw — Bayelsa',
    tech:'DC Coupled Hybrid', battery:'230 kWh', solar:'100 kWp', inverter:'100 KVA', year:'2024',
  },
];

const VALUES = [
  { icon:'🎯', title:'Engineering First',       desc:'Every system is custom-designed for your specific load profile and facility layout.' },
  { icon:'🤝', title:'Long-Term Partnership',   desc:"We're your energy partner for the life of the system — not just the installer." },
  { icon:'💎', title:'Premium Equipment Only',  desc:'Huawei, Solis, DEYE & Dyque inverters; LiFePO4 BESS; Jinko, JA Solar & Longi 600W panels.' },
  { icon:'📊', title:'Transparent Pricing',     desc:'No hidden costs. Everything from cables to logistics is included in your quote.' },
];

export default function About() {
  const [idx, setIdx] = useState(0);
  const p = PROJECTS[idx];

  return (
    <section id="about" className="bg-[var(--off)] py-24">
      <div className="about-grid">

        {/* Left: text */}
        <div className="about-text-side reveal">
          <div className="s-label">About ProSolar</div>
          <h2 className="s-title">Nigeria&apos;s Commercial Solar Specialists</h2>
          <p className="s-sub">
            ProSolar Energy is a commercial and industrial solar solutions company headquartered in Abuja&apos;s Central Business District. We specialise in end-to-end solar power systems — from design and procurement to installation and long-term support — for businesses across Nigeria.
          </p>
          <p className="s-sub">
            Our mission is simple: help Nigerian businesses eliminate their dependence on diesel generators by making high-performance solar financially accessible — through flexible lease-to-own structures and our pioneering Energy as a Service programme.
          </p>
          <div className="values-grid">
            {VALUES.map(v => (
              <div key={v.title} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: project carousel */}
        <div className="about-img reveal">
          <div className="pc-wrap">
            <div className="pc-img-wrap">
              <Image src={p.img} alt={p.alt} fill className="pc-img object-cover" sizes="(max-width:900px) 100vw, 50vw" />
              <div className="pc-badge">PROJECT {idx+1} / {PROJECTS.length}</div>
              <button className="pc-arrow pc-prev" onClick={() => setIdx((idx-1+PROJECTS.length)%PROJECTS.length)}>←</button>
              <button className="pc-arrow pc-next" onClick={() => setIdx((idx+1)%PROJECTS.length)}>→</button>
            </div>
            <div className="pc-details">
              <div className="pc-cap-row">
                <div className="pc-cap">{p.cap}<span>{p.unit}</span></div>
                <div>
                  <div className="pc-title">{p.title}</div>
                  <div className="pc-loc">{p.loc}</div>
                </div>
              </div>
              {[
                { k:'Technology',      v: p.tech    },
                { k:'Battery',         v: p.battery  },
                { k:'Solar Capacity',  v: p.solar    },
                { k:'Inverter',        v: p.inverter },
                { k:'Year',            v: p.year     },
              ].map(row => (
                <div key={row.k} className="pc-row">
                  <span className="pc-dk">{row.k}</span>
                  <span className="pc-dv">{row.v}</span>
                </div>
              ))}
              <div className="pc-dots">
                {PROJECTS.map((_, i) => (
                  <div key={i} className={`pc-dot${i===idx ? ' active' : ''}`} onClick={() => setIdx(i)} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
