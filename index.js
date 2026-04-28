import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/dp.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import staffRoutes from "./src/routes/staff.js";
import refRoutes from "./src/routes/refRouter.js";
import reportRoutes from "./src/routes/reportRoutes.js";
import accountRoutes from "./src/routes/accountRoutes.js";
import patientRoutes from "./src/routes/patientRoutes.js";

dotenv.config();

connectDB();


const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/account", accountRoutes);
app.use("/staff", staffRoutes);
app.use("/ref", refRoutes);
app.use("/reports", reportRoutes);
app.use("/patients", patientRoutes);





app.use((req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  error.statusCode = 404;
  next(error);
});

app.use(errorHandler);


app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
