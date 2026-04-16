// K-means palette extraction from ImageData

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
}

function toHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
}

function dist(a: [number, number, number], b: [number, number, number]): number {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
}

export function extractPalette(
  imageData: ImageData,
  k = 5
): { centers: [number, number, number][]; counts: number[] } {
  const { data, width, height } = imageData;
  const samples: [number, number, number][] = [];
  const step = Math.max(1, Math.floor((width * height) / 2000));

  for (let i = 0; i < width * height; i += step) {
    const idx = i * 4;
    const a = data[idx + 3];
    if (a < 128) continue;
    samples.push([data[idx], data[idx + 1], data[idx + 2]]);
  }

  if (samples.length === 0) {
    const centers: [number, number, number][] = Array.from({ length: k }, (_, i) => {
      const v = Math.round((i / (k - 1)) * 255);
      return [v, v, v];
    });
    return { centers, counts: Array(k).fill(0) };
  }

  // Seeded initialization: spread evenly
  const centers: [number, number, number][] = [];
  const seedStep = Math.floor(samples.length / k);
  for (let i = 0; i < k; i++) {
    centers.push([...samples[i * seedStep]]);
  }

  const assignments = new Int32Array(samples.length);
  const counts = new Array(k).fill(0);

  for (let iter = 0; iter < 20; iter++) {
    // Assign
    for (let si = 0; si < samples.length; si++) {
      let best = 0, bestDist = Infinity;
      for (let ci = 0; ci < k; ci++) {
        const d = dist(samples[si], centers[ci]);
        if (d < bestDist) { bestDist = d; best = ci; }
      }
      assignments[si] = best;
    }
    // Update centers
    const sums: [number, number, number][] = Array.from({ length: k }, () => [0, 0, 0]);
    counts.fill(0);
    for (let si = 0; si < samples.length; si++) {
      const ci = assignments[si];
      sums[ci][0] += samples[si][0];
      sums[ci][1] += samples[si][1];
      sums[ci][2] += samples[si][2];
      counts[ci]++;
    }
    for (let ci = 0; ci < k; ci++) {
      if (counts[ci] > 0) {
        centers[ci] = [sums[ci][0] / counts[ci], sums[ci][1] / counts[ci], sums[ci][2] / counts[ci]];
      }
    }
  }

  return { centers, counts };
}

export interface Roles {
  bg: string;
  surface: string;
  hero: string;
  accent: string;
  textPrimary: string;
  textMuted: string;
}

export function pickRoles(palette: { centers: [number, number, number][]; counts: number[] }): Roles {
  const { centers } = palette;

  const sorted = centers
    .map((c, i) => ({ c, i, hsl: rgbToHsl(c[0], c[1], c[2]) }))
    .sort((a, b) => a.hsl[2] - b.hsl[2]); // sort by lightness asc

  const bg = sorted[0];
  const surface = sorted[Math.min(1, sorted.length - 1)];
  const hero = sorted[sorted.length - 1];

  // Most saturated mid-brightness = accent
  const accentCandidate = sorted.reduce((best, cur) => {
    const score = cur.hsl[1] * (1 - Math.abs(cur.hsl[2] - 0.5) * 2);
    const bestScore = best.hsl[1] * (1 - Math.abs(best.hsl[2] - 0.5) * 2);
    return score > bestScore ? cur : best;
  });

  const darkBg = bg.hsl[2] < 0.3;

  return {
    bg: toHex(...bg.c),
    surface: toHex(...surface.c),
    hero: toHex(...hero.c),
    accent: toHex(...accentCandidate.c),
    textPrimary: darkBg ? '#f1f5f9' : '#0f172a',
    textMuted: darkBg ? '#94a3b8' : '#475569',
  };
}
