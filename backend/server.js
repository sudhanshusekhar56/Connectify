import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import ConnectToMongoDB from "./connectToMongoDB.js";
import connectToMongoDB from "./connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server running successfully");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on ${PORT}`);
});
