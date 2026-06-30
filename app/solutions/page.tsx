import type { Metadata } from 'next'
import { SectionHeader } from '@/components/shared/section-header'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Solutions — Digital Transformation & Enterprise Technology',
  description: 'Explore NexGen\'s integrated technology solutions for digital transformation, AI adoption, cloud migration, and enterprise automation.',
}

const SOLUTIONS = [
  {
    title: 'Digital Transformation',
    icon: '🔄',
    desc: 'End-to-end digital transformation programs that modernize legacy systems, digitize processes, and create new digital revenue streams.',
    outcomes: ['Legacy system modernization', 'Process digitization', 'Digital product development', 'Change management'],
  },
  {
    title: 'AI & Machine Learning Adoption',
    icon: '🧠',
    desc: 'A structured approach to adopting AI — from strategy and data readiness assessment to model deployment and organizational capability building.',
    outcomes: ['AI readiness assessment', 'Data strategy & governance', 'ML model development', 'AI Center of Excellence'],
  },
  {
    title: 'Cloud Migration & Modernization',
    icon: '☁️',
    desc: 'Risk-managed cloud migration programs that move your workloads to AWS, Azure, or GCP with zero business disruption.',
    outcomes: ['Workload assessment', 'Migration strategy (7Rs)', 'Zero-downtime migration', 'Post-migration optimization'],
  },
  {
    title: 'Enterprise Automation',
    icon: '🤖',
    desc: 'Intelligence-led automation programs that combine RPA, AI, and process orchestration to transform how work gets done.',
    outcomes: ['Process discovery & mining', 'Automation roadmap', 'RPA & AI implementation', 'Continuous optimization'],
  },
  {
    title: 'Data & Analytics Platform',
    icon: '📊',
    desc: 'Build the data foundations your AI and analytics initiatives need — from ingestion and transformation to warehousing and BI.',
    outcomes: ['Data strategy', 'Platform architecture', 'Pipeline development', 'BI & self-service analytics'],
  },
  {
    title: 'Cybersecurity Transformation',
    icon: '🔒',
    desc: 'A comprehensive cybersecurity program that assesses, improves, and continuously monitors your security posture.',
    outcomes: ['Security assessment', 'Zero-trust implementation', 'SOC setup', 'Compliance certification'],
  },
]

export default function SolutionsPage() {
  return (
    <>
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#F8FAFC 0%,#EEF2FF 100%)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="container relative z-10 text-center">
          <SectionHeader
            label="Solutions"
            title="Integrated Solutions for"
            highlight="Digital Transformation"
            subtitle="Beyond individual services, NexGen delivers complete solution programs that combine strategy, technology, and change management to achieve business outcomes."
            center
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.map((sol) => (
              <article key={sol.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="text-3xl mb-5">{sol.icon}</div>
                <h2 className="font-bold text-slate-900 text-lg mb-3 group-hover:text-blue-700 transition-colors">{sol.title}</h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">{sol.desc}</p>
                <ul className="space-y-2">
                  {sol.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" aria-hidden />
                      {o}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
