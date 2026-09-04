import Product from '../models/Product.js';
import Variant from '../models/Variant.js';
import EmiPlan from '../models/EmiPlan.js';

/**
 * Builds a self-contained SVG "product image" as a data URI so the app renders
 * real imagery without depending on any external CDN.
 */
function phoneImage({ label, sub, from, to, accent }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${from}"/>
      <stop offset="1" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="640" height="640" fill="url(#g)"/>
  <g transform="translate(320 300)">
    <rect x="-95" y="-190" width="190" height="380" rx="34" fill="#0f172a" opacity="0.92"/>
    <rect x="-83" y="-178" width="166" height="356" rx="26" fill="#f8fafc"/>
    <rect x="-83" y="-178" width="166" height="120" rx="26" fill="${accent}"/>
    <rect x="-24" y="-172" width="48" height="12" rx="6" fill="#0f172a"/>
    <circle cx="0" cy="120" r="16" fill="#e2e8f0"/>
  </g>
  <text x="320" y="560" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="700" fill="#ffffff">${label}</text>
  <text x="320" y="600" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#ffffff" opacity="0.85">${sub}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Generates a realistic set of EMI plans for a given variant price.
 * Mixes no-cost EMIs (0% interest) with standard interest-bearing plans, and
 * attaches cashback to a couple of them.
 */
function buildEmiPlans(price) {
  const round = (n) => Math.round(n);

  // No-cost EMI: price split evenly across the tenure.
  const noCost = (tenure, cashback = 0) => ({
    tenure,
    interestRate: 0,
    monthlyAmount: round(price / tenure),
    cashback,
  });

  // Standard EMI using the reducing-balance formula.
  const withInterest = (tenure, annualRate, cashback = 0) => {
    const r = annualRate / 12 / 100;
    const monthly = (price * r * Math.pow(1 + r, tenure)) / (Math.pow(1 + r, tenure) - 1);
    return { tenure, interestRate: annualRate, monthlyAmount: round(monthly), cashback };
  };

  return [
    noCost(3),
    noCost(6, round(price * 0.03)), // 3% cashback on the 6-month no-cost plan
    withInterest(9, 12),
    withInterest(12, 14, round(price * 0.05)), // 5% cashback on the 12-month plan
    withInterest(18, 15),
    withInterest(24, 16),
  ];
}

// Per-brand background gradient used by the generated placeholder image.
const BRAND_GRADIENT = {
  Apple: ['#1e293b', '#475569'],
  Samsung: ['#111827', '#374151'],
  Google: ['#0f766e', '#0ea5e9'],
  OnePlus: ['#7f1d1d', '#111827'],
};

/**
 * Compact product factory. Generates variants as the cross-product of the given
 * storages and colors, deriving each variant's price from the base price plus
 * the storage delta. EMI plans are derived per variant at seed time.
 */
function mk({ name, slug, brand, description, mrp, price, colors, storages, rating, isNew, category, soldLastMonth }) {
  const [from, to] = BRAND_GRADIENT[brand] || ['#1e293b', '#475569'];
  const variants = [];
  for (const s of storages) {
    for (const c of colors) {
      variants.push({
        storage: s.label,
        color: c.name,
        colorHex: c.hex,
        image: c.img, // per-color white-background photo
        mrp: mrp + s.delta,
        price: price + s.delta,
      });
    }
  }
  return {
    name,
    slug,
    brand,
    description,
    image: phoneImage({ label: name.replace(`${brand} `, ''), sub: brand, from, to, accent: colors[0].hex }),
    render: colors[0].img, // card photo = primary colour
    rating,
    isNew: !!isNew,
    soldLastMonth,
    category: category || 'phone',
    mrp,
    price,
    variants,
  };
}

// Palette of real, white-background phone photos, reused across colours.
const IMG = {
  silver: '/products/iphone-17-pro.jpg',
  blue: '/products/iphone-air.jpg',
  black: '/products/iphone-17.jpg',
  teal: '/products/iphone-16.jpg',
  red: '/products/extra-iphone17pro-red.jpg',
  pink: '/products/extra-iphone16-pink.jpg',
  pacific: '/products/extra-iphone12pro-blue.jpg',
  samGray: '/products/samsung-s24-ultra.jpg',
  samViolet: '/products/samsung-s24.jpg',
  opGreen: '/products/oneplus-13.jpg',
  opSilver: '/products/oneplus-13r.jpg',
  ggBlack: '/products/google-pixel-9-pro.jpg',
  ggPorcelain: '/products/google-pixel-9.jpg',
  nike: '/products/nike.jpg',
  macbook: '/products/macbook.jpg',
  urbanista: '/products/urbanista.jpg',
  boat: '/products/boat-stone.jpg',
};

/**
 * Product catalogue across four brands. Each product has variants; EMI plans are
 * derived from each variant's price at seed time so nothing is hardcoded.
 */
const catalogue = [
  // ---- Apple ----
  mk({
    name: 'Apple iPhone 17 Pro',
    slug: 'iphone-17-pro',
    brand: 'Apple',
    description:
      'The most advanced iPhone yet with the A19 Pro chip, a titanium body and a pro camera system built for low light.',
    mrp: 134900,
    price: 127400,
    rating: 4.8,
    isNew: true,
    soldLastMonth: 1240,
    colors: [
      { name: 'Silver', hex: '#e5e5e7', img: IMG.silver },
      { name: 'Deep Blue', hex: '#26415e', img: IMG.pacific },
    ],
    storages: [{ label: '256GB', delta: 0 }, { label: '512GB', delta: 20000 }],
  }),
  mk({
    name: 'Apple iPhone Air',
    slug: 'iphone-air',
    brand: 'Apple',
    description: 'Impossibly thin and light, with the A19 chip and an all-day battery in an aerospace-grade frame.',
    mrp: 119900,
    price: 114900,
    rating: 4.6,
    isNew: true,
    colors: [
      { name: 'Ultramarine', hex: '#4f6bd6', img: IMG.blue },
      { name: 'Black', hex: '#1f2937', img: IMG.black },
    ],
    storages: [{ label: '256GB', delta: 0 }, { label: '512GB', delta: 15000 }],
  }),
  mk({
    name: 'Apple iPhone 17',
    slug: 'iphone-17',
    brand: 'Apple',
    description: 'The everyday iPhone with the A19 chip, a brighter display and a dual-camera system.',
    mrp: 82900,
    price: 79900,
    rating: 4.7,
    isNew: true,
    soldLastMonth: 2130,
    colors: [
      { name: 'Black', hex: '#1f2937', img: IMG.black },
      { name: 'White', hex: '#ede9e3', img: IMG.silver },
    ],
    storages: [{ label: '256GB', delta: 0 }, { label: '512GB', delta: 12000 }],
  }),
  mk({
    name: 'Apple iPhone 16',
    slug: 'iphone-16',
    brand: 'Apple',
    description: 'A great-value iPhone with the A18 chip, Camera Control and a durable design.',
    mrp: 69900,
    price: 65900,
    rating: 4.5,
    colors: [
      { name: 'Teal', hex: '#5e9e9e', img: IMG.teal },
      { name: 'Black', hex: '#1f2937', img: IMG.black },
    ],
    storages: [{ label: '128GB', delta: 0 }, { label: '256GB', delta: 8000 }],
  }),
  mk({
    name: 'Apple iPhone 17 Pro Max',
    slug: 'iphone-17-pro-max',
    brand: 'Apple',
    description: 'The largest, most capable iPhone with the A19 Pro chip, a pro camera system and all-day battery.',
    mrp: 154900,
    price: 147900,
    rating: 4.9,
    isNew: true,
    colors: [
      { name: 'Cherry', hex: '#8f1d2d', img: IMG.red },
      { name: 'Deep Blue', hex: '#26415e', img: IMG.pacific },
    ],
    storages: [{ label: '256GB', delta: 0 }, { label: '512GB', delta: 20000 }],
  }),
  mk({
    name: 'Apple iPhone 16 Plus',
    slug: 'iphone-16-plus',
    brand: 'Apple',
    description: 'A bigger-screen iPhone 16 with the A18 chip, Camera Control and long battery life.',
    mrp: 79900,
    price: 74900,
    rating: 4.4,
    colors: [
      { name: 'Pink', hex: '#e6a0c4', img: IMG.pink },
      { name: 'Black', hex: '#1f2937', img: IMG.black },
    ],
    storages: [{ label: '128GB', delta: 0 }, { label: '256GB', delta: 8000 }],
  }),
  mk({
    name: 'Apple iPhone 12 Pro',
    slug: 'iphone-12-pro',
    brand: 'Apple',
    description: 'A classic Pro iPhone with the A14 Bionic chip, a triple-camera system and a Ceramic Shield front.',
    mrp: 59900,
    price: 49900,
    rating: 4.1,
    colors: [
      { name: 'Pacific Blue', hex: '#2b4a63', img: IMG.pacific },
      { name: 'Graphite', hex: '#4b4f56', img: IMG.black },
    ],
    storages: [{ label: '128GB', delta: 0 }, { label: '256GB', delta: 6000 }],
  }),

  // ---- Samsung ----
  mk({
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-s24-ultra',
    brand: 'Samsung',
    description:
      'Galaxy AI is here. A 200MP camera, a built-in S Pen and the brightest Galaxy display, wrapped in a titanium frame.',
    mrp: 129999,
    price: 114999,
    rating: 4.7,
    isNew: true,
    soldLastMonth: 860,
    colors: [
      { name: 'Titanium Gray', hex: '#9ca3af', img: IMG.samGray },
      { name: 'Titanium Violet', hex: '#7c6fb0', img: IMG.samViolet },
    ],
    storages: [{ label: '256GB', delta: 0 }, { label: '512GB', delta: 10000 }],
  }),

  // ---- OnePlus ----
  mk({
    name: 'OnePlus 13',
    slug: 'oneplus-13',
    brand: 'OnePlus',
    description: 'Flagship Snapdragon performance, a Hasselblad camera and 100W fast charging.',
    mrp: 72999,
    price: 69999,
    rating: 4.6,
    isNew: true,
    soldLastMonth: 540,
    colors: [
      { name: 'Arctic Green', hex: '#6f8f6a', img: IMG.opGreen },
      { name: 'Silver Fog', hex: '#c9ced6', img: IMG.opSilver },
    ],
    storages: [{ label: '256GB', delta: 0 }, { label: '512GB', delta: 8000 }],
  }),

  // ---- Google ----
  mk({
    name: 'Google Pixel 9 Pro',
    slug: 'google-pixel-9-pro',
    brand: 'Google',
    description:
      'Engineered by Google with the Tensor G4 chip. Gemini built in, a pro triple camera and seven years of updates.',
    mrp: 109999,
    price: 99999,
    rating: 4.5,
    isNew: true,
    colors: [
      { name: 'Obsidian', hex: '#1f2937', img: IMG.ggBlack },
      { name: 'Porcelain', hex: '#ede9e3', img: IMG.ggPorcelain },
    ],
    storages: [{ label: '128GB', delta: 0 }, { label: '256GB', delta: 10000 }],
  }),

  // ---- Best sellers (accessories) ----
  mk({
    name: 'Nike Air Jordan 1 Mid',
    slug: 'nike-air-jordan-1-mid',
    brand: 'Nike',
    category: 'accessory',
    description: 'Iconic Air Jordan 1 Mid sneakers with premium leather and classic Air cushioning.',
    mrp: 14995,
    price: 12995,
    rating: 4.7,
    isNew: true,
    colors: [{ name: 'Pine Green', hex: '#1e6b45', img: IMG.nike }],
    storages: [{ label: 'UK 9', delta: 0 }, { label: 'UK 10', delta: 0 }],
  }),
  mk({
    name: 'Apple MacBook Air',
    slug: 'macbook-air',
    brand: 'Apple',
    category: 'accessory',
    description: 'A supremely portable MacBook Air with the Apple M-series chip and all-day battery life.',
    mrp: 99900,
    price: 94900,
    rating: 4.8,
    isNew: true,
    colors: [{ name: 'Gold', hex: '#e6cfa8', img: IMG.macbook }],
    storages: [{ label: '256GB', delta: 0 }, { label: '512GB', delta: 20000 }],
  }),
  mk({
    name: 'Urbanista Miami Headphones',
    slug: 'urbanista-miami',
    brand: 'Urbanista',
    category: 'accessory',
    description: 'Wireless over-ear headphones with active noise cancelling and 50 hours of playtime.',
    mrp: 19999,
    price: 16999,
    rating: 4.4,
    colors: [{ name: 'Ruby Red', hex: '#9b1c31', img: IMG.urbanista }],
    storages: [{ label: 'Standard', delta: 0 }],
  }),
  mk({
    name: 'boAt Stone 1450 Speaker',
    slug: 'boat-stone-1450',
    brand: 'boAt',
    category: 'accessory',
    description: 'Moveable Wi-Fi speaker with 40W RMS boAt Signature Sound, RGB LEDs and TWS pairing.',
    mrp: 6990,
    price: 4999,
    rating: 4.3,
    isNew: true,
    colors: [{ name: 'Black', hex: '#1f2937', img: IMG.boat }],
    storages: [{ label: 'Standard', delta: 0 }],
  }),
];

/**
 * Seeds the database from the catalogue.
 * @param {{ force?: boolean }} options - when force is true, wipes and reseeds.
 */
export async function seedIfEmpty({ force = false } = {}) {
  const existing = await Product.countDocuments();
  if (existing > 0 && !force) {
    return { seeded: false };
  }

  await Promise.all([
    Product.deleteMany({}),
    Variant.deleteMany({}),
    EmiPlan.deleteMany({}),
  ]);

  for (const item of catalogue) {
    const { variants, ...productFields } = item;
    const product = await Product.create(productFields);

    for (const v of variants) {
      const variant = await Variant.create({ ...v, productId: product._id });
      const plans = buildEmiPlans(variant.price).map((p) => ({ ...p, variantId: variant._id }));
      await EmiPlan.insertMany(plans);
    }
  }

  console.log(`Seeded ${catalogue.length} products with variants and EMI plans.`);
  return { seeded: true };
}
