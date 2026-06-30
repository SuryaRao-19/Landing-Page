import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#F8FAFC 0%,#EEF2FF 100%)' }}
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="container relative z-10 text-center max-w-lg">
        <p
          className="font-extrabold text-slate-200 mb-6"
          style={{ fontSize: 'clamp(6rem, 20vw, 12rem)', lineHeight: 1, letterSpacing: '-4px' }}
          aria-hidden
        >
          404
        </p>
        <h1 className="font-extrabold text-slate-900 text-3xl mb-4 -mt-8">Page Not Found</h1>
        <p className="text-slate-500 mb-8">
          The page you&apos;re looking for has moved, been removed, or doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm"
          >
            <Home size={16} /> Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:border-blue-300 hover:text-blue-700 transition-colors text-sm"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
