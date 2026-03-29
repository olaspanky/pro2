const TESTIS = [
  {
    stars:'★★★★★',
    quote:'Before ProSolar, we were spending over ₦3.2M every month on diesel alone. Since installation, our generator barely runs. The savings are real — and the system has been flawless.',
    name:'Emeka Okonkwo', role:'Operations Director, Food Processing Factory — Abuja', initials:'EO',
  },
  {
    stars:'★★★★★',
    quote:'As a hospital, we cannot afford power interruptions — ever. ProSolar\'s 80KVA system gave us 100% uptime and cut our monthly energy cost by 68%. I only wish we had done this sooner.',
    name:'Dr. Funmi Adeyemi', role:'Medical Director, Private Hospital — Lagos', initials:'FA',
  },
  {
    stars:'★★★★★',
    quote:'The lease-to-own model made sense immediately. No big lump sum, predictable monthly payments, and at the end we own the asset. ProSolar delivered on time, on spec, professionally.',
    name:'Alhaji Musa Ibrahim', role:'MD, Hotel & Hospitality Group — Kano', initials:'MI',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[var(--navy)] py-24">
      <div className="text-center mb-12 px-[5%]">
        <div className="s-label" style={{ display:'inline-block', color:'var(--gold)' }}>Client Results</div>
        <h2 className="s-title text-center" style={{ color:'#fff' }}>What Our Clients Say</h2>
      </div>
      <div className="testimonials-grid">
        {TESTIS.map(t => (
          <div key={t.name} className="testi-card reveal">
            <div className="testi-stars">{t.stars}</div>
            <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="testi-author">
              <div className="testi-avatar">{t.initials}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
