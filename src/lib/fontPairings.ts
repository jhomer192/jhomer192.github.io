export interface FontPairing {
  name: string;
  heading: string;
  body: string;
}

export const fontPairings: FontPairing[] = [
  {
    name: 'Classic',
    heading: 'Playfair Display',
    body: 'Inter',
  },
  {
    name: 'Modern',
    heading: 'Bricolage Grotesque',
    body: 'Inter',
  },
  {
    name: 'Editorial',
    heading: 'Fraunces',
    body: 'DM Sans',
  },
  {
    name: 'Display',
    heading: 'Space Grotesk',
    body: 'Lora',
  },
];
