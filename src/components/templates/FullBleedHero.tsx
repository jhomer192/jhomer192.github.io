import type { TemplateProps } from './types';
import { sampleContent } from './sampleContent';
import Stars from './Stars';

export default function FullBleedHero({ businessName, tagline, heroImage, palette, fontPairing }: TemplateProps) {
  const headingStyle = { fontFamily: `${fontPairing.heading}, serif` };
  const { menuItems, testimonials, hours, address, phone } = sampleContent;

  const bgStyle = heroImage
    ? { background: `linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.70) 100%), url(${heroImage}) center/cover no-repeat` }
    : { background: `linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.75) 100%), url(https://picsum.photos/seed/storefront-hero/1200/600) center/cover no-repeat` };

  const foodImages = [
    'https://picsum.photos/seed/food-1/400/300',
    'https://picsum.photos/seed/food-2/400/300',
    'https://picsum.photos/seed/food-3/400/300',
  ];

  return (
    <div style={{ fontFamily: `${fontPairing.body}, sans-serif`, backgroundColor: palette.bg, color: palette.text }}>
      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px', backgroundColor: palette.bg, borderBottom: `1px solid ${palette.surface}` }}>
        <span style={{ ...headingStyle, fontWeight: 700, fontSize: 15, color: palette.accent }}>{businessName}</span>
        <div style={{ display: 'flex', gap: 20, fontSize: 12, color: palette.text, opacity: 0.7 }}>
          <span>Menu</span>
          <span>About</span>
          <span>Reviews</span>
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
          Order Now
        </a>
      </div>

      {/* Featured menu items */}
      <div style={{ padding: '2rem' }}>
        <h3 style={{ ...headingStyle, fontSize: 18, fontWeight: 700, marginBottom: 6, color: palette.text }}>
          Featured Items
        </h3>
        <p style={{ fontSize: 12, color: palette.textMuted, marginBottom: 20 }}>
          Made fresh daily with locally sourced ingredients.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {menuItems.slice(0, 3).map((item, i) => (
            <div key={item.name} style={{ backgroundColor: palette.surface, borderRadius: 10, overflow: 'hidden' }}>
              <img
                src={foodImages[i]}
                alt={item.name}
                loading="lazy"
                style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ ...headingStyle, fontWeight: 700, fontSize: 14, color: palette.text }}>{item.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: palette.accent }}>{item.price}</span>
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.5, color: palette.textMuted, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials row */}
      <div style={{ backgroundColor: palette.surface, padding: '1.75rem 2rem' }}>
        <h3 style={{ ...headingStyle, fontSize: 16, fontWeight: 700, marginBottom: 16, color: palette.text }}>
          Guest Reviews
        </h3>
        <div style={{ display: 'flex', gap: 14 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ flex: 1, backgroundColor: palette.bg, borderRadius: 10, padding: '14px 12px' }}>
              <Stars count={t.stars} />
              <p style={{ fontSize: 12, lineHeight: 1.55, color: palette.textMuted, margin: '8px 0', fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ fontSize: 11, fontWeight: 600, color: palette.text, opacity: 0.7 }}>{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + address footer */}
      <div style={{ padding: '1.5rem 2rem', display: 'flex', gap: 40, borderTop: `1px solid ${palette.surface}` }}>
        <div>
          <div style={{ ...headingStyle, fontWeight: 700, fontSize: 13, marginBottom: 10, color: palette.text }}>Hours</div>
          {hours.map((h) => (
            <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', gap: 32, fontSize: 12, color: palette.textMuted, marginBottom: 4 }}>
              <span>{h.day}</span>
              <span>{h.time}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{ ...headingStyle, fontWeight: 700, fontSize: 13, marginBottom: 10, color: palette.text }}>Find Us</div>
          <div style={{ fontSize: 12, color: palette.textMuted, marginBottom: 4 }}>{address}</div>
          <div style={{ fontSize: 12, color: palette.textMuted }}>{phone}</div>
        </div>
      </div>
    </div>
  );
}
