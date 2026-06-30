'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'

const AI_CAPABILITIES = [
  { title: 'Machine Learning', icon: '📈', desc: 'Custom models trained on your enterprise data for predictions, classification, and recommendations.' },
  { title: 'Generative AI',    icon: '✨', desc: 'LLM-powered applications for content generation, code assistance, and intelligent Q&A systems.' },
  { title: 'Computer Vision',  icon: '👁',  desc: 'Real-time visual AI for quality inspection, OCR, facial recognition, and object detection.' },
  { title: 'NLP & Chatbots',   icon: '💬', desc: 'Conversational AI, sentiment analysis, document processing, and multilingual support.' },
  { title: 'Predictive Analytics', icon: '🔮', desc: 'Demand forecasting, churn prediction, risk scoring, and anomaly detection at scale.' },
  { title: 'AI Automation',    icon: '🤖', desc: 'Intelligent process automation that learns and adapts, far beyond traditional RPA.' },
]

export function AIShowcase() {
  return (
    <section
      className="section relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0A1628 0%, #0D1F3C 100%)' }}
      aria-label="AI and machine learning capabilities"
    >
      {/* Background details */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #06B6D4, transparent)' }} />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <SectionHeader
              label="AI & Innovation"
              title="Powering the Future with"
              highlight="Artificial Intelligence"
              subtitle="We build intelligent systems that think, learn, adapt, and create value — transforming raw data into strategic advantage for your enterprise."
              dark
              className="mb-8"
            />

            <div className="flex flex-wrap gap-2 mb-8">
              {['Machine Learning', 'Generative AI', 'Computer Vision', 'NLP', 'Predictive Analytics', 'AI Automation', 'Neural Networks', 'Conversational AI'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/8 border border-white/12 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/services/artificial-intelligence"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              Explore AI Solutions <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: capability grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {AI_CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                className="bg-white/5 border border-white/8 rounded-2xl p-5 hover:bg-white/8 hover:border-cyan-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .08 }}
              >
                <div className="text-2xl mb-3">{cap.icon}</div>
                <h3 className="font-bold text-white text-sm mb-2">{cap.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
