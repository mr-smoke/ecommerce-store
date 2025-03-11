import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.userId).select("-password").exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

export const adminRoute = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};
