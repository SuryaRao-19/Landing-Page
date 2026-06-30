import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react'
import { JOB_OPENINGS } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Careers — Join NexGen Technologies',
  description: "Build your career at India's premier IT company. We're hiring AI engineers, cloud architects, software developers, designers, and more.",
}

const BENEFITS = [
  { icon: '💰', title: 'Competitive Compensation', desc: 'Top-of-market salaries, performance bonuses, and ESOPs for senior roles.' },
  { icon: '🏥', title: 'Comprehensive Health Cover', desc: 'Full medical, dental, and vision for you and your family.' },
  { icon: '📚', title: 'Learning & Development', desc: '₹1 lakh annual L&D budget per employee. Certifications fully sponsored.' },
  { icon: '🏠', title: 'Flexible Work', desc: 'Hybrid work model with up to 3 days WFH for most roles.' },
  { icon: '🌍', title: 'Global Exposure', desc: 'Opportunities to work with clients and teams across 25+ countries.' },
  { icon: '⚡', title: 'Career Growth', desc: 'Clear growth paths, bi-annual reviews, and mentorship programs.' },
]

export default function CareersPage() {
  return (
    <>
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#0A1628 0%,#1B4FD8 100%)' }}
      >
        <div className="absolute inset-0 bg-dots opacity-20" aria-hidden />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <SectionHeader
            label="We're Hiring"
            title="Build the Future of"
            highlight="Enterprise Technology"
            subtitle="Join a team of 150+ passionate engineers, designers, and strategists solving the hardest technology problems for India's and the world's leading enterprises."
            center
            dark
          />
          <Link href="/careers/internship" className="inline-flex items-center gap-2 mt-8 text-blue-200 hover:text-white text-sm transition-colors">
            Also looking for internships? <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container">
          <SectionHeader label="Why NexGen" title="Benefits That" highlight="Matter" center className="mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeader label="Open Roles" title="Current" highlight="Openings" center className="mb-10" />
          <div className="space-y-4 max-w-4xl mx-auto">
            {JOB_OPENINGS.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-blue-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5"><Briefcase size={13} />{job.department}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={13} />{job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={13} />{job.type}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-500">{job.description}</p>
                  </div>
                  <div className="shrink-0">
                    <span className="text-xs font-medium bg-blue-50 text-blue-700 rounded-full px-3 py-1 block whitespace-nowrap mb-3">{job.experience}</span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 whitespace-nowrap"
                    >
                      Apply Now <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring process */}
      <section className="section">
        <div className="container max-w-4xl">
          <SectionHeader label="How We Hire" title="Our Hiring" highlight="Process" center className="mb-12" />
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Application', desc: 'Submit your CV and a brief note on why NexGen.' },
              { step: '02', title: 'Screening', desc: '30-min call with our talent team to understand your background and goals.' },
              { step: '03', title: 'Technical Round', desc: 'Role-specific technical assessment — practical, not algorithmic puzzles.' },
              { step: '04', title: 'Final Interview', desc: 'Meet the team lead and discuss culture, expectations, and offer.' },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white font-extrabold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Don't See the Right Role?" subtitle="We're always looking for exceptional talent. Send us your CV and tell us how you'd like to contribute." />
    </>
  )
}
