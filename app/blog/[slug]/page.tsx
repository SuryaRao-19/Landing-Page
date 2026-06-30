import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react'
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

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3)

  return (
    <>
      <section className="pt-36 pb-10 bg-slate-50">
        <div className="container max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-8 transition-colors">
            <ArrowLeft size={14} /> All Posts
          </Link>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 rounded-full px-3 py-1">{post.category}</span>
          <h1 className="font-extrabold text-slate-900 text-3xl sm:text-4xl mt-5 mb-4 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <div className="prose prose-slate prose-lg max-w-none">
            <p className="lead">{post.excerpt}</p>
            <p>The enterprise technology landscape is evolving faster than ever. Organizations that recognize and act on emerging technology trends early will gain sustainable competitive advantages. This article explores the key dimensions of this transformation and provides actionable frameworks for enterprise leaders.</p>
            <h2>The Strategic Imperative</h2>
            <p>For Indian enterprises, the window to capture the full value of modern technology platforms is now. The combination of affordable cloud compute, accessible AI APIs, and maturing DevOps toolchains has created an unprecedented opportunity — but only for organizations willing to invest in building the right capabilities.</p>
            <h2>Key Implementation Considerations</h2>
            <p>Successful technology transformations share several common characteristics. First, they are business-outcomes-led, not technology-led. The question should always be &ldquo;what business problem are we solving?&rdquo; before &ldquo;what technology should we use?&rdquo;</p>
            <h2>Looking Ahead</h2>
            <p>The organizations that will thrive in the next decade are those investing today in the technical foundations — cloud architecture, data platforms, AI capabilities, and engineering culture — that will enable them to move fast as new opportunities emerge.</p>
            <p>At NexGen Technologies, we partner with enterprise leaders to navigate this complexity and deliver technology that creates lasting competitive advantage. If you would like to discuss how these trends apply to your specific business context, we would love to connect.</p>
          </div>

          {/* Author box */}
          <div className="mt-10 p-6 bg-slate-50 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
              {post.author.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <p className="font-bold text-slate-900">{post.author}</p>
              <p className="text-sm text-slate-500">Senior Technology Advisor at NexGen Technologies</p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-slate-50">
          <div className="container max-w-4xl">
            <h2 className="font-bold text-slate-900 text-xl mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <span className="text-xs font-bold text-blue-600">{r.category}</span>
                    <h3 className="font-bold text-slate-900 text-sm mt-2 mb-2 leading-snug group-hover:text-blue-700 transition-colors">{r.title}</h3>
                    <p className="text-xs text-slate-400">{r.readTime}</p>
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
