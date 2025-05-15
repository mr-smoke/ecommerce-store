import { stripe } from "../lib/stripe.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";

const createStripeCoupon = async (discount) => {
  const coupon = await stripe.coupons.create({
    percent_off: discount,
    duration: "once",
  });

  return coupon.id;
};

const createNewCoupon = async (user, totalPrice) => {
  let discount = 0;

  switch (true) {
    case totalPrice > 5000000:
      discount = 50;
      break;
    case totalPrice > 4000000:
      discount = 40;
      break;
    case totalPrice > 3000000:
      discount = 30;
      break;
    case totalPrice > 2000000:
      discount = 20;
      break;
    default:
      discount = 10;
  }

  const newCoupon = await Coupon.create({
    name:
      "PROMO" +
      discount +
      Math.random().toString(36).substring(2, 7).toUpperCase(),
    discount,
    expiry: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    isPromotional: false,
  });

  await newCoupon.save();

  user.coupons.push(newCoupon._id);
  await user.save({ validateModifiedOnly: true });

  return newCoupon;
};

export const createCheckoutSession = async (req, res) => {
  const { products, couponId } = req.body;

  try {
    console.log("products", products);

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
                : "https://res.cloudinary.com/dudp3mt6r/image/upload/v1745829643/nophoto_szr2sb.jpg",
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
    console.log("session", session);

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  const sessionId = req.params.id;
  const user = req.user;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
      if (existingOrder) {
        return res.status(200).json({ order: existingOrder });
      }

      if (session.metadata.coupon) {
        user.coupons.map((coupon) => {
          if (coupon._id.toString() === session.metadata.coupon) {
            coupon.used = true;
          }
        });
      }

      user.cartItems = [];
      await user.save({ validateModifiedOnly: true });

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

      if (session.amount_total > 1000000) {
        const newCoupon = await createNewCoupon(user, session.amount_total);
        return res
          .status(201)
          .json({ order, usedCoupon: session.metadata.coupon, newCoupon });
      }

      return res
        .status(201)
        .json({ order, usedCoupon: session.metadata.coupon });
    }

    res.status(400).json({ error: "Payment failed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
