import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Clock, Briefcase, ArrowRight } from 'lucide-react'
import { JOB_OPENINGS } from '@/lib/data'
import { PageHero } from '@/components/shared/page-hero'
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
      <PageHero
        eyebrow="We're Hiring"
        title="Build the Future of"
        highlight="Enterprise Technology"
        subtitle="Join a team of 150+ passionate engineers, designers, and strategists solving the hardest technology problems for India's and the world's leading enterprises."
        breadcrumbs={[{ label: 'Careers' }]}
        dark
      >
        <Link href="/careers/internship" className="inline-flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors">
          Also looking for internships? <ArrowRight size={14} />
        </Link>
      </PageHero>

      {/* Benefits */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12"><div className="pill mx-auto w-fit mb-5">Why NexGen</div><h2 className="display-md text-[#0A0F1C]">Benefits That <span className="text-grad">Matter</span></h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white border border-[#E2E8F0] rounded-[20px] p-6 hover:shadow-[0_12px_40px_rgba(0,0,0,.09)] hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-bold text-[#0A0F1C] mb-2">{b.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="section bg-[#F8FAFC]">
        <div className="container">
          <div className="text-center mb-10"><div className="pill mx-auto w-fit mb-5">Open Roles</div><h2 className="display-md text-[#0A0F1C]">Current <span className="text-grad">Openings</span></h2></div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {JOB_OPENINGS.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-[#E2E8F0] rounded-[20px] p-6 hover:border-blue-100 hover:shadow-[0_12px_40px_rgba(0,0,0,.09)] transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-[#0A0F1C] text-lg group-hover:text-[#2563EB] transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-[#94A3B8]">
                      <span className="flex items-center gap-1.5"><Briefcase size={13} />{job.department}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={13} />{job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={13} />{job.type}</span>
                    </div>
                    <p className="mt-3 text-sm text-[#64748B]">{job.description}</p>
                  </div>
                  <div className="shrink-0">
                    <span className="text-xs font-medium bg-blue-50 text-[#2563EB] rounded-full px-3 py-1 block whitespace-nowrap mb-3">{job.experience}</span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-blue-800 whitespace-nowrap"
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
          <div className="text-center mb-12"><div className="pill mx-auto w-fit mb-5">How We Hire</div><h2 className="display-md text-[#0A0F1C]">Our Hiring <span className="text-grad">Process</span></h2></div>
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
                <h3 className="font-bold text-[#0A0F1C] mb-2">{step.title}</h3>
                <p className="text-sm text-[#64748B]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
