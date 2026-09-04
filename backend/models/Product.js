import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, required: true },
    // Optional real product render (white-background photo) for the showcase.
    render: { type: String, trim: true },
    rating: { type: Number, min: 0, max: 5 }, // e.g. 4.7
    isNew: { type: Boolean, default: false }, // show a "New" tag
    soldLastMonth: { type: Number }, // social proof: EMI buyers last month
    category: { type: String, default: 'phone' }, // 'phone' | 'accessory'
    brand: { type: String, trim: true },
    description: { type: String, trim: true },
    // Base MRP / price shown on the listing. Variant-level pricing overrides
    // this on the detail page.
    mrp: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

export default mongoose.model('Product', productSchema);
