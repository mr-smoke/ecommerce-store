import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    product.save();

    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
