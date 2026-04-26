import Account from "../models/Account.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
export const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      const error = new Error(
        "Please provide identifier (phone, email, or patient ID) and password!",
      );
      error.statusCode = 400;
      return next(error);
    }

    const user = await Account.findOne({
      $or: [
        { phone: identifier },
        { email: identifier },
        { patientId: identifier },
      ],
    });

    if (!user || !(await user.correctPassword(password, user.password))) {
      const error = new Error("Incorrect identifier or password");
      error.statusCode = 401;
      return next(error);
    }

    const token = signToken(user._id);

    if (user.role === "patient" && user.isFirstLogin) {
      return res.status(200).json({
        status: "success",
        requireSetup: true,
        message:
          "This is your first login. Please change your password to continue.",
        token,
        user: { id: user._id, role: user.role },
      });
    }

    res.status(200).json({
      status: "success",
      token,
      user: {
        id: user._id,
        role: user.role,
        isFirstLogin: user.isFirstLogin,
      },
    });
  } catch (err) {
    next(err);
  }
};

// to test the login
export const register = async (req, res, next) => {
  try {
    const newUser = await Account.create(req.body);
    
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    // console.log("error:", err);
    next(err)
  }
};
