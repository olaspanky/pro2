const ITEMS = [
  'DEYE Hybrid Inverter','JinKO Solar Panels','Premium Battery Bank',
  'Mounting Structure','DC/AC Wiring & Protection','Professional Installation',
  'Grid Tie & Bypass Setup','System Commissioning','12-Month Warranty',
  'Remote Monitoring','Maintenance Support','Performance Guarantee',
];

export default function WhatsIncluded() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1000px] mx-auto px-[5%]">
        <div className="text-center mb-10">
          <div className="s-label" style={{ display:'inline-block' }}>Every Package Includes</div>
          <h2 className="s-title text-center">Everything You Need. Nothing Extra to Buy.</h2>
        </div>
        <div className="included-grid">
          {ITEMS.map(item => (
            <div key={item} className="inc-item reveal">
              <div className="inc-check">✓</div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
