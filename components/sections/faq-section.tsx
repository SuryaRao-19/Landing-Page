'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { FAQS } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section bg-white" id="faq">
      <div className="container max-w-3xl">
        <SectionHeader
          label="FAQ"
          title="Common"
          highlight="Questions"
          subtitle="Everything you need to know before starting your engagement with NexGen."
          center
          className="mb-14"
        />

        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-[18px] overflow-hidden transition-all duration-250 ${
                open === i
                  ? 'border-[rgba(37,99,235,.2)] shadow-[0_4px_24px_rgba(37,99,235,.07)] bg-white'
                  : 'border-[#E8EEF4] bg-white hover:border-[#CBD5E1]'
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-5 px-6 py-5 text-left transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-[1rem] text-[#0A0F1C] leading-snug tracking-[-0.01em]">
                  {faq.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-all duration-200 ${
                    open === i
                      ? 'bg-[#2563EB] text-white shadow-[0_2px_8px_rgba(37,99,235,.35)]'
                      : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                  }`}
                >
                  {open === i ? <Minus size={13} /> : <Plus size={13} />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-[0.9375rem] text-[#64748B] leading-[1.8]">
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
