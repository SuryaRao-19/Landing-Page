import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import { CTASection } from '@/components/sections/cta-section'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  return post ? { title: post.title, description: post.excerpt } : {}
}

const CATEGORY_COLORS: Record<string, string> = {
  AI: '#2563EB', Cloud: '#06B6D4', Cybersecurity: '#EF4444',
  DevOps: '#7C3AED', Software: '#10B981', 'UI/UX': '#F59E0B',
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3)
  const catColor = CATEGORY_COLORS[post.category] ?? '#2563EB'
  const initials = post.author.split(' ').map((n) => n[0]).join('')

  return (
    <>
      {/* Article Hero */}
      <section className="pt-36 pb-12 bg-[#F8FAFC] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25" aria-hidden />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%,${catColor}0C 0%,transparent 65%)` }}
          aria-hidden
        />

        <div className="container max-w-3xl relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#94A3B8] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#64748B] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#64748B] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#475569] font-medium truncate">{post.title.slice(0, 40)}…</span>
          </nav>

          {/* Category */}
          <span
            className="inline-block text-[11px] font-bold rounded-full px-3.5 py-1.5 text-white mb-5 shadow-sm"
            style={{ background: catColor }}
          >
            {post.category}
          </span>

          {/* Title */}
          <h1 className="font-extrabold text-[#0A0F1C] text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.12] tracking-tight mb-5">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Author */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shadow-sm"
                style={{ background: catColor }}
              >
                {initials}
              </div>
              <span className="text-sm font-medium text-[#334155]">{post.author}</span>
            </div>

            <div className="h-4 w-px bg-[#E2E8F0]" aria-hidden />

            <span className="flex items-center gap-1.5 text-[13px] text-[#94A3B8]">
              <Calendar size={13} />
              {formatDate(post.date)}
            </span>

            <span className="flex items-center gap-1.5 text-[13px] text-[#94A3B8]">
              <Clock size={13} />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="prose">
              <p className="lead text-[1.125rem] text-[#334155] leading-[1.8] font-medium mb-6">{post.excerpt}</p>

              <p>The enterprise technology landscape is evolving faster than ever. Organizations that recognize and act on emerging technology trends early will gain sustainable competitive advantages. This article explores the key dimensions of this transformation and provides actionable frameworks for enterprise leaders.</p>

              <h2>The Strategic Imperative</h2>
              <p>For Indian enterprises, the window to capture the full value of modern technology platforms is now. The combination of affordable cloud compute, accessible AI APIs, and maturing DevOps toolchains has created an unprecedented opportunity — but only for organizations willing to invest in building the right capabilities.</p>

              <h2>Key Implementation Considerations</h2>
              <p>Successful technology transformations share several common characteristics. First, they are business-outcomes-led, not technology-led. The question should always be &ldquo;what business problem are we solving?&rdquo; before &ldquo;what technology should we use?&rdquo;</p>

              <h2>Looking Ahead</h2>
              <p>The organizations that will thrive in the next decade are those investing today in the technical foundations — cloud architecture, data platforms, AI capabilities, and engineering culture — that will enable them to move fast as new opportunities emerge.</p>

              <p>At NexGen Technologies, we partner with enterprise leaders to navigate this complexity and deliver technology that creates lasting competitive advantage. If you would like to discuss how these trends apply to your specific business context, we would love to connect.</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-[#F1F5F9]">
              {[post.category, 'Enterprise Technology', 'Digital Transformation'].map((tag) => (
                <span key={tag} className="text-xs font-medium text-[#475569] bg-[#F1F5F9] border border-[#E2E8F0] px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Author card */}
            <div className="mt-8 p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
                style={{ background: catColor }}
              >
                {initials}
              </div>
              <div>
                <p className="font-bold text-[#0A0F1C] text-[.9375rem]">{post.author}</p>
                <p className="text-sm text-[#64748B] mt-0.5">Senior Technology Advisor at NexGen Technologies</p>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:gap-3 transition-all"
              >
                <ArrowLeft size={14} /> Back to all articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-sm bg-[#F8FAFC]">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold text-[#0A0F1C] text-lg">Related Articles</h2>
              <Link href="/blog" className="text-sm font-semibold text-[#2563EB] flex items-center gap-1 hover:gap-2 transition-all">
                All posts <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                  <div className="bg-white border border-[#E2E8F0] rounded-[18px] p-5 hover:shadow-[0_8px_32px_rgba(0,0,0,.07)] hover:-translate-y-0.5 hover:border-[#CBD5E1] transition-all duration-300">
                    <span
                      className="text-[10px] font-bold rounded-full px-2.5 py-1 text-white"
                      style={{ background: CATEGORY_COLORS[r.category] ?? '#2563EB' }}
                    >
                      {r.category}
                    </span>
                    <h3 className="font-semibold text-[#0A0F1C] text-[.875rem] mt-3 mb-2 leading-snug group-hover:text-[#2563EB] transition-colors line-clamp-2">
                      {r.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] flex items-center gap-1"><Clock size={11} />{r.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}
