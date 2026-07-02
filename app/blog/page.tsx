import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, User, ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/data'
import { PageHero } from '@/components/shared/page-hero'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog — Technology Insights & Enterprise Perspectives',
  description: "Stay ahead with NexGen's expert insights on AI, cloud computing, cybersecurity, DevOps, software development, and UI/UX design.",
}

const CATEGORY_COLORS: Record<string, string> = {
  AI: '#2563EB', Cloud: '#06B6D4', Cybersecurity: '#EF4444',
  DevOps: '#7C3AED', Software: '#10B981', 'UI/UX': '#F59E0B',
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog & Insights"
        title="Technology Perspectives for"
        highlight="Enterprise Leaders"
        subtitle="Expert insights on AI, cloud, cybersecurity, DevOps, and digital transformation from the NexGen team."
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_POSTS.map((post, i) => {
              const color = CATEGORY_COLORS[post.category] ?? '#2563EB'
              const isFeature = i === 0
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`group block ${isFeature ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  <article className="h-full bg-white border border-[#E2E8F0] rounded-[20px] overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,.09)] hover:border-[#CBD5E1] hover:-translate-y-1 transition-all duration-300">
                    {/* Color header */}
                    <div
                      className="h-40 relative flex items-end p-5"
                      style={{ background: `linear-gradient(160deg,${color}18,${color}06)` }}
                    >
                      <div
                        className="absolute top-4 right-4 w-8 h-8 rounded-xl opacity-10"
                        style={{ background: color }}
                        aria-hidden
                      />
                      <span
                        className="text-[11px] font-bold rounded-full px-3 py-1.5 text-white shadow-sm"
                        style={{ background: color }}
                      >
                        {post.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h2 className="font-bold text-[#0A0F1C] text-[.9375rem] leading-snug mb-2.5 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[#64748B] leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold"
                            style={{ background: color }}
                          >
                            {post.author.charAt(0)}
                          </div>
                          <span className="text-xs text-[#64748B] font-medium truncate max-w-[100px]">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
                          <Clock size={11} />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
