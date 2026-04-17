import { useState, useRef, useCallback } from 'react';
import { extractPalette, pickRoles } from '../lib/palette';
import { fontPairings, type FontPairing } from '../lib/fontPairings';
import HeroSplit from './templates/HeroSplit';
import FullBleedHero from './templates/FullBleedHero';
import CardGrid from './templates/CardGrid';
import SidebarNav from './templates/SidebarNav';
import Minimal from './templates/Minimal';
import type { TemplatePalette } from './templates/types';

const DEFAULT_NAME = "Bella's Bakery";
const DEFAULT_TAGLINE = 'Fresh bread, every morning, from scratch.';
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const DEFAULT_PALETTE: TemplatePalette = {
  bg: '#0f172a',
  surface: '#1e293b',
  accent: '#38bdf8',
  accent2: '#818cf8',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
};

interface Template {
  id: string;
  label: string;
  // Thumbnail schematic: array of blocks with flex layout info
  thumb: React.ReactNode;
}

function loadGoogleFont(heading: string, body: string) {
  const families = [...new Set([heading, body])].map((f) => f.replace(/ /g, '+')).join('&family=');
  const id = `gf-${heading}-${body}`.replace(/\s/g, '-');
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${families}:wght@400;600;700&display=swap`;
  document.head.appendChild(link);
}

// Tiny schematic thumbnail for each template
function ThumbHeroSplit({ active, palette }: { active: boolean; palette: TemplatePalette }) {
  const border = active ? `2px solid ${palette.accent}` : '2px solid transparent';
  return (
    <div title="Hero Split" style={{ width: 60, height: 40, border, borderRadius: 6, overflow: 'hidden', display: 'flex', cursor: 'pointer', flexShrink: 0, backgroundColor: palette.bg }}>
      <div style={{ flex: 1, backgroundColor: palette.surface, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3, padding: '4px 5px' }}>
        <div style={{ height: 3, backgroundColor: palette.text, borderRadius: 2, width: '80%', opacity: 0.7 }} />
        <div style={{ height: 2, backgroundColor: palette.textMuted, borderRadius: 2, width: '60%', opacity: 0.5 }} />
        <div style={{ height: 4, backgroundColor: palette.accent, borderRadius: 2, width: '50%', marginTop: 2 }} />
      </div>
      <div style={{ flex: 1, backgroundColor: palette.accent, opacity: 0.25 }} />
    </div>
  );
}

function ThumbFullBleed({ active, palette }: { active: boolean; palette: TemplatePalette }) {
  const border = active ? `2px solid ${palette.accent}` : '2px solid transparent';
  return (
    <div title="Full Bleed Hero" style={{ width: 60, height: 40, border, borderRadius: 6, overflow: 'hidden', cursor: 'pointer', flexShrink: 0, backgroundColor: palette.surface, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 6, backgroundColor: palette.bg, display: 'flex', alignItems: 'center', padding: '0 4px', gap: 3 }}>
        <div style={{ width: 10, height: 2, backgroundColor: palette.accent, borderRadius: 1, opacity: 0.8 }} />
        <div style={{ flex: 1, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <div style={{ width: 6, height: 1.5, backgroundColor: palette.textMuted, borderRadius: 1 }} />
          <div style={{ width: 6, height: 1.5, backgroundColor: palette.textMuted, borderRadius: 1 }} />
        </div>
      </div>
      <div style={{ flex: 1, backgroundColor: palette.accent, opacity: 0.18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <div style={{ width: 28, height: 3, backgroundColor: '#fff', borderRadius: 2, opacity: 0.7 }} />
        <div style={{ width: 18, height: 2, backgroundColor: '#fff', borderRadius: 2, opacity: 0.5 }} />
        <div style={{ width: 14, height: 4, backgroundColor: palette.accent, borderRadius: 2, marginTop: 2, opacity: 1 }} />
      </div>
    </div>
  );
}

function ThumbCardGrid({ active, palette }: { active: boolean; palette: TemplatePalette }) {
  const border = active ? `2px solid ${palette.accent}` : '2px solid transparent';
  return (
    <div title="Card Grid" style={{ width: 60, height: 40, border, borderRadius: 6, overflow: 'hidden', cursor: 'pointer', flexShrink: 0, backgroundColor: palette.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 12, backgroundColor: palette.surface, opacity: 0.9 }} />
      <div style={{ flex: 1, display: 'flex', gap: 2, padding: '4px 4px' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: 1, backgroundColor: palette.surface, borderRadius: 3, borderTop: `2px solid ${palette.accent}` }} />
        ))}
      </div>
    </div>
  );
}

function ThumbSidebarNav({ active, palette }: { active: boolean; palette: TemplatePalette }) {
  const border = active ? `2px solid ${palette.accent}` : '2px solid transparent';
  return (
    <div title="Sidebar Nav" style={{ width: 60, height: 40, border, borderRadius: 6, overflow: 'hidden', cursor: 'pointer', flexShrink: 0, backgroundColor: palette.bg, display: 'flex' }}>
      <div style={{ width: 16, backgroundColor: palette.surface, display: 'flex', flexDirection: 'column', gap: 2, padding: '4px 3px' }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ height: 2, backgroundColor: i === 0 ? palette.accent : palette.textMuted, borderRadius: 1, opacity: i === 0 ? 1 : 0.4 }} />
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: 8, backgroundColor: palette.accent, opacity: 0.2 }} />
        <div style={{ flex: 1, padding: '3px 4px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ height: 3, backgroundColor: palette.text, borderRadius: 1, width: '70%', opacity: 0.7 }} />
          <div style={{ height: 2, backgroundColor: palette.textMuted, borderRadius: 1, width: '55%', opacity: 0.5 }} />
        </div>
      </div>
    </div>
  );
}

function ThumbMinimal({ active, palette }: { active: boolean; palette: TemplatePalette }) {
  const border = active ? `2px solid ${palette.accent}` : '2px solid transparent';
  return (
    <div title="Minimal" style={{ width: 60, height: 40, border, borderRadius: 6, overflow: 'hidden', cursor: 'pointer', flexShrink: 0, backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
      <div style={{ width: 32, height: 4, backgroundColor: '#1a1a1a', borderRadius: 2, opacity: 0.8 }} />
      <div style={{ width: 20, height: 1.5, backgroundColor: palette.accent, borderRadius: 1 }} />
      <div style={{ width: 26, height: 2, backgroundColor: '#888', borderRadius: 1, opacity: 0.5 }} />
      <div style={{ width: 30, height: 8, backgroundColor: '#ddd', borderRadius: 3 }} />
    </div>
  );
}

type TemplateId = 'heroSplit' | 'fullBleed' | 'cardGrid' | 'sidebarNav' | 'minimal';

const TEMPLATE_IDS: TemplateId[] = ['heroSplit', 'fullBleed', 'cardGrid', 'sidebarNav', 'minimal'];
const TEMPLATE_LABELS: Record<TemplateId, string> = {
  heroSplit: 'Hero Split',
  fullBleed: 'Full Bleed',
  cardGrid: 'Card Grid',
  sidebarNav: 'Sidebar Nav',
  minimal: 'Minimal',
};

interface ColorSwatchProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}

function ColorSwatch({ label, value, onChange }: ColorSwatchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <button
        onClick={() => inputRef.current?.click()}
        title={`Edit ${label}: ${value}`}
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: value,
          border: '2.5px solid rgba(255,255,255,0.18)',
          cursor: 'pointer',
          padding: 0,
          boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
          transition: 'transform 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />
      <input
        ref={inputRef}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
        aria-label={`Pick ${label} color`}
      />
      <span style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
    </div>
  );
}

export default function StorefrontPreview() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState(DEFAULT_NAME);
  const [tagline, setTagline] = useState(DEFAULT_TAGLINE);
  const [palette, setPalette] = useState<TemplatePalette>(DEFAULT_PALETTE);
  const [extractedPalette, setExtractedPalette] = useState<TemplatePalette | null>(null);
  const [pairing, setPairing] = useState<FontPairing>(fontPairings[0]);
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('heroSplit');
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('Image must be under 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setImageUrl(url);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 200;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const extracted = extractPalette(imageData, 6);
        const roles = pickRoles(extracted);
        const newPalette: TemplatePalette = {
          bg: roles.bg,
          surface: roles.surface,
          accent: roles.accent,
          accent2: roles.hero,
          text: roles.textPrimary,
          textMuted: roles.textMuted,
        };
        setPalette(newPalette);
        setExtractedPalette(newPalette);
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const selectPairing = (p: FontPairing) => {
    setPairing(p);
    loadGoogleFont(p.heading, p.body);
  };

  const updateColor = (key: keyof TemplatePalette, value: string) => {
    setPalette((prev) => ({ ...prev, [key]: value }));
  };

  const resetToExtracted = () => {
    if (extractedPalette) setPalette(extractedPalette);
  };

  const mailtoHref = `mailto:jack@homerfamily.com?subject=Website%20inquiry:%20${encodeURIComponent(businessName)}`;

  const templateProps = {
    businessName: businessName || DEFAULT_NAME,
    tagline: tagline || DEFAULT_TAGLINE,
    heroImage: imageUrl,
    palette,
    fontPairing: pairing,
  };

  const thumbProps = (id: TemplateId) => ({ active: activeTemplate === id, palette });

  return (
    <div className="mb-16">
      <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">

        {/* Upload zone */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors mb-4 ${
            dragOver ? 'border-accent bg-accent/5' : 'border-border hover:border-border-strong'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />
          {imageUrl ? (
            <div className="flex flex-col items-center gap-3">
              <img src={imageUrl} alt="Uploaded preview" className="max-h-32 rounded-lg object-contain" />
              <span className="text-sm text-text-muted">Click or drop to change image</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-text-muted">
              <svg className="w-10 h-10 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Drop your storefront photo here</span>
              <span className="text-xs">or click to browse (max 5 MB)</span>
            </div>
          )}
        </div>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <p className="text-xs text-text-dim mb-6 text-center">
          Your photo stays on your device. We don't upload it anywhere.
        </p>

        {/* Business name + tagline */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
          <div>
            <label className="block text-xs text-text-muted mb-1 font-medium">Business name</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full rounded-lg bg-surface-hover border border-border px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/50"
            />
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1 font-medium">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full rounded-lg bg-surface-hover border border-border px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/50"
            />
          </div>
        </div>

        {/* Font pairing selector */}
        <div className="mb-6">
          <p className="text-xs text-text-muted mb-2 font-medium">Font pairing</p>
          <div className="flex flex-wrap gap-2">
            {fontPairings.map((p) => (
              <button
                key={p.name}
                onClick={() => selectPairing(p)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  pairing.name === p.name
                    ? 'bg-accent text-bg'
                    : 'bg-surface-hover text-text-muted hover:text-text border border-border'
                }`}
              >
                {p.name}
                <span className="ml-1.5 opacity-60">{p.heading.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Template selector thumbnails */}
        <div className="mb-6">
          <p className="text-xs text-text-muted mb-3 font-medium">Layout template</p>
          <div className="flex flex-wrap gap-3">
            {TEMPLATE_IDS.map((id) => (
              <div key={id} className="flex flex-col items-center gap-1.5" onClick={() => setActiveTemplate(id)} style={{ cursor: 'pointer' }}>
                {id === 'heroSplit' && <ThumbHeroSplit {...thumbProps(id)} />}
                {id === 'fullBleed' && <ThumbFullBleed {...thumbProps(id)} />}
                {id === 'cardGrid' && <ThumbCardGrid {...thumbProps(id)} />}
                {id === 'sidebarNav' && <ThumbSidebarNav {...thumbProps(id)} />}
                {id === 'minimal' && <ThumbMinimal {...thumbProps(id)} />}
                <span className={`text-xs ${activeTemplate === id ? 'text-accent font-semibold' : 'text-text-muted'}`}>
                  {TEMPLATE_LABELS[id]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Color toolbar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-text-muted font-medium">Colors</p>
            {extractedPalette && (
              <button
                onClick={resetToExtracted}
                className="text-xs text-text-dim hover:text-text-muted transition-colors underline underline-offset-2"
              >
                Reset to extracted
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-5">
            <ColorSwatch label="Primary" value={palette.accent} onChange={(v) => updateColor('accent', v)} />
            <ColorSwatch label="Secondary" value={palette.accent2} onChange={(v) => updateColor('accent2', v)} />
            <ColorSwatch label="Background" value={palette.bg} onChange={(v) => updateColor('bg', v)} />
            <ColorSwatch label="Surface" value={palette.surface} onChange={(v) => updateColor('surface', v)} />
            <ColorSwatch label="Text" value={palette.text} onChange={(v) => updateColor('text', v)} />
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-xl overflow-hidden border border-border mb-6">
          {activeTemplate === 'heroSplit' && <HeroSplit {...templateProps} />}
          {activeTemplate === 'fullBleed' && <FullBleedHero {...templateProps} />}
          {activeTemplate === 'cardGrid' && <CardGrid {...templateProps} />}
          {activeTemplate === 'sidebarNav' && <SidebarNav {...templateProps} />}
          {activeTemplate === 'minimal' && <Minimal {...templateProps} />}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={mailtoHref}
            className="inline-block rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-bg hover:bg-accent-hover transition-colors"
          >
            Like what you see? I can build this for real.
          </a>
        </div>
      </div>
    </div>
  );
}
