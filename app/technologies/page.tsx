import type { Metadata } from 'next'
import { TECHNOLOGIES } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Technologies — Our Technology Stack',
  description: 'Explore the world-class technologies NexGen uses to build enterprise solutions: Python, React, AWS, Azure, Kubernetes, TensorFlow, and more.',
}

const CATEGORIES = ['Languages', 'Frontend', 'Backend', 'Mobile', 'Cloud', 'DevOps', 'AI/ML', 'Databases']

export default function TechnologiesPage() {
  return (
    <>
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#F8FAFC 0%,#EFF6FF 100%)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="container relative z-10 text-center">
          <SectionHeader
            label="Technology Stack"
            title="The Technologies That Power"
            highlight="Our Solutions"
            subtitle="We work with the most powerful, proven, and future-ready technologies to deliver exceptional enterprise solutions."
            center
          />
        </div>
      </section>

      <section className="section">
        <div className="container space-y-16">
          {CATEGORIES.map((cat) => {
            const items = TECHNOLOGIES.filter((t) => t.category === cat)
            return (
              <div key={cat}>
                <h2 className="font-bold text-slate-900 text-xl mb-6 flex items-center gap-3">
                  {cat}
                  <span className="h-px flex-1 bg-slate-100" />
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                  {items.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white"
                        style={{ background: tech.color }}
                      >
                        {tech.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-xs font-semibold text-slate-700 leading-tight">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <CTASection />
    </>
  )
}
