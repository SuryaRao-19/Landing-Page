import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/shared/page-hero'

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
      <PageHero
        eyebrow="Resources"
        title="Free Enterprise Technology"
        highlight="Resources"
        subtitle="Practical guides, frameworks, and tools to help you navigate technology decisions with confidence."
        breadcrumbs={[{ label: 'Resources' }]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESOURCES.map((r) => (
              <div
                key={r.title}
                className="bg-white border border-[#E2E8F0] rounded-[20px] p-6 hover:shadow-[0_12px_40px_rgba(0,0,0,.09)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-bold rounded-full px-3 py-1 text-white"
                    style={{ background: CATEGORY_COLORS[r.category] ?? '#1B4FD8' }}
                  >
                    {r.category}
                  </span>
                  <span className="text-xs text-[#94A3B8]">{r.type} · {r.pages} pages</span>
                </div>
                <h3 className="font-bold text-[#0A0F1C] text-base mb-4 group-hover:text-[#2563EB] transition-colors">{r.title}</h3>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-blue-800 transition-colors"
                >
                  <Download size={14} /> Download Free
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-[#F8FAFC] rounded-3xl p-10">
            <h2 className="font-bold text-[#0A0F1C] text-2xl mb-3">Looking for Something Specific?</h2>
            <p className="text-[#64748B] mb-6">Our team can create custom research reports and benchmarking studies tailored to your industry and use case.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm">
              Request Custom Research <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
