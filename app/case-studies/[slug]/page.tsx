import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, TrendingUp, ArrowRight } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/data'
import { CTASection } from '@/components/sections/cta-section'
import { ButtonLink } from '@/components/ui/button'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = CASE_STUDIES.find((c) => c.slug === slug)
  return cs ? { title: cs.title, description: cs.challenge.slice(0, 160) } : {}
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const cs = CASE_STUDIES.find((c) => c.slug === slug)
  if (!cs) notFound()

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-14 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25" aria-hidden />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%,rgba(37,99,235,.06) 0%,transparent 65%)' }} aria-hidden />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#94A3B8] mb-10" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#64748B] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/case-studies" className="hover:text-[#64748B] transition-colors">Case Studies</Link>
            <span>/</span>
            <span className="text-[#475569] font-medium">{cs.industry}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] border border-[#DBEAFE] rounded-full px-3.5 py-1.5 mb-5">
              {cs.industry}
            </span>
            <h1 className="display-lg text-[#0A0F1C] font-extrabold mb-5">
              {cs.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-[#64748B]">
              <TrendingUp size={14} className="text-[#2563EB]" />
              <span>ROI: <strong className="text-[#0A0F1C]">{cs.roi}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_280px] gap-10 xl:gap-16 max-w-5xl">

            {/* Main content */}
            <div className="space-y-10">
              <div>
                <div className="pill mb-4">The Challenge</div>
                <p className="text-[#64748B] leading-[1.85] text-[.9375rem]">{cs.challenge}</p>
              </div>
              <div>
                <div className="pill mb-4">Our Solution</div>
                <p className="text-[#64748B] leading-[1.85] text-[.9375rem]">{cs.solution}</p>
              </div>
              <div>
                <div className="pill mb-4">Results Delivered</div>
                <ul className="space-y-3">
                  {cs.results.map((r) => (
                    <li key={r} className="flex items-start gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px] p-4">
                      <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-[#334155] text-[.9375rem] leading-snug">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              {/* ROI card */}
              <div className="rounded-[20px] p-6 text-white" style={{ background: 'linear-gradient(135deg,#2563EB,#06B6D4)' }}>
                <p className="text-[11px] font-semibold text-blue-100 mb-1 uppercase tracking-wide">Total ROI</p>
                <p className="font-extrabold text-3xl tracking-tight">{cs.roi}</p>
              </div>

              {/* Industry */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[18px] p-5">
                <p className="text-[11px] text-[#94A3B8] font-semibold uppercase tracking-wide mb-2">Industry</p>
                <p className="font-bold text-[#0A0F1C]">{cs.industry}</p>
              </div>

              {/* Technologies */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[18px] p-5">
                <p className="text-[11px] text-[#94A3B8] font-semibold uppercase tracking-wide mb-3">Technologies Used</p>
                <div className="flex flex-wrap gap-1.5">
                  {cs.tech.map((t) => (
                    <span key={t} className="text-[11px] font-medium text-[#475569] bg-white border border-[#E2E8F0] rounded-full px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="bg-[#0A0F1C] rounded-[18px] p-5">
                <p className="font-bold text-white text-sm mb-2">Similar project?</p>
                <p className="text-xs text-white/50 mb-4 leading-relaxed">Let&apos;s discuss how we can deliver results like this for your organization.</p>
                <ButtonLink href="/contact" variant="white" size="sm" className="w-full text-center justify-center" iconRight={<ArrowRight size={13} />}>
                  Start a Conversation
                </ButtonLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
