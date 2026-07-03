import { ImageResponse } from 'next/og'

// Branded Open Graph image, generated at build time (statically optimized).
// Replaces the previously-referenced /og-image.png which did not exist.
export const alt =
  'NexGen Technologies — Transforming Businesses Through Intelligent Technology'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          color: '#ffffff',
          backgroundColor: '#0A0F1C',
          backgroundImage:
            'radial-gradient(1100px 520px at 50% -10%, rgba(37,99,235,0.35), transparent 60%), radial-gradient(700px 400px at 100% 100%, rgba(124,58,237,0.22), transparent 60%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 18,
              backgroundColor: '#2563EB',
              boxShadow: '0 8px 30px rgba(37,99,235,0.5)',
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            N
          </div>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
            <span style={{ color: '#ffffff' }}>Nex</span>
            <span style={{ color: '#60A5FA' }}>Gen</span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            fontSize: 66,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 960,
          }}
        >
          Transforming Businesses Through Intelligent Technology
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 24,
          }}
        >
          <div style={{ display: 'flex', color: '#93C5FD', fontWeight: 700, letterSpacing: 2 }}>
            AI · CLOUD · SOFTWARE · CYBERSECURITY
          </div>
          <div style={{ display: 'flex', color: '#94A3B8' }}>nexgentech.in</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
