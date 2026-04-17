import type { TemplateProps } from './types';
import { sampleContent } from './sampleContent';

const NAV_LINKS = ['Home', 'Menu', 'Gallery', 'About', 'Contact'];

function Stars({ count }: { count: number }) {
  return (
    <span style={{ color: '#f59e0b', letterSpacing: 1, fontSize: 12 }}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </span>
  );
}

export default function SidebarNav({ businessName, tagline, heroImage, palette, fontPairing }: TemplateProps) {
  const headingStyle = { fontFamily: `${fontPairing.heading}, serif` };
  const { services, testimonials, hours, address, phone } = sampleContent;

  return (
    <div style={{ fontFamily: `${fontPairing.body}, sans-serif`, backgroundColor: palette.bg, color: palette.text }}>
      <div style={{ display: 'flex', minHeight: 480 }}>
        {/* Left sidebar */}
        <div style={{ width: 150, minWidth: 140, backgroundColor: palette.surface, display: 'flex', flexDirection: 'column' }}>
          {/* Business name */}
          <div style={{ padding: '18px 14px 14px', borderBottom: `1px solid ${palette.bg}` }}>
            <div style={{ ...headingStyle, fontWeight: 700, fontSize: 13, color: palette.accent, lineHeight: 1.3 }}>
              {businessName}
            </div>
          </div>

          {/* Nav links */}
          <nav style={{ padding: '10px 0', flex: 1 }}>
            {NAV_LINKS.map((link, i) => (
              <div
                key={link}
                style={{
                  padding: '9px 14px',
                  fontSize: 12,
                  color: i === 0 ? palette.accent : palette.text,
                  backgroundColor: i === 0 ? `${palette.accent}18` : 'transparent',
                  borderLeft: i === 0 ? `3px solid ${palette.accent}` : '3px solid transparent',
                  opacity: i === 0 ? 1 : 0.7,
                  cursor: 'pointer',
                }}
              >
                {link}
              </div>
            ))}
          </nav>

          {/* Hours in sidebar */}
          <div style={{ padding: '12px 14px', borderTop: `1px solid ${palette.bg}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.5, marginBottom: 8 }}>
              Hours
            </div>
            {hours.map((h) => (
              <div key={h.day} style={{ marginBottom: 5 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: palette.text, opacity: 0.75 }}>{h.day}</div>
                <div style={{ fontSize: 10, color: palette.textMuted }}>{h.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Hero image */}
          {heroImage ? (
            <img src={heroImage} alt="Storefront" loading="lazy" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
          ) : (
            <img
              src="https://picsum.photos/seed/cafe-interior/800/400"
              alt="Cafe interior"
              loading="lazy"
              style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
            />
          )}

          {/* 2-col content */}
          <div style={{ display: 'flex', gap: 0, flex: 1 }}>
            {/* Left: About + services */}
            <div style={{ flex: 1, padding: '18px 16px', borderRight: `1px solid ${palette.surface}`, minWidth: 0 }}>
              <h3 style={{ ...headingStyle, fontSize: 15, fontWeight: 700, marginBottom: 10, color: palette.text }}>
                About Us
              </h3>
              <p style={{ fontSize: 12, lineHeight: 1.65, color: palette.textMuted, marginBottom: 18 }}>
                {tagline} We have been serving the neighborhood since 2019 with handcrafted food and drinks made from locally sourced ingredients. Come as you are -- we are your home away from home.
              </p>
              <h4 style={{ ...headingStyle, fontSize: 13, fontWeight: 700, marginBottom: 10, color: palette.text }}>
                Our Services
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {services.map((s) => (
                  <div key={s.title} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: palette.accent, fontSize: 14, lineHeight: 1, marginTop: 1 }}>+</span>
                    <div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: palette.text }}>{s.title}</span>
                      <span style={{ fontSize: 12, color: palette.textMuted }}> -- {s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: interior photo + testimonials */}
            <div style={{ flex: 1, padding: '18px 16px', minWidth: 0 }}>
              <img
                src="https://picsum.photos/seed/cafe-interior/800/400"
                alt="Interior"
                loading="lazy"
                style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 14, display: 'block' }}
              />
              {testimonials.map((t) => (
                <div key={t.name} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${palette.surface}` }}>
                  <Stars count={t.stars} />
                  <p style={{ fontSize: 11, lineHeight: 1.55, color: palette.textMuted, margin: '6px 0 4px', fontStyle: 'italic' }}>"{t.text}"</p>
                  <div style={{ fontSize: 10, fontWeight: 600, color: palette.text, opacity: 0.65 }}>{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div style={{ backgroundColor: palette.surface, padding: '10px 20px', display: 'flex', gap: 32, alignItems: 'center', borderTop: `1px solid ${palette.bg}` }}>
        <span style={{ fontSize: 11, color: palette.textMuted }}>{address}</span>
        <span style={{ fontSize: 11, color: palette.textMuted }}>{phone}</span>
      </div>
    </div>
  );
}
