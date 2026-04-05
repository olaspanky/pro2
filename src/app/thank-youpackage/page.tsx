import Link from 'next/link';

export const metadata = {
  title: 'Thank You | ProSolar Energy',
  description: 'Your request has been received. A ProSolar advisor will be in touch within 24 hours.',
  robots: { index: false, follow: false },
};

const TIER_MESSAGES: Record<string, { heading: string; msg: string }> = {
  silver:  { heading: 'Silver Package Enquiry Received!',  msg: 'Our team will prepare a full proposal for the 16kVA system and contact you within 24 hours.' },
  diamond: { heading: 'Diamond Package Enquiry Received!', msg: 'Our team will prepare a full proposal for the 50kVA system and contact you within 24 hours.' },
  emerald: { heading: 'Emerald Package Enquiry Received!', msg: 'Excellent choice — our most popular system. We will contact you within 24 hours with your custom proposal.' },
  gold:    { heading: 'Gold Package Enquiry Received!',    msg: 'Our team will prepare a full proposal for the 100kVA system and contact you within 24 hours.' },
};

const DEFAULT_MESSAGE = {
  heading: 'Thank You!',
  msg: 'Your request has been received. A ProSolar Energy advisor will contact you within 24 hours to discuss your custom solar solution.',
};

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { tier?: string; pkg?: string };
}) {
  const tier = searchParams.tier?.toLowerCase() ?? '';
  const pkg  = searchParams.pkg ?? '';

  const { heading, msg } = TIER_MESSAGES[tier] ?? DEFAULT_MESSAGE;

  return (
    <main className="ty-page">
      <div className="ty-card">
        {/* Animated checkmark */}
        <div className="ty-check" aria-hidden="true">
          <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="ty-check__circle" cx="26" cy="26" r="25" />
            <path   className="ty-check__tick"   d="M14 27l8 8 16-16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {pkg && <p className="ty-tag">{pkg}</p>}

        <h1 className="font-lora ty-heading">{heading}</h1>
        <p className="ty-body">{msg}</p>

        <div className="ty-divider" />

        <p className="ty-contact-label">Need to reach us sooner?</p>
        <div className="ty-contact-links">
          <a href="mailto:info@prosolar.ng" className="ty-contact-link">
            <span className="ty-contact-icon">✉</span> info@prosolar.ng
          </a>
          <a href="tel:+2348029068303" className="ty-contact-link">
            <span className="ty-contact-icon">📞</span> 0802 906 8303
          </a>
        </div>

        <Link href="/" className="ty-btn">← Back to Homepage</Link>
      </div>

      <style>{`
        .ty-page {
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          background: var(--bg, #f8f6f1);
        }

        .ty-card {
          background: #fff;
          border-radius: 1.25rem;
          box-shadow: 0 8px 40px rgba(0,0,0,0.09);
          padding: 3rem 2.5rem;
          max-width: 480px;
          width: 100%;
          text-align: center;
          animation: ty-fade-up 0.45s ease both;
        }

        @keyframes ty-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ty-check {
          width: 72px;
          height: 72px;
          margin: 0 auto 1.5rem;
        }

        .ty-check svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .ty-check__circle {
          stroke: var(--accent, #f59e0b);
          stroke-width: 2;
          fill: var(--accent, #f59e0b);
          stroke-dasharray: 157;
          stroke-dashoffset: 157;
          animation: ty-circle 0.5s ease 0.1s forwards;
        }

        @keyframes ty-circle {
          to { stroke-dashoffset: 0; }
        }

        .ty-check__tick {
          stroke: #fff;
          stroke-width: 3;
          stroke-dasharray: 36;
          stroke-dashoffset: 36;
          animation: ty-tick 0.35s ease 0.55s forwards;
        }

        @keyframes ty-tick {
          to { stroke-dashoffset: 0; }
        }

        .ty-tag {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent, #f59e0b);
          margin-bottom: 0.5rem;
        }

        .ty-heading {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--fg, #1a1a1a);
          margin-bottom: 0.75rem;
        }

        .ty-body {
          font-size: 0.95rem;
          color: var(--muted, #555);
          line-height: 1.65;
        }

        .ty-divider {
          border: none;
          border-top: 1px solid #eee;
          margin: 1.75rem 0;
        }

        .ty-contact-label {
          font-size: 0.8rem;
          color: var(--muted, #888);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .ty-contact-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .ty-contact-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--fg, #1a1a1a);
          text-decoration: none;
          padding: 0.45rem 0.9rem;
          border: 1px solid #e0e0e0;
          border-radius: 999px;
          transition: border-color 0.15s, color 0.15s;
        }

        .ty-contact-link:hover {
          border-color: var(--accent, #f59e0b);
          color: var(--accent, #f59e0b);
        }

        .ty-contact-icon { font-size: 0.85rem; }

        .ty-btn {
          display: inline-block;
          padding: 0.75rem 2rem;
          background: var(--accent, #f59e0b);
          color: #fff;
          font-weight: 600;
          font-size: 0.9rem;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: opacity 0.15s, transform 0.15s;
        }

        .ty-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        @media (max-width: 480px) {
          .ty-card    { padding: 2.25rem 1.5rem; }
          .ty-heading { font-size: 1.85rem; }
        }
      `}</style>
    </main>
  );
}