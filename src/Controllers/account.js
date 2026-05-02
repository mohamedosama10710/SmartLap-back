import Account from "../models/Account.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
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
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordToken = hashedResetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    user.resetPasswordVerified = false;
    await user.save();

    await sendEmail({
      email: user.email,
      subject: "change Password",
      message: `reset Token Valid For 10 min ${resetToken}`,
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
    user.resetPasswordVerified = true;
    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.resetPasswordVerified = undefined;

    await user.save();
    const loginToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({ message: "success", token: loginToken });
  } catch (error) {
    next(error);
  }
};

export { forgotPassword, resetPassword };
