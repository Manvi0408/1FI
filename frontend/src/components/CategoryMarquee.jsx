import { formatINR } from '../lib/format.js';

const CATEGORIES = [
  { tag: 'Jewellery', name: 'Solitaire Diamond Ring', price: 79999, mrp: 99999, rating: 4.8, img: '/categories/diamond.jpg' },
  { tag: 'Two-wheeler', name: 'Royal Enfield Hunter 350', price: 149900, mrp: 164900, rating: 4.6, img: '/categories/bikes.jpg' },
  { tag: 'Travel', name: 'Maldives Getaway', price: 89999, mrp: 109999, rating: 4.7, img: '/categories/holidays.jpg' },
  { tag: 'EV', name: 'Tesla Model Y', price: 4199000, mrp: 4500000, rating: 4.9, img: '/categories/ev.jpg' },
  { tag: 'Laptop', name: '2-in-1 Ultrabook', price: 99990, mrp: 119990, rating: 4.6, img: '/categories/laptop.jpg' },
  { tag: 'Smartphone', name: 'Apple iPhone 17', price: 79900, mrp: 82900, rating: 4.7, img: '/products/iphone-17.jpg' },
  { tag: 'Furniture', name: 'Mahogany Lounge Set', price: 54999, mrp: 69999, rating: 4.5, img: '/categories/furniture.jpg' },
];

function pct(mrp, price) {
  return mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
}

function FurniturePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-slate-50">
      <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="#c7c7d1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
        <path d="M3 13a2 2 0 0 1 2 2v3M21 13a2 2 0 0 0-2 2v3" />
        <path d="M4 18h16M6 18v2M18 18v2" />
        <path d="M6 11h12v2H6z" />
      </svg>
    </div>
  );
}

function CategoryCard({ c }) {
  const off = pct(c.mrp, c.price);
  const emi = Math.round(c.price / 24);
  return (
    <div className="w-[290px] shrink-0 overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* image + apple-glass category tag */}
      <div className="relative aspect-[4/3] w-full bg-white">
        {c.img ? (
          <img src={c.img} alt={c.name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <FurniturePlaceholder />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-md">
          {c.tag}
        </span>
      </div>

      {/* details: name + price on the left, EMI on the right */}
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="truncate text-sm font-bold text-slate-900">{c.name}</h4>
            <span className="inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold text-slate-700">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#f5b301"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7L12 2z" /></svg>
              {c.rating.toFixed(1)}
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-slate-900">{formatINR(c.price)}</span>
            {off > 0 && (
              <span className="text-[11px] text-slate-400 line-through">{formatINR(c.mrp)}</span>
            )}
          </div>
          {off > 0 && (
            <span className="mt-1 inline-block rounded bg-[#F5F5F7] px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
              {off}% OFF
            </span>
          )}
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[11px] text-slate-400">EMI from</p>
          <p className="text-sm font-bold text-brand-600">{formatINR(emi)}</p>
          <p className="text-[11px] text-slate-400">/mo</p>
        </div>
      </div>
    </div>
  );
}

export default function CategoryMarquee() {
  return (
    <div className="mt-24">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
          One limit. <span className="text-brand-600">Every category.</span>
        </h2>
        <p className="mt-3 text-lg text-slate-500">Buy what you want, when you want.</p>
      </div>

      {/* right-to-left scrolling cards */}
      <div className="marquee-pause relative mt-10 overflow-hidden">
        <div className="flex w-max animate-marquee-rtl gap-5">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.name} c={c} />
          ))}
          {CATEGORIES.map((c) => (
            <CategoryCard key={`${c.name}-dup`} c={c} />
          ))}
        </div>
        {/* soft edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  );
}
