import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  const productId = req.params.id;

  try {
    const user = req.user;

    const isExisting = user.cartItems.find((item) => item.id === productId);

    if (isExisting) {
      isExisting.quantity += 1;
    } else {
      user.cartItems.push({ id: productId, quantity: 1 });
    }

    await user.save();

    res.status(201).json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
