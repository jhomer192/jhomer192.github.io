import type { TemplateProps } from './types';
import { sampleContent } from './sampleContent';
import Stars from './Stars';

const foodImages = [
  'https://picsum.photos/seed/food-1/400/300',
  'https://picsum.photos/seed/food-2/400/300',
  'https://picsum.photos/seed/food-3/400/300',
  'https://picsum.photos/seed/food-4/400/300',
  'https://picsum.photos/seed/food-5/400/300',
  'https://picsum.photos/seed/food-6/400/300',
];

export default function CardGrid({ businessName, tagline, heroImage, palette, fontPairing }: TemplateProps) {
  const headingStyle = { fontFamily: `${fontPairing.heading}, serif` };
  const { menuItems, testimonials, hours, address, phone } = sampleContent;

  return (
    <div style={{ fontFamily: `${fontPairing.body}, sans-serif`, backgroundColor: palette.bg, color: palette.text }}>
      {/* Compact hero strip */}
      <div style={{
        display: 'flex', alignItems: 'center',
        background: heroImage
          ? `linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.65)), url(${heroImage}) center/cover`
          : `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.65)), url(https://picsum.photos/seed/storefront-hero/1200/600) center/cover`,
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

      {/* Our Menu section */}
      <div style={{ padding: '1.75rem 1.5rem' }}>
        <h3 style={{ ...headingStyle, fontSize: 17, fontWeight: 700, marginBottom: 4, color: palette.text }}>Our Menu</h3>
        <p style={{ fontSize: 12, color: palette.textMuted, marginBottom: 18 }}>Fresh, seasonal, made to order.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {menuItems.map((item, i) => (
            <div
              key={item.name}
              style={{ backgroundColor: palette.surface, borderRadius: 10, overflow: 'hidden', display: 'flex', gap: 12 }}
            >
              <img
                src={foodImages[i % foodImages.length]}
                alt={item.name}
                loading="lazy"
                style={{ width: 72, height: 72, objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ padding: '10px 10px 10px 0', minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                  <span style={{ ...headingStyle, fontWeight: 700, fontSize: 13, color: palette.text }}>{item.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: palette.accent, flexShrink: 0 }}>{item.price}</span>
                </div>
                <p style={{ fontSize: 11, lineHeight: 1.5, color: palette.textMuted, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ backgroundColor: palette.surface, padding: '1.5rem' }}>
        <h3 style={{ ...headingStyle, fontSize: 16, fontWeight: 700, marginBottom: 16, color: palette.text }}>
          What People Say
        </h3>
        <div style={{ display: 'flex', gap: 12 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ flex: 1, backgroundColor: palette.bg, borderRadius: 10, padding: '14px 12px' }}>
              <Stars count={t.stars} />
              <p style={{ fontSize: 12, lineHeight: 1.55, color: palette.textMuted, margin: '8px 0', fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ fontSize: 11, fontWeight: 600, color: palette.text, opacity: 0.7 }}>{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Visit Us */}
      <div style={{ padding: '1.5rem', display: 'flex', gap: 36 }}>
        <div>
          <h3 style={{ ...headingStyle, fontSize: 15, fontWeight: 700, marginBottom: 12, color: palette.text }}>Visit Us</h3>
          <table style={{ borderCollapse: 'collapse', fontSize: 12, color: palette.textMuted }}>
            <tbody>
              {hours.map((h) => (
                <tr key={h.day}>
                  <td style={{ paddingRight: 24, paddingBottom: 5, fontWeight: 600, color: palette.text, opacity: 0.8 }}>{h.day}</td>
                  <td style={{ paddingBottom: 5 }}>{h.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
          <div style={{ fontSize: 12, color: palette.textMuted }}>{address}</div>
          <div style={{ fontSize: 12, color: palette.textMuted }}>{phone}</div>
        </div>
      </div>
    </div>
  );
}
