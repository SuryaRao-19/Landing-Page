import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'

export const metadata: Metadata = {
  title: 'Resources — Guides, Whitepapers & Tools',
  description: 'Download free enterprise technology resources from NexGen: guides, whitepapers, checklists, and toolkits on AI, cloud, security, and DevOps.',
}

const RESOURCES = [
  { title: 'Enterprise AI Adoption Roadmap 2025', type: 'Guide', pages: 28, category: 'AI' },
  { title: 'Cloud Migration Checklist for CIOs', type: 'Checklist', pages: 12, category: 'Cloud' },
  { title: 'Zero Trust Security Implementation Guide', type: 'Whitepaper', pages: 34, category: 'Security' },
  { title: 'DevOps Maturity Assessment Template', type: 'Template', pages: 8, category: 'DevOps' },
  { title: 'Digital Transformation ROI Calculator', type: 'Tool', pages: 6, category: 'Strategy' },
  { title: 'Data Governance Framework for Enterprises', type: 'Framework', pages: 22, category: 'Data' },
]

const CATEGORY_COLORS: Record<string, string> = {
  AI: '#1B4FD8', Cloud: '#06B6D4', Security: '#EF4444', DevOps: '#2563EB', Strategy: '#7C3AED', Data: '#EAB308',
}

export default function ResourcesPage() {
  return (
    <>
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#F8FAFC 0%,#EEF2FF 100%)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="container relative z-10 text-center">
          <SectionHeader
            label="Resources"
            title="Free Enterprise Technology"
            highlight="Resources"
            subtitle="Practical guides, frameworks, and tools to help you navigate technology decisions with confidence."
            center
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESOURCES.map((r) => (
              <div
                key={r.title}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-bold rounded-full px-3 py-1 text-white"
                    style={{ background: CATEGORY_COLORS[r.category] ?? '#1B4FD8' }}
                  >
                    {r.category}
                  </span>
                  <span className="text-xs text-slate-400">{r.type} · {r.pages} pages</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-4 group-hover:text-blue-700 transition-colors">{r.title}</h3>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Download size={14} /> Download Free
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-slate-50 rounded-3xl p-10">
            <h2 className="font-bold text-slate-900 text-2xl mb-3">Looking for Something Specific?</h2>
            <p className="text-slate-500 mb-6">Our team can create custom research reports and benchmarking studies tailored to your industry and use case.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm">
              Request Custom Research <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
