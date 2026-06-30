import type { Metadata } from 'next'
import { INDUSTRIES } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Industries — Domain Expertise Across Key Sectors',
  description: 'NexGen brings deep vertical expertise across Banking, Healthcare, Manufacturing, Retail, Education, Government, Logistics, Telecom and more.',
}

export default function IndustriesPage() {
  return (
    <>
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#F8FAFC 0%,#ECFDF5 100%)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="container relative z-10 text-center">
          <SectionHeader
            label="Industries"
            title="Deep Domain Expertise Across"
            highlight="Every Sector"
            subtitle="We combine vertical industry knowledge with technology excellence to deliver solutions that address your sector's unique challenges."
            center
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind) => (
              <article
                key={ind.slug}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${ind.color}15` }}
                >
                  {ind.icon}
                </div>
                <h2 className="font-bold text-slate-900 text-lg mb-3 group-hover:text-blue-700 transition-colors">
                  {ind.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">{ind.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
