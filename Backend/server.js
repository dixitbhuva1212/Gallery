import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import imageRoutes from "./routes/images.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://gallery-six-ecru.vercel.app"
  ]
}));app.use(express.json());

app.use("/api/images", imageRoutes);

app.get("/", (req, res) => {
  res.send("Gallery API running");
});

// Global error handler — catches anything not handled in routers
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});