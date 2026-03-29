export default function FinalCTA({ onAdvisorOpen }: { onAdvisorOpen: () => void }) {
  return (
    <section id="final-cta" className="relative bg-[var(--navy)] py-28 overflow-hidden text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,64,160,0.4)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.3)_1px,transparent_1px),repeating-linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] bg-[length:40px_40px]" />

      <div className="final-cta-inner relative z-10 px-[5%]">
        <div className="inline-flex items-center gap-2 border border-[rgba(245,184,0,0.3)] text-gold text-[0.65rem] tracking-[3px] uppercase px-4 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Limited Slots Available This Quarter
        </div>

        <h2 className="fcta-title">
          STOP BURNING<br />
          <span className="text-gold">YOUR MONEY</span><br />
          ON DIESEL.
        </h2>

        <p className="fcta-sub">
          Talk to a ProSolar energy advisor today. We&apos;ll analyse your current energy costs, design the right system for your facility, and show you exactly how much you&apos;ll save — in naira, month by month.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={onAdvisorOpen} className="btn-primary text-lg px-10 py-5 border-none cursor-pointer">
            Go Solar Now!
          </button>
        </div>

        <div className="mt-8 text-[rgba(255,255,255,0.4)] text-sm flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          <span>📍 Suite 4, Block A, G-Wing, Bassan Plaza, Off Herbert Macaulay Way, CBD, FCT-Abuja</span>
          <a href="mailto:info@prosolarng.com" className="inline-flex items-center gap-1.5 text-[rgba(255,255,255,0.4)] hover:text-gold transition-colors no-underline">
            <span style={{color:'var(--gold)'}}>✉</span> info@prosolarng.com
          </a>
        </div>
      </div>
    </section>
  );
}
