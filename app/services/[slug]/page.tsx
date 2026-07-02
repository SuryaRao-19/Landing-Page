import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/data'
import { CTASection } from '@/components/sections/cta-section'
import { PageHero } from '@/components/shared/page-hero'
import { ButtonLink } from '@/components/ui/button'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const svc = SERVICES.find((s) => s.slug === slug)
  if (!svc) return {}
  return {
    title: `${svc.title} — Services`,
    description: svc.description.slice(0, 160),
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const svc = SERVICES.find((s) => s.slug === slug)
  if (!svc) notFound()

  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-grid opacity-25" aria-hidden />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%,${svc.color}10 0%,transparent 65%)` }}
          aria-hidden
        />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm mb-10" aria-label="Breadcrumb">
            <Link href="/" className="text-[#94A3B8] hover:text-[#64748B] transition-colors">Home</Link>
            <span className="text-[#CBD5E1]">/</span>
            <Link href="/services" className="text-[#94A3B8] hover:text-[#64748B] transition-colors">Services</Link>
            <span className="text-[#CBD5E1]">/</span>
            <span className="text-[#475569] font-medium">{svc.title}</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-14 items-center">
            {/* Left */}
            <div>
              <div
                className="w-14 h-14 rounded-[18px] flex items-center justify-center text-2xl mb-6 shadow-sm"
                style={{ background: `${svc.color}14`, border: `1px solid ${svc.color}22` }}
              >
                {svc.icon}
              </div>

              <h1 className="display-lg text-[#0A0F1C] mb-5 font-extrabold">
                {svc.title}
              </h1>

              <p className="text-[1.0625rem] text-[#64748B] leading-[1.8] mb-8 max-w-lg">
                {svc.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <ButtonLink
                  href="/contact"
                  variant="primary"
                  size="lg"
                  iconRight={<ArrowRight size={15} />}
                  style={{ background: `linear-gradient(135deg,${svc.color},#06B6D4)`, boxShadow: `0 4px 20px ${svc.color}40` }}
                >
                  Start a Project
                </ButtonLink>
                <ButtonLink href="/case-studies" variant="outline" size="lg">See Case Studies</ButtonLink>
              </div>
            </div>

            {/* Right: Benefits */}
            <div className="grid grid-cols-2 gap-3">
              {svc.benefits.map((b, i) => (
                <div
                  key={b}
                  className="bg-white border border-[#E2E8F0] rounded-[16px] p-4 flex items-start gap-3 shadow-[0_2px_8px_rgba(0,0,0,.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,.07)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                  <p className="text-[.8125rem] text-[#334155] font-medium leading-snug">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-[#F8FAFC]">
        <div className="container">
          <div className="mb-10">
            <div className="pill mb-4">What We Deliver</div>
            <h2 className="display-sm text-[#0A0F1C] font-extrabold max-w-lg">
              End-to-End {svc.title} Capabilities
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {svc.features.map((f, i) => (
              <div
                key={f}
                className="group bg-white border border-[#E2E8F0] rounded-[18px] p-5 flex items-start gap-4 hover:border-[#2563EB]/25 hover:shadow-[0_4px_20px_rgba(37,99,235,.06)] transition-all duration-200"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                  style={{ background: `linear-gradient(135deg,${svc.color},#06B6D4)` }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p className="text-[.875rem] text-[#334155] font-medium leading-snug pt-1">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="section bg-white">
        <div className="container">
          <div className="mb-10">
            <div className="pill mb-4">Related Services</div>
            <h2 className="display-sm text-[#0A0F1C] font-extrabold">You Might Also Need</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/services/${r.slug}`}
                className="group block bg-white border border-[#E2E8F0] rounded-[20px] p-6 hover:shadow-[0_12px_40px_rgba(0,0,0,.08)] hover:border-[#CBD5E1] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-2xl mb-4 block">{r.icon}</span>
                <h3 className="font-bold text-[#0A0F1C] mb-2 text-[.9375rem] group-hover:text-[#2563EB] transition-colors">{r.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2">{r.shortDesc}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
