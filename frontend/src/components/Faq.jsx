import { useState } from 'react';

const FAQS = [
  {
    q: 'What is 1Fi?',
    a: '1Fi lets you shop now and pay later using your mutual funds as collateral. You get no-cost EMIs while your investments stay invested and keep compounding.',
  },
  {
    q: 'Is 1Fi safe and legit?',
    a: 'Yes. 1Fi works with SEBI-approved RTAs for pledging and RBI-regulated lending partners for loans.',
  },
  {
    q: 'What documents are needed to take a loan?',
    a: 'Just your PAN and mobile number to check eligibility. Pledging is completed fully digitally via CAMS, KFin, or MFCentral — no physical paperwork or branch visits.',
  },
  {
    q: 'Are there any hidden fees?',
    a: 'No. There is 0% interest, no processing fees, no downpayment, and no foreclosure charges.',
  },
  {
    q: 'What if markets fall?',
    a: 'Your mutual funds stay invested. If the pledged value drops significantly, you may be asked to pledge a little more or pay down part of the loan — but your monthly EMI stays the same.',
  },
  {
    q: 'Are there any charges if I pay early to release pledged units?',
    a: 'No. You can foreclose anytime by paying just the outstanding amount, with zero foreclosure charges, and your pledged units are released.',
  },
];

function Item({ f, open, onToggle }) {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-lg font-semibold text-slate-900">{f.q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${
            open ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="pr-12 text-slate-500 leading-relaxed">{f.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mt-28">
      <div className="text-center">
        <span className="inline-block rounded-full border border-slate-300 px-5 py-1.5 text-sm font-semibold text-slate-700">
          FAQs
        </span>
        <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Everything you need to know,
          <br />
          <span className="text-brand-600">at a glance</span>
        </h2>
        <a
          href="https://1fi.in/faq"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:gap-2.5 transition-all"
        >
          View All FAQs
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        {FAQS.map((f, i) => (
          <Item key={f.q} f={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>
    </div>
  );
}
