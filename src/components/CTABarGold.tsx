export default function CTABarGold({ onAdvisorOpen }: { onAdvisorOpen: () => void }) {
  return (
    <div className="cta-gold-bar" style={{background:'var(--gold)', padding:'28px 5%', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'24px', flexWrap:'wrap'}}>
      <div>
        <div style={{fontFamily:'var(--font-bebas),sans-serif', fontSize:'clamp(1.4rem,2.5vw,2rem)', letterSpacing:'.04em', color:'var(--navy)', textTransform:'uppercase', lineHeight:1.15}}>
          OWN YOUR POWER. STOP RENTING FROM DIESEL.
        </div>
        <div style={{fontWeight:700, fontSize:'.95rem', color:'var(--navy)', opacity:.85, marginTop:'4px'}}>
          Talk to a ProSolar advisor and get a custom savings estimate.
        </div>
      </div>
      <button onClick={onAdvisorOpen} className="btn-navy cursor-pointer border-none">
        Talk to an Advisor →
      </button>
    </div>
  );
}
