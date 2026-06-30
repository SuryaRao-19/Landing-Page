import type { Metadata } from 'next'
import { HeroSection }        from '@/components/sections/hero'
import { TrustBar }           from '@/components/sections/trust-bar'
import { ServicesGrid }       from '@/components/sections/services-grid'
import { IndustriesSection }  from '@/components/sections/industries-section'
import { WhyUsSection }       from '@/components/sections/why-us'
import { TechStackSection }   from '@/components/sections/tech-stack'
import { ProcessSection }     from '@/components/sections/process-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { FAQSection }         from '@/components/sections/faq-section'
import { CTASection }         from '@/components/sections/cta-section'
import { CaseStudiesPreview } from '@/components/sections/case-studies-preview'
import { AIShowcase }         from '@/components/sections/ai-showcase'

export const metadata: Metadata = {
  title: "NexGen Technologies — India's Premier Digital Transformation Partner",
  description:
    'NexGen Technologies delivers AI, Cloud Computing, Software Development, Cybersecurity, and Digital Transformation solutions to 500+ enterprises across 25+ countries.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesGrid />
      <IndustriesSection />
      <AIShowcase />
      <WhyUsSection />
      <TechStackSection />
      <CaseStudiesPreview />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
