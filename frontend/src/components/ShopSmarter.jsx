import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatINR, discountPct } from '../lib/format.js';
import { Spinner, ErrorState } from './States.jsx';
import EmiPlanner from './EmiPlanner.jsx';
import CategoryMarquee from './CategoryMarquee.jsx';
import BackedBy from './BackedBy.jsx';
import Testimonials from './Testimonials.jsx';
import Faq from './Faq.jsx';

const TABS = ['All Brands', 'OnePlus', 'Apple', 'Samsung', 'Google'];

// Curated "Trending phones" shown on the All Brands tab — Apple (black) first,
// then a flagship from each other brand.
const TRENDING = ['iphone-17', 'oneplus-13', 'samsung-s24-ultra', 'google-pixel-9-pro'];

// Fixed order for the Best sellers row.
const BEST_SELLERS = ['nike-air-jordan-1-mid', 'macbook-air', 'urbanista-miami', 'boat-stone-1450'];

// Clean, neutral placeholder so real product renders can be dropped into the
// large image area later without touching the layout.
function PhonePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg width="132" height="200" viewBox="0 0 132 200" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="130" height="198" rx="24" fill="#FBFBFD" stroke="#EAEAEA" strokeWidth="1.5" />
        <rect x="13" y="16" width="106" height="156" rx="12" fill="#F3F3F5" />
        <rect x="49" y="8" width="34" height="5" rx="2.5" fill="#E4E4E9" />
        <circle cx="66" cy="185" r="4" fill="#E4E4E9" />
      </svg>
    </div>
  );
}

function ProductShowcaseCard({ product }) {
  const off = discountPct(product.mrp, product.price);
  const startingFrom = Math.round(product.price / 24); // lowest monthly (24-mo)

  return (
    <div className="group flex flex-col rounded-[24px] border border-[#EAEAEA] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.15)]">
      {/* Large image area — real render on white, or a clean placeholder */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[24px] bg-white">
        {product.isNew && (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
            New
          </span>
        )}
        {product.render ? (
          <img
            src={`${product.render}?v=5`}
            alt={product.name}
            className="h-full w-full object-contain p-6"
            loading="lazy"
          />
        ) : (
          <PhonePlaceholder />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[20px] font-semibold leading-snug text-slate-900">
            {product.name}
          </h3>
          {product.rating != null && (
            <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-900">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#f5b301" aria-hidden="true">
                <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7L12 2z" />
              </svg>
              {product.rating.toFixed(1)}
            </span>
          )}
        </div>

        <div className="mt-3">
          <p className="text-[28px] font-bold leading-none text-slate-900">
            {formatINR(product.price)}
          </p>
          <div className="mt-2 flex items-center gap-2.5">
            {product.mrp > product.price && (
              <span className="text-[15px] text-slate-400 line-through">
                {formatINR(product.mrp)}
              </span>
            )}
            {off > 0 && (
              <span className="rounded-md bg-[#F5F5F7] px-2 py-0.5 text-xs font-medium text-slate-600">
                {off}% OFF
              </span>
            )}
          </div>
        </div>

        <p className="mt-4 text-[16px] font-medium text-slate-500">
          EMI starting from{' '}
          <span className="text-slate-900">{formatINR(startingFrom)}/mo</span>
        </p>

        <Link
          to={`/products/${product.slug}`}
          className="mt-6 inline-flex items-center justify-center rounded-full border border-slate-900 px-6 py-3 text-[15px] font-medium text-slate-900 transition-colors duration-200 hover:bg-slate-900 hover:text-white"
        >
          View EMI Options
        </Link>
      </div>
    </div>
  );
}

export default function ShopSmarter({ products = [], status = 'ready', error = '', onRetry }) {
  const [tab, setTab] = useState('All Brands');

  const phones = products.filter((p) => p.category !== 'accessory');
  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));
  const bestSellers = BEST_SELLERS.map((s) => bySlug[s]).filter(Boolean);

  const isAllBrands = tab === 'All Brands';
  let list;
  if (isAllBrands) {
    list = TRENDING.map((s) => bySlug[s]).filter(Boolean);
  } else {
    list = phones.filter((p) => p.brand === tab);
  }

  return (
    <section id="products" className="relative overflow-hidden scroll-mt-24 bg-white">
      {/* soft purple glow that mixes into the bottom of the page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[560px] bg-[radial-gradient(75%_100%_at_50%_115%,rgba(109,40,217,0.22),rgba(124,58,237,0.08)_45%,transparent_72%)]" />
      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8 py-20 lg:py-28">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
          Start shopping smarter.{' '}
          <span className="text-slate-400">Own it now, pay over time.</span>
        </h2>

        {/* EMI calculator */}
        <EmiPlanner />

        {status === 'loading' && <Spinner label="Loading products…" />}
        {status === 'error' && <ErrorState message={error} onRetry={onRetry} />}

        {status === 'ready' && (
          <>
            {/* Best sellers */}
            {bestSellers.length > 0 && (
              <div className="mt-12">
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                  Best sellers
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {bestSellers.map((p) => (
                    <ProductShowcaseCard key={p._id} product={p} />
                  ))}
                </div>
              </div>
            )}

            {/* Trending phones */}
            <h3 className="mt-16 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Trending phones
            </h3>

            {/* Brand tabs */}
            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-slate-100 pb-1">
              {TABS.map((t) => {
                const active = t === tab;
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={[
                      'relative pb-3 text-[17px] transition-colors',
                      active ? 'font-semibold text-slate-900' : 'font-normal text-slate-500 hover:text-slate-900',
                    ].join(' ')}
                  >
                    {t}
                    {active && (
                      <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-slate-900" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Phone grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((p) => (
                <ProductShowcaseCard key={p._id} product={p} />
              ))}
            </div>
            {list.length === 0 && (
              <p className="mt-8 text-slate-500">No products for this brand yet.</p>
            )}

            {/* Before / After — the product changes, not your portfolio */}
            <div className="mt-24 text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                What changes? The product.{' '}
                <span className="text-slate-400">Not your portfolio.</span>
              </h2>
              <p className="mt-3 text-lg text-slate-500">
                Flexible EMIs backed by your mutual funds.
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-3xl">
              <img
                src="/hero-before-after.png"
                alt="Before: pay ₹24,900 upfront, break your savings, wait to save up. After: pay ₹2,075/mo at 0% interest, your mutual funds stay invested, own it today."
                className="block w-full h-auto"
                draggable="false"
              />
            </div>

            {/* One limit. Every category. */}
            <CategoryMarquee />

            {/* Our valued partners */}
            <div className="mt-12">
              <img
                src="/partners.png"
                alt="Trusted by the best — our valued partners: Tata Capital, DSP Finance, KFintech, Bajaj Finserv, CAMS and DigiLocker."
                className="block w-full h-auto rounded-3xl"
                draggable="false"
              />
            </div>

            {/* Backed by investors & builders (3D logo ring) */}
            <BackedBy />

            {/* Testimonials */}
            <Testimonials />

            {/* FAQs */}
            <Faq />

            {/* Closing statement */}
            <div className="mt-28 text-center">
              <h2 className="mx-auto max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
                <span className="text-slate-900">Your wishlist works better</span>{' '}
                <span className="text-slate-400">with 1Fi.</span>
              </h2>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
