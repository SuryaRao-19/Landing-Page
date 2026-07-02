import type { Metadata } from 'next'
import { TECHNOLOGIES } from '@/lib/data'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Technologies — Our Technology Stack',
  description: 'Explore the world-class technologies NexGen uses to build enterprise solutions: Python, React, AWS, Azure, Kubernetes, TensorFlow, and more.',
}

const CATEGORIES = ['Languages', 'Frontend', 'Backend', 'Mobile', 'Cloud', 'DevOps', 'AI/ML', 'Databases']

const TECH_ICONS: Record<string, string> = {
  'React': '⚛️', 'Next.js': '▲', 'TypeScript': '🔷', 'Node.js': '🟢',
  'Python': '🐍', 'Java': '☕', 'Go': '🔵', 'Rust': '⚙️',
  'AWS': '☁️', 'Azure': '🔵', 'GCP': '🌐', 'Kubernetes': '☸️',
  'Docker': '🐳', 'PostgreSQL': '🐘', 'MongoDB': '🍃', 'Redis': '🔴',
  'TensorFlow': '🧠', 'PyTorch': '🔥', 'Vue.js': '💚', 'Angular': '🔴',
  'Flutter': '💙', 'React Native': '📱', 'GraphQL': '💜', 'Terraform': '🏗️',
  'Jenkins': '🔧', 'Kafka': '📨',
}

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology Stack"
        title="The Technologies That Power"
        highlight="Our Solutions"
        subtitle="We work with the most powerful, proven, and future-ready technologies to deliver exceptional enterprise solutions."
        breadcrumbs={[{ label: 'Technologies' }]}
      />

      <section className="section bg-white">
        <div className="container space-y-14">
          {CATEGORIES.map((cat) => {
            const items = TECHNOLOGIES.filter((t) => t.category === cat)
            return (
              <div key={cat}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-bold text-[#0A0F1C] text-lg whitespace-nowrap">{cat}</h2>
                  <div className="h-px flex-1 bg-[#E2E8F0]" />
                  <span className="text-xs font-semibold text-[#94A3B8]">{items.length} technologies</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {items.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center gap-2 p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] hover:border-[#2563EB]/25 hover:shadow-[0_4px_16px_rgba(37,99,235,.08)] hover:-translate-y-0.5 hover:bg-white transition-all duration-200 text-center"
                    >
                      <span className="text-2xl">{TECH_ICONS[tech.name] ?? '✦'}</span>
                      <span className="text-[11px] font-semibold text-[#334155] leading-tight">{tech.name}</span>
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
