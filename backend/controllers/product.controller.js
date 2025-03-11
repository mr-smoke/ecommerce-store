import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";

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

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let products = await redis.get("featuredProducts");

    if (products) {
      return res.status(200).json({ products: JSON.parse(products) });
    }

    products = await Product.find({ featured: true });

    if (!products) {
      return res.status(404).json({ error: "No featured products found" });
    }

    await redis.set("featuredProducts", JSON.stringify(products));

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReccomendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 4 } },
      { $project: { _id: 1, name: 1, description: 1, price: 1, image: 1 } },
    ]);

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const toggleFeaturedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.featured = !product.featured;
    await product.save();

    const featuredProducts = await Product.find({ featured: true });
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));

    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
