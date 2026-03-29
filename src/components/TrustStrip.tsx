export default function TrustStrip() {
  const logos = ['DEYE', 'JinKO', 'PYLONTECH', 'VICTRON', 'BOS-AG', 'SCHNEIDER'];
  return (
    <div className="bg-white border-y border-[rgba(0,0,0,0.06)] py-5 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-[5%]">
        <p className="text-[0.65rem] tracking-[3px] uppercase text-[var(--gray)] text-center mb-4 font-semibold">
          Trusted Equipment Partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {logos.map(logo => (
            <span key={logo} className="font-bebas text-[1.4rem] text-[var(--muted)] tracking-widest opacity-60 hover:opacity-100 transition-opacity">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
