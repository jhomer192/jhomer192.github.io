import type { FontPairing } from '../../lib/fontPairings';

export interface TemplatePalette {
  bg: string;
  surface: string;
  accent: string;
  accent2: string;
  text: string;
  textMuted: string;
}

export interface TemplateProps {
  businessName: string;
  tagline: string;
  heroImage: string | null;
  palette: TemplatePalette;
  fontPairing: FontPairing;
}
