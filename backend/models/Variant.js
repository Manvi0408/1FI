import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    storage: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    colorHex: { type: String, trim: true }, // for the color swatch in the UI
    image: { type: String, trim: true }, // per-color product photo (white bg)
    // Variant-specific pricing. Different storage/color combos cost different
    // amounts, and EMI plans are computed per variant.
    mrp: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Variant', variantSchema);
