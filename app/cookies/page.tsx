import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: "NexGen Technologies' cookie policy — the types of cookies we use and how to manage your preferences.",
}

export default function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookie Policy"
        subtitle="The types of cookies we use and how to manage your preferences."
        breadcrumbs={[{ label: 'Cookie Policy' }]}
        size="sm"
      />

      <section className="section bg-white">
        <div className="container max-w-3xl">
          <p className="text-[#64748B] text-sm mb-10">Last updated: 1 January 2025</p>
          <div className="space-y-8 text-[#475569] leading-relaxed">
            <p>This Cookie Policy explains how NexGen Technologies Pvt. Ltd. uses cookies and similar tracking technologies on our website.</p>
            {[
              ['What Are Cookies?', 'Cookies are small text files stored on your browser when you visit a website. They help the website remember information about your visit, making subsequent visits easier and more useful.'],
              ['Cookies We Use', 'We use three categories of cookies: (1) Essential Cookies — required for the website to function correctly, such as session management and security; (2) Analytics Cookies — help us understand how visitors use our website so we can improve it; (3) Preference Cookies — remember your preferences such as language and region settings.'],
              ['Third-Party Cookies', "We use Google Analytics to understand website usage patterns. Google may set its own cookies subject to Google's privacy policy. We do not use advertising or social media tracking cookies."],
              ['Managing Cookies', 'You can manage or disable cookies through your browser settings. Please note that disabling essential cookies may prevent the website from functioning correctly. You can also manage your preferences through our Cookie Settings panel available in the website footer.'],
              ['Contact', 'For questions about our cookie practices, please contact privacy@nexgentech.in.'],
            ].map(([t, c]) => (
              <div key={t as string}>
                <h2 className="font-bold text-[#0A0F1C] text-xl mb-2">{t as string}</h2>
                <p>{c as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
