'use client';
import Nav           from '@/components/Nav';
import Hero          from '@/components/Hero';
import Problem       from '@/components/Problem';
import CTABar        from '@/components/CTABar';
import VSL           from '@/components/VSL';
import Solution      from '@/components/Solution';
import Packages      from '@/components/Packages';
import EaaS          from '@/components/EaaS';
import Roadmap       from '@/components/Roadmap';
import Testimonials  from '@/components/Testimonials';
import About         from '@/components/About';
import FAQ           from '@/components/FAQ';
import FinalCTA      from '@/components/FinalCTA';
import CTABarGold    from '@/components/CTABarGold';
import Footer        from '@/components/Footer';
import AdvisorModal  from '@/components/AdvisorModal';
import PackageModal  from '@/components/PackageModal';
import { useState, useEffect } from 'react';

export default function Home() {
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const [pkgOpen,     setPkgOpen]     = useState(false);
  const [pkgTier,     setPkgTier]     = useState('');
  const [pkgName,     setPkgName]     = useState('');

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io  = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const openPkg = (tier: string, name: string) => { setPkgTier(tier); setPkgName(name); setPkgOpen(true); };

  return (
    <>
      <Nav onAdvisorOpen={() => setAdvisorOpen(true)} />
      <Hero onAdvisorOpen={() => setAdvisorOpen(true)} />
      <Problem />
      <CTABar onAdvisorOpen={() => setAdvisorOpen(true)} />
      <VSL />
            <CTABarGold onAdvisorOpen={() => setAdvisorOpen(true)} />

      <Solution />
      <Packages onPkgOpen={openPkg} />
      <EaaS onAdvisorOpen={() => setAdvisorOpen(true)} />
      <Roadmap />
      <Testimonials />
      <About />
      <FAQ onAdvisorOpen={() => setAdvisorOpen(true)} />
      <FinalCTA onAdvisorOpen={() => setAdvisorOpen(true)} />
      <Footer />

      {advisorOpen && <AdvisorModal onClose={() => setAdvisorOpen(false)} />}
      {pkgOpen     && <PackageModal tier={pkgTier} pkgName={pkgName} onClose={() => setPkgOpen(false)} />}
    </>
  );
}
