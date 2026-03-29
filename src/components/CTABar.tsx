export default function CTABar({ onAdvisorOpen }: { onAdvisorOpen: () => void }) {
  return (
    <div className="cta-bar">
      <div className="cta-bar-text">
        <span>Ready to eliminate your diesel bill?</span>
        Talk to us today — free energy consultation, no obligation.
      </div>
      <button onClick={onAdvisorOpen} className="btn-navy cursor-pointer border-none">
        Book Free Consultation →
      </button>
    </div>
  );
}
