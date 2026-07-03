import type { Metadata } from 'next'
import { ContactForm } from './contact-form'
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react'
import { PageHero } from '@/components/shared/page-hero'
import { FAQSection } from '@/components/sections/faq-section'

export const metadata: Metadata = {
  title: 'Contact Us — Get in Touch',
  description: "Contact NexGen Technologies for a free consultation. Reach us by phone, email, or fill out our form and we'll respond within 2 business hours.",
}

const OFFICES = [
  { city: 'Bengaluru (HQ)', address: 'Prestige Tech Park, Outer Ring Road, Bengaluru — 560103', phone: '+91 80 4567 8900' },
  { city: 'Mumbai',         address: 'Bandra Kurla Complex, Bandra East, Mumbai — 400051',        phone: '+91 22 6789 0123' },
  { city: 'Hyderabad',      address: 'HITEC City, Madhapur, Hyderabad — 500081',                   phone: '+91 40 2345 6789' },
  { city: 'Dubai (MENA)',   address: 'Dubai Silicon Oasis, Dubai, UAE',                             phone: '+971 4 123 4567' },
]

const QUICK_LINKS = [
  { icon: MessageCircle, label: 'WhatsApp',   sub: 'Instant reply',   href: 'https://wa.me/918045678900', color: '#10B981', bg: '#F0FDF4', border: '#D1FAE5' },
  { icon: Mail,          label: 'Email',      sub: '2-hour response', href: 'mailto:hello@nexgentech.in', color: '#2563EB', bg: '#EFF6FF', border: '#DBEAFE' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's Start a"
        highlight="Conversation"
        subtitle="Tell us about your project. We respond within 2 business hours with initial thoughts and a proposal for a deeper discussion."
        breadcrumbs={[{ label: 'Contact' }]}
      >
        {/* Quick contact row */}
        <div className="flex flex-wrap justify-center gap-5">
          <a href="mailto:hello@nexgentech.in" className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#2563EB] transition-colors">
            <Mail size={15} className="text-[#2563EB]" /> hello@nexgentech.in
          </a>
          <a href="tel:+918045678900" className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#2563EB] transition-colors">
            <Phone size={15} className="text-[#2563EB]" /> +91 80 4567 8900
          </a>
          <a href="https://wa.me/918045678900" className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#10B981] transition-colors">
            <MessageCircle size={15} className="text-[#10B981]" /> WhatsApp Us
          </a>
        </div>
      </PageHero>

      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10 xl:gap-14">

            {/* ── Form ─── */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-7 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,.05)]">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h2 className="font-extrabold text-[#0A0F1C] text-xl tracking-tight">Send Us a Message</h2>
                    <p className="text-sm text-[#64748B] mt-1">All enquiries treated with strict confidentiality.</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Team online now
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>

            {/* ── Sidebar ─── */}
            <aside className="lg:col-span-2 space-y-5">
              {/* Response time promise */}
              <div className="bg-[#0A0F1C] rounded-[20px] p-6">
                <Clock size={18} className="text-[#60A5FA] mb-3" />
                <p className="font-bold text-white text-[.9375rem] mb-1.5">We respond fast</p>
                <div className="space-y-2">
                  {[
                    ['Business hours', '< 2 hours'],
                    ['After hours',    '< 12 hours'],
                    ['Weekends',       '< 24 hours'],
                  ].map(([label, time]) => (
                    <div key={label} className="flex items-center justify-between text-xs">
                      <span className="text-white/50">{label}</span>
                      <span className="font-semibold text-white/80">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="grid grid-cols-2 gap-3">
                {QUICK_LINKS.map((q) => (
                  <a
                    key={q.label}
                    href={q.href}
                    target={q.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex flex-col gap-1.5 rounded-[16px] p-4 border transition-all hover:-translate-y-0.5 hover:shadow-md"
                    style={{ background: q.bg, borderColor: q.border }}
                  >
                    <q.icon size={18} style={{ color: q.color }} />
                    <p className="font-bold text-sm text-[#0A0F1C]">{q.label}</p>
                    <p className="text-[11px] text-[#475569]">{q.sub}</p>
                  </a>
                ))}
              </div>

              {/* Offices */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] p-6">
                <p className="font-bold text-[#0A0F1C] text-[.875rem] mb-5">Our Offices</p>
                <div className="space-y-5">
                  {OFFICES.map((office) => (
                    <div key={office.city} className="flex gap-3">
                      <MapPin size={13} className="text-[#2563EB] mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-[#0A0F1C] text-xs">{office.city}</p>
                        <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">{office.address}</p>
                        <a
                          href={`tel:${office.phone.replace(/\s/g,'')}`}
                          className="text-[11px] text-[#2563EB] hover:text-[#1D4ED8] mt-1 block font-medium"
                        >
                          {office.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to expect */}
              <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-6">
                <p className="font-bold text-[#0A0F1C] text-[.875rem] mb-4">What happens next?</p>
                <div className="space-y-3">
                  {[
                    'We review your requirements',
                    'A senior architect reaches out',
                    'Free 60-min discovery call',
                    'Tailored proposal within 48h',
                  ].map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-[#2563EB]">{i + 1}</span>
                      </div>
                      <p className="text-[12.5px] text-[#475569]">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  )
}
