import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
    },
    category: {
      type: String,
      required: true,
      maxlength: 32,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
    },
    photo: {
      type: String,
      default: "nophoto.jpg",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
