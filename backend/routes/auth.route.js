import express from "express";
import {
  signup,
  login,
  logout,
  refreshToken,
  getUser,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/get-user", protectRoute, getUser);

export default router;
