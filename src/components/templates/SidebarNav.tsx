import type { TemplateProps } from './types';

const NAV_LINKS = ['Dashboard', 'Services', 'Portfolio', 'About', 'Contact'];

export default function SidebarNav({ businessName, tagline, heroImage, palette, fontPairing }: TemplateProps) {
  const headingStyle = { fontFamily: `${fontPairing.heading}, serif` };

  return (
    <div style={{ display: 'flex', fontFamily: `${fontPairing.body}, sans-serif`, minHeight: 340, backgroundColor: palette.bg, color: palette.text }}>
      {/* Left sidebar */}
      <div style={{ width: 160, minWidth: 140, backgroundColor: palette.surface, display: 'flex', flexDirection: 'column', padding: '24px 0' }}>
        <div style={{ padding: '0 16px 20px', borderBottom: `1px solid ${palette.bg}` }}>
          <div style={{ ...headingStyle, fontWeight: 700, fontSize: 14, color: palette.accent, lineHeight: 1.3 }}>
            {businessName}
          </div>
        </div>
        <nav style={{ padding: '16px 0' }}>
          {NAV_LINKS.map((link, i) => (
            <div
              key={link}
              style={{
                padding: '9px 16px',
                fontSize: 13,
                color: i === 0 ? palette.accent : palette.text,
                backgroundColor: i === 0 ? `${palette.accent}18` : 'transparent',
                borderLeft: i === 0 ? `3px solid ${palette.accent}` : '3px solid transparent',
                cursor: 'pointer',
                opacity: i === 0 ? 1 : 0.7,
              }}
            >
              {link}
            </div>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{ padding: '12px 24px', borderBottom: `1px solid ${palette.surface}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Dashboard</span>
          <span style={{ fontSize: 12, opacity: 0.5 }}>April 2024</span>
        </div>

        {/* Hero image area */}
        <div style={{ flex: 1, position: 'relative', minHeight: 220 }}>
          {heroImage ? (
            <img src={heroImage} alt="Storefront" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', maxHeight: 240 }} />
          ) : (
            <div style={{ width: '100%', minHeight: 220, backgroundColor: palette.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ opacity: 0.3, fontSize: 13 }}>Your photo here</span>
            </div>
          )}
        </div>

        {/* Text below image */}
        <div style={{ padding: '20px 24px' }}>
          <h2 style={{ ...headingStyle, fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 700, marginBottom: 6, color: palette.text }}>{businessName}</h2>
          <p style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.72, color: palette.text }}>{tagline}</p>
        </div>
      </div>
    </div>
  );
}
