import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();

connectDB();

const app = express();



app.use(express.json());
app.use(cors({
  origin:["http://localhost:5173"],
 
}));

app.options("*",cors());
app.use("/api/auth", authRoutes);

app.use("/api/customers", customerRoutes);


app.listen(process.env.PORT, () =>
  console.log("Server running ")
);