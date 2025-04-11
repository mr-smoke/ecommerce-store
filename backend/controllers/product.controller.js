import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import { v2 as cloudinary } from "cloudinary";

export const createProduct = async (req, res) => {
  const { image } = req.body;
  let img = [];

  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      img = uploadedResponse.secure_url;
    }

    const product = new Product({
      ...req.body,
      photo: img,
    });
    product.save();

    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndDelete(productId);

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
