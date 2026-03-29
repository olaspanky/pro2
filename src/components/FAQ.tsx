'use client';
import { useState } from 'react';

const FAQS = [
  { q:'What is the difference between Lease-to-Own and EaaS?',
    a:'With Lease-to-Own, you make fixed monthly payments over 12–60 months and own the system outright at the end of the term. With EaaS (Energy as a Service), ProSolar funds, owns and maintains the system — you simply pay for the electricity you consume at an agreed rate per kWh, with zero upfront capital.' },
  { q:'How large can an EaaS system be?',
    a:'Our EaaS programme scales from 80KVA all the way to 10MW. If your business requires significant power — hotels, hospitals, factories, campuses — EaaS is designed for you.' },
  { q:'What happens if the system breaks down?',
    a:'For EaaS clients, ProSolar owns the system and takes full responsibility for all operations and maintenance. For lease-to-own, all equipment comes with manufacturer warranties, and we provide 12-month installation support.' },
  { q:'How long does installation take?',
    a:'From signed agreement to a live system is typically 4–6 weeks: site assessment, design finalisation, procurement, and installation. We provide a detailed project schedule before work begins.' },
  { q:'Do you handle the permits and approvals?',
    a:'Yes. We manage all necessary documentation, grid connection approvals, and local authority permits on your behalf — so you can focus on your business, not the paperwork.' },
  { q:'What brands of equipment do you use?',
    a:'We exclusively deploy Tier 1 equipment: Huawei, Solis, DEYE, and Dyque PV or hybrid inverters; LiFePO4 battery banks (BESS); and Jinko, JA Solar, and Longi 600W monocrystalline solar panels. All hardware comes with manufacturer warranties of up to 25 years on panels, 5 years on inverters and batteries.' },
];

export default function FAQ({ onAdvisorOpen }: { onAdvisorOpen: () => void }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="bg-white py-24">
      <div className="faq-grid">

        {/* Left */}
        <div className="reveal">
          <div className="s-label">FAQ</div>
          <h2 className="s-title">Common Questions</h2>
          <p className="s-sub mb-6">Still unsure? Talk to one of our solar advisors — we&apos;ll walk you through exactly what makes sense for your business.</p>
          <button onClick={onAdvisorOpen} className="btn-gold border-none cursor-pointer">Ask an Advisor</button>
        </div>

        {/* Right */}
        <div className="faq-list reveal">
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item">
              <button className={`faq-q${open === i ? ' open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <span className="faq-ico">{open === i ? '×' : '+'}</span>
              </button>
              <div className={`faq-a${open === i ? ' open' : ''}`}>
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
