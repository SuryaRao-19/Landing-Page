'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'
import { Card, CardBody } from '@/components/ui/card'

export function ServicesGrid() {
  return (
    <section className="section bg-slate-50" id="services" aria-label="Our Services">
      <div className="container">
        <SectionHeader
          label="Our Services"
          title="End-to-End Technology"
          highlight="Solutions"
          subtitle="From AI strategy to full-stack development, we deliver comprehensive technology services that drive measurable business outcomes."
          center
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: (i % 4) * .08 }}
            >
              <Link href={`/services/${svc.slug}`} className="block h-full group">
                <Card hover className="h-full relative overflow-hidden">
                  {/* Gradient hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: `linear-gradient(135deg, ${svc.color}15, ${svc.color}08)` }}
                    aria-hidden
                  />
                  <CardBody className="relative">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                      style={{ background: `${svc.color}15`, border: `1px solid ${svc.color}25` }}
                    >
                      {svc.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-blue-700 transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5">{svc.shortDesc}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:gap-2.5 transition-all">
                      Learn more <ArrowRight size={12} />
                    </span>
                  </CardBody>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
