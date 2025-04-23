import { stripe } from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

export const createStripeCoupon = async (discount) => {
  const coupon = await stripe.coupons.create({
    percent_off: discount,
    duration: "once",
  });

  return coupon.id;
};

export const createCheckoutSession = async (req, res) => {
  const { products, couponId } = req.body;

  try {
    if (!products || !products.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalPrice = 0;

    const line_items = products.map((product) => {
      const price = product.price * 100;
      totalPrice += price * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [
              product.photo && product.photo.startsWith("http")
                ? product.photo
                : "https://via.placeholder.com/150",
            ],
          },
          unit_amount: price,
        },
        quantity: product.quantity,
      };
    });

    let coupon = null;

    if (couponId) {
      coupon = await Coupon.findById(couponId);

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
        coupon: couponId || "",
        products: JSON.stringify(
          products.map((product) => ({
            id: product._id,
            quantity: product.quantity,
            price: product.price,
          }))
        ),
      },
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  const sessionId = req.params.id;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
      if (existingOrder) {
        return res.status(200).json({ order: existingOrder });
      }

      if (session.metadata.coupon) {
        const user = await User.findById(session.metadata.userId);

        user.coupons.map((coupon) => {
          if (coupon._id.toString() === session.metadata.coupon) {
            coupon.used = true;
          }
        });
        await user.save();
      }

      const products = JSON.parse(session.metadata.products);

      const order = new Order({
        user: session.metadata.userId,
        orderItems: products.map((product) => ({
          product: product.id,
          price: product.price,
          quantity: product.quantity,
        })),
        totalPrice: session.amount_total / 100,
        stripeSessionId: sessionId,
      });

      await order.save();

      return res.status(201).json({ order });
    }

    res.status(400).json({ error: "Payment failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
