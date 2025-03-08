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

    res.status(200).json({
      message: "Signin success!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
};
