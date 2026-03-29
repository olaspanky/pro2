const PROBLEMS = [
  { n:'01', h:'Diesel costs keep rising, with no ceiling in sight',          p:'Every fuel price hike directly hits your bottom line. Factories, hospitals, hotels — all held hostage to diesel prices they cannot control or predict.' },
  { n:'02', h:'Generator downtime disrupts operations and revenue',          p:'Maintenance windows, fuel runs, and breakdowns don\'t wait for business hours. Every hour of downtime is a direct loss — in output, service, and customer trust.' },
  { n:'03', h:'You\'re paying millions monthly and own nothing',             p:'Diesel spend is pure cost — no asset, no equity, no residual value. It\'s money that disappears every month with nothing to show for it.' },
  { n:'04', h:'ESG pressure is mounting from investors and partners',        p:'Global partners, investors, and regulators increasingly require measurable emissions reductions. Running diesel generators puts your business on the wrong side of that conversation.' },
];

const BARS = [
  { name:'🛢 Generator Diesel',     pct: 72, cls:'fill-red'   },
  { name:'⚙️ Maintenance & Repairs', pct: 18, cls:'fill-amber' },
  { name:'🔌 Grid Costs',            pct: 10, cls:'fill-blue'  },
];

export default function Problem() {
  return (
    <section id="problem" className="bg-[var(--off)]">
      <div className="problem-grid">
        {/* Visual */}
        <div className="problem-visual reveal">
          <div className="pv-header">
            <div className="pv-label">Nigerian businesses are bleeding</div>
            <div className="pv-big">₦4.2M+</div>
            <div className="pv-unit">every month — straight into a generator</div>
          </div>
          {BARS.map(b => (
            <div key={b.name} className="cost-bar">
              <div className="cb-row"><span className="cb-name">{b.name}</span><span className="cb-pct">{b.pct}%</span></div>
              <div className="cb-track"><div className={`cb-fill ${b.cls}`} style={{ width:`${b.pct}%` }} /></div>
            </div>
          ))}
          <div className="pv-note">
            With diesel at ₦1,500–₦1,800/litre, a 50KVA generator running 18 hrs/day costs over ₦4M monthly. That&apos;s ₦50M+ per year — money leaving your business forever.
          </div>
        </div>

        {/* Text */}
        <div className="reveal">
          <div className="s-label">The Problem</div>
          <h2 className="s-title">Your Generator Is Eating Your Profit</h2>
          <p className="s-sub" style={{ marginBottom: 0 }}>
            Nigeria&apos;s grid delivers less than 4,000MW for 200 million people. For businesses like yours, that means one thing: you&apos;re running your own private power plant — and paying dearly for it every day.
          </p>
          <div className="problems-list" style={{ marginTop: 32 }}>
            {PROBLEMS.map(p => (
              <div key={p.n} className="prob-item">
                <div className="prob-num">{p.n}</div>
                <div className="prob-content">
                  <h3>{p.h}</h3>
                  <p>{p.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
