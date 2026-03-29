const PACKAGES = [
  {
    tier:'silver', tierLabel:'Silver', name:'16kVA Solar System',
    total:'₦19,712,034.67', monthly:'~₦328K–₦411K / month',
    specs:[
      { ico:'⚡', k:'Inverter',     v:'16kW Hybrid'        },
      { ico:'🔋', k:'Battery',      v:'32KWH (SE-F16)'     },
      { ico:'☀️', k:'Solar Panels', v:'24 × 600W'          },
      { ico:'🏢', k:'Best For',     v:'SME Offices & Clinics'},
      { ico:'🛠', k:'Installation', v:'Included'           },
    ],
    roi:[
      { l:'Replaces Generator',       v:'20KVA Diesel Gen', green:false },
      { l:'Monthly Diesel Eliminated', v:'~₦2.71M',         green:true  },
      { l:'Net Monthly Saving',        v:'~₦2.34M',         green:true  },
      { l:'Annual Saving (Year 1)',    v:'~₦28.1M',         green:true  },
      { l:'⏱ Payback Period',          v:'~9 Months',       hi:true     },
      { l:'📈 25-Year Lifecycle Profit',v:'~₦791M',         hi:true     },
    ],
    model:'📋 Lease-to-Own · Own in 12–60 Months', modelCls:'mt-lease',
    ctaLabel:'Get Started →', ctaCls:'cta-outline', featured:false,
  },
  {
    tier:'diamond', tierLabel:'Diamond', name:'50kVA Solar System',
    total:'₦53,775,624.52', monthly:'~₦896K–₦1.12M / month',
    specs:[
      { ico:'⚡', k:'Inverter',     v:'50KVA Hybrid'         },
      { ico:'🔋', k:'Battery',      v:'60KWH (BOS-W)'        },
      { ico:'☀️', k:'Solar Panels', v:'96 × 600W'            },
      { ico:'🏢', k:'Best For',     v:'Hotels, Schools, Malls'},
      { ico:'🛠', k:'Installation', v:'Included'             },
    ],
    roi:[
      { l:'Replaces Generator',       v:'50KVA Diesel Gen', green:false },
      { l:'Monthly Diesel Eliminated', v:'~₦6.77M',         green:true  },
      { l:'Net Monthly Saving',        v:'~₦5.76M',         green:true  },
      { l:'Annual Saving (Year 1)',    v:'~₦69.1M',         green:true  },
      { l:'⏱ Payback Period',          v:'~9 Months',       hi:true     },
      { l:'📈 25-Year Lifecycle Profit',v:'~₦1.97B',        hi:true     },
    ],
    model:'📋 Lease-to-Own · Own in 12–60 Months', modelCls:'mt-lease',
    ctaLabel:'Get Started →', ctaCls:'cta-outline', featured:false,
  },
  {
    tier:'emerald', tierLabel:'Emerald', name:'80kVA Solar System',
    total:'₦89,655,554.58', monthly:'~₦1.49M–₦1.87M / month',
    specs:[
      { ico:'⚡', k:'Inverter',     v:'80KVA Hybrid'         },
      { ico:'🔋', k:'Battery',      v:'120KWH (2× 60KWH)'   },
      { ico:'☀️', k:'Solar Panels', v:'144 × 600W'           },
      { ico:'🏢', k:'Best For',     v:'Hospitals, Factories' },
      { ico:'🛠', k:'Installation', v:'Included'             },
    ],
    roi:[
      { l:'Replaces Generator',       v:'80KVA Diesel Gen', green:false },
      { l:'Monthly Diesel Eliminated', v:'~₦10.84M',        green:true  },
      { l:'Net Monthly Saving',        v:'~₦9.16M',         green:true  },
      { l:'Annual Saving (Year 1)',    v:'~₦109.9M',        green:true  },
      { l:'⏱ Payback Period',          v:'~10 Months',      hi:true     },
      { l:'📈 25-Year Lifecycle Profit',v:'~₦3.15B',        hi:true     },
    ],
    model:'✅ Also Qualifies for EaaS — Zero Capex Option', modelCls:'mt-eaas',
    ctaLabel:'Get My Proposal →', ctaCls:'cta-gold', featured:true,
  },
  {
    tier:'gold', tierLabel:'Gold', name:'100kVA Solar System',
    total:'₦133,645,933.28', monthly:'~₦2.23M–₦2.78M / month',
    specs:[
      { ico:'⚡', k:'Inverter',     v:'2× 50KVA Hybrid'         },
      { ico:'🔋', k:'Battery',      v:'215KWH Cluster System'   },
      { ico:'☀️', k:'Solar Panels', v:'240 × 600W'              },
      { ico:'🏢', k:'Best For',     v:'Large Factories, Complexes'},
      { ico:'🛠', k:'Installation', v:'Included'                },
    ],
    roi:[
      { l:'Replaces Generator',       v:'100KVA Diesel Gen', green:false },
      { l:'Monthly Diesel Eliminated', v:'~₦13.55M',         green:true  },
      { l:'Net Monthly Saving',        v:'~₦11.04M',         green:true  },
      { l:'Annual Saving (Year 1)',    v:'~₦132.5M',         green:true  },
      { l:'⏱ Payback Period',          v:'~12 Months',       hi:true     },
      { l:'📈 25-Year Lifecycle Profit',v:'~₦3.91B',         hi:true     },
    ],
    model:'✅ Also Qualifies for EaaS — Zero Capex Option', modelCls:'mt-eaas',
    ctaLabel:'Get My Proposal →', ctaCls:'cta-gold', featured:false,
  },
];

export default function Packages({ onPkgOpen }: { onPkgOpen: (tier:string,name:string)=>void }) {
  return (
    <section id="packages" className="bg-[var(--off)] py-24">
      <div className="pkg-header reveal text-center mb-12 px-[5%]">
        <div className="s-label mx-auto" style={{ display:'inline-block' }}>Lease-to-Own Packages</div>
        <h2 className="s-title text-center">Four Packages. One Flexible Payment Plan.</h2>
        <p className="s-sub mx-auto text-center">All packages structured as monthly payments over 12–60 months. At the end of your term, you own the system outright.</p>
      </div>

      <div className="packages-grid">
        {PACKAGES.map(pkg => (
          <div key={pkg.tier} className={`pkg-card reveal${pkg.featured ? ' featured' : ''}`}>
            {pkg.featured && <div className="pkg-badge">Most Popular</div>}
            <div className="pkg-top">
              <div className={`pkg-tier-badge t-${pkg.tier}`}>{pkg.tierLabel}</div>
              <div className="pkg-name">{pkg.name}</div>
            </div>
            <div className="pkg-price-block">
              <div className="pkg-total">{pkg.total} <small>Total System Cost</small></div>
              <div className="pkg-monthly">You pay {pkg.monthly}</div>
            </div>
            <div className="pkg-specs">
              {pkg.specs.map(s => (
                <div key={s.k} className="spec-row">
                  <span className="spec-ico">{s.ico}</span>
                  <span className="spec-name">{s.k}</span>
                  <span className="spec-val">{s.v}</span>
                </div>
              ))}
            </div>
            <div className="pkg-benefits">
              <div className="pkg-benefits-title">💰 Your ROI at a Glance</div>
              {pkg.roi.map(r => (
                <div key={r.l} className={`benefit-row${r.hi ? ' bv-highlight' : ''}`}>
                  <span className="benefit-label">{r.l}</span>
                  <span className={`benefit-val${r.green ? ' bv-green' : ''}`}>{r.v}</span>
                </div>
              ))}
            </div>
            <div className={`pkg-model-tag ${pkg.modelCls}`}>{pkg.model}</div>
            <button onClick={() => onPkgOpen(pkg.tier, pkg.name)} className={`pkg-cta ${pkg.ctaCls}`}>
              {pkg.ctaLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
