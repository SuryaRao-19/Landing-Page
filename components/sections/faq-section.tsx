'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { FAQS } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'

export function FAQSection({ items = FAQS, center = true }: { items?: typeof FAQS; center?: boolean }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section" aria-label="Frequently asked questions">
      <div className="container max-w-3xl">
        <SectionHeader
          label="FAQ"
          title="Frequently Asked"
          highlight="Questions"
          subtitle="Everything you need to know about working with NexGen Technologies."
          center={center}
          className="mb-12"
        />

        <div className="space-y-3" role="list">
          {items.map((faq, i) => (
            <div
              key={i}
              className="border border-slate-100 rounded-2xl overflow-hidden bg-white"
              role="listitem"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-slate-900 hover:text-blue-700 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-sm sm:text-base">{faq.question}</span>
                <div className="shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                  {open === i ? <Minus size={12} /> : <Plus size={12} />}
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: .2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-3">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
