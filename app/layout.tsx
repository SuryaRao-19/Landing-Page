import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://nexgentech.in'),
  title: {
    default: "NexGen Technologies — India's Premier Digital Transformation Partner",
    template: '%s | NexGen Technologies',
  },
  description:
    'NexGen Technologies delivers AI, Cloud, Software Development, Cybersecurity, DevOps, and Digital Transformation solutions to 500+ enterprises across India and 25+ countries.',
  keywords: ['IT company India', 'digital transformation', 'AI solutions', 'cloud computing', 'software development', 'Bengaluru IT company'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://nexgentech.in',
    siteName: 'NexGen Technologies',
    title: 'NexGen Technologies — Transforming Businesses Through Intelligent Technology',
    description: 'Premier Indian IT company delivering AI, Cloud, Software, and Digital Transformation solutions globally.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NexGen Technologies' }],
  },
  twitter: { card: 'summary_large_image', site: '@NexGenTechIN' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'NexGen Technologies',
              url: 'https://nexgentech.in',
              description: "India's premier digital transformation and enterprise technology partner.",
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Prestige Tech Park, Outer Ring Road',
                addressLocality: 'Bengaluru',
                addressRegion: 'Karnataka',
                postalCode: '560103',
                addressCountry: 'IN',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-80-4567-8900',
                contactType: 'customer service',
              },
            }),
          }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
