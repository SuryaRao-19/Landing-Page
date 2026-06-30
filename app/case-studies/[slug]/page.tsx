import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, TrendingUp } from 'lucide-react'
import { CASE_STUDIES } from '@/lib/data'
import { CTASection } from '@/components/sections/cta-section'

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
      <section className="pt-36 pb-16 bg-slate-50">
        <div className="container">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-8 transition-colors">
            <ArrowLeft size={14} /> All Case Studies
          </Link>
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 rounded-full px-3 py-1">{cs.industry}</span>
            <h1 className="font-extrabold text-slate-900 text-4xl mt-5 mb-4 leading-tight tracking-tight">{cs.title}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><TrendingUp size={14} /> ROI: {cs.roi}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-10">
              <div>
                <h2 className="font-bold text-slate-900 text-xl mb-4">The Challenge</h2>
                <p className="text-slate-600 leading-relaxed">{cs.challenge}</p>
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-xl mb-4">Our Solution</h2>
                <p className="text-slate-600 leading-relaxed">{cs.solution}</p>
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-xl mb-4">Results</h2>
                <ul className="space-y-3">
                  {cs.results.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-teal-500 mt-0.5 shrink-0" />
                      <span className="text-slate-700">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-5">
              <div className="bg-slate-50 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 text-sm mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {cs.tech.map((t) => (
                    <span key={t} className="text-xs font-medium bg-white border border-slate-200 text-slate-700 rounded-full px-3 py-1">{t}</span>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-5 text-white">
                <p className="text-sm text-blue-100 mb-1">Total ROI</p>
                <p className="font-extrabold text-3xl">{cs.roi}</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5">
                <p className="text-xs text-slate-500 mb-1">Industry</p>
                <p className="font-bold text-slate-900">{cs.industry}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
