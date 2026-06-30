'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'
import { Card, CardBody } from '@/components/ui/card'

const AVATAR_COLORS = ['#1B4FD8','#0D9488','#7C3AED','#EF4444','#F97316','#2563EB']

export function TestimonialsSection() {
  return (
    <section className="section bg-slate-50" aria-label="Client testimonials">
      <div className="container">
        <SectionHeader
          label="Testimonials"
          title="What Our"
          highlight="Clients Say"
          subtitle="Trusted by enterprise leaders across India, USA, Europe, and the Middle East."
          center
          className="mb-14"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i % 3) * .1 }}
            >
              <Card className="h-full p-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="#F59E0B" stroke="none" />
                  ))}
                </div>

                <blockquote>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">&ldquo;{t.content}&rdquo;</p>
                </blockquote>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                    aria-hidden
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}, {t.company}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
