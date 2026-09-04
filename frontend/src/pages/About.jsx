const TEAM = [
  { name: 'Pranav Aggarwal', role: 'Founder & CEO', linkedin: 'https://in.linkedin.com/in/pranavagg', photo: '/team/pranav-aggarwal.webp' },
  { name: 'Sourabh Girdhar', role: 'Co-Founder & CTO', linkedin: 'https://in.linkedin.com/in/girdharsourabh', photo: '/team/sourabh-girdhar.webp' },
  { name: 'Vikram Pal Bhadu', role: 'Head of Growth', linkedin: 'https://in.linkedin.com/in/vikram-bhadu', photo: '/team/vikram-pal-bhadu.webp' },
  { name: 'Ashish Rana', role: 'Software Development Engineer', linkedin: 'https://in.linkedin.com/in/ashish-rana18', photo: '/team/ashish-rana.webp' },
  { name: 'Arpit Rajput', role: 'Software Development Engineer', linkedin: 'https://in.linkedin.com/in/arpit-rajput-831393213', photo: '/team/arpit-rajput.webp' },
  { name: 'Gursagar Singh', role: 'Software Development Engineer', linkedin: 'https://in.linkedin.com/in/gursagar-singh-629297220', photo: '/team/gursagar-singh.webp' },
];

function LinkedInIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z" />
    </svg>
  );
}

function TeamMember({ member }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* card = image only */}
      <a
        href={member.linkedin}
        target="_blank"
        rel="noreferrer"
        className="group block w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-18px_rgba(76,29,149,0.35)]"
      >
        <img
          src={member.photo}
          alt={member.name}
          className="aspect-square w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
          loading="lazy"
        />
      </a>

      {/* name / role / linkedin — outside the card */}
      <h3 className="mt-5 text-lg font-bold text-slate-900">{member.name}</h3>
      <p className="mt-0.5 text-sm font-semibold text-brand-600">{member.role}</p>
      <a
        href={member.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label={`${member.name} on LinkedIn`}
        className="mt-3 grid h-9 w-9 place-items-center rounded-full text-slate-400 ring-1 ring-slate-200 transition hover:bg-[#0a66c2] hover:text-white hover:ring-[#0a66c2]"
      >
        <LinkedInIcon />
      </a>
    </div>
  );
}

function Hi({ children }) {
  // interactive highlighted phrase
  return (
    <span className="font-semibold text-brand-600 underline decoration-brand-200 decoration-2 underline-offset-4 transition-colors hover:text-brand-700 hover:decoration-brand-500">
      {children}
    </span>
  );
}

export default function About() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 sm:px-8 py-16 lg:py-24">
      {/* Intro */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
        About Us
      </h1>
      <p className="mt-6 max-w-4xl text-2xl sm:text-3xl font-medium leading-snug tracking-tight text-slate-800">
        We are building the next generation of <Hi>smart borrowing</Hi> — simple, transparent, and
        powered by your <Hi>Mutual Funds</Hi>. We believe access to money should be{' '}
        <Hi>fast &amp; affordable</Hi>.
      </p>

      {/* Team */}
      <div className="mt-20 text-center">
        <span className="inline-block rounded-full border border-slate-300 bg-transparent px-5 py-1.5 text-sm font-semibold text-slate-700">
          Meet our team
        </span>
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          We are the people building <span className="text-brand-600">1Fi</span>
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((member) => (
          <TeamMember key={member.name} member={member} />
        ))}
      </div>

      {/* Join us */}
      <div className="mt-20 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-700 px-8 py-12 text-center text-white sm:px-12">
        <h2 className="text-2xl sm:text-3xl font-bold">Want to join our team?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-brand-50/90">
          We're always looking for talented people who share our vision of making smart borrowing
          accessible to everyone.
        </p>
        <a
          href="mailto:careers@1fi.com"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-lg shadow-black/10 transition hover:bg-white/90"
        >
          Get in Touch
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Follow us */}
      <div className="mt-16 flex flex-col items-center gap-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Follow Us</p>
        <div className="flex items-center gap-3">
          <a
            href="#"
            aria-label="LinkedIn"
            className="grid h-11 w-11 place-items-center rounded-full text-slate-500 ring-1 ring-slate-200 transition hover:bg-[#0a66c2] hover:text-white hover:ring-[#0a66c2]"
          >
            <LinkedInIcon />
          </a>
          <a
            href="#"
            aria-label="X"
            className="grid h-11 w-11 place-items-center rounded-full text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-900 hover:text-white hover:ring-slate-900"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8-9.2L1 2h7l4.8 6.3zm-2.4 18h1.9L7.6 3.9H5.6z" /></svg>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="grid h-11 w-11 place-items-center rounded-full text-slate-500 ring-1 ring-slate-200 transition hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-amber-500 hover:text-white hover:ring-transparent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
