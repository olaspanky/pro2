'use client';
import { useState } from 'react';

declare const gtag: (...args: unknown[]) => void;
declare const fbq:  (...args: unknown[]) => void;

const BIZ_TYPES = ['Factory / Manufacturer','Hospital / Clinic','Hotel / Hospitality','School / University','Shopping Mall / Retail','Office Complex','Other'];

export default function AdvisorModal({ onClose }: { onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [done,       setDone]       = useState(false);
  const [errors,     setErrors]     = useState<Record<string,boolean>>({});

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const f = e.currentTarget;

  // Reset previous errors
  setErrors({});

  // Client-side validation
  const req = ['af-name', 'af-email', 'af-phone', 'af-biz', 'af-location'];
  const errs: Record<string, boolean> = {};

  req.forEach((id) => {
    const el = f.elements.namedItem(id) as HTMLInputElement | HTMLSelectElement | null;
    if (!el?.value?.trim()) {
      errs[id] = true;
    }
  });

  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    return;
  }

  setSubmitting(true);

  const payload = {
    name: (f.elements.namedItem('af-name') as HTMLInputElement).value.trim(),
    email: (f.elements.namedItem('af-email') as HTMLInputElement).value.trim(),
    phone: (f.elements.namedItem('af-phone') as HTMLInputElement).value.trim(),
    business_type: (f.elements.namedItem('af-biz') as HTMLSelectElement).value,
    location: (f.elements.namedItem('af-location') as HTMLInputElement).value.trim(),
    generator_size: (f.elements.namedItem('af-gen') as HTMLInputElement)?.value.trim() || '',
    fuel_spend: (f.elements.namedItem('af-fuel') as HTMLInputElement)?.value.trim() || '',
    grid_spend: (f.elements.namedItem('af-grid') as HTMLInputElement)?.value.trim() || '',
    message: (f.elements.namedItem('af-message') as HTMLTextAreaElement)?.value.trim() || '',
    source: 'ProSolar C&I Landing Page — Advisor Form',
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  };

  try {
    const response = await fetch('/api/advisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok || response.status === 202) {
      setDone(true);

      // Fire conversion pixels (Google & Facebook)
      try {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'conversion', { send_to: 'AW-16892943941/ADVISOR_FORM_LABEL' });
          gtag('event', 'generate_lead', {
            event_category: 'Form',
            event_label: 'Advisor Thank You',
          });
        }
      } catch (e) {
        console.warn('Google Analytics failed:', e);
      }

      try {
        if (typeof fbq !== 'undefined') {
          fbq('track', 'Lead', {
            content_name: 'Advisor Form Thank You',
            content_category: 'Solar Lead',
          });
        }
      } catch (e) {
        console.warn('Facebook Pixel failed:', e);
      }
    } else {
      // Server returned error
      throw new Error(result.error || 'Submission failed. Please try again.');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    
    // Better user feedback than plain alert
    alert(
      'Unable to submit your request at the moment.\n\n' +
      'Please try again or contact us directly at:\n' +
      'info@prosolar.ng or 0802 906 8303'
    );
  } finally {
    setSubmitting(false);
  }
};
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      {!done ? (
        <div className="modal-box">
          <button className="modal-close" onClick={onClose}>×</button>
          <div className="modal-badge">FREE CONSULTATION</div>
          <h2 className="font-lora text-[1.6rem] font-bold mb-1">Talk to a Solar Advisor</h2>
          <p className="text-[var(--muted)] text-sm mb-6">Tell us about your business and we&apos;ll design the perfect solar solution for you.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="af-row">
              <div className="af-group">
                <label htmlFor="af-name">Full Name *</label>
                <input id="af-name" name="af-name" type="text" placeholder="e.g. Chukwuemeka Obi" className={errors['af-name'] ? 'af-error' : ''} />
              </div>
              <div className="af-group">
                <label htmlFor="af-email">Business Email *</label>
                <input id="af-email" name="af-email" type="email" placeholder="e.g. emeka@company.ng" className={errors['af-email'] ? 'af-error' : ''} />
              </div>
            </div>
            <div className="af-row">
              <div className="af-group">
                <label htmlFor="af-phone">Phone Number *</label>
                <input id="af-phone" name="af-phone" type="tel" placeholder="e.g. 0802 906 8303" className={errors['af-phone'] ? 'af-error' : ''} />
              </div>
              <div className="af-group">
                <label htmlFor="af-biz">Business Type *</label>
                <select id="af-biz" name="af-biz" className={errors['af-biz'] ? 'af-error' : ''}>
                  <option value="">Select…</option>
                  {BIZ_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>
            <div className="af-group">
              <label htmlFor="af-location">Detailed Business Address *</label>
              <input id="af-location" name="af-location" type="text" placeholder="e.g. 12 Adeola Odeku St, Victoria Island, Lagos…" className={errors['af-location'] ? 'af-error' : ''} />
            </div>
            <div className="af-row">
              <div className="af-group">
                <label htmlFor="af-gen">Generator Size (optional)</label>
                <input id="af-gen" name="af-gen" type="text" placeholder="e.g. 100 KVA" />
              </div>
              <div className="af-group">
                <label htmlFor="af-fuel">Monthly Fuel Spend (optional)</label>
                <input id="af-fuel" name="af-fuel" type="text" placeholder="e.g. ₦800,000" />
              </div>
            </div>
            <div className="af-group">
              <label htmlFor="af-grid">Monthly Grid Spend (optional)</label>
              <input id="af-grid" name="af-grid" type="text" placeholder="e.g. ₦150,000" />
            </div>
            <div className="af-group">
              <label htmlFor="af-message">Additional Notes</label>
              <textarea id="af-message" name="af-message" rows={3} placeholder="Tell us anything else…" />
            </div>
            <button type="submit" disabled={submitting} className="af-submit">
              {submitting ? 'Sending…' : 'Submit & Get Free Consultation'}
            </button>
          </form>
        </div>
      ) : (
        <div className="confirm-box">
          <div className="confirm-check">✓</div>
          <h3 className="font-lora text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-[var(--muted)] text-sm leading-relaxed">
            Your request has been received. A ProSolar Energy advisor will contact you within <strong>24 hours</strong> to discuss your custom solar solution.
          </p>
          <button className="confirm-close" onClick={onClose}>Done</button>
        </div>
      )}
    </div>
  );
}
