'use client';
import { useState } from 'react';

declare const gtag: (...args: unknown[]) => void;
declare const fbq:  (...args: unknown[]) => void;

const SYSTEMS = ['16kVA Solar System','50kVA Solar System','80kVA Solar System','100kVA Solar System','Custom / Larger System'];
const BIZ_TYPES = ['Factory / Manufacturer','Hospital / Clinic','Hotel / Hospitality','School / University','Shopping Mall / Retail','Office Complex','Other'];

const TIER_MESSAGES: Record<string,{ heading:string; msg:string }> = {
  silver:  { heading:'Silver Package Enquiry Received!',  msg:'Our team will prepare a full proposal for the 16kVA system and contact you within 24 hours.' },
  diamond: { heading:'Diamond Package Enquiry Received!', msg:'Our team will prepare a full proposal for the 50kVA system and contact you within 24 hours.' },
  emerald: { heading:'Emerald Package Enquiry Received!', msg:'Excellent choice — our most popular system. We will contact you within 24 hours with your custom proposal.' },
  gold:    { heading:'Gold Package Enquiry Received!',    msg:'Our team will prepare a full proposal for the 100kVA system and contact you within 24 hours.' },
};

export default function PackageModal({ tier, pkgName, onClose }: { tier:string; pkgName:string; onClose:()=>void }) {
  const [submitting, setSubmitting] = useState(false);
  const [done,       setDone]       = useState(false);
  const [errors,     setErrors]     = useState<Record<string,boolean>>({});
  const confirm = TIER_MESSAGES[tier] || TIER_MESSAGES['silver'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const req = ['pf-name','pf-email','pf-phone','pf-location'];
    const errs: Record<string,boolean> = {};
    req.forEach(id => { if (!(f.elements.namedItem(id) as HTMLInputElement)?.value?.trim()) errs[id] = true; });
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    const payload = {
      name:     (f.elements.namedItem('pf-name')     as HTMLInputElement).value.trim(),
      email:    (f.elements.namedItem('pf-email')    as HTMLInputElement).value.trim(),
      phone:    (f.elements.namedItem('pf-phone')    as HTMLInputElement).value.trim(),
      location: (f.elements.namedItem('pf-location') as HTMLInputElement).value.trim(),
      system:   (f.elements.namedItem('pf-system')   as HTMLSelectElement).value,
      message:  (f.elements.namedItem('pf-message')  as HTMLTextAreaElement).value.trim(),
      package:  pkgName,
      source:   'ProSolar C&I Landing Page — Package Card',
      timestamp: new Date().toISOString(),
    };

    try {
      const leads = JSON.parse(localStorage.getItem('prosolar_pkg_leads') || '[]');
      leads.push(payload);
      localStorage.setItem('prosolar_pkg_leads', JSON.stringify(leads));
    } catch {}

    setTimeout(() => {
      setDone(true);
      setSubmitting(false);
      // Google Ads conversion
      try { if (typeof gtag !== 'undefined') { gtag('event','conversion',{ send_to:'AW-16892943941/PACKAGE_FORM_LABEL' }); gtag('event','generate_lead',{ event_category:'Form', event_label:`Package Thank You: ${tier}` }); } } catch {}
      // Facebook Lead
      try { if (typeof fbq !== 'undefined') { fbq('track','Lead',{ content_name:`Package Thank You: ${tier}`, content_category:'Solar Lead' }); } } catch {}
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      {!done ? (
        <div className="modal-box">
          <button className="modal-close" onClick={onClose}>×</button>
          <div className="modal-badge">PACKAGE ENQUIRY</div>
          <h2 className="font-lora text-[1.5rem] font-bold mb-1">Get Your Solar System Proposal</h2>
          <p className="text-[var(--muted)] text-sm mb-6">Fill in your details and we&apos;ll send you a full proposal for the <strong>{pkgName}</strong>.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="af-row">
              <div className="af-group">
                <label htmlFor="pf-name">Full Name *</label>
                <input id="pf-name" name="pf-name" type="text" placeholder="Your name" className={errors['pf-name'] ? 'af-error' : ''} />
              </div>
              <div className="af-group">
                <label htmlFor="pf-email">Email *</label>
                <input id="pf-email" name="pf-email" type="email" placeholder="your@email.com" className={errors['pf-email'] ? 'af-error' : ''} />
              </div>
            </div>
            <div className="af-row">
              <div className="af-group">
                <label htmlFor="pf-phone">Phone *</label>
                <input id="pf-phone" name="pf-phone" type="tel" placeholder="080XXXXXXXX" className={errors['pf-phone'] ? 'af-error' : ''} />
              </div>
              <div className="af-group">
                <label htmlFor="pf-location">Detailed Business Address *</label>
                <input id="pf-location" name="pf-location" type="text" placeholder="e.g. 12 Adeola Odeku St, Victoria Island, Lagos…" className={errors['pf-location'] ? 'af-error' : ''} />
              </div>
            </div>
            <div className="af-group">
              <label htmlFor="pf-system">System Interest</label>
              <select id="pf-system" name="pf-system" defaultValue={pkgName}>
                {SYSTEMS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="af-group">
              <label htmlFor="pf-biz">Business Type</label>
              <select id="pf-biz" name="pf-biz">
                <option value="">Select…</option>
                {BIZ_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="af-group">
              <label htmlFor="pf-message">Anything else we should know?</label>
              <textarea id="pf-message" name="pf-message" rows={3} placeholder="Generator size, facility details…" />
            </div>
            <button type="submit" disabled={submitting} className="af-submit">
              {submitting ? 'Sending…' : 'Get My Proposal →'}
            </button>
          </form>
        </div>
      ) : (
        <div className="confirm-box">
          <div className="confirm-check">✓</div>
          <h3 className="font-lora text-2xl font-bold mb-2">{confirm.heading}</h3>
          <p className="text-[var(--muted)] text-sm leading-relaxed">{confirm.msg}</p>
          <button className="confirm-close" onClick={onClose}>Done</button>
        </div>
      )}
    </div>
  );
}
