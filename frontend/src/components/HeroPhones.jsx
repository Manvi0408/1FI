// Decorative floating-phones illustration for the hero, approximating the
// angled product shot. Pure SVG so there are no external image dependencies.
export default function HeroPhones({ className = '' }) {
  return (
    <svg
      viewBox="0 0 620 520"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hp-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7db9ff" />
          <stop offset="0.5" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#fca5b8" />
        </linearGradient>
        <linearGradient id="hp-dark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b3b46" />
          <stop offset="1" stopColor="#17171d" />
        </linearGradient>
        <linearGradient id="hp-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9d5ff" />
          <stop offset="0.55" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="hp-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#efe9ff" />
        </linearGradient>
      </defs>

      {/* soft diagonal backdrop */}
      <path d="M120 40 L620 0 L620 520 L40 520 Z" fill="url(#hp-bg)" opacity="0.7" />

      {/* dark phone (top) */}
      <g transform="rotate(-24 360 150)">
        <rect x="300" y="20" width="150" height="300" rx="30" fill="url(#hp-dark)" />
        <rect x="312" y="40" width="60" height="60" rx="14" fill="#000" opacity="0.55" />
        <circle cx="330" cy="60" r="9" fill="#5b5b66" />
        <circle cx="354" cy="60" r="9" fill="#5b5b66" />
        <circle cx="330" cy="84" r="9" fill="#5b5b66" />
        <text x="375" y="300" fontFamily="Arial, sans-serif" fontSize="20" fontStyle="italic" fill="#c9c9d2" textAnchor="middle">vivo</text>
      </g>

      {/* screen phone (middle right) */}
      <g transform="rotate(-24 470 320)">
        <rect x="392" y="150" width="158" height="320" rx="32" fill="#1f1f27" />
        <rect x="404" y="162" width="134" height="296" rx="24" fill="url(#hp-screen)" />
        <rect x="452" y="170" width="38" height="10" rx="5" fill="#1f1f27" />
        <circle cx="471" cy="330" r="42" fill="#111827" opacity="0.18" />
      </g>

      {/* gradient phone (bottom) */}
      <g transform="rotate(-24 300 430)">
        <rect x="220" y="300" width="150" height="300" rx="30" fill="url(#hp-blue)" />
        <rect x="232" y="320" width="56" height="56" rx="14" fill="#ffffff" opacity="0.25" />
        <text x="300" y="470" fontFamily="Arial, sans-serif" fontSize="20" fontStyle="italic" fill="#ffffff" textAnchor="middle">vivo</text>
      </g>
    </svg>
  );
}
