import express from "express";
import {
  createProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create", createProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
