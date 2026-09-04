import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../lib/api.js';
import { formatINR, discountPct } from '../lib/format.js';
import { Spinner, ErrorState } from '../components/States.jsx';
import EmiCard from '../components/EmiCard.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const { add } = useCart();

  function load() {
    setStatus('loading');
    getProduct(slug)
      .then((data) => {
        setProduct(data);
        setSelectedVariantId(data.variants?.[0]?._id ?? null);
        setSelectedPlanId(null);
        setConfirmed(false);
        setStatus('ready');
      })
      .catch((err) => {
        setError(err.status === 404 ? 'This product does not exist.' : err.message);
        setStatus('error');
      });
  }

  useEffect(load, [slug]);

  const variants = product?.variants ?? [];
  const selectedVariant = useMemo(
    () => variants.find((v) => v._id === selectedVariantId) ?? null,
    [variants, selectedVariantId]
  );
  const selectedPlan = useMemo(
    () => selectedVariant?.emiPlans?.find((p) => p._id === selectedPlanId) ?? null,
    [selectedVariant, selectedPlanId]
  );

  // Unique storage + color options across variants.
  const storages = useMemo(
    () => [...new Set(variants.map((v) => v.storage))],
    [variants]
  );
  const colors = useMemo(() => {
    const map = new Map();
    for (const v of variants) if (!map.has(v.color)) map.set(v.color, v.colorHex);
    return [...map.entries()].map(([color, colorHex]) => ({ color, colorHex }));
  }, [variants]);

  // Resolve a variant when the user switches one dimension, preserving the
  // other dimension where a matching variant exists.
  function pickStorage(storage) {
    const match =
      variants.find((v) => v.storage === storage && v.color === selectedVariant?.color) ||
      variants.find((v) => v.storage === storage);
    if (match) selectVariant(match._id);
  }
  function pickColor(color) {
    const match =
      variants.find((v) => v.color === color && v.storage === selectedVariant?.storage) ||
      variants.find((v) => v.color === color);
    if (match) selectVariant(match._id);
  }
  function selectVariant(id) {
    setSelectedVariantId(id);
    setSelectedPlanId(null); // EMI plans are per-variant, so reset the choice
    setConfirmed(false);
  }

  const storageAvailable = (storage) =>
    variants.some((v) => v.storage === storage && v.color === selectedVariant?.color);
  const colorAvailable = (color) =>
    variants.some((v) => v.color === color && v.storage === selectedVariant?.storage);

  if (status === 'loading') return <Spinner label="Loading product…" />;
  if (status === 'error') {
    return (
      <div className="mx-auto max-w-6xl px-4">
        <ErrorState message={error} onRetry={load} />
        <div className="text-center pb-16">
          <Link to="/" className="text-brand-600 font-medium hover:underline">
            ← Back to all products
          </Link>
        </div>
      </div>
    );
  }

  const off = discountPct(selectedVariant?.mrp, selectedVariant?.price);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav className="text-sm text-slate-500">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{product.name}</span>
      </nav>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="lg:sticky lg:top-20 self-start">
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <img
              src={(() => {
                const s = selectedVariant?.image || product.render || product.image;
                return s.startsWith('/products/') ? `${s}?v=5` : s;
              })()}
              alt={`${product.name}${selectedVariant ? ` — ${selectedVariant.color}` : ''}`}
              className={`w-full aspect-square ${
                selectedVariant?.image || product.render ? 'object-contain p-8' : 'object-cover'
              }`}
            />
          </div>
        </div>

        {/* Details */}
        <div>
          {product.brand && (
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              {product.brand}
            </p>
          )}
          <div className="mt-1 flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {product.name}
            </h1>
            {product.isNew && (
              <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
                New
              </span>
            )}
          </div>
          {product.rating != null && (
            <div className="mt-2 flex items-center gap-1.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#f5b301" aria-hidden="true">
                <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7L12 2z" />
              </svg>
              <span className="text-sm font-semibold text-slate-900">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-slate-400">rating</span>
            </div>
          )}
          {product.description && (
            <p className="mt-2 text-slate-600">{product.description}</p>
          )}

          {/* Pricing */}
          <div className="mt-4 flex items-end gap-3">
            <span className="text-3xl font-bold text-slate-900">
              {formatINR(selectedVariant?.price)}
            </span>
            {selectedVariant?.mrp > selectedVariant?.price && (
              <>
                <span className="text-lg text-slate-400 line-through">
                  {formatINR(selectedVariant.mrp)}
                </span>
                <span className="mb-1 rounded-md bg-emerald-100 px-2 py-0.5 text-sm font-semibold text-emerald-700">
                  {off}% off
                </span>
              </>
            )}
          </div>
          <div className="mt-1 flex gap-4 text-sm text-slate-500">
            <span>MRP: {formatINR(selectedVariant?.mrp)}</span>
            <span>Selling price: {formatINR(selectedVariant?.price)}</span>
          </div>

          {/* Storage */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-700">
              Storage: <span className="text-slate-900">{selectedVariant?.storage}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {storages.map((s) => {
                const active = selectedVariant?.storage === s;
                const available = storageAvailable(s);
                return (
                  <button
                    key={s}
                    onClick={() => pickStorage(s)}
                    className={[
                      'rounded-lg border px-4 py-2 text-sm font-medium transition',
                      active
                        ? 'border-brand-600 bg-brand-50 text-brand-700'
                        : available
                          ? 'border-slate-300 hover:border-brand-400'
                          : 'border-dashed border-slate-200 text-slate-400',
                    ].join(' ')}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color */}
          <div className="mt-5">
            <p className="text-sm font-semibold text-slate-700">
              Color: <span className="text-slate-900">{selectedVariant?.color}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {colors.map(({ color, colorHex }) => {
                const active = selectedVariant?.color === color;
                const available = colorAvailable(color);
                return (
                  <button
                    key={color}
                    onClick={() => pickColor(color)}
                    title={color}
                    className={[
                      'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition',
                      active
                        ? 'border-brand-600 bg-brand-50 text-brand-700'
                        : available
                          ? 'border-slate-300 hover:border-brand-400'
                          : 'border-dashed border-slate-200 text-slate-400',
                    ].join(' ')}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-slate-300"
                      style={{ backgroundColor: colorHex || '#ddd' }}
                    />
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={() =>
              add({
                key: `${product.slug}-${selectedVariant?.storage}-${selectedVariant?.color}`,
                slug: product.slug,
                name: product.name,
                price: selectedVariant?.price ?? product.price,
                image: selectedVariant?.image || product.render || product.image,
                variant: selectedVariant ? `${selectedVariant.storage} · ${selectedVariant.color}` : undefined,
              })
            }
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" /><circle cx="9.5" cy="20" r="1.4" /><circle cx="17.5" cy="20" r="1.4" /></svg>
            Add to cart
          </button>

          {/* Social proof */}
          {product.soldLastMonth > 0 && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-2 text-sm font-medium text-emerald-800 ring-1 ring-emerald-100">
              <span aria-hidden="true">🔥</span>
              <span>
                <strong>{product.soldLastMonth.toLocaleString('en-IN')}</strong> people bought this
                on EMI last month
              </span>
            </div>
          )}

          {/* EMI plans */}
          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold">Choose an EMI plan</h2>
              <span className="text-sm text-slate-500">
                {selectedVariant?.emiPlans?.length ?? 0} options
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedVariant?.emiPlans?.map((plan) => (
                <EmiCard
                  key={plan._id}
                  plan={plan}
                  selected={plan._id === selectedPlanId}
                  onSelect={() => {
                    setSelectedPlanId(plan._id);
                    setConfirmed(false);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Selected plan summary */}
          <SummaryAndProceed
            variant={selectedVariant}
            plan={selectedPlan}
            confirmed={confirmed}
            onProceed={() => setConfirmed(true)}
          />
        </div>
      </div>
    </div>
  );
}

function SummaryAndProceed({ variant, plan, confirmed, onProceed }) {
  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Your selected plan
      </h3>

      {!plan ? (
        <p className="mt-3 text-slate-500">
          Select an EMI plan above to see your monthly breakdown.
        </p>
      ) : (
        <div className="mt-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Stat label="Monthly EMI" value={formatINR(plan.monthlyAmount)} highlight />
            <Stat label="Tenure" value={`${plan.tenure} months`} />
            <Stat
              label="Interest rate"
              value={Number(plan.interestRate) === 0 ? 'No cost' : `${plan.interestRate}% p.a.`}
            />
            <Stat
              label="Cashback"
              value={plan.cashback > 0 ? formatINR(plan.cashback) : '—'}
            />
          </div>
          <p className="mt-3 text-sm text-slate-500">
            {variant?.storage} · {variant?.color} · Total payable{' '}
            <span className="font-medium text-slate-700">
              {formatINR(plan.monthlyAmount * plan.tenure)}
            </span>
          </p>
        </div>
      )}

      <button
        disabled={!plan}
        onClick={onProceed}
        className={[
          'mt-5 w-full rounded-xl px-4 py-3 text-base font-semibold transition',
          plan
            ? 'bg-brand-600 text-white hover:bg-brand-700'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed',
        ].join(' ')}
      >
        {plan ? 'Proceed with EMI' : 'Select a plan to continue'}
      </button>

      {confirmed && plan && (
        <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
          🎉 Great! You chose to pay{' '}
          <strong>{formatINR(plan.monthlyAmount)}/month for {plan.tenure} months</strong>.
          In a real checkout you'd continue to KYC and payment setup here.
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, highlight }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className={highlight ? 'text-lg font-bold text-brand-700' : 'text-lg font-semibold text-slate-900'}>
        {value}
      </p>
    </div>
  );
}
