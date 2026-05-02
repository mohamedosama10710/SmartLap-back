import mongoose from "mongoose";
// import testReference from "../models/testReference.js"
// import { data } from "../utils/testsArray.js"
// import firstLogin from "../utils/firstLogin.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // await firstLogin();
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;
