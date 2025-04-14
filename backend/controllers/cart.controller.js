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
  const productId = req.params.id;

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

export const updateCart = async (req, res) => {
  const productId = req.params.id;
  const { quantity } = req.body;

  try {
    const user = req.user;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const isExisting = user.cartItems.find((item) => item.id === productId);

    if (!isExisting) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    } else {
      isExisting.quantity = quantity;
    }

    await user.save();

    res.status(201).json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
