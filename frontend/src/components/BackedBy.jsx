const COMPANIES = [
  { name: 'INSEAD', logo: '/logos/insead.jpg' },
  { name: 'Flipkart', logo: '/logos/flipkart.jpg' },
  { name: 'McKinsey & Company', logo: '/logos/mckinsey.jpg' },
  { name: 'Croma', logo: '/logos/croma.jpg' },
  { name: 'Bajaj Finserv', logo: '/logos/bajaj.jpg' },
  { name: 'MobiKwik', logo: '/logos/mobikwik.jpg' },
  { name: 'Pine Labs', logo: '/logos/pinelabs.jpg' },
  { name: 'CFA Institute', logo: '/logos/cfa.jpg' },
  { name: 'American Express', logo: '/logos/amex.jpg' },
  { name: 'OLX', logo: '/logos/olx.jpg' },
];

const N = COMPANIES.length;
const ANGLE = 360 / N;
const RADIUS = 360;
const CARD_W = 190;
const CARD_H = 118;
const SPIN = 'spin3d 36s linear infinite';

function LogoFace({ c }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)]">
      <img src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain" loading="lazy" />
    </div>
  );
}

export default function BackedBy() {
  return (
    <div className="mt-28 text-center">
      <span className="inline-block rounded-full border border-slate-300 px-5 py-1.5 text-sm font-semibold text-slate-700">
        Trusted &amp; funded
      </span>
      <h2 className="mx-auto mt-6 max-w-3xl text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-slate-900">
        Backed by{' '}
        <span className="font-serif italic font-medium text-slate-900">Investors &amp; Builders</span>{' '}
        from{' '}
        <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
          Top Institutions
        </span>
      </h2>

      <div className="relative mt-8 h-[320px] sm:h-[360px]" style={{ perspective: '1300px' }}>
        {/* rotating logo cards */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{ transformStyle: 'preserve-3d', animation: SPIN }}
        >
          {COMPANIES.map((c, i) => (
            <div
              key={c.name}
              style={{
                position: 'absolute',
                width: CARD_W,
                height: CARD_H,
                marginLeft: -CARD_W / 2,
                marginTop: -CARD_H / 2,
                transformStyle: 'preserve-3d',
                transform: `rotateY(${i * ANGLE}deg) translateZ(${RADIUS}px)`,
              }}
            >
              <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden' }}>
                <LogoFace c={c} />
              </div>
              <div
                style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <LogoFace c={c} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
