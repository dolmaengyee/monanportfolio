import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/data'

export const alt = siteConfig.name
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
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #082F49 0%, #0C4A6E 50%, #0EA5E9 100%)',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 32,
            fontSize: 28,
            opacity: 0.85,
            letterSpacing: '-0.02em',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            ↗
          </div>
          <span>{siteConfig.name}</span>
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: 960,
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    { ...size }
  )
}
