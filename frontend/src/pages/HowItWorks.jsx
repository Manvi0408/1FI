const STEPS = [
  {
    n: '01',
    title: 'Choose product & payment plan',
    desc: 'Select EMI tenures from 3 months to 10 years for your favourite devices.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" /><circle cx="9.5" cy="20" r="1.4" /><circle cx="17.5" cy="20" r="1.4" /></svg>
    ),
  },
  {
    n: '02',
    title: 'Check your eligibility',
    desc: 'Get your eligibility checked within 10 seconds using your PAN and mobile number.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" /><path d="M9 12l2 2 4-4" /></svg>
    ),
  },
  {
    n: '03',
    title: 'Pledge mutual funds',
    desc: 'Pledge your mutual funds seamlessly and securely via CAMS, KFin, or MFCentral.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /><circle cx="12" cy="15.5" r="1.4" /></svg>
    ),
  },
  {
    n: '04',
    title: 'Complete your purchase',
    desc: 'Have your device delivered, and repay the amount at your own terms.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l9-4 9 4-9 4-9-4Z" /><path d="M3 7v10l9 4 9-4V7" /><path d="M12 11v10" /></svg>
    ),
  },
];

function StepCard({ step, index }) {
  return (
    <div
      className="reveal-3d group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_20px_44px_-20px_rgba(76,29,149,0.4)]"
      style={{ animationDelay: `${index * 130}ms` }}
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-600 transition-transform duration-300 group-hover:scale-x-100" />
      <span className="text-5xl font-extrabold leading-none text-slate-100 transition-colors duration-300 group-hover:text-brand-100">
        {step.n}
      </span>
      <span className="mt-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
        {step.icon}
      </span>
      <h3 className="mt-5 text-lg font-bold text-slate-900">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 lg:py-24">
      <div className="text-center">
        <span className="inline-block rounded-full border border-slate-300 px-5 py-1.5 text-sm font-semibold text-slate-700">
          How it works
        </span>
        <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Shop using mutual funds
        </h1>
        <p className="mt-2 text-xl sm:text-2xl font-medium text-slate-400">in 4 easy steps</p>
      </div>

      <div className="relative mt-16">
        <div className="pointer-events-none absolute left-0 right-0 top-[92px] hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <StepCard key={step.n} step={step} index={i} />
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <a
          href="/#products"
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700"
        >
          Start Shopping
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </div>
  );
}
