'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Nav({ onAdvisorOpen }: { onAdvisorOpen: () => void }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '#problem',  label: 'The Problem' },
    { href: '#vsl',      label: 'Watch Video'  },
    { href: '#solution', label: 'Our Solution' },
    { href: '#packages', label: 'Packages'     },
    { href: '#eaas',     label: 'EaaS'         },
    { href: '#about',    label: 'About'        },
  ];

  return (
    <nav
      ref={navRef}
      style={{ padding: scrolled ? '8px 5%' : '16px 5%' }}
      className="fixed top-0 left-0 right-0 z-[200] flex items-center justify-between bg-[rgba(6,19,37,0.96)] backdrop-blur-lg border-b border-[rgba(245,184,0,0.12)] transition-all duration-300"
    >
      {/* Brand */}
      <a href="https://prosolarng.com" className="flex items-center no-underline">
        <Image src="/images/logo.webp" alt="ProSolar Energy Nigeria" width={160} height={50} priority className="h-10 w-auto object-contain" style={{transform:'scale(1.35)', transformOrigin:'left center'}} />
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {links.map(l => (
          <a key={l.href} href={l.href} className="text-[rgba(255,255,255,0.65)] no-underline text-[0.85rem] font-medium hover:text-gold transition-colors">
            {l.label}
          </a>
        ))}
        <button onClick={onAdvisorOpen} className="bg-gold text-navy font-bold px-5 py-2.5 rounded-[5px] text-[0.85rem] hover:bg-gold2 transition-all hover:-translate-y-px cursor-pointer border-none">
          Talk to an Advisor
        </button>
      </div>

      {/* Hamburger */}
      <button
        className={`flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 z-[300]${menuOpen ? ' active' : ''}`}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Menu"
      >
        <span className={`block w-[26px] h-[3px] bg-white rounded-[2px] transition-transform duration-300${menuOpen ? ' translate-y-2 rotate-45' : ''}`}/>
        <span className={`block w-[26px] h-[3px] bg-white rounded-[2px] transition-opacity duration-300${menuOpen ? ' opacity-0' : ''}`}/>
        <span className={`block w-[26px] h-[3px] bg-white rounded-[2px] transition-transform duration-300${menuOpen ? ' -translate-y-2 -rotate-45' : ''}`}/>
      </button>

      {/* Mobile menu */}
      <div className={`absolute top-full left-0 right-0 bg-[rgba(6,19,37,0.98)] backdrop-blur-lg border-b border-[rgba(245,184,0,0.12)] flex flex-col overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-[520px] py-2 pb-5 px-[5%]' : 'max-h-0 px-[5%]'}`}>
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            style={{ transitionDelay: menuOpen ? `${(i+1)*50}ms` : '0ms' }}
            className={`text-[rgba(255,255,255,0.75)] no-underline text-[0.95rem] font-medium py-3.5 border-b border-[rgba(255,255,255,0.06)] last:border-0 hover:text-gold transition-all duration-300 ${menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}
          >
            {l.label}
          </a>
        ))}
        <button onClick={() => { onAdvisorOpen(); setMenuOpen(false); }} className="mt-3 bg-gold text-navy font-bold py-3 rounded-md text-[0.9rem] border-none cursor-pointer hover:bg-gold2">
          Talk to an Advisor
        </button>
      </div>
    </nav>
  );
}
