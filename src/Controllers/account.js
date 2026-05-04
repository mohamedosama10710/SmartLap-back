import Account from "../models/Account.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from "bcrypt";

let forgotPassword = async (req, res, next) => {
  let user;
  try {
    let { email } = req.body;
    user = await Account.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: " this Email not found", email: email });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordToken = hashedResetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    user.resetPasswordVerified = false;
    await user.save();

    await sendEmail({
      email: user.email,
      subject: "change Password",
      html: `reset Token Valid For 10 min ${resetToken}`,
    });
    res.status(200).json({ status: "Success", message: "reset token send" });
  } catch (error) {
    if (user) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.resetPasswordVerified = undefined;
      await user.save({ validateBeforeSave: false });
    }

    next(error);
  }
};
let resetPassword = async (req, res, next) => {
  try {
    let { token } = req.params;
    let { password } = req.body;
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const user = await Account.findOne({
      resetPasswordToken: hashedResetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "reset code invalid or expired" });
    }

    user.password = bcrypt.hash(password,10) ;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.resetPasswordVerified = true;


    await user.save();
    const loginToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({ message: "success", token: loginToken });
  } catch (error) {
    next(error);
  }
};

const registerStaff = async (req, res) => {
  // Logic to register a staff member
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body.password = hashedPassword;
  try {
    const staff = await Account.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        email: staff.email,
        name: staff.name,
        phone: staff.phone,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const registerPatient = async (req, res) => {
  // Logic to register a patient
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body.password = hashedPassword;
  try {
    const patient = await Account.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        email: patient.email,
        name: patient.name,
        phone: patient.phone,
        patientId: patient.patientId,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
const login = async (req, res) => {
  // Logic to authenticate a user and generate a token
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    } else {
      const user = await Account.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          status: "fail",
          message: "Incorrect email or password",
        });
      } else {
        // Generate token logic here (e.g., JWT)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.status(200).json({
          status: "success",
          token,
          data: {
            email: user.email,
            name: user.name,
            isFirstLogin: user.isFirstLogin,
          },
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const updateProfile = async (req, res) => {
  // Logic to update user profile (email, phone, etc.)
  delete req.body.password;
  try {
    const updatedProfile = await Account.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true },
    );
    if (!updatedProfile) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        email: updatedProfile.email,
        name: updatedProfile.name,
        phone: updatedProfile.phone,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const updatePassword = async (req, res) => {
  // Logic to change user password
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide current and new password",
    });
  }
  try {
    const user = await Account.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(400).json({
        status: "fail",
        message: "Current password is incorrect",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    if (user.isFirstLogin) {
      user.isFirstLogin = false;
    }
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export { registerStaff, registerPatient, login, updateProfile, updatePassword };

export { forgotPassword, resetPassword };
