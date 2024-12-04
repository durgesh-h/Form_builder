import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router as formRoutes } from "./routes/forms.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://durgeshhhio:3mgKkcgGvt8RHFog@cluster0.0e4ln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/forms", formRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
