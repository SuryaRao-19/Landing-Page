import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'

const FOOTER_LINKS = {
  Services: [
    ['Artificial Intelligence', '/services/artificial-intelligence'],
    ['Cloud Solutions', '/services/cloud-solutions'],
    ['Software Development', '/services/software-development'],
    ['Web Development', '/services/web-development'],
    ['Mobile Apps', '/services/mobile-apps'],
    ['Cybersecurity', '/services/cybersecurity'],
    ['DevOps & SRE', '/services/devops'],
    ['Data Engineering', '/services/data-engineering'],
  ],
  Industries: [
    ['Banking & Finance', '/industries'],
    ['Healthcare', '/industries'],
    ['Manufacturing', '/industries'],
    ['Retail & E-Commerce', '/industries'],
    ['Education', '/industries'],
    ['Government', '/industries'],
    ['Logistics', '/industries'],
    ['Telecommunications', '/industries'],
  ],
  Company: [
    ['About Us', '/about'],
    ['Leadership', '/leadership'],
    ['Case Studies', '/case-studies'],
    ['Portfolio', '/portfolio'],
    ['Clients', '/clients'],
    ['Blog', '/blog'],
    ['Careers', '/careers'],
    ['Resources', '/resources'],
  ],
  Legal: [
    ['Privacy Policy', '/privacy-policy'],
    ['Terms of Service', '/terms'],
    ['Cookie Policy', '/cookies'],
    ['FAQ', '/faq'],
  ],
}

const OFFICES = [
  { city: 'Bengaluru (HQ)', address: 'Prestige Tech Park, Outer Ring Road, Bengaluru — 560103' },
  { city: 'Mumbai', address: 'Bandra Kurla Complex, Bandra East, Mumbai — 400051' },
  { city: 'Hyderabad', address: 'HITEC City, Madhapur, Hyderabad — 500081' },
  { city: 'Dubai (MENA)', address: 'Dubai Silicon Oasis, Dubai, UAE' },
]

export function Footer() {
  return (
    <footer className="bg-[#0A1628] text-slate-400" role="contentinfo">
      {/* Top CTA strip */}
      <div
        className="py-10"
        style={{ background: 'linear-gradient(135deg,#1B4FD8,#06B6D4)' }}
      >
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-xl">Ready to transform your business?</p>
            <p className="text-blue-100 text-sm mt-1">Join 500+ enterprise clients who trust NexGen.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shrink-0 text-sm"
          >
            Schedule Free Consultation
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="xl:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5" aria-label="NexGen Technologies">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'linear-gradient(135deg,#1B4FD8,#06B6D4)' }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M10 2L17 6V14L10 18L3 14V6L10 2Z" fill="white" fillOpacity=".9"/>
                  <path d="M10 6L14 8.5V12.5L10 15L6 12.5V8.5L10 6Z" fill="white"/>
                </svg>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Nex<span className="text-cyan-400">Gen</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              India&apos;s premier digital transformation and enterprise technology partner. Serving 500+ clients across 25+ countries with AI, cloud, software and security excellence.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { label: 'LinkedIn', href: '#', text: 'in' },
                { label: 'Twitter/X', href: '#', text: '𝕏' },
                { label: 'Instagram', href: '#', text: 'ig' },
                { label: 'Facebook', href: '#', text: 'fb' },
              ].map(({ label, href, text }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-colors text-xs font-bold text-slate-400 hover:text-white"
                >
                  {text}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-6 space-y-2 text-sm">
              <a href="mailto:hello@nexgentech.in" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={14} className="text-cyan-400 shrink-0" />
                hello@nexgentech.in
              </a>
              <a href="tel:+918045678900" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} className="text-cyan-400 shrink-0" />
                +91 80 4567 8900
              </a>
              <a href="https://wa.me/918045678900" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone size={14} className="text-green-400 shrink-0" />
                WhatsApp Support
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{heading}</h3>
              <ul className="space-y-2.5">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Offices */}
        <div className="mt-12 pt-10 border-t border-white/8">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Our Offices</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OFFICES.map((office) => (
              <div key={office.city} className="flex gap-3">
                <MapPin size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">{office.city}</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{office.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NexGen Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" aria-hidden /> ISO 27001 Certified
            </span>
            <span>CMMi Level 5</span>
            <span>Made with ❤️ in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
