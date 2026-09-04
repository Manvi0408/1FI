import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { formatINR } from '../lib/format.js';

export default function CartDrawer() {
  const { items, remove, setQty, total, open, setOpen, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  const close = () => {
    setOpen(false);
    // reset the success state after the drawer has slid out
    setTimeout(() => setPlaced(false), 300);
  };

  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            {placed ? 'Order confirmed' : `Your cart (${items.length})`}
          </h2>
          <button
            onClick={close}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>

        {placed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">You're all set!</h3>
            <p className="text-sm text-slate-500">
              Your EMI order has been placed. Next you'd complete a quick KYC and pledge your mutual
              funds — with 0% interest and no downpayment.
            </p>
            <button
              onClick={() => {
                clear();
                close();
              }}
              className="mt-2 w-full rounded-xl bg-brand-600 px-4 py-3.5 text-base font-semibold text-white transition hover:bg-brand-700"
            >
              Continue shopping
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center px-6">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-400">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" /><circle cx="9.5" cy="20" r="1.4" /><circle cx="17.5" cy="20" r="1.4" /></svg>
            </div>
            <p className="font-semibold text-slate-700">Your cart is empty</p>
            <p className="text-sm text-slate-400">Add a product to get started.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((it) => (
                <div key={it.key} className="flex gap-4 border-b border-slate-100 py-4 last:border-0">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-white">
                    {it.image && <img src={it.image} alt={it.name} className="h-full w-full object-contain p-1" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">{it.name}</p>
                    {it.variant && <p className="text-xs text-slate-400">{it.variant}</p>}
                    <p className="mt-0.5 text-sm font-bold text-slate-900">{formatINR(it.price)}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-lg border border-slate-200">
                        <button onClick={() => setQty(it.key, it.qty - 1)} className="grid h-7 w-7 place-items-center text-slate-500 hover:text-slate-900">−</button>
                        <span className="w-6 text-center text-sm font-medium">{it.qty}</span>
                        <button onClick={() => setQty(it.key, it.qty + 1)} className="grid h-7 w-7 place-items-center text-slate-500 hover:text-slate-900">+</button>
                      </div>
                      <button onClick={() => remove(it.key)} className="text-xs font-medium text-slate-400 hover:text-red-500">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Subtotal</span>
                <span className="text-xl font-extrabold text-slate-900">{formatINR(total)}</span>
              </div>
              <p className="mt-1 flex items-center justify-between text-sm text-slate-500">
                <span>EMI from</span>
                <span className="font-semibold text-brand-600">{formatINR(Math.round(total / 24))}/mo</span>
              </p>
              <button
                onClick={() => setPlaced(true)}
                className="mt-4 w-full rounded-xl bg-brand-600 px-4 py-3.5 text-base font-semibold text-white transition hover:bg-brand-700"
              >
                Checkout on EMI
              </button>
              <p className="mt-2 text-center text-xs text-slate-400">Pay in easy EMIs backed by your mutual funds.</p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
