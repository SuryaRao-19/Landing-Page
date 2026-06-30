import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Services — Enterprise IT Solutions',
  description: 'Explore NexGen\'s full portfolio of enterprise technology services including AI, Cloud, Software Development, Cybersecurity, DevOps, and Digital Transformation.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#F8FAFC 0%,#EEF2FF 100%)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
        <div className="container relative z-10 text-center">
          <SectionHeader
            label="Our Services"
            title="End-to-End Enterprise"
            highlight="Technology Services"
            subtitle="From AI strategy to full-stack engineering, we deliver services that transform your business and create lasting competitive advantage."
            center
          />
        </div>
      </section>

      {/* Services grid */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <Link key={svc.slug} href={`/services/${svc.slug}`} className="group block">
                <article className="h-full bg-white rounded-2xl border border-slate-100 p-6 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/60 hover:border-blue-100 transition-all duration-300">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                    style={{ background: `${svc.color}15`, border: `1px solid ${svc.color}25` }}
                  >
                    {svc.icon}
                  </div>
                  <h2 className="font-bold text-slate-900 text-lg mb-3 group-hover:text-blue-700 transition-colors">
                    {svc.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{svc.description.slice(0, 140)}…</p>
                  <ul className="space-y-1.5 mb-6">
                    {svc.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                    Learn more <ArrowRight size={14} />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
