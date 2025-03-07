import User from "../models/user.model.js";

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

    res.status(201).json({
      message: "Signup success! Please signin",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
