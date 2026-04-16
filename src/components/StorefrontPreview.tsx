import { useState, useRef, useCallback } from 'react';
import { extractPalette, pickRoles, type Roles } from '../lib/palette';
import { fontPairings, type FontPairing } from '../lib/fontPairings';

const DEFAULT_NAME = "Bella's Bakery";
const DEFAULT_TAGLINE = 'Fresh bread, every morning, from scratch.';
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const DEFAULT_ROLES: Roles = {
  bg: '#0f172a',
  surface: '#1e293b',
  hero: '#334155',
  accent: '#38bdf8',
  textPrimary: '#f1f5f9',
  textMuted: '#94a3b8',
};

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

function Swatch({ hex, label }: { hex: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <button
      onClick={copy}
      title={`Copy ${hex}`}
      className="flex flex-col items-center gap-1 group"
    >
      <div
        className="w-10 h-10 rounded-lg border border-white/20 shadow transition-transform group-hover:scale-110"
        style={{ background: hex }}
      />
      <span className="text-xs text-slate-400 font-mono">{copied ? 'Copied!' : hex}</span>
      <span className="text-xs text-slate-500">{label}</span>
    </button>
  );
}

export default function StorefrontPreview() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState(DEFAULT_NAME);
  const [tagline, setTagline] = useState(DEFAULT_TAGLINE);
  const [roles, setRoles] = useState<Roles>(DEFAULT_ROLES);
  const [pairing, setPairing] = useState<FontPairing>(fontPairings[0]);
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
      // Extract palette
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
        const palette = extractPalette(imageData, 6);
        setRoles(pickRoles(palette));
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

  const mailtoHref = `mailto:jack@homerfamily.com?subject=Website%20inquiry:%20${encodeURIComponent(businessName)}`;

  const previewStyle: React.CSSProperties = {
    '--bg': roles.bg,
    '--surface': roles.surface,
    '--hero': roles.hero,
    '--accent': roles.accent,
    '--text': roles.textPrimary,
    '--text-muted': roles.textMuted,
    fontFamily: pairing.body + ', sans-serif',
    backgroundColor: 'var(--bg)',
    color: 'var(--text)',
  } as React.CSSProperties;

  const headingStyle: React.CSSProperties = {
    fontFamily: pairing.heading + ', serif',
  };

  return (
    <div className="mb-16">
      <div className="rounded-2xl border border-white/10 bg-ink-800 p-6 md:p-8">
        {/* Upload zone */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors mb-6 ${
            dragOver ? 'border-accent-400 bg-accent-500/5' : 'border-white/20 hover:border-white/40'
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
              <span className="text-sm text-slate-400">Click or drop to change image</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-slate-400">
              <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Drop your storefront photo here</span>
              <span className="text-xs">or click to browse (max 5 MB)</span>
            </div>
          )}
        </div>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <p className="text-xs text-slate-500 mb-6 text-center">
          Your photo stays on your device. We don't upload it anywhere.
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
          <div>
            <label className="block text-xs text-slate-400 mb-1 font-medium">Business name</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full rounded-lg bg-ink-700 border border-white/10 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-accent-500/50"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1 font-medium">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full rounded-lg bg-ink-700 border border-white/10 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-accent-500/50"
            />
          </div>
        </div>

        {/* Font pairing selector */}
        <div className="mb-6">
          <p className="text-xs text-slate-400 mb-2 font-medium">Font pairing</p>
          <div className="flex flex-wrap gap-2">
            {fontPairings.map((p) => (
              <button
                key={p.name}
                onClick={() => selectPairing(p)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  pairing.name === p.name
                    ? 'bg-accent-600 text-white'
                    : 'bg-ink-700 text-slate-400 hover:text-slate-200 border border-white/10'
                }`}
              >
                {p.name}
                <span className="ml-1.5 opacity-60">{p.heading.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Palette swatches */}
        <div className="mb-8">
          <p className="text-xs text-slate-400 mb-3 font-medium">Extracted palette (click to copy)</p>
          <div className="flex flex-wrap gap-4">
            <Swatch hex={roles.bg} label="bg" />
            <Swatch hex={roles.surface} label="surface" />
            <Swatch hex={roles.hero} label="hero" />
            <Swatch hex={roles.accent} label="accent" />
            <Swatch hex={roles.textPrimary} label="text" />
            <Swatch hex={roles.textMuted} label="muted" />
          </div>
        </div>

        {/* Mockup preview */}
        <div className="rounded-xl overflow-hidden border border-white/10 mb-6" style={previewStyle}>
          {/* Hero */}
          <div
            className="relative h-48 md:h-64 flex flex-col items-center justify-center text-center px-6"
            style={{
              background: imageUrl
                ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url(${imageUrl}) center/cover`
                : `linear-gradient(135deg, ${roles.hero}, ${roles.bg})`,
            }}
          >
            {/* Fake nav */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-3 bg-black/30">
              <span className="text-sm font-semibold" style={headingStyle}>{businessName || DEFAULT_NAME}</span>
              <div className="flex gap-4 text-xs opacity-80">
                <span>Menu</span>
                <span>About</span>
                <span>Contact</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white" style={headingStyle}>
              {businessName || DEFAULT_NAME}
            </h2>
            <p className="text-sm opacity-90 text-white max-w-xs">{tagline || DEFAULT_TAGLINE}</p>
          </div>

          {/* Service cards */}
          <div className="p-6" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {['Our Story', 'Our Menu', 'Visit Us'].map((title, i) => (
                <div
                  key={title}
                  className="rounded-lg p-4"
                  style={{ backgroundColor: 'var(--surface)', borderLeft: `3px solid ${roles.accent}` }}
                >
                  <h3 className="font-semibold mb-1 text-sm" style={headingStyle}>{title}</h3>
                  <p className="text-xs opacity-70" style={{ color: 'var(--text-muted)' }}>
                    {i === 0 ? 'Family-owned since 1998.' : i === 1 ? 'Fresh baked daily.' : 'Open 7am - 2pm.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={mailtoHref}
            className="inline-block rounded-xl bg-accent-600 px-8 py-3 text-sm font-semibold text-white hover:bg-accent-500 transition-colors"
          >
            Email me to build this for real
          </a>
        </div>
      </div>
    </div>
  );
}
