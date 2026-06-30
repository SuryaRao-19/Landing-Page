import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: "NexGen Technologies' cookie policy — the types of cookies we use and how to manage your preferences.",
}

export default function CookiesPage() {
  return (
    <div className="pt-36 pb-20">
      <div className="container max-w-3xl">
        <h1 className="font-extrabold text-slate-900 text-4xl mb-3 tracking-tight">Cookie Policy</h1>
        <p className="text-slate-500 text-sm mb-10">Last updated: 1 January 2025</p>
        <div className="space-y-8 text-slate-600 leading-relaxed">
          <p>This Cookie Policy explains how NexGen Technologies Pvt. Ltd. uses cookies and similar tracking technologies on our website.</p>
          {[
            ['What Are Cookies?', 'Cookies are small text files stored on your browser when you visit a website. They help the website remember information about your visit, making subsequent visits easier and more useful.'],
            ['Cookies We Use', 'We use three categories of cookies: (1) Essential Cookies — required for the website to function correctly, such as session management and security; (2) Analytics Cookies — help us understand how visitors use our website so we can improve it; (3) Preference Cookies — remember your preferences such as language and region settings.'],
            ['Third-Party Cookies', 'We use Google Analytics to understand website usage patterns. Google may set its own cookies subject to Google\'s privacy policy. We do not use advertising or social media tracking cookies.'],
            ['Managing Cookies', 'You can manage or disable cookies through your browser settings. Please note that disabling essential cookies may prevent the website from functioning correctly. You can also manage your preferences through our Cookie Settings panel available in the website footer.'],
            ['Contact', 'For questions about our cookie practices, please contact privacy@nexgentech.in.'],
          ].map(([t, c]) => (
            <div key={t as string}>
              <h2 className="font-bold text-slate-900 text-xl mb-2">{t as string}</h2>
              <p>{c as string}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
