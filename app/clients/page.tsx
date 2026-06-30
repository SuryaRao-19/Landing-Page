import type { Metadata } from 'next'
import { SectionHeader } from '@/components/shared/section-header'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Clients — Trusted by Enterprises Across India & Worldwide',
  description: 'NexGen serves 500+ enterprise clients across Banking, Healthcare, Manufacturing, Retail, Government, and more in 25+ countries.',
}

const CLIENT_LOGOS = [
  'IndusFirst Bank', 'MedCare Health', 'Bharat Steel', 'RetailNow', 'EduLearn',
  'LogiFlow', 'GovTech India', 'TelcomPlus', 'TravelPro', 'FinServe Capital',
  'Al-Rashid Group', 'AsiaPacific Tech', 'NordCloud GmbH', 'DataFirst UAE',
  'SmartBuild Ltd', 'AgroTech India', 'MobilePay Co', 'SecureBank PLC',
]

export default function ClientsPage() {
  return (
    <>
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#F8FAFC 0%,#EEF2FF 100%)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="container relative z-10 text-center">
          <SectionHeader
            label="Our Clients"
            title="Trusted by 500+ Enterprises"
            highlight="Worldwide"
            subtitle="From India's leading banks to global manufacturers, NexGen serves enterprise clients across every sector and geography."
            center
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-2xl mx-auto">
            {[['25+','Countries'],['500+','Clients'],['1000+','Projects'],['98%','Retention']].map(([v,l]) => (
              <div key={l} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <p className="font-extrabold text-2xl text-grad">{v}</p>
                <p className="text-xs text-slate-400 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo wall */}
      <section className="section">
        <div className="container">
          <p className="text-center text-sm text-slate-400 uppercase tracking-widest mb-10">Trusted by Industry Leaders</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {CLIENT_LOGOS.map((client) => (
              <div
                key={client}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-center h-16 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <span className="font-bold text-xs text-slate-400 text-center leading-tight">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CTASection />
    </>
  )
}
