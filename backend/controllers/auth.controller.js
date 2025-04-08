import User from "../models/user.model.js";
import { tokenization } from "../lib/auth.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    await tokenization(user._id, res);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }

    if (!(await user.matchPassword(password))) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }

    await tokenization(user._id, res);

    res.status(200).json({
      message: "Signin success!",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        error: "User not logged in",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    await redis.del(`refreshToken:${decoded.userId}`);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({
      message: "Signout success",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({
        error: "User not logged in",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const token = await redis.get(`refreshToken:${decoded.userId}`);

    if (token !== refreshToken) {
      return res.status(400).json({
        error: "Invalid refresh token",
      });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Refresh token success",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
