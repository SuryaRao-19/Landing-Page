import type { Metadata } from 'next'
import { ContactForm } from './contact-form'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
import { FAQSection } from '@/components/sections/faq-section'

export const metadata: Metadata = {
  title: 'Contact Us — Get in Touch',
  description: "Contact NexGen Technologies for a free consultation. Reach us by phone, email, WhatsApp, or fill out our form and we'll respond within 24 hours.",
}

const OFFICES = [
  { city: 'Bengaluru (HQ)', address: 'Prestige Tech Park, Outer Ring Road, Bengaluru — 560103', phone: '+91 80 4567 8900' },
  { city: 'Mumbai',         address: 'Bandra Kurla Complex, Bandra East, Mumbai — 400051',        phone: '+91 22 6789 0123' },
  { city: 'Hyderabad',      address: 'HITEC City, Madhapur, Hyderabad — 500081',                   phone: '+91 40 2345 6789' },
  { city: 'Dubai (MENA)',   address: 'Dubai Silicon Oasis, Dubai, UAE',                             phone: '+971 4 123 4567' },
]

export default function ContactPage() {
  return (
    <>
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#F8FAFC 0%,#EEF2FF 100%)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="container relative z-10 text-center">
          <SectionHeader
            label="Get In Touch"
            title="Let's Start a"
            highlight="Conversation"
            subtitle="Tell us about your project or challenge. We'll respond within 24 hours with initial thoughts and a proposal to schedule a deeper discussion."
            center
          />
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <a href="mailto:hello@nexgentech.in" className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
              <Mail size={16} className="text-blue-500" /> hello@nexgentech.in
            </a>
            <a href="tel:+918045678900" className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
              <Phone size={16} className="text-blue-500" /> +91 80 4567 8900
            </a>
            <a href="https://wa.me/918045678900" className="flex items-center gap-2 text-sm text-slate-600 hover:text-green-600 transition-colors">
              <MessageCircle size={16} className="text-green-500" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                <h2 className="font-bold text-slate-900 text-xl mb-2">Send Us a Message</h2>
                <p className="text-slate-500 text-sm mb-8">We typically respond within 24 business hours. All enquiries are treated with strict confidentiality.</p>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2 space-y-6">
              {/* Offices */}
              <div className="bg-slate-50 rounded-3xl p-6">
                <h3 className="font-bold text-slate-900 mb-5">Our Offices</h3>
                <div className="space-y-5">
                  {OFFICES.map((office) => (
                    <div key={office.city} className="flex gap-3">
                      <MapPin size={16} className="text-blue-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{office.city}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{office.address}</p>
                        <a href={`tel:${office.phone.replace(/\s/g,'')}`} className="text-xs text-blue-600 hover:text-blue-800 mt-1 block">{office.phone}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="rounded-3xl overflow-hidden h-56 flex items-center justify-center bg-slate-100 border border-slate-200"
                aria-label="Map showing office location in Bengaluru"
                role="img"
              >
                <div className="text-center">
                  <MapPin size={32} className="text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">Prestige Tech Park</p>
                  <p className="text-xs text-slate-300">Bengaluru, Karnataka</p>
                </div>
              </div>

              {/* Quick contact chips */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://wa.me/918045678900"
                  className="flex flex-col items-center gap-2 bg-green-50 border border-green-100 rounded-2xl p-4 hover:bg-green-100 transition-colors text-center"
                >
                  <MessageCircle size={20} className="text-green-600" />
                  <span className="text-xs font-semibold text-green-700">WhatsApp</span>
                </a>
                <a
                  href="mailto:hello@nexgentech.in"
                  className="flex flex-col items-center gap-2 bg-blue-50 border border-blue-100 rounded-2xl p-4 hover:bg-blue-100 transition-colors text-center"
                >
                  <Mail size={20} className="text-blue-600" />
                  <span className="text-xs font-semibold text-blue-700">Email</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  )
}
