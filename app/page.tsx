import type { Metadata } from 'next'
import { HeroSection }         from '@/components/sections/hero'
import { TrustBar }            from '@/components/sections/trust-bar'
import { ServicesGrid }        from '@/components/sections/services-grid'
import { IndustriesSection }   from '@/components/sections/industries-section'
import { AIShowcase }          from '@/components/sections/ai-showcase'
import { WhyUs }               from '@/components/sections/why-us'
import { TechStack }           from '@/components/sections/tech-stack'
import { CaseStudiesPreview }  from '@/components/sections/case-studies-preview'
import { ProcessSection }      from '@/components/sections/process-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { FAQSection }          from '@/components/sections/faq-section'
import { CTASection }          from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: "NexGen Technologies — India's Premier Digital Transformation Partner",
  description:
    'NexGen Technologies delivers AI, Cloud Computing, Software Development, Cybersecurity, and Digital Transformation solutions to 500+ enterprises across 25+ countries.',
}

export default function HomePage() {
  return (
    <>
      {/* Above/near the fold — rendered eagerly */}
      <HeroSection />
      <TrustBar />

      {/* Below the fold — content-visibility:auto defers their render work.
          WhyUs is intentionally NOT wrapped: it contains a lg:sticky column and
          the containment content-visibility introduces would break the sticky. */}
      <div className="cv-auto"><ServicesGrid /></div>
      <div className="cv-auto"><IndustriesSection /></div>
      <div className="cv-auto"><AIShowcase /></div>
      <WhyUs />
      <div className="cv-auto"><TechStack /></div>
      <div className="cv-auto"><CaseStudiesPreview /></div>
      <div className="cv-auto"><ProcessSection /></div>
      <div className="cv-auto"><TestimonialsSection /></div>
      <div className="cv-auto"><FAQSection /></div>
      <div className="cv-auto"><CTASection /></div>
    </>
  )
}
