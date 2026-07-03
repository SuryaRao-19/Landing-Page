import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const FOOTER_LINKS = {
  Services: [
    { label: 'Artificial Intelligence',  href: '/services/artificial-intelligence' },
    { label: 'Cloud Solutions',          href: '/services/cloud-solutions' },
    { label: 'Software Development',     href: '/services/software-development' },
    { label: 'Cybersecurity',            href: '/services/cybersecurity' },
    { label: 'DevOps & Automation',      href: '/services/devops' },
    { label: 'Data Engineering',         href: '/services/data-engineering' },
  ],
  Company: [
    { label: 'About Us',    href: '/about' },
    { label: 'Leadership',  href: '/leadership' },
    { label: 'Careers',     href: '/careers' },
    { label: 'Blog',        href: '/blog' },
    { label: 'Clients',     href: '/clients' },
    { label: 'Portfolio',   href: '/portfolio' },
  ],
  Resources: [
    { label: 'Industries',    href: '/industries' },
    { label: 'Technologies',  href: '/technologies' },
    { label: 'Case Studies',  href: '/case-studies' },
    { label: 'Resources',     href: '/resources' },
    { label: 'Solutions',     href: '/solutions' },
    { label: 'Internships',   href: '/careers/internship' },
  ],
}

const OFFICES = [
  { city: 'Mumbai (HQ)', address: 'BKC, Bandra East, Mumbai 400051' },
  { city: 'Bangalore',   address: 'Embassy Tech Square, Outer Ring Road' },
  { city: 'Hyderabad',   address: 'HITEC City, Madhapur 500081' },
]

const CERTIFICATIONS = ['ISO 27001', 'CMMi Level 5', 'SOC 2 Type II', 'AWS Partner']

export function Footer() {
  return (
    <footer className="bg-[#0A0F1C] text-[#94A3B8] relative overflow-hidden" role="contentinfo">

      {/* ── Ambient background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px]"
          style={{ background: 'radial-gradient(ellipse at center top, rgba(37,99,235,.08) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px]"
          style={{ background: 'radial-gradient(ellipse at right bottom, rgba(124,58,237,.06) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 bg-grid opacity-[.03]" />
      </div>

      {/* ── Main content ── */}
      <div className="relative">

        {/* Top CTA Banner */}
        <div
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #0891B2 100%)' }}
        >
          <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #fff, transparent 70%)' }} aria-hidden />

          <div className="container py-10 relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-bold text-white text-[1.25rem] tracking-[-0.02em]">
                  Ready to transform your business?
                </p>
                <p className="text-blue-100/85 text-[0.9375rem] mt-1.5 leading-snug">
                  Senior architects available. 60-minute consultation, no commitment.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[14px] bg-white text-[#1D4ED8] font-semibold text-sm hover:bg-blue-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,.2)] shrink-0 whitespace-nowrap"
              >
                Book Free Consultation
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="container py-16 lg:py-20">
          <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 xl:gap-16">

            {/* Brand column */}
            <div>
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group" aria-label="NexGen — Home">
                <div className="w-8 h-8 rounded-[10px] bg-[#2563EB] flex items-center justify-center shadow-[0_2px_8px_rgba(37,99,235,.4)]">
                  <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <path d="M9 1.5L15.5 5.25V12.75L9 16.5L2.5 12.75V5.25L9 1.5Z" fill="rgba(255,255,255,.18)" stroke="white" strokeWidth="1.2"/>
                    <path d="M9 5L12.5 7V11L9 13L5.5 11V7L9 5Z" fill="white"/>
                  </svg>
                </div>
                <span className="font-extrabold text-white text-[1.1rem] tracking-[-0.03em]">
                  Nex<span className="text-[#2563EB]">Gen</span>
                </span>
              </Link>

              <p className="text-[0.9375rem] leading-[1.75] text-[#64748B] max-w-[280px] mb-7">
                India&apos;s premier digital transformation partner. Building technology that scales with your ambition.
              </p>

              {/* Contact */}
              <div className="space-y-3 mb-7">
                <a
                  href="mailto:hello@nexgenit.in"
                  className="flex items-center gap-3 text-[0.875rem] text-[#64748B] hover:text-white transition-colors group"
                >
                  <span className="w-7 h-7 rounded-[8px] bg-white/[.05] border border-white/[.07] flex items-center justify-center shrink-0 group-hover:border-[#2563EB]/40 transition-colors">
                    <Mail size={12} className="text-[#2563EB]" />
                  </span>
                  hello@nexgenit.in
                </a>
                <a
                  href="tel:+918001234567"
                  className="flex items-center gap-3 text-[0.875rem] text-[#64748B] hover:text-white transition-colors group"
                >
                  <span className="w-7 h-7 rounded-[8px] bg-white/[.05] border border-white/[.07] flex items-center justify-center shrink-0 group-hover:border-[#2563EB]/40 transition-colors">
                    <Phone size={12} className="text-[#2563EB]" />
                  </span>
                  +91 800 123 4567
                </a>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-2 mb-7">
                {CERTIFICATIONS.map((cert) => (
                  <span
                    key={cert}
                    className="text-[10px] font-semibold text-[#64748B] bg-white/[.04] border border-white/[.07] rounded-full px-2.5 py-1"
                  >
                    {cert}
                  </span>
                ))}
              </div>

              {/* Offices */}
              <div className="space-y-4">
                {OFFICES.map((o) => (
                  <div key={o.city} className="flex gap-2.5">
                    <MapPin size={12} className="text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-semibold text-[#94A3B8]">{o.city}</p>
                      <p className="text-[11px] text-[#475569] mt-0.5">{o.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-5">{group}</p>
                <ul className="space-y-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[0.875rem] text-[#475569] hover:text-white transition-colors duration-150 leading-snug"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/[.06]">
          <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-[0.75rem] text-[#475569] order-3 sm:order-1">
              © {new Date().getFullYear()} NexGen IT Solutions Pvt. Ltd. All rights reserved.
            </p>

            {/* Social */}
            <div className="flex items-center gap-2 order-1 sm:order-2">
              {[
                {
                  label: 'LinkedIn', href: 'https://www.linkedin.com/company/nexgen-technologies',
                  svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
                },
                {
                  label: 'X', href: 'https://x.com/NexGenTechIN',
                  svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                },
                {
                  label: 'GitHub', href: 'https://github.com/nexgen-technologies',
                  svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
                },
              ].map(({ label, href, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-[8px] bg-white/[.05] border border-white/[.07] flex items-center justify-center text-[#475569] hover:text-white hover:bg-white/[.09] hover:border-white/[.14] transition-all duration-150"
                >
                  {svg}
                </a>
              ))}
            </div>

            {/* Legal */}
            <div className="flex items-center gap-5 order-2 sm:order-3">
              {[
                { label: 'Privacy', href: '/privacy-policy' },
                { label: 'Terms',   href: '/terms' },
                { label: 'Cookies', href: '/cookies' },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[0.75rem] text-[#475569] hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
