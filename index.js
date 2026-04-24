import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/dp.js";

dotenv.config();

connectDB();


const app = express();

// middlewares
app.use(cors());
app.use(express.json());



app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
