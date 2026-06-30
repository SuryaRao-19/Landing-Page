import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "NexGen Technologies' privacy policy — how we collect, use, and protect your personal data.",
}

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: 'We collect information you provide directly, such as when you fill out our contact form, subscribe to our newsletter, or engage our services. This may include your name, email address, phone number, company name, and any information you include in your message. We also collect certain technical information automatically, such as your IP address, browser type, and pages visited on our website.',
  },
  {
    title: '2. How We Use Your Information',
    content: 'We use the information we collect to respond to your enquiries, provide our services, send relevant communications, improve our website and offerings, comply with legal obligations, and protect our legitimate business interests. We do not sell, rent, or share your personal information with third parties for their marketing purposes.',
  },
  {
    title: '3. Data Storage & Security',
    content: 'Your data is stored on secure servers in India and, where necessary for our service delivery, in cloud environments that meet international security standards including ISO 27001. We implement technical and organisational measures appropriate to the risk, including encryption at rest and in transit, access controls, and regular security assessments.',
  },
  {
    title: '4. Your Rights',
    content: 'Under applicable data protection laws including the Digital Personal Data Protection Act 2023 (India) and GDPR (where applicable), you have the right to access, rectify, erase, or port your personal data. You may also object to or restrict certain processing. To exercise these rights, please contact our Data Protection Officer at privacy@nexgentech.in.',
  },
  {
    title: '5. Cookies',
    content: 'We use essential cookies necessary for our website to function, as well as analytics cookies to understand how visitors use our website. You can manage cookie preferences through our Cookie Settings page. We do not use advertising or tracking cookies.',
  },
  {
    title: '6. Contact Us',
    content: 'If you have questions about this privacy policy or our data practices, please contact our Data Protection Officer at privacy@nexgentech.in or by post to: Data Protection Officer, NexGen Technologies Pvt. Ltd., Prestige Tech Park, Outer Ring Road, Bengaluru — 560103, Karnataka, India.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-36 pb-20">
      <div className="container max-w-3xl">
        <h1 className="font-extrabold text-slate-900 text-4xl mb-3 tracking-tight">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-10">Last updated: 1 January 2025 · Effective date: 1 January 2025</p>

        <div className="prose prose-slate max-w-none space-y-10">
          <p className="text-slate-600 leading-relaxed">
            NexGen Technologies Pvt. Ltd. (&ldquo;NexGen&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your personal data and your privacy. This policy explains how we collect, use, store, and protect your information when you visit our website or engage our services.
          </p>
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-bold text-slate-900 text-xl mb-3">{section.title}</h2>
              <p className="text-slate-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
