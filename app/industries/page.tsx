import type { Metadata } from 'next'
import { INDUSTRIES } from '@/lib/data'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Industries — Domain Expertise Across Key Sectors',
  description: 'NexGen brings deep vertical expertise across Banking, Healthcare, Manufacturing, Retail, Education, Government, Logistics, Telecom and more.',
}

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Deep Domain Expertise Across"
        highlight="Every Sector"
        subtitle="We combine vertical industry knowledge with technology excellence to deliver solutions that address your sector's unique challenges."
        breadcrumbs={[{ label: 'Industries' }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind) => (
              <article
                key={ind.slug}
                className="bg-white border border-[#E2E8F0] rounded-[20px] p-6 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,.09)] hover:border-[#CBD5E1] transition-all duration-300 group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${ind.color}15`, color: ind.color }}
                >
                  <ind.icon size={26} aria-hidden />
                </div>
                <h2 className="font-bold text-[#0A0F1C] text-[.9375rem] mb-2 group-hover:text-[#2563EB] transition-colors">
                  {ind.title}
                </h2>
                <p className="text-sm text-[#64748B] leading-relaxed">{ind.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
