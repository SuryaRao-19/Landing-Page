import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, User, ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/data'
import { SectionHeader } from '@/components/shared/section-header'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog — Technology Insights & Enterprise Perspectives',
  description: 'Stay ahead with NexGen\'s expert insights on AI, cloud computing, cybersecurity, DevOps, software development, and UI/UX design.',
}

const CATEGORIES = ['All', 'AI', 'Cloud', 'Cybersecurity', 'DevOps', 'Software', 'UI/UX']

const CATEGORY_COLORS: Record<string, string> = {
  AI: '#1B4FD8', Cloud: '#06B6D4', Cybersecurity: '#EF4444',
  DevOps: '#2563EB', Software: '#10B981', 'UI/UX': '#7C3AED',
}

export default function BlogPage() {
  return (
    <>
      <section
        className="pt-36 pb-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg,#F8FAFC 0%,#EEF2FF 100%)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
        <div className="container relative z-10 text-center">
          <SectionHeader
            label="Blog & Insights"
            title="Technology Perspectives for"
            highlight="Enterprise Leaders"
            subtitle="Expert insights on AI, cloud, cybersecurity, DevOps, and digital transformation from the NexGen team."
            center
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-600 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Posts grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="h-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                  {/* Category color bar */}
                  <div
                    className="h-44 flex items-end p-5"
                    style={{ background: `linear-gradient(160deg, ${CATEGORY_COLORS[post.category] ?? '#1B4FD8'}22, ${CATEGORY_COLORS[post.category] ?? '#1B4FD8'}08)` }}
                  >
                    <span
                      className="text-xs font-bold rounded-full px-3 py-1 text-white"
                      style={{ background: CATEGORY_COLORS[post.category] ?? '#1B4FD8' }}
                    >
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h2 className="font-bold text-slate-900 text-base leading-snug mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1"><User size={12} />{post.author}</span>
                      <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">{formatDate(post.date)}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
