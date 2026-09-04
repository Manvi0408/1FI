import { useMemo, useState } from 'react';
import { formatINR } from '../lib/format.js';

const TENURES = [6, 12, 24, 36, 48];
const MIN = 10000;
const MAX = 200000;
const MF_RETURN = 0.16; // 16% p.a. expected mutual-fund return
const LIEN_RATIO = 1.25; // collateral required against the loan

function useEmi(amount, tenure) {
  return useMemo(() => {
    const monthlyEmi = Math.round(amount / tenure);
    const lien = Math.round(amount * LIEN_RATIO);
    const futureValue = Math.round(amount * Math.pow(1 + MF_RETURN, tenure / 12));
    const mfGain = futureValue - amount;
    const interestCost = 0;
    const processingFees = 0;
    const cashback = 0;
    const youSave = mfGain + cashback - interestCost - processingFees;
    const effectiveCost = amount - youSave;
    return {
      monthlyEmi,
      lien,
      futureValue,
      mfGain,
      interestCost,
      processingFees,
      cashback,
      youSave,
      effectiveCost,
    };
  }, [amount, tenure]);
}

function Stat({ label, value, sub, highlight }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
      <p className={highlight ? 'mt-1 text-2xl font-bold text-brand-600' : 'mt-1 text-2xl font-bold text-slate-900'}>
        {value}
      </p>
      {sub && <p className="text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

export default function EmiPlanner() {
  const [amount, setAmount] = useState(80000);
  const [tenure, setTenure] = useState(24);
  const [open, setOpen] = useState(false);
  const r = useEmi(amount, tenure);
  const pct = ((amount - MIN) / (MAX - MIN)) * 100;

  return (
    <section className="mt-16">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
        Plan your EMI before you shop
      </h2>
      <p className="mt-2 max-w-2xl text-slate-500">
        See your monthly EMI, eligible purchase amount and required lien upfront — so you know
        exactly what you can afford.
      </p>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Inputs */}
          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-slate-500">Purchase Amount</span>
              <span className="text-3xl font-extrabold text-slate-900">{formatINR(amount)}</span>
            </div>

            <input
              type="range"
              min={MIN}
              max={MAX}
              step={1000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-4 w-full cursor-pointer appearance-none rounded-full bg-transparent
                         [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full
                         [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-1.5
                         [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-brand-600
                         [&::-webkit-slider-thumb]:shadow"
              style={{
                background: `linear-gradient(to right, #6d28d9 ${pct}%, #e5e7eb ${pct}%)`,
                height: '8px',
                borderRadius: '9999px',
              }}
            />
            <div className="mt-2 flex justify-between text-xs text-slate-400">
              <span>{formatINR(MIN)}</span>
              <span>{formatINR(MAX)}</span>
            </div>

            <p className="mt-8 text-sm font-medium text-slate-500">Tenure (Months)</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TENURES.map((t) => {
                const active = t === tenure;
                return (
                  <button
                    key={t}
                    onClick={() => setTenure(t)}
                    className={[
                      'rounded-xl px-4 py-2 text-sm font-semibold transition',
                      active
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                    ].join(' ')}
                  >
                    {t} mo
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
              <Stat label="Monthly EMI" value={`${formatINR(r.monthlyEmi)}`} highlight />
              <Stat label="Interest Rate" value="0% p.a." />
              <Stat label="Lien Required" value={formatINR(r.lien)} />
            </div>
          </div>

          {/* Financial summary */}
          <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-slate-50 p-6 sm:p-8 ring-1 ring-brand-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Financial Summary</h3>
              <span className="rounded-full bg-brand-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Recommended
              </span>
            </div>

            <div className="mt-5">
              <p className="text-sm text-slate-500">Monthly EMI</p>
              <p className="text-4xl font-extrabold text-slate-900">{formatINR(r.monthlyEmi)}</p>
              <p className="text-sm text-slate-500">for {tenure} months</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white p-4">
                <p className="text-xs text-slate-500">You Save</p>
                <p className="mt-1 text-xl font-bold text-emerald-600">{formatINR(r.youSave)}</p>
                <p className="text-xs text-slate-400">vs paying upfront</p>
              </div>
              <div className="rounded-xl bg-white p-4">
                <p className="text-xs text-slate-500">Effective Cost</p>
                <p className="mt-1 text-xl font-bold text-slate-900">{formatINR(r.effectiveCost)}</p>
                <p className="text-xs text-slate-400">after MF growth</p>
              </div>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-900 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-900 hover:text-white"
            >
              View breakdown
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && <BreakdownModal r={r} amount={amount} tenure={tenure} onClose={() => setOpen(false)} />}
    </section>
  );
}

function Row({ label, value, positive, muted }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
      <span className="text-sm text-slate-600">{label}</span>
      <span className={`text-sm font-semibold ${positive ? 'text-emerald-600' : muted ? 'text-slate-500' : 'text-slate-900'}`}>
        {value}
      </span>
    </div>
  );
}

function LogicStep({ n, title, rows }) {
  return (
    <div className="rounded-xl bg-white/70 p-4 ring-1 ring-black/5">
      <div className="flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">{n}</span>
        <span className="text-sm font-semibold text-slate-900">{title}</span>
      </div>
      <div className="mt-3 space-y-1.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm">
            <span className="text-slate-500">{k}</span>
            <span className="font-medium text-slate-900">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BreakdownModal({ r, amount, tenure, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white/80 backdrop-blur-2xl ring-1 ring-white/60 shadow-2xl">
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-black/5">
          <h3 className="text-lg font-bold text-slate-900">How your EMI works</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full text-slate-600 hover:bg-black/5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-2">
          {/* Breakdown */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500">Breakdown</h4>
            <div className="mt-3">
              <Row label="Interest Cost" value={`−${formatINR(r.interestCost)}`} muted />
              <Row label="Processing Fees" value={`−${formatINR(r.processingFees)}`} muted />
              <Row label="Cashback" value={`+${formatINR(r.cashback)}`} muted />
              <Row label="MF Investment Gain" value={`+${formatINR(r.mfGain)}`} positive />
            </div>
            <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800 ring-1 ring-emerald-100">
              Your mutual fund returns exceed the loan costs, making EMI the smarter choice.
            </div>
          </div>

          {/* Calculation logic */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-500">Calculation Logic</h4>
            <div className="mt-3 space-y-3">
              <LogicStep
                n={1}
                title="Loan"
                rows={[
                  ['Principal', formatINR(amount)],
                  ['Rate (mo)', '0.000%'],
                  ['Interest', formatINR(r.interestCost)],
                ]}
              />
              <LogicStep
                n={2}
                title="Investment"
                rows={[
                  ['Invested', formatINR(amount)],
                  ['Return (p.a.)', '16%'],
                  ['Future Value', formatINR(r.futureValue)],
                ]}
              />
              <LogicStep
                n={3}
                title="Net Result"
                rows={[
                  ['MF Gain', `+${formatINR(r.mfGain)}`],
                  ['Loan Cost', `−${formatINR(r.interestCost)}`],
                  ['Cashback', `+${formatINR(r.cashback)}`],
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
