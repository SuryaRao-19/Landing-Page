import type { Metadata } from 'next'
import { FAQSection } from '@/components/sections/faq-section'
import { SectionHeader } from '@/components/shared/section-header'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description: "Find answers to common questions about NexGen Technologies' services, engagement models, pricing, team, and how we work.",
}

export default function FAQPage() {
  return (
    <>
      <section
        className="pt-36 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#F8FAFC 0%,#EEF2FF 100%)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="container relative z-10 text-center">
          <SectionHeader
            label="FAQ"
            title="Answers to Your"
            highlight="Most Common Questions"
            subtitle="Everything you need to know before starting an engagement with NexGen Technologies."
            center
          />
        </div>
      </section>
      <FAQSection />
      <CTASection title="Still Have Questions?" subtitle="Our team is happy to answer any questions about our services, engagement models, or how we can help your business." />
    </>
  )
}
