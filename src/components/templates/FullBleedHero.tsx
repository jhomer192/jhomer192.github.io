import type { TemplateProps } from './types';

export default function FullBleedHero({ businessName, tagline, heroImage, palette, fontPairing }: TemplateProps) {
  const headingStyle = { fontFamily: `${fontPairing.heading}, serif` };
  const bgStyle = heroImage
    ? { background: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.70) 100%), url(${heroImage}) center/cover no-repeat` }
    : { background: `linear-gradient(135deg, ${palette.surface} 0%, ${palette.bg} 100%)` };

  return (
    <div style={{ fontFamily: `${fontPairing.body}, sans-serif`, minHeight: 340 }}>
      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px', backgroundColor: palette.bg, borderBottom: `1px solid ${palette.surface}` }}>
        <span style={{ ...headingStyle, fontWeight: 700, fontSize: 15, color: palette.accent }}>{businessName}</span>
        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: palette.text, opacity: 0.7 }}>
          <span>Home</span>
          <span>Menu</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Full-bleed hero */}
      <div style={{ ...bgStyle, minHeight: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '3rem 2rem' }}>
        <h2 style={{ ...headingStyle, fontSize: 'clamp(1.6rem, 5vw, 2.5rem)', fontWeight: 700, color: '#fff', marginBottom: 12, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          {businessName}
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.88)', marginBottom: 28, maxWidth: 380, lineHeight: 1.6, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
          {tagline}
        </p>
        <a
          href="#"
          style={{ backgroundColor: palette.accent, color: '#fff', padding: '11px 28px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
          onClick={(e) => e.preventDefault()}
        >
          See the menu
        </a>
      </div>
    </div>
  );
}
