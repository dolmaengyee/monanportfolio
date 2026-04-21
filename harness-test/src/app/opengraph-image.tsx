import { ImageResponse } from 'next/og'
import { testConfig } from '@/data/config'

export const alt = testConfig.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          background: 'radial-gradient(circle at 30% 20%, #3B1C6E 0%, #1A1033 50%, #0F0B1A 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            marginBottom: 36,
            fontSize: 26,
            color: '#C4B5FD',
            letterSpacing: '0.02em',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(167, 139, 250, 0.18)',
              border: '1px solid rgba(167, 139, 250, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              color: '#A78BFA',
            }}
          >
            ✦
          </div>
          <span>{testConfig.shareHashtag.replace('#', '')}</span>
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            maxWidth: 1000,
            background: 'linear-gradient(to bottom, #FFFFFF, #C4B5FD)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {testConfig.title}
        </div>
        <div
          style={{
            fontSize: 32,
            marginTop: 32,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: 900,
            letterSpacing: '-0.01em',
          }}
        >
          {testConfig.subtitle}
        </div>
      </div>
    ),
    { ...size }
  )
}
