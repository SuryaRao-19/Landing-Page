import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/sections/cta-section'
import { Brain, HeartPulse, Settings, ShoppingBag, Smartphone, Truck, Landmark, ShieldCheck, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Portfolio — Our Work',
  description: 'Browse NexGen\'s portfolio of enterprise technology projects across AI, cloud, web development, mobile apps, and digital transformation.',
}

const PORTFOLIO_ITEMS = [
  { title: 'AI Fraud Detection Platform', type: 'Artificial Intelligence', industry: 'Banking', color: '#1B4FD8', icon: Brain },
  { title: 'Hospital Management Suite', type: 'Software Development', industry: 'Healthcare', color: '#10B981', icon: HeartPulse },
  { title: 'Smart Factory IoT Dashboard', type: 'IoT & Analytics', industry: 'Manufacturing', color: '#7C3AED', icon: Settings },
  { title: 'E-Commerce Platform (8 Countries)', type: 'Web Development', industry: 'Retail', color: '#F97316', icon: ShoppingBag },
  { title: 'Digital Learning Platform', type: 'Mobile App', industry: 'Education', color: '#06B6D4', icon: Smartphone },
  { title: 'Real-Time Logistics Tracker', type: 'Cloud & DevOps', industry: 'Logistics', color: '#EAB308', icon: Truck },
  { title: 'Citizen Services Portal', type: 'Web Development', industry: 'Government', color: '#0D9488', icon: Landmark },
  { title: 'SOC-as-a-Service Platform', type: 'Cybersecurity', industry: 'Multi-sector', color: '#EF4444', icon: ShieldCheck },
  { title: 'Predictive Maintenance AI', type: 'AI/ML', industry: 'Manufacturing', color: '#2563EB', icon: BarChart3 },
]

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Projects That Define"
        highlight="Excellence"
        subtitle="A curated selection of our most impactful enterprise technology projects — each one a story of transformation, innovation, and measurable results."
        breadcrumbs={[{ label: 'Portfolio' }]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_ITEMS.map((item) => (
              <article
                key={item.title}
                className="group bg-white border border-[#E2E8F0] rounded-[20px] overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,.09)] transition-all duration-300"
              >
                <div
                  className="h-44 flex items-center justify-center"
                  style={{ background: `${item.color}12`, color: item.color }}
                >
                  <item.icon size={52} aria-hidden />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-bold rounded-full px-3 py-1 text-white"
                      style={{ background: item.color }}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs text-[#94A3B8]">{item.industry}</span>
                  </div>
                  <h2 className="font-bold text-[#0A0F1C] text-base group-hover:text-[#2563EB] transition-colors">{item.title}</h2>
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
