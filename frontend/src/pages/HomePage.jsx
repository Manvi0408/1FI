import { useEffect, useState } from 'react';
import { getProducts } from '../lib/api.js';
import ShopSmarter from '../components/ShopSmarter.jsx';

const FEATURES = [
  {
    title: ['Backed by your', 'mutual funds'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="12" width="3.4" height="7" rx="1" fill="currentColor" />
        <rect x="10.3" y="8" width="3.4" height="11" rx="1" fill="currentColor" />
        <rect x="16.6" y="4" width="3.4" height="15" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: ['Instant approval', '& fast checkout'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: ['Secure, simple', '& transparent'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" fill="currentColor" />
      </svg>
    ),
  },
];

function scrollToProducts() {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

const TAGLINES = [
  'NO-COST EMIs',
  'MUTUAL FUND BACKED',
  'SHOP NOW PAY LATER',
  'INVESTMENTS THAT WORK FOR YOU',
  'ZERO HIDDEN COSTS',
  'FLEXIBLE TENURES',
  'SMART FINANCING',
];

function TickerLine() {
  return (
    <div className="flex shrink-0 items-center">
      {TAGLINES.map((t) => (
        <span
          key={t}
          className="flex items-center text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-slate-900"
        >
          {t}
          <span className="mx-4 text-violet-400">•</span>
        </span>
      ))}
    </div>
  );
}

const SLIDE_COUNT = 2;
const SLIDE_MS = 4000;

function Hero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % SLIDE_COUNT), SLIDE_MS);
    return () => clearInterval(t);
  }, [paused, idx]);

  // Carousel matches the hero card image's aspect so it fills with no cropping.
  const heightCls = 'aspect-[1312/622]';

  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-slate-100 shadow-[0_24px_70px_-34px_rgba(76,29,149,0.35)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`flex ${heightCls} transition-transform duration-700 ease-out`}
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {/* Slide 1 — Shop now, pay later (mockup banner image) */}
        <div className="relative w-full flex-shrink-0 h-full bg-white">
          <img
            src="/hero.png"
            alt="Shop now, pay later — no credit score needed. Just your mutual funds. Unlock affordable credit backed by your mutual fund investments."
            className="h-full w-full object-cover"
            draggable="false"
          />
          {/* transparent, functional overlay over the drawn Start Shopping button */}
          <button
            onClick={scrollToProducts}
            aria-label="Start Shopping"
            className="absolute rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            style={{ left: '3%', top: '85.5%', width: '16.5%', height: '11%' }}
          />
        </div>

        {/* Slide 2 — Before / After banner */}
        <div className="w-full flex-shrink-0 h-full">
          <img
            src="/hero-before-after.png"
            alt="Before: pay ₹24,900 upfront and break your savings. After: pay ₹2,075/mo at 0% interest while your mutual funds stay invested — own it today."
            className="h-full w-full object-cover"
            draggable="false"
          />
        </div>
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous slide"
        onClick={() => setIdx((p) => (p - 1 + SLIDE_COUNT) % SLIDE_COUNT)}
        className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-white/80 text-slate-700 shadow hover:bg-white transition"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={() => setIdx((p) => (p + 1) % SLIDE_COUNT)}
        className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-10 w-10 rounded-full bg-white/80 text-slate-700 shadow hover:bg-white transition"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: SLIDE_COUNT }).map((_, d) => (
          <button
            key={d}
            aria-label={`Go to slide ${d + 1}`}
            onClick={() => setIdx(d)}
            className={`h-2.5 rounded-full transition-all ${
              d === idx ? 'w-6 bg-brand-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState('');

  function load() {
    setStatus('loading');
    getProducts()
      .then((data) => {
        setProducts(data);
        setStatus('ready');
      })
      .catch((err) => {
        setError(err.message);
        setStatus('error');
      });
  }

  useEffect(load, []);

  return (
    <div>
      {/* Hero image (caption baked in), fading its own dark bottom into white */}
      <div className="relative w-full overflow-hidden">
        <img
          src="/hero-shop.png?v=5"
          alt="Shop today, pay later using mutual funds. New — no-cost EMIs backed by mutual funds. No credit score required. No interest. Fully backed by your investments."
          className="block w-full h-auto"
          draggable="false"
        />
        {/* transparent, functional overlay over the drawn Start Shopping button */}
        <button
          onClick={scrollToProducts}
          aria-label="Start Shopping"
          className="absolute rounded-full focus:outline-none focus:ring-2 focus:ring-white/70"
          style={{ left: '37%', top: '70%', width: '26%', height: '11%' }}
        />
        {/* seamless fade of the actual (dark) image pixels into the white section */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-[92%] to-white to-100%" />
      </div>

      {/* Scrolling tagline ticker, sitting in the white/purple blend */}
      <div className="relative z-10 -mt-3 overflow-hidden bg-white py-3">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          <TickerLine />
          <TickerLine />
        </div>
      </div>

      {/* Apple-style product showcase (full-width white section) */}
      <ShopSmarter products={products} status={status} error={error} onRetry={load} />
    </div>
  );
}
