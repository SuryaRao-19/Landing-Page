import type { Metadata } from 'next'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Internship Program — NexGen Technologies',
  description: 'Launch your technology career with NexGen\'s structured internship program. Work on real enterprise projects alongside world-class engineers.',
}

const TRACKS = [
  { title: 'Software Engineering', icon: '💻', duration: '3–6 months', skills: ['React / Next.js', 'Node.js / Python', 'Database design', 'Code reviews'] },
  { title: 'AI & Data Science', icon: '🧠', duration: '3–6 months', skills: ['Python & ML libraries', 'Model training & evaluation', 'Data pipelines', 'Research papers'] },
  { title: 'Cloud & DevOps', icon: '☁️', duration: '3–6 months', skills: ['AWS / Azure basics', 'Docker & Kubernetes', 'CI/CD pipelines', 'Infrastructure as Code'] },
  { title: 'UI/UX Design', icon: '🎨', duration: '3–6 months', skills: ['Figma & design systems', 'User research', 'Prototyping', 'Accessibility'] },
  { title: 'Cybersecurity', icon: '🔒', duration: '3–6 months', skills: ['Security fundamentals', 'VAPT basics', 'Compliance frameworks', 'Threat modeling'] },
]

export default function InternshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Internship Program"
        title="Launch Your Career at"
        highlight="NexGen"
        subtitle="Work on real enterprise projects. Get mentored by senior engineers. Build skills that matter. Our 3–6 month structured internship program is designed to launch exceptional careers in technology."
        breadcrumbs={[{ label: 'Careers', href: '/careers' }, { label: 'Internships' }]}
      />

      {/* Tracks */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12"><div className="pill mx-auto w-fit mb-5">Programs</div><h2 className="display-md text-[#0A0F1C]">Choose Your <span className="text-grad">Track</span></h2></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRACKS.map((track) => (
              <div key={track.title} className="bg-white border border-[#E2E8F0] rounded-[20px] p-6 hover:shadow-[0_12px_40px_rgba(0,0,0,.09)] hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-4">{track.icon}</div>
                <h3 className="font-bold text-[#0A0F1C] text-lg mb-1">{track.title}</h3>
                <p className="text-sm text-teal-600 font-medium mb-4">{track.duration}</p>
                <ul className="space-y-2">
                  {track.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" aria-hidden />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="section bg-[#F8FAFC]">
        <div className="container max-w-3xl">
          <div className="text-center mb-10"><div className="pill mx-auto w-fit mb-5">Benefits</div><h2 className="display-md text-[#0A0F1C]">What You&apos;ll <span className="text-grad">Gain</span></h2></div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Stipend of ₹20,000–40,000/month depending on track',
              'Dedicated senior mentor for the full duration',
              'Real project ownership — not just ticket work',
              'Weekly learning sessions and tech talks',
              'Pre-placement offer for top performers',
              'Certificate of completion and LinkedIn recommendation',
              'Access to our internal learning platform',
              'Networking with 150+ senior engineers and clients',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#E2E8F0]">
                <span className="text-teal-500 mt-0.5 shrink-0">✓</span>
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
