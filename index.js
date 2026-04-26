import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/dp.js";
import authRoutes from "./src/routes/authRoutes.js";
import errorHandler from "./src/middlewares/errorHandler.js";

dotenv.config();

connectDB();


const app = express();

// middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);








app.use((req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);


app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
