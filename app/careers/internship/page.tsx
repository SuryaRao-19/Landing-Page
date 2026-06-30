import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, GraduationCap } from 'lucide-react'
import { SectionHeader } from '@/components/shared/section-header'
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
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#F8FAFC 0%,#F0FDF4 100%)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 border border-teal-100 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-6">
            <GraduationCap size={14} /> Internship Program
          </div>
          <h1 className="font-extrabold text-slate-900 text-4xl sm:text-5xl mb-5 leading-tight tracking-tight">
            Launch Your Career at <span className="text-grad">NexGen</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Work on real enterprise projects. Get mentored by senior engineers. Build skills that matter. Our 3–6 month structured internship program is designed to launch exceptional careers in technology.
          </p>
        </div>
      </section>

      {/* Tracks */}
      <section className="section">
        <div className="container">
          <SectionHeader label="Programs" title="Choose Your" highlight="Track" center className="mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRACKS.map((track) => (
              <div key={track.title} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-3xl mb-4">{track.icon}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">{track.title}</h3>
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
      <section className="section bg-slate-50">
        <div className="container max-w-3xl">
          <SectionHeader label="Benefits" title="What You'll" highlight="Gain" center className="mb-10" />
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
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                <span className="text-teal-500 mt-0.5 shrink-0">✓</span>
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Apply for the Internship Program" subtitle="Applications are reviewed on a rolling basis. Submit your CV and a brief note on which track interests you and why." />
    </>
  )
}
