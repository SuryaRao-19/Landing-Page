import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { SERVICES } from '@/lib/data'
import { CTASection } from '@/components/sections/cta-section'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const svc = SERVICES.find((s) => s.slug === slug)
  if (!svc) return {}
  return {
    title: `${svc.title} Services`,
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
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${svc.color}08 0%, #fff 100%)` }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="container relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Services
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6"
                style={{ background: `${svc.color}15`, border: `1px solid ${svc.color}25` }}
              >
                {svc.icon}
              </div>
              <h1 className="font-extrabold text-slate-900 text-4xl lg:text-5xl mb-4 leading-tight tracking-tight">
                {svc.title}
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-8">{svc.description}</p>
              <Link href="/contact">
                <button
                  className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${svc.color}, #06B6D4)` }}
                >
                  Get Started <ArrowRight size={16} />
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {svc.benefits.map((b) => (
                <div key={b} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-start gap-3 shadow-sm">
                  <CheckCircle2 size={18} className="text-teal-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-slate-700 font-medium">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <h2 className="font-bold text-slate-900 text-2xl mb-8">What We Deliver</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {svc.features.map((f, i) => (
              <div key={f} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: svc.color }}
                >
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700 font-medium">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="section bg-slate-50">
        <div className="container">
          <h2 className="font-bold text-slate-900 text-2xl mb-8">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="group block">
                <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <span className="text-2xl">{r.icon}</span>
                  <h3 className="font-bold text-slate-900 mt-3 mb-2 group-hover:text-blue-700 transition-colors">{r.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{r.shortDesc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
