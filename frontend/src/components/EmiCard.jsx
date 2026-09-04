import { formatINR } from '../lib/format.js';

export default function EmiCard({ plan, selected, onSelect }) {
  const noCost = Number(plan.interestRate) === 0;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        'text-left rounded-xl border p-4 transition focus:outline-none focus:ring-2 focus:ring-brand-500',
        selected
          ? 'border-brand-600 ring-2 ring-brand-500 bg-brand-50'
          : 'border-slate-200 bg-white hover:border-brand-300',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-lg font-bold text-slate-900">
            {formatINR(plan.monthlyAmount)}
            <span className="text-sm font-normal text-slate-500">/mo</span>
          </p>
          <p className="text-sm text-slate-500">
            {plan.tenure} months tenure
          </p>
        </div>
        <span
          className={[
            'grid place-items-center h-5 w-5 rounded-full border text-white text-xs',
            selected ? 'bg-brand-600 border-brand-600' : 'border-slate-300',
          ].join(' ')}
          aria-hidden="true"
        >
          {selected ? '✓' : ''}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {noCost ? (
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            No Cost EMI
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {plan.interestRate}% interest p.a.
          </span>
        )}
        {plan.cashback > 0 && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
            {formatINR(plan.cashback)} cashback
          </span>
        )}
      </div>
    </button>
  );
}
