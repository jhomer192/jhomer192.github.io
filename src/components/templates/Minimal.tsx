import type { TemplateProps } from './types';

export default function Minimal({ businessName, tagline, heroImage, palette, fontPairing }: TemplateProps) {
  const headingStyle = { fontFamily: `${fontPairing.heading}, serif` };

  return (
    <div style={{ fontFamily: `${fontPairing.body}, sans-serif`, backgroundColor: '#fafafa', color: '#1a1a1a', padding: '3rem 2.5rem', minHeight: 340, textAlign: 'center' }}>
      {/* Large name */}
      <h2 style={{ ...headingStyle, fontSize: 'clamp(2rem, 6vw, 3.25rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#1a1a1a', marginBottom: 20 }}>
        {businessName}
      </h2>

      {/* Thin rule */}
      <div style={{ width: 60, height: 1, backgroundColor: palette.accent, margin: '0 auto 20px' }} />

      {/* Tagline */}
      <p style={{ fontSize: 15, lineHeight: 1.7, color: '#555', maxWidth: 380, margin: '0 auto 32px', letterSpacing: '0.01em' }}>
        {tagline}
      </p>

      {/* Small hero image */}
      {heroImage ? (
        <img
          src={heroImage}
          alt="Storefront"
          style={{ width: '100%', maxWidth: 420, height: 180, objectFit: 'cover', borderRadius: 12, marginBottom: 32, display: 'block', marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 4px 24px rgba(0,0,0,0.10)' }}
        />
      ) : (
        <div style={{ width: '100%', maxWidth: 420, height: 180, backgroundColor: '#e8e8e8', borderRadius: 12, marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <span style={{ opacity: 0.35, fontSize: 13 }}>Your photo here</span>
        </div>
      )}

      {/* Floating CTA */}
      <a
        href="#"
        style={{
          display: 'inline-block',
          border: `1.5px solid ${palette.accent}`,
          color: palette.accent,
          padding: '10px 28px',
          borderRadius: 100,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.04em',
          textDecoration: 'none',
          backgroundColor: 'transparent',
        }}
        onClick={(e) => e.preventDefault()}
      >
        Shop the collection
      </a>
    </div>
  );
}
