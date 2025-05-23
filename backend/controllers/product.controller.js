import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import { v2 as cloudinary } from "cloudinary";

export const createProduct = async (req, res) => {
  const { image } = req.body;
  let img = null;

  try {
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      img = uploadedResponse.secure_url;
    }

    const product = new Product({
      ...req.body,
      photo: image ? img : "/nophoto.avif",
    });
    product.save();

    res.status(201).json(product);
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

    if (product.photo) {
      const publicId = product.photo.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    if (product.featured) {
      const featuredProducts = await Product.find({
        featured: true,
        _id: { $ne: productId },
      });
      await redis.set("featuredProducts", JSON.stringify(featuredProducts));
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
      { $project: { _id: 1, name: 1, description: 1, price: 1, photo: 1 } },
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

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { name, description, price, category, image } = req.body;
  const productId = req.params.id;
  let img = null;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (image) {
      if (product.photo) {
        const publicId = product.photo.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }

      const uploadedResponse = await cloudinary.uploader.upload(image);
      img = uploadedResponse.secure_url;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.photo = image ? img : product.photo;

    await product.save();

    if (product.featured) {
      const featuredProducts = await Product.find({
        featured: true,
      });
      await redis.set("featuredProducts", JSON.stringify(featuredProducts));
    }

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
