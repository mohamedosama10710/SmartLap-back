import mongoose from "mongoose";
import {testReference} from "../models/testReference.js"
import {data} from "../utils/testsArray.js"
const connectDB = async () => {
  try {
<<<<<<< HEAD
    await mongoose.connect(process.env.MONGO_URI_TEAM);
=======
    await mongoose.connect(process.env.MONGO_URI);
    // await testReference.insertMany(data) ;
>>>>>>> 23280a70254cfaa8af3ee5f8e83f329faaaf9a82
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;