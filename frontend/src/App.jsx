import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext.jsx';
import CartDrawer from './components/CartDrawer.jsx';

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Catalog', to: '/' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Key Benefits', to: '/key-benefits' },
  { label: 'FAQs', to: '#' },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center shrink-0" aria-label="1Fi home">
      <span className="grid place-items-center h-12 w-12 rounded-2xl bg-brand-600 text-white shadow-sm">
        <svg width="30" height="30" viewBox="0 0 44 44" fill="none" aria-hidden="true">
          {/* up arrow */}
          <path
            d="M12 32 V15 M12 15 L8 20 M12 15 L16 20"
            stroke="white"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Fi wordmark */}
          <text
            x="19"
            y="32"
            fill="white"
            fontFamily="'Segoe UI', system-ui, sans-serif"
            fontSize="22"
            fontWeight="800"
          >
            Fi
          </text>
        </svg>
      </span>
    </Link>
  );
}

function Header() {
  const { pathname } = useLocation();
  const light = pathname === '/'; // overlay the gradient hero on the home page
  const navigate = useNavigate();
  const { count, setOpen } = useCart();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
    setMenuOpen(false);
  };

  return (
    <header
      className={
        light
          ? 'absolute top-0 inset-x-0 z-30'
          : 'sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200/80'
      }
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <div className="relative flex items-center gap-4 h-[88px]">
          <Logo />

          {/* Centered Apple-glass nav pill */}
          <nav
            className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 rounded-full p-1.5 ${
              light
                ? 'bg-white/10 backdrop-blur-md ring-1 ring-white/20 shadow-lg shadow-black/5'
                : 'bg-slate-100 ring-1 ring-slate-200'
            }`}
          >
            {NAV.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => {
                  const active = isActive && item.to !== '#' && item.label !== 'Catalog';
                  return [
                    'rounded-full px-4 py-2 text-[15px] font-medium transition-colors',
                    light
                      ? active ? 'bg-white/15 text-white' : 'text-[#d1d1d6] hover:text-white'
                      : active ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-600 hover:text-slate-900',
                  ].join(' ');
                }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-5">
            <form
              onSubmit={submitSearch}
              className={`hidden lg:flex items-center rounded-full pl-1 pr-3 h-10 w-[220px] ${light ? 'bg-white/15 ring-1 ring-white/30 backdrop-blur' : 'bg-slate-50 ring-1 ring-slate-200'}`}
            >
              <button
                type="submit"
                aria-label="Search"
                className={`grid place-items-center h-8 w-8 rounded-full shrink-0 ${light ? 'bg-white text-brand-600' : 'bg-brand-600 text-white'}`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products"
                className={`ml-2 flex-1 bg-transparent text-[13px] focus:outline-none ${light ? 'text-white placeholder:text-white/70' : 'text-slate-600 placeholder:text-slate-400'}`}
              />
            </form>

            <button
              onClick={() => setOpen(true)}
              aria-label="Cart"
              className={`relative grid place-items-center h-11 w-11 rounded-full ${light ? 'text-white hover:bg-white/15' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
                <circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white ring-2 ring-white">
                  {count}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className={`lg:hidden grid place-items-center h-11 w-11 rounded-full ${light ? 'text-white hover:bg-white/15' : 'text-slate-700 hover:bg-slate-100'}`}
            >
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {menuOpen && (
          <div className="lg:hidden pb-4">
            <div className="rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-200">
              <form
                onSubmit={submitSearch}
                className="flex items-center rounded-full bg-slate-50 pl-1 pr-3 h-11 ring-1 ring-slate-200"
              >
                <button
                  type="submit"
                  aria-label="Search"
                  className="grid place-items-center h-9 w-9 shrink-0 rounded-full bg-brand-600 text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products"
                  className="ml-2 flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
              </form>

              <nav className="mt-3 flex flex-col">
                {NAV.map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => {
                      const active = isActive && item.to !== '#' && item.label !== 'Catalog';
                      return [
                        'rounded-xl px-3 py-3 text-[15px] font-medium transition-colors',
                        active ? 'bg-brand-50 text-brand-600' : 'text-slate-700 hover:bg-slate-100',
                      ].join(' ');
                    }}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 overflow-hidden border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          {/* Company */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm font-semibold text-slate-800">Fiquity Technology Private Limited</p>
            <dl className="mt-2 space-y-1 text-sm text-slate-500">
              <div className="flex gap-2"><dt className="text-slate-400">GST</dt><dd>06AAGCF1628J1ZO</dd></div>
              <div className="flex gap-2"><dt className="text-slate-400">CIN</dt><dd>U66190HR2024PTC126813</dd></div>
            </dl>
            <div className="mt-3 space-y-1 text-sm">
              <a href="mailto:contact@1fi.in" className="block text-brand-600 hover:underline">contact@1fi.in</a>
              <a href="tel:+917303323443" className="block text-brand-600 hover:underline">+91 7303323443</a>
            </div>
            <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">Operating Address</p>
            <p className="text-sm text-slate-500">1st Floor, Orchid Business Park, Sector 48, Gurugram</p>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Lending Partner</p>
              <p className="mt-1 text-sm text-slate-600">
                Loans are provided by Kalandri Capital Private Limited, an NBFC registered with the
                Reserve Bank of India (RBI).
              </p>
              <dl className="mt-2 space-y-1 text-sm text-slate-500">
                <div className="flex gap-2"><dt className="text-slate-400">RBI CoR No.</dt><dd>N-02.00323</dd></div>
                <div className="flex gap-2"><dt className="text-slate-400">CIN</dt><dd>U65929KA2017PTC107822</dd></div>
              </dl>
              <a href="https://www.kalandricapital.net" target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm text-brand-600 hover:underline">
                www.kalandricapital.net
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-sm font-bold text-slate-900">Quick Links</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li><a href="https://app.1fi.in/login?redirect=/unlock-limit" className="hover:text-brand-600">Check Eligibility</a></li>
              <li><a href="https://app.1fi.in/login" className="hover:text-brand-600">Start Shopping</a></li>
              <li><a href="https://1fi.in/contactus" className="hover:text-brand-600">Support</a></li>
            </ul>
          </div>

          {/* Support links */}
          <div>
            <p className="text-sm font-bold text-slate-900">Support Links</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-500">
              <li><Link to="/about" className="hover:text-brand-600">About Us</Link></li>
              <li><a href="https://1fi.in/contactus" className="hover:text-brand-600">Contact Us</a></li>
              <li><a href="https://1fi.in/faq" className="hover:text-brand-600">FAQ</a></li>
              <li><a href="https://1fi.in/terms" className="hover:text-brand-600">Terms and Conditions</a></li>
              <li><a href="https://1fi.in/privacy-policy" className="hover:text-brand-600">Privacy Policy</a></li>
            </ul>

            <p className="mt-8 text-sm font-bold text-slate-900">Follow Us</p>
            <div className="mt-3 flex items-center gap-3">
              <a href="https://www.instagram.com/1fi_in" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full text-slate-500 ring-1 ring-slate-200 transition hover:bg-gradient-to-br hover:from-fuchsia-500 hover:to-amber-500 hover:text-white hover:ring-transparent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/1fi/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full text-slate-500 ring-1 ring-slate-200 transition hover:bg-[#0a66c2] hover:text-white hover:ring-[#0a66c2]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-400">
          © {new Date().getFullYear()} Fiquity Technology Private Limited. All rights reserved.
        </div>
      </div>

      {/* Giant brand watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none flex select-none items-center justify-center gap-[0.04em] px-4 pb-2 leading-[0.8] text-slate-200"
      >
        <svg
          viewBox="0 0 44 44"
          className="h-[13vw] w-[13vw] max-h-[190px] max-w-[190px]"
          fill="none"
        >
          <path
            d="M22 40 V12 M22 12 L11 25 M22 12 L33 25"
            stroke="currentColor"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[19vw] font-extrabold tracking-tight">1Fi</span>
      </div>
    </footer>
  );
}
