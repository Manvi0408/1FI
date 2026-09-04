import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts } from '../lib/api.js';
import { formatINR, discountPct } from '../lib/format.js';
import { Spinner, ErrorState } from '../components/States.jsx';

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim();
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
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

  const needle = q.toLowerCase();
  const results = q
    ? products.filter((p) =>
        [p.name, p.brand, p.category].filter(Boolean).some((s) => s.toLowerCase().includes(needle))
      )
    : [];

  return (
    <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-14">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
        Search results
      </h1>
      <p className="mt-2 text-slate-500">
        {q ? (
          <>
            {results.length} result{results.length === 1 ? '' : 's'} for{' '}
            <span className="font-semibold text-slate-900">“{q}”</span>
          </>
        ) : (
          'Type something in the search bar to find products.'
        )}
      </p>

      {status === 'loading' && <Spinner label="Searching…" />}
      {status === 'error' && <ErrorState message={error} onRetry={load} />}

      {status === 'ready' && q && results.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-lg font-semibold text-slate-700">No products found</p>
          <p className="mt-1 text-slate-400">Try “iPhone”, “Samsung”, “laptop” or a brand name.</p>
          <Link to="/" className="mt-6 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
            Back to home
          </Link>
        </div>
      )}

      {status === 'ready' && results.length > 0 && (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((p) => {
            const off = discountPct(p.mrp, p.price);
            return (
              <div key={p._id} className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <Link to={`/products/${p.slug}`} className="block aspect-square bg-white">
                  {p.render ? (
                    <img src={p.render} alt={p.name} className="h-full w-full object-contain p-6" />
                  ) : (
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{p.brand}</p>
                  <h3 className="mt-0.5 font-bold text-slate-900">{p.name}</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-slate-900">{formatINR(p.price)}</span>
                    {off > 0 && <span className="text-sm text-slate-400 line-through">{formatINR(p.mrp)}</span>}
                  </div>
                  <Link
                    to={`/products/${p.slug}`}
                    className="mt-auto inline-flex items-center justify-center rounded-full border border-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
                  >
                    View EMI Options
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
