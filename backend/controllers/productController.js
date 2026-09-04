import Product from '../models/Product.js';
import Variant from '../models/Variant.js';
import EmiPlan from '../models/EmiPlan.js';

/**
 * GET /api/products
 * Returns all products for the listing page (image, name, price, ...).
 */
export async function getProducts(req, res, next) {
  try {
    const products = await Product.find().sort({ createdAt: 1 }).lean();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/products/:slug
 * Returns a single product with its variants, and each variant's EMI plans
 * nested inside it. This is everything the detail page needs in one call.
 */
export async function getProductBySlug(req, res, next) {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).lean();
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const variants = await Variant.find({ productId: product._id })
      .sort({ price: 1 })
      .lean();

    const variantIds = variants.map((v) => v._id);
    const plans = await EmiPlan.find({ variantId: { $in: variantIds } })
      .sort({ tenure: 1 })
      .lean();

    // Group EMI plans under their variant.
    const plansByVariant = new Map();
    for (const plan of plans) {
      const key = String(plan.variantId);
      if (!plansByVariant.has(key)) plansByVariant.set(key, []);
      plansByVariant.get(key).push(plan);
    }

    const variantsWithPlans = variants.map((v) => ({
      ...v,
      emiPlans: plansByVariant.get(String(v._id)) || [],
    }));

    res.json({ ...product, variants: variantsWithPlans });
  } catch (err) {
    next(err);
  }
}
