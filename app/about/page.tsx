'use client'

import { motion } from 'framer-motion'
import { Target, Code2, Eye, Lightbulb, Handshake, Leaf } from 'lucide-react'
import { CTASection } from '@/components/sections/cta-section'
import { PageHero } from '@/components/shared/page-hero'

const VALUES = [
  { icon: Target,    title: 'Client Success First',    desc: 'Every decision we make is guided by one question: does this create value for our clients?' },
  { icon: Code2,     title: 'Engineering Excellence',  desc: 'We hold ourselves to the highest standards of code quality, architecture, and delivery.' },
  { icon: Eye,       title: 'Transparency',             desc: 'Honest communication, realistic commitments, and full visibility into every project.' },
  { icon: Lightbulb, title: 'Innovation',               desc: 'We continuously invest in emerging technologies so our clients always have access to the cutting edge.' },
  { icon: Handshake, title: 'Inclusivity',              desc: 'A diverse team builds better solutions. We actively cultivate an inclusive, equitable workplace.' },
  { icon: Leaf,      title: 'Sustainability',            desc: "Technology should create a better world. We consider the environmental and social impact of everything we build." },
]

const MILESTONES = [
  { year: '2009', event: 'Founded in Bengaluru with 8 engineers' },
  { year: '2012', event: 'First Fortune 500 engagement secured' },
  { year: '2015', event: 'Expanded to Mumbai & Hyderabad' },
  { year: '2018', event: 'Launched AI practice; Dubai office opened' },
  { year: '2022', event: 'Crossed 500 enterprise clients milestone' },
  { year: '2025', event: '150+ team, 25+ countries served globally' },
]

const STATS = [
  { value: '15+',   label: 'Years Founded' },
  { value: '500+',  label: 'Clients Worldwide' },
  { value: '1000+', label: 'Projects Delivered' },
  { value: '25+',   label: 'Countries Served' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0 },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: .1 } } }

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About NexGen"
        title="Built in India."
        highlight="Trusted Worldwide."
        subtitle="We are 150+ technologists, designers, and strategists united by a single mission: to help businesses harness the transformative power of technology."
        dark
        size="lg"
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* Our Story */}
      <section className="section bg-white overflow-hidden">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            {/* Left */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} className="pill mb-6">Our Story</motion.div>
              <motion.h2 variants={fadeUp} className="display-md text-[#0A0F1C] mb-5">
                15 Years of Technology Excellence
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#64748B] leading-relaxed mb-8">
                NexGen Technologies was founded in 2009 in Bengaluru by Suresh Venkataraman, a former VP Engineering at Infosys, with a clear vision: to create an Indian IT company that combines global quality standards with deep local market expertise.
              </motion.p>

              {/* Timeline */}
              <div className="relative pl-8">
                <div className="absolute left-2.5 top-0 bottom-0 w-px bg-gradient-to-b from-[#2563EB] to-transparent" aria-hidden />
                <div className="space-y-6">
                  {MILESTONES.map((m) => (
                    <motion.div
                      key={m.year}
                      variants={fadeUp}
                      className="relative"
                    >
                      <div className="absolute -left-8 top-1 w-3 h-3 rounded-full bg-[#2563EB] border-2 border-white shadow-[0_0_0_2px_#2563EB]" aria-hidden />
                      <p className="text-[11px] font-bold text-[#2563EB] mb-0.5">{m.year}</p>
                      <p className="text-sm text-[#475569]">{m.event}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Stats grid */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .6, ease: [.22, 1, .36, 1] }}
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                {STATS.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: .9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * .1, duration: .4 }}
                    className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] p-6 text-center hover:border-[#2563EB]/20 hover:shadow-[0_4px_20px_rgba(37,99,235,.06)] transition-all"
                  >
                    <p className="font-extrabold text-[2.2rem] text-grad leading-none tracking-tight">{value}</p>
                    <p className="text-xs text-[#94A3B8] mt-2 font-medium">{label}</p>
                  </motion.div>
                ))}
              </div>

              {/* ISO / Cert badges */}
              <div className="bg-[#0A0F1C] rounded-[20px] p-6">
                <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold mb-4">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {['ISO 27001','CMMi Level 5','SOC 2 Type II','AWS Premier','Azure Expert MSP','Google Cloud Premier'].map((cert) => (
                    <span key={cert} className="px-3 py-1.5 text-[11px] font-semibold text-white/70 bg-white/[.06] border border-white/[.08] rounded-full">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-[#F8FAFC]">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: '🎯',
                bg: 'from-blue-500 to-cyan-500',
                title: 'Our Mission',
                text: 'To democratize enterprise-grade technology for Indian and global businesses, enabling every organization — regardless of size — to compete and thrive in the digital economy.',
              },
              {
                icon: '🔭',
                bg: 'from-violet-500 to-blue-500',
                title: 'Our Vision',
                text: 'To be the most trusted technology partner for enterprises across Asia, the Middle East, and beyond — recognized for engineering excellence, client outcomes, and responsible innovation.',
              },
            ].map(({ icon, bg, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * .15, duration: .5 }}
                className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 hover:shadow-[0_8px_32px_rgba(0,0,0,.07)] transition-shadow"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${bg} flex items-center justify-center text-xl mb-6 shadow-sm`}>
                  {icon}
                </div>
                <h2 className="font-bold text-[#0A0F1C] text-xl mb-4 tracking-tight">{title}</h2>
                <p className="text-[#64748B] leading-[1.8]">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-14">
            <div className="pill mb-5 mx-auto w-fit">Our Values</div>
            <h2 className="display-md text-[#0A0F1C]">The Principles That Guide Us</h2>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {VALUES.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="group bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] p-6 hover:bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,.07)] hover:border-[#CBD5E1] hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="w-11 h-11 mb-4 flex items-center justify-center rounded-[12px] bg-[#2563EB]/[.08] text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors" aria-hidden>
                  <v.icon size={20} strokeWidth={2} />
                </span>
                <h3 className="font-bold text-[#0A0F1C] mb-2 text-[.9375rem]">{v.title}</h3>
                <p className="text-sm text-[#64748B] leading-[1.75]">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
