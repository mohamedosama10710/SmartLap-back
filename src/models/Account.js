import mongoose from "mongoose";
import bcrypt from "bcrypt";

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [8, "User name must be at least 8 characters"],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (email) {
        return /^[a-zA-Z]{3,10}[0-9]{0,3}(@)(gmail|yahoo)\.com$/.test(email);
      },
      message: (prop) => `${prop.value} is not valid`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["patient", "staff", "admin"],
    default: "patient",
  },

  patientId: {
    type: String,
    unique: true,
    sparse: true,
  },
  isFirstLogin: {
    type: Boolean,
    default: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

accountSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

accountSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const Account = mongoose.model("Account", accountSchema);

export default Account;
