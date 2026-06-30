import type { Metadata } from 'next'
import { SectionHeader } from '@/components/shared/section-header'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Portfolio — Our Work',
  description: 'Browse NexGen\'s portfolio of enterprise technology projects across AI, cloud, web development, mobile apps, and digital transformation.',
}

const PORTFOLIO_ITEMS = [
  { title: 'AI Fraud Detection Platform', type: 'Artificial Intelligence', industry: 'Banking', color: '#1B4FD8', icon: '🧠' },
  { title: 'Hospital Management Suite', type: 'Software Development', industry: 'Healthcare', color: '#10B981', icon: '🏥' },
  { title: 'Smart Factory IoT Dashboard', type: 'IoT & Analytics', industry: 'Manufacturing', color: '#7C3AED', icon: '⚙️' },
  { title: 'E-Commerce Platform (8 Countries)', type: 'Web Development', industry: 'Retail', color: '#F97316', icon: '🛍️' },
  { title: 'Digital Learning Platform', type: 'Mobile App', industry: 'Education', color: '#06B6D4', icon: '📱' },
  { title: 'Real-Time Logistics Tracker', type: 'Cloud & DevOps', industry: 'Logistics', color: '#EAB308', icon: '🚛' },
  { title: 'Citizen Services Portal', type: 'Web Development', industry: 'Government', color: '#0D9488', icon: '🏛️' },
  { title: 'SOC-as-a-Service Platform', type: 'Cybersecurity', industry: 'Multi-sector', color: '#EF4444', icon: '🔒' },
  { title: 'Predictive Maintenance AI', type: 'AI/ML', industry: 'Manufacturing', color: '#2563EB', icon: '📊' },
]

export default function PortfolioPage() {
  return (
    <>
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#F8FAFC 0%,#EEF2FF 100%)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="container relative z-10 text-center">
          <SectionHeader
            label="Portfolio"
            title="Projects That Define"
            highlight="Excellence"
            subtitle="A curated selection of our most impactful enterprise technology projects — each one a story of transformation, innovation, and measurable results."
            center
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_ITEMS.map((item) => (
              <article
                key={item.title}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className="h-44 flex items-center justify-center text-5xl"
                  style={{ background: `${item.color}12` }}
                >
                  {item.icon}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-bold rounded-full px-3 py-1 text-white"
                      style={{ background: item.color }}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-400">{item.industry}</span>
                  </div>
                  <h2 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors">{item.title}</h2>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
