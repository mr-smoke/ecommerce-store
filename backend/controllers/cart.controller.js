import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  const productId = req.params.id;

  try {
    const user = req.user;

    const isExisting = user.cartItems.find((item) => item.id === productId);

    if (isExisting) {
      isExisting.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();

    res.status(201).json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }

    await user.save();

    res.status(201).json(user.cartItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const user = req.user;

    const products = await Product.find({
      _id: { $in: user.cartItems },
    });

    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
