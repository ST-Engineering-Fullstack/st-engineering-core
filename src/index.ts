import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { default as csvRoutes } from "./routes/csvRoutes.js";
import databaseService from "./services/database.service.js";
// Load environment variables
dotenv.config();

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", csvRoutes);

const startServer = async () => {
  try {
    await databaseService.connect();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
