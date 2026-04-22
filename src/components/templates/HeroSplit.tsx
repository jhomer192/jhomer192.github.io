import type { TemplateProps } from './types';
import { sampleContent } from './sampleContent';
import Stars from './Stars';

export default function HeroSplit({ businessName, tagline, heroImage, palette, fontPairing }: TemplateProps) {
  const headingStyle = { fontFamily: `${fontPairing.heading}, serif` };
  const { services, testimonials, hours, phone } = sampleContent;

  return (
    <div style={{ fontFamily: `${fontPairing.body}, sans-serif`, backgroundColor: palette.bg, color: palette.text }}>
      {/* Hero row */}
      <div style={{ display: 'flex', minHeight: 340 }}>
        {/* Left: text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem 2rem', minWidth: 0 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.5, marginBottom: 12 }}>
            Est. 2019
          </div>
          <h2 style={{ ...headingStyle, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 14, color: palette.text }}>
            {businessName}
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.75, marginBottom: 20, maxWidth: 280, color: palette.text }}>
            {tagline}
          </p>
          <a
            href="#"
            style={{ display: 'inline-block', backgroundColor: palette.accent, color: '#fff', padding: '10px 22px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', width: 'fit-content', marginBottom: 20 }}
            onClick={(e) => e.preventDefault()}
          >
            View Menu
          </a>
          <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4 }}>
            Open today until 8:00 PM
          </div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>
            {phone}
          </div>
        </div>

        {/* Right: hero image */}
        <div style={{ flex: 1, minWidth: 0, position: 'relative', minHeight: 280 }}>
          {heroImage ? (
            <img src={heroImage} alt="Storefront" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <img
              src="https://picsum.photos/seed/storefront-hero/1200/600"
              alt="Cafe interior"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
        </div>
      </div>

      {/* Service cards */}
      <div style={{ backgroundColor: palette.surface, padding: '2rem' }}>
        <h3 style={{ ...headingStyle, fontSize: 16, fontWeight: 700, marginBottom: 16, color: palette.text, opacity: 0.9 }}>
          How We Can Help
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {services.slice(0, 3).map((s) => (
            <div
              key={s.title}
              style={{ backgroundColor: palette.bg, borderRadius: 10, padding: '16px 14px', borderTop: `3px solid ${palette.accent}` }}
            >
              <div style={{ ...headingStyle, fontWeight: 700, fontSize: 14, marginBottom: 6, color: palette.text }}>{s.title}</div>
              <div style={{ fontSize: 12, lineHeight: 1.55, color: palette.textMuted }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial strip */}
      <div style={{ padding: '1.75rem 2rem', borderTop: `1px solid ${palette.surface}` }}>
        <h3 style={{ ...headingStyle, fontSize: 15, fontWeight: 700, marginBottom: 14, color: palette.text, opacity: 0.85 }}>
          What Guests Are Saying
        </h3>
        <div style={{ display: 'flex', gap: 14 }}>
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{ flex: 1, backgroundColor: palette.surface, borderRadius: 10, padding: '14px 12px' }}
            >
              <Stars count={t.stars} />
              <p style={{ fontSize: 12, lineHeight: 1.55, color: palette.textMuted, margin: '8px 0 8px', fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ fontSize: 11, fontWeight: 600, color: palette.text, opacity: 0.7 }}>{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
