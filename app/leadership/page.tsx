import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { TEAM_MEMBERS } from '@/lib/data'
import { PageHero } from '@/components/shared/page-hero'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Leadership — Meet Our Executive Team',
  description: 'Meet the experienced leaders who guide NexGen Technologies — a team of industry veterans with decades of enterprise technology experience.',
}

const AVATAR_COLORS = ['#1B4FD8','#0D9488','#7C3AED','#EF4444','#F97316','#2563EB']

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="The Team Driving"
        highlight="Innovation & Growth"
        subtitle="Meet the senior executives and practice leaders who bring decades of enterprise technology experience to every client engagement."
        breadcrumbs={[{ label: 'Leadership' }]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <article key={member.name} className="bg-white border border-[#E2E8F0] rounded-[20px] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,.09)] hover:-translate-y-1 transition-all duration-300">
                {/* Avatar header */}
                <div
                  className="h-32 flex items-center justify-center"
                  style={{ background: `${AVATAR_COLORS[i % AVATAR_COLORS.length]}15` }}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-extrabold"
                    style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                    aria-hidden
                  >
                    {member.avatar}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-bold text-[#0A0F1C] text-lg">{member.name}</h2>
                  <p className="text-[#2563EB] text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-4">{member.bio}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      aria-label={`${member.name} on LinkedIn`}
                      className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#2563EB] transition-colors"
                    >
                      <ExternalLink size={14} /> View Profile
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
