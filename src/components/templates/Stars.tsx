// Inline SVG star rating — renders identically across every OS/font stack,
// avoiding the platform-dependent look of the ★/☆ unicode characters.

interface StarProps {
  filled: boolean;
  color: string;
  size?: number;
}

function Star({ filled, color, size = 13 }: StarProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

interface StarsProps {
  count: number;
  color?: string;
  size?: number;
}

export default function Stars({ count, color = '#f59e0b', size = 13 }: StarsProps) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, verticalAlign: 'middle' }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} filled={i < count} color={color} size={size} />
      ))}
    </span>
  );
}
