import type { TemplateProps } from './types';
import { sampleContent } from './sampleContent';

export default function Minimal({ businessName, tagline, heroImage, palette, fontPairing }: TemplateProps) {
  const headingStyle = { fontFamily: `${fontPairing.heading}, serif` };
  const bodyStyle = { fontFamily: `${fontPairing.body}, sans-serif` };
  const { menuItems, testimonials, hours, address, phone } = sampleContent;
  const featured = testimonials[0];

  return (
    <div style={{ ...bodyStyle, backgroundColor: '#fafafa', color: '#1a1a1a', padding: '3rem 2.5rem', textAlign: 'center' }}>
      {/* Business name */}
      <h2 style={{ ...headingStyle, fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#1a1a1a', marginBottom: 18 }}>
        {businessName}
      </h2>

      {/* Thin accent rule */}
      <div style={{ width: 60, height: 1, backgroundColor: palette.accent, margin: '0 auto 18px' }} />

      {/* Tagline */}
      <p style={{ ...headingStyle, fontSize: 15, lineHeight: 1.7, color: '#555', maxWidth: 380, margin: '0 auto 32px', fontStyle: 'italic', letterSpacing: '0.01em' }}>
        {tagline}
      </p>

      {/* Hero image */}
      {heroImage ? (
        <img
          src={heroImage}
          alt="Storefront"
          style={{ width: '100%', maxWidth: 420, height: 200, objectFit: 'cover', borderRadius: 12, marginBottom: 40, display: 'block', marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
        />
      ) : (
        <img
          src="https://picsum.photos/seed/storefront-hero/1200/600"
          alt="Cafe"
          loading="lazy"
          style={{ width: '100%', maxWidth: 420, height: 200, objectFit: 'cover', borderRadius: 12, marginBottom: 40, display: 'block', marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
        />
      )}

      {/* Featured menu items */}
      <div style={{ maxWidth: 440, margin: '0 auto 44px' }}>
        <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#999', marginBottom: 22 }}>
          Featured
        </div>
        {menuItems.slice(0, 3).map((item, i) => (
          <div
            key={item.name}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              padding: '14px 0',
              borderBottom: i < 2 ? '1px solid #e8e8e8' : 'none',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ ...headingStyle, fontWeight: 700, fontSize: 15, color: '#1a1a1a', marginBottom: 3 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{item.desc}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: palette.accent, flexShrink: 0, marginLeft: 16 }}>{item.price}</div>
          </div>
        ))}
      </div>

      {/* Featured testimonial */}
      <div style={{ maxWidth: 400, margin: '0 auto 44px', padding: '28px 0' }}>
        <div style={{ fontSize: 42, color: palette.accent, lineHeight: 1, marginBottom: 12, fontFamily: 'Georgia, serif' }}>"</div>
        <p style={{ ...headingStyle, fontSize: 16, lineHeight: 1.7, color: '#333', fontStyle: 'italic', marginBottom: 16 }}>
          {featured.text}
        </p>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#888', letterSpacing: 1, textTransform: 'uppercase' }}>
          {featured.name}
        </div>
      </div>

      {/* Minimal footer */}
      <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: 24 }}>
        <div style={{ fontSize: 12, color: '#aaa', marginBottom: 6 }}>{address}</div>
        <div style={{ fontSize: 12, color: '#aaa', marginBottom: 6 }}>
          {hours[0].day}: {hours[0].time} &nbsp;|&nbsp; {hours[1].day}: {hours[1].time}
        </div>
        <div style={{ fontSize: 12, color: '#aaa' }}>{phone}</div>
      </div>
    </div>
  );
}
