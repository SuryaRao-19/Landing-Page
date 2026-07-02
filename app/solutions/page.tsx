import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Solutions — Digital Transformation & Enterprise Technology',
  description: "Explore NexGen's integrated technology solutions for digital transformation, AI adoption, cloud migration, and enterprise automation.",
}

const SOLUTIONS = [
  { title: 'Digital Transformation',          icon: '🔄', desc: 'End-to-end programs that modernize legacy systems, digitize processes, and create new digital revenue streams.',                                                                        outcomes: ['Legacy system modernization','Process digitization','Digital product development','Change management'] },
  { title: 'AI & Machine Learning Adoption',  icon: '🧠', desc: 'A structured approach to AI — from strategy and data readiness assessment to model deployment and organizational capability building.',                                               outcomes: ['AI readiness assessment','Data strategy & governance','ML model development','AI Center of Excellence'] },
  { title: 'Cloud Migration & Modernization', icon: '☁️', desc: 'Risk-managed cloud migration programs that move your workloads to AWS, Azure, or GCP with zero business disruption.',                                                                   outcomes: ['Workload assessment','Migration strategy (7Rs)','Zero-downtime migration','Post-migration optimization'] },
  { title: 'Enterprise Automation',           icon: '🤖', desc: 'Intelligence-led automation that combines RPA, AI, and process orchestration to transform how work gets done.',                                                                           outcomes: ['Process discovery & mining','Automation roadmap','RPA & AI implementation','Continuous optimization'] },
  { title: 'Data & Analytics Platform',       icon: '📊', desc: 'Build the data foundations your AI and analytics initiatives need — from ingestion and transformation to warehousing and BI.',                                                             outcomes: ['Data strategy','Platform architecture','Pipeline development','BI & self-service analytics'] },
  { title: 'Cybersecurity Transformation',    icon: '🔒', desc: 'A comprehensive cybersecurity program that assesses, improves, and continuously monitors your security posture.',                                                                          outcomes: ['Security assessment','Zero-trust implementation','SOC setup','Compliance certification'] },
]

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Integrated Solutions for"
        highlight="Digital Transformation"
        subtitle="Beyond individual services, NexGen delivers complete solution programs that combine strategy, technology, and change management to achieve business outcomes."
        breadcrumbs={[{ label: 'Solutions' }]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOLUTIONS.map((sol) => (
              <article
                key={sol.title}
                className="bg-white border border-[#E2E8F0] rounded-[20px] p-6 hover:shadow-[0_12px_40px_rgba(0,0,0,.09)] hover:border-[#CBD5E1] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-3xl mb-5">{sol.icon}</div>
                <h2 className="font-bold text-[#0A0F1C] text-[.9375rem] mb-2 group-hover:text-[#2563EB] transition-colors">{sol.title}</h2>
                <p className="text-sm text-[#64748B] leading-relaxed mb-4">{sol.desc}</p>
                <ul className="space-y-1.5">
                  {sol.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-[.8125rem] text-[#475569]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0" aria-hidden />
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
