const BENEFITS = [
  {
    title: 'Instant approvals',
    desc: 'Get your eligible credit limit in minutes with a fully digital onboarding process — no branch visits, no waiting.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg>
    ),
  },
  {
    title: 'Keep earning returns',
    desc: 'Your mutual funds remain invested and continue compounding while you borrow.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8" /><path d="M17 7h4v4" /></svg>
    ),
  },
  {
    title: 'Zero downpayment',
    desc: 'No downpayment for purchasing any of the products.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /></svg>
    ),
  },
  {
    title: '0% interest',
    desc: 'Get your favourite products on No-Cost EMIs.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 5 5 19" /><circle cx="7.5" cy="7.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg>
    ),
  },
  {
    title: 'Zero foreclosure charges',
    desc: 'Close your loan anytime by just paying the outstanding amount.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 7-2.6" /></svg>
    ),
  },
  {
    title: 'Long EMI tenures',
    desc: 'Select EMI tenures from 3 months to 10 years — without any CIBIL check.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
    ),
  },
];

function BenefitCard({ b, index }) {
  return (
    <div
      className="reveal-3d group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_20px_44px_-20px_rgba(76,29,149,0.4)]"
      style={{ animationDelay: `${index * 110}ms` }}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-600 transition-transform duration-300 group-hover:scale-x-100" />
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
        {b.icon}
      </span>
      <h3 className="mt-5 text-lg font-bold text-slate-900">{b.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{b.desc}</p>
    </div>
  );
}

export default function KeyBenefits() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 lg:py-24">
      <div className="text-center">
        <span className="inline-block rounded-full border border-slate-300 px-5 py-1.5 text-sm font-semibold text-slate-700">
          Key Benefits
        </span>
        <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
          The smartest way to<br />
          <span className="text-brand-600">spend &amp; keep earning</span>
        </h1>
        <a
          href="/#products"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700"
        >
          Shop Now
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((b, i) => (
          <BenefitCard key={b.title} b={b} index={i} />
        ))}
      </div>
    </div>
  );
}
