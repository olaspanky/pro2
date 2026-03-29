const STEPS = [
  { n:1, h:'Free Energy Audit & Load Assessment',    p:'Our engineers analyse your current consumption, peak load, and grid availability to design the right system for your facility.' },
  { n:2, h:'Custom System Design & Proposal',        p:'We deliver a detailed technical and financial proposal — including system specs, projected savings, and payment structure.' },
  { n:3, h:'Agreement & Financing Confirmation',     p:'Sign your lease-to-own agreement or EaaS contract. We handle all the paperwork and financing documentation.' },
  { n:4, h:'Installation & Commissioning',           p:'Our certified technicians install your system with zero disruption to your operations. Typical installation: 2–6 weeks depending on scale.' },
  { n:5, h:'Go Live & Start Saving',                 p:'Your system is commissioned, monitored, and fully operational. Watch your diesel bill disappear from day one.' },
];

const INCLUDED = [
  'Premium PV and Hybrid Inverter(s)',
  'High-Density LiFePO4 Battery Bank',
  '600W Monocrystalline Solar PV Modules',
  'Solar Mounting Rack System',
  'DC & AC Cabling (all gauges)',
  'DC Surge Protection Devices',
  'Professional Installation & Commissioning',
  'Transportation & Logistics',
  'System Online Monitoring & After-Sales Support',
  '25-Year Panel Performance Warranty',
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="bg-[var(--off)] py-24">
      <div className="roadmap-grid">

        {/* Left — Roadmap */}
        <div className="reveal">
          <div className="s-label">The Roadmap</div>
          <h2 className="s-title">From Conversation to Clean Power in Weeks</h2>
          <p className="s-sub">Our process is designed to get you off diesel as fast as possible — with no surprises along the way.</p>
          <div className="steps">
            {STEPS.map(s => (
              <div key={s.n} className="step">
                <div className="step-num">{s.n}</div>
                <div>
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — What's Included */}
        <div className="reveal">
          <div className="s-label">What&apos;s Included</div>
          <h2 className="s-title">Every Package Includes</h2>
          <div className="included-list">
            {INCLUDED.map(item => (
              <div key={item} className="included-item">
                <div className="tick">✓</div>
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
