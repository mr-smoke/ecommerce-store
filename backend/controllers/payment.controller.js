import { stripe } from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";

export const createStripeCoupon = async (discount) => {
  const coupon = await stripe.coupons.create({
    percent_off: discount,
    duration: "once",
  });

  return coupon.id;
};

export const createCheckoutSession = async (req, res) => {
  const { products, couponName } = req.body;

  try {
    if (!products || !products.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalPrice = 0;

    const line_items = products.map((product) => {
      const price = product.price * 100;
      totalPrice += price;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.photo],
          },
          unit_amount: price,
        },
        quantity: product.quantity,
      };
    });

    let coupon = null;

    if (couponName) {
      coupon = await Coupon.findOne({ name: couponName });

      if (coupon) {
        const discount = (coupon.discount / 100) * totalPrice;
        totalPrice -= discount;
      }
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      discounts: coupon
        ? [{ coupon: await createStripeCoupon(coupon.discount) }]
        : [],
      metadata: {
        userId: req.user._id.toString(),
        coupon: couponName || "",
        products: JSON.stringify(
          products.map((product) => ({
            id: product._id,
            quantity: product.quantity,
            price: product.price,
          }))
        ),
      },
    });

    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
