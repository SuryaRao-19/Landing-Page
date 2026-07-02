import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/data'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Services — Enterprise IT Solutions',
  description: "Explore NexGen's full portfolio of enterprise technology services including AI, Cloud, Software Development, Cybersecurity, DevOps, and Digital Transformation.",
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="End-to-End Enterprise"
        highlight="Technology Services"
        subtitle="From AI strategy to full-stack engineering, we deliver services that transform your business and create lasting competitive advantage."
        breadcrumbs={[{ label: 'Services' }]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((svc) => (
              <Link key={svc.slug} href={`/services/${svc.slug}`} className="group block">
                <article className="h-full bg-white border border-[#E2E8F0] rounded-[20px] p-6 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,.09)] hover:border-[#CBD5E1] transition-all duration-300">
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl mb-5 shadow-sm"
                    style={{ background: `${svc.color}14`, border: `1px solid ${svc.color}22` }}
                  >
                    {svc.icon}
                  </div>
                  <h2 className="font-bold text-[#0A0F1C] text-[.9375rem] mb-2 group-hover:text-[#2563EB] transition-colors leading-snug">
                    {svc.title}
                  </h2>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-4 line-clamp-2">{svc.shortDesc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {svc.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[.8125rem] text-[#475569]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore service <ArrowRight size={11} />
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
