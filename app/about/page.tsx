import type { Metadata } from 'next'
import { CTASection } from '@/components/sections/cta-section'
import { SectionHeader } from '@/components/shared/section-header'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us — Our Story, Mission & Values',
  description: "Learn about NexGen Technologies — India's premier IT company with 15+ years of enterprise technology expertise serving 500+ clients across 25+ countries.",
}

const VALUES = [
  { title: 'Client Success First', desc: 'Every decision we make is guided by one question: does this create value for our clients?' },
  { title: 'Engineering Excellence', desc: 'We hold ourselves to the highest standards of code quality, architecture, and delivery.' },
  { title: 'Transparency', desc: 'Honest communication, realistic commitments, and full visibility into every project.' },
  { title: 'Innovation', desc: 'We continuously invest in emerging technologies so our clients always have access to the cutting edge.' },
  { title: 'Inclusivity', desc: 'A diverse team builds better solutions. We actively cultivate an inclusive, equitable workplace.' },
  { title: 'Sustainability', desc: "Technology should create a better world. We consider the environmental and social impact of everything we build." },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#0A1628 0%,#1B4FD8 100%)' }}
      >
        <div className="absolute inset-0 bg-dots opacity-20" aria-hidden />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <SectionHeader
            label="About NexGen"
            title="Built in India."
            highlight="Trusted Worldwide."
            subtitle="We are a team of 150+ technologists, designers, and strategists united by a single mission: to help businesses harness the transformative power of technology."
            center
            dark
          />
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                label="Our Story"
                title="15 Years of Technology Excellence"
                subtitle="NexGen Technologies was founded in 2009 in Bengaluru by Suresh Venkataraman, a former VP Engineering at Infosys, with a clear vision: to create an Indian IT company that combines global quality standards with deep local market expertise."
              />
              <div className="mt-6 space-y-3">
                {['2009 — Founded in Bengaluru with 8 engineers','2012 — First Fortune 500 engagement','2015 — Expanded to Mumbai & Hyderabad','2018 — Launched AI practice; Dubai office opened','2022 — Crossed 500 enterprise clients','2025 — 150+ team members, 25+ countries served'].map((milestone) => (
                  <div key={milestone} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-teal-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-600">{milestone}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {[['15+','Years'],['500+','Clients'],['1000+','Projects'],['25+','Countries']].map(([v,l]) => (
                  <div key={l} className="bg-white rounded-2xl p-5 text-center shadow-sm">
                    <p className="font-extrabold text-3xl text-grad">{v}</p>
                    <p className="text-sm text-slate-500 mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-slate-50">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl mb-5">🎯</div>
              <h2 className="font-bold text-slate-900 text-xl mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">To democratize enterprise-grade technology for Indian and global businesses, enabling every organization — regardless of size — to compete and thrive in the digital economy.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl mb-5">🔭</div>
              <h2 className="font-bold text-slate-900 text-xl mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">To be the most trusted technology partner for enterprises across Asia, the Middle East, and beyond — recognized for our engineering excellence, client outcomes, and commitment to responsible innovation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <SectionHeader label="Our Values" title="The Principles That Guide Us" center className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-slate-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg hover:border hover:border-slate-100 transition-all duration-300">
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
