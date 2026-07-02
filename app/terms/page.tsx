import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: "NexGen Technologies' terms of service governing use of our website and engagement of our services.",
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Terms governing use of our website and engagement of our services."
        breadcrumbs={[{ label: 'Terms of Service' }]}
        size="sm"
      />

      <section className="section bg-white">
        <div className="container max-w-3xl">
          <p className="text-[#64748B] text-sm mb-10">Last updated: 1 January 2025</p>
          <div className="space-y-8 text-[#475569] leading-relaxed">
            {[
              ['1. Acceptance of Terms', 'By accessing or using the NexGen Technologies website or services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.'],
              ['2. Use of Website', 'The content on this website is for general informational purposes only. NexGen reserves the right to modify or discontinue the website at any time without notice. We are not responsible for any losses resulting from reliance on information provided on this site.'],
              ['3. Intellectual Property', 'All content on this website, including text, graphics, logos, images, and software, is the property of NexGen Technologies Pvt. Ltd. and is protected by applicable intellectual property laws. Unauthorized use is prohibited.'],
              ['4. Services & Engagements', 'Professional services provided by NexGen are governed by separate Master Services Agreements (MSA) and Statements of Work (SOW) executed between NexGen and the client. In the event of any conflict between these Terms and an executed MSA, the MSA shall prevail.'],
              ['5. Limitation of Liability', 'To the maximum extent permitted by law, NexGen Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.'],
              ['6. Governing Law', 'These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka, India.'],
              ['7. Contact', 'For questions about these Terms of Service, please contact legal@nexgentech.in.'],
            ].map(([title, content]) => (
              <div key={title as string}>
                <h2 className="font-bold text-[#0A0F1C] text-xl mb-2">{title as string}</h2>
                <p>{content as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
