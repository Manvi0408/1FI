import mongoose from 'mongoose';

const emiPlanSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Variant',
      required: true,
      index: true,
    },
    monthlyAmount: { type: Number, required: true, min: 0 },
    tenure: { type: Number, required: true, min: 1 }, // months
    interestRate: { type: Number, required: true, min: 0 }, // annual %, 0 = no cost EMI
    cashback: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('EmiPlan', emiPlanSchema);
