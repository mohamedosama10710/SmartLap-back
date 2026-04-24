const mongoose = require("mongoose");

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
    enum: ["patient", "chemist", "admin"],
    default: "patient",
  },
  patientId: {
    type: Number,
    unique: true,
    sparse: true,
  },
  isFirstLogin: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Account", accountSchema);
