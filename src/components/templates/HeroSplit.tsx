import type { TemplateProps } from './types';

export default function HeroSplit({ businessName, tagline, heroImage, palette, fontPairing }: TemplateProps) {
  const headingStyle = { fontFamily: `${fontPairing.heading}, serif` };

  return (
    <div style={{ display: 'flex', minHeight: 340, backgroundColor: palette.bg, color: palette.text, fontFamily: `${fontPairing.body}, sans-serif` }}>
      {/* Left: text */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2.5rem 2rem', minWidth: 0 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.5, marginBottom: 12 }}>
          Est. 2024
        </div>
        <h2 style={{ ...headingStyle, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 14, color: palette.text }}>
          {businessName}
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.75, marginBottom: 24, maxWidth: 280, color: palette.text }}>
          {tagline}
        </p>
        <a
          href="#"
          style={{ display: 'inline-block', backgroundColor: palette.accent, color: '#fff', padding: '10px 22px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', width: 'fit-content' }}
          onClick={(e) => e.preventDefault()}
        >
          Get in touch
        </a>
      </div>

      {/* Right: image */}
      <div style={{ flex: 1, minWidth: 0, position: 'relative', minHeight: 280 }}>
        {heroImage ? (
          <img src={heroImage} alt="Storefront" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', backgroundColor: palette.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280 }}>
            <span style={{ opacity: 0.3, fontSize: 13 }}>Your photo here</span>
          </div>
        )}
      </div>
    </div>
  );
}
