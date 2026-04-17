import type { TemplateProps } from './types';

const CARDS = [
  { title: 'Menu', desc: 'Fresh ingredients, made to order daily.' },
  { title: 'Hours', desc: 'Open Mon-Sat 7 am to 8 pm.' },
  { title: 'Contact', desc: 'Reach us at hello@example.com.' },
];

export default function CardGrid({ businessName, tagline, heroImage, palette, fontPairing }: TemplateProps) {
  const headingStyle = { fontFamily: `${fontPairing.heading}, serif` };

  return (
    <div style={{ fontFamily: `${fontPairing.body}, sans-serif`, backgroundColor: palette.bg, color: palette.text, minHeight: 340 }}>
      {/* Compact hero strip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        background: heroImage
          ? `linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.65)), url(${heroImage}) center/cover`
          : `linear-gradient(90deg, ${palette.surface}, ${palette.bg})`,
        padding: '20px 24px',
        minHeight: 100,
      }}>
        <div>
          <h2 style={{ ...headingStyle, fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', fontWeight: 700, color: '#fff', marginBottom: 4, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            {businessName}
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>{tagline}</p>
        </div>
      </div>

      {/* 3-column card grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: '24px 20px' }}>
        {CARDS.map((card) => (
          <div
            key={card.title}
            style={{
              backgroundColor: palette.surface,
              borderRadius: 10,
              padding: '18px 16px',
              borderTop: `3px solid ${palette.accent}`,
            }}
          >
            <h3 style={{ ...headingStyle, fontSize: 15, fontWeight: 600, marginBottom: 6, color: palette.text }}>{card.title}</h3>
            <p style={{ fontSize: 12, lineHeight: 1.55, color: palette.textMuted }}>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
