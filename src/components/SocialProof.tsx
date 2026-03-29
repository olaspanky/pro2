const STATS = [
  { num:'100KWp+', label:'Largest Single Project'     },
  { num:'4+',      label:'Completed Installations'    },
  { num:'10MW',    label:'Max EaaS Project Capacity'  },
  { num:'2022',    label:'Serving Businesses Since'   },
];

export default function SocialProof() {
  return (
    <section className="bg-[var(--navy-2)] py-16">
      <div className="stats-grid">
        {STATS.map(s => (
          <div key={s.label} className="stat-item">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
