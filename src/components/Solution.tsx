import Image from 'next/image';

const BENEFITS = [
  { icon:'⚡', h:'Predictable, Fixed Energy Costs',        p:'Lock in your monthly payments and eliminate exposure to diesel price volatility — forever.' },
  { icon:'🏭', h:'Scaled for Industrial Operations',       p:'From 16KVA SMEs to 10MW mega-factories — we engineer systems that match your exact load profile.' },
  { icon:'🔋', h:'Battery Backup for Seamless Operations', p:'Premium Lithium Battery Storage Systems keep your facility running through outages, early mornings, evenings and grid failures.' },
  { icon:'🛠', h:'Full Installation & Lifetime Support',   p:'Our engineers handle everything — design, installation, commissioning, and ongoing maintenance.' },
  { icon:'🌿', h:'Carbon Footprint Reduction',             p:'Replace diesel with clean solar energy and meet your ESG commitments with verifiable impact data.' },
];

export default function Solution() {
  return (
    <section id="solution" className="py-24">
      <div className="solution-grid">
        <div className="reveal">
          <div className="s-label">The Solution</div>
          <h2 className="s-title">Industrial Solar That Pays for Itself</h2>
          <p className="s-sub">
            Prosolar designs, installs, and maintains high-capacity solar–inverter–battery systems for commercial and industrial businesses. We offer two models: a Lease-to-Own (LtO) model, where you pay over a period of 12–60 months to own the solar system, and an Energy-as-a-Service (EaaS) model, where you pay only for the energy you consume over a 25-year period.
          </p>
          <div className="benefits-list">
            {BENEFITS.map(b => (
              <div key={b.h} className="benefit-item">
                <div className="benefit-icon-wrap">{b.icon}</div>
                <div>
                  <h4>{b.h}</h4>
                  <p>{b.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal">
          <div className="arch-card">
            <div className="arch-label"><span>⚡</span> System Architecture — How It All Connects</div>
            <Image src="/images/system-architecture.webp" alt="Solar system architecture diagram" width={600} height={400} className="arch-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
