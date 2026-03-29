export default function Footer() {
  return (
    <footer className="footer-bar" style={{background:'var(--navy)', borderTop:'1px solid rgba(255,255,255,0.06)', padding:'18px 5%', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'12px'}}>
      <span style={{fontSize:'.75rem', color:'rgba(255,255,255,0.35)'}}>© 2025 Prosolar Multiservices Limited. All rights reserved.</span>
      <div style={{display:'flex', alignItems:'center', gap:'24px'}}>
        <a href="https://www.prosolarng.com/privacy" target="_blank" rel="noopener noreferrer" style={{fontSize:'.75rem', color:'rgba(255,255,255,0.35)', textDecoration:'none'}}>Privacy Policy</a>
        <a href="https://www.prosolarng.com/tos" target="_blank" rel="noopener noreferrer" style={{fontSize:'.75rem', color:'rgba(255,255,255,0.35)', textDecoration:'none'}}>Terms of Service</a>
        <a href="#hero" style={{display:'inline-flex', alignItems:'center', gap:'6px', background:'var(--gold)', color:'var(--navy)', fontWeight:700, fontSize:'.75rem', padding:'7px 16px', borderRadius:'999px', textDecoration:'none', letterSpacing:'.03em'}}>
          ↑ Back to Top
        </a>
      </div>
    </footer>
  );
}
