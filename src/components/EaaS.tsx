const CARDS = [
  { icon:'💸', h:'Zero Capital Expenditure',          p:'ProSolar funds the full system. You pay nothing upfront — no procurement, no installation fees, no civil works cost.' },
  { icon:'⚡', h:'Pay Only for Energy Consumed',      p:'Your bill is based on actual kWh usage — at a rate significantly below diesel equivalent. Predictable. Auditable. Fair.' },
  { icon:'🔧', h:'Full O&M by ProSolar',              p:'We own the system, so we maintain it. All operations, monitoring, repairs and performance guarantees are our responsibility.' },
  { icon:'📈', h:'Scales to 10MW — Custom Engineered',p:'Need 500KW for a cold chain facility? 2MW for a steel mill? 10MW for an industrial park? We design to your exact specification.' },
  { icon:'📊', h:'Off-Balance Sheet Financing',       p:'EaaS is an operational expense — not a capital liability. Keeps your balance sheet clean and your borrowing capacity intact.' },
];

const SECTORS = [
  { e:'🏭', l:'Factories & Manufacturers' },
  { e:'🏥', l:'Hospitals & Clinics'       },
  { e:'🏨', l:'Hotels & Hospitality'      },
  { e:'🎓', l:'Universities & Schools'    },
  { e:'🛒', l:'Malls & Retail Chains'     },
  { e:'🏢', l:'Office Complexes'          },
];

const SCALE = [
  { val:'80KVA', lbl:'Entry Point' },
  { val:'500KW', lbl:'Mid-Scale'   },
  { val:'1MW',   lbl:'Industrial'  },
  { val:'10MW',  lbl:'Mega Plant'  },
];

export default function EaaS({ onAdvisorOpen }: { onAdvisorOpen: () => void }) {
  return (
    <section id="eaas" className="py-24">
      <div className="eaas-glow" />
      <div className="eaas-inner">
        <div className="eaas-layout">

          {/* Left */}
          <div className="reveal">
            <div className="s-label gold">Energy as a Service</div>
            <h2 className="s-title light">No Capex. No Risk.<br />Just Clean Power.</h2>
            <p className="s-sub light" style={{ marginBottom: 32 }}>
              For businesses that need significant power at scale — from the Emerald package all the way to 10MW industrial installations — our EaaS model removes the capital barrier entirely. ProSolar owns, installs, and maintains the system. You simply pay for the energy you use.
            </p>

            <div className="eaas-scale">
              <div className="scale-label">EaaS Capacity Range</div>
              <div className="scale-track"><div className="scale-fill" /></div>
              <div className="scale-markers">
                {SCALE.map(s => (
                  <div key={s.val} className="scale-mark">
                    <div className="scale-mark-val">{s.val}</div>
                    <div className="scale-mark-label">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="eaas-sectors">
              <div className="sectors-title">Who This Is Built For</div>
              <div className="sectors-grid">
                {SECTORS.map(s => (
                  <div key={s.l} className="sector-chip">
                    <span>{s.e}</span> {s.l}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="reveal">
            <div className="eaas-cards">
              {CARDS.map(c => (
                <div key={c.h} className="eaas-card">
                  <div className="eaas-card-icon">{c.icon}</div>
                  <div>
                    <h4>{c.h}</h4>
                    <p>{c.p}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <button onClick={onAdvisorOpen} className="btn-primary">
                Enquire About EaaS →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
