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
          background: 'linear-gradient(135deg, #020617 0%, #0F172A 60%, #134E4A 100%)',
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
            opacity: 0.9,
            letterSpacing: '-0.02em',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: '#14B8A6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              fontWeight: 700,
              color: '#022C22',
            }}
          >
            ◆
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
        <div
          style={{
            marginTop: 40,
            fontSize: 26,
            color: '#5EEAD4',
            letterSpacing: '-0.01em',
          }}
        >
          {siteConfig.name}
        </div>
      </div>
    ),
    { ...size }
  )
}
