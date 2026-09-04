const TESTIMONIALS = [
  { name: 'Aditi Sharma', text: 'I was a little confused in the beginning with this new concept of 0% EMI using mutual funds, but the overall experience with 1Fi was actually very straightforward.' },
  { name: 'Harshit Agarwal', text: 'What I liked most is that I could keep my investments and still get liquidity. This was exactly what I was looking for.' },
  { name: 'Zain Khan', text: "I think it's one of the smartest ways to get a loan. You keep earning returns on your investments while paying 0% interest on the loan. Still not sure how 1Fi is making money 😄" },
  { name: 'Rishika Patel', text: 'Really appreciate that I can see my outstanding amount anytime in the app. Makes it very easy to keep track.' },
  { name: 'Varun Mehta', text: 'The app is completely anxiety free. I can see all my loans, pledge mutual funds, check my available limit and everything else in one place. Best part is there are no penalty charges.' },
  { name: 'Rohit Mehra', text: 'Overall, a really good experience with 1Fi. Easy process, clear communication and whenever I had a question, the support team actually helped.' },
  { name: 'Sneha Kulkarni', text: 'The app is simple to use. Everything from pledging funds to getting the loan was smooth.' },
];

function Card({ t }) {
  return (
    <div className="flex w-[360px] shrink-0 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <p className="text-[15px] leading-relaxed text-slate-700">“{t.text}”</p>
      <p className="mt-5 text-sm font-bold text-slate-900">{t.name}</p>
    </div>
  );
}

function Row({ items, dir }) {
  return (
    <div className="marquee-pause relative overflow-hidden">
      <div className={`flex w-max items-stretch gap-5 ${dir === 'rtl' ? 'animate-marquee-rtl' : 'animate-marquee'}`}>
        {items.map((t) => (
          <Card key={t.name} t={t} />
        ))}
        {items.map((t) => (
          <Card key={`${t.name}-dup`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const top = TESTIMONIALS.slice(0, half);
  const bottom = TESTIMONIALS.slice(half);
  return (
    <div className="mt-28">
      <div className="text-center">
        <span className="inline-block rounded-full border border-slate-300 px-5 py-1.5 text-sm font-semibold text-slate-700">
          Testimonials
        </span>
        <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Why People <span className="text-brand-600">Love Us</span>
        </h2>
      </div>

      <div className="relative mt-12 space-y-5">
        {/* top row: right → left */}
        <Row items={top} dir="rtl" />
        {/* bottom row: left → right */}
        <Row items={bottom} dir="ltr" />
        {/* soft edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  );
}
