import mongoose from "mongoose";
import testReference from "../models/testReference.js"
import { data } from "../utils/testsArray.js"
import firstLogin from "../utils/firstLogin.js";

const connectDB = async () => {
  try {
<<<<<<< HEAD
    await mongoose.connect(process.env.MONGO_URI_TEAM);
=======
    await mongoose.connect(process.env.MONGO_URI);
    // await firstLogin();
>>>>>>> 560668ba10c1acc3f22586442bfe74a6c57ca1fd
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;
