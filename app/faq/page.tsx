import type { Metadata } from 'next'
import { FAQSection } from '@/components/sections/faq-section'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description: "Find answers to common questions about NexGen Technologies' services, engagement models, pricing, team, and how we work.",
}

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Answers to Your"
        highlight="Common Questions"
        subtitle="Everything you need to know before starting an engagement with NexGen Technologies."
        breadcrumbs={[{ label: 'FAQ' }]}
        size="sm"
      />
      <FAQSection />
      <CTASection />
    </>
  )
}
