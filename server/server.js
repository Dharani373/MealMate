const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Meal Mate API Running");
});

const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const { protect } = require("./middleware/authMiddleware");

app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
